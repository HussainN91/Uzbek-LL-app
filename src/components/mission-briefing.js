/**
 * mission-briefing.js - Gamified Pre-Dialogue Gateway
 * =====================================================
 * Shows a drag-and-drop exercise before entering dialogue tiles
 * to familiarize students with key phrases they'll encounter.
 * 
 * Design: Dark glassmorphism overlay matching Activity Context Card
 * Purpose: Prime students for success by pre-teaching key chunks
 * 
 * @module src/components/mission-briefing
 * @version 1.0.0
 */

import { shouldShowActivityCards, getLanguageDisplay, awardXP } from '../state/app-state.js';

// ============================================================================
// CSS STYLES (injected once)
// ============================================================================
const MISSION_CSS = `
.mission-briefing-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 20px;
}
.mission-briefing-overlay.visible {
  opacity: 1;
}
.mission-briefing-card {
  background: linear-gradient(145deg, rgba(30, 30, 45, 0.95), rgba(20, 20, 35, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(100, 100, 255, 0.1);
  transform: scale(0.9) translateY(20px);
  transition: transform 0.3s ease;
}
.mission-briefing-overlay.visible .mission-briefing-card {
  transform: scale(1) translateY(0);
}
.mission-briefing-header {
  text-align: center;
  margin-bottom: 24px;
}
.mission-briefing-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
.mission-briefing-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
}
.mission-briefing-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}

/* Progress bar */
.mission-progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 24px;
  overflow: hidden;
}
.mission-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ecdc4, #44a08d);
  width: 0%;
  transition: width 0.4s ease;
  border-radius: 4px;
}

/* Exercise area */
.mission-exercise {
  margin-bottom: 24px;
}
.mission-instruction {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
  text-align: center;
  line-height: 1.5;
}

/* Phrase to translate */
.mission-phrase {
  background: rgba(74, 144, 226, 0.15);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 20px;
  text-align: center;
}
.mission-phrase-text {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  line-height: 1.4;
}
.mission-phrase-speaker {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 6px;
}

/* Drop zone */
.mission-drop-zone {
  min-height: 60px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.mission-drop-zone.dragover {
  border-color: #4ecdc4;
  background: rgba(78, 205, 196, 0.1);
}
.mission-drop-zone.correct {
  border-color: #2ecc71;
  background: rgba(46, 204, 113, 0.15);
}
.mission-drop-zone.incorrect {
  border-color: #e74c3c;
  background: rgba(231, 76, 60, 0.15);
  animation: shake 0.5s ease;
}
.mission-drop-placeholder {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

/* Draggable chunks */
.mission-chunk-pool {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 24px;
}
.mission-chunk {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  cursor: grab;
  user-select: none;
  transition: all 0.2s ease;
}
.mission-chunk:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  transform: translateY(-2px);
}
.mission-chunk:active {
  cursor: grabbing;
  transform: scale(0.95);
}
.mission-chunk.dragging {
  opacity: 0.5;
  transform: scale(0.9);
}
.mission-chunk.placed {
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.3), rgba(68, 160, 141, 0.2));
  border-color: rgba(78, 205, 196, 0.5);
}
.mission-chunk.correct-placed {
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.4), rgba(39, 174, 96, 0.3));
  border-color: #2ecc71;
}

/* Feedback */
.mission-feedback {
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}
.mission-feedback.visible {
  opacity: 1;
  transform: translateY(0);
}
.mission-feedback.success {
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
}
.mission-feedback.error {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
}
.mission-feedback.hint {
  background: rgba(243, 156, 18, 0.2);
  color: #f1c40f;
  border: 1px solid rgba(243, 156, 18, 0.3);
}

/* Actions */
.mission-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.mission-btn {
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.mission-btn-primary {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: #fff;
  box-shadow: 0 4px 20px rgba(78, 205, 196, 0.4);
}
.mission-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(78, 205, 196, 0.5);
}
.mission-btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
.mission-btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.mission-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* XP reward animation */
.mission-xp-reward {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  font-weight: 700;
  color: #f1c40f;
  text-shadow: 0 0 20px rgba(241, 196, 15, 0.6);
  opacity: 0;
  animation: xp-pop 0.8s ease forwards;
}
@keyframes xp-pop {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
  50% { opacity: 1; transform: translate(-50%, -70%) scale(1.2); }
  100% { opacity: 0; transform: translate(-50%, -100%) scale(1); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Skip button */
.mission-skip-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.6);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.mission-skip-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
}
`;

