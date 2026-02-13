/**
 * done-tile.js - Tile 10: Lesson Completed
 * Final tile with score summary, confetti, and next lesson navigation
 */

import {
  getTileContainer,
  clearTileContainer,
  createButton,
  setState,
  transitionToTile,
  playSound,
  awardXP,
  updateStreak,
  STATES,
  getCurrentUnitId
} from './tile-utils.js';
import { uz, en } from '../core/i18n.js';
import { createInstructionBanner } from '../components/instruction-banner.js';
import { checkBadges, showBadgeNotification } from '../core/badge-catalog.js';

/**
 * Get unit lesson IDs
 */
function getUnitLessonIds(unitId) {
  return typeof window.getUnitLessonIds === 'function' 
    ? window.getUnitLessonIds(unitId) 
    : [];
}

/**
 * Get friendly lesson name
 */
function getFriendlyLessonName(lessonId) {
  return typeof window.getFriendlyLessonName === 'function' 
    ? window.getFriendlyLessonName(lessonId) 
    : lessonId;
}

/**
 * Get unit display name
 */
function getUnitDisplayName(unitId) {
  return typeof window.getUnitDisplayName === 'function' 
    ? window.getUnitDisplayName(unitId) 
    : unitId;
}

/**
 * Set active unit
 */
async function setActiveUnit(unitId) {
  if (typeof window.setActiveUnit === 'function') {
    return window.setActiveUnit(unitId);
  }
}

/**
 * Build lesson selector UI
 */
function buildLessonSelectorUI() {
  if (typeof window.buildLessonSelectorUI === 'function') {
    window.buildLessonSelectorUI();
  }
}

/**
 * Save score to history
 */
function saveScoreToHistory() {
  if (typeof window.saveScoreToHistory === 'function') {
    window.saveScoreToHistory();
  }
}

/**
 * Get best score for lesson
 */
function getBestScore(lessonId) {
  return typeof window.getBestScore === 'function' 
    ? window.getBestScore(lessonId) 
    : null;
}

/**
 * Save completed lessons to storage
 */
function _saveCompletedLessons() {
  if (typeof window._saveCompletedLessons === 'function') {
    window._saveCompletedLessons();
  }
}

/**
 * Save completed units to storage
 */
function _saveCompletedUnits() {
  if (typeof window._saveCompletedUnits === 'function') {
    window._saveCompletedUnits();
  }
}

/**
 * Reset integration state
 */
function resetIntegrationState() {
  if (typeof window.resetIntegrationState === 'function') {
    window.resetIntegrationState();
  }
}

/**
 * Render function
 */
function render() {
  if (typeof window.render === 'function') {
    window.render();
  }
}

/**
 * Render Tile 10 - Done (Lesson Completed)
 * @param {Object} lesson - Lesson data
 */
