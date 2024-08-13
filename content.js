// listening for messages from background script or popup 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
 
    // listening for message from the scripts.js (Popup) to get the color
    if (request.action == "get-color") {
        const color = document.body.style.background;

        // sending the color to the popup and background.js (It sends to both)
        chrome.runtime.sendMessage({ action: "web-color", color: color })

        console.log('Sending Color', color);
    }

    // listening for message from the scripts.js to change color
    else if (request.action == "change-color") {
        const color = request.color;
        document.body.style.background = color;

    }

});