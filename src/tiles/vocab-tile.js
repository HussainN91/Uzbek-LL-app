/**
 * Vocab Tile Module
 * =================
 * Tile 2: Vocabulary grid with interactive cards.
 * 
 * Features:
 * - Interactive vocab cards with VocabCardRenderer
 * - SRS status indicators
 * - POS Speed Game trigger at 6+ cards
 * - Completion gating
 * 
 * @module src/tiles/vocab-tile
 * @version 2.1.0 (SmartLoad removed)
 */

import {
  getTileContainer,
  clearTileContainer,
  createTileTitle,
  resolveUIData,
  mergeMissingKeys,
  createButton,
  setState,
  transitionToTile,
  getVocabForLesson,
  getStates
} from './tile-utils.js';

import { VocabCardRenderer } from '../features/vocab-card-renderer.js';
import {
  LANG_STATES,
  buildMirrorHtml,
  createTextLayers,
  createLineMirrorToggle,
  setLayerVisibility
} from '../utils/mirror-toggle.js';

// ============================
// HELPER: Get actual vocab IDs from vocab_cards file
// ============================

/**
 * Get actual vocab card IDs from the loaded vocab_cards_uXX.js file
 * Maps lesson ID to the chunk IDs defined in the vocab card file
 * @param {Object} lesson - Lesson object with lesson_id
 * @param {string} unitId - Current unit ID (e.g., "U02")
 * @returns {string[]|null} Array of vocab card IDs or null if not found
 */
function getActualLessonVocabIds(lesson, unitId) {
  if (!lesson || !lesson.lesson_id) return null;
  
  // Get the loaded vocab cards object (U01_5 -> VOCAB_CARDS_U01_5, U02 -> VOCAB_CARDS_U02)
  const unitKey = String(unitId || '').toUpperCase().replace(/^U/, '');
  const vocabCardsKey = unitKey ? `VOCAB_CARDS_U${unitKey}` : null;
  if (!vocabCardsKey) return null;
  const vocabCards = window[vocabCardsKey];
  
  if (!vocabCards || !vocabCards.lessons) {
    return null;
  }
  
  // Get the lesson from vocab cards
  const lessonKey = lesson.lesson_id; // e.g., "U02_L01"
  const vocabLesson = vocabCards.lessons[lessonKey];
  
  if (!vocabLesson || !vocabLesson.items) {
    return null;
  }
  
  // Extract the IDs from the vocab card items
  const ids = vocabLesson.items.map(item => item.id);
  
  if (window.__DEV_AUDIT__) console.log(`✅ [VOCAB-TILE] Using actual vocab IDs from ${vocabCardsKey}.lessons.${lessonKey}:`, ids);
  
  return ids.length > 0 ? ids : null;
}

// ============================
// HELPER: Deep audit for vocab sources
// ============================

function findDuplicates(arr) {
  const seen = new Set();
  const dupes = new Set();
  (arr || []).forEach((id) => {
    if (!id) return;
    if (seen.has(id)) dupes.add(id);
    else seen.add(id);
  });
  return Array.from(dupes);
}

function compareIdSets(labelA, idsA, labelB, idsB) {
  const setA = new Set(idsA || []);
  const setB = new Set(idsB || []);
  const onlyA = Array.from(setA).filter((id) => !setB.has(id));
  const onlyB = Array.from(setB).filter((id) => !setA.has(id));
  return { labelA, labelB, onlyA, onlyB };
}

function auditVocabTileSources(lesson, unitId) {
  const auditEnabled = Boolean(window.__DEV_AUDIT__ || window.__VOCAB_AUDIT__);
  if (!auditEnabled) return;

  const lessonId = lesson?.lesson_id || "";
  const unitKey = String(unitId || "").toUpperCase().replace(/^U/, "");
  const vocabCardsKey = unitKey ? `VOCAB_CARDS_U${unitKey}` : null;
  const vocabCards = vocabCardsKey ? window[vocabCardsKey] : null;

  const lessonVocabIds = Array.isArray(lesson?.vocab_ids) ? lesson.vocab_ids : [];
  const vocabCardsLessonItems = vocabCards?.lessons?.[lessonId]?.items || [];
  const vocabCardsIds = vocabCardsLessonItems.map((item) => item?.id).filter(Boolean);
  const curriculumVocabIds = Object.keys(window.ACTIVE_CURRICULUM?.vocab || {});

  console.log("🧪 [VOCAB-AUDIT] lesson:", lessonId);
  console.log("🧪 [VOCAB-AUDIT] resolved vocabCards lesson items:", vocabCardsIds.length);
  console.log("🧪 [VOCAB-AUDIT] lesson.vocab_ids length:", lessonVocabIds.length, lessonVocabIds);
  console.log("🧪 [VOCAB-AUDIT] vocabCards key:", vocabCardsKey, "loaded:", Boolean(vocabCards), "frozen:", Object.isFrozen?.(vocabCards));
  console.log("🧪 [VOCAB-AUDIT] vocabCards lesson items:", vocabCardsIds.length, vocabCardsIds);
  console.log("🧪 [VOCAB-AUDIT] ACTIVE_CURRICULUM vocab count:", curriculumVocabIds.length);

  const dupesLesson = findDuplicates(lessonVocabIds);
  const dupesCards = findDuplicates(vocabCardsIds);
  const dupesCurriculum = findDuplicates(curriculumVocabIds);

  if (dupesLesson.length) console.warn("🧪 [VOCAB-AUDIT] Duplicate lesson.vocab_ids:", dupesLesson);
  if (dupesCards.length) console.warn("🧪 [VOCAB-AUDIT] Duplicate vocabCards IDs:", dupesCards);
  if (dupesCurriculum.length) console.warn("🧪 [VOCAB-AUDIT] Duplicate ACTIVE_CURRICULUM vocab IDs:", dupesCurriculum);

  const c1 = compareIdSets("lesson.vocab_ids", lessonVocabIds, "vocabCards", vocabCardsIds);
  const c2 = compareIdSets("vocabCards", vocabCardsIds, "ACTIVE_CURRICULUM.vocab", curriculumVocabIds);

  if (c1.onlyA.length || c1.onlyB.length) {
    console.warn("🧪 [VOCAB-AUDIT] Mismatch", c1.labelA, "vs", c1.labelB, c1);
  }
  if (c2.onlyA.length || c2.onlyB.length) {
    console.warn("🧪 [VOCAB-AUDIT] Mismatch", c2.labelA, "vs", c2.labelB, c2);
  }
}

