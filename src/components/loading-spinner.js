/**
 * Loading Spinner Component
 * =========================
 * Shows a visual loading indicator during unit/data transitions.
 * 
 * @module src/components/loading-spinner
 * @version 1.0.0
 */

import { uz } from '../core/i18n.js';

/**
 * Create a loading spinner element
 * @returns {HTMLElement} Loading spinner div
 */
export function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  
  const inner = document.createElement('div');
  inner.className = 'spinner-inner';
  spinner.appendChild(inner);
  
  const text = document.createElement('div');
  text.className = 'spinner-text';
  text.textContent = uz('ui.loading');
  spinner.appendChild(text);
  
  return spinner;
}

/**
 * Show loading indicator overlay
 * @returns {{container: HTMLElement, show: Function, hide: Function}}
 */
export function createLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.style.display = 'none';
  
  const spinner = createLoadingSpinner();
  overlay.appendChild(spinner);
  
  document.body.appendChild(overlay);
  
  return {
    container: overlay,
    show() {
      overlay.style.display = 'flex';
    },
    hide() {
      overlay.style.display = 'none';
    }
  };
}

// Backward compatibility
if (typeof window !== 'undefined') {
  // @ts-ignore - Dynamic window property assignment
  window.LoadingSpinner = {
    createLoadingSpinner,
    createLoadingOverlay
  };
}

export default {
  createLoadingSpinner,
  createLoadingOverlay
};
