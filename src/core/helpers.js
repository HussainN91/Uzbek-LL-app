/**
 * Helper Functions Module
 * =======================
 * Evaluation functions and text utilities.
 * 
 * @module src/core/helpers
 */



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