/**
 * Render the Vocabulary tile
 * @param {Object} lesson - Lesson object
 */
export function renderVocabTile(lesson) {
  if (window.__DEV_AUDIT__) console.log('📘 renderVocabTile CALLED, lesson:', lesson?.lesson_id);
  
  const STATES = getStates();
  const tileContainer = getTileContainer();
  const CURRENT_UNIT_ID = window.CURRENT_UNIT_ID || '';
  
  // Track current lesson for POS game trigger
  window.currentLessonId = lesson?.lesson_id;
  
  clearTileContainer();
  
  // Clean up any orphaned modals
  cleanupModals();

  const r = resolveUIData(STATES.VOCAB, lesson);
  mergeMissingKeys(r.missingKeys);

  // Deep audit helpers (enable with window.__VOCAB_AUDIT__ = true)
  auditVocabTileSources(lesson, CURRENT_UNIT_ID);

  // ✅ FIX: Get actual vocab card IDs from vocab_cards_uXX.js (not from lessonpack)
  const actualLessonVocabIds = getActualLessonVocabIds(lesson, CURRENT_UNIT_ID);
  if (actualLessonVocabIds && actualLessonVocabIds.length > 0) {
    lesson.vocab_ids = actualLessonVocabIds;
  }

  // Get vocab items directly (no SmartLoad)
  const vocabData = getVocabForLesson(lesson);
  
  if (window.__DEV_AUDIT__) console.log('📊 vocabData:', {
    count: vocabData.count,
    lessonVocabIds: lesson?.vocab_ids,
    windowCurriculumVocab: Object.keys(window.ACTIVE_CURRICULUM?.vocab || {}).length
  });
  
  const title = createTileTitle("Tile 2 – Vocabulary");
  tileContainer.appendChild(title);

  // Get vocab card data for dialogue_ref lookup (U01_5_L01 -> U01_5, U02_L01 -> U02)
  const unitIdFromLesson = lesson?.lesson_id?.match(/^(U\d+(?:_\d+)?)/)?.[1] || null;
  const unitNum = CURRENT_UNIT_ID || unitIdFromLesson;
  const vocabCardsBundle = unitNum ? window['VOCAB_CARDS_' + unitNum] : null;

  // Vocab completion gate
  const lessonId = lesson?.lesson_id || '';
  const unitId = lessonId?.match(/^(U\d+(?:_\d+)?)/)?.[1] || (lessonId ? lessonId.split('_')[0] : null);
  const vocabCardsKey = unitId ? 'VOCAB_CARDS_' + unitId : null;
  const vocabCardsData = window[vocabCardsKey];

  // ==== DIALOGUE-FIRST VIEW (if lesson has dialogue data) ====
  const hasDialogueData = lesson?.lesson_dialogue?.dialogues?.length > 0;
  if (hasDialogueData) {
    const dialogueSection = renderDialogueFirstSection(lesson, vocabCardsBundle, lessonId);
    if (dialogueSection) tileContainer.appendChild(dialogueSection);
  }

  // Create vocab grid (collapsible when dialogue-first view is shown)
  const list = document.createElement("div");
  list.className = "vocab-list vocab-grid";

  // Display all vocab items
  const orderedVocab = vocabData.items;

  if (window.__DEV_AUDIT__ || window.__VOCAB_AUDIT__) {
    console.log("🧪 [VOCAB-AUDIT] orderedVocab length:", orderedVocab.length);
    console.log("🧪 [VOCAB-AUDIT] orderedVocab sample:", orderedVocab.slice(0, 3));
  }
  

  // Get vocab card data for dialogue_ref lookup — already resolved above as vocabCardsBundle

  // Reset speaker alignment tracking for fresh render
  _bubbleSpeakers.clear();
  _bubbleSpeakerCount = 0;

  // Batch vocab cards using DocumentFragment
  const vocabFragment = document.createDocumentFragment();

  orderedVocab.forEach((v) => {
    const dRef = v.dialogue_ref || (vocabCardsBundle?.getCardById?.(v.id))?.dialogue_ref;
    const cardCompleted = VocabCardRenderer.isCompleted(v.id);
    const targetWord = v.word || v.en || '';

    if (cardCompleted && dRef && dRef.bubble_text) {
      // Card disappears — show only the dialogue bubble (replacement, not card + bubble)
      const bubble = createDialogueBubble(dRef, vocabCardsBundle, v.id, targetWord);
      if (bubble) vocabFragment.appendChild(bubble);
    } else if (cardCompleted) {
      // Completed but no dialogue: compact "Done" chip (reopen on click)
      const chip = createCompletedChip(v);
      vocabFragment.appendChild(chip);
    } else {
      // Not completed: show the vocab card
      const card = createVocabCard(v, CURRENT_UNIT_ID);
      vocabFragment.appendChild(card);
    }
  });
  list.appendChild(vocabFragment);

  const hasVocabCards = typeof vocabCardsData?.getCardsForLesson === 'function'
    && vocabCardsData.getCardsForLesson(lessonId)?.length > 0;
  
  let btnNext;
  if (hasVocabCards) {
    btnNext = createVocabNextButton(lesson, lessonId, vocabCardsData, STATES, tileContainer);
  } else {
    // Check if this lesson has a dialogue
    const hasLessonDialogue = lesson?.lesson_dialogue?.dialogues?.length > 0;
    if (hasLessonDialogue) {
      btnNext = createButton("Next: Dialogue", () => transitionToTile(STATES.DIALOGUE));
    } else {
      btnNext = createButton("Next: Pattern", () => transitionToTile(STATES.PATTERN));
    }
  }

  // Append vocab grid (collapsible if dialogue-first view is active)
  if (hasDialogueData) {
    const gridWrapper = document.createElement('details');
    gridWrapper.className = 'vocab-grid-collapsible';
    const summary = document.createElement('summary');
    summary.innerHTML = `<span style="transition: transform 0.2s; display: inline-block;">▸</span> \u{1F4DA} All Vocabulary Cards (${orderedVocab.length})`;
    gridWrapper.addEventListener('toggle', () => {
      const arrow = summary.querySelector('span');
      if (arrow) arrow.style.transform = gridWrapper.open ? 'rotate(90deg)' : '';
    });
    gridWrapper.appendChild(summary);
    const gridInner = document.createElement('div');
    gridInner.className = 'vocab-grid-inner';
    gridInner.appendChild(list);
    gridWrapper.appendChild(gridInner);
    tileContainer.appendChild(gridWrapper);
  } else {
    tileContainer.appendChild(list);
  }
  tileContainer.appendChild(btnNext);

  // Listen for card completion events to update progress
  window.onVocabCardComplete = function(vocabId) {
    if (window.__DEV_AUDIT__) console.log(`✅ Card completed: ${vocabId}`);
    // Re-render vocab tile to update progress bar
    renderVocabTile(lesson);
  };

  // Refresh hook for modal close
  setupRefreshHook(lesson, lessonId, unitId);

  // Dev audit logging
  if (window.__DEV_AUDIT__) {
    console.log("=== Vocab Tile ===");
    console.log("   Vocab count:", vocabData.count);
  }
}

