/**
 * Language Selector Component
 * ===========================
 * Modal for selecting the native language.
 * Appears on first launch or via settings.
 */

import { LANGUAGES, LANGUAGE_META, setLanguage, getCurrentLanguage, hasLanguageSelection } from '../utils/language.js';
import { playClickSound } from '../utils/audio.js';

export function showLanguageSelector(force = false) {
  if (hasLanguageSelection() && !force) return;

  // Remove existing if any
  const existing = document.getElementById('language-selector-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'language-selector-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    animation: fadeIn 0.3s ease-out;
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 20px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  `;

  const title = document.createElement('h2');
  title.textContent = "Select Your Language";
  title.style.marginBottom = "1.5rem";
  title.style.color = "#333";

  const grid = document.createElement('div');
  grid.style.cssText = `
    display: grid;
    gap: 1rem;
  `;

  Object.values(LANGUAGES).forEach(lang => {
    const btn = document.createElement('button');
    const meta = LANGUAGE_META[lang];
    const isSelected = getCurrentLanguage() === lang && hasLanguageSelection();
    
    btn.innerHTML = `<span style="font-size: 1.5rem; margin-right: 10px;">${meta.flag}</span> <span style="font-weight: 600;">${meta.label}</span>`;
    btn.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 1.5rem;
      border: 2px solid ${isSelected ? '#4CAF50' : '#ddd'};
      background: ${isSelected ? '#e8f5e9' : '#ffffff'};
      color: #333;
      border-radius: 12px;
      cursor: pointer;
      font-size: 1.1rem;
      transition: all 0.2s;
      width: 100%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    `;

    btn.onmouseover = () => {
        if (getCurrentLanguage() !== lang) {
          btn.style.background = '#f5f5f5';
          btn.style.borderColor = '#bbb';
        }
    };
    btn.onmouseout = () => {
        if (getCurrentLanguage() !== lang) {
          btn.style.background = '#ffffff';
          btn.style.borderColor = '#ddd';
        }
    };

    btn.onclick = () => {
      playClickSound();
      setLanguage(lang);
      
      // Animate selection
      btn.style.background = '#4CAF50';
      btn.style.color = 'white';
      
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            // Reload to apply changes cleanly across all components
            window.location.reload();
        }, 300);
      }, 200);
    };

    grid.appendChild(btn);
  });

  container.appendChild(title);
  container.appendChild(grid);
  overlay.appendChild(container);

  document.body.appendChild(overlay);

  // Add keyframes if needed
  if (!document.getElementById('lang-anim-style')) {
      const style = document.createElement('style');
      style.id = 'lang-anim-style';
      style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `;
      document.head.appendChild(style);
  }
}
