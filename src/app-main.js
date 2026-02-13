/**
 * Application Main Orchestrator
 * =============================
 * Main entry point for the A1 Language Learning App.
 * Coordinates all modules and initializes the application.
 * 
 * @module src/app-main
 * @version 2.0.0 (Full Migration - Replaces app.js)
 */

import { STATES } from './utils/index.js';
import { applyLanguageDirection } from './utils/language.js';
import { showLanguageSelector } from './components/language-selector.js';
import {
  setActiveUnit,
  detectAvailableUnits,
  getCurrentUnitId,
  getActiveCurriculum,
  initNavigation,
  setState,
  setCurrentLesson,
  render,
  setAvailableUnits,
  getCompletedLessons,
  getCompletedUnits,
  buildUnitSelectorUI,
  buildLessonSelectorUI,
  initTeacherMode
} from './core/index.js';
import { initUIRedesign } from './features/index.js';
import { mountXPDisplay } from './components/xp-display.js';

// Populate the tile registry before anything renders
import './tiles/tile-registrations.js';
import { uz, en } from './core/i18n.js';

// ============================
// APPLICATION STATE
// ============================

const AppMain = {
  isInitialized: false,
  initStartTime: null
};

// ============================
// INITIALIZATION
// ============================

/**
 * Main application initialization
 * Called on DOMContentLoaded
 */
export async function initApp() {
  if (AppMain.isInitialized) {
    console.warn("⚠️ App already initialized");
    return;
  }
  
  AppMain.initStartTime = performance.now();
  console.log("🚀 A1 Language App initializing...");
  
  try {
    // Step 1: Ensure tiles are loaded
    await loadTileModules();

    // Step 1.5: Apply Language Settings
    applyLanguageDirection();
    showLanguageSelector(); // Will show if language not set
    
    // Step 2: Initialize navigation system
    initNavigation();
    
    // Step 3: Initialize teacher mode
    initTeacherMode();
    
    // Step 4: Detect available units
    const availableUnits = await detectAvailableUnits();
    if (availableUnits.length === 0) {
      setAvailableUnits(["U01", "U02"]);
    } else {
      setAvailableUnits(availableUnits);
    }
    
    // Step 5: Build UI
    await buildUnitSelectorUI();
    
    // Step 6: Load initial unit
    const initUnit = getCurrentUnitId() || availableUnits[0] || "U01";
    await setActiveUnit(initUnit);
    
    // Step 7: Build lesson selector
    buildLessonSelectorUI();
    
    // Step 7b: Set initial lesson (first lesson of active unit)
    const curriculum = getActiveCurriculum();
    const lessonIds = Object.keys(curriculum?.lessons || {});
    if (lessonIds.length > 0) {
      const firstLessonId = lessonIds[0];
      console.log(`📌 Setting initial lesson: ${firstLessonId}`);
      setCurrentLesson(firstLessonId);
    }
    
    // Step 8: Initial render
    render();
    
    // Step 9: Initialize additional systems
    await initAdditionalSystems();
    
    // Step 10: Initialize UI Redesign (runs synchronously — DOM is ready)
    initUIRedesign();
    
    // Mark as initialized
    AppMain.isInitialized = true;
    
    const elapsed = Math.round(performance.now() - AppMain.initStartTime);
    console.log(`✅ A1 Language App initialized in ${elapsed}ms`);
    
    // Print dev commands
    printDevCommands();
    
  } catch (error) {
    console.error("❌ App initialization failed:", error);
  }
}

/**
 * Load tile renderer modules
 */
async function loadTileModules() {
  // Tiles are statically registered via tile-registrations.js (imported above).
  // This function kept for backward compat; lazyLoadTiles hits ES module cache (no-op).
  if (typeof window.lazyLoadTiles === 'function') {
    try {
      await window.lazyLoadTiles();
    } catch { /* no-op */ }
  }
  console.log("✅ Tile modules ready (static registration)");
}

/**
 * Initialize additional systems (audio, vocab gap, etc.)
 */
async function initAdditionalSystems() {
  // Initialize XP display badge (gamification)
  try {
    mountXPDisplay();
    console.log('✅ XP Display mounted');
  } catch (e) {
    console.warn('⚠️ XP Display failed to mount:', e);
  }
  

  // Initialize dialogue audio player
  if (!window.dialogueAudioPlayer) {
    window.dialogueAudioPlayer = createDialogueAudioPlayer();
  }
}

