// CodeSensei Content Script
let codeSenseiWidget = null;
let timerInterval = null;
let sessionStartTime = null;
let isTimerRunning = false;
let problemStartTime = null;
let currentProblemTitle = '';
let currentProblemDescription = '';
let currentProblemDifficulty = '';
let currentProblemUrl = '';

// Initialize the extension
function initializeCodeSensei() {
    if (codeSenseiWidget) return;

    // Extract problem information
    extractProblemContext();

    createCodeSenseiWidget();
    setupAntiCopyPasteProtection();
    trackProblemSession();
}

function extractProblemContext() {
    // Get problem title
    const titleElement = document.querySelector('[data-cy="question-title"]') || 
                        document.querySelector('.css-v3d350') ||
                        document.querySelector('h1');
    
    if (titleElement) {
        currentProblemTitle = titleElement.textContent.trim();
    }

    // Get problem description
    const descriptionElement = document.querySelector('[data-cy="question-content"]') ||
                             document.querySelector('.content__1YWB') ||
                             document.querySelector('.description__24sA');
    
    if (descriptionElement) {
        currentProblemDescription = descriptionElement.textContent.trim().substring(0, 500) + '...';
    }

    // Get difficulty
    const difficultyElement = document.querySelector('[data-cy="question-difficulty"]') ||
                            document.querySelector('.css-1wcei0f') ||
                            document.querySelector('.difficulty-label');
    
    if (difficultyElement) {
        currentProblemDifficulty = difficultyElement.textContent.trim();
    }

    // Get URL
    currentProblemUrl = window.location.href;

    console.log('CodeSensei: Problem context extracted:', {
        title: currentProblemTitle,
        difficulty: currentProblemDifficulty,
        url: currentProblemUrl
    });
}

