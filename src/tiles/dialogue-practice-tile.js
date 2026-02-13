/**
 * Dialogue Practice Tile Module
 * ==============================
 * Handles integration lesson dialogue practice tiles:
 * - English dialogue view with grammar highlighting
 * - Uzbek translation view
 * 
 * Part of the integration lesson flow.
 *
 * @module src/tiles/dialogue-practice-tile
 * @version 1.0.0 (Phase 2 Refactor)
 */

import { getTileContainer } from './tile-utils.js';
import { uz, en } from '../core/i18n.js';
import { createInstructionBanner } from '../components/instruction-banner.js';

/**
 * Access integration state from window
 */
function getIntegrationState() {
  return window.integrationState || null;
}

function setIntegrationState(state) {
  window.integrationState = state;
}

/**
 * Access render function from window
 */
function render() {
  if (typeof window.render === 'function') {
    window.render();
  }
}

/**
 * Access CURRENT_UNIT_ID from window
 */
function getCurrentUnitId() {
  return window.CURRENT_UNIT_ID || 'U01';
}

/**
 * Access dialogueAudioPlayer from window
 */
function getDialogueAudioPlayer() {
  return window.dialogueAudioPlayer || null;
}

/**
 * Access translation data from window
 */
function translateToNaturalUzbek(englishText) {
  const translations = window.TRANSLATION_DATA || {};
  return translations[englishText] || englishText;
}

/**
 * Access grammar hover functionality from window
 */
function addGrammarHover(element, pattern, lesson) {
  if (typeof window.addGrammarHover === 'function') {
    window.addGrammarHover(element, pattern, lesson);
  }
}

/**
 * Access vocab gap system from window
 */
function processVocabGaps() {
  if (window.vocabGapSystem && typeof window.vocabGapSystem.process === 'function') {
    setTimeout(() => window.vocabGapSystem.process(), 150);
  }
}

/**
 * Highlight grammar tokens in English dialogue for awareness
 * Marks Present Continuous patterns and time indicators
 *
 * @param {string} text - The text to process
 * @returns {string} HTML string with highlighted tokens
 */
function highlightGrammarTokens(text) {
  if (!text || typeof text !== 'string') return '';
  
  let s = text;
  
  // Present Continuous: am/is/are + verb-ing
  s = s.replace(
    /\b(am|is|are)\s+([a-z]+ing)\b/gi,
    '<span class="hl hl-continuous hl-anim" style="background:#d5f4e6;color:#1e8449;padding:2px 4px;border-radius:4px;">$1 $2</span>'
  );
  
  // Frequency/time indicators (habit vs now)
  const indicators = [
    'every day', 'always', 'usually', 'often', 'never', 'now', 'right now', 
    'at the moment', 'today', 'this week', 'currently'
  ];
  
  indicators.forEach(w => {
    const re = new RegExp('\\b' + w.replace(/\s/g, '\\s+') + '\\b', 'gi');
    s = s.replace(
      re,
      '<span class="hl hl-indicator hl-anim" style="background:#fff3cd;color:#856404;padding:2px 4px;border-radius:4px;">$&</span>'
    );
  });
  
  return s;
}

/**
 * Render the English Dialogue Practice Tile
 * Shows dialogues with grammar highlighting and audio playback.
 *
 * @param {Object} dialogueContent - The dialogue data from integration content
 * @param {Object} lesson - The current lesson object
 */
