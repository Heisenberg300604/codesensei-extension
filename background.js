// CodeSensei Background Service Worker

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Set up initial storage
        chrome.storage.local.set({
            problemsSolvedToday: 0,
            totalSessions: 0,
            averageTime: 0,
            usageStats: {},
            lastResetDate: new Date().toDateString()
        });

        // Open welcome page
        chrome.tabs.create({
            url: 'https://leetcode.com/problems/'
        });
    }
});

// Handle daily reset - with proper error handling
if (chrome.alarms && chrome.alarms.onAlarm) {
    chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === 'daily-reset') {
            resetDailyStats();
        }
    });

    // Set up daily reset alarm
    chrome.alarms.create('daily-reset', {
        when: getNextMidnight(),
        periodInMinutes: 24 * 60 // 24 hours
    });
}

function getNextMidnight() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.getTime();
}

async function resetDailyStats() {
    const today = new Date().toDateString();
    await chrome.storage.local.set({
        problemsSolvedToday: 0,
        lastResetDate: today
    });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'problemSolved') {
        incrementProblemCount();
        sendResponse({success: true});
    }
    
    if (request.action === 'updateSessionTime') {
        updateAverageTime(request.sessionTime);
        sendResponse({success: true});
    }
    
    return true;
});

async function incrementProblemCount() {
    const result = await chrome.storage.local.get(['problemsSolvedToday']);
    const currentCount = result.problemsSolvedToday || 0;
    
    await chrome.storage.local.set({
        problemsSolvedToday: currentCount + 1
    });
}

async function updateAverageTime(newSessionTime) {
    const result = await chrome.storage.local.get(['averageTime', 'totalSessions']);
    const currentAverage = result.averageTime || 0;
    const totalSessions = result.totalSessions || 0;
    
    const newAverage = (currentAverage * totalSessions + newSessionTime) / (totalSessions + 1);
    
    await chrome.storage.local.set({
        averageTime: newAverage
    });
}

// Badge management
async function updateBadge() {
    const result = await chrome.storage.local.get(['problemsSolvedToday']);
    const count = result.problemsSolvedToday || 0;
    
    if (count > 0) {
        chrome.action.setBadgeText({
            text: count.toString()
        });
        chrome.action.setBadgeBackgroundColor({
            color: '#4CAF50'
        });
    } else {
        chrome.action.setBadgeText({
            text: ''
        });
    }
}

// Update badge when storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.problemsSolvedToday) {
        updateBadge();
    }
});

// Initialize badge
updateBadge();