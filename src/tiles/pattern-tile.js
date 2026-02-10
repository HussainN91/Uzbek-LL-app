/**
 * pattern-tile.js - Tile 4: Grammar in Action
 * Interactive grammar presentation with PPP methodology
 */

import {
  getTileContainer,
  clearTileContainer,
  resolveUIData,
  mergeMissingKeys,
  createButton,
  createBackButton,
  setState,
  STATES,
  playSound,
  speakText,
  getCurrentUnitId,
  addGrammarHover,
  openGrammarPresentationModal
} from './tile-utils.js';

/**
 * Render Tile 4 - Pattern / Grammar in Action
 * Features interactive PPP steps, pattern discovery
 * @param {Object} lesson - Lesson data containing TL_patterns, grammar_presentation, etc.
 */
export function renderPatternTile(lesson) {
  const tileContainer = getTileContainer();
  const CURRENT_UNIT_ID = getCurrentUnitId();
  
  clearTileContainer();

  const r = resolveUIData(STATES.PATTERN, lesson);
  mergeMissingKeys(r.missingKeys);

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = "Tile 4 — Grammar in Action";
  
  tileContainer.appendChild(title);

  // Interactive PPP Grammar Presentation Modal
  const grammarPresentation = lesson && lesson.grammar_presentation ? lesson.grammar_presentation : null;
  const grammarFormContent = lesson && lesson.grammar_form_content ? lesson.grammar_form_content : null;

  // Create grammar section container
  const grammarSection = document.createElement("div");
  grammarSection.className = "tile-section grammar-section";

  if (grammarPresentation && Object.keys(grammarPresentation).length > 0) {
    // Create interactive grammar button
    const grammarBtn = document.createElement("button");
    grammarBtn.className = "grammar-presentation-btn";
    grammarBtn.innerHTML = `
      <div class="grammar-btn-icon">📚</div>
      <div class="grammar-btn-text">
        <div class="grammar-btn-title">${grammarPresentation.title || "Grammatika"}</div>
        <div class="grammar-btn-subtitle">Interactive PPP Lesson</div>
      </div>
      <div class="grammar-btn-arrow">▶</div>
    `;
    grammarBtn.onclick = () => openGrammarPresentationModal(grammarPresentation, lesson);
    grammarSection.appendChild(grammarBtn);
  }

  // Show placeholder only if BOTH grammar presentation and grammar/form content are missing
  const hasGFC = !!(grammarFormContent && Object.keys(grammarFormContent).length > 0);
  if (grammarSection.childElementCount === 0 && !hasGFC) {
    const placeholder = document.createElement("div");
    placeholder.textContent = "Grammar/Form mazmuni kiritilmagan (dars uchun talab etiladi).";
    grammarSection.appendChild(placeholder);
  }

  // Append grammar section to tile container
  tileContainer.appendChild(grammarSection);

  // Interactive structured Grammar/Form content with step-by-step flow
  if (grammarFormContent && Object.keys(grammarFormContent).length > 0) {
    const interactiveContainer = document.createElement("div");
    interactiveContainer.className = "mt-12";

    // Build all content sections as steps
    const steps = [];

    // Get target_words from TL_patterns (automation data)
    const mainPattern = (lesson.TL_patterns || []).find(p => p.id && p.id.includes("MAIN")) || lesson.TL_patterns?.[0];
    const targetWords = mainPattern?.target_words || [];
    const mainPatternExamples = mainPattern?.example_sentences || [];

    // Step 0: Inductive Pattern Discovery (Interactive!)
    if (mainPatternExamples.length >= 3) {
      steps.push({
        label: "📍 Pattern Spotting",
        content: () => createPatternSpottingStep(lesson, mainPatternExamples, targetWords)
      });
    }

    // Step 1: Listen & Model (MERGED: Anchor + Shadowing)
    const anchor = grammarFormContent.anchor_example_en;
    if (anchor) {
      steps.push({
        label: "🎧 Tinglang va Takrorlang",
        content: () => createListenModelStep(anchor)
      });
    }

    // Step 2: Meaning (L1 explanation)
    const meaning = grammarFormContent.meaning_uz || {};
    const meaningEn = grammarFormContent.meaning_en || {};
    if (meaning.explanation) {
      steps.push({
        label: "💡 Ma'no",
        content: () => createMeaningStep(meaning, meaningEn)
      });
    }

    // Step 3: Compare & Notice (MERGED: Comparison + Cross-language + Concept/Form Awareness)
    const cmp = (meaning.comparison || {});
    const crossLangNote = grammarFormContent.cross_language_note;
    const conceptAwareness = grammarFormContent.concept_awareness;
    const formAwareness = grammarFormContent.form_awareness;
    
    if (cmp.en || cmp.uz || crossLangNote || (conceptAwareness && conceptAwareness.prompt_uz) || (formAwareness && formAwareness.prompt_uz)) {
      steps.push({
        label: "🔄 Taqqoslash va E'tibor",
        content: () => createCompareNoticeStep(cmp, crossLangNote, conceptAwareness, formAwareness)
      });
    }

    // Step 4: Form Rules (explicit grammar rules)
    if (Array.isArray(grammarFormContent.form_uz) && grammarFormContent.form_uz.length > 0) {
      steps.push({
        label: "📝 Shakl qoidalari",
        content: () => createFormRulesStep(grammarFormContent)
      });
    }

    // Create interactive UI
    let currentStep = 0;
    const contentArea = document.createElement("div");
    contentArea.className = "interactive-content-area slide-in";

    const buttonArea = document.createElement("div");
    buttonArea.className = "button-area";

    function renderStep(index) {
      contentArea.innerHTML = "";
      contentArea.classList.remove("slide-in");
      void contentArea.offsetWidth;
      contentArea.classList.add("slide-in");

      buttonArea.innerHTML = "";

      if (index < steps.length) {
        const step = steps[index];
        const stepLabel = document.createElement("div");
        stepLabel.textContent = step.label; 
        stepLabel.className = "step-label";
        contentArea.appendChild(stepLabel);
        contentArea.appendChild(step.content());

        const understood = createButton(index === 0 ? "I see it! →" : "Tushundim →", () => {
          currentStep++;
          renderStep(currentStep);
        });
        understood.classList.add('btn--understood');
        buttonArea.appendChild(understood);
        
        if (index > 0) {
          const back = createButton("← Back", () => {
            currentStep--;
            renderStep(currentStep);
          });
          back.classList.add('btn--back');
          buttonArea.appendChild(back);
        }

      } else {
        const done = document.createElement("div");
        done.textContent = "✓ Barcha ma'lumotlar ko'rib chiqildi";
        done.classList.add("tl-uz", "completion-message");
        done.dataset.translation = "✓ All information reviewed";
        contentArea.appendChild(done);
        
        const restart = createButton("Review Rules ↺", () => {
          currentStep = 0;
          renderStep(0);
        });
        buttonArea.appendChild(restart);
      }
    }

    renderStep(0);

    interactiveContainer.appendChild(contentArea);
    interactiveContainer.appendChild(buttonArea);
    grammarSection.appendChild(interactiveContainer);
  }

  const templateDiv = document.createElement("div");
  templateDiv.className = "tile-section";
  templateDiv.textContent =
    "Pattern template: " +
    (r.data.pattern_template ||
      r.data.pattern_name ||
      "(missing)");
  
  // Add grammar hover tooltip to pattern template
  const mainPattern = (lesson.TL_patterns || []).find(p => p.id && p.id.includes("MAIN")) || lesson.TL_patterns?.[0];
  if (mainPattern) {
    addGrammarHover(templateDiv, mainPattern, lesson);
  }

  const examplesDiv = document.createElement("div");
  examplesDiv.className = "tile-section";
  const exTitle = document.createElement("div");
  exTitle.textContent = "Examples:";
  examplesDiv.appendChild(exTitle);

  tileContainer.appendChild(templateDiv);
  tileContainer.appendChild(examplesDiv);

  // Navigation buttons
  const navContainer = document.createElement("div");
  navContainer.style.cssText = "display: flex; gap: 12px; margin-top: 24px; justify-content: center; flex-wrap: wrap;";

  const backBtn = createBackButton();
  if (backBtn) {
    backBtn.style.flex = "1";
    backBtn.style.maxWidth = "150px";
    navContainer.appendChild(backBtn);
  }

  const nextBtn = createButton("Next: Function →", () => setState(STATES.FUNCTION));
  nextBtn.style.cssText = "flex: 1; max-width: 200px; padding: 14px 24px; background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(39,174,96,0.3);";
  navContainer.appendChild(nextBtn);

  tileContainer.appendChild(navContainer);
}

