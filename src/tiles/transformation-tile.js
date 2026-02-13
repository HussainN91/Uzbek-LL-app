/**
 * Transformation Tile Module
 * ===========================
 * Handles the text transformation exercise where students transform
 * sentences based on given scenarios (e.g., change time reference,
 * switch from habit to now, etc.)
 * 
 * Part of the integration lesson flow.
 *
 * @module src/tiles/transformation-tile
 * @version 1.0.0 (Phase 2 Refactor)
 */

import { getTileContainer } from './tile-utils.js';
import { uz, en } from '../core/i18n.js';

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
 * Access integration progress from window
 */
function getIntegrationProgress() {
  return window.integrationProgress || { 
    dialogueAnswered: false, 
    transformationsPassed: 0, 
    totalTransformations: 0 
  };
}

function updateIntegrationProgress(updates) {
  if (window.integrationProgress) {
    Object.assign(window.integrationProgress, updates);
  } else {
    window.integrationProgress = { 
      dialogueAnswered: false, 
      transformationsPassed: 0, 
      totalTransformations: 0,
      ...updates
    };
  }
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
 * Access normalizeText from window
 */
function normalizeText(text) {
  if (typeof window.normalizeText === 'function') {
    return window.normalizeText(text);
  }
  // Fallback implementation
  return (text || '').toLowerCase().trim().replace(/[^\w\s]/g, '');
}

/**
 * Render the Transformation Tile
 * Text transformation exercise with progress tracking and validation.
 *
 * @param {Object} transformContent - The transformation data from integration content
 * @param {Object} lesson - The current lesson object
 */
export function renderTransformationTile(transformContent, lesson) {
  const tileContainer = getTileContainer();
  const progress = getIntegrationProgress();
  
  const wrapper = document.createElement("div");
  wrapper.className = "integration-transformation-tile";

  // Title
  const title = document.createElement("h2");
  title.textContent = uz('transformation.tileTitle');
  title.style.cssText = "color: #2c3e50; margin-bottom: 20px; text-align: center;";
  wrapper.appendChild(title);

  // Progress indicator
  const progressBar = document.createElement("div");
  progressBar.className = "transformation-progress";
  progressBar.style.cssText = "background: #ecf0f1; height: 8px; border-radius: 4px; margin-bottom: 20px; overflow: hidden;";
  
  const progressFill = document.createElement("div");
  const progressPct = (progress.transformationsPassed / progress.totalTransformations) * 100;
  progressFill.style.cssText = `background: linear-gradient(90deg, #3498db, #2ecc71); height: 100%; width: ${progressPct}%; transition: width 0.5s;`;
  progressBar.appendChild(progressFill);
  wrapper.appendChild(progressBar);

  const progressText = document.createElement("div");
  progressText.textContent = uz('transformation.progressLabel').replace('{passed}', progress.transformationsPassed).replace('{total}', progress.totalTransformations);
  progressText.style.cssText = "text-align: center; color: #7f8c8d; margin-bottom: 30px; font-weight: bold;";
  wrapper.appendChild(progressText);

  // Check if all transformations are complete
  const currentIdx = progress.transformationsPassed;
  if (currentIdx >= transformContent.transformations.length) {
    // All done, move to next tile
    setIntegrationState('listen_write');
    render();
    return;
  }

  const transformation = transformContent.transformations[currentIdx];

  // Base scenario box
  const scenarioBox = document.createElement("div");
  scenarioBox.className = "transformation-scenario";
  scenarioBox.style.cssText = "background: #e8f4f8; padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #3498db;";
  
  const scenarioLabel = document.createElement("div");
  scenarioLabel.textContent = uz('transformation.scenario');
  scenarioLabel.style.cssText = "font-weight: bold; color: #2980b9; margin-bottom: 10px;";
  scenarioBox.appendChild(scenarioLabel);

  const baseSentence = document.createElement("div");
  baseSentence.textContent = transformContent.base_sentence;
  baseSentence.style.cssText = "font-size: 18px; padding: 10px; background: white; border-radius: 8px;";
  scenarioBox.appendChild(baseSentence);
  wrapper.appendChild(scenarioBox);

  // Change prompt box
  const changeBox = document.createElement("div");
  changeBox.className = "transformation-change";
  changeBox.style.cssText = "background: #fff3cd; padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #f39c12;";
  
  const changeLabel = document.createElement("div");
  changeLabel.textContent = uz('transformation.change');
  changeLabel.style.cssText = "font-weight: bold; color: #856404; margin-bottom: 10px;";
  changeBox.appendChild(changeLabel);

  const changeText = document.createElement("div");
  changeText.textContent = transformation.change_uz;
  changeText.style.cssText = "font-size: 16px;";
  changeBox.appendChild(changeText);
  wrapper.appendChild(changeBox);

  // Input area
  const inputBox = document.createElement("div");
  inputBox.className = "transformation-input";
  inputBox.style.cssText = "background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 2px solid #3498db;";

  const inputLabel = document.createElement("div");
  inputLabel.textContent = uz('transformation.rewrite');
  inputLabel.style.cssText = "font-weight: bold; color: #2c3e50; margin-bottom: 15px;";
  inputBox.appendChild(inputLabel);

  const textarea = document.createElement("textarea");
  textarea.className = "transformation-textarea";
  textarea.placeholder = uz('transformation.placeholder');
  textarea.style.cssText = "width: 100%; padding: 15px; font-size: 16px; border: 2px solid #bdc3c7; border-radius: 8px; resize: vertical; min-height: 80px; font-family: inherit;";
  inputBox.appendChild(textarea);

  // Check button
  const checkBtn = document.createElement("button");
  checkBtn.textContent = uz('transformation.checkBtn');
  checkBtn.className = "btn-check-transformation";
  checkBtn.style.cssText = "margin-top: 15px; padding: 12px 25px; background: #3498db; border: none; border-radius: 8px; color: white; font-size: 16px; cursor: pointer;";
  
  // Feedback element
  const feedbackEl = document.createElement("div");
  feedbackEl.className = "transformation-feedback";
  feedbackEl.style.cssText = "margin-top: 15px; padding: 15px; border-radius: 8px; display: none;";

  checkBtn.addEventListener("click", () => {
    const userAnswer = textarea.value.trim();
    const correctAnswer = transformation.correct_form;
    
    const isCorrect = normalizeText(userAnswer) === normalizeText(correctAnswer);
    
    if (isCorrect) {
      feedbackEl.style.display = "block";
      feedbackEl.style.background = "#d5f4e6";
      feedbackEl.style.borderLeft = "4px solid #27ae60";
      feedbackEl.innerHTML = `
        <div style="color: #27ae60; font-weight: bold; margin-bottom: 10px;">${uz('transformation.correct')}</div>
        <div style="color: #1e8449;">${transformation.explanation_uz}</div>
      `;
      
      // Update progress
      updateIntegrationProgress({
        transformationsPassed: progress.transformationsPassed + 1
      });
      
      setTimeout(() => {
        render(); // Move to next transformation
      }, 2000);
    } else {
      feedbackEl.style.display = "block";
      feedbackEl.style.background = "#fdecea";
      feedbackEl.style.borderLeft = "4px solid #e74c3c";
      feedbackEl.innerHTML = `
        <div style="color: #e74c3c; font-weight: bold; margin-bottom: 10px;">${uz('transformation.incorrect')}</div>
        <div style="color: #c0392b;">${uz('transformation.correctAnswer')}<strong>${correctAnswer}</strong></div>
      `;
    }
  });

  inputBox.appendChild(checkBtn);
  inputBox.appendChild(feedbackEl);
  wrapper.appendChild(inputBox);

  tileContainer.appendChild(wrapper);
}

// Backward compatibility for window-based access
if (typeof window !== 'undefined') {
  window.renderTransformationTile = renderTransformationTile;
}

export default renderTransformationTile;
