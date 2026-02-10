/**
 * Controlled Practice Tile (Tile 6)
 * ==================================
 * Multi-stage controlled practice with gap-fill and reorder exercises.
 * Stages: GAP → REORDER
 *
 * @module src/tiles/controlled-tile
 * @version 2.1.0 (Simplified stages)
  getTileContainer,
  createButton,
  setState,
  STATES,
  awardPoints,
  addMaxScore,
  playSound
} from './tile-utils.js';

// ============================
// HELPER BRIDGE FUNCTIONS
// These delegate to app.js for complex logic
// ============================

/**
 * Get CONTROLLED_STAGES constant
 */
function getControlledStages() {
  return window.CONTROLLED_STAGES || ["GAP", "REORDER"];
}

/**
 * Get current controlled stage index
 */
function getControlledStageIndex() {
  return typeof window.controlledStageIndex === 'number' ? window.controlledStageIndex : 0;
}

/**
 * Set controlled stage index
 */
function setControlledStageIndex(val) {
  window.controlledStageIndex = val;
  if (window.GameState) {
    window.GameState.controlledStage = val;
  }
}

/**
 * Load stage progress from session storage
 */
function loadControlledStageProgress() {
  if (typeof window._loadControlledStageProgress === 'function') {
    window._loadControlledStageProgress();
  }
}

/**
 * Save stage progress to session storage
 */
function saveControlledStageProgress() {
  if (typeof window._saveControlledStageProgress === 'function') {
    window._saveControlledStageProgress();
  }
}

/**
 * Reset stage progress
 */
function resetControlledStageProgress() {
  if (typeof window._resetControlledStageProgress === 'function') {
    window._resetControlledStageProgress();
  } else {
    setControlledStageIndex(0);
    saveControlledStageProgress();
  }
}

/**
 * Build controlled items for lesson
 */
function buildControlledItemsForLesson(lesson, stageName) {
  if (typeof window.buildControlledItemsForLesson === 'function') {
    return window.buildControlledItemsForLesson(lesson, stageName);
  }
  return [];
}

/**
 * Get controlled practice settings (default values)
 */
function getControlledSettings(lesson, stageName) {
  return {
    itemCount: 6,
    loadScore: 50,
    showPreview: stageName === "GAP"
  };
}

/**
 * Add grammar hover to element
 */
function addGrammarHover(element, pattern, lesson) {
  if (typeof window.addGrammarHover === 'function') {
    window.addGrammarHover(element, pattern, lesson);
  }
}

/**
 * Normalize token for comparison
 */
