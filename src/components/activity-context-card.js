/**
 * Activity Context Card Component
 * ================================
 * Displays a brief context overlay before each tile transition,
 * helping students understand WHAT they're about to do.
 * 
 * Research Basis: Cognitive Load Theory (Sweller) - 
 * making goals explicit reduces extraneous load.
 * 
 * @module src/components/activity-context-card
 */

import { STATES } from '../utils/constants.js';
import { shouldShowActivityCards } from '../state/app-state.js';
import { uz, en } from '../core/i18n.js';

// ============================
// ACTIVITY METADATA
// ============================

/** Activity type definitions with icons, colors, and descriptions */
const ACTIVITY_METADATA = {
  [STATES.INTRO]: {
    icon: '🏠',
    label: 'Introduction',
    labelUz: uz('activityCard.intro.label'),
    color: '#5a67d8', // Indigo
    skills: ['Overview'],
    estimatedMinutes: 1,
    descriptionEn: en('activityCard.intro.desc'),
    descriptionUz: uz('activityCard.intro.desc')
  },
  [STATES.VOCAB]: {
    icon: '📚',
    label: 'Vocabulary',
    labelUz: uz('activityCard.vocab.label'),
    color: '#3182ce', // Blue
    skills: ['Reading', 'Listening', 'Grammar'],
    estimatedMinutes: 5,
    descriptionEn: en('activityCard.vocab.desc'),
    descriptionUz: uz('activityCard.vocab.desc')
  },
  [STATES.DIALOGUE]: {
    icon: '💬',
    label: 'Dialogue',
    labelUz: uz('activityCard.dialogue.label'),
    color: '#38a169', // Green
    skills: ['Listening', 'Speaking', 'Grammar'],
    estimatedMinutes: 4,
    descriptionEn: en('activityCard.dialogue.desc'),
    descriptionUz: uz('activityCard.dialogue.desc')
  },
  [STATES.PATTERN]: {
    icon: '🧩',
    label: 'Pattern Practice',
    labelUz: uz('activityCard.pattern.label'),
    color: '#d69e2e', // Gold
    skills: ['Grammar', 'Writing'],
    estimatedMinutes: 3,
    descriptionEn: en('activityCard.pattern.desc'),
    descriptionUz: uz('activityCard.pattern.desc')
  },
  [STATES.FUNCTION]: {
    icon: '🎯',
    label: 'Function Check',
    labelUz: uz('activityCard.function.label'),
    color: '#e53e3e', // Red
    skills: ['Grammar', 'Reading'],
    estimatedMinutes: 2,
    descriptionEn: en('activityCard.function.desc'),
    descriptionUz: uz('activityCard.function.desc')
  },
  [STATES.CONTROLLED]: {
    icon: '✍️',
    label: 'Controlled Practice',
    labelUz: uz('activityCard.controlled.label'),
    color: '#805ad5', // Purple
    skills: ['Writing', 'Grammar'],
    estimatedMinutes: 4,
    descriptionEn: en('activityCard.controlled.desc'),
    descriptionUz: uz('activityCard.controlled.desc')
  },
  [STATES.WRITING]: {
    icon: '📝',
    label: 'Free Writing',
    labelUz: uz('activityCard.writing.label'),
    color: '#2b6cb0', // Dark Blue
    skills: ['Writing', 'Grammar'],
    estimatedMinutes: 3,
    descriptionEn: en('activityCard.writing.desc'),
    descriptionUz: uz('activityCard.writing.desc')
  },
  [STATES.LISTEN_WRITE]: {
    icon: '👂',
    label: 'Listen & Write',
    labelUz: uz('activityCard.listenWrite.label'),
    color: '#319795', // Teal
    skills: ['Listening', 'Writing'],
    estimatedMinutes: 3,
    descriptionEn: en('activityCard.listenWrite.desc'),
    descriptionUz: uz('activityCard.listenWrite.desc')
  },
  [STATES.MISTAKE]: {
    icon: '🔄',
    label: 'Error Correction',
    labelUz: uz('activityCard.mistake.label'),
    color: '#c53030', // Dark Red
    skills: ['Grammar', 'Writing'],
    estimatedMinutes: 2,
    descriptionEn: en('activityCard.mistake.desc'),
    descriptionUz: uz('activityCard.mistake.desc')
  },
  [STATES.DONE]: {
    icon: '🎉',
    label: 'Complete!',
    labelUz: uz('activityCard.done.label'),
    color: '#38a169', // Green
    skills: [],
    estimatedMinutes: 0,
    descriptionEn: en('activityCard.done.desc'),
    descriptionUz: uz('activityCard.done.desc')
  }
};

/** Tile order for progress calculation */
const TILE_ORDER = [
  STATES.INTRO,
  STATES.VOCAB,
  STATES.DIALOGUE,
  STATES.PATTERN,
  STATES.FUNCTION,
  STATES.CONTROLLED,
  STATES.WRITING,
  STATES.LISTEN_WRITE,
  STATES.MISTAKE,
  STATES.DONE
];

// ============================
// CSS INJECTION
// ============================

let cssInjected = false;

