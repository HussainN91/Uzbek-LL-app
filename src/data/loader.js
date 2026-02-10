/**
 * Data Loader Module
 * ===================
 * Lazy loading for curriculum and vocab data.
 * Loads data on demand to reduce initial bundle size.
 * 
 * @module src/data/loader
 * @version 1.0.0 (Phase 4 Refactor)
 */

// JSDoc Type Imports
/** @typedef {import('../types/vocab.d.ts').VocabUnit} VocabUnit */
/** @typedef {import('../types/curriculum.d.ts').Curriculum} Curriculum */

// ============================
// CACHES
// ============================

/** @type {Map<string, VocabUnit>} */
const vocabCache = new Map();
/** @type {Map<string, Curriculum>} */
const curriculumCache = new Map();

// ============================
// LOADING STATE
// ============================

const loadingState = {
  vocab: new Map(),      // unitId -> Promise
  curriculum: new Map(), // unitId -> Promise
};

// ============================
// VOCAB LOADING
// ============================

/**
 * Load vocab data for a unit (with caching)
 * Uses dynamic import() for lazy-loaded vocab files
 * Falls back to window.VOCAB_CARDS_* if already loaded
 * 
 * @param {string} unitId - Unit ID (e.g., "U01")
 * @returns {Promise<VocabUnit|null>} Vocab data or null
 */
export async function loadVocabForUnit(unitId) {
  const normalizedId = unitId.toUpperCase();
  
  // Check cache first
  if (vocabCache.has(normalizedId)) {
    return vocabCache.get(normalizedId);
  }
  
  // Check if already loading
  if (loadingState.vocab.has(normalizedId)) {
    return loadingState.vocab.get(normalizedId);
  }
  
  // Check window global (legacy fallback - fastest)
  const globalKey = `VOCAB_CARDS_${normalizedId.replace(/\./g, '_')}`;
  if (window[globalKey]) {
    vocabCache.set(normalizedId, window[globalKey]);
    return window[globalKey];
  }
  
  // U01_5: special-case file name
  const isU01_5 = normalizedId === 'U01_5';
  const unitNum = isU01_5 ? null : parseInt(normalizedId.slice(1), 10);
  if (!isU01_5 && (isNaN(unitNum) || unitNum < 1 || unitNum > 10)) {
    console.warn(`Invalid vocab unit: ${unitId}`);
    return null;
  }
  
  // Create loading promise for dynamic import
  const loadPromise = (async () => {
    try {
      let vocabData;
      if (isU01_5) {
        await import('../../vocab_cards_u01.5_4act.js');
        vocabData = /** @type {VocabUnit} */ (window.VOCAB_CARDS_U01_5);
      } else {
        const module = await import(`../../vocab_cards_u${String(unitNum).padStart(2, '0')}_4act.js`);
        vocabData = /** @type {VocabUnit} */ (module.default || window[globalKey]);
      }
      if (!vocabData) {
        console.warn(`No vocab data after load for ${normalizedId}`);
        return null;
      }
      
      // Cache the result
      vocabCache.set(normalizedId, vocabData);
      
      // Also assign to window for backward compatibility
      if (typeof window !== 'undefined' && vocabData) {
        window[globalKey] = vocabData;
      }
      
      return vocabData || null;
    } catch (err) {
      console.warn(`Failed to load vocab for ${normalizedId}:`, err);
      return null;
    } finally {
      // Remove from loading state when done
      loadingState.vocab.delete(normalizedId);
    }
  })();
  
  // Track loading state
  loadingState.vocab.set(normalizedId, loadPromise);
  
  return loadPromise;
}

/**
 * Check if vocab for a unit is loaded
 * @param {string} unitId - Unit ID
 * @returns {boolean}
 */
export function isVocabLoaded(unitId) {
  const normalizedId = unitId.toUpperCase();
  return vocabCache.has(normalizedId) || !!window[`VOCAB_CARDS_${normalizedId}`];
}

/**
 * Get vocab from cache (synchronous, for legacy code)
 * @param {string} unitId - Unit ID
 * @returns {Object|null}
 */
export function getVocabSync(unitId) {
  const normalizedId = unitId.toUpperCase();
  if (vocabCache.has(normalizedId)) {
    return vocabCache.get(normalizedId);
  }
  const globalKey = `VOCAB_CARDS_${normalizedId}`;
  if (window[globalKey]) {
    return window[globalKey];
  }
  return null;
}

// ============================
// CURRICULUM LOADING
// ============================

/**
 * Load curriculum data for a unit (with caching)
 * Falls back to window.CURRICULUM_* if already loaded
 * 
 * @param {string} unitId - Unit ID (e.g., "U01")
 * @returns {Promise<Object|null>} Curriculum data or null
 */