function _normToken(s) {
  if (typeof window._normToken === 'function') {
    return window._normToken(s);
  }
  return String(s || '').toLowerCase().trim().replace(/[.?!,;:'"]+$/g, '');
}

/**
 * Normalize text for comparison
 */
function _normText(s) {
  if (typeof window._normText === 'function') {
    return window._normText(s);
  }
  return String(s || '').toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.?!,;:'"]+$/g, '');
}

/**
 * Track token usage for adaptive exercises
 */
function _trackTokenUsage(token, isCorrect) {
  if (typeof window._trackTokenUsage === 'function') {
    window._trackTokenUsage(token, isCorrect);
  }
}

/**
 * Get Uzbek fail remark for stage
 */
function _uzFailRemarkForStage(stageName) {
  const remarks = {
    "GAP": "Qayta urinib ko'ring. To'g'ri so'zni toping.",
    "REORDER": "Tartibni tekshiring. Gapni to'g'ri tuzing."
  };
  return remarks[stageName] || "Kamida 80% to'g'ri bo'lishi kerak.";
}

// ============================
// MAIN RENDER FUNCTION
// ============================

/**
 * Render the Controlled Practice tile
 * Multi-stage: GAP → REORDER
 * 
 * @param {Object} lesson - Lesson data object
 */
export function renderControlledTile(lesson) {
  clearTileContainer();
  const tileContainer = getTileContainer();

  // Load stage progress for current lesson
  loadControlledStageProgress();

  const CONTROLLED_STAGES = getControlledStages();
  const totalStages = CONTROLLED_STAGES.length;
  let controlledStageIndex = getControlledStageIndex();
  let currentStageIdx = Math.min(controlledStageIndex, totalStages - 1);
  let stageName = CONTROLLED_STAGES[currentStageIdx] || "GAP";

  // Get controlled practice settings
  const settings = getControlledSettings(lesson, stageName);
  let items = buildControlledItemsForLesson(lesson, stageName);

  // --- SRS INJECTION POINT ---
  if (window.VocabSRS && stageName === "REORDER") {
    const state = typeof window.getCompletionState === 'function' ? window.getCompletionState() : {};
    const allCompletedIds = Object.keys(state).filter(id => state[id] === true);
    
    const unitId = lesson.lesson_id?.match(/^(U\d+(?:_\d+)?)/)?.[1] || (lesson.lesson_id ? lesson.lesson_id.split('_')[0] : null);
    const vocabCardsKey = unitId ? 'VOCAB_CARDS_' + unitId : null;
    const vocabData = window[vocabCardsKey];
    
    const currentLessonItems = vocabData && vocabData.getCardsForLesson 
      ? vocabData.getCardsForLesson(lesson.lesson_id).map(c => c.id) 
      : [];
    
    const candidateIds = allCompletedIds.filter(id => !currentLessonItems.includes(id));
    const dueIds = window.VocabSRS.getDueItems(candidateIds);
    
    if (dueIds.length > 0) {
      const targetSRSCount = Math.min(3, Math.ceil(items.length * 0.25));
      const srsIds = dueIds.slice(0, targetSRSCount);
      
      srsIds.forEach(id => {
        let card = null;
        for (let u = 1; u <= 7; u++) {
          const key = 'VOCAB_CARDS_U0' + u;
          if (window[key] && window[key].getCardById) {
            card = window[key].getCardById(id);
            if (card) break;
          }
        }
        if (card) {
          const otherVocabs = [];
          for (let u = 1; u <= 7; u++) {
            const key = 'VOCAB_CARDS_U0' + u;
            if (window[key] && window[key].lessons) {
              otherVocabs.push(...Object.values(window[key].lessons)
                .flatMap(l => l.items)
                .filter(i => i.id !== id));
            }
          }
          otherVocabs.sort(() => 0.5 - Math.random());

          const target = card.en;
          const promptUz = card.production ? card.production.uz_prompt : "Translate: " + card.en;

          const srsItem = {
            id: "SRS_" + id,
            kind: "gap",
            prompt_en: "___ (" + promptUz + ")",
            answer: target,
            options: [target, otherVocabs[0]?.en || "distractor1", otherVocabs[1]?.en || "distractor2"].sort(() => 0.5 - Math.random()),
            explanation: "Repetition: " + target
          };
          items.push(srsItem);
        }
      });
      items.sort(() => 0.5 - Math.random());
    }
  }

  // Limit items to configured count
  if (items.length > settings.itemCount + 1) {
    items = items.slice(0, settings.itemCount + 1);
  }

  // Capture sentences for LISTEN_WRITE pool
  if (!window.__LAST_CONTROLLED_SENTENCES__) window.__LAST_CONTROLLED_SENTENCES__ = [];
  window.__LAST_CONTROLLED_SENTENCES__ = [];
  items.forEach(it => {
    if (it.kind === "reorder" && Array.isArray(it.answer_tokens)) {
      window.__LAST_CONTROLLED_SENTENCES__.push(_normText(it.answer_tokens.join(" ")));
    } else if (it.kind === "gap" && typeof it.prompt_en === "string") {
      const prompt = String(it.prompt_en || "").replace(/[.?!]+$/g, "");
      const rebuilt = _normText(prompt.replace(/___/, it.answer));
      window.__LAST_CONTROLLED_SENTENCES__.push(rebuilt);
    }
  });

  // === RENDER TILE UI ===
  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = "Tile 6 — Controlled Practice (" + stageName + ")";

  // Load indicator
  const loadIndicator = document.createElement("div");
  loadIndicator.className = "tile-section smart-load-indicator";
  loadIndicator.style.cssText = "display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f5f5;border-radius:6px;margin-bottom:8px;";

  const loadBar = document.createElement("div");
  loadBar.style.cssText = "flex:1;height:6px;background:#e0e0e0;border-radius:3px;overflow:hidden;";
  const loadFill = document.createElement("div");
  loadFill.style.cssText = "height:100%;border-radius:3px;transition:width 0.3s;";
  loadFill.style.width = smartSettings.loadScore + "%";
  loadFill.style.background = smartSettings.loadScore > 60 ? "#ff9800" : smartSettings.loadScore > 35 ? "#4caf50" : "#2196f3";
  loadBar.appendChild(loadFill);

  const loadLabel = document.createElement("span");
  loadLabel.style.cssText = "font-size:0.85rem;color:#666;white-space:nowrap;";
  loadLabel.textContent = items.length + " ta mashq";
  loadLabel.dataset.translation = items.length + " exercises";

  loadIndicator.appendChild(loadBar);
  loadIndicator.appendChild(loadLabel);

  const info = document.createElement("div");
  info.className = "tile-section";
  info.textContent = "Har bosqich ≥80% to'plang. " + totalStages + " bosqichni o'ting.";
  info.classList.add("tl-uz");
  info.dataset.translation = "Each stage must be passed (≥80%). Pass all " + totalStages + " stages.";

  // Stage progress dots
  const stageLine = document.createElement("div");
  stageLine.className = "tile-section";
  stageLine.style.cssText = "display:flex;gap:8px;align-items:center;";

  for (let i = 0; i < totalStages; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = "width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;";
    if (i < currentStageIdx) {
      dot.style.background = "#4caf50";
      dot.style.color = "#fff";
      dot.textContent = "✓";
    } else if (i === currentStageIdx) {
      dot.style.background = "#2196f3";
      dot.style.color = "#fff";
      dot.textContent = String(i + 1);
    } else {
      dot.style.background = "#e0e0e0";
      dot.style.color = "#999";
      dot.textContent = String(i + 1);
    }
    stageLine.appendChild(dot);
  }

  const stageLabel = document.createElement("span");
  stageLabel.style.cssText = "margin-left:8px;font-size:0.9rem;color:#666;";
  stageLabel.textContent = "(" + CONTROLLED_STAGES[currentStageIdx] + ")";
  stageLine.appendChild(stageLabel);

  // Pre-reading passage (GAP stages only)
  const showPreRead = smartSettings.showPreview;
  const lessonIdForPreRead = lesson?.lesson_id || "L";
  // Use AppState for pre-read progress (fallback to sessionStorage for backward compat)
  let preReadDone = window.StateActions?.isPreReadComplete?.(lessonIdForPreRead, stageName) || false;
  if (!preReadDone) {
    try {
      preReadDone = sessionStorage.getItem("controlledPreRead_" + lessonIdForPreRead + "_" + stageName) === "1";
    } catch (e) {}
  }

  if (showPreRead && !preReadDone) {
    const passage = document.createElement("div");
    passage.className = "tile-section";
    passage.style.cssText = "background:#e3f2fd;padding:16px;border-radius:8px;border-left:4px solid #2196f3;";

    const pTitle = document.createElement("div");
    pTitle.style.cssText = "font-weight:600;margin-bottom:12px;color:#1565c0;";
    pTitle.textContent = "📖 Avval o'qing:";
    pTitle.dataset.translation = "Read first:";
    pTitle.classList.add("tl-uz");
    passage.appendChild(pTitle);

    const ul = document.createElement("ul");
    ul.style.cssText = "margin:0;padding-left:20px;";
    items.forEach(it => {
      const li = document.createElement("li");
      li.style.cssText = "margin:8px 0;line-height:1.5;";
      if (it.kind === "reorder" && Array.isArray(it.answer_tokens)) {
        li.textContent = it.answer_tokens.join(" ") + ".";
      } else if (it.kind === "gap") {
        const prompt = String(it.prompt_en || "").replace(/[.?!]+$/g, "");
        const rebuilt = prompt.replace(/___/, it.answer) + ".";
        li.textContent = rebuilt;
      }
      ul.appendChild(li);
    });
    passage.appendChild(ul);

    const btnFinish = createButton("O'qib bo'ldim ✓", () => {
      passage.style.opacity = "0";
      setTimeout(() => {
        // Mark pre-read complete in AppState
        window.StateActions?.markPreReadComplete?.(lessonIdForPreRead, stageName);
        renderControlledTile(lesson);
      }, 250);
    });
    btnFinish.style.marginTop = "12px";
    btnFinish.classList.add("tl-uz");
    btnFinish.dataset.translation = "I've finished reading ✓";

    tileContainer.appendChild(title);
    tileContainer.appendChild(loadIndicator);
    tileContainer.appendChild(stageLine);
    tileContainer.appendChild(info);
    tileContainer.appendChild(passage);
    tileContainer.appendChild(btnFinish);
    return;
  }

  // === EXERCISE FORM ===
  const form = document.createElement("div");
  const inputs = [];
  const reorderInputs = [];

  items.forEach((item, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "tile-section controlled-item";
    wrapper.style.cssText = "background:#fafafa;padding:12px;border-radius:8px;margin-bottom:12px;";

    if (item.kind === "reorder") {
      renderReorderItem(wrapper, item, idx, reorderInputs);
    } else {
      renderGapItem(wrapper, item, idx, inputs, lesson, stageName);
    }

    form.appendChild(wrapper);
  });

  // Debug cheat
  if (window.__DEV_AUDIT__) {
    console.log("=== CONTROLLED " + stageName + " ANSWERS ===");
    items.forEach((item, idx) => {
      if (item.kind === "reorder") {
        console.log("[" + (idx + 1) + "] REORDER: " + item.answer_tokens.join(" "));
      } else {
        console.log("[" + (idx + 1) + "] GAP: " + item.answer);
      }
    });
  }

  window.showAnswers = function() {
    inputs.forEach(input => {
      input.value = input.dataset.answer || "";
      input.style.background = "#e0ffe0";
    });
    reorderInputs.forEach((input, idx) => {
      const expected = input.dataset.answer || "";
      if (window.__DEV_AUDIT__) {
        console.log("REORDER [" + (idx + 1) + "] Expected: " + expected);
      }
      const container = input.previousElementSibling;
      if (container && container.classList.contains("reorder-token-box")) {
        container.style.borderColor = "#4CAF50";
        container.style.borderWidth = "3px";
      }
    });
  };

  const feedback = document.createElement("div");
  feedback.className = "feedback";

  // Initialize max score (3 points per item)
  const pointsPerItem = 3;
  if (!feedback.dataset.scoreInitialized) {
    const totalItems = inputs.length + reorderInputs.length;
    addMaxScore(totalItems * pointsPerItem);
    feedback.dataset.scoreInitialized = "true";
  }

  const btnCheck = createButton("Check", () => {
    checkControlledAnswers(inputs, reorderInputs, feedback, pointsPerItem, stageName);
  });

  const btnContinue = createButton("Continue", () => {
    handleControlledContinue(feedback, lesson, CONTROLLED_STAGES, renderControlledTile);
  });

  const btnReset = window.__DEV_AUDIT__ ? createButton("🔄 Reset to Stage 1", () => {
    resetControlledStageProgress();
    renderControlledTile(lesson);
  }) : null;

  tileContainer.appendChild(title);
  tileContainer.appendChild(stageLine);
  tileContainer.appendChild(info);
  tileContainer.appendChild(form);
  tileContainer.appendChild(btnCheck);
  tileContainer.appendChild(btnContinue);
  if (btnReset) tileContainer.appendChild(btnReset);
  tileContainer.appendChild(feedback);
}

// ============================
// ITEM RENDERERS
// ============================

function renderReorderItem(wrapper, item, idx, reorderInputs) {
  const label = document.createElement("div");
  label.textContent = "Reorder tokens to form a correct sentence:";

  const tokenBox = document.createElement("div");
  tokenBox.className = "reorder-token-box";
  tokenBox.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;padding:10px;border-radius:4px;min-height:50px;background:#f9f9f9;border:2px solid #ddd;";

  const correctOrder = item.answer_tokens.join(" ");
  const scrambledTokens = item.tokens.slice();

  const blocks = scrambledTokens.map((token, tokenIdx) => {
    const block = document.createElement("div");
    block.className = "reorder-token-block";
    block.textContent = token;
    block.draggable = true;
    block.dataset.token = token;
    block.dataset.originalIndex = tokenIdx;
    block.style.cssText = "padding:8px 12px;background:#fff;border:2px solid #007bff;border-radius:4px;cursor:grab;user-select:none;transition:all 0.3s ease;font-weight:500;";
    return block;
  });

  blocks.forEach(block => tokenBox.appendChild(block));

  // Validation function
  const validateOrder = () => {
    const currentTokens = Array.from(tokenBox.querySelectorAll(".reorder-token-block"));
    const currentOrder = currentTokens.map(b => b.textContent).join(" ");
    const correctTokens = correctOrder.split(" ");

    if (currentOrder === correctOrder) {
      tokenBox.classList.add("correct-order");
      currentTokens.forEach(block => block.classList.remove("error"));
    } else {
      tokenBox.classList.remove("correct-order");
      currentTokens.forEach((block, i) => {
        const current = block.textContent;
        const expected = correctTokens[i] || "";
        if (current !== expected) {
          block.classList.add("error");
        } else {
          block.classList.remove("error");
        }
      });
    }
  };

  // Drag and drop
  setupDragAndDrop(blocks, tokenBox, validateOrder);

  const inputHidden = document.createElement("input");
  inputHidden.type = "hidden";
  inputHidden.dataset.answer = correctOrder;
  Object.defineProperty(inputHidden, 'value', {
    get: function() {
      const currentTokens = Array.from(tokenBox.querySelectorAll(".reorder-token-block"));
      return currentTokens.map(b => b.textContent).join(" ");
    },
    set: function() {}
  });
  reorderInputs.push(inputHidden);

  wrapper.appendChild(label);
  wrapper.appendChild(tokenBox);
  wrapper.appendChild(inputHidden);
}

function renderGapItem(wrapper, item, idx, inputs, lesson, stageName) {
  const label = document.createElement("div");
  label.textContent = "[" + (idx + 1) + "] " + item.prompt_en;

  // Grammar hover
  const mainPattern = (lesson.TL_patterns || []).find(p => p.id && p.id.includes("MAIN")) || lesson.TL_patterns?.[0];
  if (mainPattern) {
    addGrammarHover(label, mainPattern, lesson);
  }

  const input = document.createElement("input");
  input.type = "text";
  input.dataset.answer = String(item.answer || "");
  input.placeholder = "Type the missing word...";

  if (!item.answer && window.__DEV_AUDIT__) {
    console.warn("⚠️ GAP item [" + (idx + 1) + "] has no answer!");
  }

  inputs.push(input);
  wrapper.appendChild(label);
  wrapper.appendChild(input);
}

function setupDragAndDrop(blocks, tokenBox, validateOrder) {
  let draggedBlock = null;
  let isDragging = false;
  let touchStartX = 0;
  let touchStartY = 0;

  blocks.forEach(block => {
    // Desktop drag
    block.addEventListener("dragstart", () => {
      draggedBlock = block;
      block.style.opacity = "0.6";
    });

    block.addEventListener("dragend", () => {
      block.style.opacity = "1";
      draggedBlock = null;
    });

    // Touch events
    block.addEventListener("touchstart", e => {
      e.preventDefault();
      draggedBlock = block;
      isDragging = true;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      block.style.opacity = "0.6";
      block.style.zIndex = "1000";
      block.style.position = "relative";
    });

    block.addEventListener("touchmove", e => {
      if (!isDragging || !draggedBlock) return;
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      draggedBlock.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    block.addEventListener("touchend", e => {
      if (!isDragging || !draggedBlock) return;
      e.preventDefault();
      draggedBlock.style.opacity = "1";
      draggedBlock.style.transform = "";
      draggedBlock.style.zIndex = "";
      draggedBlock.style.position = "";

      const touch = e.changedTouches[0];
      const afterElement = getDragAfterElement(tokenBox, touch.clientX);
      if (afterElement == null) {
        tokenBox.appendChild(draggedBlock);
      } else {
        tokenBox.insertBefore(draggedBlock, afterElement);
      }
      validateOrder();
      draggedBlock = null;
      isDragging = false;
    });

    block.addEventListener("touchcancel", () => {
      if (draggedBlock) {
        draggedBlock.style.opacity = "1";
        draggedBlock.style.transform = "";
        draggedBlock.style.zIndex = "";
        draggedBlock.style.position = "";
      }
      draggedBlock = null;
      isDragging = false;
    });
  });

  tokenBox.addEventListener("dragover", e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  tokenBox.addEventListener("drop", e => {
    e.preventDefault();
    if (!draggedBlock) return;
    const afterElement = getDragAfterElement(tokenBox, e.clientX);
    if (afterElement == null) {
      tokenBox.appendChild(draggedBlock);
    } else {
      tokenBox.insertBefore(draggedBlock, afterElement);
    }
    validateOrder();
  });
}

function getDragAfterElement(container, x) {
  const draggableElements = [...container.querySelectorAll(".reorder-token-block:not([style*='opacity'])")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// ============================
// CHECKING & CONTINUE LOGIC
// ============================

function checkControlledAnswers(inputs, reorderInputs, feedback, pointsPerItem, stageName) {
  const total = inputs.length + reorderInputs.length;
  if (total === 0) {
    feedback.textContent = "No controlled items available.";
    feedback.className = "feedback err";
    return;
  }

  let correctCount = 0;
  let newlyCorrect = 0;

  inputs.forEach((input, idx) => {
    const val = _normToken(input.value);
    const ans = _normToken(input.dataset.answer || "");
    const isCorrect = val && ans && val === ans;

    if (isCorrect) {
      correctCount++;
      if (!input.dataset.pointsAwarded) {
        awardPoints(pointsPerItem, 'Gap #' + (idx + 1), 'CONTROLLED');
        input.dataset.pointsAwarded = "true";
        newlyCorrect++;
      }
    }

    _trackTokenUsage(ans, isCorrect);

    // Scaffolded feedback
    const existingHint = input.nextElementSibling;
    if (existingHint && existingHint.classList.contains("scaffold-hint")) {
      existingHint.remove();
    }

    if (!isCorrect && val.length > 0) {
      const hint = document.createElement("div");
      hint.className = "scaffold-hint";
      hint.style.cssText = "font-size:0.85rem;color:#d35400;margin-top:4px;";

      if (val[0].toLowerCase() !== ans[0].toLowerCase()) {
        hint.textContent = `💡 Hint: Starts with "${ans[0]}..."`;
      } else if (val.length !== ans.length) {
        hint.textContent = `💡 Hint: Word length is ${ans.length} letters.`;
      } else {
        hint.textContent = `💡 Hint: Check spelling.`;
      }
      input.parentNode.appendChild(hint);
    }
  });

  reorderInputs.forEach((input, idx) => {
    const val = String(input.value || "").trim().replace(/\s+/g, " ");
    const ans = String(input.dataset.answer || "").trim().replace(/\s+/g, " ");
    const isCorrect = val && ans && val === ans;

    if (isCorrect) {
      correctCount++;
      if (!input.dataset.pointsAwarded) {
        awardPoints(pointsPerItem, 'Reorder #' + (idx + 1), 'CONTROLLED');
        input.dataset.pointsAwarded = "true";
        newlyCorrect++;
      }
    }

    // Scaffolded feedback
    const container = input.previousElementSibling;
    const wrapper = container.parentNode;
    const existingHint = wrapper.querySelector(".scaffold-hint");
    if (existingHint) existingHint.remove();

    if (!isCorrect) {
      const hint = document.createElement("div");
      hint.className = "scaffold-hint";
      hint.style.cssText = "font-size:0.85rem;color:#d35400;margin-top:4px;";

      const userWords = val.split(" ");
      const ansWords = ans.split(" ");

      if (userWords[0] !== ansWords[0]) {
        hint.textContent = `💡 Hint: The first word should be "${ansWords[0]}".`;
      } else if (userWords[userWords.length - 1] !== ansWords[ansWords.length - 1]) {
        hint.textContent = `💡 Hint: The last word should be "${ansWords[ansWords.length - 1]}".`;
      } else {
        hint.textContent = `💡 Hint: Check the middle words.`;
      }
      wrapper.appendChild(hint);
    }

    // Track tokens
    if (ans) {
      ans.split(/\s+/).filter(Boolean).forEach(token => {
        _trackTokenUsage(token, isCorrect);
      });
    }
  });

  const score = correctCount / total;

  if (score >= 0.8) {
    const pointsMsg = newlyCorrect > 0 ? " (+" + (newlyCorrect * pointsPerItem) + " points)" : "";
    feedback.textContent = "Yaxshi. Keyingi bosqich ochildi." + pointsMsg;
    feedback.className = "feedback ok";
    playSound('correct');
  } else {
    feedback.textContent = _uzFailRemarkForStage(stageName);
    feedback.className = "feedback err";
    playSound('wrong');
  }

  feedback.dataset.lastScore = String(score);
}

function handleControlledContinue(feedback, lesson, CONTROLLED_STAGES, renderControlledTile) {
  // TEACHER MODE bypass
  if (window.TEACHER_MODE) {
    const totalStages = CONTROLLED_STAGES.length;
    let controlledStageIndex = getControlledStageIndex();
    if (controlledStageIndex < totalStages - 1) {
      controlledStageIndex++;
      setControlledStageIndex(controlledStageIndex);
      saveControlledStageProgress();
      playSound('correct');
      renderControlledTile(lesson);
    } else {
      controlledStageIndex = totalStages;
      setControlledStageIndex(controlledStageIndex);
      saveControlledStageProgress();
      playSound('complete');
      setState(STATES.WRITING);
    }
    return;
  }

  const lastScore = Number(feedback.dataset.lastScore || "0");
  if (lastScore >= 0.8) {
    const totalStages = CONTROLLED_STAGES.length;
    let controlledStageIndex = getControlledStageIndex();
    if (controlledStageIndex < totalStages - 1) {
      controlledStageIndex++;
      setControlledStageIndex(controlledStageIndex);
      saveControlledStageProgress();
      playSound('correct');
      renderControlledTile(lesson);
    } else {
      controlledStageIndex = totalStages;
      setControlledStageIndex(controlledStageIndex);
      saveControlledStageProgress();
      playSound('complete');
      setState(STATES.WRITING);
    }
  } else {
    playSound('wrong');
    feedback.textContent = "Oldin bu bosqichdan o'ting (≥80%).";
    feedback.className = "feedback err";
  }
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
window.renderControlledTile = renderControlledTile;

export default renderControlledTile;
