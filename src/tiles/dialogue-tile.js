/**
 * dialogue-tile.js - Tile 3: Lesson Dialogue
 * ============================================
 * Chat-style dialogue practice with full pedagogical feature set:
 * - EN-UZ 3-state toggle (Natural UZ / Mirror / EN) — RULE E11
 * - Contrastive Turns + Discovery Popup — MANDATORY after every dialogue
 * - G1: Vanishing Script (Full / Faded / Blind)
 * - G2: Thinking Pressure (800ms vanish + 2s timer for Stage 3.1 only)
 * - G3: Grammar Flood (dotted underline highlighting)
 * - G4: Mastery State (mastered lines lose Uzbek, get green accent)
 */

import {
  getTileContainer,
  clearTileContainer,
  createProgressBar,
  createBackButton,
  createButton,
  setState,
  transitionToTile,
  STATES,
  getCurrentUnitId,
  getCurrentLessonId,
  highlightGrammarTokens
} from './tile-utils.js';

import {
  LANG_STATES,
  buildMirrorHtml,
  createGlobalMirrorToggle
} from '../utils/mirror-toggle.js';

import {
  renderChunk,
  markAsMastered,
  isMastered,
  getChunkDisplayMode
} from '../utils/language-display.js';

// ============================
// MASTERY PERSISTENCE (G4)
// ============================
const MASTERY_STORAGE_KEY = 'dialogue_mastery_state';