// Inject CSS once
let cssInjected = false;
function injectMissionCSS() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.textContent = MISSION_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// ============================================================================
// MISSION BRIEFING LOGIC
// ============================================================================

/**
 * Extract chunked phrases from dialogue data
 * @param {Object} lesson - Lesson object with lesson_dialogue
 * @returns {Array} Array of exercise items with uz/en pairs
 */
function extractDialogueChunks(lesson) {
  const exercises = [];
  const dialogueData = lesson?.lesson_dialogue;
  
  if (!dialogueData?.dialogues) return exercises;
  
  // Get first 3-4 dialogue lines with text_chunks or target words
  for (const dialogue of dialogueData.dialogues) {
    if (!dialogue.turns) continue;
    
    for (const turn of dialogue.turns) {
      if (exercises.length >= 3) break; // Max 3 exercises
      
      // Prefer text_chunks if available
      if (turn.text_chunks && turn.text_chunks.length > 0) {
        exercises.push({
          type: 'reorder',
          speaker: turn.speaker,
          uz: turn.uz || turn.text_uz || '',
          en: turn.en || turn.text_en || '',
          chunks: turn.text_chunks.map(c => ({ en: c.en, uz: c.uz }))
        });
      } else if (turn.en && turn.uz) {
        // Create chunks from words
        const words = turn.en.split(/\s+/).filter(w => w.length > 0);
        if (words.length >= 3 && words.length <= 8) {
          exercises.push({
            type: 'reorder',
            speaker: turn.speaker,
            uz: turn.uz,
            en: turn.en,
            chunks: words.map(w => ({ en: w, uz: '' }))
          });
        }
      }
    }
    
    if (exercises.length >= 3) break;
  }
  
  return exercises;
}

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Show Mission Briefing before dialogue
 * @param {Object} lesson - Lesson object
 * @returns {Promise} Resolves when complete or skipped
 */
