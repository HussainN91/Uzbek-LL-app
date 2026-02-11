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

// Populate the tile registry before anything renders
import './tiles/tile-registrations.js';

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
  // Initialize vocab gap hover system
  // TODO: vocab_gap_hover_data.json does not exist yet — generate it when gap data is ready
  try {
    const response = await fetch('vocab_gap_hover_data.json');
    if (response.ok) {
      const gapData = await response.json();
      if (window.vocabGapSystem) {
        await window.vocabGapSystem.initialize(gapData);
        console.log(`✅ Vocab Gap System: ${gapData.total_gap_words} words`);
      }
    }
  } catch {
    // Optional feature, ignore if not available
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

  // SVG icons for the dialogue buttons
  const speakerSVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.5v7a4.49 4.49 0 0 0 2.5-3.5zM14 3.23v2.06a7.007 7.007 0 0 1 0 13.42v2.06A9.013 9.013 0 0 0 14 3.23z"/></svg>';
  const waveSpans = '<span class="dlg-audio-waves"><span></span><span></span><span></span><span></span><span></span></span>';

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
  console.log("║  goToTile('FUNCTION')           Jump to tile                   ║");
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
  if (confirm("⚠️ Bu barcha progressni o'chiradi. Davom etasizmi?\n\n(This will clear ALL progress. Continue?)")) {
    localStorage.clear();
    sessionStorage.clear();
    console.log("✅ Progress cleared. Reloading...");
    location.reload();
  } else {
    console.log("❌ Reset cancelled.");
  }
}

// ============================
// SERVICE WORKER
// ============================

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log("⚠️ Service Worker not supported");
    return;
  }
  
  const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  
  if (isLocalhost) {
    // Disable SW on localhost to prevent stale caches
    navigator.serviceWorker.getRegistrations()
      .then(registrations => Promise.all(registrations.map(reg => reg.unregister())))
      .then(() => console.log('🧹 Service Worker disabled on localhost'))
      .catch(error => console.log('❌ SW unregister failed:', error));
    return;
  }
  
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('✅ Service Worker registered:', registration.scope);
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 New app version available!');
              if (confirm('A new version is available. Reload to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });
    })
    .catch(error => console.log('❌ SW registration failed:', error));
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