// ============================
// STEP CONTENT CREATORS
// ============================

/**
 * Create Pattern Spotting step content
 */
function createPatternSpottingStep(lesson, mainPatternExamples, targetWords) {
  const div = document.createElement("div");
  div.style.textAlign = "center";
  
  const funcUz = lesson.function_uz || "muloqot qilish";
  const semUz = lesson.semantic_category_uz || "mavzu";
  
  const prompt = document.createElement("div");
  prompt.innerHTML = `
    <div style="font-size: 0.9rem; color: #666; margin-bottom: 8px;" class="tl-uz" data-translation="Goal: ${lesson.function_en || 'communicate'} (${lesson.semantic_category_en || 'topic'})">
      Maqsad: <strong>${funcUz}</strong> (${semUz})
    </div>
    <div style="font-weight: bold; font-size: 1.1rem; margin-bottom: 16px;" class="tl-uz" data-translation="${targetWords.length > 0 ? '👆 Tap the <u>important words</u> in the sentences below!' : 'What is the common rule in these sentences?'}">
      ${targetWords.length > 0 
        ? "👆 Quyidagi gaplardagi <u>muhim so'zlarni</u> bosing!"
        : "Quyidagi gaplarda qanday umumiy qoida bor?"}
    </div>
  `;
  div.appendChild(prompt);

  const examples = mainPatternExamples.slice(0, 3);
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  
  const totalTargets = targetWords.length > 0 ? Math.min(3, targetWords.length) : 0;
  const discoveredWords = new Set();
  
  const feedback = document.createElement("div");
  feedback.style.marginTop = "16px";
  feedback.style.padding = "12px";
  feedback.style.borderRadius = "8px";
  feedback.style.transition = "all 0.3s";
  feedback.style.display = "none";
  
  examples.forEach(ex => {
    const row = document.createElement("div");
    row.style.fontSize = "1.1rem";
    row.style.padding = "10px 12px";
    row.style.background = "#fff";
    row.style.border = "1px solid #ddd";
    row.style.borderRadius = "6px";
    row.style.textAlign = "left";
    
    if (targetWords.length > 0) {
      const words = ex.split(/(\s+)/);
      words.forEach(word => {
        const cleanWord = word.replace(/[.,!?]/g, "").toLowerCase();
        const isTarget = targetWords.some(tw => tw.toLowerCase() === cleanWord);
        
        if (isTarget && word.trim()) {
          const span = document.createElement("span");
          span.textContent = word;
          span.style.cursor = "pointer";
          span.style.padding = "2px 4px";
          span.style.borderRadius = "4px";
          span.style.transition = "all 0.2s";
          span.className = "pattern-word";
          
          span.addEventListener("click", () => {
            if (!span.classList.contains("discovered")) {
              span.classList.add("discovered");
              span.style.background = "var(--primary-color, #4CAF50)";
              span.style.color = "#fff";
              discoveredWords.add(cleanWord);
              playSound("correct");
              
              feedback.style.display = "block";
              feedback.style.background = "#e8f5e9";
              feedback.style.border = "1px solid #4CAF50";
              feedback.classList.add("tl-uz");
              feedback.dataset.translation = `✅ "${word.trim()}" Correct! (${discoveredWords.size}/${totalTargets || "?"})`;
              feedback.innerHTML = `✅ <strong>"${word.trim()}"</strong> To'g'ri! (${discoveredWords.size}/${totalTargets || "?"})`;
              
              container.querySelectorAll(".pattern-word").forEach(w => {
                if (w.textContent.replace(/[.,!?]/g, "").toLowerCase() === cleanWord) {
                  w.classList.add("discovered");
                  if (w instanceof HTMLElement) {
                    w.style.background = "var(--primary-color, #4CAF50)";
                    w.style.color = "#fff";
                  }
                }
              });
            }
          });
          row.appendChild(span);
        } else {
          row.appendChild(document.createTextNode(word));
        }
      });
    } else {
      row.textContent = ex;
    }
    
    container.appendChild(row);
  });
  
  div.appendChild(container);
  div.appendChild(feedback);
  
  const hint = document.createElement("div");
  hint.style.marginTop = "12px";
  hint.style.color = "#666";
  hint.style.fontStyle = "italic";
  hint.classList.add("tl-uz");
  hint.dataset.translation = targetWords.length > 0 
    ? "💡 Find the important words, then we'll see the rule."
    : "💡 Notice the structure? Let's learn the rule.";
  hint.textContent = targetWords.length > 0 
    ? "💡 Muhim so'zlarni toping, keyin qoidani ko'ramiz."
    : "💡 Notice the structure? Let's learn the rule.";
  div.appendChild(hint);

  return div;
}

