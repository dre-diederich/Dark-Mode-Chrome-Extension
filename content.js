// content.js
let darkMode = false;

// Create a style element for dark mode
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
  body.dark-mode {
    background-color: #1a1a1a !important;
    color: #ffffff !important;
  }
  
  body.dark-mode a {
    color: #6ea8fe !important;
  }
  
  body.dark-mode img {
    filter: brightness(.8) contrast(1.2) !important;
  }
  
  body.dark-mode input, 
  body.dark-mode textarea, 
  body.dark-mode select {
    background-color: #333 !important;
    color: #fff !important;
    border-color: #666 !important;
  }
  
  body.dark-mode * {
    background-color: #1a1a1a !important;
    color: #ffffff !important;
    border-color: #333 !important;
  }
`;

// Add the style element to the document
document.head.appendChild(darkModeStyles);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    darkMode = !darkMode;
    applyDarkMode();
  } else if (request.action === "updateFilters") {
    updatePageFilters(request.filters);
  }
});

function applyDarkMode() {
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  // Save the state
  chrome.storage.local.set({ 'darkModeState': darkMode });
}

function updatePageFilters(filters) {
  document.documentElement.style.filter = `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    sepia(${filters.warmth}%)
  `;
}

// Check and apply saved state when page loads
chrome.storage.local.get('darkModeState', function(data) {
  if (data.darkModeState) {
    darkMode = true;
    applyDarkMode();
  }
});