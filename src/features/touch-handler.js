/**
 * Touch Handler Module
 * ====================
 * Smart touch & scroll differentiation for Smart TV / Windows Touch.
 * Prevents scroll from being interpreted as tap/click.
 * 
 * @module src/features/touch-handler
 * @version 2.0.0 (Phase 2 Refactor)
 */

import { DeviceInfo } from '../utils/constants.js';

// ============================
// TOUCH HANDLER CONFIGURATION
// ============================
const CONFIG = {
  MIN_TAP_DISTANCE: 10,      // pixels: must move less than this to be a tap
  MIN_TAP_DURATION: 50,      // ms: minimum time to register as intentional tap
  MAX_TAP_DURATION: 500,     // ms: maximum time to be considered a tap (not long-press)
};

// ============================
// TOUCH STATE
// ============================
let activeTouch = null;
let touchStartTime = 0;
let touchStartX = 0;
let touchStartY = 0;
let isInitialized = false;

// ============================
// TOUCH HANDLERS
// ============================

/**
 * Handle touch start event
 * @param {TouchEvent} e
 */
function handleTouchStart(e) {
  if (e.touches.length !== 1) return;
  
  const touch = e.touches[0];
  activeTouch = touch.identifier;
  touchStartTime = Date.now();
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

/**
 * Handle touch move event
 * @param {TouchEvent} e
 */
function handleTouchMove(e) {
  if (!activeTouch || e.touches.length !== 1) return;
  
  const touch = e.touches[0];
  const distance = Math.sqrt(
    Math.pow(touch.clientX - touchStartX, 2) +
    Math.pow(touch.clientY - touchStartY, 2)
  );
  
  // If user moved more than threshold, mark as scroll/swipe (not tap)
  if (distance > CONFIG.MIN_TAP_DISTANCE) {
    activeTouch = null;
  }
}

/**
 * Handle touch end event
 * @param {TouchEvent} e
 */
function handleTouchEnd(e) {
  if (!activeTouch) return;
  
  const duration = Date.now() - touchStartTime;
  
  if (duration >= CONFIG.MIN_TAP_DURATION && duration <= CONFIG.MAX_TAP_DURATION) {
    const touch = e.changedTouches[0];
    const distance = Math.sqrt(
      Math.pow(touch.clientX - touchStartX, 2) +
      Math.pow(touch.clientY - touchStartY, 2)
    );
    
    if (distance <= CONFIG.MIN_TAP_DISTANCE) {
      // Valid tap - let browser handle it naturally
      // Allow click to propagate for buttons, cards, etc.
    }
  }
  
  activeTouch = null;
}

/**
 * Handle touch cancel event
 * @param {TouchEvent} e
 */
function handleTouchCancel(e) {
  activeTouch = null;
}

// ============================
// UTILITY FUNCTIONS
// ============================

/**
 * Check if an element is scrollable
 * @param {HTMLElement} el - Element to check
 * @returns {boolean}
 */
export function isScrollableElement(el) {
  if (!el) return false;
  
  const scrollableClasses = [
    'scrollable', 
    'overflow-auto', 
    'tile-content', 
    'dialogue-content', 
    'option-list'
  ];
  
  // Check classes
  for (const cls of scrollableClasses) {
    if (el.classList && el.classList.contains(cls)) return true;
  }
  
  // Check inline/computed overflow
  const overflow = window.getComputedStyle(el).overflow;
  if (overflow === 'auto' || overflow === 'scroll') return true;
  
  // Check parent
  if (el.parentElement && el.parentElement !== document.body) {
    return isScrollableElement(el.parentElement);
  }
  
  return false;
}

/**
 * Check if touch is currently active
 * @returns {boolean}
 */
export function isTouchActive() {
  return activeTouch !== null;
}

/**
 * Get touch distance from start
 * @param {Touch} touch - Current touch
 * @returns {number} Distance in pixels
 */
export function getTouchDistance(touch) {
  if (!touch) return 0;
  return Math.sqrt(
    Math.pow(touch.clientX - touchStartX, 2) +
    Math.pow(touch.clientY - touchStartY, 2)
  );
}

/**
 * Check if current touch is a valid tap (not scroll)
 * @returns {boolean}
 */
export function isValidTap() {
  if (!activeTouch) return false;
  
  const duration = Date.now() - touchStartTime;
  return duration >= CONFIG.MIN_TAP_DURATION && duration <= CONFIG.MAX_TAP_DURATION;
}

// ============================
// INITIALIZATION
// ============================

/**
 * Initialize touch handler
 * Only runs on touch-capable devices
 */
export function initTouchHandler() {
  if (isInitialized) return;
  if (!DeviceInfo.isTouchDevice) return;
  
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  document.addEventListener('touchcancel', handleTouchCancel, { passive: true });
  
  isInitialized = true;
  
  if (window.__DEV_AUDIT__) {
    console.log('👆 Touch handler initialized');
  }
}

/**
 * Cleanup touch handler (for testing)
 */
export function destroyTouchHandler() {
  if (!isInitialized) return;
  
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchmove', handleTouchMove);
  document.removeEventListener('touchend', handleTouchEnd);
  document.removeEventListener('touchcancel', handleTouchCancel);
  
  isInitialized = false;
  activeTouch = null;
}

// ============================
// TOUCH OPTIMIZATION SETUP
// ============================

/**
 * Setup additional touch optimizations
 * Call this after DOM is ready
 */
export function setupTouchOptimizations() {
  if (!DeviceInfo.isTouchDevice) return;
  
  // Prevent double-tap zoom on iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Prevent context menu on long press (except inputs)
  document.addEventListener('contextmenu', (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });
  
  // Add touch feedback class to interactive elements
  const interactiveSelectors = [
    'button',
    '.action-button',
    '.dialogue-option-btn',
    '.option-btn',
    '.vocab-card'
  ];
  
  document.querySelectorAll(interactiveSelectors.join(', ')).forEach(el => {
    el.classList.add('touch-feedback');
  });
  
  // Passive touch start for scroll optimization
  document.addEventListener('touchstart', () => {}, { passive: true });
}

// ============================
// AUTO-INITIALIZE
// ============================
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTouchHandler();
      setupTouchOptimizations();
    });
  } else {
    initTouchHandler();
    setupTouchOptimizations();
  }
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  window.touchHandler = {
    MIN_TAP_DISTANCE: CONFIG.MIN_TAP_DISTANCE,
    MIN_TAP_DURATION: CONFIG.MIN_TAP_DURATION,
    MAX_TAP_DURATION: CONFIG.MAX_TAP_DURATION,
    init: initTouchHandler,
    isScrollableElement,
    isTouchActive,
    isValidTap,
  };
  
  window.TouchHandler = {
    init: initTouchHandler,
    destroy: destroyTouchHandler,
    setupOptimizations: setupTouchOptimizations,
    isScrollableElement,
    isTouchActive,
    getTouchDistance,
    isValidTap,
    CONFIG,
  };
}