export function renderDialogueTile(dialogueContent, lesson) {
  const tileContainer = getTileContainer();
  
  const wrapper = document.createElement("div");
  wrapper.className = "integration-dialogue-tile";

  // Title
  const title = document.createElement("h2");
  title.textContent = uz('tiles.dialogue') + ' \u2014 ' + uz('dialoguePractice.subtitle');
  title.classList.add('tl-uz');
  title.dataset.translation = en('tiles.dialogue') + ' \u2014 ' + en('dialoguePractice.subtitle');
  title.style.cssText = "color: #2c3e50; margin-bottom: 20px; text-align: center;";
  wrapper.appendChild(title);

  // Instruction banner
  const banner = createInstructionBanner('dialogue', { showPairWork: true, showAudio: true });
  if (banner) wrapper.appendChild(banner);

  // Get all dialogue objects from the nested structure
  // Structure: tile_a_dialogue -> dialogue_1_xxx, dialogue_2_xxx, etc.
  const dialogueKeys = Object.keys(dialogueContent).filter(key => key.startsWith('dialogue_'));
  
  dialogueKeys.forEach((dialogueKey, dialogueIdx) => {
    const dialogue = dialogueContent[dialogueKey];
    
    // Context for this dialogue
    if (dialogue.context_uz) {
      const context = document.createElement("div");
      context.className = "dialogue-context";
      context.textContent = "📖 " + dialogue.context_uz;
      context.style.cssText = "background: #ecf0f1; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-style: italic;";
      context.classList.add("tl-uz");
      if (dialogue.context_en) context.dataset.translation = dialogue.context_en;
      wrapper.appendChild(context);
    }

    // Dialogue turns box
    const dialogueBox = document.createElement("div");
    dialogueBox.className = "dialogue-box";
    dialogueBox.style.cssText = "background: white; border: 2px solid #3498db; border-radius: 12px; padding: 20px; margin-bottom: 30px;";

    if (dialogue.turns && Array.isArray(dialogue.turns)) {
      dialogue.turns.forEach((turn, idx) => {
        const turnEl = document.createElement("div");
        turnEl.className = "dialogue-turn";
        turnEl.style.cssText = "margin-bottom: 15px; padding: 12px; background: " + 
          (idx % 2 === 0 ? "#e8f4f8" : "#f0e8f8") + 
          "; border-radius: 8px; display: flex; align-items: center; flex-wrap: wrap;";
        
        const speaker = document.createElement("strong");
        speaker.textContent = turn.speaker + ": ";
        speaker.style.color = idx % 2 === 0 ? "#2980b9" : "#8e44ad";
        
        const text = document.createElement("span");
        const turnTextEn = turn.text || turn.text_en || '';
        text.innerHTML = highlightGrammarTokens(turnTextEn);
        text.classList.add("tl-en");
        
        // Add grammar hover to highlighted elements
        const mainPattern = (lesson.TL_patterns || []).find(p => p.id && p.id.includes("MAIN")) || lesson.TL_patterns?.[0];
        if (mainPattern) {
          const highlightedSpans = text.querySelectorAll('.hl-continuous, .hl-indicator');
          highlightedSpans.forEach(span => {
            addGrammarHover(span, mainPattern, lesson);
          });
        }
        
        turnEl.appendChild(speaker);
        turnEl.appendChild(text);
        
        // ═══ LUXURIOUS Per-Line Audio Button ═══
        if (turn.audio_id) {
          const audioBtn = document.createElement("button");
          audioBtn.className = "dlg-audio-btn dlg-audio-btn--light";
          audioBtn.title = en('dialogue.audioTitle');
          audioBtn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.5v7a4.49 4.49 0 0 0 2.5-3.5zM14 3.23v2.06a7.007 7.007 0 0 1 0 13.42v2.06A9.013 9.013 0 0 0 14 3.23z"/></svg><span class="dlg-audio-waves"><span></span><span></span><span></span><span></span><span></span></span>`;
          
          audioBtn.addEventListener("click", () => {
            const player = getDialogueAudioPlayer();
            
            if (audioBtn.classList.contains('is-playing')) {
              if (player) player.toggle();
              audioBtn.classList.remove('is-playing');
              return;
            }
            
            // Reset all other buttons in this dialogue
            turnEl.parentElement?.querySelectorAll('.dlg-audio-btn').forEach(b => b.classList.remove('is-playing', 'is-loading'));
            
            audioBtn.classList.add('is-loading');
            const unitFolder = 'unit_' + getCurrentUnitId().toLowerCase().slice(1);
            const audioPath = `/audio_assets/${unitFolder}/lesson_dialogues/${turn.audio_id}.mp3`;
            
            if (player) {
              player.play(audioPath, audioBtn).then(() => {
                audioBtn.classList.remove('is-playing');
              }).catch(e => {
                console.error("Error playing audio:", e);
                audioBtn.classList.remove('is-loading', 'is-playing');
              });
              audioBtn.classList.remove('is-loading');
              audioBtn.classList.add('is-playing');
            }
          });
          
          turnEl.appendChild(audioBtn);
        }
        
        dialogueBox.appendChild(turnEl);
      });
    }

    wrapper.appendChild(dialogueBox);
    
    // Add separator between dialogues
    if (dialogueIdx < dialogueKeys.length - 1) {
      const separator = document.createElement("hr");
      separator.style.cssText = "margin: 30px 0; border: none; border-top: 2px dashed #bdc3c7;";
      wrapper.appendChild(separator);
    }
  });

  // Proceed button to go to next stage (Uzbek translation view)
  const proceedBtn = document.createElement("button");
  proceedBtn.textContent = uz('buttons.continue') + ' \u2192 ' + uz('dialoguePractice.uzTranslation');
  proceedBtn.classList.add('tl-uz');
  proceedBtn.dataset.translation = en('buttons.continue') + ' \u2192 Uzbek translation';
  proceedBtn.className = "btn-primary";
  proceedBtn.style.cssText = "margin-top: 20px; padding: 15px 30px; background: #27ae60; border: none; border-radius: 8px; color: white; font-size: 16px; cursor: pointer; display: block; width: 100%;";
  proceedBtn.addEventListener("click", () => {
    setIntegrationState('dialogue_uz');
    render();
  });
  wrapper.appendChild(proceedBtn);

  tileContainer.appendChild(wrapper);
  
  // Process vocabulary gap words for hover translations
  processVocabGaps();
}

