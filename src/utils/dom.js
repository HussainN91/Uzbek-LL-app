/**
 * DOM Utility Functions
 * =====================
 * Common DOM manipulation helpers.
 * Pure ES Module - no window.* dependencies.
 * 
 * @module src/utils/dom
 * @version 2.0.0 (Phase 2 Refactor)
 */

/**
 * Safely get an element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
export function getElementById(id) {
  return document.getElementById(id);
}

/**
 * Create an element with optional attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} [attrs={}] - Attributes to set
 * @param {Array<Node|string>} [children=[]] - Child nodes or text
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  
  // Set attributes
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      // Event handlers: onClick -> click
      const event = key.substring(2).toLowerCase();
      el.addEventListener(event, value);
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.assign(el.dataset, value);
    } else {
      el.setAttribute(key, value);
    }
  }
  
  // Add children
  for (const child of children) {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }
  
  return el;
}

/**
 * Create a document fragment for batch DOM operations
 * @param {Array<Node>} nodes - Nodes to add to fragment
 * @returns {DocumentFragment}
 */
export function createFragment(nodes = []) {
  const fragment = document.createDocumentFragment();
  for (const node of nodes) {
    if (node instanceof Node) {
      fragment.appendChild(node);
    }
  }
  return fragment;
}

/**
 * Clear all children from an element
 * @param {HTMLElement} el - Element to clear
 */
export function clearElement(el) {
  if (!el) return;
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/**
 * Add CSS class(es) to an element
 * @param {HTMLElement} el - Target element
 * @param {...string} classes - Class names to add
 */
export function addClass(el, ...classes) {
  if (!el) return;
  el.classList.add(...classes.filter(Boolean));
}

/**
 * Remove CSS class(es) from an element
 * @param {HTMLElement} el - Target element
 * @param {...string} classes - Class names to remove
 */
export function removeClass(el, ...classes) {
  if (!el) return;
  el.classList.remove(...classes.filter(Boolean));
}

/**
 * Toggle a CSS class on an element
 * @param {HTMLElement} el - Target element
 * @param {string} className - Class name to toggle
 * @param {boolean} [force] - Optional force state
 * @returns {boolean} Whether class is now present
 */
export function toggleClass(el, className, force) {
  if (!el) return false;
  return el.classList.toggle(className, force);
}

/**
 * Check if element has a class
 * @param {HTMLElement} el - Target element
 * @param {string} className - Class name to check
 * @returns {boolean}
 */
export function hasClass(el, className) {
  if (!el) return false;
  return el.classList.contains(className);
}

/**
 * Show an element (remove display:none)
 * @param {HTMLElement} el - Element to show
 * @param {string} [displayValue='block'] - Display value to use
 */
export function showElement(el, displayValue = 'block') {
  if (!el) return;
  el.style.display = displayValue;
}

/**
 * Hide an element (set display:none)
 * @param {HTMLElement} el - Element to hide
 */
export function hideElement(el) {
  if (!el) return;
  el.style.display = 'none';
}

/**
 * Query selector wrapper with null safety
 * @param {string} selector - CSS selector
 * @param {Document|Element} [parent=document] - Parent element to search within
 * @returns {Element|null}
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Query selector all wrapper
 * @param {string} selector - CSS selector
 * @param {Document|Element} [parent=document] - Parent element to search within
 * @returns {NodeListOf<Element>}
 */
export function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Set multiple styles on an element
 * @param {HTMLElement} el - Target element
 * @param {Object} styles - Style properties and values
 */
export function setStyles(el, styles) {
  if (!el || !styles) return;
  for (const [prop, value] of Object.entries(styles)) {
    el.style[prop] = value;
  }
}

/**
 * Get computed style value
 * @param {HTMLElement} el - Target element
 * @param {string} property - CSS property name
 * @returns {string}
 */
export function getStyle(el, property) {
  if (!el) return '';
  return window.getComputedStyle(el).getPropertyValue(property);
}

/**
 * Scroll element into view smoothly
 * @param {HTMLElement} el - Element to scroll to
 * @param {Object} [options] - ScrollIntoView options
 */
export function scrollIntoView(el, options = { behavior: 'smooth', block: 'center' }) {
  if (!el) return;
  el.scrollIntoView(options);
}

/**
 * Check if element is visible in viewport
 * @param {HTMLElement} el - Element to check
 * @returns {boolean}
 */
export function isInViewport(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Add event listener with automatic cleanup
 * @param {EventTarget} el - Target element
 * @param {string} event - Event name
 * @param {(event: Event) => void} handler - Event handler
 * @param {Object} [options] - Event listener options
 * @returns {() => void} Cleanup function to remove listener
 */
export function on(el, event, handler, options = {}) {
  if (!el) return () => {};
  const listener = /** @type {EventListener} */ (handler);
  el.addEventListener(event, listener, options);
  return () => el.removeEventListener(event, listener, options);
}

/**
 * Add delegated event listener
 * @param {HTMLElement} parent - Parent element
 * @param {string} event - Event name
 * @param {string} selector - Child selector to match
 * @param {Function} handler - Event handler (receives matched element)
 * @returns {Function} Cleanup function
 */
export function delegate(parent, event, selector, handler) {
  if (!parent) return () => {};
  
  const delegatedHandler = (e) => {
    const target = e.target && e.target instanceof Element ? e.target.closest(selector) : null;
    if (target && parent.contains(target)) {
      handler.call(target, e, target);
    }
  };
  
  parent.addEventListener(event, delegatedHandler);
  return () => parent.removeEventListener(event, delegatedHandler);
}

/**
 * Wait for DOM ready
 * @returns {Promise<void>}
 */
export function ready() {
  return new Promise((resolve) => {
    if (document.readyState !== 'loading') {
      resolve();
    } else {
      const onReady = () => resolve();
      document.addEventListener('DOMContentLoaded', onReady, { once: true });
    }
  });
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  window.DOMUtils = {
    getElementById,
    createElement,
    createFragment,
    clearElement,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    showElement,
    hideElement,
    $,
    $$,
    setStyles,
    getStyle,
    scrollIntoView,
    isInViewport,
    on,
    delegate,
    ready,
  };
}
