/**
 * Main Entry Point - Modular Architecture
 * ========================================
 * CLEAN ES MODULE VERSION (v2.0)
 * 
 * Uses ONLY the src/ folder (v2.0 ES Modules).
 * The modules/ folder is the OLD v1.0 IIFE refactor and should NOT be used.
 * 
 * @see REFACTORING_ROADMAP.md
 */

// ===========================================
// SRC/ ES MODULES - CORE INFRASTRUCTURE
// These modules use proper ES imports and export to window.* for compatibility
// ===========================================

// Utils - constants, DOM, storage, timing, audio (exposes to window.STATES, etc.)
import './src/utils/index.js';

// State management (exposes to window.GameState, etc.)
import './src/state/index.js';

// Components — button, loading-spinner
import './src/components/index.js';

// Features — scoring, touch handling, vocab card renderer, UI redesign
import './src/features/index.js';

// Games — POS Speed Game, Grammar PPP
import './src/games/index.js';

// Core engine — curriculum, navigation, UI builders, teacher mode,
//                helpers, chunk system, variation engine, semantic tags
import './src/core/index.js';

// Data loader
import './src/data/index.js';

// ===========================================
// LAZY LOAD FUNCTIONS
// LEGACY: Tiles are now registered via static imports in
// src/tiles/tile-registrations.js. These dynamic imports hit the same
// ES module cache — harmless no-op kept for backward compatibility.
// ===========================================

const lazyLoadTiles = () => {
  // Load all tiles from src/tiles/ (single batch, no duplicate loads — ES modules are cached)
  return Promise.all([
    import('./src/tiles/intro-tile.js'),
    import('./src/tiles/vocab-tile.js'),
    import('./src/tiles/dialogue-tile.js'),
    import('./src/tiles/done-tile.js'),
    import('./src/tiles/dialogue-practice-tile.js'),
  ]);
};
window.lazyLoadTiles = lazyLoadTiles;

// ===========================================
// CONFIGURATION FILES (Root level)
// ===========================================

// LEGACY — these files no longer exist in the workspace:
// import './audio_config.js';
// import './translation_data.js';
// import './grammar_data.js';

import './ui_config.js';

// Vocab Card Renderer — now loaded via features barrel above

// ===========================================
// VOCAB CARD DATA
// ===========================================

// Unit 1 - canonical 4-act format (synchronous)
import './vocab_cards_u01_4act.js';

// Units 1.5, 2-10 - lazy loaded
const VOCAB_BUNDLE_LOADERS = [
  { units: [1], loader: () => Promise.resolve() },
  { units: ['U01_5'], loader: () => import('./vocab_cards_u01.5_4act.js') },
  { units: [2, 3], loader: () => import('./vocab_cards_u02_4act.js').then(() => import('./vocab_cards_u03_4act.js')) },
  { units: [4, 5, 6], loader: () => Promise.all([import('./vocab_cards_u04_4act.js'), import('./vocab_cards_u05_4act.js'), import('./vocab_cards_u06_4act.js')]) },
  { units: [7, 8, 9, 10], loader: () => Promise.all([import('./vocab_cards_u07_4act.js'), import('./vocab_cards_u08_4act.js'), import('./vocab_cards_u09_4act.js'), import('./vocab_cards_u10_4act.js')]) }
];

const lazyLoadVocabUnit = (unitNumOrId) => {
  // Unit 1.5: string id "U01_5" or numeric 1.5
  if (unitNumOrId === 'U01_5' || unitNumOrId === 1.5) {
    if (window.VOCAB_CARDS_U01_5) return Promise.resolve();
    const bundle = VOCAB_BUNDLE_LOADERS.find(entry => entry.units.includes('U01_5'));
    return bundle ? bundle.loader() : Promise.reject(new Error('Invalid unit: U01_5'));
  }
  const unitNum = typeof unitNumOrId === 'number' ? unitNumOrId : parseInt(String(unitNumOrId).replace(/\D/g, ''), 10);
  const bundle = VOCAB_BUNDLE_LOADERS.find(entry => entry.units.includes(unitNum));
  if (!bundle) {
    return Promise.reject(new Error(`Invalid unit: ${unitNumOrId}`));
  }
  if (window['VOCAB_CARDS_U' + String(unitNum).padStart(2, '0')]) {
    return Promise.resolve();
  }
  return bundle.loader();
};
window.lazyLoadVocabUnit = lazyLoadVocabUnit;

// ===========================================
// CURRICULUM & LESSONPACK
// ===========================================

// LEGACY — curriculum_u01.js is dead weight: curriculum-loader.js builds
// ACTIVE_CURRICULUM directly from vocab card data (lines 147-210).
// import './curriculum_u01.js';

// LEGACY — lessonpack_adapter.js no longer exists in workspace:
// import './lessonpack_adapter.js';

// ===========================================
// NOTE: Legacy wrappers ARCHIVED
// The following files were moved to archive/v1_legacy_wrappers/
// They were IIFE wrappers that delegated to app.js (now deleted).
// Functionality is now in src/ ES modules.
// - state-persistence.js â†’ src/state/app-state.js
// - scoring-system.js â†’ src/features/scoring.js
// - audio-engine.js â†’ src/utils/audio.js
// - grammar-tooltip.js â†’ handled inline
// ===========================================

// ===========================================
// ADDITIONAL SYSTEMS
// ===========================================

// Vocab Gap Hover System
import './vocab_gap_hover.js';

// U02 Local Audio — no longer exists in workspace
// import './u02_local_audio.js';

// Vocab Tile V3 Integration
import './src/components/vocab-tile/integration.js';

// ===========================================
// APP MAIN ORCHESTRATOR
// ===========================================

import { initApp } from './src/app-main.js';

// ===========================================
// MANUAL APP INITIALIZATION
// ===========================================

if (typeof document !== 'undefined') {
  const runInit = () => {
    if (typeof window.initApp === 'function') {
      window.initApp();
    } else if (typeof initApp === 'function') {
      initApp();
    } else {
      console.error('initApp not found');
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit, { once: true });
  } else {
    runInit();
  }
}
