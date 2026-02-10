/**
 * Scoring System Module
 * =====================
 * Score tracking, display, and persistence.
 * Pure ES Module with backward compatibility.
 * 
 * @module src/features/scoring
 * @version 2.0.0 (Phase 2 Refactor)
 */

import { STORAGE_KEYS } from '../utils/constants.js';
import { getLocal, setLocal } from '../utils/storage.js';
import { getElementById, createElement } from '../utils/dom.js';

// ============================
// SESSION STATE
// ============================
let sessionScore = 0;
let sessionMaxScore = 0;
let tileScores = {};

// ============================
// SCORE MANAGEMENT
// ============================

/**
 * Reset session score to zero
 */
export function resetSessionScore() {
  sessionScore = 0;
  sessionMaxScore = 0;
  tileScores = {};
  updateScoreDisplay();
}

/**
 * Award points to the session score
 * @param {number} points - Points to add
 * @param {string} [reason=''] - Reason for points (for logging)
 * @param {string} [tileName=''] - Tile name for per-tile tracking
 */
export function awardPoints(points, reason = '', tileName = '') {
  if (points <= 0) return;
  
  sessionScore += points;
  
  // Track per-tile scores
  if (tileName) {
    tileScores[tileName] = (tileScores[tileName] || 0) + points;
  }
  
  // Visual feedback
  showPointsAnimation(points, reason);
  updateScoreDisplay();
  
  if (window.__DEV_AUDIT__) {
    console.log(`🎯 +${points} points${reason ? ` (${reason})` : ''} → Total: ${sessionScore}/${sessionMaxScore}`);
  }
}

/**
 * Add to maximum possible score
 * @param {number} points - Points to add to max
 */
export function addMaxScore(points) {
  if (points <= 0) return;
  sessionMaxScore += points;
  updateScoreDisplay();
}

/**
 * Get current session score
 * @returns {number}
 */
export function getSessionScore() {
  return sessionScore;
}

/**
 * Get maximum possible score
 * @returns {number}
 */
export function getMaxScore() {
  return sessionMaxScore;
}

/**
 * Get score percentage (0-100)
 * @returns {number}
 */
export function getScorePercentage() {
  if (sessionMaxScore === 0) return 0;
  return Math.round((sessionScore / sessionMaxScore) * 100);
}

/**
 * Get per-tile score breakdown
 * @returns {Object}
 */
export function getTileScores() {
  return { ...tileScores };
}

// ============================
// SCORE DISPLAY
// ============================

/**
 * Update the score display element
 */
export function updateScoreDisplay() {
  const scoreEl = getElementById('sessionScoreDisplay');
  if (!scoreEl) return;
  
  const percentage = getScorePercentage();
  scoreEl.textContent = `${sessionScore} / ${sessionMaxScore} (${percentage}%)`;
  
  // Color coding based on performance using CSS classes
  scoreEl.classList.remove('score--excellent', 'score--good', 'score--fair', 'score--needs-work');
  if (percentage >= 90) {
    scoreEl.classList.add('score--excellent');
  } else if (percentage >= 75) {
    scoreEl.classList.add('score--good');
  } else if (percentage >= 60) {
    scoreEl.classList.add('score--fair');
  } else {
    scoreEl.classList.add('score--needs-work');
  }
}

/**
 * Show animated points popup
 * @param {number} points - Points to display
 * @param {string} [reason=''] - Optional reason indicator
 */
export function showPointsAnimation(points, reason = '') {
  const container = getElementById('tileContainer');
  if (!container) return;
  
  const popup = createElement('div', { className: 'points-popup' });
  popup.textContent = `+${points}`;
  if (reason) {
    popup.textContent += ' ✓';
  }
  
  container.appendChild(popup);
  
  // Animate and remove using CSS class
  setTimeout(() => {
    popup.classList.add('points-popup--fading');
  }, 100);
  
  setTimeout(() => {
    if (popup.parentNode) popup.parentNode.removeChild(popup);
  }, 1000);
}

// ============================
// SCORE PERSISTENCE
// ============================

/**
 * Save current score to history for a lesson
 * @param {string} [lessonId] - Optional lesson ID
 */
export function saveScoreToHistory(lessonId) {
  const resolvedLessonId = lessonId || window.currentLessonId;
  if (!resolvedLessonId) {
    return;
  }
  try {
    const key = STORAGE_KEYS.SCORE_HISTORY(resolvedLessonId);
    const history = getLocal(key, []);
    
    const entry = {
      date: new Date().toISOString(),
      score: sessionScore,
      maxScore: sessionMaxScore,
      percentage: getScorePercentage(),
      tileScores: { ...tileScores }
    };
    
    history.push(entry);
    
    // Keep last 10 attempts
    if (history.length > 10) history.shift();
    
    setLocal(key, history);
    
    if (window.__DEV_AUDIT__) {
      console.log('📊 Score saved to history:', entry);
    }
  } catch (e) {
    console.warn('Could not save score history:', e);
  }
}

/**
 * Get score history for a lesson
 * @param {string} lessonId - Lesson ID
 * @returns {Array} Score history entries
 */
export function getScoreHistory(lessonId) {
  const key = STORAGE_KEYS.SCORE_HISTORY(lessonId);
  return getLocal(key, []);
}

/**
 * Get best score for a lesson
 * @param {string} lessonId - Lesson ID
 * @returns {Object|null} Best score entry or null
 */
export function getBestScore(lessonId) {
  const history = getScoreHistory(lessonId);
  if (history.length === 0) return null;
  
  return history.reduce((best, entry) => {
    return entry.percentage > best.percentage ? entry : best;
  }, history[0]);
}

/**
 * Get average score for a lesson
 * @param {string} lessonId - Lesson ID
 * @returns {number} Average percentage
 */
export function getAverageScore(lessonId) {
  const history = getScoreHistory(lessonId);
  if (history.length === 0) return 0;
  
  const sum = history.reduce((acc, entry) => acc + entry.percentage, 0);
  return Math.round(sum / history.length);
}

/**
 * Get improvement trend (compared to previous attempt)
 * @param {string} lessonId - Lesson ID
 * @returns {number} Percentage change (-100 to +100)
 */
export function getImprovementTrend(lessonId) {
  const history = getScoreHistory(lessonId);
  if (history.length < 2) return 0;
  
  const current = history[history.length - 1].percentage;
  const previous = history[history.length - 2].percentage;
  
  return current - previous;
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  // Expose functions for legacy code
  window.resetSessionScore = resetSessionScore;
  window.awardPoints = awardPoints;
  window.addMaxScore = addMaxScore;
  window.updateScoreDisplay = updateScoreDisplay;
  window.showPointsAnimation = showPointsAnimation;
  window.saveScoreToHistory = saveScoreToHistory;
  window.getScoreHistory = getScoreHistory;
  window.getBestScore = getBestScore;
  
  // Expose module
  window.ScoringSystem = {
    resetSessionScore,
    awardPoints,
    addMaxScore,
    getSessionScore,
    getMaxScore,
    getScorePercentage,
    getTileScores,
    updateScoreDisplay,
    showPointsAnimation,
    saveScoreToHistory,
    getScoreHistory,
    getBestScore,
    getAverageScore,
    getImprovementTrend,
  };
}
