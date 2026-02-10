/**
 * Timing Utility Functions
 * ========================
 * Debounce, throttle, and timing utilities.
 * Pure ES Module - no dependencies.
 * 
 * @module src/utils/timing
 * @version 2.0.0 (Phase 2 Refactor)
 */

/**
 * Debounce a function - delays execution until after wait ms
 * @param {Function} fn - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, wait) {
  let timeoutId = null;
  
  const debounced = function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), wait);
  };
  
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
}

/**
 * Throttle a function - limits execution to once per limit ms
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Minimum time between calls in ms
 * @returns {Function} Throttled function
 */
export function throttle(fn, limit) {
  let inThrottle = false;
  let lastArgs = null;
  
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          fn.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

/**
 * Sleep/delay for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wait for next animation frame
 * @returns {Promise<number>} Frame timestamp
 */
export function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

/**
 * Wait for browser idle time
 * @param {number} [timeout=1000] - Maximum wait time
 * @returns {Promise<IdleDeadline>}
 */
export function whenIdle(timeout = 1000) {
  return new Promise(resolve => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(resolve, { timeout });
    } else {
      setTimeout(() => resolve({ didTimeout: true, timeRemaining: () => 0 }), 1);
    }
  });
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {Object} [options] - Retry options
 * @param {number} [options.maxRetries=3] - Maximum retry attempts
 * @param {number} [options.baseDelay=100] - Base delay in ms
 * @param {number} [options.maxDelay=5000] - Maximum delay in ms
 * @returns {Promise<*>} Function result
 */
export async function retry(fn, options = {}) {
  const { maxRetries = 3, baseDelay = 100, maxDelay = 5000 } = options;
  
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (attempt < maxRetries - 1) {
        const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
        await sleep(delay);
      }
    }
  }
  
  throw lastError;
}

/**
 * Execute a function with a timeout
 * @param {Function} fn - Async function to execute
 * @param {number} ms - Timeout in milliseconds
 * @param {string} [errorMessage='Operation timed out'] - Error message
 * @returns {Promise<*>} Function result
 */
export function withTimeout(fn, ms, errorMessage = 'Operation timed out') {
  return Promise.race([
    fn(),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(errorMessage)), ms)
    ),
  ]);
}

/**
 * Create an interval that can be paused/resumed
 * @param {Function} fn - Function to call
 * @param {number} interval - Interval in milliseconds
 * @returns {Object} Controller with start, stop, pause, resume methods
 */
export function createInterval(fn, interval) {
  let intervalId = null;
  let isPaused = false;
  
  return {
    start() {
      if (intervalId) return;
      intervalId = setInterval(() => {
        if (!isPaused) fn();
      }, interval);
    },
    stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    pause() {
      isPaused = true;
    },
    resume() {
      isPaused = false;
    },
    get isRunning() {
      return intervalId !== null && !isPaused;
    },
  };
}

// ============================
// BACKWARD COMPATIBILITY BRIDGE
// ============================
if (typeof window !== 'undefined') {
  window.TimingUtils = {
    debounce,
    throttle,
    sleep,
    nextFrame,
    whenIdle,
    retry,
    withTimeout,
    createInterval,
  };
}
