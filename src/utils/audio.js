/**
 * Audio Utility Functions
 * =======================
 * Sound effects and audio feedback.
 * Pure ES Module.
 * 
 * @module src/utils/audio
 * @version 2.0.0 (Phase 2 Refactor)
 */

import { SOUND_CONFIGS } from './constants.js';

// Shared AudioContext instance
let audioContext = null;

/**
 * Get or create AudioContext
 * @returns {AudioContext|null}
 */
function getAudioContext() {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext not supported');
      return null;
    }
  }
  
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  return audioContext;
}

/**
 * Play a sound effect
 * @param {'correct'|'wrong'|'complete'|'click'} type - Sound type
 */
export function playSound(type) {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const config = SOUND_CONFIGS[type] || SOUND_CONFIGS.click;
  const now = ctx.currentTime;
  
  config.notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = /** @type {OscillatorType} */ (config.type);
    osc.frequency.value = freq;
    
    // ADSR envelope for natural sound
    const startTime = now + i * 0.05;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.15, startTime + config.envelope.attack);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + config.duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + config.duration + 0.05);
  });
}

/**
 * Play correct answer sound
 */
export function playCorrectSound() {
  playSound('correct');
}

/**
 * Play wrong answer sound
 */
export function playWrongSound() {
  playSound('wrong');
}

/**
 * Play completion/success sound
 */
export function playCompleteSound() {
  playSound('complete');
}

/**
 * Play click/tap sound
 */
export function playClickSound() {
  playSound('click');
}

/**
 * Preload audio context (call on first user interaction)
 */
export function initAudio() {
  getAudioContext();
}

// ============================
// SPEECH SYNTHESIS
// ============================

/**
 * Check if speech synthesis is available
 * @returns {boolean}
 */
export function isSpeechAvailable() {
  return 'speechSynthesis' in window;
}

/**
 * Speak text using speech synthesis
 * @param {string} text - Text to speak
 * @param {Object} [options] - Speech options
 * @param {string} [options.lang='en-US'] - Language code
 * @param {number} [options.rate=1] - Speech rate (0.1-10)
 * @param {number} [options.pitch=1] - Pitch (0-2)
 * @param {number} [options.volume=1] - Volume (0-1)
 * @returns {Promise<void>}
 */
export function speak(text, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isSpeechAvailable()) {
      reject(new Error('Speech synthesis not available'));
      return;
    }
    
    const { lang = 'en-US', rate = 1, pitch = 1, volume = 1 } = options;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    
    speechSynthesis.speak(utterance);
  });
}

/**
 * Stop any ongoing speech
 */
export function stopSpeech() {
  if (isSpeechAvailable()) {
    speechSynthesis.cancel();
  }
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  window.AudioUtils = {
    playSound,
    playCorrectSound,
    playWrongSound,
    playCompleteSound,
    playClickSound,
    initAudio,
    isSpeechAvailable,
    speak,
    stopSpeech,
  };
  
  // Legacy function name
  window.playSound = playSound;
}
