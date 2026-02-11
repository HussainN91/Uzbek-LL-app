/**
 * mistake-tile.js - Tile 9: Mistake Awareness
 * Review common grammar mistakes with explanations
 */

import {
  getTileContainer,
  clearTileContainer,
  createButton,
  setState,
  transitionToTile,
  awardPoints,
  STATES
} from './tile-utils.js';

/**
 * Get mistake by ID
 */
function getMistake(id) {
  return typeof window.getMistake === 'function' ? window.getMistake(id) : null;
}

/**
 * Build grammar mistake blocks from lesson data
 */
function buildGrammarMistakeBlocks(lesson) {
  const lid = (lesson && lesson.lesson_id) || "";
  const out = [];

  // U08_L03 — Double negative trap
  if (lid.includes("U08_L03")) {
    out.push({
      wrong_form: "I don't have nothing.",
      correct_form: "I don't have anything.",
      meta_uz: "Double negative ishlatilmaydi.",
      meta_en: "Do not use double negatives."
    });
    out.push({
      wrong_form: "There isn't no one at home.",
      correct_form: "There is no one at home.",
      meta_uz: "No- olmosh ijobiy fe'l bilan keladi.",
      meta_en: "'No-' pronouns take a positive verb."
    });
    out.push({
      wrong_form: "I can't go nowhere.",
      correct_form: "I can't go anywhere.",
      meta_uz: "Inkorda ANY- ishlatiladi (nowhere emas).",
      meta_en: "In negatives, use ANY- (not 'nowhere')."
    });
  }

  // U09_L03 — Determiner vs pronoun (Meniki logic)
  if (lid.includes("U09_L03")) {
    out.push({
      wrong_form: "It's mines.",
      correct_form: "It's mine.",
      meta_uz: "Possessive pronoun ko'plik qilinmaydi.",
      meta_en: "Possessive pronouns are not pluralized."
    });
    out.push({
      wrong_form: "It's my.",
      correct_form: "It's mine.",
      meta_uz: "Determiner (my/your...) ot bilan keladi; pronoun 'mine' mustaqil keladi.",
      meta_en: "Determiners need a noun; 'mine' stands alone."
    });
  }

  // U10_L03 — Quantifier mismatch (Countable vs Uncountable)
  if (lid.includes("U10_L03")) {
    out.push({
      wrong_form: "I have a few money.",
      correct_form: "I have a bit of money / some money.",
      meta_uz: "'Money' sanalmaydi, shuning uchun 'a few' ishlatilmaydi.",
      meta_en: "'Money' is uncountable, so 'a few' cannot be used."
    });
    out.push({
      wrong_form: "There are a bit of books.",
      correct_form: "There are a few books.",
      meta_uz: "'Books' sanaladi, shuning uchun 'a bit of' ishlatilmaydi.",
      meta_en: "'Books' is countable, so 'a bit of' cannot be used."
    });
    out.push({
      wrong_form: "I have a money.",
      correct_form: "I have some money.",
      meta_uz: "Sanalmaydigan otlar oldidan 'a' artikli kelmaydi.",
      meta_en: "Uncountable nouns do not take 'a' article."
    });
  }

  return out;
}

/**
 * Add max score
 */
function addMaxScore(points) {
  if (typeof window.addMaxScore === 'function') {
    window.addMaxScore(points);
  }
}

/**
 * Render Tile 9 - Mistake Awareness
 * @param {Object} lesson - Lesson data with mistake_ids
 */