/**
 * Create Listen & Model step content
 */
function createListenModelStep(anchor) {
  const div = document.createElement("div");
  div.style.textAlign = "center";
  div.style.padding = "16px";
  
  const anchorDisplay = document.createElement("div");
  anchorDisplay.textContent = String(anchor);
  anchorDisplay.style.fontSize = "1.4rem";
  anchorDisplay.style.fontWeight = "bold";
  anchorDisplay.style.marginBottom = "16px";
  anchorDisplay.style.padding = "12px";
  anchorDisplay.style.background = "#fff";
  anchorDisplay.style.border = "2px solid var(--primary-color, #4CAF50)";
  anchorDisplay.style.borderRadius = "8px";
  anchorDisplay.style.color = "#2c3e50";
  anchorDisplay.classList.add("tl-en");
  div.appendChild(anchorDisplay);

  const instr = document.createElement("div");
  instr.innerHTML = "1️⃣ <strong>Eshiting</strong> → 2️⃣ <strong>Qaytaring</strong> → 3️⃣ <strong>Taqqoslang</strong>";
  instr.classList.add("tl-uz");
  instr.dataset.translation = "1️⃣ Listen → 2️⃣ Repeat → 3️⃣ Compare";
  instr.style.marginBottom = "16px";
  instr.style.color = "#555";
  instr.style.fontSize = "0.95rem";
  div.appendChild(instr);
  
  const btn = document.createElement("button");
  btn.innerHTML = "🔊 Eshiting";
  btn.className = "action-button";
  btn.style.fontSize = "1.1rem";
  btn.style.padding = "12px 24px";
  btn.style.background = "#2196f3";
  btn.style.marginRight = "8px";
  
  btn.onclick = () => {
    speakText(anchor); 
    btn.style.transform = "scale(0.95)";
    setTimeout(() => btn.style.transform = "scale(1)", 100);
  };
  div.appendChild(btn);
  
  const slowBtn = document.createElement("button");
  slowBtn.innerHTML = "🐢 Sekin";
  slowBtn.className = "action-button";
  slowBtn.style.fontSize = "1rem";
  slowBtn.style.padding = "12px 20px";
  slowBtn.style.background = "#9ca3af";
  
  slowBtn.onclick = () => {
    speakText(anchor, { rate: 0.7 }); 
    slowBtn.style.transform = "scale(0.95)";
    setTimeout(() => slowBtn.style.transform = "scale(1)", 100);
  };
  div.appendChild(slowBtn);
  
  const tip = document.createElement("div");
  tip.style.marginTop = "16px";
  tip.style.color = "#666";
  tip.style.fontStyle = "italic";
  tip.style.fontSize = "0.9rem";
  tip.classList.add("tl-uz");
  tip.dataset.translation = "💡 Tip: Listen 2-3 times, then repeat aloud!";
  tip.textContent = "💡 Maslahat: 2-3 marta eshiting, keyin ovoz chiqarib takrorlang!";
  div.appendChild(tip);
  
  return div;
}