export function renderDoneTile(lesson) {
  const tileContainer = getTileContainer();
  const CURRENT_UNIT_ID = getCurrentUnitId();
  
  // Get global state references
  const currentLessonId = window.currentLessonId;
  const completedLessons = window.completedLessons || new Set();
  const completedUnits = window.completedUnits || new Set();
  const GameState = window.GameState || { completedLessons: new Set(), save: () => {} };
  const sessionScore = window.sessionScore || 0;
  const sessionMaxScore = window.sessionMaxScore || 0;
  const tileScores = window.tileScores || {};
  const availableUnits = window.availableUnits || [];
  
  clearTileContainer();

  // Instruction banner
  const banner = createInstructionBanner('done');
  if (banner) tileContainer.appendChild(banner);

  // Mark current lesson as completed for sequential unlocking
  if (currentLessonId) {
    completedLessons.add(currentLessonId);
    GameState.completedLessons.add(currentLessonId);
    _saveCompletedLessons();
    GameState.save();
  }

  // ✅ Award XP based on score performance
  const pctForXP = sessionMaxScore > 0 ? Math.round((sessionScore / sessionMaxScore) * 100) : 0;
  let xpReward = 25; // Base XP for completing any lesson
  if (pctForXP >= 90) xpReward = 100;
  else if (pctForXP >= 75) xpReward = 75;
  else if (pctForXP >= 60) xpReward = 50;
  awardXP(xpReward, `Lesson complete (${pctForXP}%)`);

  // ✅ Update daily streak
  updateStreak();

  // ✅ Check for new badges
  try {
    const badgeState = {
      completedLessons: completedLessons,
      completedUnits: completedUnits,
      lastScorePct: pctForXP,
      streak: window.AppState?.session?.streak || 0,
      level: window.AppState?.session?.level || 1,
      vocabCompletion: window.AppState?.progress?.vocabCompletion || {},
    };
    const alreadyEarned = window.AppState?.session?.badges || [];
    const newBadges = checkBadges(badgeState, alreadyEarned);
    for (const badge of newBadges) {
      if (typeof window.StateActions?.awardBadge === 'function') {
        window.StateActions.awardBadge(badge.id);
      }
      showBadgeNotification(badge);
    }
  } catch (e) {
    console.warn('Badge check error:', e);
  }

  // Trigger confetti
  const confettiCount = 50;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
  
  playSound('complete');

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = uz('done.title');
  title.classList.add('tl-uz');
  title.dataset.translation = en('done.title');

  // Save score to history
  saveScoreToHistory();

  // Score Summary Section
  const scoreSection = document.createElement("div");
  scoreSection.className = "tile-section";
  scoreSection.style.background = "linear-gradient(135deg, #fff9e6 0%, #ffe6b3 100%)";
  scoreSection.style.border = "2px solid #ff9800";
  scoreSection.style.padding = "16px";
  scoreSection.style.marginBottom = "16px";
  
  const scoreTitle = document.createElement("h3");
  scoreTitle.textContent = uz('done.scoreTitle');
  scoreTitle.classList.add("tl-uz");
  scoreTitle.dataset.translation = en('done.scoreTitle');
  scoreTitle.style.margin = "0 0 12px 0";
  scoreTitle.style.color = "#e65100";
  
  const percentage = sessionMaxScore > 0 ? Math.round((sessionScore / sessionMaxScore) * 100) : 0;
  const scoreDisplay = document.createElement("div");
  scoreDisplay.style.fontSize = "32px";
  scoreDisplay.style.fontWeight = "bold";
  scoreDisplay.style.margin = "8px 0";
  
  // Color code based on performance
  if (percentage >= 90) {
    scoreDisplay.style.color = "#2e7d32";
    scoreDisplay.textContent = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - " + uz('done.ratingExcellent');
    scoreDisplay.classList.add("tl-uz");
    scoreDisplay.dataset.translation = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - " + en('done.ratingExcellent');
  } else if (percentage >= 75) {
    scoreDisplay.style.color = "#1976d2";
    scoreDisplay.textContent = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - " + uz('done.ratingExcellent');
    scoreDisplay.classList.add("tl-uz");
    scoreDisplay.dataset.translation = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - " + en('done.ratingExcellent');
  } else if (percentage >= 60) {
    scoreDisplay.style.color = "#f57c00";
    scoreDisplay.textContent = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - " + uz('done.ratingOkay');
    scoreDisplay.classList.add("tl-uz");
    scoreDisplay.dataset.translation = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - " + en('done.ratingOkay');
  } else {
    scoreDisplay.style.color = "#d32f2f";
    scoreDisplay.textContent = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - " + uz('done.ratingRetry');
    scoreDisplay.classList.add("tl-uz");
    scoreDisplay.dataset.translation = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - " + en('done.ratingRetry');
  }
  
  // Breakdown by tile
  const breakdown = document.createElement("div");
  breakdown.style.marginTop = "12px";
  breakdown.style.fontSize = "14px";
  breakdown.innerHTML = "<strong class='tl-uz' data-translation='" + en('done.tileBreakdown') + "'>" + uz('done.tileBreakdown') + ":</strong><br/>";
  
  const tileNames = window.UI_CONFIG?.TILE_NAMES || {};
  
  Object.keys(tileScores).forEach(tileName => {
    const points = tileScores[tileName];
    const displayName = tileNames[tileName] || tileName;
    breakdown.innerHTML += "• " + displayName + ": " + points + " " + en('done.points') + "<br/>";
  });
  
  scoreSection.appendChild(scoreTitle);
  scoreSection.appendChild(scoreDisplay);
  scoreSection.appendChild(breakdown);
  
  // ── Tile Progress Overview ──
  const progressOverview = document.createElement("div");
  progressOverview.style.cssText = 'margin-top: 16px; padding: 12px; background: rgba(255,255,255,0.7); border-radius: 10px;';
  
  const progressTitle = document.createElement("div");
  progressTitle.textContent = uz('done.tileBreakdown');
  progressTitle.classList.add('tl-uz');
  progressTitle.dataset.translation = en('done.tileBreakdown');
  progressTitle.style.cssText = 'font-weight: 700; font-size: 0.85rem; color: #555; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;';
  progressOverview.appendChild(progressTitle);

  const tileIcons = { intro: '🏠', vocab: '📚', dialogue: '💬', pattern: '🔤', function: '✅', controlled: '🎯', writing: '✍️', listen_write: '👂', mistake: '🔄', done: '🎉' };
  const tileKeys = ['intro', 'vocab', 'dialogue', 'pattern', 'function', 'controlled', 'writing', 'listen_write', 'mistake'];
  
  tileKeys.forEach(key => {
    const row = document.createElement("div");
    row.style.cssText = 'display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: 0.85rem;';
    
    const icon = tileIcons[key] || '▪';
    const stateKey = 'tiles.' + (key === 'listen_write' ? 'listenWrite' : key);
    const tileName = uz(stateKey);
    const pts = tileScores[key] || 0;
    const hasPts = pts > 0;

    row.innerHTML = `
      <span style="font-size: 1.1rem;">${icon}</span>
      <span style="flex: 1; color: ${hasPts ? '#333' : '#999'};">${tileName}</span>
      <span style="font-weight: 600; color: ${hasPts ? '#2e7d32' : '#ccc'};">${hasPts ? pts + ' ' + uz('done.points') : '—'}</span>
    `;
    progressOverview.appendChild(row);
  });

  scoreSection.appendChild(progressOverview);
  
  // Best score comparison
  const bestScore = getBestScore(currentLessonId);
  if (bestScore && bestScore.percentage !== percentage) {
    const comparison = document.createElement("div");
    comparison.style.marginTop = "12px";
    comparison.style.fontSize = "14px";
    comparison.style.fontStyle = "italic";
    
    if (percentage > bestScore.percentage) {
      comparison.textContent = uz('done.newBest', { pct: bestScore.percentage });
      comparison.classList.add('tl-uz');
      comparison.dataset.translation = en('done.newBest', { pct: bestScore.percentage });
      comparison.style.color = "#2e7d32";
    } else {
      comparison.textContent = uz('done.yourBest', { pct: bestScore.percentage, date: new Date(bestScore.date).toLocaleDateString() });
      comparison.classList.add('tl-uz');
      comparison.dataset.translation = en('done.yourBest', { pct: bestScore.percentage, date: new Date(bestScore.date).toLocaleDateString() });
      comparison.style.color = "#666";
    }
    
    scoreSection.appendChild(comparison);
  }

  const msg = document.createElement("div");
  msg.className = "tile-section";
  msg.textContent = uz('done.completionMessage');
  msg.classList.add('tl-uz');
  msg.dataset.translation = en('done.completionMessage');

  tileContainer.appendChild(title);
  tileContainer.appendChild(scoreSection);
  tileContainer.appendChild(msg);

  const lessonIds = getUnitLessonIds(CURRENT_UNIT_ID);
  const idx = lessonIds.indexOf(lesson.lesson_id || currentLessonId);

  if (idx >= 0 && idx < lessonIds.length - 1) {
    // Not last lesson - show next lesson button
    const nextId = lessonIds[idx + 1];
    const btnNextLesson = createButton(
      uz('done.nextLessonBtn').replace('{name}', getFriendlyLessonName(nextId)),
      () => {
        if (typeof window.setCurrentLesson === 'function') window.setCurrentLesson(nextId);
        if (typeof window.setLastMasterPassed === 'function') window.setLastMasterPassed(false);
        if (typeof window.setLastWritingPassed === 'function') window.setLastWritingPassed(false);
        if (typeof window.setLastListenWritePassed === 'function') window.setLastListenWritePassed(false);
        resetIntegrationState();
        buildLessonSelectorUI();
        transitionToTile(STATES.INTRO); // single render via transitionToTile
      }
    );
    tileContainer.appendChild(btnNextLesson);
  } else if (idx === lessonIds.length - 1) {
    // Last lesson - check if ALL lessons complete
    const allLessonsComplete = lessonIds.every(lessonId => completedLessons.has(lessonId));
    
    if (allLessonsComplete) {
      // Mark unit as completed
      completedUnits.add(CURRENT_UNIT_ID);
      _saveCompletedUnits();
      
      // Show unit complete message
      const unitCompleteMsg = document.createElement("div");
      unitCompleteMsg.className = "tile-section";
      unitCompleteMsg.style.background = "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)";
      unitCompleteMsg.style.border = "2px solid #4caf50";
      unitCompleteMsg.style.fontWeight = "bold";
      unitCompleteMsg.style.padding = "16px";
      unitCompleteMsg.style.marginBottom = "16px";
      unitCompleteMsg.textContent = uz('done.unitCompleteMsg').replace('{unit}', getUnitDisplayName(CURRENT_UNIT_ID));
      tileContainer.appendChild(unitCompleteMsg);
      
      // Show next unit button if available
      const currentUnitIdx = availableUnits.indexOf(CURRENT_UNIT_ID);
      if (currentUnitIdx >= 0 && currentUnitIdx < availableUnits.length - 1) {
        const nextUnitId = availableUnits[currentUnitIdx + 1];
        const btnNextUnit = createButton(
          uz('done.nextUnitBtn').replace('{name}', getUnitDisplayName(nextUnitId)),
          async () => {
            await setActiveUnit(nextUnitId);
            buildLessonSelectorUI();
            const curriculum = typeof window.getActiveCurriculum === 'function' ? window.getActiveCurriculum() : null;
            const firstLessonId = curriculum?.lessons ? Object.keys(curriculum.lessons)[0] : null;
            if (firstLessonId && typeof window.setCurrentLesson === 'function') window.setCurrentLesson(firstLessonId);
            transitionToTile(STATES.INTRO); // single render via transitionToTile
          }
        );
        tileContainer.appendChild(btnNextUnit);
      }
    }
    
    const btnUnitCheck = createButton(uz('done.errorCheck'), () => {
      if (!allLessonsComplete) {
        alert(uz('done.completeAllFirst').replace('{lessons}', 
              lessonIds.filter(id => !completedLessons.has(id)).map(id => getFriendlyLessonName(id)).join(", ")));
        return;
      }
      transitionToTile(STATES.UNIT_ERROR_DETECTION);
    });
    
    // Visual indicator if not all complete
    if (!allLessonsComplete) {
      btnUnitCheck.style.opacity = "0.5";
      btnUnitCheck.title = uz('done.allLessonsRequired');
    }
    
    tileContainer.appendChild(btnUnitCheck);
  }

  // ── Lesson Restart Button ──
  const btnRestart = createButton(uz('done.restartLesson'), () => {
    if (typeof window.setLastMasterPassed === 'function') window.setLastMasterPassed(false);
    if (typeof window.setLastWritingPassed === 'function') window.setLastWritingPassed(false);
    if (typeof window.setLastListenWritePassed === 'function') window.setLastListenWritePassed(false);
    if (typeof resetIntegrationState === 'function') resetIntegrationState();
    window.sessionScore = 0;
    window.sessionMaxScore = 0;
    window.tileScores = {};
    transitionToTile(STATES.INTRO);
  });
  btnRestart.classList.add('tl-uz');
  btnRestart.dataset.translation = en('done.restartLesson');
  btnRestart.style.cssText += '; background: linear-gradient(135deg, #78909c 0%, #546e7a 100%); margin-top: 12px; opacity: 0.85;';
  tileContainer.appendChild(btnRestart);
}

// Backward compatibility
window.renderDoneTile = renderDoneTile;
