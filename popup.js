document.addEventListener('DOMContentLoaded', async () => {
    const apiKeyInput = document.getElementById('apiKeyInput');
    const saveApiKeyBtn = document.getElementById('saveApiKey');
    const statusIndicator = document.getElementById('statusIndicator');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const apiSetup = document.getElementById('apiSetup');
    const featureList = document.getElementById('featureList');
    const openLeetCodeBtn = document.getElementById('openLeetCode');

    // Load existing API key
    const result = await chrome.storage.sync.get(['geminiApiKey']);
    if (result.geminiApiKey) {
        apiKeyInput.value = result.geminiApiKey;
        showConnectedState();
    }

    // Load and display stats
    await loadStats();

    // Save API key
    saveApiKeyBtn.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            alert('Please enter your Gemini API key');
            return;
        }

        try {
            // Test the API key with a simple request
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "Respond with just 'OK' if you can read this message."
                        }]
                    }],
                    generationConfig: {
                        maxOutputTokens: 10
                    }
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    await chrome.storage.sync.set({ geminiApiKey: apiKey });
                    showConnectedState();
                    alert('API key saved successfully!');
                } else {
                    throw new Error('Invalid response format');
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', errorData);
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('API Key Test Error:', error);
            alert(`Invalid API key. Please check your Gemini API key and try again.\n\nError: ${error.message}`);
        }
    });

    // Open LeetCode
    openLeetCodeBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://leetcode.com/problems/' });
    });

    function showConnectedState() {
        statusIndicator.classList.remove('hidden');
        statusDot.classList.remove('disconnected');
        statusText.textContent = 'API Connected';
        apiSetup.style.display = 'none';
        featureList.classList.remove('hidden');
    }

    async function loadStats() {
        const stats = await chrome.storage.local.get([
            'problemsSolvedToday',
            'totalSessions',
            'averageTime',
            'lastResetDate'
        ]);

        // Reset daily stats if new day
        const today = new Date().toDateString();
        if (stats.lastResetDate !== today) {
            await chrome.storage.local.set({
                problemsSolvedToday: 0,
                lastResetDate: today
            });
            stats.problemsSolvedToday = 0;
        }

        // Update UI
        document.getElementById('problemsSolvedToday').textContent = stats.problemsSolvedToday || 0;
        document.getElementById('totalSessions').textContent = stats.totalSessions || 0;
        document.getElementById('averageTime').textContent = formatTime(stats.averageTime || 0);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m`;
    }
});