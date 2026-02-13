/**
 * Button Component
 * ================
 * Reusable button creation utilities.
 * Pure ES Module with accessibility support.
 * 
 * @module src/components/button
 * @version 2.0.0 (Phase 2 Refactor)
 */

import { createElement } from '../utils/dom.js';

// ============================
// BUTTON FACTORY
// ============================

/**
 * Button configuration options
 * @typedef {Object} ButtonOptions
 * @property {string} [variant='primary'] - Button style variant
 * @property {string} [size='md'] - Button size (sm, md, lg)
 * @property {string} [icon] - Icon to prepend (emoji or HTML)
 * @property {boolean} [disabled=false] - Disabled state
 * @property {string} [className] - Additional CSS classes
 * @property {string} [type='button'] - Button type attribute
 * @property {boolean} [ripple=true] - Enable ripple effect
 * @property {Object} [dataset] - Data attributes
 */

/**
 * Create a styled button element
 * @param {string} text - Button label
 * @param {Function} onClick - Click handler
 * @param {ButtonOptions} [options={}] - Configuration options
 * @returns {HTMLButtonElement}
 */
export function createButton(text, onClick, options = {}) {
  const {
    variant = 'primary',
    size = 'md',
    icon = null,
    disabled = false,
    className = '',
    type = 'button',
    ripple = true,
    dataset = {},
  } = options;
  
  // Build class list
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    className,
  ].filter(Boolean).join(' ');
  
  const btn = createElement('button', {
    type,
    className: classes,
    disabled,
    dataset,
  });
  
  // Set content
  if (icon) {
    btn.innerHTML = `<span class="btn-icon">${icon}</span> ${text}`;
  } else {
    btn.textContent = text;
  }
  
  // Add click handler with ripple effect
  btn.addEventListener('click', (e) => {
    const btnEl = /** @type {HTMLButtonElement} */ (btn);
    if (btnEl.disabled) return;
    
    // Ripple effect
    if (ripple) {
      addRippleEffect(btnEl, e);
    }
    
    // Call handler
    if (typeof onClick === 'function') {
      onClick(e);
    }
  });
  
  return /** @type {HTMLButtonElement} */ (btn);
}

/**
 * Create a primary action button (Next, Submit, etc.)
 * @param {string} text - Button label
 * @param {Function} onClick - Click handler
 * @param {ButtonOptions} [options={}] - Additional options
 * @returns {HTMLButtonElement}
 */
export function createPrimaryButton(text, onClick, options = {}) {
  return createButton(text, onClick, { ...options, variant: 'primary' });
}

/**
 * Create a secondary action button
 * @param {string} text - Button label
 * @param {Function} onClick - Click handler
 * @param {ButtonOptions} [options={}] - Additional options
 * @returns {HTMLButtonElement}
 */
export function createSecondaryButton(text, onClick, options = {}) {
  return createButton(text, onClick, { ...options, variant: 'secondary' });
}

/**
 * Create a success button (Correct, Done, etc.)
 * @param {string} text - Button label
 * @param {Function} onClick - Click handler
 * @param {ButtonOptions} [options={}] - Additional options
 * @returns {HTMLButtonElement}
 */
export function createSuccessButton(text, onClick, options = {}) {
  return createButton(text, onClick, { ...options, variant: 'success' });
}

/**
 * Create a danger button (Delete, Cancel, etc.)
 * @param {string} text - Button label
 * @param {Function} onClick - Click handler
 * @param {ButtonOptions} [options={}] - Additional options
 * @returns {HTMLButtonElement}
 */
export function createDangerButton(text, onClick, options = {}) {
  return createButton(text, onClick, { ...options, variant: 'danger' });
}

/**
 * Create a navigation button (Back/Next)
 * @param {string} direction - 'back' or 'next'
 * @param {Function} onClick - Click handler
 * @param {string} [label] - Optional custom label
 * @returns {HTMLButtonElement}
 */
export function createNavButton(direction, onClick, label = null) {
  const isBack = direction === 'back';
  const icon = isBack ? '⬅️' : '➡️';
  const defaultLabel = isBack ? 'Back' : 'Next';
  
  return createButton(label || defaultLabel, onClick, {
    variant: isBack ? 'secondary' : 'primary',
    icon,
    className: `nav-btn nav-btn-${direction}`,
  });
}

/**
 * Create a tile navigation button (Previous Tile / Next Tile)
 * @param {string} text - Button label
 * @param {Function} onClick - Click handler
 * @param {boolean} [isPrimary=true] - Primary or secondary style
 * @returns {HTMLButtonElement}
 */
export function createTileNavButton(text, onClick, isPrimary = true) {
  const btn = createButton(text, onClick, {
    variant: isPrimary ? 'primary' : 'secondary',
    className: 'tile-nav-btn',
  });
  
  return btn;
}