/**
 * Clean up orphaned modals
 */
function cleanupModals() {
  // Close any open vocab card modal
  const modalOverlay = document.querySelector('.vocab-modal-overlay.active');
  if (modalOverlay) {
    modalOverlay.remove();
  }
  
  // Remove orphaned modals
  document.querySelectorAll('.vocab-modal-overlay').forEach(modal => {
    if (modal !== document.querySelector('.vocab-modal-overlay.active')) {
      modal.remove();
    }
  });
}

/**
 * Create section header for vocab categories
 * @param {string} text - Header text
 * @param {number} count - Item count
 * @param {string} color - Border color
 * @returns {HTMLElement} Header element
 */
function createSectionHeader(text, count, color) {
  const header = document.createElement("div");
  header.className = "vocab-section-header";
  header.style.cssText = `grid-column:1/-1;padding:8px 0;margin:8px 0 4px;border-bottom:2px solid ${color};color:${color};font-weight:600;`;
  header.innerHTML = `${text} (${count})`;
  return header;
}

/**
 * Create a dialogue speech bubble element for the vocab grid.
 * Appears after a completed vocab card to show the unlocked dialogue line.
 * @param {Object} dialogueRef - dialogue_ref from the vocab card data
 * @param {Object} vocabCardsBundle - The VOCAB_CARDS_UXX object (has getDialogue)
 * @returns {HTMLElement|null} Bubble element or null
 */
// Track speakers to determine left/right alignment based on actual speaker identity
const _bubbleSpeakers = new Map(); // speaker name → 'left' | 'right'
let _bubbleSpeakerCount = 0;

function highlightTargetInBubble(text, targetWord) {
  if (!text || !targetWord || typeof text !== 'string' || typeof targetWord !== 'string') return text;
  const escaped = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('\\b(' + escaped + ')\\b', 'gi');
  return text.replace(re, '<span style="background:#fff59d;padding:2px 5px;border-radius:4px;font-weight:700;color:#e65100;">$1</span>');
}

function createDialogueBubble(dialogueRef, vocabCardsBundle, vocabId, targetWord) {
  const { dialogue_id, line_index, speaker, bubble_text } = dialogueRef;
  if (!bubble_text) return null;

  // Pull the Uzbek translation from the full dialogue data
  let lineUz = '';
  if (vocabCardsBundle?.getDialogue) {
    const dialogue = vocabCardsBundle.getDialogue(dialogue_id);
    const line = dialogue?.lines?.[line_index];
    if (line) lineUz = line.line_uz || '';
  }

  const displayText = targetWord ? highlightTargetInBubble(bubble_text, targetWord) : bubble_text;

  // Assign side by speaker identity (first speaker = left, second = right)
  const speakerName = speaker || '?';
  if (!_bubbleSpeakers.has(speakerName)) {
    _bubbleSpeakers.set(speakerName, _bubbleSpeakerCount % 2 === 0 ? 'left' : 'right');
    _bubbleSpeakerCount++;
  }
  const side = _bubbleSpeakers.get(speakerName);

  const bubble = document.createElement('div');
  bubble.className = `dialogue-bubble-card bubble-${side}`;

  // Speaker avatar initial
  const initial = speakerName.charAt(0).toUpperCase();

  bubble.innerHTML = `
    <div class="bubble-avatar dialogue-avatar ${side === 'left' ? 'speaker-a' : 'speaker-b'}">${initial}</div>
    <div class="bubble-body">
      <div class="bubble-speaker">${speakerName}</div>
      <div class="bubble-text-en">${displayText}</div>
      ${lineUz ? `<div class="bubble-text-uz">${lineUz}</div>` : ''}
    </div>
    ${vocabId ? `<button class="bubble-reopen" title="Re-practice this card">↩</button>` : ''}
  `;

  // Click the re-open arrow to re-practice the card
  if (vocabId) {
    const reopenBtn = bubble.querySelector('.bubble-reopen');
    if (reopenBtn) {
      reopenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        VocabCardRenderer.open(vocabId);
      });
    }
  }

  return bubble;
}

/**
 * Compact "Done" chip for completed vocab with no dialogue_ref.
 * Replaces the card so the list shows only one row per item; tap to reopen card.
 */
function createCompletedChip(v) {
  const chip = document.createElement("div");
  chip.className = "vocab-completed-chip";
  const word = v.word || v.en || '';
  chip.innerHTML = `
    <span class="chip-word">\u2713 ${escapeHtml(word)}</span>
    <span class="chip-hint">Tap to review</span>
  `;
  chip.onclick = () => VocabCardRenderer.open(v.id);
  return chip;
}

/**
 * Create a vocab card element
 * @param {Object} v - Vocab item
 * @param {string} unitId - Current unit ID
 * @returns {HTMLElement} Card element
 */
