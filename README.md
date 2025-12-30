<div align="center">

# 🤖 CodeSensei - LeetCode AI Mentor

**Your AI-powered coding mentor for LeetCode practice. Get hints, validate logic, and master problems without copy-pasting.**

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore)
[![AI Powered](https://img.shields.io/badge/AI-Powered-FF6F00?logo=google-ai&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

</div>

## 📋 Table of Contents

- [🚀 Features](#-features)
- [📦 Installation](#-installation)
- [🔑 Setup](#-setup)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🧪 Testing](#-testing)
- [📁 File Structure](#-file-structure)
- [🔧 Development](#-development)

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 🧠 **Logic Validation** | Check if your problem-solving approach makes sense |
| ▶️ **Code Dry-Run** | Simulate and visualize code execution |
| 💡 **Smart Hints** | Get helpful hints without spoilers |
| ⏱️ **Practice Timer** | Track your problem-solving time |
| 🚫 **Anti-Copy-Paste Protection** | Encourages learning through writing |
| 🎯 **Draggable Widget** | Move it freely on the problem page |

---

## 📦 Installation

### Prerequisites

> **Required:**
> - 🌐 Google Chrome browser
> - 🔑 Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Steps

<details>
<summary><b>Click to expand installation steps</b></summary>

1. **Download or clone this repository**
   ```bash
   git clone <repository-url>
   cd codesensei-extension
   ```

2. **Open Chrome Extensions Page**
   - Open Chrome and navigate to `chrome://extensions/`
   - Or go to: `Menu` → `Extensions` → `Manage Extensions`

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Select the extension folder

5. **Verify Installation**
   - The CodeSensei extension should appear in your extensions list
   - Look for the extension icon in your browser toolbar

</details>

---

## 🔑 Setup

<details>
<summary><b>Quick Setup Guide</b></summary>

### Step-by-Step Setup

1. **Open Extension Popup**
   - Click the CodeSensei extension icon in your browser toolbar

2. **Enter API Key**
   - Enter your Gemini API key in the popup input field
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. **Save Configuration**
   - Click "Save API Key" to test and save your key
   - You should see a confirmation message if successful

4. **Start Using**
   - Navigate to any LeetCode problem page (URL contains `/problems/`)
   - The CodeSensei widget should appear on the page

</details>

---

## 🛠️ Troubleshooting

<details>
<summary><b>🔴 "Invalid API key" error</b></summary>

### Possible Causes and Solutions:

#### 1. Incorrect API key format
- ✅ Make sure you're using the correct API key from Google AI Studio
- ✅ The key should start with "AI" and be about 40 characters long

#### 2. API key not saved properly
- ✅ Open the extension popup
- ✅ Re-enter your API key and click "Save API Key"
- ✅ Check the console for detailed error messages

#### 3. Rate limiting
- ✅ If you see "API rate limit exceeded", wait a few minutes and try again

</details>

<details>
<summary><b>🔴 Extension not working on LeetCode</b></summary>

1. **Verify Page URL**
   - Make sure you're on a LeetCode problem page (URL contains `/problems/`)

2. **Refresh the Page**
   - Refresh the page after installing the extension

3. **Check Console**
   - Open browser DevTools (F12)
   - Check the console for any error messages

</details>

<details>
<summary><b>🔴 Widget not appearing</b></summary>

1. **Check Page Type**
   - Make sure you're on a LeetCode problem page

2. **Try Refreshing**
   - Try refreshing the page (Ctrl+R or Cmd+R)

3. **Verify Extension Status**
   - Check if the extension is enabled in `chrome://extensions/`
   - Ensure the extension icon is visible in your toolbar

</details>

---

## 🧪 Testing

Use the included `test-extension.html` file to verify your extension is working:

<details>
<summary><b>Test Instructions</b></summary>

1. **Open Test File**
   - Open `test-extension.html` in your browser

2. **Run Tests**
   - Click the test buttons to check:
     - ✅ Extension status
     - ✅ API key configuration
     - ✅ Storage functionality

</details>

---

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

---

## 🔧 Development

<details>
<summary><b>Making Changes</b></summary>

1. **Edit Files**
   - Edit the relevant files in your code editor

2. **Reload Extension**
   - Go to `chrome://extensions/`
   - Click the refresh icon (🔄) on the CodeSensei extension card

3. **Test Changes**
   - Test your changes on a LeetCode problem page
   - Check the browser console for any errors

</details>

<details>
<summary><b>Debugging</b></summary>

1. **Open DevTools**
   - Open Chrome DevTools (F12 or Right-click → Inspect)

2. **Access Extensions Tab**
   - Go to the Extensions tab in DevTools

3. **Debug Background Script**
   - Click "service worker" link for background script debugging

4. **Check Console**
   - Use the console to see logs and errors
   - Check both the page console and extension service worker console

</details>

---

<div align="center">

**Made for LeetCode enthusiasts**

[⬆ Back to Top](#codesensei---leetcode-ai-mentor)

</div>
