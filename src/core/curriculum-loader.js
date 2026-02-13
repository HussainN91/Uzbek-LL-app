/**
 * Curriculum Loader Module
 * ========================
 * Handles loading and managing curriculum/lessonpack data.
 * 
 * @module src/core/curriculum-loader
 * @version 2.0.0 (Full Migration)
 */

import { STATES } from '../utils/constants.js';

// ============================
// ACTIVE CURRICULUM STATE
// ============================

/**
 * @typedef {Object} ActiveCurriculum
 * @property {string} unit_id
 * @property {Object} units
 * @property {Object} lessons
 * @property {Object} vocab
 * @property {Object} patterns
 * @property {Object} mistakes
 * @property {Object} audio
 * @property {Object} masterTiles
 * @property {any} unitErrorDetection
 * @property {any} grandTile
 * @property {any[]} audioBank
 */

/** @type {ActiveCurriculum} */
let ACTIVE_CURRICULUM = {
  unit_id: "U01",
  units: {},
  lessons: {},
  vocab: {},
  patterns: {},
  mistakes: {},
  audio: {},
  masterTiles: {},
  unitErrorDetection: null,
  grandTile: null,
  audioBank: [],
};

let CURRENT_UNIT_ID = "U01";
/** @type {string[]} */
let MISSING_KEYS = [];
/** @type {string[]|null} */
let _cachedAvailableUnits = null;
/** @type {Promise<string[]>|null} */
let _unitDetectionPromise = null;

// Legacy curriculum fallback
/** @type {ActiveCurriculum|null} */
const LEGACY_CURRICULUM_U01 = typeof window !== "undefined" && window.CURRICULUM_U01
  ? /** @type {ActiveCurriculum} */ (window.CURRICULUM_U01)
  : null;

// ============================
// UNIT DETECTION
// ============================

/**
 * Detect available units by checking lessonpack files
 * @param {boolean} forceRefresh - Force re-detection
 * @returns {Promise<string[]>} Array of unit IDs
 */
export async function detectAvailableUnits(forceRefresh = false) {
  if (_cachedAvailableUnits && !forceRefresh) {
    return _cachedAvailableUnits;
  }
  
  if (_unitDetectionPromise) {
    return _unitDetectionPromise;
  }
  
  _unitDetectionPromise = (async () => {
    const supportedUnits = (window.UI_CONFIG?.SUPPORTED_UNITS) || 
      ["U01", "U02", "U03", "U04", "U05", "U06", "U07", "U08", "U09", "U10"];
    
    const results = await Promise.all(
      supportedUnits.map(async (unitId) => {
        const unitNum = unitId.replace("U", "");
        const path = `./unit_${unitNum.padStart(2, '0')}_lessonpack.json`;
        try {
          const res = await fetch(path, { method: 'HEAD', cache: 'default' });
          return res.ok ? unitId : null;
        } catch {
          return null;
        }
      })
    );
    
    const units = results.filter(Boolean);
    _cachedAvailableUnits = units;
    _unitDetectionPromise = null;
    return units;
  })();
  
  return _unitDetectionPromise;
}

// ============================
// UNIT LOADING
// ============================

/**
 * Load and activate a unit's curriculum
 * @param {string} unitId - Unit ID (e.g., "U01")
 * @returns {Promise<boolean>} Success status
 */