/**
 * Create dialogue audio player
 */
function createDialogueAudioPlayer() {
  let currentAudio = null;
  let currentButton = null;
  let isPlaying = false;

  function resetButton(btn) {
    if (!btn) return;
    btn.classList.remove('is-playing', 'is-loading');
  }
  
  return {
    get currentButton() { return currentButton; },
    get isPlaying() { return isPlaying; },
    
    async play(audioPath, button) {
      // Stop any existing audio
      this.stop();
      
      currentButton = button;
      currentAudio = new Audio(audioPath);
      
      return new Promise((resolve, reject) => {
        currentAudio.onended = () => {
          isPlaying = false;
          resetButton(button);
          resolve();
        };
        
        currentAudio.onerror = (e) => {
          isPlaying = false;
          resetButton(button);
          reject(e);
        };
        
        currentAudio.play()
          .then(() => {
            isPlaying = true;
            if (button) {
              button.classList.remove('is-loading');
              button.classList.add('is-playing');
            }
          })
          .catch(reject);
      });
    },
    
    toggle() {
      if (!currentAudio) return;
      
      if (isPlaying) {
        currentAudio.pause();
        isPlaying = false;
        if (currentButton) currentButton.classList.remove('is-playing');
      } else {
        currentAudio.play();
        isPlaying = true;
        if (currentButton) currentButton.classList.add('is-playing');
      }
    },
    
    stop() {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
      }
      resetButton(currentButton);
      currentButton = null;
      isPlaying = false;
    }
  };
}

/**
 * Print dev commands to console
 */
function printDevCommands() {
  console.log("\n╔════════════════════════════════════════════════════════════════╗");
  console.log("║  🔧 DEBUG MODE AVAILABLE                                        ║");
  console.log("╠════════════════════════════════════════════════════════════════╣");
  console.log("║  window.__DEV_AUDIT__ = true    Enable detailed logging        ║");
  console.log("║                                                                 ║");
  console.log("║  👨‍🏫 TEACHER MODE:                                              ║");
  console.log("║  TEACHER_MODE = true            Enable free navigation         ║");
  console.log("║  goToUnit('U02')                Jump to unit                   ║");
  console.log("║  goToLesson('U02_L03')          Jump to lesson                 ║");
  console.log("║  goToTile('DIALOGUE')           Jump to tile                   ║");
  console.log("║  showUnits()                    List available units           ║");
  console.log("║  showLessons()                  List lessons in current unit   ║");
  console.log("║  showTiles()                    List available tiles           ║");
  console.log("║                                                                 ║");
  console.log("║  🔄 RESET:                                                      ║");
  console.log("║  reset()                        Clear all progress             ║");
  console.log("╚════════════════════════════════════════════════════════════════╝\n");
}

// ============================
// GLOBAL RESET
// ============================

function reset() {
  if (confirm(uz('app.resetConfirm'))) {
    localStorage.clear();
    sessionStorage.clear();
    console.log("✅ Progress cleared. Reloading...");
    location.reload();
  } else {
    console.log("❌ Reset cancelled.");
  }
}

// ============================
// LOADING INDICATOR
// ============================

let loadingOverlay = null;

function getLoadingOverlay() {
  if (!loadingOverlay && window.LoadingSpinner) {
    loadingOverlay = window.LoadingSpinner.createLoadingOverlay();
  }
  return loadingOverlay;
}

function showLoading() {
  const overlay = getLoadingOverlay();
  if (overlay) overlay.show();
}

function hideLoading() {
  const overlay = getLoadingOverlay();
  if (overlay) overlay.hide();
}

// ============================
// NOTE: initApp() is called from main-modular.js
// Do NOT auto-init here - it causes race conditions
// ============================

// ============================
// WINDOW EXPORTS
// ============================

if (typeof window !== 'undefined') {
  window.initApp = initApp;
  window.reset = reset;
  window.showLoading = showLoading;
  window.hideLoading = hideLoading;
  
  // Expose AppMain for debugging
  window.AppMain = AppMain;
}

export default AppMain;
