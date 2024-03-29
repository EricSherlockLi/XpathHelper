let xpathScannerEnabled = false; // Ensures default state is off

chrome.action.onClicked.addListener((tab) => {
    xpathScannerEnabled = !xpathScannerEnabled;
    // No need to send a message to the content script here
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.query === 'isXPathScannerEnabled') {
        sendResponse({ xpathScannerEnabled });
    }
    // Handle state update from popup.js
    if (request.hasOwnProperty('xpathScannerEnabled')) {
        xpathScannerEnabled = request.xpathScannerEnabled;
    }
});
