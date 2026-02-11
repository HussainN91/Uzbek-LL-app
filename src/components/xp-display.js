/**
 * xp-display.js - Gamification XP Badge Component
 * ================================================
 * Floating badge showing current XP, level, streak, and progress.
 * Animates on XP gain with satisfying visual feedback.
 * 
 * Design: Modern pill-shaped badge, unobtrusive but celebratory
 * 
 * @module src/components/xp-display
 * @version 1.0.0
 */

import { AppState, getXPProgress, updateStreak, XP_LEVELS } from '../state/app-state.js';

// ============================================================================
// CSS STYLES
// ============================================================================
const XP_DISPLAY_CSS = `
/* XP Display Badge */
.xp-badge {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(145deg, rgba(30, 30, 45, 0.95), rgba(20, 20, 35, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  padding: 8px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(100, 100, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
}
.xp-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 80px rgba(100, 100, 255, 0.1);
}
.xp-badge.hidden {
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
}

/* Level circle */
.xp-level-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 4px 12px rgba(78, 205, 196, 0.4);
  position: relative;
}
.xp-level-circle::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #f1c40f;
  animation: xp-ring-spin 2s linear infinite paused;
}
.xp-badge.gaining .xp-level-circle::after {
  animation-play-state: running;
}

/* XP info */
.xp-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.xp-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.xp-value {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
}
.xp-value .xp-amount {
  color: #f1c40f;
}
.xp-progress-bar {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}
.xp-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f1c40f, #e67e22);
  border-radius: 2px;
  transition: width 0.5s ease;
}

/* Streak */
.xp-streak {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(231, 76, 60, 0.2);
  border-radius: 20px;
  font-size: 13px;
  color: #e74c3c;
}
.xp-streak.active {
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
}
.xp-streak-icon {
  font-size: 14px;
}

/* XP gain animation */
.xp-gain-popup {
  position: fixed;
  z-index: 1001;
  font-size: 24px;
  font-weight: 700;
  color: #f1c40f;
  text-shadow: 0 2px 10px rgba(241, 196, 15, 0.6);
  pointer-events: none;
  animation: xp-float-up 1.5s ease forwards;
}
@keyframes xp-float-up {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  50% { opacity: 1; transform: translateY(-30px) scale(1.2); }
  100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
}
@keyframes xp-ring-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Level up celebration */
.level-up-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.level-up-overlay.visible {
  opacity: 1;
}
.level-up-card {
  background: linear-gradient(145deg, rgba(40, 40, 60, 0.98), rgba(30, 30, 50, 0.98));
  border: 2px solid rgba(241, 196, 15, 0.5);
  border-radius: 24px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 0 100px rgba(241, 196, 15, 0.3);
  transform: scale(0.8);
  transition: transform 0.4s ease;
}
.level-up-overlay.visible .level-up-card {
  transform: scale(1);
}
.level-up-icon {
  font-size: 64px;
  margin-bottom: 16px;
}
.level-up-title {
  font-size: 32px;
  font-weight: 700;
  color: #f1c40f;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 20px rgba(241, 196, 15, 0.5);
}
.level-up-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px 0;
}
.level-up-level {
  font-size: 72px;
  font-weight: 700;
  background: linear-gradient(135deg, #f1c40f 0%, #e67e22 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.level-up-btn {
  margin-top: 24px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.level-up-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
}

/* Expanded panel */
.xp-panel {
  position: fixed;
  top: 70px;
  right: 16px;
  width: 280px;
  z-index: 999;
  background: linear-gradient(145deg, rgba(30, 30, 45, 0.98), rgba(20, 20, 35, 0.99));
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  transform: translateY(-10px);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}
.xp-panel.visible {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.xp-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.xp-panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}
.xp-panel-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  cursor: pointer;
}
.xp-panel-close:hover {
  color: #fff;
}
.xp-panel-stat {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.xp-panel-stat:last-child {
  border-bottom: none;
}
.xp-panel-stat-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}
.xp-panel-stat-value {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
.xp-panel-stat-value.gold {
  color: #f1c40f;
}
.xp-panel-large-progress {
  margin-top: 16px;
}
.xp-panel-large-progress-bar {
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
}
.xp-panel-large-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f1c40f, #e67e22);
  border-radius: 6px;
  transition: width 0.5s ease;
}
.xp-panel-progress-text {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
`;

// Inject CSS once
let cssInjected = false;
function injectXPCSS() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.textContent = XP_DISPLAY_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// ============================================================================
// XP DISPLAY COMPONENT
// ============================================================================

let badgeElement = null;
let panelElement = null;
let isVisible = true;

/**
 * Create and mount the XP badge
 */
export function mountXPDisplay() {
  injectXPCSS();
  
  // Update streak on mount
  updateStreak();
  
  if (badgeElement) {
    updateXPDisplay();
    return;
  }
  
  badgeElement = document.createElement('div');
  badgeElement.className = 'xp-badge';
  badgeElement.innerHTML = getBadgeHTML();
  
  document.body.appendChild(badgeElement);
  
  // Click to expand panel
  badgeElement.addEventListener('click', togglePanel);
  
  // Create panel
  panelElement = document.createElement('div');
  panelElement.className = 'xp-panel';
  panelElement.innerHTML = getPanelHTML();
  document.body.appendChild(panelElement);
  
  // Panel close button
  panelElement.querySelector('.xp-panel-close')?.addEventListener('click', (e) => {
    e.stopPropagation();
    panelElement.classList.remove('visible');
  });
  
  // Close panel on outside click
  document.addEventListener('click', (e) => {
    if (!panelElement.contains(e.target) && !badgeElement.contains(e.target)) {
      panelElement.classList.remove('visible');
    }
  });
  
  // Listen for XP updates
  window.addEventListener('xpAwarded', handleXPGain);
  window.addEventListener('levelUp', handleLevelUp);
  
  console.log('[XP] Display mounted');
}