/**
 * Create Meaning step content
 */
function createMeaningStep(meaning, meaningEn) {
  const div = document.createElement("div");
  div.style.marginTop = "8px";
  const exp = document.createElement("div");
  exp.textContent = String(meaning.explanation);
  exp.classList.add("tl-uz");
  if (meaningEn && meaningEn.explanation) {
    exp.dataset.translation = String(meaningEn.explanation);
  }
  div.appendChild(exp);
  if (meaning.time_context) {
    const time = document.createElement("div");
    time.textContent = String(meaning.time_context);
    time.style.marginTop = "6px";
    time.classList.add("tl-uz");
    if (meaningEn && meaningEn.time_context) {
      time.dataset.translation = String(meaningEn.time_context);
    }
    div.appendChild(time);
  }
  return div;
}

/**
 * Create Compare & Notice step content
 */
function createCompareNoticeStep(cmp, crossLangNote, conceptAwareness, formAwareness) {
  const div = document.createElement("div");
  div.style.marginTop = "8px";
  
  // Section 1: Language Comparison
  if (cmp.en || cmp.uz) {
    const compSection = document.createElement("div");
    compSection.style.marginBottom = "16px";
    compSection.style.padding = "12px";
    compSection.style.background = "#f0fdf4";
    compSection.style.borderRadius = "8px";
    compSection.style.border = "1px solid #86efac";
    
    const compTitle = document.createElement("div");
    compTitle.textContent = "Inglizcha ↔ O'zbekcha";
    compTitle.classList.add("tl-uz");
    compTitle.dataset.translation = "English ↔ Uzbek";
    compTitle.style.fontWeight = "600";
    compTitle.style.marginBottom = "8px";
    compTitle.style.color = "#166534";
    compSection.appendChild(compTitle);
    
    if (cmp.en) {
      const en = document.createElement("div");
      en.textContent = "🇬🇧 " + String(cmp.en);
      en.classList.add("tl-en");
      en.style.marginBottom = "4px";
      compSection.appendChild(en);
    }
    if (cmp.uz) {
      const uz = document.createElement("div");
      uz.textContent = "🇺🇿 " + String(cmp.uz);
      uz.classList.add("tl-uz");
      if (cmp.en) uz.dataset.translation = String(cmp.en);
      compSection.appendChild(uz);
    }
    if (cmp.implication) {
      const im = document.createElement("div");
      im.textContent = "→ " + String(cmp.implication);
      im.style.marginTop = "8px";
      im.style.fontStyle = "italic";
      im.style.color = "#166534";
      compSection.appendChild(im);
    }
    div.appendChild(compSection);
  }
  
  // Section 2: Cross-language note
  if (crossLangNote) {
    const noteSection = document.createElement("div");
    noteSection.style.marginBottom = "16px";
    noteSection.style.padding = "12px";
    noteSection.style.background = "#fefce8";
    noteSection.style.borderRadius = "8px";
    noteSection.style.border = "1px solid #fde047";
    noteSection.style.borderLeft = "4px solid #eab308";
    
    const noteIcon = document.createElement("span");
    noteIcon.textContent = "💡 ";
    noteIcon.style.fontSize = "1.1rem";
    
    const noteText = document.createElement("span");
    noteText.textContent = String(crossLangNote);
    noteText.classList.add("tl-uz");
    noteText.dataset.translation = "Cross-language note";
    
    noteSection.appendChild(noteIcon);
    noteSection.appendChild(noteText);
    div.appendChild(noteSection);
  }
  
  // Section 3: Awareness prompts
  if ((conceptAwareness && conceptAwareness.prompt_uz) || (formAwareness && formAwareness.prompt_uz)) {
    const awarenessSection = document.createElement("div");
    awarenessSection.style.padding = "12px";
    awarenessSection.style.background = "#eff6ff";
    awarenessSection.style.borderRadius = "8px";
    awarenessSection.style.border = "1px solid #93c5fd";
    awarenessSection.style.borderLeft = "4px solid #2563eb";
    
    const awarenessTitle = document.createElement("div");
    awarenessTitle.textContent = "🧠 E'tibor bering";
    awarenessTitle.classList.add("tl-uz");
    awarenessTitle.dataset.translation = "🧠 Pay Attention";
    awarenessTitle.style.fontWeight = "600";
    awarenessTitle.style.marginBottom = "8px";
    awarenessTitle.style.color = "#1e40af";
    awarenessSection.appendChild(awarenessTitle);
    
    // Concept awareness
    if (conceptAwareness && conceptAwareness.prompt_uz) {
      const ca = conceptAwareness;
      const conceptDiv = document.createElement("div");
      conceptDiv.style.marginBottom = "8px";
      
      const prompt = document.createElement("div");
      prompt.textContent = String(ca.prompt_uz);
      prompt.classList.add("tl-uz");
      if (ca.prompt_en) prompt.dataset.translation = String(ca.prompt_en);
      conceptDiv.appendChild(prompt);
      
      if (Array.isArray(ca.expected_keywords) && ca.expected_keywords.length > 0) {
        const kw = document.createElement("div");
        kw.textContent = "🔑 " + ca.expected_keywords.map((k) => String(k || "")).join(", ");
        kw.style.marginTop = "4px";
        kw.style.fontStyle = "italic";
        kw.style.color = "#1e40af";
        conceptDiv.appendChild(kw);
      }
      awarenessSection.appendChild(conceptDiv);
    }
    
    // Form awareness
    if (formAwareness && formAwareness.prompt_uz) {
      const fa = formAwareness;
      const formDiv = document.createElement("div");
      if (conceptAwareness && conceptAwareness.prompt_uz) {
        formDiv.style.marginTop = "12px";
        formDiv.style.paddingTop = "12px";
        formDiv.style.borderTop = "1px dashed #93c5fd";
      }
      
      const prompt = document.createElement("div");
      prompt.textContent = String(fa.prompt_uz);
      prompt.classList.add("tl-uz");
      if (fa.prompt_en) prompt.dataset.translation = String(fa.prompt_en);
      formDiv.appendChild(prompt);
      
      if (fa.reference) {
        const ref = document.createElement("div");
        ref.textContent = "👉 " + String(fa.reference);
        ref.style.marginTop = "8px";
        ref.style.color = "#2563eb";
        ref.style.fontWeight = "700";
        ref.style.fontSize = "1.1em";
        ref.classList.add("tl-en");
        formDiv.appendChild(ref);
      }
      awarenessSection.appendChild(formDiv);
    }
    
    div.appendChild(awarenessSection);
  }
  
  return div;
}

/**
 * Create Form Rules step content
 */
function createFormRulesStep(grammarFormContent) {
  const div = document.createElement("div");
  div.style.marginTop = "8px";
  const ul = document.createElement("ul");
  ul.style.marginLeft = "20px";
  ul.classList.add("tl-uz");
  grammarFormContent.form_uz.forEach((line, idx) => {
    const li = document.createElement("li");
    li.textContent = String(line || "");
    if (Array.isArray(grammarFormContent.form_en) && grammarFormContent.form_en[idx]) {
      li.dataset.translation = String(grammarFormContent.form_en[idx]);
    }
    ul.appendChild(li);
  });
  div.appendChild(ul);
  return div;
}

// Backward compatibility bridge
window.renderPatternTile = renderPatternTile;
