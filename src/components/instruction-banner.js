/**
 * Instruction Banner Component
 * ==============================
 * Shows a collapsible Uzbek instruction banner at the top of each tile.
 * Includes optional pair work indicator.
 *
 * Design: Glassmorphism card with Uzbek text, icon, and EN tooltip.
 * Collapsible so it doesn't overwhelm the screen.
 * Audio-first: includes a "read aloud" button for non-readers.
 *
 * @module src/components/instruction-banner
 * @version 1.0.0
 */

import { getInstructionForTile } from '../core/uz-instructions.js';
import { uz, en } from '../core/i18n.js';

// ============================
// CSS INJECTION (once)
// ============================
let cssInjected = false;
function injectBannerCSS() {
  if (cssInjected) return;
  cssInjected = true;

  const style = document.createElement('style');
  style.textContent = `
    /* ── Instruction Banner ── */
    .instruction-banner {
      background: linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 100%);
      border: 1px solid rgba(59,130,246,0.25);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 16px;
      position: relative;
      transition: all 0.3s ease;
      backdrop-filter: blur(6px);
    }
    .instruction-banner.collapsed .instruction-body {
      display: none;
    }
    .instruction-banner.collapsed {
      padding: 8px 16px;
    }
    .instruction-header {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .instruction-icon {
      font-size: 1.3rem;
      flex-shrink: 0;
    }
    .instruction-label {
      font-weight: 600;
      font-size: 0.85rem;
      color: #3b82f6;
      flex: 1;
    }
    .instruction-toggle {
      font-size: 0.75rem;
      color: #94a3b8;
      transition: transform 0.3s;
    }
    .instruction-banner.collapsed .instruction-toggle {
      transform: rotate(-90deg);
    }
    .instruction-body {
      margin-top: 8px;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #1e293b;
    }
    .instruction-text-uz {
      margin-bottom: 4px;
    }
    .instruction-text-en {
      font-size: 0.8rem;
      color: #64748b;
      font-style: italic;
    }
    .instruction-audio-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 6px;
      padding: 4px 10px;
      background: rgba(59,130,246,0.15);
      border: 1px solid rgba(59,130,246,0.3);
      border-radius: 16px;
      font-size: 0.8rem;
      color: #3b82f6;
      cursor: pointer;
      transition: background 0.2s;
    }
    .instruction-audio-btn:hover {
      background: rgba(59,130,246,0.25);
    }

    /* ── Pair Work Banner ── */
    .pair-work-banner {
      background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(52,211,153,0.08) 100%);
      border: 1px solid rgba(16,185,129,0.25);
      border-radius: 10px;
      padding: 10px 14px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: #065f46;
    }
    .pair-work-icon {
      font-size: 1.2rem;
    }
    .pair-work-text {
      flex: 1;
    }

    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      .instruction-banner {
        background: linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.1) 100%);
        border-color: rgba(59,130,246,0.3);
      }
      .instruction-body { color: #e2e8f0; }
      .instruction-text-en { color: #94a3b8; }
      .pair-work-banner {
        background: linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(52,211,153,0.1) 100%);
        border-color: rgba(16,185,129,0.3);
        color: #a7f3d0;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================
// STORAGE: remember collapsed state per tile
// ============================
const STORAGE_KEY = 'instruction_banner_collapsed';

function isCollapsed(tileState) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return saved[tileState] === true;
  } catch { return false; }
}

function setCollapsed(tileState, collapsed) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    saved[tileState] = collapsed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch { /* ignore */ }
}

// ============================
// PUBLIC API
// ============================

/**
 * Create an instruction banner for a tile.
 * @param {string} tileState - Tile state key (e.g. 'dialogue', 'vocab')
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.showPairWork=false] - Show pair work indicator
 * @param {boolean} [options.showAudio=true] - Show read-aloud button
 * @returns {HTMLElement|null} The banner element, or null if no instruction found
 */
export function createInstructionBanner(tileState, options = {}) {
  injectBannerCSS();

  const instruction = getInstructionForTile(tileState);
  if (!instruction) return null;

  const { showPairWork = false, showAudio = true } = options;
  const collapsed = isCollapsed(tileState);

  // Main wrapper
  const banner = document.createElement('div');
  banner.className = `instruction-banner${collapsed ? ' collapsed' : ''}`;
  banner.dataset.tile = tileState;

  // Header (always visible, clickable to toggle)
  const header = document.createElement('div');
  header.className = 'instruction-header';
  header.innerHTML = `
    <span class="instruction-icon">${instruction.icon}</span>
    <span class="instruction-label">${uz('instructionBanner.label')}</span>
    <span class="instruction-toggle">▼</span>
  `;
  header.addEventListener('click', () => {
    const isNowCollapsed = banner.classList.toggle('collapsed');
    setCollapsed(tileState, isNowCollapsed);
  });

  // Body (collapsible)
  const body = document.createElement('div');
  body.className = 'instruction-body';

  // Uzbek text
  const uzText = document.createElement('div');
  uzText.className = 'instruction-text-uz tl-uz';
  uzText.textContent = instruction.uz;
  uzText.dataset.translation = instruction.en;
  body.appendChild(uzText);

  // English text (smaller, italic — for teacher reference)
  const enText = document.createElement('div');
  enText.className = 'instruction-text-en';
  enText.textContent = instruction.en;
  body.appendChild(enText);

  // Audio read-aloud button (for non-readers)
  // NOTE: Uzbek TTS disabled — most browsers lack Uzbek voices
  if (false && showAudio && window.speechSynthesis) {
    const audioBtn = document.createElement('button');
    audioBtn.className = 'instruction-audio-btn';
    audioBtn.innerHTML = uz('instructionBanner.audioBtn');
    audioBtn.title = en('instructionBanner.audioTitle');
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      readAloud(instruction.uz, 'uz');
    });
    body.appendChild(audioBtn);
  }

  // Pair work indicator
  if (showPairWork && instruction.pairWork) {
    const pairDiv = document.createElement('div');
    pairDiv.className = 'pair-work-banner';
    pairDiv.innerHTML = `
      <span class="pair-work-icon">👥</span>
      <span class="pair-work-text tl-uz" data-translation="${instruction.pairWorkEn || ''}">${instruction.pairWork}</span>
    `;
    body.appendChild(pairDiv);
  }

  banner.appendChild(header);
  banner.appendChild(body);

  return banner;
}

/**
 * Read text aloud using browser TTS.
 * @param {string} text - Text to read
 * @param {string} [lang='uz'] - Language code
 */
function readAloud(text, lang = 'uz') {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  // Uzbek TTS is rarely available; fall back to Russian which shares Cyrillic pronunciation patterns
  // or just use default
  utterance.lang = lang === 'uz' ? 'uz-UZ' : 'en-US';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
if (typeof window !== 'undefined') {
  window.createInstructionBanner = createInstructionBanner;
}
