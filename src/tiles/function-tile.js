/**
 * Function Check Tile (Tile 5)
 * ============================
 * Interactive functional tasks with drag-and-drop exercises.
 * Three sequential subtasks + MCQ section.
 * 
 * @module src/tiles/function-tile
 * @version 2.0.0 (Phase 2 Refactor)
 */

import {
  clearTileContainer,
  getTileContainer,
  createButton,
  setState,
  STATES,
  resolveUIData,
  mergeMissingKeys
} from './tile-utils.js';

// ============================
// UI STRING HELPERS
// ============================

/**
 * Get Uzbek UI string
 * @param {string} path - Path to string in UI_STRINGS
 * @returns {string} Uzbek string or path as fallback
 */
function getUz(path) {
  return typeof window.getUz === 'function' ? window.getUz(path) : path;
}

/**
 * Get English UI string
 * @param {string} path - Path to string in UI_STRINGS
 * @returns {string} English string or path as fallback
 */
function getEn(path) {
  return typeof window.getEn === 'function' ? window.getEn(path) : path;
}

// ============================
// DRAG & DROP HELPERS
// ============================

/**
 * Create a draggable item
 * @param {string} text - Display text
 * @param {string} id - Unique identifier
 * @param {string} [translation] - Translation for bilingual support
 * @returns {HTMLElement} Draggable element
 */
function createDraggable(text, id, translation) {
  const item = document.createElement("div");
  item.textContent = text;
  item.draggable = true;
  item.className = "draggable-item";
  item.dataset.id = id;
  // Use tl-en class for English text with Uzbek translation on hover
  item.classList.add("tl-en");
  if (translation) {
    item.dataset.translation = translation;
  }
  item.style.cssText = [
    "display:inline-block",
    "padding:10px 14px",
    "margin:6px",
    "background:#e3f2fd",
    "border:1px solid #2196f3",
    "border-radius:10px",
    "cursor:grab",
    "transition:transform 0.15s ease, box-shadow 0.15s ease",
    "box-shadow:0 2px 6px rgba(0,0,0,0.08)"
  ].join(";");
  item.setAttribute('role', 'button');
  item.setAttribute('aria-grabbed', 'false');
  item.tabIndex = 0;
  
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", id);
    item.style.opacity = "0.5";
    item.style.cursor = "grabbing";
    item.style.transform = "scale(1.03)";
    item.setAttribute('aria-grabbed', 'true');
  });
  item.addEventListener("dragend", () => {
    item.style.opacity = "1";
    item.style.cursor = "grab";
    item.style.transform = "scale(1)";
    item.setAttribute('aria-grabbed', 'false');
  });

  // Click-to-move fallback: move to selected drop zone if any
  item.addEventListener('click', () => {
    const selectedZone = document.querySelector('.drop-zone.selected');
    if (selectedZone) {
      const droppedItems = selectedZone.querySelector('.dropped-items');
      if (item.parentElement && item.parentElement.classList.contains('draggable-pool')) {
        droppedItems.appendChild(item);
        updateZoneBadge(selectedZone);
      }
    }
  });

  // Keyboard support: Enter/Space to move to selected zone
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const selectedZone = document.querySelector('.drop-zone.selected');
      if (selectedZone) {
        const droppedItems = selectedZone.querySelector('.dropped-items');
        if (item.parentElement && item.parentElement.classList.contains('draggable-pool')) {
          droppedItems.appendChild(item);
          updateZoneBadge(selectedZone);
        }
      }
    }
    // Backspace to return to pool
    if (e.key === 'Backspace') {
      const pool = item.closest('.subtask-container')?.querySelector('.draggable-pool');
      if (pool && item.parentElement && item.parentElement.classList.contains('dropped-items')) {
        pool.appendChild(item);
        document.querySelectorAll('.drop-zone').forEach(updateZoneBadge);
      }
    }
  });
  
  return item;
}

/**
 * Create a drop zone for drag-drop exercises
 * @param {string} labelUz - Uzbek label
 * @param {string[]} correctIds - Array of correct item IDs
 * @param {string} [labelEn] - English translation
 * @returns {HTMLElement} Drop zone element
 */
