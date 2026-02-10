/**
 * Vocab Card State Module
 * =======================
 * Manages vocab card progress, card lookup, and bubble unlocks.
 * Extracted from vocab-card-renderer.js (Priority 3: Split renderer monolith).
 *
 * @module src/features/vocab-card-state
 * @version 1.0.0
 */

'use strict';

// ═══════════════════════════════════════════════════════════════
// STORAGE & PROGRESS
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'vocabCardProgress';

/** @type {Set<string>} */
let completedCards = new Set();

/** Load completed card IDs from localStorage */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        completedCards = new Set(parsed);
      }
    }
  } catch (err) {
    console.warn('Unable to load vocab progress:', err);
  }
}

/** Save completed card IDs to localStorage */
export function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedCards)));
  } catch (err) {
    console.warn('Unable to save vocab progress:', err);
  }
}

/**
 * Mark a card as completed and persist
 * @param {string} vocabId
 */
export function markCompleted(vocabId) {
  completedCards.add(vocabId);
  saveProgress();
}

/**
 * Check if a card is completed
 * @param {string} vocabId
 * @returns {boolean}
 */
export function isCompleted(vocabId) {
  return completedCards.has(vocabId);
}

/**
 * Get total completed count, optionally filtered by lesson
 * @param {string} [lessonId]
 * @returns {number}
 */
export function getCompletedCount(lessonId) {
  if (!lessonId) return completedCards.size;
  const unitPart = lessonId.match(/^(U\d+(?:_\d+)?)/)?.[1];
  const unitKey = unitPart ? `VOCAB_CARDS_${unitPart}` : null;
  const unit = unitKey ? /** @type {any} */ (window)[unitKey] : null;
  if (!unit?.lessons?.[lessonId]) return 0;
  const items = unit.lessons[lessonId].items || [];
  return items.filter(item => completedCards.has(item.id)).length;
}

/**
 * Check if every card in a lesson is completed
 * @param {string} lessonId
 * @returns {boolean}
 */
export function isLessonComplete(lessonId) {
  const unitPart = lessonId.match(/^(U\d+(?:_\d+)?)/)?.[1];
  const unitKey = unitPart ? `VOCAB_CARDS_${unitPart}` : null;
  const unit = unitKey ? /** @type {any} */ (window)[unitKey] : null;
  if (!unit?.lessons?.[lessonId]) return false;
  const items = unit.lessons[lessonId].items || [];
  return items.length > 0 && items.every(item => completedCards.has(item.id));
}

/** Get the raw completedCards set (for internal use) */
export function getCompletedCards() {
  return completedCards;
}

// ═══════════════════════════════════════════════════════════════
// CARD LOOKUP
// ═══════════════════════════════════════════════════════════════

/**
 * Find a vocab card by ID across all loaded unit data
 * @param {string} vocabId
 * @returns {{ card: any, unitId: string, lessonId: string } | null}
 */
export function findCard(vocabId) {
  const unitKeys = [
    'VOCAB_CARDS_U01_5', 'VOCAB_CARDS_U01', 'VOCAB_CARDS_U02',
    'VOCAB_CARDS_U03', 'VOCAB_CARDS_U04', 'VOCAB_CARDS_U05',
    'VOCAB_CARDS_U06', 'VOCAB_CARDS_U07', 'VOCAB_CARDS_U08',
    'VOCAB_CARDS_U09', 'VOCAB_CARDS_U10'
  ];
  for (const unitKey of unitKeys) {
    const unit = /** @type {any} */ (window)[unitKey];
    if (!unit?.lessons) continue;

    for (const lessonId in unit.lessons) {
      const lesson = unit.lessons[lessonId];
      if (!lesson?.items) continue;

      const raw = lesson.items.find(item => item.id === vocabId);
      if (raw) {
        if (typeof unit.resolveRef === 'function') {
          return { card: unit.resolveRef(raw), unitId: unit.unit_id, lessonId };
        }
        return { card: raw, unitId: unit.unit_id, lessonId };
      }
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════
// CAROUSEL STATE
// ═══════════════════════════════════════════════════════════════

/** @type {number} */
export let currentSlideIndex = 0;

/** @type {any} */
export let currentCard = null;

/** @type {boolean} */
export let exerciseCompleted = false;

/** @param {number} idx */
export function setSlideIndex(idx) { currentSlideIndex = idx; }

/** @param {any} card */
export function setCurrentCard(card) { currentCard = card; }

/** @param {boolean} val */
export function setExerciseCompleted(val) { exerciseCompleted = val; }

// ═══════════════════════════════════════════════════════════════
// BUBBLE UNLOCK (Sandwich 2.5)
// ═══════════════════════════════════════════════════════════════

/**
 * Trigger a bubble unlock and persist it
 * @param {string} dialogueId
 * @param {number} lineIndex
 */
export function triggerBubbleUnlock(dialogueId, lineIndex) {
  console.log(`🔓 BUBBLE UNLOCK: Dialogue ${dialogueId}, Line ${lineIndex}`);

  const event = new CustomEvent('vocabBubbleUnlock', {
    detail: {
      dialogue_id: dialogueId,
      line_index: lineIndex,
      timestamp: Date.now()
    }
  });
  window.dispatchEvent(event);

  try {
    const unlockKey = 'unlockedBubbles';
    const existing = JSON.parse(localStorage.getItem(unlockKey) || '[]');
    const unlockId = `${dialogueId}_${lineIndex}`;
    if (!existing.includes(unlockId)) {
      existing.push(unlockId);
      localStorage.setItem(unlockKey, JSON.stringify(existing));
    }
  } catch (e) {
    console.warn('Could not persist bubble unlock:', e);
  }
}

/**
 * Get all unlocked bubble IDs
 * @returns {string[]}
 */
export function getUnlockedBubbles() {
  try {
    return JSON.parse(localStorage.getItem('unlockedBubbles') || '[]');
  } catch (e) {
    return [];
  }
}

/**
 * Check if a specific bubble is unlocked
 * @param {string} dialogueId
 * @param {number} lineIndex
 * @returns {boolean}
 */
export function isBubbleUnlocked(dialogueId, lineIndex) {
  const unlocked = getUnlockedBubbles();
  return unlocked.includes(`${dialogueId}_${lineIndex}`);
}

// Initialize on module load
loadProgress();