export async function setActiveUnit(unitId) {
  if (window.__DEV_AUDIT__) console.log("🔄 setActiveUnit:", unitId);
  
  // Show loading indicator
  if (typeof window.showLoading === 'function') {
    window.showLoading();
  }
  
  CURRENT_UNIT_ID = String(unitId || "U01");
  window.CURRENT_UNIT_ID = CURRENT_UNIT_ID;
  MISSING_KEYS = [];
  
  // ✅ Load vocab cards for this unit (lazy loaded from vocab_cards_uXX.js)
  const isU01_5 = CURRENT_UNIT_ID === 'U01_5' || String(CURRENT_UNIT_ID).toUpperCase() === 'U01_5';
  const unitNum = isU01_5 ? null : parseInt(CURRENT_UNIT_ID.replace(/\D/g, ''), 10);
  if (typeof window.lazyLoadVocabUnit === 'function') {
    try {
      if (isU01_5) {
        await window.lazyLoadVocabUnit('U01_5');
        console.log('✅ Vocab cards loaded for U01_5');
      } else if (unitNum) {
        await window.lazyLoadVocabUnit(unitNum);
        console.log(`✅ Vocab cards loaded for U${String(unitNum).padStart(2, '0')}`);
      }
    } catch (e) {
      console.warn(`⚠️ Could not load vocab cards for unit ${CURRENT_UNIT_ID}:`, e);
    }
  }
  
  // ✅ VOCAB-ONLY FALLBACK: Check if vocab cards exist directly (no lessonpack needed)
  const vocabCardsKey = isU01_5 ? 'VOCAB_CARDS_U01_5' : `VOCAB_CARDS_U${String(unitNum).padStart(2, '0')}`;
  const vocabCards = window[vocabCardsKey];
  
  if (vocabCards && vocabCards.lessons) {
    console.log(`✅ Found ${vocabCardsKey} - using vocab-only mode (no lessonpack needed)`);
    
    // Build minimal curriculum from vocab cards
    const lessons = vocabCards.lessons;
    const lessonIds = Object.keys(lessons);
    
    ACTIVE_CURRICULUM = {
      unit_id: CURRENT_UNIT_ID,
      units: {
        [CURRENT_UNIT_ID]: {
          unit_id: CURRENT_UNIT_ID,
          lesson_ids: lessonIds
        }
      },
      lessons: {},
      vocab: {},
      patterns: {},
      audio: {},
      mistakes: {},
      // Pedagogical data from vocab card bundles
      dialogues: vocabCards.dialogues || {},
      mission: vocabCards.mission || null,
      contrastive_turns: vocabCards.contrastive_turns || [],
      grammar_focus: vocabCards.grammar_focus || ''
    };
    
    // Extract lesson data from vocab cards (supports title or title_en from bundle)
    lessonIds.forEach(lessonId => {
      const lesson = lessons[lessonId];
      const cards = lesson.items || lesson.cards || [];
      const vocabIds = cards.map(c => c.id).filter(Boolean);
      const displayName = lesson.title || lesson.title_en || lessonId;
      
      ACTIVE_CURRICULUM.lessons[lessonId] = {
        lesson_id: lessonId,
        unit_id: CURRENT_UNIT_ID,
        title_en: lesson.title_en || lesson.title || lessonId,
        title_uz: lesson.title_uz || "",
        lesson_name: displayName,
        function_en: lesson.function_en || "",
        function_uz: lesson.function_uz || "",
        semantic_category_en: lesson.semantic_category_en || "",
        semantic_category_uz: lesson.semantic_category_uz || "",
        communicative_function: lesson.function_en || "",
        semantic_category: lesson.semantic_category_en || "",
        vocab_ids: vocabIds,
        main_pattern_id: "",
        audio_ids: [],
        mistake_ids: [],
        version: lesson.version || undefined,
        source_dialogue: lesson.source_dialogue || (lesson.source_dialogues && lesson.source_dialogues[0]) || undefined,
        source_dialogues: lesson.source_dialogues || (lesson.source_dialogue ? [lesson.source_dialogue] : undefined)
      };
      
      // Wire up lesson_dialogue from the vocab card dialogues data
      // Dialogue IDs follow the pattern UXX_LYY_DZZ — match by lesson prefix
      if (vocabCards.dialogues) {
        const matchingDialogues = Object.entries(vocabCards.dialogues)
          .filter(([dId]) => dId.startsWith(lessonId + '_'))
          .map(([, dData]) => dData);
        
        if (matchingDialogues.length > 0) {
          // Convert vocab card dialogue format (lines[]) to tile format (turns[])
          const convertedDialogues = matchingDialogues.map(d => ({
            id: d.id,
            context_en: d.title || '',
            context_uz: '',
            turns: (d.lines || []).map(line => ({
              ...line, // Preserve line_ar, line_ru etc. for i18n
              speaker: line.speaker,
              text: line.line,
              text_en: line.line,
              text_uz: line.line_uz,
              target: line.target || [],
              mastery_key: line.mastery_key || '',
              audio_id: line.audio_id || null
            }))
          }));
          
          ACTIVE_CURRICULUM.lessons[lessonId].lesson_dialogue = {
            title_en: matchingDialogues[0].title || displayName,
            title_uz: lesson.title_uz || '',
            dialogues: convertedDialogues
          };
        }
      }
      
      // Extract vocab entries from cards
      cards.forEach(card => {
        if (card.id && card.en) {
          ACTIVE_CURRICULUM.vocab[card.id] = {
            en: card.en,
            uz: card.uz || "",
            pos: card.pos || "",
            ipa: card.ipa || "",
            category: card.category || ""
          };
        }
      });
    });
    
    window.ACTIVE_CURRICULUM = ACTIVE_CURRICULUM;
    console.log(`🟢 Vocab-only curriculum ready: ${lessonIds.length} lessons, ${Object.keys(ACTIVE_CURRICULUM.vocab).length} vocab items`);

    // ╔═══════════════════════════════════════════════════════════════╗
    // ║  DIAGNOSTIC: Vocab-only curriculum data trace                 ║
    // ╚═══════════════════════════════════════════════════════════════╝
    console.group('%c[DIAG] CURRICULUM DATA WIRING', 'background:#222;color:#0f0;font-weight:bold;padding:2px 8px;');
    console.log('Unit:', CURRENT_UNIT_ID);
    console.log('Lessons built:', Object.keys(ACTIVE_CURRICULUM.lessons));
    console.log('Top-level dialogues:', Object.keys(ACTIVE_CURRICULUM.dialogues || {}));
    console.log('Mission:', ACTIVE_CURRICULUM.mission ? `${ACTIVE_CURRICULUM.mission.mission_id} (${ACTIVE_CURRICULUM.mission.stages?.length} stages)` : 'NONE');
    console.log('Contrastive turns:', ACTIVE_CURRICULUM.contrastive_turns?.length || 0);
    console.log('Grammar focus:', ACTIVE_CURRICULUM.grammar_focus || 'NONE');
    Object.entries(ACTIVE_CURRICULUM.lessons).forEach(([lid, lobj]) => {
      console.group(`  Lesson: ${lid}`);
      console.log('has lesson_dialogue:', !!lobj.lesson_dialogue);
      if (lobj.lesson_dialogue) {
        console.log('  title_en:', lobj.lesson_dialogue.title_en);
        console.log('  dialogues:', lobj.lesson_dialogue.dialogues?.length);
        lobj.lesson_dialogue.dialogues?.forEach((d, i) => {
          console.log(`    [${i}] id=${d.id} turns=${d.turns?.length}`);
          if (d.turns?.length > 0) {
            console.log(`      turn[0]: speaker=${d.turns[0].speaker}, text="${d.turns[0].text?.substring(0,40)}"`);
          }
        });
      } else {
        console.warn('  ⚠️ NO lesson_dialogue — tile will skip to Pattern!');
      }
      console.log('source_dialogue:', lobj.source_dialogue);
      console.log('source_dialogues:', lobj.source_dialogues);
      console.log('version:', lobj.version);
      console.groupEnd();
    });
    console.groupEnd();

    hideLoading();
    return true;
  }
  
  const adapter = window.LessonPackAdapter;
  
  if (!adapter || typeof adapter.loadUnitLessonPack !== "function") {
    console.log("⚠️ LessonPackAdapter not available, using legacy curriculum");
    console.log("🔴 FALLBACK 1: No adapter - LEGACY_CURRICULUM_U01 used");
    ACTIVE_CURRICULUM = LEGACY_CURRICULUM_U01 || ACTIVE_CURRICULUM;
    MISSING_KEYS = ["LessonPackAdapter not loaded"];
    hideLoading();
    return false;
  }
  
  let res;
  try {
    res = await adapter.loadUnitLessonPack(CURRENT_UNIT_ID);
  } catch (e) {
    console.error("❌ loadUnitLessonPack failed:", e);
    res = { ok: false, error: String(e?.message || e) };
  }
  
  if (!res?.ok || !res.adapted) {
    console.log("⚠️ Load failed, using legacy curriculum");
    console.log("🔴 FALLBACK 2: Adapter returned error - LEGACY_CURRICULUM_U01 used");
    ACTIVE_CURRICULUM = LEGACY_CURRICULUM_U01 || ACTIVE_CURRICULUM;
    MISSING_KEYS = Array.isArray(res?.missingKeys) ? res.missingKeys : ["LessonPack load failed"];
    hideLoading();
    return false;
  }
  
  const lessonsObj = res.adapted?.lessons;
  if (!lessonsObj || Object.keys(lessonsObj).length === 0) {
    console.log("⚠️ No lessons found, using legacy curriculum");
    console.log("🔴 FALLBACK 3: No lessons in adapted - LEGACY_CURRICULUM_U01 used");
    ACTIVE_CURRICULUM = LEGACY_CURRICULUM_U01 || ACTIVE_CURRICULUM;
    hideLoading();
    return false;
  }
  
  // Set active curriculum
  console.log("🟢 SUCCESS: Using adapted lessonpack curriculum");
  console.log("   Lessons:", Object.keys(lessonsObj).length);
  console.log("   Vocab entries:", Object.keys(res.adapted?.vocab || {}).length);
  ACTIVE_CURRICULUM = res.adapted;
  MISSING_KEYS = Array.isArray(res.missingKeys) ? res.missingKeys : [];
  
  // Update window reference for vocab access
  window.ACTIVE_CURRICULUM = ACTIVE_CURRICULUM;
  
  // ── Pedagogical data backfill from vocab card bundles ──
  // The adapter path doesn't include dialogues/mission/contrastive_turns/grammar_focus,
  // so we pull them from the corresponding window.VOCAB_CARDS_UXX if available.
  {
    const isU01_5_bf = CURRENT_UNIT_ID === 'U01_5' || String(CURRENT_UNIT_ID).toUpperCase() === 'U01_5';
    const bfKey = isU01_5_bf ? 'VOCAB_CARDS_U01_5' : `VOCAB_CARDS_U${String(CURRENT_UNIT_ID).replace(/^[Uu]0?/, '').padStart(2, '0')}`;
    const bfCards = window[bfKey];
    if (bfCards) {
      if (!ACTIVE_CURRICULUM.dialogues && bfCards.dialogues) ACTIVE_CURRICULUM.dialogues = bfCards.dialogues;
      if (!ACTIVE_CURRICULUM.mission && bfCards.mission) ACTIVE_CURRICULUM.mission = bfCards.mission;
      if ((!ACTIVE_CURRICULUM.contrastive_turns || ACTIVE_CURRICULUM.contrastive_turns.length === 0) && bfCards.contrastive_turns) ACTIVE_CURRICULUM.contrastive_turns = bfCards.contrastive_turns;
      if (!ACTIVE_CURRICULUM.grammar_focus && bfCards.grammar_focus) ACTIVE_CURRICULUM.grammar_focus = bfCards.grammar_focus;
      
      // Wire lesson_dialogue for each lesson (same logic as vocab-only path)
      if (bfCards.dialogues && ACTIVE_CURRICULUM.lessons) {
        Object.keys(ACTIVE_CURRICULUM.lessons).forEach(lessonId => {
          const lessonObj = ACTIVE_CURRICULUM.lessons[lessonId];
          if (lessonObj.lesson_dialogue) return; // already wired
          
          const matchingDialogues = Object.entries(bfCards.dialogues)
            .filter(([dId]) => dId.startsWith(lessonId + '_'))
            .map(([, dData]) => dData);
          
          if (matchingDialogues.length > 0) {
            const convertedDialogues = matchingDialogues.map(d => ({
              id: d.id,
              context_en: d.title || '',
              context_uz: '',
              turns: (d.lines || []).map(line => ({
                ...line, // Preserve line_ar, line_ru etc. for i18n
                speaker: line.speaker,
                text: line.line,
                text_en: line.line,
                text_uz: line.line_uz,
                target: line.target || [],
                mastery_key: line.mastery_key || '',
                audio_id: line.audio_id || null
              }))
            }));
            
            lessonObj.lesson_dialogue = {
              title_en: matchingDialogues[0].title || lessonObj.title_en || lessonId,
              title_uz: lessonObj.title_uz || '',
              dialogues: convertedDialogues
            };
          }
          
          // Normalize source_dialogues
          if (!lessonObj.source_dialogue && lessonObj.source_dialogues) {
            lessonObj.source_dialogue = lessonObj.source_dialogues[0];
          }
        });
        console.log('✅ Pedagogical data backfilled from', bfKey);
      }
    }
  }
  
  // Register audio bank
  try {
    window.AUDIO_BANK = window.AUDIO_BANK || {};
    const unitBank = {};
    const bankArray = Array.isArray(ACTIVE_CURRICULUM.audioBank) ? ACTIVE_CURRICULUM.audioBank : [];
    bankArray.forEach(entry => {
      if (entry?.id) {
        unitBank[entry.id] = {
          id: entry.id,
          text: entry.text || entry.transcript_correct || "",
        };
      }
    });
    window.AUDIO_BANK[CURRENT_UNIT_ID] = unitBank;
    console.log("✅ AUDIO_BANK registered:", Object.keys(unitBank).length, "entries");
  } catch (e) {
    console.warn("⚠️ Failed to register AUDIO_BANK:", e);
  }
  
  // Lazy load vocab cards
  try {
    const isU01_5 = CURRENT_UNIT_ID === 'U01_5' || String(CURRENT_UNIT_ID).toUpperCase() === 'U01_5';
    const vocabKey = `VOCAB_CARDS_${String(CURRENT_UNIT_ID).toUpperCase().replace(/\./g, '_')}`;
    if (window.lazyLoadVocabUnit && !window[vocabKey]) {
      if (isU01_5) {
        await window.lazyLoadVocabUnit('U01_5');
      } else {
        const unitNum = parseInt(CURRENT_UNIT_ID.replace("U", "").replace(/^0+/, ""), 10);
        if (unitNum) await window.lazyLoadVocabUnit(unitNum);
      }
    }
  } catch (e) {
    console.warn("⚠️ Failed to lazy-load vocab cards:", e);
  }
  
  // Backfill function data if needed
  await _backfillFunctionData(CURRENT_UNIT_ID);
  
  hideLoading();
  return true;
}

