chrome.storage.local.get(['darkMode', 'brightness', 'contrast', 'warmth'], (data) => {
  if (!data.darkMode) {
    document.documentElement.style.filter = '';
    return;
  }
  
  const brightness = data.brightness || 100;
  const contrast = data.contrast || 100;
  const warmth = data.warmth || 50;
  const sepia = warmth / 100;

  document.documentElement.style.filter = `
    brightness(${brightness}%) 
    contrast(${contrast}%) 
    sepia(${sepia}) 
    invert(1)
  `;
});