function getMasteryState() {
  try {
    return JSON.parse(localStorage.getItem(MASTERY_STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function setLineMastered(dialogueId, lineIndex) {
  const state = getMasteryState();
  if (!state[dialogueId]) state[dialogueId] = {};
  state[dialogueId][lineIndex] = true;
  localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify(state));
}

function isLineMastered(dialogueId, lineIndex) {
  const state = getMasteryState();
  return !!state[dialogueId]?.[lineIndex];
}

// ============================
// VANISHING SCRIPT STATE (G1)
// ============================
const VANISH_STORAGE_KEY = 'dialogue_vanish_mode';
const VANISH_MODES = ['full', 'faded', 'blind'];

function getVanishMode() {
  return localStorage.getItem(VANISH_STORAGE_KEY) || 'full';
}

function setVanishMode(mode) {
  localStorage.setItem(VANISH_STORAGE_KEY, mode);
}

// ============================
// CSS INJECTION (once)
// ============================
let cssInjected = false;
function injectDialogueCSS() {
  if (cssInjected) return;
  cssInjected = true;
  
  const style = document.createElement('style');
  style.textContent = `
    /* G1: Vanishing Script Modes */
    .dialogue-full .turn-text-en { opacity: 1; transition: opacity 0.3s ease-in-out; }
    .dialogue-full .turn-text-uz { opacity: 1; transition: opacity 0.3s ease-in-out; }
    
    .dialogue-faded .turn-text-en { opacity: 0; transition: opacity 0.3s ease-in-out; cursor: pointer; }
    .dialogue-faded .turn-text-en:hover { opacity: 1; }
    .dialogue-faded .turn-text-uz { opacity: 1; }
    
    .dialogue-blind .turn-text-en { display: none; }
    .dialogue-blind .turn-text-uz { opacity: 1; }
    
    /* G3: Grammar Flood */
    .grammar-flood { border-bottom: 2px dotted #4a90d9; padding-bottom: 1px; }
    
    /* G4: Mastery State */
    .dialogue-turn.mastered {
      border-left: 3px solid #48bb78 !important;
      background: linear-gradient(135deg, rgba(72,187,120,0.08) 0%, rgba(72,187,120,0.03) 100%) !important;
    }
    .dialogue-turn.mastered .turn-text-uz { display: none; }
    .dialogue-turn.mastered .mastery-badge { display: inline-block; }
    .mastery-badge { display: none; margin-left: 8px; color: #48bb78; font-size: 0.85rem; }
    
    /* G2: Thinking Pressure Timer */
    .thinking-timer-bar {
      height: 4px; background: #e53e3e; border-radius: 2px;
      transition: width linear; margin-top: 6px;
    }
    .thinking-timer-bar.depleting { width: 0 !important; }
    
    /* EN-UZ Toggle Buttons */
    .lang-toggle-group { display: flex; gap: 4px; }
    .lang-toggle-btn {
      padding: 6px 14px; border: 2px solid #e0e0e0; border-radius: 20px;
      background: white; color: #555; font-size: 13px; font-weight: 500;
      cursor: pointer; transition: all 0.2s ease;
    }
    .lang-toggle-btn.active {
      border-color: #5a67d8; background: #5a67d8; color: white;
    }
    .lang-toggle-btn:hover:not(.active) { border-color: #a0aec0; }
    .lang-toggle-btn.disabled {
      opacity: 0.4; cursor: not-allowed; pointer-events: none;
    }
    
    /* Contrastive Turn Discovery Popup */
    .discovery-popup-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      z-index: 10000; display: flex; align-items: center; justify-content: center;
      animation: fadeInOverlay 0.3s ease;
    }
    @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
    .discovery-popup {
      background: white; border-radius: 16px; padding: 28px; max-width: 520px; width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation: popIn 0.35s ease;
    }
    @keyframes popIn { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .discovery-blue { color: #3182ce; font-weight: 600; }
    .discovery-red { color: #e53e3e; font-weight: 600; }
    
    /* Mirror mode brackets */
    .mirror-bracket { color: #805ad5; font-weight: 600; }
    
    /* Vanish mode toggle button */
    .vanish-mode-btn {
      padding: 6px 12px; border: 2px solid #e0e0e0; border-radius: 20px;
      background: white; color: #555; font-size: 12px; cursor: pointer;
      transition: all 0.2s;
    }
    .vanish-mode-btn:hover { border-color: #a0aec0; }
  `;
  document.head.appendChild(style);
}

// ============================
// GRAMMAR FLOOD HELPER (G3)
// ============================
function applyGrammarFlood(text, grammarFocus) {
  if (!grammarFocus || !text) return text;
  
  // grammarFocus can be a string like "present_continuous" or array
  const focusTerms = Array.isArray(grammarFocus) ? grammarFocus : [grammarFocus];
  
  // Common grammar pattern keywords to highlight
  const patterns = [];
  focusTerms.forEach(focus => {
    const lower = focus.toLowerCase();
    if (lower.includes('continuous') || lower.includes('progressive')) {
      patterns.push(/\b(am|is|are)\b/gi);
      patterns.push(/\b(\w+ing)\b/gi);
    }
    if (lower.includes('plural')) {
      patterns.push(/\b(\w+s)\b/gi);
    }
    if (lower.includes('negative') || lower.includes('negation')) {
      patterns.push(/\b(don't|doesn't|isn't|aren't|not|no)\b/gi);
    }
    if (lower.includes('interrogative') || lower.includes('question')) {
      patterns.push(/\b(do|does|did|is|are|am|was|were|have|has|can|will|would|should)\b/gi);
    }
    if (lower.includes('possessive')) {
      patterns.push(/\b(my|your|his|her|its|our|their|mine|yours)\b/gi);
    }
    if (lower.includes('demonstrative')) {
      patterns.push(/\b(this|that|these|those)\b/gi);
    }
    if (lower.includes('exist') || lower.includes('there')) {
      patterns.push(/\b(there\s+(?:is|are|was|were))\b/gi);
      patterns.push(/\b(have|has)\b/gi);
    }
  });
  
  if (patterns.length === 0) return text;
  
  let result = text;
  patterns.forEach(pattern => {
    result = result.replace(pattern, '<span class="grammar-flood">$1</span>');
  });
  return result;
}

// ============================
// CONTRASTIVE TURN RENDERER
// ============================
function renderContrastiveTurns(contrastiveTurns, container) {
  if (!contrastiveTurns || contrastiveTurns.length === 0) return;
  
  contrastiveTurns.forEach(ct => {
    const ctSection = document.createElement('div');
    ctSection.className = 'contrastive-turn-section';
    ctSection.style.cssText = 'margin-top: 20px; padding: 16px; background: linear-gradient(135deg, #ebf4ff 0%, #fff5f5 100%); border-radius: 12px; border: 2px solid #bee3f8;';
    
    // Header
    const ctHeader = document.createElement('div');
    ctHeader.style.cssText = 'font-weight: 600; color: #2b6cb0; margin-bottom: 12px; font-size: 0.9rem;';
    ctHeader.textContent = `\u{1F50D} ${ct.focus || 'Notice the difference'}`;
    ctSection.appendChild(ctHeader);
    
    // Speaker A (blue / Form A)
    if (ct.speaker_a) {
      const lineA = document.createElement('div');
      lineA.style.cssText = 'padding: 10px 14px; background: #ebf8ff; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid #3182ce;';
      lineA.innerHTML = `<strong style="color:#3182ce;">${escapeHtml(ct.speaker_a.speaker || ct.speaker_a.name || 'A')}:</strong> <span class="discovery-blue">${escapeHtml(ct.speaker_a.text || ct.speaker_a.line || '')}</span>`;
      ctSection.appendChild(lineA);
    }
    
    // Speaker B (red / Form B)
    if (ct.speaker_b) {
      const lineB = document.createElement('div');
      lineB.style.cssText = 'padding: 10px 14px; background: #fff5f5; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #e53e3e;';
      lineB.innerHTML = `<strong style="color:#e53e3e;">${escapeHtml(ct.speaker_b.speaker || ct.speaker_b.name || 'B')}:</strong> <span class="discovery-red">${escapeHtml(ct.speaker_b.text || ct.speaker_b.line || '')}</span>`;
      ctSection.appendChild(lineB);
    }
    
    // "Discover" button
    const discoverBtn = document.createElement('button');
    discoverBtn.textContent = '\u{1F4A1} Discover the Pattern';
    discoverBtn.style.cssText = 'padding: 10px 20px; background: #5a67d8; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; width: 100%;';
    
    discoverBtn.addEventListener('click', () => {
      showDiscoveryPopup(ct);
    });
    
    ctSection.appendChild(discoverBtn);
    container.appendChild(ctSection);
  });
}

function showDiscoveryPopup(ct) {
  const overlay = document.createElement('div');
  overlay.className = 'discovery-popup-overlay';
  
  const popup = document.createElement('div');
  popup.className = 'discovery-popup';
  
  // Title
  const title = document.createElement('h3');
  title.textContent = '\u{1F4A1} Discovery';
  title.style.cssText = 'margin: 0 0 16px 0; color: #2d3748; font-size: 1.3rem;';
  popup.appendChild(title);
  
  // Focus description
  if (ct.focus) {
    const focusEl = document.createElement('p');
    focusEl.textContent = ct.focus;
    focusEl.style.cssText = 'color: #4a5568; margin-bottom: 16px; font-size: 1rem;';
    popup.appendChild(focusEl);
  }
  
  // Highlights with blue/red marker-level precision
  if (ct.highlights && Array.isArray(ct.highlights)) {
    const highlightGrid = document.createElement('div');
    highlightGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;';
    
    ct.highlights.forEach(h => {
      // Blue (Form A)
      const blueBox = document.createElement('div');
      blueBox.style.cssText = 'padding: 12px; background: #ebf8ff; border-radius: 8px; text-align: center; border: 2px solid #bee3f8;';
      blueBox.innerHTML = `<div style="font-size:0.75rem;color:#2b6cb0;margin-bottom:4px;">Form A</div><div class="discovery-blue" style="font-size:1.1rem;">${renderHighlightText(h.blue || h.form_a || '', 'blue')}</div>`;
      
      // Red (Form B)
      const redBox = document.createElement('div');
      redBox.style.cssText = 'padding: 12px; background: #fff5f5; border-radius: 8px; text-align: center; border: 2px solid #fed7d7;';
      redBox.innerHTML = `<div style="font-size:0.75rem;color:#c53030;margin-bottom:4px;">Form B</div><div class="discovery-red" style="font-size:1.1rem;">${renderHighlightText(h.red || h.form_b || '', 'red')}</div>`;
      
      highlightGrid.appendChild(blueBox);
      highlightGrid.appendChild(redBox);
    });
    
    popup.appendChild(highlightGrid);
  }
  
  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Got it! \u2713';
  closeBtn.style.cssText = 'width: 100%; padding: 12px; background: #48bb78; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;';
  closeBtn.addEventListener('click', () => overlay.remove());
  popup.appendChild(closeBtn);
  
  overlay.appendChild(popup);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

/**
 * Render highlight text with marker-level coloring
 * Path 1: Has `marker` (e.g. { text: "has", marker: "s" }) → underline only the marker
 * Path 2: Object with `text` but no `marker` → wrap full text in color class
 * Path 3: Plain string → escape and return
 */
function renderHighlightText(textOrObj, color) {
  const cls = color === 'blue' ? 'discovery-blue' : 'discovery-red';
  if (typeof textOrObj === 'object' && textOrObj !== null && textOrObj.text) {
    const escaped = escapeHtml(textOrObj.text);
    if (textOrObj.marker) {
      // Marker-level precision: underline only the marker substring
      const markerEscaped = escapeHtml(textOrObj.marker);
      return escaped.replace(markerEscaped, `<span class="${cls}" style="font-size:1.3em;text-decoration:underline;">${markerEscaped}</span>`);
    }
    // Full-word coloring: wrap entire text in color class
    return `<span class="${cls}" style="font-weight:600;">${escaped}</span>`;
  }
  return typeof textOrObj === 'string' ? `<span class="${cls}" style="font-weight:600;">${escapeHtml(textOrObj)}</span>` : '';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


// ============================
// MAIN RENDER FUNCTION
// ============================

/**
 * Render Tile 3 - Lesson Dialogue
 * Full pedagogical feature set: EN-UZ toggle, Contrastive Turns,
 * G1 Vanishing Script, G2 Thinking Pressure, G3 Grammar Flood, G4 Mastery State
 * @param {Object} lesson - Lesson data containing lesson_dialogue
 */
export function renderLessonDialogueTile(lesson) {
  // ╔═══════════════════════════════════════════════════════════════╗
  // ║  DIAGNOSTIC: Dialogue Tile Entry Point                       ║
  // ╚═══════════════════════════════════════════════════════════════╝
  console.group('%c[DIAG] renderLessonDialogueTile ENTRY', 'background:#222;color:#ff0;font-weight:bold;padding:2px 8px;');
  console.log('lesson arg received:', typeof lesson);
  console.log('lesson keys:', lesson ? Object.keys(lesson) : 'NULL/UNDEFINED');
  console.log('lesson.lesson_id:', lesson?.lesson_id);
  console.log('lesson.lesson_dialogue:', lesson?.lesson_dialogue ? 'EXISTS' : 'MISSING');
  if (lesson?.lesson_dialogue) {
    const ld = lesson.lesson_dialogue;
    console.log('  .title_en:', ld.title_en);
    console.log('  .title_uz:', ld.title_uz);
    console.log('  .dialogues:', Array.isArray(ld.dialogues) ? `Array(${ld.dialogues.length})` : typeof ld.dialogues);
    ld.dialogues?.forEach((d, i) => {
      console.log(`  dialogue[${i}]: id=${d.id}, context_en="${d.context_en}", turns=${d.turns?.length}`);
      d.turns?.slice(0, 2).forEach((t, j) => {
        console.log(`    turn[${j}]: speaker=${t.speaker}, text="${t.text?.substring(0,50)}", text_uz="${t.text_uz?.substring(0,50)}"`);
      });
    });
  } else {
    console.error('❌ lesson.lesson_dialogue is MISSING — will skip to Pattern!');
    console.log('Full lesson object:', JSON.stringify(lesson, null, 2).substring(0, 2000));
  }
  console.groupEnd();

  injectDialogueCSS();
  
  const tileContainer = getTileContainer();
  clearTileContainer();
  
  const dialogueData = lesson.lesson_dialogue;
  
  // If no dialogue data, skip to next state
  if (!dialogueData || !dialogueData.dialogues || dialogueData.dialogues.length === 0) {
    console.error('%c[DIAG] ❌ SKIPPING TO PATTERN — no dialogue data!', 'background:red;color:white;font-weight:bold;padding:2px 8px;');
    setState(STATES.PATTERN);
    return;
  }

  // Get pedagogical context
  const lessonId = (typeof getCurrentLessonId === 'function' ? getCurrentLessonId() : null) || lesson.lesson_id || '';
  const missionStage = typeof window.getMissionStageForLesson === 'function'
    ? window.getMissionStageForLesson(lessonId) : null;
  const grammarFocus = typeof window.getGrammarFocus === 'function'
    ? window.getGrammarFocus() : '';
  const contrastiveTurns = typeof window.getContrastiveTurnsForLesson === 'function'
    ? window.getContrastiveTurnsForLesson(lessonId) : [];
  const mirrorEnabled = missionStage ? missionStage.mirror_enabled : true;
  const isMasteryStage = missionStage && missionStage.stage === 3 && missionStage.form === 'interrogative';

  // ╔═══════════════════════════════════════════════════════════════╗
  // ║  DIAGNOSTIC: Pedagogical context resolved                    ║
  // ╚═══════════════════════════════════════════════════════════════╝
  console.group('%c[DIAG] PEDAGOGICAL CONTEXT', 'background:#222;color:#f90;font-weight:bold;padding:2px 8px;');
  console.log('lessonId:', lessonId);
  console.log('missionStage:', missionStage);
  console.log('grammarFocus:', grammarFocus);
  console.log('contrastiveTurns:', contrastiveTurns?.length, contrastiveTurns);
  console.log('mirrorEnabled:', mirrorEnabled);
  console.log('isMasteryStage:', isMasteryStage);
  console.log('currentVanishMode:', getVanishMode());
  console.log('window.getMissionStageForLesson available:', typeof window.getMissionStageForLesson === 'function');
  console.log('window.getGrammarFocus available:', typeof window.getGrammarFocus === 'function');
  console.log('window.getContrastiveTurnsForLesson available:', typeof window.getContrastiveTurnsForLesson === 'function');
  console.groupEnd();

  let currentVanishMode = getVanishMode();
  let currentLangState = 'en'; // 'uz' | 'mirror' | 'en'

  const wrapper = document.createElement("div");
  wrapper.className = `lesson-dialogue-tile modern-dialogue dialogue-${currentVanishMode}`;
  wrapper.style.cssText = "padding: 20px; max-width: 900px; margin: 0 auto;";

  // Add progress bar
  const progressBar = createProgressBar();
  if (progressBar) wrapper.appendChild(progressBar);

  // === HEADER SECTION ===
  const headerSection = document.createElement("div");
  headerSection.style.cssText = "text-align: center; margin-bottom: 24px; position: relative;";
  
  const tileNumber = document.createElement("div");
  tileNumber.className = "tile-title";
  tileNumber.textContent = "Tile 3 \u2014 Dialogue";
  tileNumber.style.cssText = "font-size: 0.9rem; color: #999; margin-bottom: 12px; font-weight: 500;";
  headerSection.appendChild(tileNumber);
  
  // Mission stage badge
  if (missionStage) {
    const stageBadge = document.createElement("div");
    const stageEmoji = missionStage.stage === 1 ? '\u2705' : missionStage.stage === 2 ? '\u274C' : '\u2753';
    stageBadge.textContent = `${stageEmoji} Stage ${missionStage.stage}: ${missionStage.form.charAt(0).toUpperCase() + missionStage.form.slice(1)}`;
    stageBadge.style.cssText = "display: inline-block; padding: 4px 14px; background: #edf2f7; border-radius: 12px; font-size: 0.8rem; color: #4a5568; margin-bottom: 10px; font-weight: 500;";
    headerSection.appendChild(stageBadge);
  }
  
  // Animated icons
  const iconContainer = document.createElement("div");
  iconContainer.style.cssText = "display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;";
  iconContainer.innerHTML = `<div style="font-size: 2.5rem;">\u{1F3A7}</div><div style="font-size: 1.8rem; opacity: 0.7;">\u{1F4AC}</div>`;
  headerSection.appendChild(iconContainer);

  // Title
  const title = document.createElement("h2");
  title.className = "tile-title";
  title.textContent = dialogueData.title_en || "Dialogue Practice";
  title.style.cssText = "color: #5a67d8; font-size: 1.8rem; font-weight: 700; margin: 0;";
  headerSection.appendChild(title);

  if (dialogueData.title_uz) {
    const subtitleUz = document.createElement("div");
    subtitleUz.className = "tile-subtitle tl-uz";
    subtitleUz.textContent = dialogueData.title_uz;
    subtitleUz.style.cssText = "color: #7f8c8d; margin-top: 8px; font-size: 1rem;";
    headerSection.appendChild(subtitleUz);
  }
  
  wrapper.appendChild(headerSection);

  // === TOOLBAR: Mode Selector ===
  const toolbar = document.createElement("div");
  toolbar.style.cssText = "display: flex; gap: 8px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap; align-items: center;";

  const modes = [
    { id: "listen", icon: "\u{1F442}", label: "Tinglash", labelEn: "Listen First" },
    { id: "read", icon: "\u{1F4D6}", label: "O\u2018qish", labelEn: "Read Along" },
    { id: "practice", icon: "\u{1F3A4}", label: "Amaliyot", labelEn: "Practice" }
  ];
  let currentMode = "listen";

  const modeBtnFragment = document.createDocumentFragment();
  modes.forEach(mode => {
    const btn = document.createElement("button");
    btn.className = "mode-btn tl-uz";
    btn.dataset.mode = mode.id;
    btn.innerHTML = `<span style="font-size: 1.3rem;">${mode.icon}</span><span>${mode.label}</span>`;
    btn.dataset.translation = mode.labelEn;
    btn.style.cssText = `display: flex; align-items: center; gap: 6px; padding: 10px 18px; border: 2px solid ${mode.id === currentMode ? '#5a67d8' : '#e0e0e0'}; border-radius: 25px; background: ${mode.id === currentMode ? '#5a67d8' : 'white'}; color: ${mode.id === currentMode ? 'white' : '#555'}; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease;`;
    modeBtnFragment.appendChild(btn);
  });
  toolbar.appendChild(modeBtnFragment);
  
  toolbar.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest(".mode-btn");
    if (!(btn instanceof HTMLButtonElement)) return;
    const modeId = btn.dataset.mode;
    if (!modeId || modeId === currentMode) return;
    currentMode = modeId;
    toolbar.querySelectorAll(".mode-btn").forEach(b => {
      if (!(b instanceof HTMLButtonElement)) return;
      const isActive = b.dataset.mode === currentMode;
      b.style.border = `2px solid ${isActive ? '#5a67d8' : '#e0e0e0'}`;
      b.style.background = isActive ? '#5a67d8' : 'white';
      b.style.color = isActive ? 'white' : '#555';
    });
    updateDialogueMode(currentMode);
  });
  
  wrapper.appendChild(toolbar);

  // === EN-UZ Toggle (RULE E11) — using shared mirror-toggle utility ===
  const langToggle = createGlobalMirrorToggle({
    initialState: currentLangState,
    mirrorEnabled,
    onChange: (newState) => {
      currentLangState = newState;
      updateLanguageDisplay();
    }
  });
  
  wrapper.appendChild(langToggle);

  // === G1: Vanishing Script Toggle ===
  const vanishToggle = document.createElement("div");
  vanishToggle.style.cssText = "display: flex; gap: 6px; justify-content: center; margin-bottom: 20px;";
  
  const vanishLabels = { full: '\u{1F441}\u{FE0F} Full', faded: '\u{1F32B}\u{FE0F} Faded', blind: '\u{1F648} Blind' };
  VANISH_MODES.forEach(mode => {
    const btn = document.createElement('button');
    btn.className = `vanish-mode-btn ${mode === currentVanishMode ? 'active' : ''}`;
    btn.textContent = vanishLabels[mode];
    btn.dataset.vanish = mode;
    btn.style.cssText = `padding: 6px 12px; border: 2px solid ${mode === currentVanishMode ? '#5a67d8' : '#e0e0e0'}; border-radius: 20px; background: ${mode === currentVanishMode ? '#edf2f7' : 'white'}; color: #555; font-size: 12px; cursor: pointer; transition: all 0.2s;`;
    
    btn.addEventListener('click', () => {
      currentVanishMode = mode;
      setVanishMode(mode);
      wrapper.className = `lesson-dialogue-tile modern-dialogue dialogue-${mode}`;
      vanishToggle.querySelectorAll('.vanish-mode-btn').forEach(b => {
        if (b instanceof HTMLElement) {
          const isActive = b.dataset.vanish === mode;
          b.style.border = `2px solid ${isActive ? '#5a67d8' : '#e0e0e0'}`;
          b.style.background = isActive ? '#edf2f7' : 'white';
        }
      });
    });
    
    vanishToggle.appendChild(btn);
  });
  
  wrapper.appendChild(vanishToggle);

  // Instruction
  const instruction = document.createElement("div");
  instruction.className = "dialogue-instruction tl-uz";
  instruction.id = "dialogue-instruction";
  instruction.textContent = "\u{1F4AC} Suhbatni tinglang va grammatikaga e\u2018tibor bering:";
  instruction.dataset.translation = "Listen to the dialogue and pay attention to the grammar:";
  instruction.style.cssText = "background: #e8f4f8; padding: 14px 20px; border-radius: 12px; margin-bottom: 24px; color: #2980b9; font-weight: 500; text-align: center; border-left: 4px solid #5a67d8;";
  wrapper.appendChild(instruction);

  function updateDialogueMode(mode) {
    const instr = document.getElementById("dialogue-instruction");
    if (!instr) return;
    if (mode === "listen") {
      instr.textContent = "\u{1F442} Avval suhbatni tinglang, keyin gapirishga o\u2018ting:";
      instr.dataset.translation = "Listen first, then try speaking:";
    } else if (mode === "read") {
      instr.textContent = "\u{1F4D6} Suhbatni o\u2018qing va grammatikaga e\u2018tibor bering:";
      instr.dataset.translation = "Read along and notice the grammar:";
    } else {
      instr.textContent = "\u{1F3A4} Dialogdagi gaplarni takrorlang:";
      instr.dataset.translation = "Repeat the sentences from the dialogue:";
    }
  }

  // Track all turn elements for language updates
  const allTurnElements = [];

  // Helper function to play dialogue audio
  async function playDialogueAudio(audioId, fallbackText) {
    const CURRENT_UNIT_ID = typeof getCurrentUnitId === 'function' ? getCurrentUnitId() : 'U01';
    return new Promise((resolve) => {
      // Use absolute path for reliability
      const unitFolder = 'unit_' + CURRENT_UNIT_ID.toLowerCase().slice(1);
      const audioPath = `/audio_assets/${unitFolder}/lesson_dialogues/${audioId}.mp3`;
      console.log('Playing dialogue audio (helper):', audioPath);
      
      const audio = new Audio(audioPath);
      
      audio.addEventListener("ended", resolve);
      audio.addEventListener("error", (e) => {
        console.warn('Audio load failed:', audioPath, e);
        // Fallback: try relative path just in case
        const altPath = `./audio_assets/${unitFolder}/lesson_dialogues/${audioId}.mp3`;
        console.log('Trying fallback path:', altPath);
        
        const altAudio = new Audio(altPath);
        altAudio.addEventListener("ended", resolve);
        altAudio.addEventListener("error", () => {
          console.error('All audio paths failed. Using TTS fallback.');
          if (window.playExerciseAudio) {
            window.playExerciseAudio(fallbackText, "neutral_female_slow");
          }
          setTimeout(resolve, 1500);
        });
        altAudio.play().catch(() => setTimeout(resolve, 1500));
      });
      
      audio.play().catch((e) => {
        console.warn('Audio play failed:', e);
        if (window.playExerciseAudio) {
          window.playExerciseAudio(fallbackText, "neutral_female_slow");
        }
        setTimeout(resolve, 1500);
      });
    });
  }

  // === Language display update function (uses LANG_STATES constants) ===
  function updateLanguageDisplay() {
    allTurnElements.forEach(({ textEnEl, textUzEl, mirrorEl }) => {
      textEnEl.style.display = currentLangState === LANG_STATES.EN ? '' : 'none';
      textUzEl.style.display = currentLangState === LANG_STATES.UZ ? '' : 'none';
      mirrorEl.style.display = currentLangState === LANG_STATES.MIRROR ? '' : 'none';
    });
  }

  // === RENDER DIALOGUES ===
  dialogueData.dialogues.forEach((dialogue, dialogueIdx) => {
    const dialogueSection = document.createElement("div");
    dialogueSection.className = "dialogue-section";
    dialogueSection.style.cssText = "margin-bottom: 30px;";

    // Context
    if (dialogue.context_uz || dialogue.context_en) {
      const context = document.createElement("div");
      context.className = "dialogue-context tl-uz";
      context.innerHTML = `<span style="font-size: 1.2rem;">\u{1F4CD}</span> ${escapeHtml(dialogue.context_uz || dialogue.context_en)}`;
      if (dialogue.context_en) context.dataset.translation = dialogue.context_en;
      context.style.cssText = "background: #f8f9fa; padding: 14px 18px; border-radius: 12px; margin-bottom: 20px; font-style: italic; color: #555; border-left: 4px solid #5a67d8; display: flex; align-items: center; gap: 10px;";
      dialogueSection.appendChild(context);
    }

    // Chat dialogue box
    const dialogueBox = document.createElement("div");
    dialogueBox.className = "dialogue-box chat-style";
    dialogueBox.style.cssText = "background: #fafbfc; border-radius: 20px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: relative; overflow: hidden; padding-top: 60px;";
    
    // ═══ LUXURIOUS Play All Button ═══
    const playAllBtn = document.createElement("button");
    playAllBtn.className = "dlg-play-all tl-uz";
    playAllBtn.innerHTML = `<span class="dlg-play-all-icon">▶</span><span class="dlg-play-all-waves"><span></span><span></span><span></span></span> <span data-label>Play All</span>`;
    playAllBtn.dataset.translation = "Play All";
    
    let isPlayingAll = false;
    playAllBtn.addEventListener("click", async () => {
      if (isPlayingAll) {
        isPlayingAll = false;
        playAllBtn.classList.remove('is-playing');
        playAllBtn.querySelector('[data-label]').textContent = 'Play All';
        dialogueBox.querySelectorAll(".dialogue-turn").forEach(t => {
          if (t instanceof HTMLElement) { t.classList.remove('dlg-active-turn'); }
        });
        return;
      }
      
      isPlayingAll = true;
      playAllBtn.classList.add('is-playing');
      playAllBtn.querySelector('[data-label]').textContent = 'Stop';
      
      const turns = dialogue.turns || [];
      for (let i = 0; i < turns.length && isPlayingAll; i++) {
        const turn = turns[i];
        dialogueBox.querySelectorAll(".dialogue-turn").forEach((t, idx) => {
          if (t instanceof HTMLElement) {
            if (idx === i) { t.classList.add('dlg-active-turn'); }
            else { t.classList.remove('dlg-active-turn'); }
          }
        });
        
        if (turn.audio_id) await playDialogueAudio(turn.audio_id, turn.text || turn.text_en || "");
        if (isPlayingAll && i < turns.length - 1) await new Promise(r => setTimeout(r, 800));
      }
      
      isPlayingAll = false;
      playAllBtn.classList.remove('is-playing');
      playAllBtn.querySelector('[data-label]').textContent = 'Play All';
      dialogueBox.querySelectorAll(".dialogue-turn").forEach(t => {
        if (t instanceof HTMLElement) { t.classList.remove('dlg-active-turn'); }
      });
    });
    
    dialogueBox.appendChild(playAllBtn);

    // === RENDER TURNS ===
    if (dialogue.turns && Array.isArray(dialogue.turns)) {
      dialogue.turns.forEach((turn, idx) => {
        const isLeft = idx % 2 === 0;
        const dialogueId = dialogue.id || `${lessonId}_D${String(dialogueIdx + 1).padStart(2, '0')}`;
        const mastered = isLineMastered(dialogueId, idx);
        
        const turnEl = document.createElement("div");
        turnEl.className = `dialogue-turn chat-bubble ${mastered ? 'mastered' : ''}`;
        turnEl.style.cssText = `
          margin-bottom: 16px; padding: 16px 20px; 
          background: ${isLeft ? '#5a67d8' : '#11998e'};
          border-radius: ${isLeft ? '20px 20px 20px 4px' : '20px 20px 4px 20px'};
          max-width: 85%; ${isLeft ? 'margin-right: auto;' : 'margin-left: auto;'}
          box-shadow: 0 2px 12px ${isLeft ? 'rgba(90,103,216,0.25)' : 'rgba(17,153,142,0.25)'};
          transition: all 0.3s ease; position: relative;
        `;

        // Speaker row
        const speakerRow = document.createElement("div");
        speakerRow.style.cssText = "display: flex; align-items: center; gap: 8px; margin-bottom: 8px;";
        
        const avatar = document.createElement("div");
        avatar.textContent = isLeft ? "\u{1F468}" : "\u{1F469}";
        avatar.style.cssText = "font-size: 1.3rem; background: rgba(255,255,255,0.2); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;";
        
        const speakerName = document.createElement("strong");
        speakerName.textContent = turn.speaker;
        speakerName.style.cssText = "color: rgba(255,255,255,0.9); font-size: 0.85rem; flex-grow: 1;";
        
        // G4: Mastery badge
        const masteryBadge = document.createElement("span");
        masteryBadge.className = "mastery-badge";
        masteryBadge.textContent = "\u2705";
        if (mastered) masteryBadge.style.display = "inline-block";
        
        speakerRow.appendChild(avatar);
        speakerRow.appendChild(speakerName);
        speakerRow.appendChild(masteryBadge);
        
        // ═══ LUXURIOUS Per-Line Audio Button ═══
        if (turn.audio_id) {
          const audioBtn = document.createElement("button");
          audioBtn.className = "dlg-audio-btn";
          audioBtn.title = "Listen";
          audioBtn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.5v7a4.49 4.49 0 0 0 2.5-3.5zM14 3.23v2.06a7.007 7.007 0 0 1 0 13.42v2.06A9.013 9.013 0 0 0 14 3.23z"/></svg><span class="dlg-audio-waves"><span></span><span></span><span></span><span></span><span></span></span>`;

          const CURRENT_UNIT_ID = getCurrentUnitId();
          const turnTextForAudio = turn.text || turn.text_en || '';
          
          audioBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            
            // If this button is already playing, toggle pause
            if (audioBtn.classList.contains('is-playing')) {
              if (window.dialogueAudioPlayer) window.dialogueAudioPlayer.toggle();
              audioBtn.classList.remove('is-playing');
              return;
            }
            
            // Reset all other per-line buttons in this dialogue
            dialogueBox.querySelectorAll('.dlg-audio-btn').forEach(b => b.classList.remove('is-playing', 'is-loading'));
            
            audioBtn.classList.add('is-loading');
            const CURRENT_UNIT_ID = typeof getCurrentUnitId === 'function' ? getCurrentUnitId() : 'U01';
            const unitFolder = 'unit_' + CURRENT_UNIT_ID.toLowerCase().slice(1);
            // Use absolute path /audio_assets/
            const audioPath = `/audio_assets/${unitFolder}/lesson_dialogues/${turn.audio_id}.mp3`;
            console.log('Playing button audio:', audioPath);
            
            if (window.dialogueAudioPlayer) {
              window.dialogueAudioPlayer.play(audioPath, audioBtn).then(() => {
                audioBtn.classList.remove('is-playing');
              }).catch((e) => {
                console.error('Button audio failed:', e);
                audioBtn.classList.remove('is-loading');
                // Fallback to TTS?
                if (window.playExerciseAudio) window.playExerciseAudio(turnTextForAudio, "neutral_female_slow");
              });
            } else {
              // Fallback to simple audio if player not found
              const audio = new Audio(audioPath);
              audio.onended = () => { audioBtn.classList.remove('is-playing', 'is-loading'); };
              audio.play().catch(e => {
                console.error('Simple audio failed:', e);
                audioBtn.classList.remove('is-playing', 'is-loading');
              });
              audioBtn.classList.add('is-playing');
              audioBtn.classList.remove('is-loading');
            }
          });
          
          speakerRow.appendChild(audioBtn);
        }
        
        turnEl.appendChild(speakerRow);

        // === TEXT LAYERS (EN / UZ / MIRROR) ===
        const turnTextEn = turn.text || turn.text_en || '';
        const turnTextUz = turn.text_uz || '';
        
        // English text (with G3 Grammar Flood)
        const textEnEl = document.createElement("div");
        textEnEl.className = "turn-text-en";
        textEnEl.style.cssText = "color: white; font-size: 1.05rem; line-height: 1.5; margin-bottom: 6px;";
        
        if (turn.text_chunks && Array.isArray(turn.text_chunks)) {
          // Chunk-level progressive L1→L2 display
          turn.text_chunks.forEach((chunk, ci) => {
            // Generate mastery key for this chunk (dialogue_id + line + chunk index)
            const chunkMasteryKey = turn.mastery_key ? `${turn.mastery_key}_c${ci}` : null;
            
            // Use progressive L1→L2 rendering
            const chunkSpan = renderChunk(chunk, {
              masteryKey: chunkMasteryKey,
              hoverable: true
            });
            
            // Add dialogue-specific styling
            chunkSpan.classList.add('dialogue-chunk-hoverable');
            textEnEl.appendChild(chunkSpan);
            if (ci < turn.text_chunks.length - 1) textEnEl.appendChild(document.createTextNode(" "));
          });
        } else {
          // Apply G3 grammar flood highlighting
          const highlighted = grammarFocus ? applyGrammarFlood(turnTextEn, grammarFocus) : highlightGrammarTokens(turnTextEn);
          textEnEl.innerHTML = highlighted;
        }
        
        // Style grammar tokens for dark background
        textEnEl.querySelectorAll('.hl-continuous, .hl-indicator, .grammar-flood').forEach(span => {
          if (span instanceof HTMLElement) {
            span.style.cssText += "; background: rgba(255,255,255,0.25); padding: 2px 6px; border-radius: 4px; font-weight: 600;";
          }
        });
        
        turnEl.appendChild(textEnEl);
        
        // Uzbek text  
        const textUzEl = document.createElement("div");
        textUzEl.className = "turn-text-uz tl-uz";
        textUzEl.textContent = turnTextUz;
        textUzEl.style.cssText = "color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.4; font-style: italic; display: none;";
        turnEl.appendChild(textUzEl);
        
        // Mirror text (Uzbek words in English SVO order) — using shared buildMirrorHtml
        const mirrorEl = document.createElement("div");
        mirrorEl.className = "turn-text-mirror";
        mirrorEl.innerHTML = buildMirrorHtml({
          target: turn.target,
          syntax_scaffold: null,
          text_uz: turnTextUz,
          text_en: turnTextEn
        });
        mirrorEl.style.cssText = "color: rgba(255,255,255,0.95); font-size: 1rem; line-height: 1.5; display: none;";
        turnEl.appendChild(mirrorEl);
        
        // Track for language state updates
        allTurnElements.push({ textEnEl, textUzEl, mirrorEl, turn, turnEl, dialogueId, lineIndex: idx });

        // Grammar focus tags
        if (turn.grammar_focus && turn.grammar_focus.length > 0) {
          const grammarTags = document.createElement("div");
          grammarTags.style.cssText = "display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;";
          turn.grammar_focus.forEach(focus => {
            const tag = document.createElement("span");
            tag.textContent = "\u{1F4D0} " + focus;
            tag.style.cssText = "padding: 3px 10px; background: rgba(255,255,255,0.2); border-radius: 12px; font-size: 0.75rem; color: rgba(255,255,255,0.9);";
            grammarTags.appendChild(tag);
          });
          turnEl.appendChild(grammarTags);
        }

        // G4: Click-to-master (if not already mastered, mark mastery on practice mode click)
        if (!mastered && turn.mastery_key) {
          turnEl.style.cursor = 'pointer';
          turnEl.addEventListener('click', () => {
            if (currentMode !== 'practice') return;
            setLineMastered(dialogueId, idx);
            
            // Also mark chunks as mastered for progressive L1→L2 unlock
            if (Array.isArray(turn.text_chunks)) {
              turn.text_chunks.forEach((_, ci) => {
                const chunkKey = `${turn.mastery_key}_c${ci}`;
                markAsMastered(chunkKey);
              });
            }
            // Mark the line itself
            if (turn.mastery_key) {
              markAsMastered(turn.mastery_key);
            }
            
            turnEl.classList.add('mastered');
            masteryBadge.style.display = 'inline-block';
            textUzEl.style.display = 'none';
            turnEl.style.cursor = 'default';
            
            // Update chunk display to show mastered state
            turnEl.querySelectorAll('.dialogue-chunk').forEach(chunkEl => {
              chunkEl.classList.add('lang-mode-l2');
              chunkEl.classList.remove('lang-mode-hybrid', 'lang-mode-l1');
              chunkEl.classList.add('chunk-just-unlocked');
            });
          });
        }

        dialogueBox.appendChild(turnEl);
      });
    }

    dialogueSection.appendChild(dialogueBox);

    // === CHUNK-LEVEL HOVER TRANSLATION SYSTEM ===
    let chunkTooltip = null;
    function getOrCreateChunkTooltip() {
      if (!chunkTooltip) {
        chunkTooltip = document.createElement("div");
        chunkTooltip.className = "chunk-translation-tooltip";
        chunkTooltip.style.cssText = "position: fixed; max-width: 280px; background: #16a085; color: white; padding: 10px 14px; border-radius: 8px; font-size: 0.95rem; line-height: 1.4; z-index: 10001; pointer-events: none; box-shadow: 0 8px 20px rgba(22,160,133,0.4); border: 2px solid rgba(255,255,255,0.3); display: none; font-weight: 500;";
        document.body.appendChild(chunkTooltip);
      }
      return chunkTooltip;
    }
    
    dialogueBox.querySelectorAll('.dialogue-chunk-hoverable').forEach(span => {
      if (!(span instanceof HTMLElement)) return;
      span.addEventListener("mouseenter", () => {
        const uzbekText = span.dataset.uzbek;
        if (!uzbekText) return;
        const tooltip = getOrCreateChunkTooltip();
        tooltip.textContent = uzbekText;
        tooltip.style.display = "block";
        span.style.background = "rgba(255,255,255,0.15)";
        span.style.borderRadius = "4px";
        span.style.padding = "2px 4px";
        const rect = span.getBoundingClientRect();
        tooltip.style.left = rect.left + "px";
        tooltip.style.top = (rect.bottom + 8) + "px";
      });
      span.addEventListener("mouseleave", () => {
        const tooltip = getOrCreateChunkTooltip();
        tooltip.style.display = "none";
        span.style.background = "transparent";
        span.style.padding = "2px 0";
      });
      let _tooltipRaf = 0;
      span.addEventListener("mousemove", /** @param {MouseEvent} e */ (e) => {
        if (_tooltipRaf) return;
        _tooltipRaf = requestAnimationFrame(() => {
          _tooltipRaf = 0;
          const tooltip = getOrCreateChunkTooltip();
          if (tooltip.style.display === "block") {
            tooltip.style.left = e.clientX + "px";
            tooltip.style.top = (e.clientY + 20) + "px";
          }
        });
      });
    });

    // === CONTRASTIVE TURNS (after each dialogue) — MANDATORY ===
    const dialogueId = dialogue.id || `${lessonId}_D${String(dialogueIdx + 1).padStart(2, '0')}`;
    const dialogueContrastive = contrastiveTurns.filter(ct => {
      return ct.dialogue_id === dialogueId || (!ct.dialogue_id && dialogueIdx === 0);
    });
    
    if (dialogueContrastive.length > 0) {
      renderContrastiveTurns(dialogueContrastive, dialogueSection);
    }

    // Uzbek translation section (collapsible)
    const uzSection = document.createElement("div");
    uzSection.className = "dialogue-uzbek-section";
    uzSection.style.cssText = "margin-top: 16px;";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "\u{1F441}\u{FE0F} O\u2018zbek tarjimasini ko\u2018rish";
    toggleBtn.dataset.translation = "Show Uzbek translation";
    toggleBtn.className = "toggle-translation-btn tl-uz";
    toggleBtn.style.cssText = "padding: 10px 16px; background: #16a085; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; transition: all 0.2s;";

    const uzContent = document.createElement("div");
    uzContent.className = "uzbek-translation-content";
    uzContent.style.cssText = "display: none; margin-top: 12px; background: #e8f8f5; border: 2px solid #16a085; border-radius: 8px; padding: 16px;";

    if (dialogue.turns && Array.isArray(dialogue.turns)) {
      dialogue.turns.forEach((turn, idx) => {
        if (turn.text_uz) {
          const turnUz = document.createElement("div");
          turnUz.style.cssText = `margin-bottom: 8px; padding: 8px 12px; background: ${idx % 2 === 0 ? "#d5f4e6" : "#fdecea"}; border-radius: 6px;`;
          const speakerUz = document.createElement("strong");
          speakerUz.textContent = turn.speaker + ": ";
          speakerUz.style.color = idx % 2 === 0 ? "#16a085" : "#e74c3c";
          const textUz = document.createElement("span");
          textUz.textContent = turn.text_uz;
          textUz.classList.add("tl-uz");
          turnUz.appendChild(speakerUz);
          turnUz.appendChild(textUz);
          uzContent.appendChild(turnUz);
        }
      });
    }

    toggleBtn.addEventListener("click", () => {
      const isHidden = uzContent.style.display === "none";
      uzContent.style.display = isHidden ? "block" : "none";
      toggleBtn.textContent = isHidden ? "\u{1F648} Tarjimani yashirish" : "\u{1F441}\u{FE0F} O\u2018zbek tarjimasini ko\u2018rish";
    });

    uzSection.appendChild(toggleBtn);
    uzSection.appendChild(uzContent);
    dialogueSection.appendChild(uzSection);

    // Comprehension check
    if (dialogue.comprehension_check) {
      const checkSection = document.createElement("div");
      checkSection.className = "comprehension-check";
      checkSection.style.cssText = "margin-top: 20px; padding: 16px; background: #fff3e0; border-radius: 8px; border-left: 4px solid #ff9800;";

      const checkTitle = document.createElement("div");
      checkTitle.textContent = "\u2753 " + (dialogue.comprehension_check.question_uz || dialogue.comprehension_check.question_en);
      checkTitle.classList.add("tl-uz");
      if (dialogue.comprehension_check.question_en) checkTitle.dataset.translation = dialogue.comprehension_check.question_en;
      checkTitle.style.cssText = "font-weight: 600; margin-bottom: 12px; color: #e65100;";
      checkSection.appendChild(checkTitle);

      const optionsContainer = document.createElement("div");
      optionsContainer.style.cssText = "display: flex; flex-direction: column; gap: 8px;";

      dialogue.comprehension_check.options.forEach((option, optIdx) => {
        const optBtn = document.createElement("button");
        optBtn.textContent = option;
        optBtn.style.cssText = "padding: 10px 16px; background: white; border: 2px solid #ffb74d; border-radius: 6px; cursor: pointer; text-align: left; font-size: 14px; transition: all 0.2s;";
        
        optBtn.addEventListener("click", () => {
          optionsContainer.querySelectorAll("button").forEach(b => {
            if (b instanceof HTMLButtonElement) { b.disabled = true; b.style.cursor = "default"; }
          });
          if (optIdx === dialogue.comprehension_check.correct_index) {
            optBtn.style.background = "#c8e6c9";
            optBtn.style.borderColor = "#4caf50";
            optBtn.textContent = "\u2705 " + option;
          } else {
            optBtn.style.background = "#ffcdd2";
            optBtn.style.borderColor = "#f44336";
            optBtn.textContent = "\u274C " + option;
            const correctBtn = optionsContainer.querySelectorAll("button")[dialogue.comprehension_check.correct_index];
            if (correctBtn instanceof HTMLButtonElement) {
              correctBtn.style.background = "#c8e6c9";
              correctBtn.style.borderColor = "#4caf50";
              correctBtn.textContent = "\u2705 " + dialogue.comprehension_check.options[dialogue.comprehension_check.correct_index];
            }
          }
        });
        optionsContainer.appendChild(optBtn);
      });

      checkSection.appendChild(optionsContainer);
      dialogueSection.appendChild(checkSection);
    }

    // Vocabulary highlight
    if (dialogue.vocabulary_highlight && dialogue.vocabulary_highlight.length > 0) {
      const vocabHighlight = document.createElement("div");
      vocabHighlight.style.cssText = "margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 8px;";
      const vocabTitle = document.createElement("div");
      vocabTitle.textContent = "\u{1F4DA} Key Vocabulary:";
      vocabTitle.style.cssText = "font-weight: 600; color: #1565c0; margin-bottom: 8px;";
      vocabHighlight.appendChild(vocabTitle);
      
      const vocabTags = document.createElement("div");
      vocabTags.style.cssText = "display: flex; flex-wrap: wrap; gap: 8px;";
      dialogue.vocabulary_highlight.forEach(word => {
        const tag = document.createElement("span");
        tag.textContent = word;
        tag.style.cssText = "padding: 4px 10px; background: #bbdefb; border-radius: 12px; font-size: 13px; color: #0d47a1;";
        vocabTags.appendChild(tag);
      });
      vocabHighlight.appendChild(vocabTags);
      dialogueSection.appendChild(vocabHighlight);
    }

    wrapper.appendChild(dialogueSection);

    // Separator
    if (dialogueIdx < dialogueData.dialogues.length - 1) {
      const separator = document.createElement("hr");
      separator.style.cssText = "margin: 30px 0; border: none; border-top: 2px dashed #bdc3c7;";
      wrapper.appendChild(separator);
    }
  });

  // ═══════════════════════════════════════════════════════════════
  // G2: LINGUISTIC PRESSURE (Dialogue X.1 — Applies to ALL stages)
  // ═══════════════════════════════════════════════════════════════
  // Per Master Document: Every dialogue gets a Linguistic Pressure pass
  // (Dialogue 1.1, 2.1, 3.1) — text vanishes 800ms after audio,
  // 2s response deadline forces proceduralization.
  {
    const tpSection = document.createElement("div");
    tpSection.className = "tp-section";
    tpSection.style.cssText = `
      margin-top: 28px; padding: 20px 24px; border-radius: 16px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      box-shadow: 0 8px 32px rgba(15, 52, 96, 0.4), inset 0 1px 0 rgba(255,255,255,0.05);
      position: relative; overflow: hidden;
    `;

    // Subtle animated border glow
    const glowBorder = document.createElement("div");
    glowBorder.style.cssText = `
      position: absolute; inset: 0; border-radius: 16px;
      border: 2px solid transparent;
      background: linear-gradient(135deg, rgba(229,62,62,0.4), rgba(237,137,54,0.4), rgba(229,62,62,0.4)) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude;
      pointer-events: none;
    `;
    tpSection.appendChild(glowBorder);

    // Header with icon
    const tpHeader = document.createElement("div");
    tpHeader.style.cssText = "display: flex; align-items: center; gap: 12px; margin-bottom: 14px; position: relative; z-index: 1;";
    
    const tpIcon = document.createElement("div");
    tpIcon.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f6ad55" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    tpIcon.style.cssText = "width: 44px; height: 44px; background: rgba(246,173,85,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;";

    const tpTitleBlock = document.createElement("div");
    const tpLabel = document.createElement("div");
    tpLabel.textContent = "LINGUISTIC PRESSURE";
    tpLabel.style.cssText = "font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #f6ad55; margin-bottom: 2px;";
    const tpTitle = document.createElement("div");
    tpTitle.textContent = isMasteryStage ? "Mastery Challenge — Final Pass" : "Dialogue Replay — Pressure Mode";
    tpTitle.style.cssText = "font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.95);";
    tpTitleBlock.appendChild(tpLabel);
    tpTitleBlock.appendChild(tpTitle);
    tpHeader.appendChild(tpIcon);
    tpHeader.appendChild(tpTitleBlock);
    tpSection.appendChild(tpHeader);

    // Description
    const tpDesc = document.createElement("p");
    tpDesc.style.cssText = "color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.6; margin: 0 0 18px 0; position: relative; z-index: 1;";
    tpDesc.innerHTML = `The same dialogue replays with audio. Text <strong style="color:#f6ad55">vanishes after 800ms</strong> — you have <strong style="color:#fc8181">2 seconds</strong> to produce each line from memory.`;
    tpSection.appendChild(tpDesc);

    // Stats pills
    const tpStats = document.createElement("div");
    tpStats.style.cssText = "display: flex; gap: 10px; margin-bottom: 18px; position: relative; z-index: 1;";
    
    const pill1 = document.createElement("div");
    pill1.innerHTML = `<span style="color:rgba(255,255,255,0.4);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;">Vanish</span><br><span style="color:#f6ad55;font-weight:700;font-size:15px;">800ms</span>`;
    pill1.style.cssText = "flex:1; text-align:center; padding:10px; background:rgba(255,255,255,0.05); border-radius:10px; border:1px solid rgba(255,255,255,0.08);";
    
    const pill2 = document.createElement("div");
    pill2.innerHTML = `<span style="color:rgba(255,255,255,0.4);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;">Deadline</span><br><span style="color:#fc8181;font-weight:700;font-size:15px;">2.0s</span>`;
    pill2.style.cssText = "flex:1; text-align:center; padding:10px; background:rgba(255,255,255,0.05); border-radius:10px; border:1px solid rgba(255,255,255,0.08);";
    
    const pill3 = document.createElement("div");
    const turnCount = allTurnElements.length;
    pill3.innerHTML = `<span style="color:rgba(255,255,255,0.4);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;">Lines</span><br><span style="color:#90cdf4;font-weight:700;font-size:15px;">${turnCount}</span>`;
    pill3.style.cssText = "flex:1; text-align:center; padding:10px; background:rgba(255,255,255,0.05); border-radius:10px; border:1px solid rgba(255,255,255,0.08);";
    
    tpStats.appendChild(pill1);
    tpStats.appendChild(pill2);
    tpStats.appendChild(pill3);
    tpSection.appendChild(tpStats);
    
    // Start button
    const startTPBtn = document.createElement("button");
    startTPBtn.className = "tp-start-btn";
    startTPBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M8 5v14l11-7z"/></svg> Start Pressure Mode`;
    startTPBtn.style.cssText = `
      width: 100%; padding: 14px 24px;
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
      color: white; border: none; border-radius: 12px;
      font-size: 15px; font-weight: 700; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(229, 62, 62, 0.4);
      position: relative; z-index: 1; letter-spacing: 0.3px;
    `;
    
    startTPBtn.addEventListener("mouseenter", () => {
      startTPBtn.style.transform = "translateY(-2px)";
      startTPBtn.style.boxShadow = "0 8px 25px rgba(229, 62, 62, 0.5)";
    });
    startTPBtn.addEventListener("mouseleave", () => {
      startTPBtn.style.transform = "translateY(0)";
      startTPBtn.style.boxShadow = "0 4px 15px rgba(229, 62, 62, 0.4)";
    });
    
    startTPBtn.addEventListener("click", () => {
      // Scroll to top of dialogue
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => startThinkingPressure(allTurnElements), 600);
    });
    
    tpSection.appendChild(startTPBtn);
    wrapper.appendChild(tpSection);
  }

  // === NAVIGATION BUTTONS ===
  const navContainer = document.createElement("div");
  navContainer.style.cssText = "display: flex; gap: 12px; margin-top: 24px; justify-content: center; flex-wrap: wrap;";

  const backBtn = createBackButton();
  if (backBtn) {
    backBtn.style.flex = "1";
    backBtn.style.maxWidth = "150px";
    navContainer.appendChild(backBtn);
  }

  const nextBtn = createButton("Next: Pattern \u2192", () => transitionToTile(STATES.PATTERN));
  nextBtn.style.cssText = "flex: 1; max-width: 200px; padding: 14px 24px; background: #27ae60; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(39,174,96,0.3);";
  navContainer.appendChild(nextBtn);

  wrapper.appendChild(navContainer);
  tileContainer.appendChild(wrapper);
  
  // Apply initial language state
  updateLanguageDisplay();
  
  // Process vocab gap words
  if (window.vocabGapSystem) {
    setTimeout(() => window.vocabGapSystem.process(), 150);
  }
}


// ============================
// G2: THINKING PRESSURE ENGINE
// ============================
async function startThinkingPressure(turnElements) {
  const VANISHING_CUE_MS = 800;
  const RESPONSE_DEADLINE = 2000;
  
  // Dim all turns initially
  turnElements.forEach(({ turnEl }) => {
    turnEl.style.transition = 'all 0.4s ease';
    turnEl.style.opacity = '0.35';
    turnEl.style.filter = 'grayscale(0.5)';
  });
  
  for (let i = 0; i < turnElements.length; i++) {
    const { textEnEl, turnEl, turn } = turnElements[i];
    
    // Scroll into view
    turnEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Highlight current turn — bring to full visibility
    turnEl.style.opacity = '1';
    turnEl.style.filter = 'none';
    turnEl.style.boxShadow = "0 0 0 3px rgba(229,62,62,0.5), 0 4px 20px rgba(229,62,62,0.3)";
    turnEl.style.transform = "scale(1.03)";
    
    // Show turn counter overlay
    const counterOverlay = document.createElement('div');
    counterOverlay.style.cssText = `
      position: absolute; top: -10px; right: -10px; width: 28px; height: 28px;
      background: linear-gradient(135deg, #e53e3e, #c53030); color: white;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700; z-index: 5;
      box-shadow: 0 2px 8px rgba(229,62,62,0.5);
    `;
    counterOverlay.textContent = `${i + 1}`;
    turnEl.appendChild(counterOverlay);
    
    // Play audio if available
    if (turn.audio_id && window.dialogueAudioPlayer) {
      const unitFolder = 'unit_' + (typeof getCurrentUnitId === 'function' ? getCurrentUnitId() : 'U01').toLowerCase().slice(1);
      // Use absolute path
      const audioPath = `/audio_assets/${unitFolder}/lesson_dialogues/${turn.audio_id}.mp3`;
      console.log('Thinking Pressure Audio:', audioPath);
      
      try { 
        window.dialogueAudioPlayer.play(audioPath, /** @type {HTMLButtonElement} */ (turnEl.querySelector('.dlg-audio-btn') || document.createElement('button'))); 
      } catch (e) { console.warn('Pressure audio error:', e); }
    }
    
    // Vanish text after 800ms
    await new Promise(r => setTimeout(r, VANISHING_CUE_MS));
    textEnEl.style.transition = 'opacity 0.4s ease-out, filter 0.4s ease-out';
    textEnEl.style.opacity = '0';
    textEnEl.style.filter = 'blur(4px)';
    
    // Show timer bar — gradient with glow
    const timerBar = document.createElement('div');
    timerBar.className = 'thinking-timer-bar';
    timerBar.style.cssText = `
      width: 100%; height: 4px; margin-top: 8px; border-radius: 2px;
      background: linear-gradient(90deg, #e53e3e, #f6ad55);
      box-shadow: 0 0 8px rgba(229,62,62,0.4);
      transition: width ${RESPONSE_DEADLINE}ms linear;
    `;
    turnEl.appendChild(timerBar);
    
    // Start countdown (next frame so transition triggers)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        timerBar.style.width = '0';
        timerBar.style.background = 'linear-gradient(90deg, #fc8181, #feb2b2)';
      });
    });
    
    // Wait for deadline
    await new Promise(r => setTimeout(r, RESPONSE_DEADLINE));
    
    // Restore text with a reveal animation
    textEnEl.style.transition = 'opacity 0.3s ease-in, filter 0.3s ease-in';
    textEnEl.style.opacity = '1';
    textEnEl.style.filter = 'none';
    timerBar.remove();
    counterOverlay.remove();
    
    // Mark as completed — keep visible but subtle
    turnEl.style.boxShadow = "none";
    turnEl.style.transform = "scale(1)";
    turnEl.style.opacity = '0.7';
    turnEl.style.filter = 'none';
    
    // Pause between turns
    await new Promise(r => setTimeout(r, 500));
  }
  
  // Restore all turns to full visibility at end
  turnElements.forEach(({ turnEl }) => {
    turnEl.style.opacity = '1';
    turnEl.style.filter = 'none';
    turnEl.style.boxShadow = '';
    turnEl.style.transform = '';
  });
}


// Backward compatibility bridge
window.renderLessonDialogueTile = renderLessonDialogueTile;
