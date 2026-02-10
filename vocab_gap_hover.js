// ============================================================================
// VOCABULARY GAP HOVER SYSTEM - Safe Version
// ============================================================================
// Shows Uzbek translations for vocabulary gap words when hovering
// Works in both teacher mode and normal learning mode

let vocabularyGapData = null;
let vocabGapTooltip = null;

/**
 * Initialize the vocabulary gap hover system
 */
async function initializeVocabGapHoverSystem(gapData) {
  vocabularyGapData = gapData;
  createVocabGapTooltip();
  console.log('Vocabulary Gap Hover System initialized with ' + gapData.total_gap_words + ' words');
}

/**
 * Create the tooltip element
 */
function createVocabGapTooltip() {
  if (vocabGapTooltip) return;
  
  vocabGapTooltip = document.createElement('div');
  vocabGapTooltip.id = 'vocab-gap-tooltip';
  vocabGapTooltip.style.cssText = 'position:fixed;background:#1a1a2e;color:white;padding:12px 16px;border-radius:8px;font-size:14px;z-index:99999;box-shadow:0 4px 20px rgba(0,0,0,0.3);pointer-events:none;display:none;max-width:280px;border-left:4px solid #0099b4;';
  document.body.appendChild(vocabGapTooltip);
}

/**
 * Show tooltip
 */
function showTooltip(element, word, data) {
  if (!vocabGapTooltip) createVocabGapTooltip();
  
  var uzbek = data.uzbek || '[Translation needed]';
  var priority = data.priority || 'low';
  
  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">';
  html += '<div style="font-weight:bold;color:#fff;font-size:14px;">' + word.toUpperCase() + '</div>';
  html += '<div style="font-size:11px;color:#aaa;margin-left:12px;">EN→UZ</div>';
  html += '</div>';
  
  html += '<div style="font-size:18px;color:#4fc3f7;font-weight:500;margin-bottom:8px;">' + uzbek + '</div>';
  
  if (data.source === 'manual_needed' || uzbek === '[Translation needed]') {
    html += '<div style="font-size:11px;color:#ff9800;margin-bottom:6px;">⚠️ Translation needed</div>';
  }
  
  if (data.units && data.units.length > 0) {
    html += '<div style="font-size:11px;color:#888;border-top:1px solid #333;padding-top:6px;">';
    html += '📍 Missing from: ' + data.units.join(', ').toUpperCase() + '<br/>';
    html += '🔁 Appears: ' + data.frequency + ' time' + (data.frequency > 1 ? 's' : '');
    html += '</div>';
  }
  
  // Always warning-amber border for consistency
  vocabGapTooltip.style.borderLeftColor = '#ff9800';
  
  vocabGapTooltip.innerHTML = html;
  
  // Position near element
  var rect = element.getBoundingClientRect();
  vocabGapTooltip.style.left = Math.max(10, rect.left) + 'px';
  vocabGapTooltip.style.top = (rect.top - 110) + 'px';
  vocabGapTooltip.style.display = 'block';
}

/**
 * Hide tooltip
 */
function hideTooltip() {
  if (vocabGapTooltip) {
    vocabGapTooltip.style.display = 'none';
  }
}

/**
 * Get inline style for word - warning amber (matches app color scheme)
 */
function getWordStyle(priority) {
  return 'color:#ff9800;text-decoration:underline;text-decoration-color:#ff9800;font-weight:600;cursor:help;padding:0 2px;transition:all 0.2s;';
}

/**
 * Process a single text node safely
 */