export async function showMissionBriefing(lesson) {
  // Check if should show
  if (!shouldShowActivityCards()) {
    return Promise.resolve();
  }
  
  // Teacher mode skips
  if (window.TEACHER_MODE || window.AppState?.modes?.teacher) {
    return Promise.resolve();
  }
  
  const exercises = extractDialogueChunks(lesson);
  
  // No exercises available
  if (exercises.length === 0) {
    console.log('[MissionBriefing] No dialogue chunks available, skipping');
    return Promise.resolve();
  }
  
  injectMissionCSS();
  
  return new Promise((resolve) => {
    let currentExerciseIndex = 0;
    let placedChunks = [];
    let draggedChunk = null;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mission-briefing-overlay';
    overlay.innerHTML = `
      <div class="mission-briefing-card" style="position: relative;">
        <button class="mission-skip-btn">O'tkazib yuborish →</button>
        
        <div class="mission-briefing-header">
          <div class="mission-briefing-icon">🎯</div>
          <h2 class="mission-briefing-title">Dialogga tayyorgarlik</h2>
          <p class="mission-briefing-subtitle">So'zlarni to'g'ri tartibga qo'ying</p>
        </div>
        
        <div class="mission-progress-bar">
          <div class="mission-progress-fill" id="mission-progress"></div>
        </div>
        
        <div class="mission-exercise" id="mission-exercise-area">
          <!-- Exercise content rendered here -->
        </div>
        
        <div class="mission-feedback" id="mission-feedback"></div>
        
        <div class="mission-actions">
          <button class="mission-btn mission-btn-secondary" id="mission-hint-btn">💡 Yordam</button>
          <button class="mission-btn mission-btn-primary" id="mission-check-btn" disabled>Tekshirish ✓</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animate in
    requestAnimationFrame(() => {
      overlay.classList.add('visible');
    });
    
    const exerciseArea = overlay.querySelector('#mission-exercise-area');
    const progressFill = /** @type {HTMLElement} */ (overlay.querySelector('#mission-progress'));
    const feedback = /** @type {HTMLElement} */ (overlay.querySelector('#mission-feedback'));
    const checkBtn = /** @type {HTMLButtonElement} */ (overlay.querySelector('#mission-check-btn'));
    const hintBtn = overlay.querySelector('#mission-hint-btn');
    const skipBtn = overlay.querySelector('.mission-skip-btn');
    
    // Skip handler
    skipBtn.addEventListener('click', () => {
      cleanup();
      resolve();
    });
    
    // Render current exercise
    function renderExercise() {
      const exercise = exercises[currentExerciseIndex];
      const langDisplay = getLanguageDisplay();
      const showUzbek = langDisplay === 'all-uz' || langDisplay === 'auto';
      
      placedChunks = [];
      updateCheckButton();
      
      // Shuffle chunks
      const shuffledChunks = shuffleArray(exercise.chunks);
      
      exerciseArea.innerHTML = `
        <div class="mission-instruction">
          ${showUzbek ? 'O\'zbek tilidagi gapni ingliz tiliga tarjima qiling:' : 'Arrange the words in correct order:'}
        </div>
        
        <div class="mission-phrase">
          <div class="mission-phrase-text">${exercise.uz || exercise.en}</div>
          ${exercise.speaker ? `<div class="mission-phrase-speaker">— ${exercise.speaker}</div>` : ''}
        </div>
        
        <div class="mission-drop-zone" id="mission-drop-zone">
          <span class="mission-drop-placeholder">So'zlarni shu yerga torting...</span>
        </div>
        
        <div class="mission-chunk-pool" id="mission-chunk-pool">
          ${shuffledChunks.map((chunk, i) => `
            <div class="mission-chunk" draggable="true" data-index="${i}" data-en="${chunk.en}">
              ${chunk.en}
            </div>
          `).join('')}
        </div>
      `;
      
      // Update progress
      const progress = ((currentExerciseIndex) / exercises.length) * 100;
      progressFill.style.width = `${progress}%`;
      
      // Setup drag-and-drop
      setupDragAndDrop();
      
      // Hide feedback
      feedback.classList.remove('visible', 'success', 'error', 'hint');
    }
    
    function setupDragAndDrop() {
      const chunks = exerciseArea.querySelectorAll('.mission-chunk');
      const dropZone = exerciseArea.querySelector('#mission-drop-zone');
      const chunkPool = exerciseArea.querySelector('#mission-chunk-pool');
      
      chunks.forEach(chunk => {
        chunk.addEventListener('dragstart', (e) => {
          draggedChunk = chunk;
          chunk.classList.add('dragging');
          /** @type {DragEvent} */ (e).dataTransfer.effectAllowed = 'move';
        });
        
        chunk.addEventListener('dragend', () => {
          chunk.classList.remove('dragging');
          draggedChunk = null;
        });
        
        // Touch support
        chunk.addEventListener('click', () => {
          if (chunk.classList.contains('placed')) {
            // Remove from drop zone
            chunkPool.appendChild(chunk);
            chunk.classList.remove('placed');
            placedChunks = placedChunks.filter(c => c !== chunk);
          } else {
            // Add to drop zone
            const placeholder = dropZone.querySelector('.mission-drop-placeholder');
            if (placeholder) placeholder.remove();
            dropZone.appendChild(chunk);
            chunk.classList.add('placed');
            placedChunks.push(chunk);
          }
          updateCheckButton();
          dropZone.classList.remove('correct', 'incorrect');
        });
      });
      
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
      
      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
      });
      
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        if (draggedChunk && !draggedChunk.classList.contains('placed')) {
          const placeholder = dropZone.querySelector('.mission-drop-placeholder');
          if (placeholder) placeholder.remove();
          dropZone.appendChild(draggedChunk);
          draggedChunk.classList.add('placed');
          placedChunks.push(draggedChunk);
          updateCheckButton();
        }
      });
      
      // Click on drop zone to return chunks
      dropZone.addEventListener('click', (e) => {
        const target = /** @type {HTMLElement} */ (e.target);
        if (target.classList.contains('mission-chunk')) {
          chunkPool.appendChild(target);
          target.classList.remove('placed');
          placedChunks = placedChunks.filter(c => c !== target);
          updateCheckButton();
          
          if (placedChunks.length === 0) {
            dropZone.innerHTML = '<span class="mission-drop-placeholder">So\'zlarni shu yerga torting...</span>';
          }
          dropZone.classList.remove('correct', 'incorrect');
        }
      });
    }
    
    function updateCheckButton() {
      const exercise = exercises[currentExerciseIndex];
      checkBtn.disabled = placedChunks.length < exercise.chunks.length;
    }
    
    // Check answer
    checkBtn.addEventListener('click', () => {
      const exercise = exercises[currentExerciseIndex];
      const dropZone = exerciseArea.querySelector('#mission-drop-zone');
      
      // Get placed order
      const placedOrder = placedChunks.map(c => c.dataset.en);
      const correctOrder = exercise.chunks.map(c => c.en);
      
      // Compare
      const isCorrect = placedOrder.join(' ') === correctOrder.join(' ');
      
      if (isCorrect) {
        dropZone.classList.add('correct');
        dropZone.classList.remove('incorrect');
        placedChunks.forEach(c => c.classList.add('correct-placed'));
        
        feedback.textContent = "🎉 To'g'ri! Zo'r!";
        feedback.className = 'mission-feedback visible success';
        
        // Award XP
        awardXP(15, 'Mission Briefing: correct answer');
        
        // Show XP animation
        const xpEl = document.createElement('div');
        xpEl.className = 'mission-xp-reward';
        xpEl.textContent = '+15 XP';
        overlay.querySelector('.mission-briefing-card').appendChild(xpEl);
        setTimeout(() => xpEl.remove(), 1000);
        
        // Next exercise or complete
        setTimeout(() => {
          currentExerciseIndex++;
          if (currentExerciseIndex >= exercises.length) {
            // All complete!
            progressFill.style.width = '100%';
            feedback.textContent = "🏆 Tayyorgarlik tugadi! Dialogga o'taylik!";
            
            setTimeout(() => {
              cleanup();
              resolve();
            }, 1500);
          } else {
            renderExercise();
          }
        }, 1200);
        
        checkBtn.disabled = true;
      } else {
        dropZone.classList.add('incorrect');
        dropZone.classList.remove('correct');
        
        feedback.textContent = "❌ Qaytadan urinib ko'ring";
        feedback.className = 'mission-feedback visible error';
        
        // Allow retry
        setTimeout(() => {
          dropZone.classList.remove('incorrect');
          feedback.classList.remove('visible');
        }, 1500);
      }
    });
    
    // Hint handler
    hintBtn.addEventListener('click', () => {
      const exercise = exercises[currentExerciseIndex];
      const firstCorrect = exercise.chunks[0];
      
      feedback.textContent = `💡 Birinchi so'z: "${firstCorrect.en}"`;
      feedback.className = 'mission-feedback visible hint';
      
      setTimeout(() => {
        feedback.classList.remove('visible');
      }, 3000);
    });
    
    function cleanup() {
      overlay.classList.remove('visible');
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
    
    // Keyboard handler
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        cleanup();
        resolve();
      } else if (e.key === 'Enter' && !checkBtn.disabled) {
        checkBtn.click();
      }
    }
    document.addEventListener('keydown', handleKeydown);
    
    // Clean up handler
    /** @type {any} */ (overlay)._cleanup = () => {
      document.removeEventListener('keydown', handleKeydown);
    };
    
    // Start!
    renderExercise();
  });
}

// Backward compatibility
window.showMissionBriefing = showMissionBriefing;
