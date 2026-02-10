/**
 * Tile Registry & Lifecycle Manager
 * ==================================
 * Replaces window.* tile dispatch with a centralized registry.
 * Each tile implements mount/unmount for proper cleanup.
 *
 * @module src/tiles/tile-registry
 * @version 1.0.0
 */

// ============================
// TYPES
// ============================

/**
 * @typedef {Object} TileDefinition
 * @property {string} name - Human-readable tile name
 * @property {(data: any, extra?: any) => void} mount - Render tile (tile finds its own container)
 * @property {() => void} [unmount] - Cleanup: remove listeners, cancel timers
 */

/** @type {Map<string, TileDefinition>} */
const registry = new Map();

/** @type {TileDefinition|null} */
let activeTile = null;

// ============================
// REGISTRATION
// ============================

/**
 * Register a tile renderer
 * @param {string} id - State constant value (e.g., 'vocab', 'intro')
 * @param {TileDefinition} definition - Tile implementation
 */
export function registerTile(id, definition) {
  if (registry.has(id)) {
    console.warn(`⚠️ Tile "${id}" already registered, overwriting`);
  }
  registry.set(id, definition);
}

/**
 * Register a tile with just a render function (convenience for legacy tiles)
 * @param {string} id - State constant value
 * @param {string} name - Human-readable name
 * @param {(data: any, extra?: any) => void} renderFn - Render function
 */
export function registerSimpleTile(id, name, renderFn) {
  registerTile(id, {
    name,
    mount: renderFn,
    unmount: () => {} // No cleanup needed for simple tiles
  });
}

// ============================
// LIFECYCLE
// ============================

/**
 * Mount a tile by state ID.
 * Unmounts the previous tile first.
 * @param {string} stateId - State constant (e.g., 'vocab')
 * @param {any} data - Primary data (usually lesson)
 * @param {any} [extra] - Optional extra data
 * @returns {boolean} True if tile was found and mounted
 */
export function mountTile(stateId, data, extra) {
  // Unmount previous tile
  unmountActive();

  const definition = registry.get(stateId);
  if (!definition) {
    console.error(`❌ No tile registered for state: "${stateId}"`);
    console.log('%c[DIAG] Registered tile IDs:', 'color:#f66', [...registry.keys()]);
    return false;
  }

  activeTile = definition;
  console.log(`%c[DIAG] mountTile("${stateId}") → "${definition.name}" fn=${definition.mount?.name || 'anonymous'}`, 'background:#333;color:#8f8;padding:2px 6px;');

  try {
    if (extra !== undefined) {
      definition.mount(data, extra);
    } else {
      definition.mount(data);
    }
    console.log(`%c[DIAG] mountTile("${stateId}") completed OK`, 'color:#0f0');
    return true;
  } catch (e) {
    console.error(`❌ Tile "${definition.name}" mount failed:`, e);
    console.error('%c[DIAG] STACK:', 'color:#f00', e.stack);
    activeTile = null;
    return false;
  }
}

/**
 * Unmount the currently active tile (if any)
 */
export function unmountActive() {
  if (activeTile && activeTile.unmount) {
    try {
      activeTile.unmount();
    } catch (e) {
      console.warn(`⚠️ Tile "${activeTile.name}" unmount error:`, e);
    }
  }
  activeTile = null;
}

/**
 * Get the currently active tile definition
 * @returns {TileDefinition|null}
 */
export function getActiveTile() {
  return activeTile;
}

/**
 * Check if a tile is registered for a given state
 * @param {string} stateId
 * @returns {boolean}
 */
export function hasTile(stateId) {
  return registry.has(stateId);
}

/**
 * Get all registered tile IDs (for debugging)
 * @returns {string[]}
 */
export function getRegisteredTiles() {
  return Array.from(registry.keys());
}

// ============================
// WINDOW BRIDGE (backward compat — to be removed later)
// ============================
if (typeof window !== 'undefined') {
  window.TileRegistry = {
    register: registerTile,
    registerSimple: registerSimpleTile,
    mount: mountTile,
    unmount: unmountActive,
    has: hasTile,
    list: getRegisteredTiles,
  };
}
