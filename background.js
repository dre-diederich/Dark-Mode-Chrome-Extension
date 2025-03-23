chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ darkMode: false, brightness: 100, contrast: 100, warmth: 50 });
});