function injectActivityCardCSS() {
  if (cssInjected) return;
  cssInjected = true;

  const style = document.createElement('style');
  style.id = 'activity-context-card-css';
  style.textContent = `
    /* Activity Context Card Overlay */
    .activity-context-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      animation: acc-overlay-in 0.3s ease-out;
    }

    @keyframes acc-overlay-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .activity-context-card {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      border-radius: 24px;
      padding: 32px 40px;
      max-width: 420px;
      width: 90%;
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.1);
      animation: acc-card-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      text-align: center;
    }

    @keyframes acc-card-in {
      from { 
        opacity: 0; 
        transform: scale(0.9) translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }

    /* Progress Bar */
    .acc-progress-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 24px;
    }

    .acc-progress-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .acc-progress-dot.completed {
      background: #38a169;
    }

    .acc-progress-dot.current {
      background: var(--acc-color, #5a67d8);
      box-shadow: 0 0 12px var(--acc-color, #5a67d8);
      transform: scale(1.3);
    }

    /* Icon */
    .acc-icon {
      font-size: 3rem;
      margin-bottom: 16px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }

    /* Step Badge */
    .acc-step-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Title */
    .acc-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
    }

    /* Description */
    .acc-description-uz {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .acc-description-en {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.6);
      font-style: italic;
      margin-bottom: 20px;
    }

    /* Skills Pills */
    .acc-skills {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-bottom: 24px;
    }

    .acc-skill-pill {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.7rem;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 12px;
    }

    /* Time Estimate */
    .acc-time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.8rem;
      margin-bottom: 24px;
    }

    /* CTA Button */
    .acc-cta {
      background: linear-gradient(135deg, var(--acc-color, #5a67d8), color-mix(in srgb, var(--acc-color, #5a67d8) 80%, black));
      color: white;
      border: none;
      padding: 14px 32px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    .acc-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
    }

    .acc-cta:active {
      transform: translateY(0);
    }

    /* Quick dismiss hint */
    .acc-dismiss-hint {
      margin-top: 16px;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.4);
    }
  `;
  document.head.appendChild(style);
}

// ============================
// PUBLIC API
// ============================

/**
 * Show the activity context card before a tile
 * @param {string} targetTile - The tile state we're transitioning to
 * @param {Object} [options] - Additional options
 * @param {string} [options.lessonTitle] - Lesson title to display
 * @param {string} [options.grammarFocus] - Grammar focus for this activity
 * @returns {Promise<void>} Resolves when user dismisses
 */
export function showActivityContextCard(targetTile, options = {}) {
  return new Promise((resolve) => {
    // Check if we should show cards
    if (!shouldShowActivityCards()) {
      resolve();
      return;
    }

    // Don't show for DONE tile
    if (targetTile === STATES.DONE) {
      resolve();
      return;
    }

    injectActivityCardCSS();

    const meta = ACTIVITY_METADATA[targetTile] || ACTIVITY_METADATA[STATES.INTRO];
    const currentIndex = TILE_ORDER.indexOf(/** @type {import('../types/state.d.ts').TileState} */ (targetTile));
    const totalSteps = TILE_ORDER.length - 1; // Exclude DONE from count

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'activity-context-overlay';
    overlay.style.setProperty('--acc-color', meta.color);

    // Build progress dots
    const progressDots = TILE_ORDER.slice(0, -1).map((tile, i) => {
      const isCompleted = i < currentIndex;
      const isCurrent = i === currentIndex;
      return `<div class="acc-progress-dot ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}"></div>`;
    }).join('');

    // Build skills pills
    const skillsPills = meta.skills.map(skill => 
      `<span class="acc-skill-pill">${skill}</span>`
    ).join('');

    overlay.innerHTML = `
      <div class="activity-context-card">
        <div class="acc-progress-bar">
          ${progressDots}
        </div>
        <div class="acc-icon">${meta.icon}</div>
        <div class="acc-step-badge">Qadam ${currentIndex + 1} / ${totalSteps}</div>
        <div class="acc-title">${meta.labelUz}</div>
        <div class="acc-description-uz">${meta.descriptionUz}</div>
        <div class="acc-description-en">${meta.descriptionEn}</div>
        ${skillsPills ? `<div class="acc-skills">${skillsPills}</div>` : ''}
        ${meta.estimatedMinutes > 0 ? `
          <div class="acc-time">
            <span>⏱️</span>
            <span>${uz('activityCard.minutes').replace('{min}', meta.estimatedMinutes)}</span>
          </div>
        ` : ''}
        <button class="acc-cta">${uz('activityCard.startBtn')}</button>
        <div class="acc-dismiss-hint">${uz('activityCard.dismissHint')}</div>
      </div>
    `;

    // Dismiss handlers
    function dismiss() {
      overlay.style.animation = 'acc-overlay-in 0.2s ease-out reverse';
      setTimeout(() => {
        overlay.remove();
        resolve();
      }, 200);
    }

    overlay.querySelector('.acc-cta')?.addEventListener('click', dismiss);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismiss();
    });

    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        document.removeEventListener('keydown', keyHandler);
        dismiss();
      }
    };
    document.addEventListener('keydown', keyHandler);

    document.body.appendChild(overlay);
  });
}

/**
 * Get metadata for an activity tile
 * @param {string} tileState - Tile state constant
 * @returns {Object} Activity metadata
 */
export function getActivityMetadata(tileState) {
  return ACTIVITY_METADATA[tileState] || ACTIVITY_METADATA[STATES.INTRO];
}