function createVocabCard(v, unitId) {
  const card = document.createElement("div");
  card.className = "vocab-card";
  
  // Standard border style
  card.style.borderLeft = "4px solid #2196f3";

  // Header with word and type
  const header = document.createElement("div");
  header.className = "vocab-word";

  const wordSpan = document.createElement("span");
  wordSpan.textContent = v.word || v.en || "";
  wordSpan.classList.add("tl-en");

  const typeSpan = document.createElement("span");
  typeSpan.className = "type";
  const posLabel = v.pos_uz || v.pos || v.type || "";
  typeSpan.textContent = posLabel ? " (" + posLabel + ")" : "";
  typeSpan.classList.add("tl-uz");
  if (v.pos) typeSpan.dataset.translation = "(" + v.pos + ")";

  header.appendChild(wordSpan);
  header.appendChild(typeSpan);

  // Details section
  const details = document.createElement("div");
  details.className = "vocab-details";

  // Image if exists
  if (v.image_placeholder) {
    const img = document.createElement("img");
    img.className = "vocab-image";
    img.src = "images/" + v.image_placeholder + ".png";
    img.alt = v.word || v.en || "";
    img.onerror = function() { this.style.display = 'none'; };
    details.appendChild(img);
  }

  // Context sentences
  const metaContext = Array.isArray(v.meta_uz_context) ? v.meta_uz_context : 
                      (v.meta_uz_context ? [v.meta_uz_context] : []);
  const metaEnContext = Array.isArray(v.meta_en_context) ? v.meta_en_context :
                        (v.meta_en_context ? [v.meta_en_context] : []);

  if (metaContext.length > 0) {
    const ctxList = document.createElement("ul");
    ctxList.className = "vocab-uz tl-uz";
    const translation = metaEnContext.length > 0 ? metaEnContext.join("; ") : (v.en || v.word);
    if (translation) ctxList.dataset.translation = translation;

    metaContext.forEach((line, idx) => {
      const li = document.createElement("li");
      li.textContent = line;
      if (metaEnContext[idx]) li.dataset.translation = metaEnContext[idx];
      ctxList.appendChild(li);
    });

    details.appendChild(ctxList);
  }

  // Interactive card handling
  setupCardInteraction(card, v, details, header, unitId);

  card.appendChild(header);
  card.appendChild(details);
  
  return card;
}

/**
 * Setup interactive card click handling
 * @param {HTMLElement} card - Card element
 * @param {Object} v - Vocab item
 * @param {HTMLElement} details - Details element
 * @param {HTMLElement} header - Header element
 * @param {string} unitId - Unit ID
 */
function setupCardInteraction(card, v, details, header, unitId) {
  const vocabDataForUnit = window['VOCAB_CARDS_' + unitId];

  // If vocab card data bundle is missing, show a friendly notice and skip interactive open
  if (!vocabDataForUnit) {
    card.classList.add('non-interactive');
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const msg = document.createElement('div');
      msg.style.cssText = "position:fixed;bottom:20px;right:20px;background:#fff;border:2px solid #2196f3;border-radius:8px;padding:12px 16px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:1000;max-width:320px;font-size:13px;color:#333;";
      msg.innerHTML = "<strong>Vocabulary cards not loaded</strong><br>Interactive vocab cards are not available in this build.";
      document.body.appendChild(msg);
      setTimeout(() => { if (msg.parentElement) msg.remove(); }, 4000);
    });
    return;
  }
  
  // Resolve vocab ID (handle refs)
  const vocabCardRaw = vocabDataForUnit?.getCardById?.(v.id) || null;
  const vocabCardResolved = vocabCardRaw && vocabDataForUnit?.resolveRef 
    ? vocabDataForUnit.resolveRef(vocabCardRaw) 
    : vocabCardRaw;
  
  const targetVocabId = (vocabCardRaw?.ref_id || vocabCardRaw?.ref) ||
                        vocabCardResolved?._resolved_from || v.id;

  const vocabCardExists = !!(vocabDataForUnit?.getCardById?.(targetVocabId));
  const hasInteractive = (VocabCardRenderer.hasInteractiveData(targetVocabId)) ||
                         !!vocabCardResolved || vocabCardExists;
  
  // Always make cards clickable
  card.classList.add('interactive');
  
  // Check completion state
  const isCompleted = VocabCardRenderer.isCompleted(v.id);
  if (isCompleted) {
    card.classList.add('completed');
    addSRSBadge(details, v.id);
  }
  
  // Click handler
  card.addEventListener("click", (e) => {
    e.stopPropagation();
    
    // Resolve recycled IDs
    let vocabIdToOpen = targetVocabId;
    if (String(vocabIdToOpen).startsWith('V_RECYCLED_')) {
      const wordName = String(vocabIdToOpen).replace('V_RECYCLED_', '');
      const possibleId = 'V_' + wordName;
      if (vocabDataForUnit?.getCardById?.(possibleId)) {
        vocabIdToOpen = possibleId;
      }
    }
    
    if (window.__DEV_AUDIT__) console.log('📘 Vocab card clicked:', vocabIdToOpen);
    VocabCardRenderer.open(vocabIdToOpen);
  });
}

/**
 * Add SRS status badge to card
 * @param {HTMLElement} details - Details element
 * @param {string} vocabId - Vocab ID
 */
function addSRSBadge(details, vocabId) {
  if (!window.VocabSRS) return;
  
  const srsData = window.VocabSRS.getCardData(vocabId);
  if (!srsData) return;
  
  const statusBadge = document.createElement('div');
  statusBadge.className = 'srs-status-badge';
  statusBadge.style.cssText = 'font-size:0.75rem;padding:3px 6px;border-radius:4px;margin-top:6px;text-align:center;';
  
  if (srsData.isDue) {
    statusBadge.style.background = '#ff5722';
    statusBadge.style.color = '#fff';
    statusBadge.textContent = '🔥 Review now';
  } else if (srsData.daysUntilDue <= 1) {
    statusBadge.style.background = '#ff9800';
    statusBadge.style.color = '#fff';
    statusBadge.textContent = '⏱ Due tomorrow';
  } else {
    statusBadge.style.background = '#4caf50';
    statusBadge.style.color = '#fff';
    statusBadge.textContent = `✓ Next: ${srsData.dueDate}`;
  }
  
  details.appendChild(statusBadge);
}

/**
 * Create the Next button with progress tracking
 * @param {Object} lesson - Lesson object
 * @param {string} lessonId - Lesson ID
 * @param {Object} vocabCardsData - Vocab cards data
 * @param {Object} STATES - States constants
 * @param {HTMLElement} tileContainer - Container element
 * @returns {HTMLElement} Button element
 */