/**
 * Backfill function tile data from lessonpack
 */
async function _backfillFunctionData(unitId) {
  if (!unitId || !ACTIVE_CURRICULUM?.lessons) return;
  
  const lessons = ACTIVE_CURRICULUM.lessons;
  const hasFunctionData = Object.values(lessons).some(l => l?.function_subtasks || l?.function_check_items);
  if (hasFunctionData) return;
  
  const path = `./unit_${String(unitId).replace(/^[Uu]/, "").padStart(2, "0")}_lessonpack.json`;
  try {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) return;
    const json = await res.json();
    const adapter = window.adaptLessonPackToLegacyCurriculum;
    if (typeof adapter !== "function") return;
    const adapted = adapter(json);
    if (!adapted?.lessons) return;
    
    Object.keys(lessons).forEach(lid => {
      const target = lessons[lid];
      const src = adapted.lessons[lid];
      if (!target || !src) return;
      if (!target.function_subtasks && src.function_subtasks) {
        target.function_subtasks = src.function_subtasks;
      }
      if (!target.function_check_items && src.function_check_items) {
        target.function_check_items = src.function_check_items;
      }
    });
    console.log("✅ Backfilled function data for", unitId);
  } catch (e) {
    console.warn("⚠️ Could not backfill function data:", e);
  }
}