function createDropZone(labelUz, correctIds, labelEn) {
  const zone = document.createElement("div");
  zone.className = "drop-zone";
  zone.style.cssText = [
    "margin:8px 0",
    "padding:12px",
    "border:2px dashed #999",
    "border-radius:10px",
    "min-height:80px",
    "background:#f9fbff",
    "transition:border-color 0.15s ease, background 0.15s ease"
  ].join(";");
  zone.setAttribute('role', 'list');
  zone.tabIndex = 0;

  const label = document.createElement("div");
  label.textContent = labelUz;
  label.style.fontWeight = "600";
  label.style.marginBottom = "8px";
  label.classList.add("tl-uz");

  // Translation map for common labels
  let translation = labelEn;
  if (!translation) {
    const uzToEn = {
      "Kun davri iboralari": "Time of day expressions",
      "Aniq vaqt iboralari": "Specific time expressions",
      "Kundalik ishlar": "Daily routines",
      "O'zingizni tanishtirish": "Introducing yourself",
      "Do'stingizga kuningiz haqida aytib beryapsiz": "Telling a friend about your day",
      "Yangi odam bilan tanishyapsiz": "Meeting a new person",
      "(Yangi)": "(New)",
      "(Oldingi)": "(Previous)",
      "Chastota": "Frequency",
      "Vaqt": "Time",
      "Harakat": "Action"
    };
    translation = uzToEn[labelUz];
    if (!translation) {
      translation = labelUz;
      Object.keys(uzToEn).forEach(uz => {
        translation = translation.replace(uz, uzToEn[uz]);
      });
    }
  }
  label.dataset.translation = translation;
  zone.appendChild(label);

  // Count badge
  const badge = document.createElement('span');
  badge.className = 'zone-badge';
  badge.style.cssText = "display:inline-block;margin-left:8px;padding:2px 8px;border-radius:12px;background:#e3f2fd;color:#1565c0;font-size:12px;";
  badge.textContent = "0";
  label.appendChild(badge);

  const droppedItems = document.createElement("div");
  droppedItems.className = "dropped-items";
  zone.appendChild(droppedItems);

  zone.dataset.correct = JSON.stringify(correctIds);

  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.style.background = "#e3f2fd";
    zone.style.borderColor = "#2196f3";
  });
  zone.addEventListener("dragleave", () => {
    zone.style.background = "#f9fbff";
    zone.style.borderColor = "#999";
  });
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.style.background = "#f9fbff";
    zone.style.borderColor = "#999";
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.querySelector(`[data-id="${id}"]`);
    if (draggable && draggable.parentElement.className === "draggable-pool") {
      droppedItems.appendChild(draggable);
      updateZoneBadge(zone);
    }
  });

  // Click to select this zone as target
  zone.addEventListener('click', () => {
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('selected'));
    zone.classList.add('selected');
  });

  // Keyboard: Enter to select; Backspace to clear selection
  zone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('selected'));
      zone.classList.add('selected');
    }
    if (e.key === 'Backspace') {
      zone.classList.remove('selected');
    }
  });

  // Helper: update badge count
  function updateBadge() {
    const count = droppedItems.querySelectorAll('.draggable-item').length;
    badge.textContent = String(count);
  }

  // Expose for outer helpers
  // @ts-ignore - dynamic property for badge update
  zone.__updateBadge = updateBadge;

  return zone;
}

// Update badge count on a drop zone
function updateZoneBadge(zone) {
  if (zone && typeof zone.__updateBadge === 'function') {
    zone.__updateBadge();
  }
}

// ============================
// CLASSIFICATION HELPERS
// ============================

/**
 * Check if item belongs to category by index
 */
function _belongsToCategory(functionSubtasks, itemEnglish, categoryIndex) {
  const st = functionSubtasks.category_association;
  if (!st || !st.items_en || !st.category_indices) return false;
  const itemIdx = st.items_en.indexOf(itemEnglish);
  if (itemIdx === -1) return false;
  return st.category_indices[itemIdx] === categoryIndex;
}

/**
 * Check if sentence belongs to function by index
 */
function _belongsToFunction(functionSubtasks, sentEnglish, functionIndex) {
  const st = functionSubtasks.sentence_function_match;
  if (!st || !st.sentences_en || !st.sentence_indices) return false;
  const sentIdx = st.sentences_en.indexOf(sentEnglish);
  if (sentIdx === -1) return false;
  return st.sentence_indices[sentIdx] === functionIndex;
}

/**
 * Check if sentence uses present continuous
 */
function _isPresentContinuousSentence(sent) {
  const s = String(sent || "");
  return /(\bam\b|\bis\b|\bare\b)\s+\w+ing\b/i.test(s);
}

/**
 * Extract current unit keywords from lesson
 */
function _extractCurrentKeywords(lessonCtx) {
  const keys = new Set();
  try {
    const tv = Array.isArray(lessonCtx.TV_items) ? lessonCtx.TV_items : [];
    tv.forEach((it) => {
      if (it && typeof it === "object" && it.en) keys.add(String(it.en).toLowerCase());
      else if (typeof it === "string") keys.add(String(it).toLowerCase());
    });
    const patterns = Array.isArray(lessonCtx.TL_patterns) ? lessonCtx.TL_patterns : [];
    patterns.forEach((p) => {
      const tw = Array.isArray(p.target_words) ? p.target_words : [];
      tw.forEach((w) => keys.add(String(w || "").toLowerCase()));
    });
  } catch (e) {}
  ["am", "is", "are"].forEach((w) => keys.add(w));
  return Array.from(keys);
}

/**
 * Check if sentence includes any keyword
 */