function createVocabNextButton(lesson, lessonId, vocabCardsData, STATES, tileContainer) {
  const totalCards = vocabCardsData.getCardsForLesson(lessonId).length;
  const completedCards = VocabCardRenderer.getCompletedCount(lessonId) || 0;
  const allComplete = completedCards >= totalCards;
  
  // Progress indicator
  const progressDiv = document.createElement("div");
  progressDiv.className = "vocab-progress";
  progressDiv.style.cssText = "text-align:center;padding:12px;margin:16px 0;background:#f5f5f5;border-radius:8px;";
  progressDiv.innerHTML = `
    <div style="font-size:0.9rem;color:#666;margin-bottom:8px;">
      So'zlar: <strong>${completedCards}</strong> / ${totalCards}
    </div>
    <div style="height:8px;background:#ddd;border-radius:4px;overflow:hidden;">
      <div style="height:100%;width:${(completedCards/totalCards)*100}%;background:var(--success-green);transition:width 0.3s;"></div>
    </div>
  `;
  progressDiv.querySelector('div').dataset.translation = `Words: ${completedCards} / ${totalCards}`;
  tileContainer.appendChild(progressDiv);
  
  // Determine next state: DIALOGUE if lesson has dialogue data, else PATTERN
  const hasDialogue = lesson?.lesson_dialogue?.dialogues?.length > 0;
  const nextState = hasDialogue ? STATES.DIALOGUE : STATES.PATTERN;
  const nextLabel = hasDialogue ? "Next: Dialogue ✓" : "Next: Pattern ✓";

  const btnNext = createButton(
    allComplete ? nextLabel : `So'zlarni o'rganing (${completedCards}/${totalCards})`,
    () => {
      if (allComplete) {
        transitionToTile(nextState);
      } else {
        handleIncompleteVocab(lesson, lessonId, vocabCardsData, completedCards);
      }
    }
  );
  
  if (!allComplete) {
    btnNext.style.background = '#ff9800';
    btnNext.dataset.translation = `Learn words (${completedCards}/${totalCards})`;
  }
  
  return btnNext;
}

/**
 * Handle click when vocab is incomplete
 * @param {Object} lesson - Lesson object
 * @param {string} lessonId - Lesson ID
 * @param {Object} vocabCardsData - Vocab cards data
 * @param {number} completedCards - Number of completed cards
 */
function handleIncompleteVocab(lesson, lessonId, vocabCardsData, completedCards) {
  // POS Speed Game trigger (using AppState)
  const hasPOSGameShown = window.StateActions?.isPOSGameShown?.(lessonId) || false;
  if (completedCards >= 6 && !hasPOSGameShown) {
    window.StateActions?.markPOSGameShown?.(lessonId);
    if (typeof window.openPOSSpeedGameModal === 'function') {
      window.openPOSSpeedGameModal(lesson);
    }
    return;
  }
  
  // SRS warm-up: Prioritize due cards
  let cardToOpen = null;
  
  if (window.VocabSRS) {
    const dueCards = window.VocabSRS.getDueCards();
    const cards = vocabCardsData.getCardsForLesson(lessonId);
    const dueCardInLesson = cards.find(c => dueCards.some(dc => dc.vocabId === c.id));
    if (dueCardInLesson) {
      cardToOpen = dueCardInLesson;
      console.log('[SRS Warm-up] Opening due card:', cardToOpen.id);
    }
  }
  
  // Find first incomplete card
  if (!cardToOpen) {
    const cards = vocabCardsData.getCardsForLesson(lessonId);
    cardToOpen = cards.find(c => !VocabCardRenderer.isCompleted(c.id));
  }
  
  if (cardToOpen) {
    VocabCardRenderer.open(cardToOpen.id);
  }
}

/**
 * Setup refresh hook for modal close
 * @param {Object} lesson - Lesson object
 * @param {string} lessonId - Lesson ID
 * @param {string} unitId - Unit ID
 */
function setupRefreshHook(lesson, lessonId, unitId) {
  window.refreshVocabGrid = () => {
    // POS Speed Game auto-trigger check
    if (VocabCardRenderer) {
      const currentCompleted = VocabCardRenderer.getCompletedCount(lessonId);
      const hasPOSGameShown = window.StateActions?.isPOSGameShown?.(lessonId) || false;
      
      console.log('[POS Game Check] Unit:', unitId, '| Lesson:', lessonId);
      console.log('[POS Game Check] Completed:', currentCompleted, '| Already shown:', hasPOSGameShown);
      
      if (currentCompleted >= 6 && !hasPOSGameShown) {
        console.log('[POS Game] 🎮 Triggering game at', currentCompleted, 'cards!');
        window.StateActions?.markPOSGameShown?.(lessonId);
        
        // Re-render first, then show game
        renderVocabTile(lesson);
        
        setTimeout(() => {
          if (typeof window.openPOSSpeedGameModal === 'function') {
            window.openPOSSpeedGameModal(lesson);
          }
        }, 600);
        return;
      }
    }
    
    // Normal refresh
    renderVocabTile(lesson);
  };
}

// ============================
// SANDWICH TECHNIQUE (v2.5): Dialogue-first, then vocab by line
// ============================
let sandwichFluencyMode = 'full'; // 'full' | 'faded' | 'blind'