function hideLoading() {
  if (typeof window.hideLoading === 'function') {
    window.hideLoading();
  }
}

// ============================
// CURRICULUM ACCESS
// ============================

export function getActiveCurriculum() {
  return ACTIVE_CURRICULUM;
}

export function getCurrentUnitId() {
  return CURRENT_UNIT_ID;
}

export function getMissingKeys() {
  return MISSING_KEYS;
}

export function mergeMissingKeys(keys) {
  if (!Array.isArray(keys) || keys.length === 0) return;
  const set = new Set(MISSING_KEYS);
  keys.forEach(k => set.add(String(k)));
  MISSING_KEYS = Array.from(set);
}

export function getUnit(unitId) {
  const c = ACTIVE_CURRICULUM;
  if (c?.units?.[unitId]) return c.units[unitId];
  const lessons = c?.lessons || {};
  return { unit_id: unitId, lesson_ids: Object.keys(lessons) };
}

export function getUnitLessonIds(unitId) {
  return getUnit(unitId)?.lesson_ids || [];
}

export function getCurrentLesson(lessonId) {
  const id = lessonId || window.currentLessonId;
  return ACTIVE_CURRICULUM.lessons?.[id] || {};
}

export function getVocab(vocabId) {
  return ACTIVE_CURRICULUM.vocab?.[vocabId] || null;
}