function createCodeSenseiWidget() {
    const widget = document.createElement('div');
    widget.id = 'codesensei-widget';
    widget.innerHTML = `
        <div class="codesensei-header">
            <div class="codesensei-logo">🥋 CodeSensei</div>
            <div class="codesensei-controls">
                <button class="codesensei-btn minimize-btn" title="Minimize">−</button>
                <button class="codesensei-btn close-btn" title="Close">×</button>
            </div>
        </div>
        
        <div class="codesensei-content">
            <div class="codesensei-problem-info">
                <div class="problem-title">${currentProblemTitle || 'Problem Detected'}</div>
                ${currentProblemDifficulty ? `<div class="problem-difficulty ${currentProblemDifficulty.toLowerCase()}">${currentProblemDifficulty}</div>` : ''}
            </div>

            <div class="codesensei-timer">
                <div class="timer-display" id="timer-display">00:00</div>
                <div class="timer-controls">
                    <button class="codesensei-btn timer-btn" id="start-timer">Start Timer</button>
                    <button class="codesensei-btn timer-btn" id="reset-timer">Reset</button>
                </div>
            </div>

            <div class="codesensei-input-section">
                <textarea 
                    id="codesensei-input" 
                    placeholder="Describe your approach, paste code to analyze, or leave empty for hints based on the current problem..."
                    rows="4"
                ></textarea>
                <div class="codesensei-actions">
                    <button class="codesensei-btn action-btn" id="validate-logic">Validate Logic</button>
                    <button class="codesensei-btn action-btn" id="dry-run">Dry-Run Code</button>
                    <button class="codesensei-btn action-btn" id="get-hint">Get Hint</button>
                    <button class="codesensei-btn action-btn" id="predict-acceptance">Check Acceptance</button>
                </div>
            </div>

            <div class="codesensei-response" id="codesensei-response">
                <div class="welcome-message">
                    <h3>🎯 Welcome to CodeSensei!</h3>
                    <p>Your AI coding mentor is ready to help you master <strong>${currentProblemTitle || 'this problem'}</strong>.</p>
                    <ul>
                        <li>📝 <strong>Describe your approach</strong> to validate your logic</li>
                        <li>🔍 <strong>Paste your code</strong> for step-by-step dry-run</li>
                        <li>💡 <strong>Click "Get Hint"</strong> for problem-specific guidance</li>
                        <li>⚡ <strong>Check if your solution</strong> will pass LeetCode tests</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Position the widget
    widget.style.position = 'fixed';
    widget.style.top = '20px';
    widget.style.right = '20px';
    widget.style.zIndex = '10000';
    widget.style.width = '400px';
    
    document.body.appendChild(widget);
    codeSenseiWidget = widget;

    // Add event listeners
    setupWidgetEventListeners();
}

function setupWidgetEventListeners() {
    const minimizeBtn = document.querySelector('.minimize-btn');
    const closeBtn = document.querySelector('.close-btn');
    const startTimerBtn = document.getElementById('start-timer');
    const resetTimerBtn = document.getElementById('reset-timer');
    const validateBtn = document.getElementById('validate-logic');
    const dryRunBtn = document.getElementById('dry-run');
    const hintBtn = document.getElementById('get-hint');
    const predictBtn = document.getElementById('predict-acceptance');

    minimizeBtn.addEventListener('click', toggleMinimize);
    closeBtn.addEventListener('click', closeWidget);
    startTimerBtn.addEventListener('click', toggleTimer);
    resetTimerBtn.addEventListener('click', resetTimer);
    validateBtn.addEventListener('click', () => handleAIRequest('validate'));
    dryRunBtn.addEventListener('click', () => handleAIRequest('dry-run'));
    hintBtn.addEventListener('click', () => handleAIRequest('hint'));
    predictBtn.addEventListener('click', () => handleAIRequest('predict'));

    // Make widget draggable
    makeWidgetDraggable();
}

function makeWidgetDraggable() {
    const header = document.querySelector('.codesensei-header');
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = parseInt(window.getComputedStyle(codeSenseiWidget).left);
        startTop = parseInt(window.getComputedStyle(codeSenseiWidget).top);
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        codeSenseiWidget.style.left = (startLeft + deltaX) + 'px';
        codeSenseiWidget.style.top = (startTop + deltaY) + 'px';
        codeSenseiWidget.style.right = 'auto';
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

function toggleMinimize() {
    const content = document.querySelector('.codesensei-content');
    const isMinimized = content.style.display === 'none';
    
    content.style.display = isMinimized ? 'block' : 'none';
    codeSenseiWidget.style.height = isMinimized ? 'auto' : '60px';
}

function closeWidget() {
    if (codeSenseiWidget) {
        codeSenseiWidget.remove();
        codeSenseiWidget = null;
    }
}

function toggleTimer() {
    const startBtn = document.getElementById('start-timer');
    
    if (isTimerRunning) {
        clearInterval(timerInterval);
        startBtn.textContent = 'Start Timer';
        isTimerRunning = false;
    } else {
        sessionStartTime = Date.now();
        startBtn.textContent = 'Stop Timer';
        isTimerRunning = true;
        
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - sessionStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            document.getElementById('timer-display').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-display').textContent = '00:00';
    document.getElementById('start-timer').textContent = 'Start Timer';
    isTimerRunning = false;
    sessionStartTime = null;
}

async function handleAIRequest(type) {
    const input = document.getElementById('codesensei-input').value.trim();
    
    // Allow empty input for hints
    if (!input && type !== 'hint') {
        showResponse('Please enter your question or code in the text area above.', 'error');
        return;
    }

    // Check if user has put in enough effort (anti-copy-paste protection)
    const effortTime = await getEffortTime();
    if (type === 'hint' && effortTime < 300 && input) { // 5 minutes only if user provided input
        showResponse('🛡️ Take some time to think through the problem first. Hints are most helpful after you\'ve spent at least 5 minutes working on it!', 'warning');
        return;
    }

    showResponse('🤔 CodeSensei is thinking...', 'loading');

    try {
        const apiKey = await getGeminiApiKey();
        if (!apiKey) {
            showResponse('⚠️ Please set up your Gemini API key in the extension popup first.', 'error');
            return;
        }

        const prompt = buildPrompt(type, input);
        const response = await callGeminiAPI(apiKey, prompt);
        
        showResponse(response, 'success');
        
        // Track usage
        await trackUsage(type);
        
    } catch (error) {
        console.error('CodeSensei error:', error);
        showResponse('❌ Oops! Something went wrong. Please try again.', 'error');
    }
}

function buildPrompt(type, input) {
    const problemContext = `
Current LeetCode Problem:
- Title: ${currentProblemTitle}
- Difficulty: ${currentProblemDifficulty}
- URL: ${currentProblemUrl}
- Description: ${currentProblemDescription}
`;

    const basePrompts = {
        'validate': `${problemContext}

User's approach: ${input || 'No specific approach provided'}

Validate this logic for solving the problem. Is the approach correct? Point out any issues and suggest improvements. Keep response concise and educational. Format your response with proper markdown.`,

        'dry-run': `${problemContext}

User's code: ${input || 'No code provided'}

Perform a step-by-step dry-run of this code. Show variable states and trace through the execution. If test cases aren't provided, use common examples for this problem type. Format your response with proper markdown.`,

        'hint': `${problemContext}

User's current situation: ${input || 'User is starting fresh and needs initial guidance'}

Provide a helpful hint without giving away the complete solution. Focus on the next step or key insight they need. Be encouraging and educational. If the user hasn't provided input, give them a starting point or key insight about this specific problem. Format your response with proper markdown.`,

        'predict': `${problemContext}

User's solution: ${input || 'No solution provided'}

Analyze this solution and predict if it will pass LeetCode tests. Consider time complexity, space complexity, edge cases, and common constraints. Give a percentage confidence and explain reasoning. Format your response with proper markdown.`
    };

    return basePrompts[type] || input;
}

