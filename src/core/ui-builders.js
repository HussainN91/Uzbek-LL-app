/**
 * UI Builders Module
 * ==================
 * Unit and Lesson selector UI builders.
 * 
 * @module src/core/ui-builders
 * @version 2.0.0 (Full Migration)
 */

import { STATES } from '../utils/constants.js';
import { 
  getActiveCurriculum, 
  getCurrentUnitId, 
  getUnitDisplayName, 
  getFriendlyLessonName,
  setActiveUnit,
  detectAvailableUnits
} from './curriculum-loader.js';
import {
  setState,
  setCurrentLesson,
  render,
  getAvailableUnits,
  setAvailableUnits,
  getCompletedUnits,
  getCompletedLessons,
  resetIntegrationState,
  setControlledStageIndex,
  setLastMasterPassed,
  setLastWritingPassed,
  setLastListenWritePassed,
  getCurrentLessonId
} from './navigation.js';
import { uz, en } from './i18n.js';

// ============================
// UNIT SELECTOR
// ============================

/**
 * Build the unit selector UI
 */
export async function buildUnitSelectorUI() {
  const el = document.getElementById("unit-selector");
  if (!el) return;
  
  el.innerHTML = "";
  
  let availableUnits = getAvailableUnits();
  
  // Detect units if not already done
  if (!availableUnits || availableUnits.length === 0) {
    availableUnits = await detectAvailableUnits();
    setAvailableUnits(availableUnits);
  }
  
  const completedUnits = getCompletedUnits();
  const currentUnitId = getCurrentUnitId();
  
  for (let idx = 0; idx < availableUnits.length; idx++) {
    const unitId = availableUnits[idx];
    const unitNumber = parseInt(unitId.substring(1));
    const displayName = await getUnitDisplayTopic(unitId);
    const label = `📚 Unit ${unitNumber}: ${displayName}`;
    
    // Check unlock status
    const prevUnitId = idx > 0 ? availableUnits[idx - 1] : null;
    const isUnlocked = window.TEACHER_MODE || window.DEV_BYPASS_GATES || !prevUnitId || completedUnits.has(prevUnitId);
    const isCurrent = unitId === currentUnitId;
    
    const btn = createButton(label, async () => {
      if (!isUnlocked && !isCurrent) {
        alert(uz('uiBuilders.completeUnitFirst').replace('{unit}', parseInt(prevUnitId.substring(1))));
        return;
      }
      
      btn.classList.add("loading");
      btn.style.opacity = "0.7";
      
      await setActiveUnit(unitId);
      setState(STATES.INTRO); // setState already calls render()
      
      btn.classList.remove("loading");
      btn.style.opacity = "";
      
      await buildUnitSelectorUI();
      buildLessonSelectorUI();
    });
    
    // Style locked units
    if (!isUnlocked && !isCurrent) {
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
      btn.title = uz('uiBuilders.lockedUnit');
    }
    
    // Highlight current
    if (isCurrent) {
      btn.classList.add("active");
      btn.style.background = "linear-gradient(135deg, #1eb53a 0%, #45a049 100%)";
      btn.style.color = "white";
      btn.style.fontWeight = "bold";
    }
    
    el.appendChild(btn);
  }
}

/**
 * Get unit display topic from lessonpack
 */
async function getUnitDisplayTopic(unitId) {
  const path = `./unit_${unitId.substring(1)}_lessonpack.json`;
  try {
    const res = await fetch(path, { method: 'GET', cache: 'no-cache' });
    if (!res.ok) return unitId;
    const json = await res.json();
    const func = json.unit_function_en || json.unit_function_uz || "";
    if (func) {
      return func.charAt(0).toUpperCase() + func.slice(1);
    }
  } catch {}
  return getUnitDisplayName(unitId);
}

// ============================
// LESSON SELECTOR
// ============================

/**
 * Build the lesson selector UI
 */
export function buildLessonSelectorUI() {
  const el = document.getElementById("lesson-selector");
  if (!el) return;
  
  el.innerHTML = "";
  
  const curriculum = getActiveCurriculum();
  const lessons = curriculum?.lessons || {};
  const ids = Object.keys(lessons);
  
  if (ids.length === 0) return;
  
  const completedLessons = getCompletedLessons();
  const currentLessonId = getCurrentLessonId();
  
  ids.forEach((lid, idx) => {
    const lesson = lessons[lid] || {};
    const lessonNumber = idx + 1;
    const functionText = lesson.function_en || lesson.function_uz || "";
    const label = uz('uiBuilders.lessonLabel').replace('{num}', lessonNumber).replace('{name}', `${functionText.charAt(0).toUpperCase()}${functionText.slice(1)}`);
    
    // Unlock check
    const prevLessonId = idx > 0 ? ids[idx - 1] : null;
    const isCurrent = lid === currentLessonId;
    
    const btn = createButton(label, () => {
      const isUnlocked = window.DEV_BYPASS_GATES || window.TEACHER_MODE || !prevLessonId || completedLessons.has(prevLessonId);
      if (!isUnlocked && !isCurrent) {
        alert(uz('uiBuilders.completeLessonFirst').replace('{lesson}', idx));
        return;
      }
      
      setCurrentLesson(lid);
      setLastMasterPassed(false);
      setLastWritingPassed(false);
      setLastListenWritePassed(false);
      setControlledStageIndex(0);
      resetIntegrationState();
      setState(STATES.INTRO); // setState already calls render()
      
      buildLessonSelectorUI();
    });
    
    // Locked style
    const visualIsUnlocked = window.DEV_BYPASS_GATES || window.TEACHER_MODE || !prevLessonId || completedLessons.has(prevLessonId);
    if (!visualIsUnlocked && !isCurrent) {
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
      btn.title = uz('uiBuilders.lockedLesson');
    }
    
    // Current style
    if (isCurrent) {
      btn.classList.add("active");
      btn.style.background = "#5a67d8";
      btn.style.color = "white";
    }
    
    // Completed indicator
    if (completedLessons.has(lid)) {
      const checkmark = document.createElement("span");
      checkmark.textContent = " ✅";
      btn.appendChild(checkmark);
    }
    
    el.appendChild(btn);
  });
}

// ============================
// HELPER: CREATE BUTTON
// ============================

function createButton(label, handler) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  btn.addEventListener("click", handler);
  return btn;
}

// ============================
// WINDOW EXPORTS
// ============================

if (typeof window !== 'undefined') {
  window.buildUnitSelectorUI = buildUnitSelectorUI;
  window.buildLessonSelectorUI = buildLessonSelectorUI;
}
