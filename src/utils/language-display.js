/**
 * language-display.js - Progressive L1→L2 Unlock System
 * ======================================================
 * Controls how language content is displayed based on:
 * - Teacher language override (all-uz, all-en, auto)
 * - Individual chunk/vocab mastery (for 'auto' mode)
 * 
 * Philosophy: Structures remain in L1 (Uzbek) until learned,
 * then progressively reveal L2 (English) as mastery is achieved.
 * 
 * @module src/utils/language-display
 * @version 1.0.0
 */

import { getLanguageDisplay, AppState } from '../state/app-state.js';

// ============================================================================
// MASTERY TRACKING (syncs with AppState)
// ============================================================================

/**
 * Get the set of mastered vocabulary/chunk keys
 * @returns {Set<string>} Keys of mastered items (e.g., "U01_L01_hello", "U01_L01_D01_0")
 */
export function getMasteredKeys() {
  if (!AppState.session.masteredKeys) {
    // Initialize from localStorage if needed
    const stored = localStorage.getItem('masteredKeys');
    AppState.session.masteredKeys = stored ? new Set(JSON.parse(stored)) : new Set();
  }
  return AppState.session.masteredKeys;
}

/**
 * Mark a vocab/chunk key as mastered
 * @param {string} key - Key to mark as mastered
 */
export function markAsMastered(key) {
  const masteredKeys = getMasteredKeys();
  if (!masteredKeys.has(key)) {
    masteredKeys.add(key);
    // Persist
    localStorage.setItem('masteredKeys', JSON.stringify([...masteredKeys]));
    console.log(`[L2Unlock] Mastered: ${key}`);
    
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('vocabMastered', { detail: { key } }));
  }
}

/**
 * Check if a vocab/chunk key is mastered
 * @param {string} key - Key to check
 * @returns {boolean}
 */
export function isMastered(key) {
  return getMasteredKeys().has(key);
}

// ============================================================================
// LANGUAGE DISPLAY HELPERS
// ============================================================================

/**
 * Display mode for a specific chunk
 * @typedef {'l1'|'l2'|'hybrid'} ChunkDisplayMode
 */

/**
 * Get display mode for a chunk
 * @param {Object} chunk - Chunk object with en, uz, and optional mastery_key
 * @param {Object} [options] - Additional options
 * @param {string} [options.masteryKey] - Override mastery key
 * @returns {ChunkDisplayMode} 'l1' (Uzbek only), 'l2' (English only), or 'hybrid' (both)
 */
export function getChunkDisplayMode(chunk, options = {}) {
  const langDisplay = getLanguageDisplay();
  const masteryKey = options.masteryKey || chunk.mastery_key || null;
  
  // Override modes
  if (langDisplay === 'all-uz') return 'l1';
  if (langDisplay === 'all-en') return 'l2';
  
  // Auto mode: check mastery
  if (masteryKey && isMastered(masteryKey)) {
    return 'l2'; // Mastered = show English
  }
  
  // Default for auto: hybrid (show both, EN with UZ hover)
  return 'hybrid';
}

/**
 * Get CSS classes for language display state
 * @param {'l1'|'l2'|'hybrid'} mode - Display mode
 * @returns {string} Space-separated CSS classes
 */
export function getDisplayClasses(mode) {
  switch (mode) {
    case 'l1': return 'lang-mode-l1 uz-primary';
    case 'l2': return 'lang-mode-l2 en-primary';
    case 'hybrid': return 'lang-mode-hybrid';
    default: return 'lang-mode-hybrid';
  }
}

// ============================================================================
// CHUNK RENDERING HELPER
// ============================================================================

/**
 * Render a dialogue chunk with progressive L1→L2 display
 * @param {Object} chunk - Chunk object with en and uz properties
 * @param {Object} [options] - Rendering options
 * @param {string} [options.masteryKey] - Key to check for mastery
 * @param {boolean} [options.hoverable=true] - Whether to show UZ on hover
 * @returns {HTMLElement} Rendered span element
 */
export function renderChunk(chunk, options = {}) {
  const { hoverable = true, masteryKey } = options;
  const mode = getChunkDisplayMode(chunk, { masteryKey });
  
  const span = document.createElement('span');
  span.className = `dialogue-chunk ${getDisplayClasses(mode)}`;
  
  switch (mode) {
    case 'l1':
      // Show Uzbek text, with English as data attribute
      span.textContent = chunk.uz || chunk.en;
      span.dataset.english = chunk.en;
      span.style.cssText = 'display: inline; padding: 2px 0;';
      break;
      
    case 'l2':
      // Show English text only (mastered)
      span.textContent = chunk.en;
      span.style.cssText = 'display: inline; padding: 2px 0; color: #a8e6cf;'; // Green accent for mastered
      break;
      
    case 'hybrid':
    default:
      // Show English with Uzbek dashed underline + hover
      span.textContent = chunk.en;
      span.dataset.uzbek = chunk.uz;
      
      if (hoverable && chunk.uz) {
        span.classList.add('chunk-hoverable');
        span.style.cssText = `
          display: inline;
          position: relative;
          cursor: help;
          padding: 2px 0;
          border-bottom: 1px dotted rgba(255,255,255,0.3);
          transition: all 0.2s ease;
        `;
      } else {
        span.style.cssText = 'display: inline; padding: 2px 0;';
      }
      break;
  }
  
  return span;
}

// ============================================================================
// CSS FOR LANGUAGE MODES (inject once)
// ============================================================================

const LANG_DISPLAY_CSS = `
/* L1 Mode (Uzbek primary) */
.lang-mode-l1 {
  color: #ffd700;
  font-style: italic;
}

/* L2 Mode (English primary - mastered) */
.lang-mode-l2 {
  color: #a8e6cf;
}

/* Hybrid Mode (show both) */
.lang-mode-hybrid.chunk-hoverable {
  position: relative;
}
.lang-mode-hybrid.chunk-hoverable:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.lang-mode-hybrid.chunk-hoverable::after {
  content: attr(data-uzbek);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: #ffd700;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1000;
  pointer-events: none;
}
.lang-mode-hybrid.chunk-hoverable:hover::after {
  opacity: 1;
  visibility: visible;
  bottom: calc(100% + 5px);
}

/* Progressive unlock animation */
@keyframes chunk-unlock {
  0% { background: rgba(168, 230, 207, 0.4); }
  100% { background: transparent; }
}
.chunk-just-unlocked {
  animation: chunk-unlock 0.8s ease;
}
`;

let cssInjected = false;
export function injectLanguageDisplayCSS() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.textContent = LANG_DISPLAY_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// Auto-inject on import
if (typeof document !== 'undefined') {
  injectLanguageDisplayCSS();
}

// ============================================================================
// BACKWARD COMPATIBILITY
// ============================================================================

window.LanguageDisplay = {
  getMasteredKeys,
  markAsMastered,
  isMastered,
  getChunkDisplayMode,
  renderChunk,
  getLanguageDisplay
};
