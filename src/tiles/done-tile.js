/**
 * done-tile.js - Tile 10: Lesson Completed
 * Final tile with score summary, confetti, and next lesson navigation
 */

import {
  getTileContainer,
  clearTileContainer,
  createButton,
  setState,
  playSound,
  STATES,
  getCurrentUnitId
} from './tile-utils.js';

/**
 * Get translation function reference
 */
function getUz(key) {
  return typeof window.getUz === 'function' ? window.getUz(key) : key;
}

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

  // Mark current lesson as completed for sequential unlocking
  if (currentLessonId) {
    completedLessons.add(currentLessonId);
    GameState.completedLessons.add(currentLessonId);
    _saveCompletedLessons();
    GameState.save();
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
  title.textContent = "🎉 Lesson Completed!";

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
  scoreTitle.textContent = "🏆 Yakuniy natija";
  scoreTitle.classList.add("tl-uz");
  scoreTitle.dataset.translation = "🏆 Final Score";
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
    scoreDisplay.textContent = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - A'LO!";
    scoreDisplay.classList.add("tl-uz");
    scoreDisplay.dataset.translation = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - EXCELLENT!";
  } else if (percentage >= 75) {
    scoreDisplay.style.color = "#1976d2";
    scoreDisplay.textContent = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - YAXSHI!";
    scoreDisplay.classList.add("tl-uz");
    scoreDisplay.dataset.translation = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - GOOD!";
  } else if (percentage >= 60) {
    scoreDisplay.style.color = "#f57c00";
    scoreDisplay.textContent = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - QONIQARLI";
    scoreDisplay.classList.add("tl-uz");
    scoreDisplay.dataset.translation = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - SATISFACTORY";
  } else {
    scoreDisplay.style.color = "#d32f2f";
    scoreDisplay.textContent = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - QAYTA URINIB KO'RING";
    scoreDisplay.classList.add("tl-uz");
    scoreDisplay.dataset.translation = sessionScore + " / " + sessionMaxScore + " (" + percentage + "%) - TRY AGAIN";
  }
  
  // Breakdown by tile
  const breakdown = document.createElement("div");
  breakdown.style.marginTop = "12px";
  breakdown.style.fontSize = "14px";
  breakdown.innerHTML = "<strong class='tl-uz' data-translation='Breakdown:'>Tafsilotlar:</strong><br/>";
  
  const tileNames = window.UI_CONFIG?.TILE_NAMES || {};
  
  Object.keys(tileScores).forEach(tileName => {
    const points = tileScores[tileName];
    const displayName = tileNames[tileName] || tileName;
    breakdown.innerHTML += "• " + displayName + ": " + points + " points<br/>";
  });
  
  scoreSection.appendChild(scoreTitle);
  scoreSection.appendChild(scoreDisplay);
  scoreSection.appendChild(breakdown);
  
  // Best score comparison
  const bestScore = getBestScore(currentLessonId);
  if (bestScore && bestScore.percentage !== percentage) {
    const comparison = document.createElement("div");
    comparison.style.marginTop = "12px";
    comparison.style.fontSize = "14px";
    comparison.style.fontStyle = "italic";
    
    if (percentage > bestScore.percentage) {
      comparison.textContent = "🎉 New personal best! (Previous: " + bestScore.percentage + "%)";
      comparison.style.color = "#2e7d32";
    } else {
      comparison.textContent = "Your best: " + bestScore.percentage + "% (" + new Date(bestScore.date).toLocaleDateString() + ")";
      comparison.style.color = "#666";
    }
    
    scoreSection.appendChild(comparison);
  }

  const msg = document.createElement("div");
  msg.className = "tile-section";
  msg.textContent =
    "Bu dars uchun master bosqichi yakunlandi. To'liq ilovada bu keyingi darsni yoki bo'lim bosqichlarini ochadi.";

  tileContainer.appendChild(title);
  tileContainer.appendChild(scoreSection);
  tileContainer.appendChild(msg);

  const lessonIds = getUnitLessonIds(CURRENT_UNIT_ID);
  const idx = lessonIds.indexOf(lesson.lesson_id || currentLessonId);

  if (idx >= 0 && idx < lessonIds.length - 1) {
    // Not last lesson - show next lesson button
    const nextId = lessonIds[idx + 1];
    const btnNextLesson = createButton(
      "➡️ Keyingi dars (" + getFriendlyLessonName(nextId) + ")",
      () => {
        if (typeof window.setCurrentLesson === 'function') window.setCurrentLesson(nextId);
        if (typeof window.setLastMasterPassed === 'function') window.setLastMasterPassed(false);
        if (typeof window.setLastWritingPassed === 'function') window.setLastWritingPassed(false);
        if (typeof window.setLastListenWritePassed === 'function') window.setLastListenWritePassed(false);
        resetIntegrationState();
        buildLessonSelectorUI();
        setState(STATES.INTRO); // single render via setState
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
      unitCompleteMsg.textContent = "🎉 " + getUnitDisplayName(CURRENT_UNIT_ID) + " yakunlandi! Keyingi unit ochildi.";
      tileContainer.appendChild(unitCompleteMsg);
      
      // Show next unit button if available
      const currentUnitIdx = availableUnits.indexOf(CURRENT_UNIT_ID);
      if (currentUnitIdx >= 0 && currentUnitIdx < availableUnits.length - 1) {
        const nextUnitId = availableUnits[currentUnitIdx + 1];
        const btnNextUnit = createButton(
          "🚀 Keyingi Unit (" + getUnitDisplayName(nextUnitId) + ")",
          async () => {
            await setActiveUnit(nextUnitId);
            buildLessonSelectorUI();
            const curriculum = typeof window.getActiveCurriculum === 'function' ? window.getActiveCurriculum() : null;
            const firstLessonId = curriculum?.lessons ? Object.keys(curriculum.lessons)[0] : null;
            if (firstLessonId && typeof window.setCurrentLesson === 'function') window.setCurrentLesson(firstLessonId);
            setState(STATES.INTRO); // single render via setState
          }
        );
        tileContainer.appendChild(btnNextUnit);
      }
    }
    
    const btnUnitCheck = createButton("📊 Unit Error Check", () => {
      if (!allLessonsComplete) {
        alert("Oldin barcha darslarni yakunlang. Tugallanmagan darslar: " + 
              lessonIds.filter(id => !completedLessons.has(id)).map(id => getFriendlyLessonName(id)).join(", "));
        return;
      }
      setState(STATES.UNIT_ERROR_DETECTION);
    });
    
    // Visual indicator if not all complete
    if (!allLessonsComplete) {
      btnUnitCheck.style.opacity = "0.5";
      btnUnitCheck.title = "Barcha darslar tugallanishi kerak";
    }
    
    tileContainer.appendChild(btnUnitCheck);
  }
}

// Backward compatibility
window.renderDoneTile = renderDoneTile;