function getUnlockedBubblesSet() {
  try {
    const raw = localStorage.getItem('unlockedBubbles') || '[]';
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (e) {
    return new Set();
  }
}

/**
 * Escape special regex characters in a string for use in RegExp.
 * @param {string} s
 * @returns {string}
 */
function escapeRegex(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get lesson items whose target vocab (en) appears in the line text (word-boundary, case-insensitive).
 * Used for Sandwich: clickability and which cards to open. De-duplicates by item id.
 * @param {Object} bundle - VOCAB_CARDS_* bundle
 * @param {string} lessonId - e.g. "U02_L01"
 * @param {string} lineText - English line text, e.g. "Good morning! Do you wake up early?"
 * @returns {Object[]} Items with matching en in lineText (order: first occurrence in line, then stable by id)
 */
function getCardsForLineByText(bundle, lessonId, lineText) {
  const items = bundle?.lessons?.[lessonId]?.items;
  if (!Array.isArray(items) || typeof lineText !== 'string' || !lineText.trim()) return [];
  const seen = new Set();
  const matched = [];
  for (const item of items) {
    const en = item?.en;
    if (!en || typeof en !== 'string' || seen.has(item.id)) continue;
    const pattern = '\\b' + escapeRegex(en.trim()) + '\\b';
    try {
      const re = new RegExp(pattern, 'i');
      if (re.test(lineText)) {
        seen.add(item.id);
        matched.push(item);
      }
    } catch (_) {
      // invalid regex skip
    }
  }
  return matched;
}

/**
 * Get lesson items that reference a specific dialogue line (for progress/unlock semantics).
 * @param {Object} bundle - VOCAB_CARDS_* bundle
 * @param {string} lessonId - e.g. "U02_L01"
 * @param {string} dialogueId - e.g. "U02_L01_D01"
 * @param {number} lineIndex - 0-based line index
 * @returns {Object[]} Items with matching dialogue_ref
 */
function getCardsForLine(bundle, lessonId, dialogueId, lineIndex) {
  const items = bundle?.lessons?.[lessonId]?.items;
  if (!Array.isArray(items)) return [];
  return items.filter(item => {
    const ref = item.dialogue_ref;
    return ref && ref.dialogue_id === dialogueId && ref.line_index === lineIndex;
  });
}

/**
 * Render Sandwich dialogue tile: bilingual dialogue, clickable lines → vocab session.
 * Supports single source_dialogue (string) or multiple (array). No-cards lines are non-clickable.
 * Gated by lesson.version === "2.5" and lesson.source_dialogue.
 * @param {Object} lesson - Lesson with version, source_dialogue, lesson_id
 */
export function renderSandwichDialogueTile(lesson) {
  const STATES = getStates();
  const tileContainer = getTileContainer();
  if (!tileContainer) return;

  if (typeof window._sandwichUnsubscribe === 'function') {
    window._sandwichUnsubscribe();
    window._sandwichUnsubscribe = null;
  }
  clearTileContainer();
  cleanupModals();
  window.currentSandwichLesson = lesson;

  const lessonId = lesson?.lesson_id || '';
  const unitId = lessonId?.match(/^(U\d+(?:_\d+)?)/)?.[1] || lessonId?.split('_')[0] || '';
  const vocabCardsKey = unitId ? 'VOCAB_CARDS_' + unitId : null;
  const bundle = vocabCardsKey ? window[vocabCardsKey] : null;
  const dialogueIds = Array.isArray(lesson.source_dialogue)
    ? lesson.source_dialogue.filter(Boolean)
    : (lesson.source_dialogue ? [lesson.source_dialogue] : []);

  const dialogues = dialogueIds
    .map(id => ({ id, dialogue: bundle?.dialogues?.[id] }))
    .filter(({ dialogue }) => dialogue && Array.isArray(dialogue.lines));

  if (dialogues.length === 0) {
    tileContainer.innerHTML = '<div class="feedback err">Dialogue not found for this lesson.</div>';
    const btn = createButton('Back to vocabulary', () => {
      if (typeof window.renderVocabTile === 'function') window.renderVocabTile(lesson);
    });
    tileContainer.appendChild(btn);
    return;
  }

  const unlockedSet = getUnlockedBubblesSet();
  const isFaded = sandwichFluencyMode === 'faded';
  const isBlind = sandwichFluencyMode === 'blind';

  const title = createTileTitle('Tile 2 – Dialogue (Sandwich)');
  tileContainer.appendChild(title);

  const wrapper = document.createElement('div');
  wrapper.className = 'dialogue-vanishing-script sandwich-dialogue-wrapper';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'Dialogue lines for vocabulary practice');
  if (isFaded) wrapper.classList.add('dialogue-vanishing-faded');
  if (isBlind) wrapper.classList.add('dialogue-vanishing-blind');

  const fluencyRow = document.createElement('div');
  fluencyRow.className = 'fluency-controls';
  fluencyRow.setAttribute('aria-label', 'Script visibility');
  fluencyRow.innerHTML = `
    <span class="fluency-label">Script:</span>
    <button type="button" class="fluency-btn" data-mode="full" aria-pressed="${sandwichFluencyMode === 'full'}">Full</button>
    <button type="button" class="fluency-btn" data-mode="faded" aria-pressed="${sandwichFluencyMode === 'faded'}">Faded</button>
    <button type="button" class="fluency-btn" data-mode="blind" aria-pressed="${sandwichFluencyMode === 'blind'}">Blind</button>
  `;
  fluencyRow.querySelectorAll('.fluency-btn').forEach(btn => {
    const mode = btn.getAttribute('data-mode');
    if (mode === sandwichFluencyMode) btn.classList.add('active');
    btn.setAttribute('aria-pressed', mode === sandwichFluencyMode ? 'true' : 'false');
    btn.onclick = () => {
      sandwichFluencyMode = mode;
      renderSandwichDialogueTile(lesson);
    };
  });
  wrapper.appendChild(fluencyRow);

  let totalLinesWithCards = 0;
  let masteredCount = 0;
  dialogues.forEach(({ id: dialogueId, dialogue }) => {
    dialogue.lines.forEach((line, idx) => {
      if (getCardsForLineByText(bundle, lessonId, line.line || '').length > 0) {
        totalLinesWithCards++;
        if (unlockedSet.has(`${dialogueId}_${idx}`)) masteredCount++;
      }
    });
  });
  if (totalLinesWithCards > 0) {
    const progressEl = document.createElement('div');
    progressEl.className = 'sandwich-progress';
    progressEl.setAttribute('aria-live', 'polite');
    progressEl.textContent = `${masteredCount} of ${totalLinesWithCards} lines mastered`;
    wrapper.appendChild(progressEl);
  }

  dialogues.forEach(({ id: dialogueId, dialogue }) => {
    const section = document.createElement('section');
    section.className = 'sandwich-dialogue-section';
    section.setAttribute('role', 'region');
    section.setAttribute('aria-label', dialogue.title || dialogueId);

    const sectionHeading = document.createElement('h2');
    sectionHeading.className = 'sandwich-dialogue-section-title';
    sectionHeading.textContent = dialogue.title || dialogueId;
    section.appendChild(sectionHeading);

    const linesEl = document.createElement('div');
    linesEl.className = 'sandwich-dialogue-lines';

    const sandwichSpeakerSet = new Set();
    dialogue.lines.forEach((line, idx) => {
      const unlockId = `${dialogueId}_${idx}`;
      const mastered = unlockedSet.has(unlockId);
      const cardsForLine = getCardsForLineByText(bundle, lessonId, line.line || '');
      const hasCards = cardsForLine.length > 0;
      const speaker = line.speaker || '?';
      sandwichSpeakerSet.add(speaker);
      const spkList = [...sandwichSpeakerSet];
      const isLeft = spkList.indexOf(speaker) % 2 === 0;

      const lineDiv = document.createElement('div');
      lineDiv.className = 'sandwich-dialogue-line';
      lineDiv.classList.add(isLeft ? 'sandwich-line-left' : 'sandwich-line-right');
      lineDiv.setAttribute('data-line-index', String(idx));
      lineDiv.setAttribute('data-dialogue-id', dialogueId);

      const speakerSpan = document.createElement('span');
      speakerSpan.className = 'sandwich-line-speaker';
      speakerSpan.textContent = line.speaker || '?';
      lineDiv.appendChild(speakerSpan);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'sandwich-line-bubble';
      const englishHtml = (typeof window.highlightGrammarFocus === 'function' && bundle.grammar_focus)
        ? window.highlightGrammarFocus(line.line || '', bundle.grammar_focus)
        : escapeHtml(line.line || '');
      const linePreview = (line.line || '').slice(0, 40) + ((line.line || '').length > 40 ? '…' : '');

      if (mastered) {
        contentDiv.classList.add('sandwich-line-mastered');
        contentDiv.innerHTML = `<div class="dialogue-line-english">${englishHtml}</div>`;
      } else if (!hasCards) {
        contentDiv.classList.add('sandwich-line-no-vocab');
        contentDiv.setAttribute('aria-label', 'Context only; no vocabulary for this line');
        contentDiv.innerHTML = `
          <div class="dialogue-line-english">${englishHtml}</div>
          <div class="dialogue-line-uzbek sandwich-hint">${escapeHtml(line.line_uz || '')}</div>
          <div class="sandwich-no-vocab-hint">Context only — no vocabulary for this line</div>
        `;
      } else {
        contentDiv.classList.add('sandwich-line-clickable');
        contentDiv.setAttribute('role', 'button');
        contentDiv.setAttribute('tabindex', '0');
        contentDiv.setAttribute('aria-label', `Learn vocabulary for this line: ${escapeHtml(linePreview)}`);
        contentDiv.innerHTML = `
          <div class="dialogue-line-english">${englishHtml}</div>
          <div class="dialogue-line-uzbek sandwich-hint">${escapeHtml(line.line_uz || '')}</div>
          <div class="sandwich-learn-hint">Click or press Enter to learn vocabulary for this line</div>
        `;
        contentDiv.onclick = () => {
          window._sandwichSessionActive = true;
          const cardIds = cardsForLine.map(c => c.id);
          if (typeof VocabCardRenderer.startSessionForLine === 'function') {
            VocabCardRenderer.startSessionForLine(dialogueId, idx, cardIds);
          }
        };
        contentDiv.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            contentDiv.click();
          }
        };
      }
      lineDiv.appendChild(contentDiv);
      linesEl.appendChild(lineDiv);
    });

    section.appendChild(linesEl);
    wrapper.appendChild(section);
  });

  tileContainer.appendChild(wrapper);

  const nextBtn = createButton('Next: Dialogue practice', () => transitionToTile(STATES.DIALOGUE));
  tileContainer.appendChild(nextBtn);

  const onLineMastered = () => {
    if (window.currentSandwichLesson?.lesson_id === lesson.lesson_id) {
      renderSandwichDialogueTile(window.currentSandwichLesson);
    }
  };
  window.addEventListener('sandwichLineMastered', onLineMastered);
  window._sandwichUnsubscribe = () => window.removeEventListener('sandwichLineMastered', onLineMastered);
}