export function getPattern(patternId) {
  return ACTIVE_CURRICULUM.patterns?.[patternId] || null;
}

export function getMistake(mistakeId) {
  return ACTIVE_CURRICULUM.mistakes?.[mistakeId] || null;
}

export function getMasterSpecForCurrentLesson(lessonId) {
  const id = lessonId || window.currentLessonId;
  return ACTIVE_CURRICULUM.masterTiles?.[id] || null;
}

export function getUnitErrorDetectionSpec(unitId) {
  const c = ACTIVE_CURRICULUM;
  if (!c?.unitErrorDetection) return null;
  
  if (c.unitErrorDetection.unit_error_detection_id && Array.isArray(c.unitErrorDetection.items)) {
    return c.unitErrorDetection;
  }
  
  return c.unitErrorDetection[unitId] || null;
}

export function getGrandTileSpec(unitId) {
  const c = ACTIVE_CURRICULUM;
  if (!c?.grandTile) return null;
  
  if (c.grandTile.uz_instruction || c.grandTile.expected_output_sample) {
    return c.grandTile;
  }
  
  return c.grandTile[unitId] || null;
}

export function getAudioEntry(audioId) {
  for (const unitId in window.AUDIO_BANK) {
    if (window.AUDIO_BANK[unitId][audioId]) {
      return window.AUDIO_BANK[unitId][audioId];
    }
  }
  return null;
}

