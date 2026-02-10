/**
 * Deep Carousel Slide for Hybrid Vocab Cards
 * 
 * FORMATS SUPPORTED:
 * - LegacyVocabSlide: U01-U03 with nested presentation/practice objects
 * - PhaseBasedVocabSlide: U04+ with phase field
 * - PolarityVocabSlide: U02 special format with polarity/slot-substitution
 */

// Example sentence with bilingual format (U04+ style)
export interface BilingualExample {
  sentence: string;      // Uzbek sentence with **target** highlighted
  target: string;        // The English word being learned
  en_full: string;       // Full English translation
}

// Slot-substitution example (U02 style) - flexible slot keys
export interface SlotSubstitutionExample {
  sentence: string;                // English sentence with **slot** highlighted
  sentence_uz?: string;            // Uzbek translation for flip card practice
  [slotKey: string]: string | undefined;  // Flexible slot keys: subject, action, time, activity, etc.
}

// Polarity presentation format (U02 style)
export interface PolarityPresentation {
  uz_polar_question: string;       // Uzbek polar question (wrong assumption)
  uz_mirror_answer: string;        // Uzbek correction answer
}

// Slot-substitution practice format (U02 style)
export interface SlotSubstitutionPractice {
  anchor: string;                  // Fixed part of the phrase
  slot: string;                    // What gets substituted (SUBJECT, ACTION, TIME, etc.)
  en_examples: SlotSubstitutionExample[];  // Examples with slot variations
}

// Exercise types with answer field
export interface VocabExercise {
  type: 'jumble' | 'trap' | 'scratch';
  data: string[] | { wrong: string; fix: string };
  answer?: string;       // Correct answer for validation
}

// Legacy slide format (U01-U03): has nested presentation/practice objects, NO phase field
export interface LegacyVocabSlide {
  presentation: {
    uz_context?: string[];            // U01/U03/U04 style
    en_context?: string[];
    image_ref?: string;
    // U02 Polarity style
    uz_polar_question?: string;       // Uzbek polar question (wrong assumption)
    uz_mirror_answer?: string;        // Uzbek correction answer (fully Uzbek)
    hybrid_answer?: string;           // NEW: Hybrid answer (Uzbek + **TARGET** in English)
  };
  practice: {
    // U04 style (context-based)
    context_question?: string;
    hybrid_bridge?: string;
    en_canonical?: string;
    exercise?: VocabExercise;
    // U02 style (slot-substitution)
    anchor?: string;                  // Fixed part of the phrase
    slot?: string;                    // What gets substituted
    en_examples?: SlotSubstitutionExample[];  // Examples with slot variations
    // U02 Chunks used
    chunks_used?: string[];
    // U02 Tense Toggle style (for integration lessons)
    toggle_trigger?: string;          // Word that triggers tense change
    simple_form?: string;             // Simple tense version
    continuous_form?: string;         // Continuous tense version
    examples?: Array<{ trigger: string; response: string; priority?: string; grammarFocus?: string }>;  // Toggle examples with optional priority/grammarFocus
  };
  // U02 production and reproduction (optional at slide level)
  production?: {
    uz_prompt: string;
    en_target: string;
  };
  reproduction?: {
    en_canonical: string;
  };
}

// ══════════════════════════════════════════════════════════════════════════
// 4+2 ACT SLIDE INTERFACES
// ══════════════════════════════════════════════════════════════════════════

export interface VocabSyntaxScaffold {
  en_structure: string;  
  uz_gloss: string;      
  tokens: Array<{
    word: string;
    role: string;
    color: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'gray';
  }>;  
}

export interface VocabPresentationSlide {
  phase: 'presentation';
  uz_context?: string;      
  uz_mirror_answer?: string;
  hybrid_answer?: string;
  en_canonical?: string;
  audio?: string;
  image?: string;
  syntax_scaffold?: VocabSyntaxScaffold;
  // Legacy fields for compatibility
  uz_context_question?: string; 
  presentation?: any; 
}

export interface VocabConceptCheckSlide {
  phase: 'concept_check'; // or 'practice' with type='concept_check' in legacy
  type?: 'concept_check';
  question_uz: string;
  choices: Array<{ text: string; correct: boolean }>;
  correct_index: number;
}

export interface VocabDiscoverySlide {
  phase: 'discovery';
  grammar_token: string;    
  form_focus: string;       
  why_prompt: string;       
  explanation_uz: string;   
  mini_rule: string;        
}

export interface VocabDrillListSlide {
  phase: 'practice' | 'drill';
  type: 'drill_list';
  en_examples: any[]; // Kept loose for legacy compatibility
}

export interface VocabProductionSlide {
  phase: 'production';
  prompt_uz: string; // Renamed from uz_prompt in some contexts, but let's support both or fix inconsistencies
  uz_prompt?: string;
  model_sentence?: string;
  hints?: string[];
  input_type?: 'bubble' | 'full_sentence';
  // Bubble unlock props
  on_success?: {
     unlock_bubble: boolean;
     dialogue_id: string;
     line_index: number;
  };
}

export interface VocabPersonalizationSlide {
  phase: 'personalization';
  prompt_uz: string;        
  model_frame: string;      
  flexibleCheck: boolean;   
  tags?: string[];           
}

export type PhaseBasedVocabSlide = 
  | VocabPresentationSlide 
  | VocabConceptCheckSlide 
  | VocabDiscoverySlide 
  | VocabDrillListSlide 
  | VocabProductionSlide 
  | VocabPersonalizationSlide;


/** Contrastive turn for grammar gap discovery */
export interface ContrastiveTurn {
  stage: number;
  focus: string;
  dialogue_id: string;
  speaker_a: { text: string; speaker: string };
  speaker_b: { text: string; speaker: string };
  highlights: Array<{
    blue: { text: string; type: string };
    red: { text: string; marker?: string; type: string };
  }>;
}

/** Mission metadata for 3×2 Successive Mastery Cycle */
export interface MissionMetadata {
  mission_id: string;
  flow_model: 'sandwich';
  target_vocab: string[];
  stages: Array<{
    stage: number;
    form: 'affirmative' | 'negative' | 'interrogative';
    target_vocab: string[];
    dialogue_id: string;
    pressure_id: string;
    mirror_mode: boolean;
  }>;
  mastery_dialogue_id: string;
}

// VocabSlide can be any format
export type VocabSlide = LegacyVocabSlide | PhaseBasedVocabSlide;

/**
 * VocabItem with slides[] for Deep Carousel
 */
export interface VocabItemDeepCarousel {
  id: string;
  en: string;
  uz?: string;           // NEW: Uzbek translation
  is_chunk?: boolean;
  requires_grammar?: string;
  can_be_tested_productively?: boolean;
  slides: VocabSlide[];
  production?: {
    uz_prompt: string;
    en_target: string;
    model_answer?: string;
    alternatives?: string[];
    type?: string;
  };
  [key: string]: any;
}