function _includesAnyKeyword(sent, keywords) {
  const s = String(sent || "").toLowerCase();
  for (const kw of Array.isArray(keywords) ? keywords : []) {
    if (!kw) continue;
    const re = new RegExp("\\b" + kw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\b", "i");
    if (re.test(s)) return true;
  }
  return false;
}

// ============================
// SUBTASK RENDERERS
// ============================

/**
 * Render Subtask 1: Category Association
 */
function renderSubtask1(functionSubtasks, subtaskState, renderCurrentSubtask) {
  const wrap = document.createElement("div");
  wrap.className = "subtask-container";
  wrap.style.cssText = "margin:16px 0;padding:16px;border:1px solid #ddd;border-radius:8px;background:#fff;";

  const title = document.createElement("div");
  title.textContent = getUz("functionTile.subtask1.title");
  title.style.cssText = "font-weight:600;font-size:16px;margin-bottom:12px;";
  title.classList.add("tl-uz");
  title.dataset.translation = getEn("functionTile.subtask1.title");
  wrap.appendChild(title);

  const st = functionSubtasks.category_association;
  if (!st || !st.categories_uz || !st.items_en) {
    wrap.textContent = getUz("common.labels.dataNotFound");
    wrap.classList.add("tl-uz");
    wrap.dataset.translation = getEn("common.labels.dataNotFound");
    return wrap;
  }

  const instruction = document.createElement("div");
  instruction.textContent = getUz("functionTile.subtask1.instruction");
  instruction.style.marginBottom = "12px";
  instruction.classList.add("tl-uz");
  instruction.dataset.translation = getEn("functionTile.subtask1.instruction");
  wrap.appendChild(instruction);

  // Create drop zones for each category
  const dropZones = [];
  st.categories_uz.forEach((cat, categoryIndex) => {
    const correctIds = st.items_en.filter((it) => _belongsToCategory(functionSubtasks, it, categoryIndex));
    const catEn = st.categories_en && st.categories_en[categoryIndex] ? st.categories_en[categoryIndex] : undefined;
    const zone = createDropZone(cat, correctIds, catEn);
    dropZones.push(zone);
    wrap.appendChild(zone);
  });

  // Create pool of draggable items
  const pool = document.createElement("div");
  pool.className = "draggable-pool";
  pool.style.cssText = "margin:16px 0;padding:12px;background:#fafafa;border:1px solid #ddd;border-radius:4px;";
  const poolLabel = document.createElement("div");
  poolLabel.textContent = "Patternlar:";
  poolLabel.style.fontWeight = "500";
  poolLabel.style.marginBottom = "8px";
  poolLabel.classList.add("tl-uz");
  poolLabel.dataset.translation = "Patterns:";
  pool.appendChild(poolLabel);

  const shuffled = [...st.items_en].sort(() => Math.random() - 0.5);
  shuffled.forEach((item) => {
    const itemIndex = st.items_en.indexOf(item);
    const translationUz = st.items_uz && st.items_uz[itemIndex] ? st.items_uz[itemIndex] : null;
    pool.appendChild(createDraggable(item, item, translationUz));
  });
  wrap.appendChild(pool);

  // Feedback area
  const feedback = document.createElement("div");
  feedback.className = "subtask-feedback";
  feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;";
  wrap.appendChild(feedback);

  // Buttons
  const btnCheck = createButton(getUz("common.buttons.check"), () => {
    let correct = 0;
    let total = 0;
    dropZones.forEach((zone) => {
      const correctIds = JSON.parse(zone.dataset.correct);
      const dropped = [...zone.querySelectorAll(".dropped-items .draggable-item")].map(el => el.dataset.id);
      correctIds.forEach((cid) => {
        total++;
        if (dropped.includes(cid)) correct++;
      });
      updateZoneBadge(zone);
    });

    const score = total > 0 ? correct / total : 0;
    subtaskState.scores[0] = score;
    subtaskState.attempts[0]++;

    if (score >= 0.66) {
      feedback.textContent = `✓ To'g'ri! (${correct}/${total}) Davom eting.`;
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = `✓ Correct! (${correct}/${total}) Continue.`;
      feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;background:#c8e6c9;color:#2e7d32;";
      btnContinue.style.display = "inline-block";
      btnRetry.style.display = "none";
    } else {
      feedback.textContent = `✗ Kamida ${Math.ceil(total * 0.66)}/${total} to'g'ri bo'lishi kerak. (${correct}/${total})`;
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = `✗ At least ${Math.ceil(total * 0.66)}/${total} must be correct. (${correct}/${total})`;
      feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;background:#ffcdd2;color:#c62828;";
      btnRetry.style.display = "inline-block";
      btnContinue.style.display = "none";
    }
  });
  btnCheck.classList.add("tl-uz");
  btnCheck.dataset.translation = "Check";
  wrap.appendChild(btnCheck);

  const btnRetry = createButton(getUz("common.buttons.retry"), () => {
    dropZones.forEach(zone => {
      const items = zone.querySelectorAll(".dropped-items .draggable-item");
      items.forEach(item => pool.appendChild(item));
    });
    document.querySelectorAll('.drop-zone').forEach(updateZoneBadge);
    feedback.textContent = "";
    feedback.style.background = "";
    btnRetry.style.display = "none";
  });
  btnRetry.style.display = "none";
  btnRetry.classList.add("tl-uz");
  btnRetry.dataset.translation = getEn("common.buttons.retry");
  wrap.appendChild(btnRetry);

  const btnContinue = createButton(getUz("common.buttons.continue"), () => {
    subtaskState.current = 1;
    renderCurrentSubtask();
  });
  btnContinue.style.display = "none";
  btnContinue.classList.add("tl-uz");
  btnContinue.dataset.translation = getEn("common.buttons.continue");
  wrap.appendChild(btnContinue);

  return wrap;
}

/**
 * Render Subtask 2: Sentence-Function Match
 */
function renderSubtask2(functionSubtasks, subtaskState, renderCurrentSubtask) {
  const wrap = document.createElement("div");
  wrap.className = "subtask-container";
  wrap.style.cssText = "margin:16px 0;padding:16px;border:1px solid #ddd;border-radius:8px;background:#fff;";

  const title = document.createElement("div");
  title.textContent = getUz("functionTile.subtask2.title");
  title.style.cssText = "font-weight:600;font-size:16px;margin-bottom:12px;";
  title.classList.add("tl-uz");
  title.dataset.translation = getEn("functionTile.subtask2.title");
  wrap.appendChild(title);

  const st = functionSubtasks.sentence_function_match;
  if (!st || !st.functions_uz || !st.sentences_en) {
    wrap.textContent = getUz("common.labels.dataNotFound");
    wrap.classList.add("tl-uz");
    wrap.dataset.translation = getEn("common.labels.dataNotFound");
    return wrap;
  }

  const instruction = document.createElement("div");
  instruction.textContent = getUz("functionTile.subtask2.instruction");
  instruction.style.marginBottom = "12px";
  instruction.classList.add("tl-uz");
  instruction.dataset.translation = getEn("functionTile.subtask2.instruction");
  wrap.appendChild(instruction);

  // Create drop zones for each function
  const dropZones = [];
  st.functions_uz.forEach((func, functionIndex) => {
    const correctIds = st.sentences_en.filter((sent) => _belongsToFunction(functionSubtasks, sent, functionIndex));
    const funcEn = st.functions_en && st.functions_en[functionIndex] ? st.functions_en[functionIndex] : undefined;
    const zone = createDropZone(func, correctIds, funcEn);
    dropZones.push(zone);
    wrap.appendChild(zone);
  });

  // Create pool
  const pool = document.createElement("div");
  pool.className = "draggable-pool";
  pool.style.cssText = "margin:16px 0;padding:12px;background:#fafafa;border:1px solid #ddd;border-radius:4px;";
  const poolLabel = document.createElement("div");
  poolLabel.textContent = "Gaplar:";
  poolLabel.style.fontWeight = "500";
  poolLabel.style.marginBottom = "8px";
  poolLabel.classList.add("tl-uz");
  poolLabel.dataset.translation = "Sentences:";
  pool.appendChild(poolLabel);

  const shuffled = [...st.sentences_en].sort(() => Math.random() - 0.5);
  shuffled.forEach((sent) => {
    const sentIndex = st.sentences_en.indexOf(sent);
    const translationUz = st.sentences_uz && st.sentences_uz[sentIndex] ? st.sentences_uz[sentIndex] : null;
    pool.appendChild(createDraggable(sent, sent, translationUz));
  });
  wrap.appendChild(pool);

  const feedback = document.createElement("div");
  feedback.className = "subtask-feedback";
  feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;";
  wrap.appendChild(feedback);

  const btnCheck = createButton(getUz("common.buttons.check"), () => {
    let correct = 0;
    let total = 0;
    dropZones.forEach((zone) => {
      const correctIds = JSON.parse(zone.dataset.correct);
      const dropped = [...zone.querySelectorAll(".dropped-items .draggable-item")].map(el => el.dataset.id);
      correctIds.forEach((cid) => {
        total++;
        if (dropped.includes(cid)) correct++;
      });
      updateZoneBadge(zone);
    });

    const score = total > 0 ? correct / total : 0;
    subtaskState.scores[1] = score;
    subtaskState.attempts[1]++;

    if (score >= 0.66) {
      feedback.textContent = `✓ To'g'ri! (${correct}/${total}) Davom eting.`;
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = `✓ Correct! (${correct}/${total}) Continue.`;
      feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;background:#c8e6c9;color:#2e7d32;";
      btnContinue.style.display = "inline-block";
      btnRetry.style.display = "none";
    } else {
      feedback.textContent = `✗ Kamida ${Math.ceil(total * 0.66)}/${total} to'g'ri bo'lishi kerak. (${correct}/${total})`;
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = `✗ At least ${Math.ceil(total * 0.66)}/${total} must be correct. (${correct}/${total})`;
      feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;background:#ffcdd2;color:#c62828;";
      btnRetry.style.display = "inline-block";
      btnContinue.style.display = "none";
    }
  });
  btnCheck.classList.add("tl-uz");
  btnCheck.dataset.translation = getEn("common.buttons.check");
  wrap.appendChild(btnCheck);

  const btnRetry = createButton(getUz("common.buttons.retry"), () => {
    dropZones.forEach(zone => {
      const items = zone.querySelectorAll(".dropped-items .draggable-item");
      items.forEach(item => pool.appendChild(item));
    });
    document.querySelectorAll('.drop-zone').forEach(updateZoneBadge);
    feedback.textContent = "";
    feedback.style.background = "";
    btnRetry.style.display = "none";
  });
  btnRetry.style.display = "none";
  btnRetry.classList.add("tl-uz");
  btnRetry.dataset.translation = getEn("common.buttons.retry");
  wrap.appendChild(btnRetry);

  const btnContinue = createButton(getUz("common.buttons.continue"), () => {
    subtaskState.current = 2;
    renderCurrentSubtask();
  });
  btnContinue.style.display = "none";
  btnContinue.classList.add("tl-uz");
  btnContinue.dataset.translation = getEn("common.buttons.continue");
  wrap.appendChild(btnContinue);

  return wrap;
}

/**
 * Render Subtask 3: Recycled Function Recall
 */
function renderSubtask3(functionSubtasks, lesson, subtaskState, subtasksSection) {
  const wrap = document.createElement("div");
  wrap.className = "subtask-container";
  wrap.style.cssText = "margin:16px 0;padding:16px;border:1px solid #ddd;border-radius:8px;background:#fff;";

  const title = document.createElement("div");
  title.textContent = getUz("functionTile.subtask3.title");
  title.classList.add("tl-uz");
  title.dataset.translation = getEn("functionTile.subtask3.title");
  title.style.cssText = "font-weight:600;font-size:16px;margin-bottom:12px;";
  wrap.appendChild(title);

  const st = functionSubtasks.recycled_function_recall;
  if (!st || !st.current_unit_label_uz || !st.sentences_en) {
    wrap.textContent = getUz("common.labels.dataNotFound");
    wrap.classList.add("tl-uz");
    wrap.dataset.translation = getEn("common.labels.dataNotFound");
    return wrap;
  }

  const instruction = document.createElement("div");
  instruction.textContent = getUz("functionTile.subtask3.instruction");
  instruction.classList.add("tl-uz");
  instruction.dataset.translation = getEn("functionTile.subtask3.instruction");
  instruction.style.marginBottom = "12px";
  wrap.appendChild(instruction);

  // Determine classification
  let currentCorrect, prevCorrect;
  let currentKeywords = [];
  if (st.sentence_indices && Array.isArray(st.sentence_indices)) {
    currentCorrect = st.sentences_en.filter((sent, idx) => st.sentence_indices[idx] === 0);
    prevCorrect = st.sentences_en.filter((sent, idx) => st.sentence_indices[idx] === 1);
  } else {
    currentKeywords = _extractCurrentKeywords(lesson || {});
    currentCorrect = st.sentences_en.filter((sent) => {
      return _includesAnyKeyword(sent, currentKeywords) || _isPresentContinuousSentence(sent);
    });
    prevCorrect = st.sentences_en.filter((sent) => !currentCorrect.includes(sent));
  }

  // Debug overlay
  if (window.__FUNCTION_DEBUG__) {
    const debug = document.createElement("div");
    debug.style.cssText = "margin:12px 0;padding:12px;border:1px dashed #999;background:#fffde7;border-radius:6px;font-size:0.95rem";
    const h = document.createElement("div");
    h.textContent = "Function Check Debug — Step 3";
    h.style.cssText = "font-weight:700;margin-bottom:6px";
    debug.appendChild(h);

    const kw = document.createElement("div");
    kw.textContent = "Current unit keywords: " + (currentKeywords.length ? currentKeywords.join(", ") : "(none)");
    kw.style.marginBottom = "6px";
    debug.appendChild(kw);

    const list = document.createElement("ul");
    list.style.margin = "0";
    list.style.paddingLeft = "18px";
    st.sentences_en.forEach((sent) => {
      const li = document.createElement("li");
      const isCur = currentCorrect.includes(sent);
      li.textContent = `${sent} → ${isCur ? "CURRENT" : "PREVIOUS"}`;
      list.appendChild(li);
    });
    debug.appendChild(list);
    subtasksSection.appendChild(debug);
  }

  // Create drop zones
  const dropZones = [];
  const currentLabelEn = (st.current_unit_label_en || st.current_unit_label_uz) + " (New)";
  const prevLabelEn = (st.previous_unit_label_en || st.previous_unit_label_uz) + " (Previous)";
  const currentZone = createDropZone(st.current_unit_label_uz + " (Yangi)", currentCorrect, currentLabelEn);
  const prevZone = createDropZone(st.previous_unit_label_uz + " (Oldingi)", prevCorrect, prevLabelEn);

  dropZones.push(currentZone, prevZone);
  wrap.appendChild(currentZone);
  wrap.appendChild(prevZone);

  // Create pool
  const pool = document.createElement("div");
  pool.className = "draggable-pool";
  pool.style.cssText = "margin:16px 0;padding:12px;background:#fafafa;border:1px solid #ddd;border-radius:4px;";
  const poolLabel = document.createElement("div");
  poolLabel.textContent = "Gaplar:";
  poolLabel.classList.add("tl-uz");
  poolLabel.dataset.translation = "Sentences:";
  poolLabel.style.fontWeight = "500";
  poolLabel.style.marginBottom = "8px";
  pool.appendChild(poolLabel);

  const shuffled = [...st.sentences_en].sort(() => Math.random() - 0.5);
  shuffled.forEach((sent) => {
    const sentIndex = st.sentences_en.indexOf(sent);
    const translationUz = st.sentences_uz && st.sentences_uz[sentIndex] ? st.sentences_uz[sentIndex] : null;
    pool.appendChild(createDraggable(sent, sent, translationUz));
  });
  wrap.appendChild(pool);

  const feedback = document.createElement("div");
  feedback.className = "subtask-feedback";
  feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;";
  wrap.appendChild(feedback);

  const btnCheck = createButton(getUz("common.buttons.check"), () => {
    let correct = 0;
    let total = 0;
    dropZones.forEach((zone) => {
      const correctIds = JSON.parse(zone.dataset.correct);
      const dropped = [...zone.querySelectorAll(".dropped-items .draggable-item")].map(el => el.dataset.id);
      correctIds.forEach((cid) => {
        total++;
        if (dropped.includes(cid)) correct++;
      });
      updateZoneBadge(zone);
    });

    const score = total > 0 ? correct / total : 0;
    subtaskState.scores[2] = score;
    subtaskState.attempts[2]++;

    if (score >= 0.66) {
      feedback.textContent = `✓ To'g'ri! (${correct}/${total}) ${getUz("functionTile.feedback.allComplete").split("!")[0]}!`;
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = `✓ Correct! (${correct}/${total}) Function tasks complete!`;
      feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;background:#c8e6c9;color:#2e7d32;";
      btnComplete.style.display = "inline-block";
      btnRetry.style.display = "none";
    } else {
      feedback.textContent = `✗ Kamida ${Math.ceil(total * 0.66)}/${total} to'g'ri bo'lishi kerak. (${correct}/${total})`;
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = `✗ At least ${Math.ceil(total * 0.66)}/${total} must be correct. (${correct}/${total})`;
      feedback.style.cssText = "margin:12px 0;padding:8px;border-radius:4px;background:#ffcdd2;color:#c62828;";
      btnRetry.style.display = "inline-block";
      btnComplete.style.display = "none";
    }
  });
  btnCheck.classList.add("tl-uz");
  btnCheck.dataset.translation = getEn("common.buttons.check");
  wrap.appendChild(btnCheck);

  const btnRetry = createButton(getUz("common.buttons.retry"), () => {
    dropZones.forEach(zone => {
      const items = zone.querySelectorAll(".dropped-items .draggable-item");
      items.forEach(item => pool.appendChild(item));
    });
    document.querySelectorAll('.drop-zone').forEach(updateZoneBadge);
    feedback.textContent = "";
    feedback.style.background = "";
    btnRetry.style.display = "none";
  });
  btnRetry.style.display = "none";
  btnRetry.classList.add("tl-uz");
  btnRetry.dataset.translation = getEn("common.buttons.retry");
  wrap.appendChild(btnRetry);

  const btnComplete = createButton("Tugallash", () => {
    const summary = document.createElement("div");
    summary.style.cssText = "margin:16px 0;padding:12px;background:#e8f5e9;border:1px solid #4caf50;border-radius:4px;";
    summary.classList.add("tl-uz");
    summary.dataset.translation = '✓ All tasks completed!\n1) Category: ' + (subtaskState.scores[0] * 100).toFixed(0) + '%\n2) Function: ' + (subtaskState.scores[1] * 100).toFixed(0) + '%\n3) Recycled: ' + (subtaskState.scores[2] * 100).toFixed(0) + '%';
    summary.innerHTML = '<strong>' + getUz("functionTile.feedback.summaryComplete") + '</strong><br>1) Kategoriya: ' + (subtaskState.scores[0] * 100).toFixed(0) + '%<br>2) Funksiya: ' + (subtaskState.scores[1] * 100).toFixed(0) + '%<br>3) Takror: ' + (subtaskState.scores[2] * 100).toFixed(0) + '%';
    subtasksSection.appendChild(summary);
    wrap.style.display = "none";
  });
  btnComplete.style.display = "none";
  btnComplete.classList.add("tl-uz");
  btnComplete.dataset.translation = "Finish";
  wrap.appendChild(btnComplete);

  return wrap;
}

/**
 * Render Function Check MCQ section
 */
function renderFunctionCheckMCQ(lesson, tileContainer) {
  const functionCheckItems = lesson && lesson.function_check_items ? lesson.function_check_items : null;
  const fcSection = document.createElement("div");
  fcSection.className = "tile-section";
  fcSection.style.cssText = "margin-top:20px;padding:16px;background:#fff3e0;border-radius:8px;border-left:4px solid #ff9800;";

  if (functionCheckItems) {
    const fcHeader = document.createElement("div");
    fcHeader.style.cssText = "font-weight:bold;font-size:1.1rem;margin-bottom:12px;color:#e65100;";
    fcHeader.textContent = "📝 Function Check – MCQ";
    fcSection.appendChild(fcHeader);

    const fcInstructions = document.createElement("div");
    fcInstructions.style.cssText = "font-size:0.9rem;color:#666;margin-bottom:16px;";
    fcInstructions.textContent = "Har bir gap uchun to'g'ri grammatik funksiyani tanlang. Variantlar ustiga kursorni olib boring — misollar ko'rinadi.";
    fcInstructions.classList.add("tl-uz");
    fcInstructions.dataset.translation = "Select the correct grammatical function for each sentence. Hover over options to see examples.";
    fcSection.appendChild(fcInstructions);

    const fcState = { answered: 0, correct: 0, total: Object.keys(functionCheckItems).length };

    // Batch function check blocks using DocumentFragment
    const fcFragment = document.createDocumentFragment();
    Object.keys(functionCheckItems).forEach((fcKey, fcIdx) => {
      const fc = functionCheckItems[fcKey];
      if (!fc || !fc.english_sentence || !fc.function_options_uz) return;

      const fcBlock = document.createElement("div");
      fcBlock.style.cssText = "margin-bottom:16px;padding:12px;background:#fff;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.1);";

      const qLabel = document.createElement("div");
      qLabel.style.cssText = "font-weight:600;margin-bottom:8px;color:#333;";
      qLabel.textContent = (fcIdx + 1) + ". " + fc.english_sentence;
      fcBlock.appendChild(qLabel);

      const optionsDiv = document.createElement("div");
      optionsDiv.style.cssText = "display:flex;flex-direction:column;gap:8px;";

      fc.function_options_uz.forEach((optUz, optIdx) => {
        const optBtn = document.createElement("button");
        optBtn.style.cssText = "padding:10px 14px;text-align:left;border:1px solid #ddd;border-radius:4px;background:#fafafa;cursor:pointer;transition:all 0.2s;position:relative;font-size:0.95rem;";
        optBtn.textContent = optUz;
        optBtn.classList.add("tl-uz");
        if (fc.function_options_en && fc.function_options_en[optIdx]) {
          optBtn.dataset.translation = fc.function_options_en[optIdx];
        }

        // Hover hints
        if (fc.hover_hints_uz && fc.hover_hints_uz[optIdx]) {
          optBtn.title = fc.hover_hints_uz[optIdx];

          const tooltip = document.createElement("div");
          tooltip.className = "fc-hover-tooltip";
          tooltip.style.cssText = "position:absolute;bottom:105%;left:0;background:#1a237e;color:#fff;padding:8px 12px;border-radius:4px;font-size:0.85rem;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity 0.2s;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,0.2);";
          tooltip.textContent = "📌 " + fc.hover_hints_uz[optIdx];
          optBtn.appendChild(tooltip);

          optBtn.addEventListener("mouseenter", () => {
            optBtn.style.background = "#e3f2fd";
            optBtn.style.borderColor = "#2196f3";
            tooltip.style.opacity = "1";
          });
          optBtn.addEventListener("mouseleave", () => {
            if (!optBtn.classList.contains("selected")) {
              optBtn.style.background = "#fafafa";
              optBtn.style.borderColor = "#ddd";
            }
            tooltip.style.opacity = "0";
          });
        }

        // Click handler
        optBtn.addEventListener("click", () => {
          if (optBtn.disabled) return;

          optionsDiv.querySelectorAll("button").forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = "default";
          });

          const isCorrect = (optIdx === fc.correct_function_index);
          fcState.answered++;
          if (isCorrect) {
            fcState.correct++;
            optBtn.style.cssText += "background:#c8e6c9 !important;border-color:#4caf50 !important;color:#2e7d32;";
            optBtn.textContent = "✓ " + optUz;
          } else {
            optBtn.style.cssText += "background:#ffcdd2 !important;border-color:#f44336 !important;color:#c62828;";
            optBtn.textContent = "✗ " + optUz;
            const correctBtn = optionsDiv.querySelectorAll("button")[fc.correct_function_index];
            if (correctBtn) {
              correctBtn.style.cssText += "background:#c8e6c9 !important;border-color:#4caf50 !important;color:#2e7d32;";
              correctBtn.textContent = "✓ " + fc.function_options_uz[fc.correct_function_index];
            }
          }

          if (fcState.answered === fcState.total) {
            const scoreDisplay = document.createElement("div");
            scoreDisplay.style.cssText = "margin-top:16px;padding:12px;border-radius:4px;font-weight:bold;text-align:center;";
            const pct = Math.round((fcState.correct / fcState.total) * 100);
            if (pct >= 66) {
              scoreDisplay.style.background = "#c8e6c9";
              scoreDisplay.style.color = "#2e7d32";
              scoreDisplay.textContent = "✓ Function Check: " + fcState.correct + "/" + fcState.total + " (" + pct + "%)";
            } else {
              scoreDisplay.style.background = "#ffcdd2";
              scoreDisplay.style.color = "#c62828";
              scoreDisplay.textContent = "✗ Function Check: " + fcState.correct + "/" + fcState.total + " (" + pct + "%) — Kamida 66% kerak";
            }
            scoreDisplay.classList.add("tl-uz");
            scoreDisplay.dataset.translation = pct >= 66 ?
              "✓ Function Check: " + fcState.correct + "/" + fcState.total + " (" + pct + "%)" :
              "✗ Function Check: " + fcState.correct + "/" + fcState.total + " (" + pct + "%) — At least 66% required";
            fcSection.appendChild(scoreDisplay);
          }
        });

        optionsDiv.appendChild(optBtn);
      });

      fcBlock.appendChild(optionsDiv);
      fcFragment.appendChild(fcBlock);
    });
    fcSection.appendChild(fcFragment);
  } else {
    const noFc = document.createElement("div");
    noFc.style.color = "#999";
    noFc.textContent = "Function check items not set.";
    fcSection.appendChild(noFc);
  }

  return fcSection;
}

