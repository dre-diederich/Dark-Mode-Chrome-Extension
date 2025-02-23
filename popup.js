document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
      });
    });
  
    // Slider controls
    const sliders = {
      brightness: document.getElementById('brightness'),
      contrast: document.getElementById('contrast'),
      warmth: document.getElementById('warmth')
    };
  
    Object.entries(sliders).forEach(([key, slider]) => {
      const valueDisplay = document.getElementById(`${key}Value`);
      slider.addEventListener('input', () => {
        valueDisplay.textContent = `${slider.value}%`;
        updateFilters();
      });
    });
  
    // Preset filters
    const presets = {
      moonlight: {
        brightness: 90,
        contrast: 110,
        warmth: 30
      },
      sepia: {
        brightness: 100,
        contrast: 105,
        warmth: 70
      },
      midnight: {
        brightness: 85,
        contrast: 120,
        warmth: 20
      },
      forest: {
        brightness: 95,
        contrast: 115,
        warmth: 45
      }
    };
  
    document.querySelectorAll('.preset-button').forEach(button => {
      button.addEventListener('click', () => {
        const preset = presets[button.dataset.preset];
        Object.entries(preset).forEach(([key, value]) => {
          sliders[key].value = value;
          document.getElementById(`${key}Value`).textContent = `${value}%`;
        });
        updateFilters();
      });
    });
  
    function updateFilters() {
      const filters = {
        brightness: sliders.brightness.value,
        contrast: sliders.contrast.value,
        warmth: sliders.warmth.value
      };
  
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "updateFilters",
          filters: filters
        });
      });
    }
  
    // Toggle dark mode
    document.getElementById('toggleDark').addEventListener('click', () => {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log('Sending toggle dark-mode message')
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggle" });
      });
    });
  });
  
  