export function renderMistakeTile(lesson) {
  const tileContainer = getTileContainer();
  clearTileContainer();

  // Enforce LISTEN_WRITE completion before MISTAKE
  if (!window.lastListenWritePassed) {
    const title = document.createElement("div");
    title.className = "tile-title";
    title.textContent = "Tile 9 — Mistake Awareness (Locked)";
    
    const msg = document.createElement("div");
    msg.className = "tile-section";
    msg.textContent = "Oldin LISTEN_WRITE tile'ni bajaring.";
    msg.classList.add("tl-uz");
    msg.dataset.translation = "Complete the LISTEN_WRITE tile first.";
    
    const btnBack = createButton("Qaytish: LISTEN_WRITE", () => {
      transitionToTile(STATES.LISTEN_WRITE);
    });
    btnBack.classList.add("tl-uz");
    btnBack.dataset.translation = "Back: LISTEN_WRITE";
    
    tileContainer.appendChild(title);
    tileContainer.appendChild(msg);
    tileContainer.appendChild(btnBack);
    return;
  }

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = "Tile 9 — Mistake Awareness";

  const container = document.createElement("div");

  // Award points for reviewing mistakes (5 points total for tile completion)
  const mistakeReviewPoints = 5;
  if (!container.dataset.scoreInitialized) {
    addMaxScore(mistakeReviewPoints);
    container.dataset.scoreInitialized = "true";
  }

  // Batch mistake blocks using DocumentFragment
  const mistakeFragment = document.createDocumentFragment();
  (lesson.mistake_ids || []).forEach((mid) => {
    const m = getMistake(mid);
    if (!m) return;
    const block = document.createElement("div");
    block.className = "tile-section";
    
    const wrongLabel = document.createElement("strong");
    wrongLabel.textContent = "Noto'g'ri:";
    wrongLabel.classList.add("tl-uz");
    wrongLabel.dataset.translation = "Wrong:";
    
    const correctLabel = document.createElement("strong");
    correctLabel.textContent = "To'g'ri:";
    correctLabel.classList.add("tl-uz");
    correctLabel.dataset.translation = "Correct:";

    block.appendChild(wrongLabel);
    block.appendChild(document.createTextNode(" " + (m.wrong_form || "(missing)")));
    block.appendChild(document.createElement("br"));
    block.appendChild(correctLabel);
    block.appendChild(document.createTextNode(" " + (m.correct_form || "(missing)")));
    block.appendChild(document.createElement("br"));
    
    const meta = document.createElement("em");
    meta.textContent = m.meta_uz || "";
    meta.classList.add("tl-uz");
    meta.dataset.translation = m.meta_en || "Explanation";
    block.appendChild(meta);
    
    mistakeFragment.appendChild(block);
  });
  container.appendChild(mistakeFragment);

  // Fallback: Auto-build mistakes from lesson grammar_form_content when none provided
  // Fallback: Auto-build mistakes from lesson grammar_form_content when none provided
  if (!container.childNodes || container.childNodes.length === 0) {
    const built = buildGrammarMistakeBlocks(lesson) || [];
    const fallbackFragment = document.createDocumentFragment();
    built.forEach((m) => {
      const block = document.createElement("div");
      block.className = "tile-section";

      const wrongLabel = document.createElement("strong");
      wrongLabel.textContent = "Noto'g'ri:";
      wrongLabel.classList.add("tl-uz");
      wrongLabel.dataset.translation = "Wrong:";

      const correctLabel = document.createElement("strong");
      correctLabel.textContent = "To'g'ri:";
      correctLabel.classList.add("tl-uz");
      correctLabel.dataset.translation = "Correct:";

      block.appendChild(wrongLabel);
      block.appendChild(document.createTextNode(" " + (m.wrong_form || "(missing)")));
      block.appendChild(document.createElement("br"));
      block.appendChild(correctLabel);
      block.appendChild(document.createTextNode(" " + (m.correct_form || "(missing)")));
      block.appendChild(document.createElement("br"));

      const meta = document.createElement("em");
      meta.textContent = m.meta_uz || "";
      meta.classList.add("tl-uz");
      meta.dataset.translation = m.meta_en || "Explanation";
      block.appendChild(meta);

      fallbackFragment.appendChild(block);
    });
    container.appendChild(fallbackFragment);
  }

  const btnNext = createButton("Tugatish", () => {
    // Award points for completing mistake review
    if (!container.dataset.pointsAwarded) {
      awardPoints(mistakeReviewPoints, 'Reviewed mistakes', 'MISTAKE');
      container.dataset.pointsAwarded = "true";
    }
    transitionToTile(STATES.DONE);
  });
  btnNext.classList.add("tl-uz");
  btnNext.dataset.translation = "Finish";

  tileContainer.appendChild(title);
  tileContainer.appendChild(container);
  tileContainer.appendChild(btnNext);
}

// Backward compatibility
window.renderMistakeTile = renderMistakeTile;