// ============================
// MAIN RENDER FUNCTION
// ============================

/**
 * Render the Function Check tile (Tile 5)
 * @param {Object} lesson - Lesson data object
 */
export function renderFunctionTile(lesson) {
  clearTileContainer();
  const tileContainer = getTileContainer();
  if (tileContainer) {
    tileContainer.classList.add("function-tile");
  }

  const r = resolveUIData(STATES.FUNCTION, lesson);
  mergeMissingKeys(r.missingKeys);

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = "Tile 5 — Function Check";

  // === SCENARIO CONTEXT ===
  if (lesson && lesson.scenario_context) {
    const ctx = lesson.scenario_context;
    const scenarioDiv = document.createElement("div");
    scenarioDiv.className = "tile-section";
    scenarioDiv.style.cssText = "background:#e0f7fa;border-left:4px solid #00bcd4;padding:12px;margin-bottom:16px;border-radius:4px;";

    const icon = document.createElement("div");
    icon.textContent = "💬 Context:";
    icon.style.fontWeight = "bold";
    icon.style.color = "#006064";
    icon.style.marginBottom = "4px";

    const textUz = document.createElement("div");
    textUz.textContent = ctx.uz || "";
    textUz.style.fontSize = "1.1rem";
    textUz.style.fontWeight = "500";
    textUz.classList.add("tl-uz");
    if (ctx.en) textUz.dataset.translation = ctx.en;

    scenarioDiv.appendChild(icon);
    scenarioDiv.appendChild(textUz);
    tileContainer.appendChild(title);
    tileContainer.appendChild(scenarioDiv);
  } else {
    tileContainer.appendChild(title);
  }

  // === CONCEPT SUBTASKS (read-only) ===
  const conceptTasks = Array.isArray(lesson && lesson.function_concept_tasks) ? lesson.function_concept_tasks.slice(0, 3) : [];
  const conceptSection = document.createElement("div");
  conceptSection.className = "tile-section";
  if (conceptTasks.length) {
    const header = document.createElement("div");
    header.textContent = "Concept subtasks (read-only):";
    header.style.fontWeight = "600";
    conceptSection.appendChild(header);

    conceptTasks.forEach((task, idx) => {
      const block = document.createElement("div");
      block.style.marginTop = "8px";

      const label = document.createElement("div");
      label.textContent = (task.title ? String(task.title) : "Subtask " + (idx + 1));
      label.style.fontWeight = "500";
      block.appendChild(label);

      if (task.prompt) {
        const prompt = document.createElement("div");
        prompt.textContent = String(task.prompt);
        block.appendChild(prompt);
      }

      if (Array.isArray(task.examples) && task.examples.length) {
        const exList = document.createElement("ul");
        task.examples.slice(0, 3).forEach((ex) => {
          const li = document.createElement("li");
          li.textContent = String(ex || "");
          exList.appendChild(li);
        });
        block.appendChild(exList);
      }

      if (Array.isArray(task.options) && task.options.length) {
        const optList = document.createElement("div");
        optList.textContent = "Options: " + task.options.map((o) => String(o || "")).join(" | ");
        block.appendChild(optList);
      }

      conceptSection.appendChild(block);
    });
  }

  // === INTERACTIVE SUBTASKS ===
  const functionSubtasks = lesson && lesson.function_subtasks ? lesson.function_subtasks : null;
  const subtasksSection = document.createElement("div");
  subtasksSection.className = "tile-section";

  const subtaskState = {
    current: 0,
    scores: [null, null, null],
    attempts: [0, 0, 0]
  };

  const subtaskContainers = [];

  const renderCurrentSubtask = () => {
    subtaskContainers.forEach(c => c.remove());
    subtaskContainers.length = 0;

    // Progress indicator
    const progress = document.createElement('div');
    progress.style.cssText = 'display:flex;gap:8px;margin-bottom:12px;align-items:center;';
    ['1/3', '2/3', '3/3'].forEach((label, idx) => {
      const step = document.createElement('div');
      step.style.cssText = 'padding:6px 10px;border-radius:999px;font-size:12px;background:#eef2f7;color:#334155;';
      const passed = subtaskState.scores[idx] != null && subtaskState.scores[idx] >= 0.66;
      const isCurrent = subtaskState.current === idx;
      step.textContent = (passed ? '✓ ' : '') + label;
      if (isCurrent) {
        step.style.background = '#dbeafe';
        step.style.color = '#0b5ed7';
        step.style.fontWeight = '600';
      }
      progress.appendChild(step);
    });
    subtasksSection.appendChild(progress);

    let container;
    if (subtaskState.current === 0) {
      container = renderSubtask1(functionSubtasks, subtaskState, renderCurrentSubtask);
    } else if (subtaskState.current === 1) {
      container = renderSubtask2(functionSubtasks, subtaskState, renderCurrentSubtask);
    } else if (subtaskState.current === 2) {
      container = renderSubtask3(functionSubtasks, lesson, subtaskState, subtasksSection);
    }

    if (container) {
      subtaskContainers.push(container);
      subtasksSection.appendChild(container);
    }
  };

  if (functionSubtasks && Object.keys(functionSubtasks).length > 0) {
    const h = document.createElement("div");
    h.textContent = "Funksiya topshiriqlari";
    h.style.fontWeight = "600";
    h.style.marginBottom = "16px";
    h.classList.add("tl-uz");
    h.dataset.translation = "Functional Tasks";
    subtasksSection.appendChild(h);

    renderCurrentSubtask();
  } else {
    const placeholder = document.createElement("div");
    placeholder.textContent = getUz("functionTile.notSet");
    placeholder.classList.add("tl-uz");
    placeholder.dataset.translation = getEn("functionTile.notSet");
    subtasksSection.appendChild(placeholder);
  }

  // === MCQ SECTION ===
  const fcSection = renderFunctionCheckMCQ(lesson, tileContainer);

  // === CONTINUE BUTTON ===
  const btnContinue = createButton("Continue", () => {
    // TEACHER MODE bypass
    if (window.TEACHER_MODE) {
      setState(STATES.CONTROLLED);
      return;
    }

    // Gate: require all 3 subtasks passed (≥66%)
    const allPassed = subtaskState.scores.every(score => score !== null && score >= 0.66);
    if (allPassed || !functionSubtasks) {
      setState(STATES.CONTROLLED);
    } else {
      const feedback = document.createElement("div");
      feedback.className = "feedback err";
      feedback.style.cssText = "margin:16px 0;padding:12px;background:#ffcdd2;color:#c62828;border-radius:4px;";
      feedback.textContent = "Barcha 3 ta topshiriqdan o'ting (≥66%).";
      feedback.classList.add("tl-uz");
      feedback.dataset.translation = "Pass all 3 tasks (≥66%).";
      if (!subtasksSection.querySelector(".feedback")) {
        subtasksSection.appendChild(feedback);
      }
    }
  });

  tileContainer.appendChild(subtasksSection);
  tileContainer.appendChild(fcSection);
  tileContainer.appendChild(btnContinue);
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
console.log('AUDIT: function-tile.js is assigning window.renderFunctionTile.');
window.renderFunctionTile = renderFunctionTile;

export default renderFunctionTile;