/**
 * Get badge inner HTML
 */
function getBadgeHTML() {
  const { xp, level, streak } = AppState.session;
  const { current, needed, progress } = getXPProgress();
  
  return `
    <div class="xp-level-circle">${level}</div>
    <div class="xp-info">
      <div class="xp-label">XP</div>
      <div class="xp-value">
        <span class="xp-amount">${xp}</span>
      </div>
      <div class="xp-progress-bar">
        <div class="xp-progress-fill" style="width: ${progress}%"></div>
      </div>
    </div>
    ${streak > 0 ? `
      <div class="xp-streak active">
        <span class="xp-streak-icon">🔥</span>
        <span>${streak}</span>
      </div>
    ` : ''}
  `;
}

/**
 * Get panel inner HTML
 */
function getPanelHTML() {
  const { xp, level, streak, badges } = AppState.session;
  const { current, needed, progress } = getXPProgress();
  const nextLevelXP = XP_LEVELS[level] || 'MAX';
  
  return `
    <div class="xp-panel-header">
      <span class="xp-panel-title">📊 Statistika</span>
      <button class="xp-panel-close">&times;</button>
    </div>
    <div class="xp-panel-stat">
      <span class="xp-panel-stat-label">Daraja</span>
      <span class="xp-panel-stat-value gold">${level}</span>
    </div>
    <div class="xp-panel-stat">
      <span class="xp-panel-stat-label">Jami XP</span>
      <span class="xp-panel-stat-value">${xp}</span>
    </div>
    <div class="xp-panel-stat">
      <span class="xp-panel-stat-label">Kunlik streak</span>
      <span class="xp-panel-stat-value">${streak > 0 ? '🔥 ' + streak + ' kun' : '— '}</span>
    </div>
    <div class="xp-panel-stat">
      <span class="xp-panel-stat-label">Nishonlar</span>
      <span class="xp-panel-stat-value">${badges?.length || 0}</span>
    </div>
    <div class="xp-panel-large-progress">
      <div class="xp-panel-large-progress-bar">
        <div class="xp-panel-large-progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="xp-panel-progress-text">
        <span>${current} XP</span>
        <span>${needed} gacha</span>
      </div>
    </div>
  `;
}

/**
 * Toggle panel visibility
 */
function togglePanel() {
  if (panelElement) {
    panelElement.classList.toggle('visible');
    // Update panel content
    panelElement.innerHTML = getPanelHTML();
    panelElement.querySelector('.xp-panel-close')?.addEventListener('click', (e) => {
      e.stopPropagation();
      panelElement.classList.remove('visible');
    });
  }
}

/**
 * Update XP display
 */
export function updateXPDisplay() {
  if (!badgeElement) return;
  badgeElement.innerHTML = getBadgeHTML();
}

/**
 * Handle XP gain event
 * @param {CustomEvent} e - Event with detail.xp and detail.reason
 */
function handleXPGain(e) {
  const { xp, reason } = e.detail || {};
  if (!xp) return;
  
  // Update display
  updateXPDisplay();
  
  // Show gain animation
  badgeElement?.classList.add('gaining');
  setTimeout(() => badgeElement?.classList.remove('gaining'), 500);
  
  // Float up XP number from badge
  if (badgeElement) {
    const rect = badgeElement.getBoundingClientRect();
    const popup = document.createElement('div');
    popup.className = 'xp-gain-popup';
    popup.textContent = `+${xp}`;
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.bottom}px`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1500);
  }
}

/**
 * Handle level up event
 * @param {CustomEvent} e - Event with detail.newLevel
 */
function handleLevelUp(e) {
  const { newLevel } = e.detail || {};
  if (!newLevel) return;
  
  // Show level up celebration
  const overlay = document.createElement('div');
  overlay.className = 'level-up-overlay';
  overlay.innerHTML = `
    <div class="level-up-card">
      <div class="level-up-icon">🎉</div>
      <h2 class="level-up-title">DARAJA KO'TARILDI!</h2>
      <p class="level-up-subtitle">Siz yangi darajaga yetdingiz!</p>
      <div class="level-up-level">${newLevel}</div>
      <button class="level-up-btn">Zo'r! Davom etamiz</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });
  
  // Close button
  overlay.querySelector('.level-up-btn')?.addEventListener('click', () => {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 300);
  });
  
  // Update badge
  updateXPDisplay();
}

/**
 * Hide XP display
 */
export function hideXPDisplay() {
  if (badgeElement) {
    badgeElement.classList.add('hidden');
    isVisible = false;
  }
}

/**
 * Show XP display
 */
export function showXPDisplay() {
  if (badgeElement) {
    badgeElement.classList.remove('hidden');
    isVisible = true;
  }
}

/**
 * Unmount XP display
 */
export function unmountXPDisplay() {
  if (badgeElement) {
    badgeElement.remove();
    badgeElement = null;
  }
  if (panelElement) {
    panelElement.remove();
    panelElement = null;
  }
  window.removeEventListener('xpAwarded', handleXPGain);
  window.removeEventListener('levelUp', handleLevelUp);
}

// ============================================================================
// BACKWARD COMPATIBILITY
// ============================================================================

window.XPDisplay = {
  mount: mountXPDisplay,
  unmount: unmountXPDisplay,
  update: updateXPDisplay,
  show: showXPDisplay,
  hide: hideXPDisplay
};