/**
 * Create a back button with specific styling
 * @param {string} previousTileName - Name of the previous tile
 * @param {Function} onClick - Click handler
 * @returns {HTMLButtonElement}
 */
export function createBackButton(previousTileName, onClick) {
  const btn = createElement('button', {
    type: 'button',
    className: 'back-button btn--dark',
  });
  
  btn.textContent = `⬅️ ${previousTileName}`;
  
  // Click with animation
  btn.addEventListener('click', (e) => {
    const btnEl = /** @type {HTMLButtonElement} */ (btn);
    btnEl.classList.add('btn-press');
    setTimeout(() => {
      btnEl.classList.remove('btn-press');
      onClick(e);
    }, 100);
  });
  
  return /** @type {HTMLButtonElement} */ (btn);
}

// ============================
// RIPPLE EFFECT
// ============================

/**
 * Add ripple effect to a button click
 * @param {HTMLButtonElement} btn - Button element
 * @param {MouseEvent} e - Click event
 */
export function addRippleEffect(btn, e) {
  // Remove existing ripples
  const existingRipples = btn.querySelectorAll('.ripple-effect');
  existingRipples.forEach(r => r.remove());
  
  // Create ripple
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  Object.assign(ripple.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${e.clientX - rect.left - size / 2}px`,
    top: `${e.clientY - rect.top - size / 2}px`,
  });
  
  btn.appendChild(ripple);
  
  // Remove after animation
  setTimeout(() => ripple.remove(), 600);
}

// ============================
// BUTTON GROUP
// ============================

/**
 * Create a button group container
 * @param {Array<HTMLButtonElement>} buttons - Array of button elements
 * @param {Object} [options={}] - Options
 * @param {string} [options.className] - Additional CSS class
 * @param {string} [options.direction='horizontal'] - Layout direction
 * @returns {HTMLDivElement}
 */
export function createButtonGroup(buttons, options = {}) {
  const { className = '', direction = 'horizontal' } = options;
  
  const group = createElement('div', {
    className: `btn-group btn-group-${direction} ${className}`.trim(),
  });
  
  for (const btn of buttons) {
    if (btn instanceof HTMLElement) {
      group.appendChild(btn);
    }
  }
  
  return /** @type {HTMLDivElement} */ (group);
}

/**
 * Create action buttons row (typical Next/Back pattern)
 * @param {Object} config - Configuration
 * @param {Object} [config.back] - Back button config { label, onClick }
 * @param {Object} config.next - Next button config { label, onClick }
 * @returns {HTMLDivElement}
 */
export function createActionButtons({ back, next }) {
  const buttons = [];
  
  if (back) {
    buttons.push(createNavButton('back', back.onClick, back.label));
  }
  
  if (next) {
    buttons.push(createNavButton('next', next.onClick, next.label));
  }
  
  return createButtonGroup(buttons, { className: 'action-buttons' });
}

// ============================
// ICON BUTTONS
// ============================

/**
 * Create an icon-only button
 * @param {string} icon - Icon (emoji or HTML)
 * @param {Function} onClick - Click handler
 * @param {string} [ariaLabel] - Accessibility label
 * @param {ButtonOptions} [options={}] - Additional options
 * @returns {HTMLButtonElement}
 */
export function createIconButton(icon, onClick, ariaLabel = '', options = {}) {
  const btn = createElement('button', {
    type: 'button',
    className: `btn-icon-only ${options.className || ''}`.trim(),
    'aria-label': ariaLabel,
    title: ariaLabel,
  });
  
  btn.innerHTML = icon;
  
  btn.addEventListener('click', (e) => {
    const btnEl = /** @type {HTMLButtonElement} */ (btn);
    if (btnEl.disabled) return;
    addRippleEffect(btnEl, e);
    onClick(e);
  });
  
  return /** @type {HTMLButtonElement} */ (btn);
}

/**
 * Create a play/pause audio button
 * @param {Function} onToggle - Toggle handler (receives isPlaying state)
 * @returns {HTMLButtonElement}
 */
export function createPlayButton(onToggle) {
  let isPlaying = false;
  
  const btn = createIconButton('🔊', () => {
    isPlaying = !isPlaying;
    btn.innerHTML = isPlaying ? '⏸️' : '🔊';
    btn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    onToggle(isPlaying);
  }, 'Play audio');
  
  btn.classList.add('play-btn');
  
  return btn;
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  window.ButtonComponents = {
    createButton,
    createPrimaryButton,
    createSecondaryButton,
    createSuccessButton,
    createDangerButton,
    createNavButton,
    createTileNavButton,
    createBackButton,
    createButtonGroup,
    createActionButtons,
    createIconButton,
    createPlayButton,
    addRippleEffect,
  };
}