async function callGeminiAPI(apiKey, prompt) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: 1500,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Gemini API Error:', errorData);
            
            if (response.status === 400) {
                throw new Error('Invalid API request. Please check your API key.');
            } else if (response.status === 403) {
                throw new Error('API key is invalid or has insufficient permissions.');
            } else if (response.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            } else {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format from API');
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('CodeSensei API Error:', error);
        throw error;
    }
}

function showResponse(text, type) {
    const responseDiv = document.getElementById('codesensei-response');
    
    const typeEmojis = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'loading': '🤔'
    };

    const typeClasses = {
        'success': 'response-success',
        'error': 'response-error',
        'warning': 'response-warning',
        'loading': 'response-loading'
    };

    // Format the text (convert markdown to HTML)
    const formattedText = formatMarkdown(text);

    responseDiv.innerHTML = `
        <div class="response-message ${typeClasses[type] || ''}">
            <div class="response-header">
                <span class="response-emoji">${typeEmojis[type] || '💬'}</span>
                <span class="response-title">CodeSensei Response</span>
            </div>
            <div class="response-text">${formattedText}</div>
        </div>
    `;
}

function formatMarkdown(text) {
    if (!text) return '';
    
    return text
        // Convert **text** to <strong>text</strong>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert *text* to <em>text</em>
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Convert `text` to <code>text</code>
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // Convert ```code``` to <pre><code>code</code></pre>
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Convert line breaks to <br>
        .replace(/\n/g, '<br>')
        // Convert bullet points
        .replace(/^[-*]\s+(.*?)$/gm, '<li>$1</li>')
        // Wrap lists in <ul>
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // Convert numbered lists
        .replace(/^\d+\.\s+(.*?)$/gm, '<li>$1</li>')
        // Convert headers
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*?)$/gm, '<h1>$1</h1>');
}

function setupAntiCopyPasteProtection() {
    const codeEditors = document.querySelectorAll('.monaco-editor, .CodeMirror, textarea');
    
    codeEditors.forEach(editor => {
        editor.addEventListener('paste', (e) => {
            const pastedText = e.clipboardData.getData('text');
            
            // Check if pasted content is suspiciously long (likely a solution)
            if (pastedText.length > 200) {
                const shouldContinue = confirm('🛡️ CodeSensei Notice: You\'re pasting a large amount of code. Are you sure you want to continue? Learning is most effective when you write code yourself!');
                
                if (!shouldContinue) {
                    e.preventDefault();
                    return;
                }
            }
        });
    });
}

async function trackProblemSession() {
    problemStartTime = Date.now();
    
    // Update daily stats
    const today = new Date().toDateString();
    const stats = await chrome.storage.local.get([
        'problemsSolvedToday',
        'totalSessions',
        'lastResetDate'
    ]);

    if (stats.lastResetDate !== today) {
        await chrome.storage.local.set({
            problemsSolvedToday: 0,
            lastResetDate: today
        });
    }

    await chrome.storage.local.set({
        totalSessions: (stats.totalSessions || 0) + 1
    });
}

async function getEffortTime() {
    if (!problemStartTime) return 0;
    return (Date.now() - problemStartTime) / 1000;
}

async function getGeminiApiKey() {
    const result = await chrome.storage.sync.get(['geminiApiKey']);
    return result.geminiApiKey;
}

async function trackUsage(type) {
    const usage = await chrome.storage.local.get(['usageStats']) || {};
    const stats = usage.usageStats || {};
    
    stats[type] = (stats[type] || 0) + 1;
    
    await chrome.storage.local.set({ usageStats: stats });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCodeSensei);
} else {
    initializeCodeSensei();
}

// Re-initialize when navigating to new problems
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(() => {
            if (codeSenseiWidget) {
                codeSenseiWidget.remove();
                codeSenseiWidget = null;
            }
            initializeCodeSensei();
        }, 1000);
    }
}).observe(document, { subtree: true, childList: true });