function processTextNode(textNode) {
  if (!vocabularyGapData || !textNode || !textNode.nodeValue) return;
  
  var text = textNode.nodeValue;
  if (!text.trim()) return;
  
  // Skip if parent is already a vocab-gap-word
  var parent = textNode.parentElement;
  if (parent && parent.classList && parent.classList.contains('vocab-gap-word')) {
    return;
  }
  
  var words = Object.keys(vocabularyGapData.words);
  var foundWords = [];
  
  // Find all gap words in this text
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var regex = new RegExp('\\b(' + escapeRegex(word) + ')\\b', 'gi');
    var match;
    while ((match = regex.exec(text)) !== null) {
      foundWords.push({
        word: word,
        match: match[1],
        index: match.index,
        length: match[1].length,
        data: vocabularyGapData.words[word]
      });
    }
  }
  
  if (foundWords.length === 0) return;
  
  // Sort by index
  foundWords.sort(function(a, b) { return a.index - b.index; });
  
  // Remove overlapping matches (keep first/longest)
  var filtered = [];
  for (var i = 0; i < foundWords.length; i++) {
    var curr = foundWords[i];
    var dominated = false;
    for (var j = 0; j < filtered.length; j++) {
      var prev = filtered[j];
      if (curr.index >= prev.index && curr.index < prev.index + prev.length) {
        dominated = true;
        break;
      }
    }
    if (!dominated) {
      filtered.push(curr);
    }
  }
  
  if (filtered.length === 0) return;
  
  // Build new content as a document fragment
  var fragment = document.createDocumentFragment();
  var currentPos = 0;
  
  for (var i = 0; i < filtered.length; i++) {
    var found = filtered[i];
    
    // Add text before this match
    if (found.index > currentPos) {
      fragment.appendChild(document.createTextNode(text.slice(currentPos, found.index)));
    }
    
    // Create span for the word
    var span = document.createElement('span');
    span.textContent = found.match;
    span.className = 'vocab-gap-word';
    span.setAttribute('style', getWordStyle(found.data.priority));
    
    // Add hover events using closure
    (function(spanEl, wordKey, wordData) {
      spanEl.addEventListener('mouseenter', function() {
        showTooltip(spanEl, wordKey, wordData);
      });
      spanEl.addEventListener('mouseleave', hideTooltip);
      spanEl.addEventListener('click', function(e) {
        e.stopPropagation();
        showTooltip(spanEl, wordKey, wordData);
      });
    })(span, found.word, found.data);
    
    fragment.appendChild(span);
    currentPos = found.index + found.length;
  }
  
  // Add remaining text
  if (currentPos < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(currentPos)));
  }
  
  // Replace the text node with our fragment
  if (textNode.parentNode) {
    textNode.parentNode.replaceChild(fragment, textNode);
  }
}

/**
 * Escape special regex characters
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Process all dialogue text in the current view
 */
function processVocabGapWordsInDialogues() {
  if (!vocabularyGapData) {
    console.log('Vocab gap data not loaded');
    return;
  }
  
  // Target specific containers that hold dialogue text
  var containers = document.querySelectorAll('.dialogue-turn, .chat-bubble, .dialogue-box');
  
  for (var c = 0; c < containers.length; c++) {
    var container = containers[c];
    
    // Skip if already processed
    if (container.getAttribute('data-vocab-processed') === 'true') continue;
    container.setAttribute('data-vocab-processed', 'true');
    
    // Collect text nodes first (don't modify while iterating)
    var textNodes = [];
    var walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    var node;
    while (node = walker.nextNode()) {
      // Skip nodes inside buttons, scripts, or already-processed spans
      var parent = node.parentElement;
      if (!parent) continue;
      var tag = parent.tagName.toLowerCase();
      if (tag === 'button' || tag === 'script' || tag === 'style') continue;
      if (parent.classList && parent.classList.contains('vocab-gap-word')) continue;
      
      textNodes.push(node);
    }
    
    // Process each text node
    for (var t = 0; t < textNodes.length; t++) {
      processTextNode(textNodes[t]);
    }
  }
  
  console.log('Vocab gap words processed');
}

/**
 * Highlight grammar focus pattern in text (for Sandwich / input flood "noticing").
 * @param {string} text - Raw dialogue or sentence text
 * @param {string|RegExp} pattern - String (e.g. "There is") or RegExp. Matches are wrapped in span.grammar-flood
 * @returns {string} HTML string with matches wrapped (text is escaped for HTML)
 */
function highlightGrammarFocus(text, pattern) {
  if (typeof text !== 'string') return '';
  var escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  var re = pattern;
  if (typeof pattern === 'string') {
    var esc = escapeRegex(pattern);
    re = new RegExp('(' + esc.replace(/\s+/g, '\\s+') + ')', 'gi');
  } else if (pattern instanceof RegExp) {
    if (pattern.source.indexOf('(') === -1) {
      re = new RegExp('(' + pattern.source + ')', pattern.flags || 'gi');
    }
  }
  return escaped.replace(re, '<span class="grammar-flood">$1</span>');
}

// Export to window
window.vocabGapSystem = {
  initialize: initializeVocabGapHoverSystem,
  process: processVocabGapWordsInDialogues,
  highlightGrammarFocus: highlightGrammarFocus
};
window.highlightGrammarFocus = highlightGrammarFocus;