// ============================
// PEDAGOGICAL DATA ACCESS
// ============================

/**
 * Get mission metadata for the current unit
 * @returns {{ mission_id: string, flow_model: string, stages: object[] } | null}
 */
export function getMission() {
  return ACTIVE_CURRICULUM?.mission || null;
}

/**
 * Get all dialogues for the current unit
 * @returns {Object} Keyed dialogue entries (e.g. { U01_L01_D01: {...}, ... })
 */
export function getDialogues() {
  return ACTIVE_CURRICULUM?.dialogues || {};
}

/**
 * Get a specific dialogue by ID
 * @param {string} dialogueId e.g. "U01_L01_D01"
 * @returns {Object|null}
 */
export function getDialogue(dialogueId) {
  return ACTIVE_CURRICULUM?.dialogues?.[dialogueId] || null;
}

/**
 * Get contrastive turns for the current unit
 * @returns {Array} Array of contrastive turn objects
 */
export function getContrastiveTurns() {
  return ACTIVE_CURRICULUM?.contrastive_turns || [];
}

/**
 * Get contrastive turns for a specific lesson/stage
 * @param {string} lessonId e.g. "U01_L01"
 * @returns {Array} Filtered contrastive turns matching this lesson
 */
export function getContrastiveTurnsForLesson(lessonId) {
  const all = ACTIVE_CURRICULUM?.contrastive_turns || [];
  return all.filter(ct => ct.dialogue_id?.startsWith(lessonId));
}

/**
 * Get grammar focus string for the current unit
 * @returns {string}
 */
export function getGrammarFocus() {
  return ACTIVE_CURRICULUM?.grammar_focus || '';
}

/**
 * Get mission stage info for a specific lesson
 * Maps lesson number → mission stage (affirmative/negative/interrogative)
 * @param {string} lessonId e.g. "U01_L01"
 * @returns {{ stage: number, form: string, mirror_enabled: boolean } | null}
 */
