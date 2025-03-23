const toggleButton = document.getElementById('toggleButton');
const controlsTab = document.getElementById('controlsTab');
const presetsTab = document.getElementById('presetsTab');
const controls = document.getElementById('controls');
const presets = document.getElementById('presets');
const brightnessSlider = document.getElementById('brightnessValue')
const contrastSlider = document.getElementById('contrastValue')
const warmthSlider = document.getElementById('warmthValue')
const preset1 = document.getElementById('preset1')
const preset2 = document.getElementById('preset2')
const preset3 = document.getElementById('preset3')


controlsTab.onclick = () => {
  controls.style.display = 'block';
  presets.style.display = 'none';
};

presetsTab.onclick = () => {
  controls.style.display = 'none';
  presets.style.display = 'block';
};

toggleButton.onclick = () => {
  chrome.storage.local.get('darkMode', (data) => {
    const enabled = !data.darkMode;
    chrome.storage.local.set({ darkMode: enabled });
    chrome.scripting.executeScript({
      target: { allFrames: true },
      files: ['content.js']
    });
  });
};

document.querySelectorAll('input[type="range"]').forEach(slider => {
  slider.oninput = () => {
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const warmth = document.getElementById('warmth').value;
    document.getElementById(`${slider.id}Value`).innerText = `${slider.value}%`
    chrome.storage.local.set({ brightness, contrast, warmth });
    chrome.scripting.executeScript({
      target: { allFrames: true },
      files: ['content.js']
    });
  };
});

document.getElementById('preset1').onclick = () => applyPreset(80, 120, 30);
document.getElementById('preset2').onclick = () => applyPreset(90, 110, 80);
document.getElementById('preset3').onclick = () => applyPreset(100, 100, 50);

function applyPreset(brightness, contrast, warmth) {
  document.getElementById('brightness').value = brightness;
  document.getElementById('contrast').value = contrast;
  document.getElementById('warmth').value = warmth;
  chrome.storage.local.set({ brightness, contrast, warmth });
  chrome.scripting.executeScript({
    target: { allFrames: true },
    files: ['content.js']
  });
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('darkMode', (data) => {
    document.getElementById('toggleButton').checked = data.darkMode || false;
  });
});

window.matchMedia('(prefers-color-scheme: dark)').

document.addEventListener('DOMContentLoaded', function() {
  const themeSwitch = document.querySelector('.theme-switch__checkbox');

  // Load the saved theme state (if any)
  chrome.storage.sync.get('darkModeEnabled', (data) => {
    if (data.darkModeEnabled) {
      themeSwitch.checked = true;
    }
  });

  // Toggle and refresh on checkbox change
  themeSwitch.addEventListener('change', function() {
    const isDarkMode = themeSwitch.checked;

    // Save the state using chrome.storage
    chrome.storage.sync.set({ darkModeEnabled: isDarkMode }, () => {
      console.log('Dark mode:', isDarkMode ? 'Enabled' : 'Disabled');
      
      // Refresh the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const themeSwitch = document.querySelector('.theme-switch__checkbox');

  // Check saved mode
  chrome.storage.sync.get('darkModeEnabled', (data) => {
    if (data.darkModeEnabled) {
      document.body.classList.add('dark-mode');
      themeSwitch.checked = true;
    }
  });

  // Toggle Dark Mode
  themeSwitch.addEventListener('change', function() {
    const isDarkMode = themeSwitch.checked;
    document.body.classList.toggle('dark-mode', isDarkMode);

    // Save state
    chrome.storage.sync.set({ darkModeEnabled: isDarkMode }, () => {
      console.log('Dark mode:', isDarkMode ? 'Enabled' : 'Disabled');
    });
  });
});