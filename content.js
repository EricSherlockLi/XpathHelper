// Listen for right-clicks on any element
// Updated part of content.js
document.addEventListener('contextmenu', function (event) {
    chrome.runtime.sendMessage({ query: 'isXPathScannerEnabled' }, (response) => {
        if (response.xpathScannerEnabled) {
            const clickedElement = event.target;
            const xpath = generateXPath(clickedElement);
            alert(`XPath of selected element: ${xpath}`);
            event.preventDefault(); // Prevent the context menu from appearing
        }
    });
}, true);

// Function to generate XPath for a given element
function generateXPath(element) {
    if (element.id !== '') return 'id("' + element.id + '")';
    if (element === document.body) return element.tagName.toLowerCase();

    let ix = 0;
    const siblings = element.parentNode.childNodes;
    for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling === element) return generateXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
    }
}

// Note: This XPath generation function is basic and may need enhancements to handle all cases.