function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

// ============================
// DIALOGUE-FIRST VIEW (Merged Sandwich: UZ-first + Mirror Toggle)
// ============================

/**
 * Render dialogue lines in Uzbek-first format with per-line mirror toggles
 * and clickable vocabulary practice. Implements RULE E11 mirror mode.
 * 
 * REDESIGNED: Progressive disclosure — each dialogue is a collapsible card.
 * Only the first incomplete dialogue opens by default. Completed dialogues
 * show a green badge. Lines with vocab are clickable with a word-count badge.
 *
 * @param {Object} lesson - Full lesson object
 * @param {Object|null} vocabCardsBundle - VOCAB_CARDS_UXX bundle
 * @param {string} lessonId - e.g. "U02_L01"
 * @returns {HTMLElement|null} Section element or null if no dialogue data
 */
function renderDialogueFirstSection(lesson, vocabCardsBundle, lessonId) {
  const dialogueData = lesson?.lesson_dialogue;
  if (!dialogueData?.dialogues?.length) return null;

  const section = document.createElement('div');
  section.className = 'vocab-dialogue-first';

  // Instruction banner
  const instr = document.createElement('div');
  instr.className = 'vocab-dialogue-instruction tl-uz';
  instr.textContent = "\u{1F4D6} Suhbatni o\u2018qing \u2014 so\u2018zlarni bosib o\u2018rganing";
  instr.dataset.translation = 'Read the dialogue \u2014 tap highlighted lines to learn vocabulary';
  section.appendChild(instr);

  // Track which is the first dialogue with unlearned words (auto-open it)
  let firstIncompleteFound = false;

  dialogueData.dialogues.forEach((dialogue, dIdx) => {
    const dialogueId = dialogue.id || `${lessonId}_D${String(dIdx + 1).padStart(2, '0')}`;
    const turns = dialogue.turns || dialogue.lines || [];

    // Calculate progress for this dialogue
    let totalVocabLines = 0;
    let masteredLines = 0;
    turns.forEach((turn) => {
      const turnTextEn = turn.text || turn.text_en || turn.line || '';
      const cardsForLine = vocabCardsBundle
        ? getCardsForLineByText(vocabCardsBundle, lessonId, turnTextEn)
        : [];
      if (cardsForLine.length > 0) {
        totalVocabLines++;
        const allDone = cardsForLine.every(c => VocabCardRenderer.isCompleted(c.id));
        if (allDone) masteredLines++;
      }
    });

    const isDialogueComplete = totalVocabLines > 0 && masteredLines >= totalVocabLines;
    const shouldAutoOpen = !firstIncompleteFound && !isDialogueComplete;
    if (shouldAutoOpen) firstIncompleteFound = true;

    // Build collapsible dialogue card
    const details = document.createElement('details');
    details.className = 'dialogue-stage-card';
    if (shouldAutoOpen) details.open = true;

    // Header (summary)
    const summary = document.createElement('summary');
    summary.className = 'dialogue-stage-header';

    // Stage badge
    const badge = document.createElement('span');
    badge.className = 'dialogue-stage-badge' + (isDialogueComplete ? ' completed' : '');
    badge.textContent = `${dIdx + 1}/${dialogueData.dialogues.length}`;
    summary.appendChild(badge);

    // Title
    const titleSpan = document.createElement('span');
    titleSpan.className = 'dialogue-stage-title';
    titleSpan.textContent = dialogue.context_en || dialogue.title || dialogueId;
    summary.appendChild(titleSpan);

    // Progress indicator
    if (totalVocabLines > 0) {
      const prog = document.createElement('span');
      prog.className = 'dialogue-stage-progress';
      const pctVal = Math.round((masteredLines / totalVocabLines) * 100);
      prog.innerHTML = `
        <span class="dialogue-stage-progress-bar">
          <span class="dialogue-stage-progress-fill" style="width:${pctVal}%"></span>
        </span>
        ${masteredLines}/${totalVocabLines}`;
      summary.appendChild(prog);
    }

    details.appendChild(summary);

    // Body — dialogue lines
    const body = document.createElement('div');
    body.className = 'dialogue-stage-body';

    // Context line
    if (dialogue.context_uz || dialogue.context_en) {
      const ctx = document.createElement('div');
      ctx.className = 'dialogue-context tl-uz';
      ctx.innerHTML = `<span>\u{1F4CD}</span> <span>${escapeHtml(dialogue.context_uz || dialogue.context_en)}</span>`;
      if (dialogue.context_en) ctx.dataset.translation = dialogue.context_en;
      body.appendChild(ctx);
    }

    // Render each turn as a chat bubble
    const speakerSet = new Set();
    turns.forEach((turn, tIdx) => {
      const turnTextEn = turn.text || turn.text_en || turn.line || '';
      const turnTextUz = turn.text_uz || turn.line_uz || '';
      const speaker = turn.speaker || '?';
      speakerSet.add(speaker);
      const speakerList = [...speakerSet];
      const speakerIndex = speakerList.indexOf(speaker);
      const isLeft = speakerIndex % 2 === 0;

      // Match vocab cards to this line's English text
      const cardsForLine = vocabCardsBundle
        ? getCardsForLineByText(vocabCardsBundle, lessonId, turnTextEn)
        : [];
      const hasCards = cardsForLine.length > 0;

      // Build mirror HTML from structured target array or fallback
      const mirrorHtml = buildMirrorHtml({
        target: turn.target,
        syntax_scaffold: null,
        text_uz: turnTextUz,
        text_en: turnTextEn
      });

      // Line container
      const lineEl = document.createElement('div');
      lineEl.className = 'dialogue-line-row' + (isLeft ? '' : ' line-right');
      lineEl.style.animationDelay = `${tIdx * 0.05}s`;

      // Avatar
      const avatar = document.createElement('div');
      avatar.className = 'dialogue-avatar ' + (isLeft ? 'speaker-a' : 'speaker-b');
      avatar.textContent = speaker.charAt(0).toUpperCase();
      lineEl.appendChild(avatar);

      // Speech bubble
      const bubble = document.createElement('div');
      bubble.className = 'dialogue-bubble' + (hasCards ? ' has-vocab' : '');

      // Speaker label
      const speakerEl = document.createElement('div');
      speakerEl.className = 'dialogue-bubble-speaker';
      speakerEl.textContent = speaker;
      bubble.appendChild(speakerEl);

      // Three text layers: UZ (default visible) / Mirror / EN
      const { container: textFrag, layers } = createTextLayers({
        text_en: turnTextEn,
        text_uz: turnTextUz,
        mirrorHtml,
        initialState: LANG_STATES.UZ
      });
      bubble.appendChild(textFrag);

      // Per-line UZ / 🪞 / EN toggle
      const hasMirrorData = turn.target && Array.isArray(turn.target) && turn.target.length > 0;
      const toggle = createLineMirrorToggle({
        initialState: LANG_STATES.UZ,
        mirrorEnabled: hasMirrorData,
        onChange: (newState) => setLayerVisibility(layers, newState)
      });
      bubble.appendChild(toggle);

      // Word count badge for clickable lines
      if (hasCards) {
        const allDone = cardsForLine.every(c => VocabCardRenderer.isCompleted(c.id));
        const badge2 = document.createElement('div');
        badge2.className = 'dialogue-vocab-badge';
        badge2.textContent = allDone
          ? `\u2705 ${cardsForLine.length} word${cardsForLine.length > 1 ? 's' : ''} learned`
          : `\u{1F4DD} ${cardsForLine.length} word${cardsForLine.length > 1 ? 's' : ''} to learn`;
        if (allDone) badge2.style.color = '#16a34a';
        bubble.appendChild(badge2);

        // Click → open vocab card session for this line
        bubble.addEventListener('click', (e) => {
          if (e.target.closest('.line-mirror-toggle')) return;
          const cardIds = cardsForLine.map(c => c.id);
          if (typeof VocabCardRenderer.startSessionForLine === 'function') {
            VocabCardRenderer.startSessionForLine(dialogueId, tIdx, cardIds);
          }
        });
      }

      lineEl.appendChild(bubble);
      body.appendChild(lineEl);
    });

    details.appendChild(body);
    section.appendChild(details);
  });

  return section;
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
if (typeof window !== 'undefined') {
  window.renderVocabTile = renderVocabTile;
  window.renderSandwichDialogueTile = renderSandwichDialogueTile;
}
