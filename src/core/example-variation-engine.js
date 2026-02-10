/**
 * Example Variation Engine
 * ========================
 * Generates varied examples for vocab cards using the Chunk System.
 * Ensures pedagogically appropriate variations following P1/P2/P3 priorities.
 * 
 * @module src/core/example-variation-engine
 * @version 1.0.0
 * @since January 2026
 */

import { ChunkSystem, CHUNK_TYPES, UNIT_CHUNK_PROGRESSION } from './chunk-system.js';

// ============================
// SUBJECT VARIATION LIBRARY
// ============================

/**
 * Subjects organized by grammatical person
 * Used to create varied examples with correct verb conjugation
 */
const SUBJECT_LIBRARY = {
  // First person - base verb
  first: {
    singular: [
      { en: 'I', uz: 'Men', verbForm: 'base' }
    ],
    plural: [
      { en: 'We', uz: 'Biz', verbForm: 'base' }
    ]
  },
  
  // Second person - base verb
  second: {
    singular: [
      { en: 'You', uz: 'Siz', verbForm: 'base' }
    ],
    plural: [
      { en: 'You', uz: 'Siz', verbForm: 'base' } // Same in English
    ]
  },
  
  // Third person - adds -s/-es
  third: {
    singular: [
      { en: 'He', uz: 'U', verbForm: 'third_s' },
      { en: 'She', uz: 'U', verbForm: 'third_s' },
      { en: 'My father', uz: 'Mening otam', verbForm: 'third_s', recycledFrom: 'U01' },
      { en: 'My mother', uz: 'Mening onam', verbForm: 'third_s', recycledFrom: 'U01' },
      { en: 'My sister', uz: 'Mening singlim', verbForm: 'third_s', recycledFrom: 'U01' },
      { en: 'My brother', uz: 'Mening akam', verbForm: 'third_s', recycledFrom: 'U01' },
      { en: 'My friend', uz: 'Mening do\'stim', verbForm: 'third_s' },
      { en: 'My teacher', uz: 'Mening o\'qituvchim', verbForm: 'third_s' }
    ],
    plural: [
      { en: 'They', uz: 'Ular', verbForm: 'base' },
      { en: 'The children', uz: 'Bolalar', verbForm: 'base' },
      { en: 'My parents', uz: 'Mening ota-onam', verbForm: 'base', recycledFrom: 'U01' },
      { en: 'The family', uz: 'Oila', verbForm: 'third_s' } // Collective noun - singular verb
    ]
  }
};

// ============================
// VERB CONJUGATION
// ============================

/**
 * Conjugates a verb based on subject type
 * Handles regular -s/-es rules and irregular verbs
 */
const VERB_CONJUGATION = {
  /**
   * Get correct verb form for a subject
   * @param {string} verb - Base form of verb (e.g., 'wake up')
   * @param {string} verbForm - 'base' or 'third_s'
   * @returns {string} Conjugated verb
   */
  conjugate(verb, verbForm) {
    if (verbForm === 'base') return verb;
    
    // Handle phrasal verbs (e.g., 'wake up' → 'wakes up')
    const parts = verb.split(' ');
    const mainVerb = parts[0];
    const particle = parts.slice(1).join(' ');
    
    const conjugatedMain = this.addThirdPersonS(mainVerb);
    return particle ? `${conjugatedMain} ${particle}` : conjugatedMain;
  },

  /**
   * Add -s/-es to a verb
   * @param {string} verb - Base verb
   * @returns {string} Verb with -s/-es
   */
  addThirdPersonS(verb) {
    // Irregular verbs
    const irregulars = {
      'have': 'has',
      'do': 'does',
      'go': 'goes',
      'be': 'is'
    };
    
    if (irregulars[verb.toLowerCase()]) {
      return irregulars[verb.toLowerCase()];
    }
    
    // Rules for -es
    if (verb.endsWith('s') || verb.endsWith('x') || verb.endsWith('z') ||
        verb.endsWith('ch') || verb.endsWith('sh') || verb.endsWith('o')) {
      return verb + 'es';
    }
    
    // Consonant + y → -ies
    if (verb.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 2])) {
      return verb.slice(0, -1) + 'ies';
    }
    
    // Default: add -s
    return verb + 's';
  }
};

// ============================
// EXAMPLE VARIATION ENGINE
// ============================

