
let darkMode = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleDark') {
    darkMode = !darkMode;
    console.log("Dark Mode Toggled: " + darkMode)
      if (request.darkMode) {
          document.body.style.backgroundColor = '#1a1a1a';
          document.body.style.color = '#ffffff';
      } else {
          document.body.style.backgroundColor = '';
          document.body.style.color = '';
      }
  }
});