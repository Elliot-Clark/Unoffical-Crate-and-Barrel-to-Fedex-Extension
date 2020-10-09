'use strict';

//Runs on popup click by user telling content.js file to run it's sole function.
runCopyPaste.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "Copy/Paste"}
    );
  });
};

