// get active tab
chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs[0].url) {
        //send to content scripts to get the color
        chrome.tabs.sendMessage(tabs[0].id, { action: "get-color" });
    }
});


// listen for message coming from background script (background.js) or content script (content.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    // change the color of the input to make the website as a default
    if (request.action === "web-color") {
        const color = request.color;
        const inputcolor = document.querySelector('input');
        if (color.includes("#")) {
            inputcolor.value = color;
        } else {
            // convert rgb e.g rgb(216, 19, 19) to #d81313
            // const values = color
            //     .replace("(", "")
            //     .replace(")", "")
            //     .replace("rgb", "")
            //     .split(",")
            // const [r, g, b] = values;
        }
    }
});



// send color to the content scripts
document.querySelector('button').onclick = () => {
    const inputcolor = document.querySelector('input');
    const color = inputcolor.value;

    // you can send numbers, strings, arrays, and objects
    // send background scripts background.js
    chrome.runtime.sendMessage({ action: "change-color", color: color });

    // get active tab
    chrome.tabs.query({ active: true }, (tabs) => {
        if (tabs[0].url) {
            //send message to content scripts to change color
            chrome.tabs.sendMessage(tabs[0].id, { action: "change-color", color: color })
        }
    });
}