export function getMissionStageForLesson(lessonId) {
  const mission = ACTIVE_CURRICULUM?.mission;
  if (!mission || !mission.stages) return null;
  
  const lessonMatch = lessonId.match(/_L(\d+)$/);
  if (!lessonMatch) return null;
  const lessonNum = parseInt(lessonMatch[1]);
  
  // Standard mapping: L01→Stage 1 (affirmative), L02→Stage 2 (negative), L03→Stage 3 (interrogative)
  const stageMap = {
    1: { stage: 1, form: 'affirmative', mirror_enabled: true },
    2: { stage: 2, form: 'negative', mirror_enabled: true },
    3: { stage: 3, form: 'interrogative', mirror_enabled: false }
  };
  
  // Check if mission.stages has explicit data
  if (Array.isArray(mission.stages)) {
    const stageData = mission.stages.find(s => s.stage === lessonNum);
    if (stageData) {
      return {
        stage: stageData.stage,
        form: stageData.form || stageMap[lessonNum]?.form || 'affirmative',
        mirror_enabled: stageData.stage <= 2
      };
    }
  }
  
  return stageMap[lessonNum] || null;
}

// ============================
// DISPLAY HELPERS
// ============================

export function getUnitDisplayName(unitId) {
  if (ACTIVE_CURRICULUM?.unit_id === unitId) {
    /** @type {any} */
    const curriculum = ACTIVE_CURRICULUM;
    const func = curriculum.unit_function_en || curriculum.unit_function_uz || "";
    if (func) {
      const unitNum = parseInt(unitId.substring(1));
      return `Unit ${unitNum}: ${func.charAt(0).toUpperCase()}${func.slice(1)}`;
    }
  }
  return `Unit ${parseInt(unitId.substring(1))}`;
}

export function getFriendlyLessonName(lessonId) {
  const lesson = ACTIVE_CURRICULUM.lessons?.[lessonId];
  if (!lesson) return lessonId;
  
  const lessonMatch = lessonId.match(/_L(\d+)$/);
  const lessonNum = lessonMatch ? parseInt(lessonMatch[1]) : "?";
  const func = lesson.communicative_function || lesson.function_en || lesson.function_uz || "";
  
  if (func) {
    return `Lesson ${lessonNum}: ${func.charAt(0).toUpperCase()}${func.slice(1)}`;
  }
  return `Lesson ${lessonNum}`;
}

// ============================
// WINDOW EXPORTS
// ============================

if (typeof window !== 'undefined') {
  // Curriculum access
  window.ACTIVE_CURRICULUM = ACTIVE_CURRICULUM;
  window.getActiveCurriculum = getActiveCurriculum;
  window.getCurrentUnitId = getCurrentUnitId;
  window.getUnit = getUnit;
  window.getUnitLessonIds = getUnitLessonIds;
  window.getCurrentLesson = getCurrentLesson;
  window.getVocab = getVocab;
  window.getPattern = getPattern;
  window.getMistake = getMistake;
  window.getMasterSpecForCurrentLesson = getMasterSpecForCurrentLesson;
  window.getUnitErrorDetectionSpec = getUnitErrorDetectionSpec;
  window.getGrandTileSpec = getGrandTileSpec;
  window.getAudioEntry = getAudioEntry;
  
  // Loading
  window.setActiveUnit = setActiveUnit;
  window.detectAvailableUnits = detectAvailableUnits;
  
  // Display
  window.getUnitDisplayName = getUnitDisplayName;
  window.getFriendlyLessonName = getFriendlyLessonName;
  
  // Pedagogical data
  window.getMission = getMission;
  window.getDialogues = getDialogues;
  window.getDialogue = getDialogue;
  window.getContrastiveTurns = getContrastiveTurns;
  window.getContrastiveTurnsForLesson = getContrastiveTurnsForLesson;
  window.getGrammarFocus = getGrammarFocus;
  window.getMissionStageForLesson = getMissionStageForLesson;
  
  // Keys
  window.getMissingKeys = getMissingKeys;
  window.mergeMissingKeys = mergeMissingKeys;
}
