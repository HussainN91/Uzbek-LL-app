/**
 * Helper Functions Module
 * =======================
 * Controlled practice helpers, evaluation functions, and text utilities.
 * 
 * @module src/core/helpers
 */

import { getVocab, getMistake } from './curriculum-loader.js';

// ============================
// CONSTANTS
// ============================

const EVALUATOR_CONFIG = {
  strictAccentMatching: false,
  caseSensitive: false,
  trimWhitespace: true
};

// ============================
// TEXT NORMALIZATION
// ============================

/**
 * Normalize text for comparison (lowercase, normalize accents)
 */
export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Remove diacritics
    .replace(/[''`]/g, "'")           // Normalize apostrophes
    .replace(/\s+/g, ' ')             // Normalize whitespace
    .trim();
}

/**
 * Simple comparison (normalized)
 */
export function compareAnswers(userAnswer, correctAnswer) {
  const ua = normalizeText(userAnswer);
  const ca = normalizeText(correctAnswer);
  return ua === ca;
}

/**
 * Fuzzy comparison with tolerance
 */
export function fuzzyCompare(userAnswer, correctAnswer, tolerance = 0.9) {
  const ua = normalizeText(userAnswer);
  const ca = normalizeText(correctAnswer);
  
  if (ua === ca) return true;
  
  // Calculate similarity ratio
  const longer = ua.length > ca.length ? ua : ca;
  const shorter = ua.length > ca.length ? ca : ua;
  
  if (longer.length === 0) return true;
  
  const editDistance = levenshteinDistance(ua, ca);
  const similarity = (longer.length - editDistance) / longer.length;
  
  return similarity >= tolerance;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a, b) {
  const matrix = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,  // substitution
          matrix[i][j - 1] + 1,      // insertion
          matrix[i - 1][j] + 1       // deletion
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}

// ============================
// CONTROLLED PRACTICE HELPERS
// ============================

/**
 * Pick a random gap-fill item from vocab
 * Creates a gap by removing 1-2 letters from the middle of a word
 * @returns {Object|null} vocab item with gap details
 */
export function pickGap() {
  const vocab = getVocab();
  if (!vocab || !vocab.items) return null;
  
  // Filter items suitable for gap
  const suitable = vocab.items.filter(item => {
    const word = item.it || '';
    return word.length >= 4;
  });
  
  if (suitable.length === 0) return null;
  
  const item = suitable[Math.floor(Math.random() * suitable.length)];
  const word = item.it;
  
  // Create gap (remove 1-2 letters from middle)
  const gapLen = word.length >= 6 ? 2 : 1;
  const midPoint = Math.floor(word.length / 2);
  const gapStart = Math.max(1, midPoint - Math.floor(gapLen / 2));
  
  return {
    ...item,
    gapped: word.substring(0, gapStart) + '_'.repeat(gapLen) + word.substring(gapStart + gapLen),
    answer: word.substring(gapStart, gapStart + gapLen),
    fullWord: word
  };
}

// Legacy aliases for backward compatibility
export const pickGapEasy = pickGap;
export const pickGapHard = pickGap;

/**
 * Create a word reorder exercise from a sentence
 * @param {string} sentence - Sentence to reorder
 * @returns {Object} reorder exercise data
 */
export function makeReorder(sentence) {
  const words = sentence.split(/\s+/).filter(w => w.length > 0);
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  
  // Ensure shuffled is different from original
  if (words.length > 2 && shuffled.join(' ') === words.join(' ')) {
    // Swap first and last
    [shuffled[0], shuffled[shuffled.length - 1]] = [shuffled[shuffled.length - 1], shuffled[0]];
  }
  
  return {
    original: sentence,
    words: shuffled,
    answer: words.join(' ')
  };
}

/**
 * Create sentence construction exercise
 * @param {string} sentence - Target sentence
 * @param {string[]} distractors - Extra words to include
 * @returns {Object} construction exercise data
 */
export function makeConstruction(sentence, distractors = []) {
  const words = sentence.split(/\s+/).filter(w => w.length > 0);
  const pool = [...words, ...distractors].sort(() => Math.random() - 0.5);
  
  return {
    target: sentence,
    pool: pool,
    answer: words
  };
}

// ============================
// MISTAKE ANALYSIS
// ============================

/**
 * Detect common errors in user answer
 * @param {string} userAnswer - User's answer
 * @param {string} correctAnswer - Correct answer
 * @returns {string[]} Array of detected error types
 */
export function detectCommonErrors(userAnswer, correctAnswer) {
  const errors = [];
  const ua = normalizeText(userAnswer);
  const ca = normalizeText(correctAnswer);
  
  // Article errors
  if (/\b(a|an|the)\b/.test(ca) && !/\b(a|an|the)\b/.test(ua)) {
    errors.push('missing_article');
  }
  if (/\bthe\b/.test(ca) && /\ba\b/.test(ua)) {
    errors.push('wrong_article');
  }
  
  // Preposition errors
  const prepositions = ['in', 'on', 'at', 'to', 'for', 'from', 'with', 'by'];
  for (const prep of prepositions) {
    if (ca.includes(` ${prep} `) && !ua.includes(` ${prep} `)) {
      errors.push('missing_preposition');
      break;
    }
  }
  
  // Plural errors
  if (/s\b/.test(ca) && !/s\b/.test(ua)) {
    errors.push('possible_plural_error');
  }
  
  // Word order
  const caWords = ca.split(' ');
  const uaWords = ua.split(' ');
  if (caWords.length === uaWords.length) {
    const caSet = new Set(caWords);
    const uaSet = new Set(uaWords);
    if ([...caSet].every(w => uaSet.has(w)) && ca !== ua) {
      errors.push('word_order');
    }
  }
  
  return errors;
}

/**
 * Get feedback for a mistake
 * @param {string} mistakeId - Mistake identifier
 * @returns {Object|null} Mistake data with feedback
 */
export function getMistakeFeedback(mistakeId) {
  const mistake = getMistake(mistakeId);
  if (mistake) return mistake;
  
  // Default feedbacks for common errors
  const defaults = {
    'missing_article': {
      hint: "Don't forget the article!",
      feedback_uz: "Artikl kerak!"
    },
    'wrong_article': {
      hint: "Check which article to use",
      feedback_uz: "Qaysi artikl kerakligini tekshiring"
    },
    'missing_preposition': {
      hint: "A preposition is needed here",
      feedback_uz: "Bu yerda predlog kerak"
    },
    'word_order': {
      hint: "Check the word order",
      feedback_uz: "So'z tartibini tekshiring"
    }
  };
  
  return defaults[mistakeId] || null;
}

// ============================
// EVALUATION FUNCTIONS
// ============================

/**
 * Evaluate a free-text answer against target
 * @param {string} userAnswer - User's answer
 * @param {string} target - Correct answer
 * @param {Object} options - Evaluation options
 * @returns {Object} Evaluation result
 */
export function evaluateTextAnswer(userAnswer, target, options = {}) {
  const opts = { ...EVALUATOR_CONFIG, ...options };
  
  let ua = opts.trimWhitespace ? userAnswer.trim() : userAnswer;
  let ta = opts.trimWhitespace ? target.trim() : target;
  
  if (!opts.caseSensitive) {
    ua = ua.toLowerCase();
    ta = ta.toLowerCase();
  }
  
  if (!opts.strictAccentMatching) {
    ua = normalizeText(ua);
    ta = normalizeText(ta);
  }
  
  const isCorrect = ua === ta;
  const errors = isCorrect ? [] : detectCommonErrors(userAnswer, target);
  
  return {
    correct: isCorrect,
    userAnswer,
    expected: target,
    errors,
    similarity: isCorrect ? 1 : (1 - levenshteinDistance(ua, ta) / Math.max(ua.length, ta.length))
  };
}

/**
 * Evaluate multiple choice answer
 * @param {string|number} selected - Selected option index or value
 * @param {string|number} correct - Correct option index or value
 * @returns {Object} Evaluation result
 */
export function evaluateMultipleChoice(selected, correct) {
  const isCorrect = String(selected) === String(correct);
  return {
    correct: isCorrect,
    selected,
    expected: correct
  };
}

/**
 * Evaluate a sentence reorder answer
 * @param {string[]} userOrder - User's word order
 * @param {string[]} correctOrder - Correct word order
 * @returns {Object} Evaluation result
 */
export function evaluateReorder(userOrder, correctOrder) {
  const userStr = userOrder.join(' ');
  const correctStr = correctOrder.join(' ');
  
  const isCorrect = normalizeText(userStr) === normalizeText(correctStr);
  
  return {
    correct: isCorrect,
    userAnswer: userStr,
    expected: correctStr
  };
}

/**
 * Evaluate a gap-fill answer
 * @param {string} userAnswer - User's answer
 * @param {string} correctAnswer - Correct answer
 * @returns {Object} Evaluation result
 */
export function evaluateGapFill(userAnswer, correctAnswer) {
  const ua = normalizeText(userAnswer);
  const ca = normalizeText(correctAnswer);
  
  // Exact match
  if (ua === ca) {
    return { correct: true, userAnswer, expected: correctAnswer };
  }
  
  // Close enough (one character off)
  if (Math.abs(ua.length - ca.length) <= 1 && levenshteinDistance(ua, ca) <= 1) {
    return {
      correct: false,
      almostCorrect: true,
      userAnswer,
      expected: correctAnswer,
      hint: "Almost! Check your spelling."
    };
  }
  
  return { correct: false, userAnswer, expected: correctAnswer };
}

/**
 * Master output evaluator for complex exercises
 * @param {Object} submission - User submission
 * @param {Object} answer - Expected answer structure
 * @returns {Object} Comprehensive evaluation result
 */
export function evaluateMasterOutput(submission, answer) {
  const results = {
    correct: true,
    details: [],
    score: 0,
    maxScore: 0
  };
  
  // Handle different submission types
  if (Array.isArray(answer)) {
    // Array of answers
    for (let i = 0; i < answer.length; i++) {
      const sub = submission[i] || '';
      const ans = answer[i];
      const eval_ = evaluateTextAnswer(sub, ans);
      results.details.push(eval_);
      results.maxScore++;
      if (eval_.correct) results.score++;
      else results.correct = false;
    }
  } else if (typeof answer === 'object') {
    // Object with key-value pairs
    for (const key of Object.keys(answer)) {
      const sub = submission[key] || '';
      const ans = answer[key];
      const eval_ = evaluateTextAnswer(sub, ans);
      results.details.push({ key, ...eval_ });
      results.maxScore++;
      if (eval_.correct) results.score++;
      else results.correct = false;
    }
  } else {
    // Simple string
    const eval_ = evaluateTextAnswer(submission, answer);
    results.details.push(eval_);
    results.maxScore = 1;
    results.score = eval_.correct ? 1 : 0;
    results.correct = eval_.correct;
  }
  
  return results;
}

// ============================
// SHUFFLE & RANDOMIZATION
// ============================

/**
 * Shuffle an array (Fisher-Yates)
 */
export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Pick N random items from array
 */
export function pickRandom(array, n = 1) {
  const shuffled = shuffle(array);
  return shuffled.slice(0, n);
}

/**
 * Pick one random item from array
 */
export function pickOne(array) {
  if (!array || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

// ============================
// WINDOW EXPORTS
// ============================

if (typeof window !== 'undefined') {
  // Controlled practice helpers (used in tiles)
  window._pickGap = pickGap;
  window._pickGapEasy = pickGap; // Legacy alias
  window._pickGapHard = pickGap; // Legacy alias
  window._makeReorder = makeReorder;
  window._makeConstruction = makeConstruction;
  
  // Evaluation helpers
  window.evaluateTextAnswer = evaluateTextAnswer;
  window.evaluateMultipleChoice = evaluateMultipleChoice;
  window.evaluateReorder = evaluateReorder;
  window.evaluateGapFill = evaluateGapFill;
  window.evaluateMasterOutput = evaluateMasterOutput;
  
  // Text utilities
  window.normalizeText = normalizeText;
  window.compareAnswers = compareAnswers;
  window.fuzzyCompare = fuzzyCompare;
  /** @type {any} */ (window).detectCommonErrors = detectCommonErrors;
  
  // Randomization
  window.shuffle = shuffle;
  window.pickRandom = pickRandom;
  window.pickOne = pickOne;
}