/**
 * Render the Uzbek Dialogue Practice Tile
 * Shows the same dialogues but in Uzbek translation.
 *
 * @param {Object} dialogueContent - The dialogue data from integration content
 * @param {Object} lesson - The current lesson object
 */
export function renderDialogueUzbekTile(dialogueContent, lesson) {
  const tileContainer = getTileContainer();
  
  const wrapper = document.createElement("div");
  wrapper.className = "integration-dialogue-uzbek-tile tl-uz";

  const title = document.createElement("h2");
  title.textContent = uz('tiles.dialogue') + ' \u2014 ' + uz('dialoguePractice.inUzbek');
  title.classList.add('tl-uz');
  title.dataset.translation = en('tiles.dialogue') + ' \u2014 In Uzbek';
  title.style.cssText = "color: #2c3e50; margin-bottom: 20px; text-align: center;";
  wrapper.appendChild(title);

  const instruction = document.createElement("div");
  instruction.textContent = uz('dialoguePractice.readInUzbek');
  instruction.style.cssText = "background: #e8f8f5; padding: 15px; border-radius: 8px; margin-bottom: 20px; color: #1e8449; font-weight: bold;";
  wrapper.appendChild(instruction);

  // Get all dialogue objects from the nested structure
  const dialogueKeys = Object.keys(dialogueContent).filter(key => key.startsWith('dialogue_'));
  
  dialogueKeys.forEach((dialogueKey, dialogueIdx) => {
    const dialogue = dialogueContent[dialogueKey];
    
    // Uzbek dialogue box
    const dialogueBox = document.createElement("div");
    dialogueBox.className = "dialogue-box-uzbek";
    dialogueBox.style.cssText = "background: white; border: 2px solid #16a085; border-radius: 12px; padding: 20px; margin-bottom: 30px;";

    if (dialogue.turns && Array.isArray(dialogue.turns)) {
      dialogue.turns.forEach((turn, idx) => {
        const turnEl = document.createElement("div");
        turnEl.className = "dialogue-turn-uz";
        turnEl.style.cssText = "margin-bottom: 15px; padding: 12px; background: " + 
          (idx % 2 === 0 ? "#d5f4e6" : "#fdecea") + 
          "; border-radius: 8px;";
        
        const speaker = document.createElement("strong");
        speaker.textContent = turn.speaker + ": ";
        speaker.style.color = idx % 2 === 0 ? "#16a085" : "#e74c3c";
        
        const text = document.createElement("span");
        const turnTextForUz = turn.text || turn.text_en || '';
        text.textContent = turn.text_uz || translateToNaturalUzbek(turnTextForUz);
        text.classList.add("tl-uz");
        if (turnTextForUz) text.dataset.translation = turnTextForUz;
        
        turnEl.appendChild(speaker);
        turnEl.appendChild(text);
        dialogueBox.appendChild(turnEl);
      });
    }

    wrapper.appendChild(dialogueBox);
    
    // Add separator between dialogues
    if (dialogueIdx < dialogueKeys.length - 1) {
      const separator = document.createElement("hr");
      separator.style.cssText = "margin: 30px 0; border: none; border-top: 2px dashed #bdc3c7;";
      wrapper.appendChild(separator);
    }
  });

  // Proceed button
  const proceedBtn = document.createElement("button");
  proceedBtn.textContent = uz('nav.continue') + ' →';
  proceedBtn.classList.add('tl-uz');
  proceedBtn.dataset.translation = en('nav.continue') + ' →';
  proceedBtn.className = "btn-primary";
  proceedBtn.style.cssText = "padding: 15px 30px; background: #27ae60; border: none; border-radius: 8px; color: white; font-size: 16px; cursor: pointer; display: block; margin: 20px auto;";
  proceedBtn.addEventListener("click", () => {
    setIntegrationState('done');
    render();
  });
  wrapper.appendChild(proceedBtn);

  tileContainer.appendChild(wrapper);
}

// Backward compatibility for window-based access
if (typeof window !== 'undefined') {
  window.renderDialogueTile = renderDialogueTile;
  window.renderDialogueUzbekTile = renderDialogueUzbekTile;
  window.highlightGrammarTokens = highlightGrammarTokens;
  window.translateToNaturalUzbek = translateToNaturalUzbek;
}

export { highlightGrammarTokens, translateToNaturalUzbek };
