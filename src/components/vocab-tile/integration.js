// @ts-nocheck
/**
 * Vocabulary Tile Hover System
 * ============================
 * Provides hover text/tooltip functionality for vocabulary tiles.
 * 
 * This file provides:
 * - VocabHoverSystem class for tooltips on all stages
 * - Stage-specific hover functions (8 total)
 * - CSS injection for hover styling
 * 
 * @module Hover System
 * @version 2.1.0 (Standalone hover module)
 */

// ============================================
// HOVER TEXT SYSTEM (Universal - All Stages)
// ============================================

/**
 * Create hover text system for vocabulary tiles
 * Adds tooltip/hover functionality to stage elements
 */
class VocabHoverSystem {
  constructor() {
    this.tooltips = new Map();
    this.activeTooltip = null;
    this.setupStyles();
  }

  /**
   * Setup CSS for hover tooltips
   */
  setupStyles() {
    if (document.getElementById('vocab-hover-styles')) return;

    const style = document.createElement('style');
    style.id = 'vocab-hover-styles';
    style.textContent = `
      /* Vocab Hover Tooltip System */
      .vocab-hover-trigger {
        position: relative;
        display: inline-block;
        cursor: help;
        border-bottom: 1px dotted #2196F3;
      }

      .vocab-hover-trigger:hover {
        background: rgba(33, 150, 243, 0.05);
        border-radius: 2px;
      }

      .vocab-tooltip {
        visibility: hidden;
        background-color: #263238;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 8px 12px;
        position: absolute;
        z-index: 9999;
        bottom: 120%;
        left: 50%;
        margin-left: -60px;
        width: 120px;
        opacity: 0;
        transition: opacity 0.3s, visibility 0.3s;
        font-size: 12px;
        line-height: 1.4;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      .vocab-tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #263238 transparent transparent transparent;
      }

      .vocab-hover-trigger:hover .vocab-tooltip,
      .vocab-hover-trigger:focus .vocab-tooltip {
        visibility: visible;
        opacity: 1;
      }

      /* Tooltip content styles */
      .vocab-tooltip .tooltip-title {
        font-weight: 600;
        margin-bottom: 4px;
      }

      .vocab-tooltip .tooltip-text {
        font-size: 11px;
      }

      /* Stage-specific hover styles */
      .flashcard-intro-stage .vocab-hover-trigger {
        border-bottom: 1px dotted #4CAF50;
      }

      .image-matching-stage .vocab-hover-trigger {
        border-bottom: 1px dotted #FF9800;
      }

      .definition-matching-stage .vocab-hover-trigger {
        border-bottom: 1px dotted #2196F3;
      }

      .fill-in-blank-stage .vocab-hover-trigger {
        border-bottom: 1px dotted #9C27B0;
      }

      .receptive-recognition-stage .vocab-hover-trigger {
        border-bottom: 1px dotted #F44336;
      }

      .productive-recall-stage .vocab-hover-trigger {
        border-bottom: 1px dotted #00BCD4;
      }

      /* Mobile tooltip adjustments */
      @media (max-width: 768px) {
        .vocab-tooltip {
          width: 140px;
          margin-left: -70px;
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Add hover text to an element
   * @param {HTMLElement} element - Target element
   * @param {string} title - Tooltip title
   * @param {string} text - Tooltip text
   * @param {Object} options - Additional options
   */
  addHover(element, title, text, options = {}) {
    if (!element) return;

    // Wrap element or add tooltip if already has text
    let trigger = element;
    if (!element.classList.contains('vocab-hover-trigger')) {
      trigger = document.createElement('span');
      trigger.className = 'vocab-hover-trigger';
      trigger.textContent = element.textContent;
      element.textContent = '';
      element.appendChild(trigger);
    } else {
      // Add to existing trigger
      trigger = element;
    }

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'vocab-tooltip';
    
    let tooltipHtml = '';
    if (title) {
      tooltipHtml += `<div class="tooltip-title">${title}</div>`;
    }
    if (text) {
      tooltipHtml += `<div class="tooltip-text">${text}</div>`;
    }
    
    tooltip.innerHTML = tooltipHtml;
    trigger.appendChild(tooltip);

    // Store reference
    const key = `${title}-${text}`;
    this.tooltips.set(key, tooltip);

    // Add keyboard support
    if (element.tabIndex === -1) {
      element.tabIndex = 0;
    }

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        trigger.focus();
      }
    });

    return trigger;
  }

  /**
   * Add hover text to multiple elements matching selector
   * @param {string} selector - CSS selector
   * @param {Function} textFn - Function to get text from element
   */
  addHoverBatch(selector, textFn) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, idx) => {
      const text = textFn(el, idx);
      if (text && typeof text === 'object') {
        this.addHover(el, text.title, text.text);
      }
    });
  }

  /**
   * Clear all tooltips
   */
  clear() {
    this.tooltips.forEach(tooltip => tooltip?.remove?.());
    this.tooltips.clear();
  }
}

// ============================================
// HOVER TEXT INTEGRATION FOR STAGES
// ============================================

/**
 * Add hover text to flashcard intro stage
 */
function addHoverToFlashcardIntro(container, vocabItems) {
  if (!window._vocabHoverSystem) return;

  // Flashcard words with pronunciation hints
  container.querySelectorAll('.word-english').forEach((el) => {
    const word = el.textContent;
    window._vocabHoverSystem.addHover(
      el,
      '📚 Word',
      `Listen and pronounce: "${word}"`
    );
  });

  // Phonetic spelling
  container.querySelectorAll('.word-phonetic').forEach((el) => {
    window._vocabHoverSystem.addHover(
      el,
      '🔊 Pronunciation',
      'Click phonetic text to hear the word'
    );
  });

  // Context hints
  container.querySelectorAll('.word-context').forEach((el) => {
    window._vocabHoverSystem.addHover(
      el,
      '💡 Context',
      'How the word is used in English'
    );
  });
}

/**
 * Add hover text to image matching stage
 */
function addHoverToImageMatching(container) {
  if (!window._vocabHoverSystem) return;

  // Word tiles
  container.querySelectorAll('.word-tile').forEach((el) => {
    const word = el.textContent;
    window._vocabHoverSystem.addHover(
      el,
      '🔤 Word',
      `Click then select the image for "${word}"`
    );
  });

  // Image tiles
  container.querySelectorAll('[role="button"][data-type="image"]').forEach((el) => {
    window._vocabHoverSystem.addHover(
      el,
      '🖼️ Image',
      'Select this image after clicking a word'
    );
  });

  // Feedback text
  container.querySelectorAll('.feedback-text').forEach((el) => {
    window._vocabHoverSystem.addHover(
      el,
      '📝 Feedback',
      el.textContent.includes('Correct') ? 'Great job!' : 'Try again!'
    );
  });
}

/**
 * Add hover text to definition matching stage
 */
function addHoverToDefinitionMatching(container) {
  if (!window._vocabHoverSystem) return;

  // Word tiles
  container.querySelectorAll('.word-tile').forEach((el) => {
    const word = el.querySelector('.word-text')?.textContent || el.textContent;
    window._vocabHoverSystem.addHover(
      el,
      '🔤 English Word',
      `Find the matching meaning for "${word}"`
    );
  });

  // Definition tiles
  container.querySelectorAll('.definition-tile').forEach((el) => {
    const def = el.textContent.substring(0, 30);
    window._vocabHoverSystem.addHover(
      el,
      '📖 Definition',
      `Uzbek meaning: "${def}..."`
    );
  });
}

/**
 * Add hover text to fill-in-blank stage
 */
function addHoverToFillInBlank(container) {
  if (!window._vocabHoverSystem) return;

  // Sentence blanks
  container.querySelectorAll('.sentence-with-blank').forEach((el) => {
    window._vocabHoverSystem.addHover(
      el,
      '✏️ Fill the Blank',
      'Read the sentence and choose the correct word'
    );
  });

  // MCQ options
  container.querySelectorAll('.choice-btn').forEach((el) => {
    const text = el.textContent.substring(0, 20);
    window._vocabHoverSystem.addHover(
      el,
      '🎯 Option',
      `Select if "${text}" completes the sentence`
    );
  });

  // Sentence context in Uzbek
  container.querySelectorAll('.sentence-uz').forEach((el) => {
    window._vocabHoverSystem.addHover(
      el,
      '🇺🇿 Context',
      'Uzbek translation of the English sentence'
    );
  });
}

/**
 * Add hover text to receptive recognition (listening) stage
 */
function addHoverToReceptiveRecognition(container) {
  if (!window._vocabHoverSystem) return;

  // Audio button
  const audioBtn = container.querySelector('.main-audio-button button');
  if (audioBtn) {
    window._vocabHoverSystem.addHover(
      audioBtn,
      '🔊 Listen',
      'Play the audio and listen for the word'
    );
  }

  // Uzbek hint
  const hint = container.querySelector('.listening-hint');
  if (hint) {
    window._vocabHoverSystem.addHover(
      hint,
      '💡 Hint',
      'Uzbek meaning to help you'
    );
  }

  // MCQ options
  container.querySelectorAll('.listening-option').forEach((el, idx) => {
    const letter = String.fromCharCode(65 + idx);
    window._vocabHoverSystem.addHover(
      el,
      `Option ${letter}`,
      'Click if this matches the audio'
    );
  });
}

/**
 * Add hover text to productive recall (typing) stage
 */
function addHoverToProductiveRecall(container) {
  if (!window._vocabHoverSystem) return;

  // Uzbek prompt
  const prompt = container.querySelector('.prompt-uz');
  if (prompt) {
    window._vocabHoverSystem.addHover(
      prompt,
      '🇺🇿 Uzbek Prompt',
      'Type the English word for this meaning'
    );
  }

  // Type input
  const input = container.querySelector('.type-answer-input');
  if (input) {
    window._vocabHoverSystem.addHover(
      input,
      '⌨️ Type Here',
      'Type the English word you heard or translated'
    );
  }

  // Prompt image (if available)
  const img = container.querySelector('.prompt-image');
  if (img) {
    window._vocabHoverSystem.addHover(
      img,
      '🖼️ Visual Clue',
      'Image to help you recall the word'
    );
  }

  // Audio button
  const audioBtn = container.querySelector('.prompt-audio-btn');
  if (audioBtn) {
    window._vocabHoverSystem.addHover(
      audioBtn,
      '🔊 Listen',
      'Play audio of the Uzbek prompt'
    );
  }

  // Feedback message
  container.querySelectorAll('.feedback-message').forEach((el) => {
    const isCorrect = el.textContent.includes('Correct');
    window._vocabHoverSystem.addHover(
      el,
      isCorrect ? '✓ Correct!' : '✗ Try Again',
      isCorrect ? 'Great! Move to the next word.' : 'Check your spelling (small typos are OK)'
    );
  });
}

/**
 * Add hover text to mastery summary
 */
function addHoverToMasterySummary(container) {
  if (!window._vocabHoverSystem) return;

  // Star ratings
  container.querySelectorAll('.star').forEach((el) => {
    window._vocabHoverSystem.addHover(
      el,
      '⭐ Mastery Level',
      'Filled stars show your mastery: 1-3 stars'
    );
  });

  // Stage cards
  container.querySelectorAll('.stage-card').forEach((el) => {
    const stageName = el.querySelector('.stage-name')?.textContent || 'Stage';
    const score = el.querySelector('.stage-score')?.textContent || '0%';
    window._vocabHoverSystem.addHover(
      el,
      `${stageName}`,
      `Your score: ${score}`
    );
  });

  // Word mastery grid
  container.querySelectorAll('.word-card').forEach((el) => {
    const word = el.querySelector('.word-text')?.textContent || 'Word';
    const stars = el.querySelector('.word-stars')?.textContent || '';
    window._vocabHoverSystem.addHover(
      el,
      `📚 ${word}`,
      `Mastery: ${stars ? stars.length + ' stars' : 'Not mastered'}`
    );
  });

  // SRS info
  const srsInfo = container.querySelector('.srs-info');
  if (srsInfo) {
    const nextReview = srsInfo.querySelector('.srs-value')?.textContent || 'Soon';
    window._vocabHoverSystem.addHover(
      srsInfo,
      '📅 Next Review',
      `Review in ${nextReview}`
    );
  }
}

/**
 * Install hover text system to vocab tile
 * Called after each stage renders
 */
function installVocabHoverSystem(container) {
  if (!window._vocabHoverSystem) {
    window._vocabHoverSystem = new VocabHoverSystem();
  } else {
    window._vocabHoverSystem.clear();
  }

  // Detect current stage and install appropriate hover texts
  if (container.classList.contains('flashcard-intro-stage')) {
    addHoverToFlashcardIntro(container);
  } else if (container.classList.contains('image-matching-stage')) {
    addHoverToImageMatching(container);
  } else if (container.classList.contains('definition-matching-stage')) {
    addHoverToDefinitionMatching(container);
  } else if (container.classList.contains('fill-in-blank-stage')) {
    addHoverToFillInBlank(container);
  } else if (container.classList.contains('receptive-recognition-stage')) {
    addHoverToReceptiveRecognition(container);
  } else if (container.classList.contains('productive-recall-stage')) {
    addHoverToProductiveRecall(container);
  } else if (container.classList.contains('mastery-summary')) {
    addHoverToMasterySummary(container);
  }
}

// ============================================
// EXPORTS - Legacy removed, app.js now calls v3 directly
// ============================================

// Export for ES modules
export {
  VocabHoverSystem,
  installVocabHoverSystem,
  addHoverToFlashcardIntro,
  addHoverToImageMatching,
  addHoverToDefinitionMatching,
  addHoverToFillInBlank,
  addHoverToReceptiveRecognition,
  addHoverToProductiveRecall,
  addHoverToMasterySummary
};

// Initialize hover system on load
if (typeof window !== 'undefined') {
  window._vocabHoverSystem = new VocabHoverSystem();
  window.VocabHoverSystem = VocabHoverSystem;
  window.installVocabHoverSystem = installVocabHoverSystem;
}