export async function loadCurriculumForUnit(unitId) {
  const normalizedId = unitId.toUpperCase();
  
  // Check cache first
  if (curriculumCache.has(normalizedId)) {
    return curriculumCache.get(normalizedId);
  }
  
  // Check if already loading
  if (loadingState.curriculum.has(normalizedId)) {
    return loadingState.curriculum.get(normalizedId);
  }
  
  // Check window global (legacy fallback)
  const globalKey = `CURRICULUM_${normalizedId}`;
  if (window[globalKey]) {
    const cachedCurriculum = /** @type {Curriculum} */ (window[globalKey]);
    curriculumCache.set(normalizedId, cachedCurriculum);
    return cachedCurriculum;
  }
  
  // Check ACTIVE_CURRICULUM (current loaded curriculum)
  if (window.ACTIVE_CURRICULUM && 
      window.ACTIVE_CURRICULUM.unit_id === normalizedId) {
    const activeCurriculum = /** @type {Curriculum} */ (window.ACTIVE_CURRICULUM);
    curriculumCache.set(normalizedId, activeCurriculum);
    return activeCurriculum;
  }
  
  console.warn(`Curriculum for ${normalizedId} not found in cache or window`);
  return null;
}

/**
 * Check if curriculum for a unit is loaded
 * @param {string} unitId - Unit ID
 * @returns {boolean}
 */
export function isCurriculumLoaded(unitId) {
  const normalizedId = unitId.toUpperCase();
  return curriculumCache.has(normalizedId) || 
         !!window[`CURRICULUM_${normalizedId}`] ||
         (window.ACTIVE_CURRICULUM && window.ACTIVE_CURRICULUM.unit_id === normalizedId);
}

// ============================
// PRELOADING
// ============================

/**
 * Preload data for next likely unit (called on idle)
 * @param {string} currentUnitId - Current unit
 */
export function preloadNextUnit(currentUnitId) {
  const unitNumber = parseInt(currentUnitId.slice(1), 10);
  if (isNaN(unitNumber)) return;
  
  const nextUnitId = `U${String(unitNumber + 1).padStart(2, '0')}`;
  
  // Only preload if next unit exists (U01-U10)
  if (unitNumber < 10) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        loadVocabForUnit(nextUnitId).catch(() => {});
        loadCurriculumForUnit(nextUnitId).catch(() => {});
      });
    }
  }
}

/**
 * Cache data from window globals on startup
 * Called to populate cache from already-loaded data
 */
export function cacheFromGlobals() {
  // Cache all loaded vocab
  for (let i = 1; i <= 10; i++) {
    const unitId = `U${String(i).padStart(2, '0')}`;
    const vocabKey = `VOCAB_CARDS_${unitId}`;
    if (window[vocabKey]) {
      vocabCache.set(unitId, window[vocabKey]);
    }
  }
  
  // Cache active curriculum
  if (window.ACTIVE_CURRICULUM) {
    const unitId = window.ACTIVE_CURRICULUM.unit_id;
    if (unitId) {
      const activeCurriculum = /** @type {Curriculum} */ (window.ACTIVE_CURRICULUM);
      curriculumCache.set(unitId.toUpperCase(), activeCurriculum);
    }
  }
}

// ============================
// CLEAR CACHE
// ============================

/**
 * Clear all cached data
 */
export function clearCache() {
  vocabCache.clear();
  curriculumCache.clear();
  loadingState.vocab.clear();
  loadingState.curriculum.clear();
}

/**
 * Clear vocab cache for a specific unit
 * @param {string} unitId - Unit ID
 */
export function clearVocabCache(unitId) {
  const normalizedId = unitId.toUpperCase();
  vocabCache.delete(normalizedId);
  loadingState.vocab.delete(normalizedId);
}

// ============================
// BACKWARD COMPATIBILITY
// ============================

if (typeof window !== 'undefined') {
  window.DataLoader = {
    loadVocabForUnit,
    loadCurriculumForUnit,
    isVocabLoaded,
    isCurriculumLoaded,
    getVocabSync,
    preloadNextUnit,
    cacheFromGlobals,
    clearCache,
  };
  
  // Auto-cache on load
  if (document.readyState === 'complete') {
    cacheFromGlobals();
  } else {
    window.addEventListener('load', cacheFromGlobals);
  }
}

export default {
  loadVocabForUnit,
  loadCurriculumForUnit,
  isVocabLoaded,
  isCurriculumLoaded,
  getVocabSync,
  preloadNextUnit,
  cacheFromGlobals,
  clearCache,
};
