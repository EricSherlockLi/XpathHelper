// Listen for right-clicks on any element
document.addEventListener('contextmenu', function (event) {
    chrome.runtime.sendMessage({ query: 'isXPathScannerEnabled' }, (response) => {
        if (response.xpathScannerEnabled) {
            event.preventDefault(); // Prevent the context menu from appearing
            const clickedElement = event.target;
            const xpath = generateXPath(clickedElement); // Call generateXPath function here
            showCustomPopup(xpath); // Show custom popup with XPath
        }
    });
}, true);

function generateXPath(element) {
    let path = '';
    while (element && element.nodeType === Node.ELEMENT_NODE) {
        if (element.id) {
            // 如果找到具有id的元素，使用id构建XPath，并结束循环
            return `id("${element.id}")` + path;
        }
        const index = Array.from(element.parentNode.children).indexOf(element) + 1;
        const part = `${element.tagName.toLowerCase()}[${index}]`;
        path = '/' + part + path;
        element = element.parentNode;
    }
    return path;
}


// Function to show custom popup with XPath and a copy button
function showCustomPopup(xpath) {
    const existingPopup = document.getElementById('xpath-scanner-popup');
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement('div');
    popup.id = 'xpath-scanner-popup';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%)';
    popup.style.padding = '20px';
    popup.style.background = 'white';
    popup.style.border = '1px solid black';
    popup.style.zIndex = '10000';
    popup.innerHTML = `
        <div>XPath of this element:</div>
        <input type="text" value="${xpath}" id="xpath-value" readonly style="width: 100%; overflow-x: auto;">
        <button id="copy-xpath">Copy</button>
        <button id="close-popup">Close</button>
    `;
    document.body.appendChild(popup);

    document.getElementById('copy-xpath').addEventListener('click', function () {
        navigator.clipboard.writeText(xpath)
            .then(() => console.log('XPath copied to clipboard'))
            .catch(err => console.error('Failed to copy XPath', err));
    });

    document.getElementById('close-popup').addEventListener('click', function () {
        popup.remove();
    });
}