const ExampleVariationEngine = {
  /**
   * Generate 3 varied examples for a vocab card practice section
   * Follows P1/P2/P3 priority system
   * 
   * @param {Object} vocabCard - Vocab card with base sentence info
   * @param {Object} options - Configuration options
   * @returns {Object[]} Array of 3 example objects
   */
  generateExamples(vocabCard, options = {}) {
    const {
      unitId = vocabCard.tags?.find(t => t.startsWith('U'))?.split('_')[0] || 'U02',
      lessonGrammar = null,
      includeUzTranslation = true,
      preserveAnchor = true
    } = options;

    const examples = [];
    const anchor = vocabCard.slides?.[0]?.practice?.anchor || vocabCard.en;
    const baseVerb = this.extractVerb(anchor);

    // ─── P1: Target Grammar (Lesson Focus) ───
    // Use first person or direct target grammar demonstration
    examples.push(this.createP1Example(vocabCard, anchor, baseVerb, {
      unitId,
      lessonGrammar,
      includeUzTranslation
    }));

    // ─── P2: Unit Variation (3rd person -s, other subjects) ───
    examples.push(this.createP2Example(vocabCard, anchor, baseVerb, {
      unitId,
      includeUzTranslation
    }));

    // ─── P3: Recycling (Subjects from previous units) ───
    examples.push(this.createP3Example(vocabCard, anchor, baseVerb, {
      unitId,
      includeUzTranslation
    }));

    return examples;
  },

  /**
   * Create P1 example - Direct grammar target
   */
  createP1Example(vocabCard, anchor, baseVerb, options) {
    const { unitId, lessonGrammar, includeUzTranslation } = options;
    
    // P1 typically uses "I" for simple present to show base form
    const subject = { en: 'I', uz: 'Men', verbForm: 'base' };
    const verb = VERB_CONJUGATION.conjugate(baseVerb, subject.verbForm);
    const sentence = this.buildSentence(subject.en, verb, anchor, baseVerb);

    return {
      sentence: `**${subject.en}** ${verb}${this.getAnchorSuffix(anchor, baseVerb)}`,
      subject: subject.en,
      priority: 'P1_LESSON',
      grammarFocus: lessonGrammar || 'present_simple',
      ...(includeUzTranslation && { sentence_uz: this.generateUzTranslation(subject, anchor, vocabCard) })
    };
  },

  /**
   * Create P2 example - Unit variation (3rd person, plural, etc.)
   */
  createP2Example(vocabCard, anchor, baseVerb, options) {
    const { unitId, includeUzTranslation } = options;
    
    // P2 uses 3rd person singular to demonstrate -s rule
    const thirdPersonSubjects = SUBJECT_LIBRARY.third.singular.filter(s => !s.recycledFrom);
    const subject = thirdPersonSubjects[Math.floor(Math.random() * thirdPersonSubjects.length)];
    const verb = VERB_CONJUGATION.conjugate(baseVerb, subject.verbForm);

    return {
      sentence: `**${subject.en}** ${verb}${this.getAnchorSuffix(anchor, baseVerb)}`,
      subject: subject.en,
      priority: 'P2_UNIT',
      grammarFocus: 'third_person_s',
      ...(includeUzTranslation && { sentence_uz: this.generateUzTranslation(subject, anchor, vocabCard) })
    };
  },

  /**
   * Create P3 example - Recycled content from previous units
   */
  createP3Example(vocabCard, anchor, baseVerb, options) {
    const { unitId, includeUzTranslation } = options;
    
    // P3 uses recycled subjects from U01 (possessives)
    const recycledSubjects = [
      ...SUBJECT_LIBRARY.third.singular.filter(s => s.recycledFrom),
      ...SUBJECT_LIBRARY.third.plural.filter(s => s.recycledFrom)
    ];
    
    // Fallback to 'They' if no recycled available
    const subject = recycledSubjects.length > 0 
      ? recycledSubjects[Math.floor(Math.random() * recycledSubjects.length)]
      : { en: 'They', uz: 'Ular', verbForm: 'base' };
    
    const verb = VERB_CONJUGATION.conjugate(baseVerb, subject.verbForm);

    return {
      sentence: `**${subject.en}** ${verb}${this.getAnchorSuffix(anchor, baseVerb)}`,
      subject: subject.en,
      priority: 'P3_RECYCLE',
      recycledFrom: subject.recycledFrom || null,
      grammarFocus: subject.verbForm === 'third_s' ? 'third_person_s' : 'present_simple_plural',
      ...(includeUzTranslation && { sentence_uz: this.generateUzTranslation(subject, anchor, vocabCard) })
    };
  },

  /**
   * Generate variations with different time/place chunks
   * Used for more advanced variation
   */
  generateChunkVariations(vocabCard, chunkType, options = {}) {
    const { unitId = 'U02' } = options;
    const chunks = ChunkSystem.getVariationsForChunkType(chunkType, unitId);
    
    if (chunks.length === 0) return [];

    const anchor = vocabCard.slides?.[0]?.practice?.anchor || vocabCard.en;
    const baseVerb = this.extractVerb(anchor);

    return chunks.slice(0, 3).map((chunk, idx) => {
      const subject = SUBJECT_LIBRARY.first.singular[0]; // Use "I"
      const verb = VERB_CONJUGATION.conjugate(baseVerb, subject.verbForm);
      
      // Replace the chunk part in the anchor
      const newAnchor = this.replaceChunkInAnchor(anchor, chunkType, chunk);

      return {
        sentence: `**${subject.en}** ${verb} ${chunk.en}.`,
        subject: subject.en,
        chunk: chunk,
        chunkType: chunkType,
        priority: idx === 0 ? 'P1_LESSON' : idx === 1 ? 'P2_UNIT' : 'P3_RECYCLE'
      };
    });
  },

  /**
   * Extract the main verb from an anchor phrase
   * @param {string} anchor - e.g., 'wake up at seven'
   * @returns {string} Main verb phrase - e.g., 'wake up'
   */
  extractVerb(anchor) {
    // Common phrasal verb patterns
    const phrasalPatterns = [
      /^(wake up|get up|get dressed|get ready|go to|come to|leave the|have breakfast|have lunch|have dinner|brush my|take a)/i
    ];

    for (const pattern of phrasalPatterns) {
      const match = anchor.match(pattern);
      if (match) return match[1].toLowerCase();
    }

    // Default: first word(s) before preposition
    const parts = anchor.split(/\s+(at|in|on|to|from)\s+/);
    return parts[0].trim();
  },

  /**
   * Get the part of anchor after the verb
   */
  getAnchorSuffix(anchor, baseVerb) {
    const idx = anchor.toLowerCase().indexOf(baseVerb.toLowerCase());
    if (idx === -1) return ` ${anchor}.`;
    
    const suffix = anchor.substring(idx + baseVerb.length).trim();
    return suffix ? ` ${suffix}.` : '.';
  },

  /**
   * Build a complete sentence from components
   */
  buildSentence(subject, verb, anchor, baseVerb) {
    const suffix = this.getAnchorSuffix(anchor, baseVerb);
    return `${subject} ${verb}${suffix}`;
  },

  /**
   * Replace a chunk in an anchor with a new variation
   */
  replaceChunkInAnchor(anchor, chunkType, newChunk) {
    const chunkTypeData = CHUNK_TYPES[chunkType];
    if (!chunkTypeData || !chunkTypeData.instances) return anchor;

    // Find and replace any existing instance of this chunk type
    for (const instance of Object.values(chunkTypeData.instances)) {
      if (anchor.toLowerCase().includes(instance.en.toLowerCase())) {
        return anchor.replace(new RegExp(instance.en, 'i'), newChunk.en);
      }
    }

    // If no existing chunk, append based on position
    if (chunkTypeData.position === 'end') {
      return `${anchor} ${newChunk.en}`;
    }

    return anchor;
  },

  /**
   * Generate Uzbek translation (placeholder - would need proper translation logic)
   */
  generateUzTranslation(subject, anchor, vocabCard) {
    // Use existing translation from vocab card if available
    if (vocabCard.slides?.[0]?.presentation?.uz_mirror_answer) {
      // Try to adapt the mirror answer with new subject
      const baseUz = vocabCard.slides[0].presentation.uz_mirror_answer;
      // Simple subject replacement (would need more sophisticated logic for real app)
      if (subject.uz) {
        return baseUz.replace(/^(Yo'q, )?(men|u|siz|biz|ular)/i, `$1${subject.uz}`);
      }
    }
    return null; // Let the caller decide what to do with missing translation
  },

  /**
   * Validate that examples follow chunk rules
   */
  validateExamples(examples, unitId) {
    const issues = [];
    const progression = UNIT_CHUNK_PROGRESSION[unitId];
    
    if (!progression) {
      issues.push(`Unknown unit: ${unitId}`);
      return { valid: false, issues };
    }

    examples.forEach((ex, idx) => {
      // Check for priority labels
      if (!ex.priority) {
        issues.push(`Example ${idx + 1} missing priority label`);
      }

      // Check for required fields
      if (!ex.sentence || !ex.subject) {
        issues.push(`Example ${idx + 1} missing required fields`);
      }

      // Check chunk usage is appropriate for unit
      if (ex.chunkType && !progression.availableChunks.includes(ex.chunkType)) {
        issues.push(`Example ${idx + 1} uses chunk '${ex.chunkType}' not available in ${unitId}`);
      }
    });

    return {
      valid: issues.length === 0,
      issues
    };
  },

  /**
   * Get examples based on load level
   * @param {Object} vocabCard - Vocab card
   * @param {string} loadLevel - 'light', 'optimal', 'moderate', 'heavy'
   */
  getExamplesForLoad(vocabCard, loadLevel = 'optimal') {
    const examples = this.generateExamples(vocabCard, {});

    // Under high load, show only P1 (target grammar)
    if (loadLevel === 'heavy') {
      return [examples[0]]; // Just P1
    }

    // Moderate load: P1 + P2
    if (loadLevel === 'moderate') {
      return examples.slice(0, 2); // P1 and P2
    }

    // Optimal/light: all 3
    return examples;
  }
};

// ============================
// EXPORTS
// ============================

// Browser global
if (typeof window !== 'undefined') {
  window.ExampleVariationEngine = ExampleVariationEngine;
  window.SUBJECT_LIBRARY = SUBJECT_LIBRARY;
  window.VERB_CONJUGATION = VERB_CONJUGATION;
}

// ES module export
export { ExampleVariationEngine, SUBJECT_LIBRARY, VERB_CONJUGATION };
export default ExampleVariationEngine;
