/**
 * Mirror Toggle Utility
 * =====================
 * Shared three-state sentence rendering (UZ / Mirror / EN) for vocab-tile
 * and dialogue-tile. Implements RULE E11: Syntactic Mirroring.
 *
 * Usage:
 *   import { createLineMirrorToggle, buildMirrorHtml, LANG_STATES } from '../utils/mirror-toggle.js';
 *
 * @module src/utils/mirror-toggle
 */

// ============================
// CONSTANTS
// ============================

/** The three display states for any dialogue line */
export const LANG_STATES = {
  UZ: 'uz',       // Natural Uzbek (SOV)
  MIRROR: 'mirror', // Uzbek words in English SVO order, target English words visible
  EN: 'en'         // Full English (SVO)
};

/** Button configurations */
const LANG_BUTTONS = [
  { id: LANG_STATES.UZ,     label: '\u{1F1FA}\u{1F1FF} UZ',      title: 'Natural Uzbek (SOV)' },
  { id: LANG_STATES.MIRROR,  label: '\u{1FA9E}',                  title: 'Mirror — Uzbek words in English order' },
  { id: LANG_STATES.EN,      label: '\u{1F1EC}\u{1F1E7} EN',      title: 'Full English (SVO)' }
];

// ============================
// CSS (injected once)
// ============================
let mirrorCssInjected = false;

function injectMirrorCSS() {
  if (mirrorCssInjected) return;
  mirrorCssInjected = true;

  const style = document.createElement('style');
  style.textContent = `
    /* Mirror toggle button row (inline beside a line) */
    .line-mirror-toggle {
      display: inline-flex;
      gap: 2px;
      vertical-align: middle;
      margin-left: 6px;
      flex-shrink: 0;
    }
    .line-mirror-btn {
      padding: 2px 7px;
      border: 1.5px solid #d0d0d0;
      border-radius: 10px;
      background: #fafafa;
      color: #777;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.15s;
      line-height: 1.3;
      user-select: none;
    }
    .line-mirror-btn:hover {
      background: #eef;
      border-color: #aab;
    }
    .line-mirror-btn.active {
      background: #5a67d8;
      color: white;
      border-color: #5a67d8;
    }
    .line-mirror-btn.disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    /* Mirror text styling */
    .mirror-bracket {
      color: #888;
      font-style: italic;
    }
    .mirror-target-en {
      color: #1a237e;
      font-weight: 600;
    }

    /* The three text layers inside a line */
    .line-text-layer { display: none; }
    .line-text-layer.visible { display: inline; }
  `;
  document.head.appendChild(style);
}

// ============================
// MIRROR TEXT BUILDER
// ============================

/**
 * Build mirror HTML from various data shapes.
 *
 * Priority:
 *  1. `turn.target` array (from dialogue tile format):
 *     [{ uz: "...", en: "..." }, "plain text", ...]
 *  2. `syntax_scaffold` string from card presentation slide
 *  3. Fallback: show [Uzbek text] bracketed
 *
 * @param {Object} opts
 * @param {Array}  [opts.target]          - target array [{uz,en}, string, ...]
 * @param {string} [opts.syntax_scaffold] - raw scaffold string
 * @param {string} [opts.text_uz]         - fallback Uzbek text
 * @param {string} [opts.text_en]         - fallback English text
 * @returns {string} HTML string
 */
export function buildMirrorHtml({ target, syntax_scaffold, text_uz, text_en }) {
  // Path 1: structured target array
  if (target && Array.isArray(target) && target.length > 0) {
    const parts = target.map(t => {
      if (typeof t === 'string') return escapeHtml(t);
      if (t && t.uz && t.en) {
        return `<span class="mirror-bracket">[${escapeHtml(t.uz)}]</span> <span class="mirror-target-en">${escapeHtml(t.en)}</span>`;
      }
      return escapeHtml(t?.en || t?.uz || '');
    });
    return parts.join(' ');
  }

  // Path 2: syntax_scaffold string (may contain [brackets] and **bold**)
  if (syntax_scaffold && typeof syntax_scaffold === 'string') {
    let html = escapeHtml(syntax_scaffold);
    // Convert [brackets] to mirror-bracket spans
    html = html.replace(/\[([^\]]+)\]/g, '<span class="mirror-bracket">[$1]</span>');
    // Convert **bold** to target spans
    html = html.replace(/\*\*([^*]+)\*\*/g, '<span class="mirror-target-en">$1</span>');
    return html;
  }

  // Path 3: fallback
  if (text_uz) return `<span class="mirror-bracket">[${escapeHtml(text_uz)}]</span>`;
  return escapeHtml(text_en || '');
}

// ============================
// LINE ELEMENT BUILDER
// ============================

/**
 * Create the three text layers (UZ / Mirror / EN) for one dialogue line.
 * Returns a container fragment with three .line-text-layer divs.
 *
 * @param {Object} opts
 * @param {string} opts.text_en   - English text
 * @param {string} opts.text_uz   - Uzbek text
 * @param {string} [opts.mirrorHtml] - Pre-built mirror HTML (from buildMirrorHtml)
 * @param {string} [opts.initialState] - 'uz' | 'mirror' | 'en' (default 'uz')
 * @returns {{ container: DocumentFragment, layers: {uz: HTMLElement, mirror: HTMLElement, en: HTMLElement} }}
 */
