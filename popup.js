let xpathScannerEnabled = false; // Default state

// Communicate with background.js to get the current state
chrome.runtime.sendMessage({ query: 'isXPathScannerEnabled' }, (response) => {
    xpathScannerEnabled = response.xpathScannerEnabled;
    updateButtonText();
});

// Toggle the state upon button click
document.getElementById('toggle').addEventListener('click', () => {
    xpathScannerEnabled = !xpathScannerEnabled;
    chrome.runtime.sendMessage({ xpathScannerEnabled: xpathScannerEnabled });
    updateButtonText();
});

function updateButtonText() {
    const button = document.getElementById('toggle');
    button.textContent = xpathScannerEnabled ? "XPath Scanner Toggle On" : "XPath Scanner Toggle Off";
}
