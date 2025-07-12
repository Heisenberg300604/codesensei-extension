# CodeSensei - LeetCode AI Mentor

Your AI-powered coding mentor for LeetCode practice. Get hints, validate logic, and master problems without copy-pasting.

## 🚀 Features

- **Logic Validation**: Check if your problem-solving approach makes sense
- **Code Dry-Run**: Simulate and visualize code execution
- **Smart Hints**: Get helpful hints without spoilers
- **Practice Timer**: Track your problem-solving time
- **Anti-Copy-Paste Protection**: Encourages learning through writing
- **Draggable Widget**: Move it freely on the problem page

## 📦 Installation

### Prerequisites
- Google Chrome browser
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Steps
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the extension folder
5. The extension should appear in your extensions list

## 🔑 Setup

1. Click the CodeSensei extension icon in your browser toolbar
2. Enter your Gemini API key in the popup
3. Click "Save API Key" to test and save
4. Navigate to any LeetCode problem page to start using

## 🛠️ Troubleshooting

### "Invalid API key" error
**Possible causes and solutions**:

1. **Incorrect API key format**
   - Make sure you're using the correct API key from Google AI Studio
   - The key should start with "AI" and be about 40 characters long

2. **API key not saved properly**
   - Open the extension popup
   - Re-enter your API key and click "Save API Key"
   - Check the console for detailed error messages

3. **Rate limiting**
   - If you see "API rate limit exceeded", wait a few minutes and try again

### Extension not working on LeetCode
1. Make sure you're on a LeetCode problem page (URL contains `/problems/`)
2. Refresh the page after installing the extension
3. Check the browser console for any error messages

### Widget not appearing
1. Make sure you're on a LeetCode problem page
2. Try refreshing the page
3. Check if the extension is enabled in `chrome://extensions/`

## 🧪 Testing

Use the included `test-extension.html` file to verify your extension is working:

1. Open `test-extension.html` in your browser
2. Click the test buttons to check:
   - Extension status
   - API key configuration
   - Storage functionality

## 📁 File Structure

```
codesensei-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── content.js            # Content script for LeetCode pages
├── content.css           # Widget styling
├── test-extension.html   # Testing page
└── README.md            # This file
```

## 🔧 Development

### Making Changes
1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the CodeSensei extension
4. Test your changes

### Debugging
1. Open Chrome DevTools
2. Go to the Extensions tab
3. Click "service worker" for background script debugging
4. Use the console to see logs and errors