export function createTextLayers({ text_en, text_uz, mirrorHtml, initialState = LANG_STATES.UZ }) {
  const frag = document.createDocumentFragment();
  const state = initialState;

  // UZ layer
  const uzEl = document.createElement('span');
  uzEl.className = `line-text-layer line-text-uz ${state === LANG_STATES.UZ ? 'visible' : ''}`;
  uzEl.textContent = text_uz || '';

  // Mirror layer
  const mirrorEl = document.createElement('span');
  mirrorEl.className = `line-text-layer line-text-mirror ${state === LANG_STATES.MIRROR ? 'visible' : ''}`;
  mirrorEl.innerHTML = mirrorHtml || buildMirrorHtml({ text_uz, text_en });

  // EN layer
  const enEl = document.createElement('span');
  enEl.className = `line-text-layer line-text-en ${state === LANG_STATES.EN ? 'visible' : ''}`;
  enEl.textContent = text_en || '';

  frag.appendChild(uzEl);
  frag.appendChild(mirrorEl);
  frag.appendChild(enEl);

  return { container: frag, layers: { uz: uzEl, mirror: mirrorEl, en: enEl } };
}

// ============================
// TOGGLE BUTTON ROW
// ============================

/**
 * Create a small toggle button group (UZ / 🪞 / EN) for one dialogue line.
 *
 * @param {Object} opts
 * @param {string}   [opts.initialState='uz']     - Starting language state
 * @param {boolean}  [opts.mirrorEnabled=true]     - Whether mirror button is clickable
 * @param {Function} opts.onChange                  - Callback(newState) when user clicks a button
 * @returns {HTMLElement} A div.line-mirror-toggle with three buttons
 */
export function createLineMirrorToggle({ initialState = LANG_STATES.UZ, mirrorEnabled = true, onChange }) {
  injectMirrorCSS();

  const row = document.createElement('span');
  row.className = 'line-mirror-toggle';

  let current = initialState;

  LANG_BUTTONS.forEach(cfg => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `line-mirror-btn ${cfg.id === current ? 'active' : ''} ${cfg.id === LANG_STATES.MIRROR && !mirrorEnabled ? 'disabled' : ''}`;
    btn.textContent = cfg.label;
    btn.title = cfg.title;
    btn.dataset.lang = cfg.id;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (cfg.id === LANG_STATES.MIRROR && !mirrorEnabled) return;
      if (cfg.id === current) return;
      current = cfg.id;

      row.querySelectorAll('.line-mirror-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === current);
      });

      if (typeof onChange === 'function') onChange(current);
    });

    row.appendChild(btn);
  });

  return row;
}

/**
 * Update which text layer is visible based on the current state.
 *
 * @param {{ uz: HTMLElement, mirror: HTMLElement, en: HTMLElement }} layers
 * @param {string} state - 'uz' | 'mirror' | 'en'
 */
export function setLayerVisibility(layers, state) {
  if (!layers) return;
  const { uz, mirror, en } = layers;
  if (uz) uz.classList.toggle('visible', state === LANG_STATES.UZ);
  if (mirror) mirror.classList.toggle('visible', state === LANG_STATES.MIRROR);
  if (en) en.classList.toggle('visible', state === LANG_STATES.EN);
}

// ============================
// GLOBAL TOGGLE (for all lines at once, used by dialogue tile)
// ============================

/**
 * Create a "global" language toggle toolbar (UZ / 🪞 / EN).
 * Calls onChange for every state change; caller updates all lines.
 *
 * @param {Object} opts
 * @param {string}   [opts.initialState='uz']
 * @param {boolean}  [opts.mirrorEnabled=true]
 * @param {Function} opts.onChange - Callback(newState)
 * @returns {HTMLElement} Toggle row div
 */
export function createGlobalMirrorToggle({ initialState = LANG_STATES.EN, mirrorEnabled = true, onChange }) {
  injectMirrorCSS();

  const row = document.createElement('div');
  row.className = 'lang-toggle-group';
  row.style.cssText = 'display: flex; gap: 4px; justify-content: center; margin-bottom: 12px;';

  let current = initialState;

  LANG_BUTTONS.forEach(cfg => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `lang-toggle-btn ${cfg.id === current ? 'active' : ''} ${cfg.id === LANG_STATES.MIRROR && !mirrorEnabled ? 'disabled' : ''}`;
    btn.textContent = cfg.label;
    btn.title = cfg.title;
    btn.dataset.lang = cfg.id;
    btn.style.cssText = `padding: 6px 14px; border: 2px solid ${cfg.id === current ? '#5a67d8' : '#e0e0e0'}; border-radius: 20px; background: ${cfg.id === current ? '#5a67d8' : 'white'}; color: ${cfg.id === current ? 'white' : '#555'}; font-size: 13px; cursor: pointer; transition: all 0.2s;`;

    btn.addEventListener('click', () => {
      if (cfg.id === LANG_STATES.MIRROR && !mirrorEnabled) return;
      if (cfg.id === current) return;
      current = cfg.id;

      row.querySelectorAll('.lang-toggle-btn').forEach(b => {
        if (b instanceof HTMLElement) {
          const isActive = b.dataset.lang === current;
          b.classList.toggle('active', isActive);
          b.style.border = `2px solid ${isActive ? '#5a67d8' : '#e0e0e0'}`;
          b.style.background = isActive ? '#5a67d8' : 'white';
          b.style.color = isActive ? 'white' : '#555';
        }
      });

      if (typeof onChange === 'function') onChange(current);
    });

    row.appendChild(btn);
  });

  return row;
}

// ============================
// HELPER
// ============================
function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
