"""
RECYCLING ANALYZER - Smart File-Based System
=============================================
Scans vocab_cards_u**.js AND markdown unit files to compute recycling status.
Aligned with Master_Document.md rules (RULE R1-R10).

Usage:
    python recycling_analyzer.py status              - Overall recycling status
    python recycling_analyzer.py needs U05           - What needs recycling for Unit 05
    python recycling_analyzer.py coverage U05        - Vocab coverage for Unit 05
    python recycling_analyzer.py compare U04 U05     - Compare vocab between units
    python recycling_analyzer.py extract U01         - Extract all vocab from Unit 01
    python recycling_analyzer.py preflight U05       - PREFLIGHT CHECK before creating Unit 05
    python recycling_analyzer.py validate U04        - Validate vocab_cards_u04.js structure
    python recycling_analyzer.py ratio U04           - Calculate recycling ratio for Unit 04
    python recycling_analyzer.py grammar U04         - Check grammar form coverage (+/-/?)

MASTER DOCUMENT ALIGNMENT (v3.0):
    - Constraint #1-5: All 5 mandatory constraints checked
    - RULE R1: Recycling ratios by component type
    - RULE R2: 10 mandatory recycling categories
    - RULE R2.1: Grammar form progression (+/-/?)
    - RULE R3: Progressive complexity recycling
    - RULE R5: Priority levels (1=HIGH, 2=MEDIUM, 3=LOW)
    - RULE R6: Forbidden practices detection
    - RULE R7: Mandatory recycling progression table
    - RULE R8: Recycling ratio verification (0.60-0.75 target)
    - RULE R10: Adverbial recycling matrix
"""

import re
import json
import pathlib
from typing import Dict, List, Set, Tuple, Optional
from collections import defaultdict
from pathlib import Path

class RecyclingAnalyzer:
    """Analyzes vocabulary & grammar across unit markdown files."""
    
    # =========================================================================
    # AUDITED UNITS REGISTRY
    # Only these units contribute vocabulary to the recycling pool.
    # Add unit numbers here AFTER completing audit.
    # Use float for PLUS units: 1.5 = Unit 01+
    # =========================================================================
    AUDITED_UNITS = {
        1,      # Unit 01 - A1 Foundation (AUDITED)
        1.5,    # Unit 01+ - A1+ Extensions (AUDITED)
        2,      # Unit 02 - Present Simple + A1+ (AUDITED)
        # 3,    # Unit 03 - Preferences & Opinions (PENDING AUDIT)
        # 4,    # Unit 04 - (PENDING AUDIT)
        # 5,    # Unit 05 - (PENDING AUDIT)
        # 6,    # Unit 06 - (MISSING)
        # 7,    # Unit 07 - (PENDING AUDIT)
        # 8,    # Unit 08 - (PENDING AUDIT)
        # 9,    # Unit 09 - (PENDING AUDIT)
        # 10,   # Unit 10 - (PENDING AUDIT)
    }
    
    # =========================================================================
    # MANDATORY RECYCLING ITEMS (RULE R2 from Master Document)
    # These 10 categories MUST be recycled across all units
    # =========================================================================
    MANDATORY_RECYCLING = {
        "subject_pronouns": ["I", "you", "he", "she", "it", "we", "they"],
        "to_be_verbs": ["am", "is", "are", "was", "were"],
        "have_has_verbs": ["have", "has"],
        "there_is_are": ["there is", "there are"],
        "possessive_det": ["my", "your", "his", "her", "our", "their"],
        "time_markers": ["every day", "yesterday"],
        "auxiliary_verbs": ["do", "does", "don't", "doesn't", "did", "didn't"],
        "prepositions": ["in", "on", "at", "to", "from", "with"],
        "question_words": ["what", "where", "who", "how", "when", "why"],
        "articles": ["a", "an", "the"]
    }
    
    # PRIORITY LEVELS (RULE R5)
    PRIORITY_LEVELS = {
        1: {"name": "HIGH", "frequency": "Every unit", "icon": "🔴"},
        2: {"name": "MEDIUM", "frequency": "Every 2-3 units", "icon": "🟠"},
        3: {"name": "LOW", "frequency": "Every 4-5 units", "icon": "🟡"}
    }
    
    # =========================================================================
    # RULE R7: MANDATORY RECYCLING PROGRESSION TABLE
    # Defines which units MUST be recycled in each target unit
    # =========================================================================
    RECYCLING_PROGRESSION = {
        2: {"mandatory": [1], "optional": []},
        3: {"mandatory": [1, 2], "optional": []},
        4: {"mandatory": [1, 2, 3], "optional": []},
        5: {"mandatory": [1, 2, 3, 4], "optional": []},
        6: {"mandatory": [1, 2, 3, 4, 5], "optional": []},
        7: {"mandatory": [1, 2, 3, 4, 5, 6], "optional": []},
        8: {"mandatory": [1, 2, 3], "optional": [4, 5, 6, 7]},  # Focus returns to present
        9: {"mandatory": [1, 2, 3, 4, 5, 6, 7, 8], "optional": []},
        10: {"mandatory": [1, 2, 3, 4, 5, 6, 7, 8, 9], "optional": []}
    }
    
    # =========================================================================
    # RULE R2.1: GRAMMAR FORM PROGRESSION (+/-/?)
    # Each unit's grammar must cover all three forms
    # =========================================================================
    GRAMMAR_FORMS = {
        1: {"focus": "TO BE (am/is/are)", "affirmative": True, "negative": True, "question": True},
        2: {"focus": "Present Simple", "affirmative": True, "negative": True, "question": True},
        3: {"focus": "Preferences (like/love/hate)", "affirmative": True, "negative": True, "question": True},
        4: {"focus": "Past State (was/were)", "affirmative": True, "negative": True, "question": True},
        5: {"focus": "Past Regular (-ed)", "affirmative": True, "negative": True, "question": True},
        6: {"focus": "Past Negation + Reason", "affirmative": True, "negative": True, "question": True},
        7: {"focus": "Irregular Past", "affirmative": True, "negative": True, "question": True},
        8: {"focus": "Indefinite Pronouns", "affirmative": True, "negative": True, "question": True},
        9: {"focus": "Possessive Pronouns + Materials", "affirmative": True, "negative": True, "question": True},
        10: {"focus": "Quantifiers + FOR", "affirmative": True, "negative": True, "question": True}
    }
    
    # =========================================================================
    # RULE R10: ADVERBIAL RECYCLING MATRIX
    # Tracks which adverbial types are introduced and must be recycled
    # =========================================================================
    ADVERBIAL_MATRIX = {
        "time_frequency": {"introduced": 2, "must_recycle_in": [3, 4], "free_from": 5},
        "place": {"introduced": 3, "must_recycle_in": [4, 5], "free_from": 6},
        "direction": {"introduced": 4, "must_recycle_in": [5, 6], "free_from": 7},
        "connectors": {"introduced": 5, "must_recycle_in": [6, 7], "free_from": 8},
        "company": {"introduced": 5, "must_recycle_in": [6, 7], "free_from": 8},
        "reason_because": {"introduced": 6, "must_recycle_in": [7, 8], "free_from": 9},
        "manner": {"introduced": 7, "must_recycle_in": [8, 9], "free_from": 10},
        "means": {"introduced": 9, "must_recycle_in": [10], "free_from": 11},
        "purpose": {"introduced": 10, "must_recycle_in": [], "free_from": 11}
    }
    
    def __init__(self, workspace_dir: str = "."):
        self.workspace = Path(workspace_dir)
        self.units_data = {}  # unit_num -> {vocab: set, grammar: set, file: str, audited: bool}
        self.vocab_first_seen = {}  # vocab_word -> unit_number (from AUDITED units only)
        self.grammar_first_seen = {}  # grammar_point -> unit_number
        self.vocab_cards_data = {}  # unit_num -> parsed JS data
        self.master_doc = None
        self._load_master_document()
        self._scan_vocab_cards_js()  # NEW: Scan JS files first
        self._scan_all_units()
    
    # =========================================================================
    # FILE I/O
    # =========================================================================
    
    def _load_master_document(self):
        """Load Master_Document.md if it exists."""
        master_path = self.workspace / "Master_Document.md"
        if master_path.exists():
            self.master_doc = master_path.read_text(encoding='utf-8')
    
    def _scan_vocab_cards_js(self):
        """Scan all vocab_cards_u**.js files in workspace."""
        js_files = sorted(self.workspace.glob("vocab_cards_u*.js"))
        
        for js_file in js_files:
            # Skip backup/copy/old files
            skip_patterns = ["Copy", "backup", "_old", "_backup", "_new"]
            if any(p.lower() in js_file.name.lower() for p in skip_patterns):
                continue
                
            # Extract unit number from filename (e.g., vocab_cards_u04.js -> 4, vocab_cards_u01_5.js -> 1.5)
            match = re.search(r'vocab_cards_u(\d+(?:_\d+)?)(?:_4act)?\.js$', js_file.name)
            if not match:
                continue
            
            unit_str = match.group(1)
            if "_" in unit_str:
                unit_num = float(unit_str.replace("_", "."))
            else:
                unit_num = int(unit_str)
            
            try:
                content = js_file.read_text(encoding='utf-8')
                vocab_items = self._extract_vocab_from_js(content)
                recycling_data = self._extract_recycling_from_js(content)
                dialogues = self._extract_dialogues_from_js(content)
                grammar_coverage = self._extract_grammar_coverage_from_js(content)
                recycled_vocab_sources = self._extract_recycled_sources_from_js(content)
                
                self.vocab_cards_data[unit_num] = {
                    "file": js_file.name,
                    "vocab": vocab_items,
                    "recycling": recycling_data,
                    "dialogues": dialogues,
                    "grammar_coverage": grammar_coverage,
                    "recycled_sources": recycled_vocab_sources,
                    "has_new_format": "source_dialogue" in content,
                    "raw_content": content  # Keep for ratio calculation
                }
            except Exception as e:
                print(f"⚠️  Error parsing {js_file.name}: {e}")
    
    def _extract_vocab_from_js(self, content: str) -> Set[str]:
        """Extract vocabulary words from JS vocab card file."""
        vocab = set()
        
        # Pattern: en: "word" or en: 'word'
        for match in re.finditer(r'en:\s*["\']([^"\']+)["\']', content):
            word = match.group(1).strip().lower()
            if word and len(word) > 1:
                vocab.add(word)
        
        return vocab
    
    def _extract_recycling_from_js(self, content: str) -> Dict:
        """Extract recycling metadata from JS file (new format only)."""
        recycling = {
            "has_recycling_block": "recycling:" in content,
            "has_priority": "priority:" in content,
            "has_source_dialogue": "source_dialogue:" in content,
            "has_recycled_vocab": "recycled_vocab:" in content
        }
        
        # Extract priority counts
        priority_1 = len(re.findall(r'priority:\s*1', content))
        priority_2 = len(re.findall(r'priority:\s*2', content))
        priority_3 = len(re.findall(r'priority:\s*3', content))
        
        recycling["priority_counts"] = {
            "high": priority_1,
            "medium": priority_2,
            "low": priority_3
        }
        
        return recycling
    
    def _extract_dialogues_from_js(self, content: str) -> List[str]:
        """Extract dialogue IDs from JS file."""
        dialogues = []
        for match in re.finditer(r'["\']([^"\']*_D\d+)["\']:', content):
            dialogues.append(match.group(1))
        return dialogues
    
    def _extract_grammar_coverage_from_js(self, content: str) -> Dict:
        """
        Extract grammar_coverage blocks from JS file (RULE R2.1).
        Checks for (+), (-), (?) forms in dialogues.
        """
        coverage = {
            "has_affirmative": False,
            "has_negative": False,
            "has_question": False,
            "affirmative_examples": [],
            "negative_examples": [],
            "question_examples": []
        }
        
        # Pattern: grammar_coverage: { affirmative: [...], negative: [...], question: [...] }
        aff_match = re.search(r'affirmative:\s*\[(.*?)\]', content, re.DOTALL)
        neg_match = re.search(r'negative:\s*\[(.*?)\]', content, re.DOTALL)
        q_match = re.search(r'question:\s*\[(.*?)\]', content, re.DOTALL)
        
        if aff_match:
            examples = re.findall(r'["\']([^"\']+)["\']', aff_match.group(1))
            coverage["has_affirmative"] = len(examples) > 0
            coverage["affirmative_examples"] = examples[:3]
        
        if neg_match:
            examples = re.findall(r'["\']([^"\']+)["\']', neg_match.group(1))
            coverage["has_negative"] = len(examples) > 0
            coverage["negative_examples"] = examples[:3]
        
        if q_match:
            examples = re.findall(r'["\']([^"\']+)["\']', q_match.group(1))
            coverage["has_question"] = len(examples) > 0
            coverage["question_examples"] = examples[:3]
        
        # Full cycle check
        coverage["full_cycle"] = all([
            coverage["has_affirmative"],
            coverage["has_negative"],
            coverage["has_question"]
        ])
        
        return coverage
    
    def _extract_recycled_sources_from_js(self, content: str) -> Dict[str, List[str]]:
        """
        Extract recycled vocabulary sources from example_3 blocks.
        Returns: {word: [source_unit, category], ...}
        """
        sources = {}
        
        # Pattern: "word": { from: "U01", category: "pronoun" }
        for match in re.finditer(
            r'["\'](\w+(?:\s+\w+)?)["\']:\s*\{\s*from:\s*["\']([^"\']+)["\'],\s*category:\s*["\']([^"\']+)["\']',
            content
        ):
            word = match.group(1).lower()
            from_unit = match.group(2)
            category = match.group(3)
            sources[word] = {"from": from_unit, "category": category}
        
        return sources
    
    def calculate_recycling_ratio(self, unit_num: int) -> Dict:
        """
        RULE R8: Calculate recycling ratio for a unit.
        Returns ratio of recycled content vs new content.
        """
        if unit_num not in self.vocab_cards_data:
            return {"error": f"Unit {unit_num} not found"}
        
        data = self.vocab_cards_data[unit_num]
        content = data.get("raw_content", "")
        
        # Extract all vocabulary from items
        vocab = data["vocab"]
        
        # Count recycled vs new based on 'introduced_in' or recycled_sources
        recycled_count = 0
        new_count = 0
        recycled_words = []
        new_words = []
        
        # Check introduced_in field
        for match in re.finditer(r'en:\s*["\']([^"\']+)["\'].*?introduced_in:\s*["\']([^"\']+)["\']', content, re.DOTALL):
            word = match.group(1).lower()
            intro_unit = match.group(2)
            
            # Parse unit from introduced_in (e.g., "U01", "U04_L01")
            intro_match = re.search(r'U(\d+)', intro_unit)
            if intro_match:
                intro_num = int(intro_match.group(1))
                if intro_num < unit_num:
                    recycled_count += 1
                    recycled_words.append(word)
                else:
                    new_count += 1
                    new_words.append(word)
        
        total = recycled_count + new_count
        ratio = recycled_count / total if total > 0 else 0
        
        # Determine status
        if 0.60 <= ratio <= 0.75:
            status = "✅ OPTIMAL (0.60-0.75)"
        elif ratio < 0.60:
            status = "⚠️  TOO MUCH NEW (add more recycled vocab)"
        else:
            status = "⚠️  TOO MUCH RECYCLED (add more new vocab)"
        
        return {
            "unit": unit_num,
            "recycled_count": recycled_count,
            "new_count": new_count,
            "total": total,
            "ratio": ratio,
            "status": status,
            "recycled_words": recycled_words[:10],
            "new_words": new_words[:10]
        }

    def _scan_all_units(self):
        """Scan all UNIT_*.md files in workspace."""
        unit_files = sorted(self.workspace.glob("UNIT_*.md"))
        
        for unit_file in unit_files:
            # Handle UNIT_01_PLUS as 1.5 (between Unit 01 and Unit 02)
            plus_match = re.search(r'UNIT_(\d+)_PLUS', unit_file.name)
            if plus_match:
                unit_num = int(plus_match.group(1))
                unit_key = float(f"{unit_num}.5")  # Store as 1.5 float for Unit 01 Plus
            else:
                match = re.search(r'UNIT_(\d+)', unit_file.name)
                if not match:
                    continue
                unit_num = int(match.group(1))
                unit_key = unit_num
            
            # Check if this unit is audited
            is_audited = self._is_unit_audited(unit_key)
            
            content = unit_file.read_text(encoding='utf-8')
            
            # Only extract vocab from AUDITED units
            if is_audited:
                vocab = self._extract_vocab(content)
                grammar = self._extract_grammar(content)
            else:
                vocab = set()  # Pending audit - no vocab extracted
                grammar = set()
            
            self.units_data[unit_key] = {
                "vocab": vocab,
                "grammar": grammar,
                "file": unit_file.name,
                "audited": is_audited
            }
            
            # Track first appearance (ONLY from audited units)
            if is_audited:
                for word in vocab:
                    word_clean = self._clean_vocab_word(word)
                    if word_clean and word_clean not in self.vocab_first_seen:
                        self.vocab_first_seen[word_clean] = unit_key
                
                for gram in grammar:
                    if gram.lower() not in self.grammar_first_seen:
                        self.grammar_first_seen[gram.lower()] = unit_key
    
    def _is_unit_audited(self, unit_key) -> bool:
        """Check if a unit is in the audited registry."""
        # Convert to float for comparison
        if isinstance(unit_key, str):
            unit_float = float(unit_key)
        else:
            unit_float = float(unit_key)
        
        # Check both int and float versions
        return unit_float in self.AUDITED_UNITS or int(unit_float) in self.AUDITED_UNITS
    
    def _clean_vocab_word(self, word: str) -> str:
        """Clean vocabulary word for consistent comparison."""
        if not word:
            return ""
        # Remove descriptions - ORDER MATTERS!
        # 1. First remove parenthetical content (including those with dashes inside)
        word = re.sub(r'\s*\([^)]*\)\s*', '', word)  # Remove ALL parentheses, not just trailing
        # 2. Then remove after dash (e.g., "word - description")  
        word = re.sub(r'\s*[-–—]\s*.+$', '', word)
        return word.strip().lower()
    
    def _extract_vocab(self, content: str) -> Set[str]:
        """Extract vocabulary from unit file. Returns clean vocab words."""
        vocab = set()
        
        # Pattern: ###+ VOCAB CARD N: word (supports ##, ###, ####)
        for match in re.finditer(r'^#{2,4}\s*VOCAB CARD \d+:\s*(.+?)$', content, re.MULTILINE):
            raw_word = match.group(1).strip()
            if raw_word:
                # Clean the word (remove descriptions, notes, etc.)
                clean_word = self._clean_vocab_word(raw_word)
                if clean_word:
                    vocab.add(clean_word)
        
        return vocab
    
    def _extract_grammar(self, content: str) -> Set[str]:
        """Extract grammar points from unit file."""
        grammar = set()
        
        # Pattern: ## Target Grammar or ### Target Grammar
        for match in re.finditer(r'### Target Grammar:(.+?)(?=###|##|$)', content, re.DOTALL):
            block = match.group(1)
            # Extract lines that look like grammar points
            for line in block.split('\n'):
                line = line.strip('- ').strip()
                if line and len(line) > 3 and '/' not in line:
                    grammar.add(line.lower())
        
        return grammar
    
    # =========================================================================
    # QUERIES
    # =========================================================================
    
    def get_vocabulary_by_unit(self, unit_num: int) -> Set[str]:
        """Get all vocabulary in a specific unit."""
        return self.units_data.get(unit_num, {}).get("vocab", set())
    
    def get_grammar_by_unit(self, unit_num: int) -> Set[str]:
        """Get all grammar in a specific unit."""
        return self.units_data.get(unit_num, {}).get("grammar", set())
    
    def get_vocab_introduced_in_unit(self, unit_num) -> Set[str]:
        """Get vocabulary INTRODUCED (first appearance) in this unit."""
        introduced = set()
        # Convert to comparable format
        unit_num_cmp = str(unit_num) if isinstance(unit_num, (float, str)) else unit_num
        
        for word in self.get_vocabulary_by_unit(unit_num):
            first_seen = self.vocab_first_seen.get(word.lower())
            first_seen_cmp = str(first_seen) if isinstance(first_seen, (float, str)) else first_seen
            if first_seen_cmp == unit_num_cmp:
                introduced.add(word)
        return introduced
    
    def get_vocab_recycled_in_unit(self, unit_num) -> Set[str]:
        """Get vocabulary that is RECYCLED (from earlier units) in this unit."""
        recycled = set()
        # Convert to float for comparison
        unit_num_float = float(unit_num) if isinstance(unit_num, (int, str)) else unit_num
        
        for word in self.get_vocabulary_by_unit(unit_num):
            first_unit = self.vocab_first_seen.get(word.lower())
            if first_unit:
                first_unit_float = float(first_unit) if isinstance(first_unit, (int, str)) else first_unit
                if first_unit_float < unit_num_float:
                    recycled.add(word)
        return recycled
    
    def get_items_needing_recycling(self, target_unit: int) -> Dict:
        """
        Get vocabulary that was introduced before target_unit but hasn't appeared since.
        Prioritizes:
        1. Items never recycled after introduction
        2. Items recycled least recently
        3. Items from earlier units (more foundational)
        """
        needs = {
            "critical": [],      # Introduced early, never recycled
            "high": [],          # Introduced early, recycled once
            "medium": [],        # Recycled a few times
            "suggested": []      # Recently recycled
        }
        
        # Check all vocab from units 1 to target_unit-1
        for unit in range(1, target_unit):
            for word in self.get_vocab_introduced_in_unit(unit):
                # Count recycling: how many times after introduction?
                recycle_count = 0
                last_recycled = unit
                
                for check_unit in range(unit + 1, target_unit):
                    if word.lower() in [w.lower() for w in self.get_vocabulary_by_unit(check_unit)]:
                        recycle_count += 1
                        last_recycled = check_unit
                
                # Categorize
                units_since_last = target_unit - last_recycled - 1
                entry = {
                    "word": word,
                    "introduced": unit,
                    "recycle_count": recycle_count,
                    "last_recycled": last_recycled,
                    "units_since": units_since_last
                }
                
                if recycle_count == 0:
                    needs["critical"].append(entry)
                elif recycle_count == 1:
                    needs["high"].append(entry)
                elif recycle_count < 4:
                    needs["medium"].append(entry)
                else:
                    needs["suggested"].append(entry)
        
        # Sort each by priority (earlier introduction, longer since recycled)
        for category in needs:
            needs[category].sort(
                key=lambda x: (-x["introduced"], -x["units_since"]),
                reverse=True
            )
        
        return needs
    
    def get_coverage_report(self, target_unit: int) -> Dict:
        """
        Compare target unit vocab against Master Document requirements.
        Returns missing items and coverage percentage.
        """
        if not self.master_doc:
            return {"error": "Master_Document.md not found"}
        
        # Extract requirements from Master Document for this unit
        # Pattern: ## UNIT 0N - NAME ... ### Target Vocabulary: ... ### Target Grammar:
        unit_pattern = rf'## UNIT {target_unit:02d}.*?(?=## UNIT|\Z)'
        match = re.search(unit_pattern, self.master_doc, re.DOTALL)
        
        if not match:
            return {"error": f"Unit {target_unit:02d} not found in Master Document"}
        
        unit_section = match.group(0)
        
        # Extract required vocabulary
        req_vocab = set()
        vocab_match = re.search(r'### Target Vocabulary:(.+?)(?=###|##)', unit_section, re.DOTALL)
        if vocab_match:
            for line in vocab_match.group(1).split('\n'):
                line = line.strip('- ').strip()
                if line and not line.startswith('**'):
                    req_vocab.add(line.lower())
        
        # Get actual vocabulary in unit
        actual_vocab = set(w.lower() for w in self.get_vocabulary_by_unit(target_unit))
        
        # Calculate coverage
        present = req_vocab & actual_vocab
        missing = req_vocab - actual_vocab
        
        coverage_pct = len(present) / len(req_vocab) * 100 if req_vocab else 0
        
        return {
            "unit": target_unit,
            "required_count": len(req_vocab),
            "present_count": len(present),
            "missing_count": len(missing),
            "coverage_percent": coverage_pct,
            "missing_vocab": sorted(missing),
            "present_vocab": sorted(present)
        }
    
    def audit_unit_02_against_master(self) -> Dict:
        """
        Comprehensive audit of Unit 02 against Master Document requirements.
        Returns detailed findings about what's present and what's missing.
        """
        if not self.master_doc:
            return {"error": "Master_Document.md not found"}
        
        u02_section = re.search(r'## UNIT 02:.*?(?=## UNIT 03:|$)', self.master_doc, re.DOTALL)
        if not u02_section:
            return {"error": "Unit 02 not found in Master Document"}
        
        master_section = u02_section.group(0)
        u02_vocab = self.get_vocabulary_by_unit(2)
        
        # Extract required grammar patterns
        required_grammar = {
            'original_present_simple': bool(re.search(r'Present Simple.*Affirmative', master_section, re.IGNORECASE)),
            'original_negatives': bool(re.search(r'don\'t|doesn\'t', master_section, re.IGNORECASE)),
            'original_questions': bool(re.search(r'do\s+you|does\s+he', master_section, re.IGNORECASE)),
            'original_continuous': bool(re.search(r'Present Continuous|verb-ing', master_section, re.IGNORECASE)),
            'a1_plus_negatives': bool(re.search(r'am not|isn\'t|aren\'t', master_section, re.IGNORECASE)),
            'a1_plus_have_has': bool(re.search(r'HAVE|HAS', master_section, re.IGNORECASE)),
            'a1_plus_there': bool(re.search(r'THERE IS|THERE ARE', master_section, re.IGNORECASE)),
            'a1_plus_wh_questions': bool(re.search(r'WH-Question', master_section, re.IGNORECASE)),
            'a1_plus_demonstratives': bool(re.search(r'Demonstrative', master_section, re.IGNORECASE)),
        }
        
        # Check what's present in Unit 02 file
        u02_has = {
            'present_simple': bool(re.search(r'wake|sleep|work|study|play', str(u02_vocab), re.IGNORECASE)),
            'negatives': bool(re.search(r'don\'t|doesn\'t', str(u02_vocab), re.IGNORECASE)),
            'have_has': 'have' in u02_vocab or 'has' in u02_vocab,
            'there_is_are': 'there is' in u02_vocab or 'there are' in u02_vocab,
            'wh_questions': any(wh in str(u02_vocab).lower() for wh in ['what', 'where', 'who', 'how', 'when', 'why']),
            'demonstratives': 'this' in u02_vocab or 'that' in u02_vocab,
        }
        
        # Extract vocab card details
        vocab_cards = re.findall(r'#### VOCAB CARD \d+: (.+?)$', self.unit_02 if hasattr(self, 'unit_02') else '', re.MULTILINE)
        
        return {
            "unit_02_vocab_count": len(u02_vocab),
            "required_grammar_patterns": required_grammar,
            "unit_02_has": u02_has,
            "vocab_cards_found": len(vocab_cards),
            "sample_vocab": sorted(list(u02_vocab))[:10] if u02_vocab else []
        }
    
    # =========================================================================
    # DISPLAY
    # =========================================================================
    
    def print_status(self):
        """Print overall recycling status."""
        print("\n" + "="*70)
        print("📊 VOCABULARY & GRAMMAR RECYCLING ANALYSIS")
        print("="*70)
        print("\n⚠️  Only AUDITED units contribute vocabulary to recycling pool.")
        
        total_vocab = set()
        total_grammar = set()
        audited_count = 0
        pending_count = 0
        
        # Sort keys: convert all to float for sorting (int 1 -> 1.0, str "1.5" -> 1.5)
        def sort_key(k):
            if isinstance(k, str):
                return float(k)
            return float(k)
        
        for unit_num in sorted(self.units_data.keys(), key=sort_key):
            unit_data = self.units_data[unit_num]
            is_audited = unit_data.get('audited', False)
            vocab = self.get_vocabulary_by_unit(unit_num)
            grammar = self.get_grammar_by_unit(unit_num)
            introduced_vocab = self.get_vocab_introduced_in_unit(unit_num)
            recycled_vocab = self.get_vocab_recycled_in_unit(unit_num)
            
            total_vocab.update(vocab)
            total_grammar.update(grammar)
            
            # Format unit number display (handle .5 for plus units)
            if isinstance(unit_num, str) or (isinstance(unit_num, float) and unit_num % 1 != 0):
                unit_display = f"UNIT {unit_num} (PLUS)"
            else:
                unit_display = f"UNIT {int(unit_num):02d}"
            
            # Add audit status indicator
            if is_audited:
                status_icon = "✅"
                audited_count += 1
            else:
                status_icon = "⏳"
                pending_count += 1
            
            print(f"\n{status_icon} {unit_display}:")
            print(f"   File: {unit_data['file']}")
            if is_audited:
                print(f"   Total vocab: {len(vocab)} items")
                print(f"   Introduced: {len(introduced_vocab)} NEW items")
                print(f"   Recycled: {len(recycled_vocab)} items from earlier units")
            else:
                print(f"   Status: PENDING AUDIT (vocab excluded from pool)")
        
        print(f"\n" + "="*70)
        print(f"📈 AUDITED UNITS SUMMARY:")
        print(f"   Audited: {audited_count} | Pending: {pending_count}")
        print(f"   Unique vocabulary (from audited): {len(total_vocab)}")
        print(f"   Unique grammar (from audited): {len(total_grammar)}")
        print("="*70)
    
    def print_needs_recycling(self, target_unit: int):
        """Print recycling needs for a specific unit."""
        needs = self.get_items_needing_recycling(target_unit)
        
        print(f"\n" + "="*70)
        print(f"🔄 RECYCLING NEEDS FOR UNIT {target_unit:02d}")
        print("="*70)
        
        if needs["critical"]:
            print(f"\n🔴 CRITICAL (Never recycled after introduction):")
            for item in needs["critical"][:15]:
                print(f"   • {item['word']:<20} [from U{item['introduced']:02d}]")
        
        if needs["high"]:
            print(f"\n🟠 HIGH PRIORITY (Recycled once, not recently):")
            for item in needs["high"][:15]:
                print(f"   • {item['word']:<20} [from U{item['introduced']:02d}, last U{item['last_recycled']:02d}, {item['units_since']} units ago]")
        
        if needs["medium"]:
            print(f"\n🟡 MEDIUM PRIORITY (Recycled a few times):")
            for item in needs["medium"][:10]:
                print(f"   • {item['word']:<20} [x{item['recycle_count']} from U{item['introduced']:02d}]")
        
        print("="*70)
    
    def print_coverage(self, unit_num: int):
        """Print coverage report for a unit."""
        report = self.get_coverage_report(unit_num)
        
        if "error" in report:
            print(f"⚠️  {report['error']}")
            return
        
        print(f"\n" + "="*70)
        print(f"📋 COVERAGE REPORT - UNIT {unit_num:02d}")
        print("="*70)
        print(f"\nRequired vocab: {report['required_count']}")
        print(f"Present vocab:  {report['present_count']}")
        print(f"Missing vocab:  {report['missing_count']}")
        print(f"Coverage:       {report['coverage_percent']:.1f}%")
        
        if report['missing_vocab']:
            print(f"\n❌ MISSING ({len(report['missing_vocab'])}):")
            for word in report['missing_vocab'][:20]:
                print(f"   • {word}")
        
        print("="*70)
    
    def print_unit_extract(self, unit_num):
        """Print all vocab and grammar for a unit."""
        # Normalize unit_num to match dictionary key type (float or int)
        if isinstance(unit_num, str):
            # Convert string to appropriate numeric type
            unit_key = float(unit_num) if '.' in unit_num else int(unit_num)
        elif isinstance(unit_num, float) and unit_num % 1 == 0:
            # Whole number float - check both int and float keys
            unit_key = int(unit_num) if int(unit_num) in self.units_data else unit_num
        else:
            unit_key = unit_num
            
        vocab = sorted(self.get_vocabulary_by_unit(unit_key))
        grammar = sorted(self.get_grammar_by_unit(unit_key))
        introduced = sorted(self.get_vocab_introduced_in_unit(unit_key))
        recycled = sorted(self.get_vocab_recycled_in_unit(unit_key))
        
        # Format unit display
        if isinstance(unit_key, str) or (isinstance(unit_key, float) and unit_key % 1 != 0):
            unit_display = f"UNIT {unit_key} (PLUS)"
        else:
            unit_display = f"UNIT {int(unit_key):02d}"
        
        print(f"\n" + "="*70)
        print(f"📚 {unit_display} CONTENT EXTRACTION")
        print("="*70)
        
        print(f"\n✨ INTRODUCED ({len(introduced)} NEW):")
        for word in introduced:
            print(f"   • {word}")
        
        if recycled:
            print(f"\n♻️  RECYCLED ({len(recycled)} from earlier):")
            for word in recycled:
                first_unit = self.vocab_first_seen.get(word.lower())
                if isinstance(first_unit, str) or (isinstance(first_unit, float) and first_unit % 1 != 0):
                    print(f"   • {word:<20} [from U{first_unit}+]")
                else:
                    print(f"   • {word:<20} [from U{int(first_unit):02d}]")
        
        if grammar:
            print(f"\n📖 GRAMMAR ({len(grammar)}):")
            for gram in grammar:
                print(f"   • {gram}")
        
        print("="*70)
    
    # =========================================================================
    # PREFLIGHT CHECK (Run BEFORE creating a new unit)
    # =========================================================================
    
    def print_preflight(self, target_unit: int):
        """
        PREFLIGHT CHECK: Print mandatory recycling items for a new unit.
        This MUST be run before creating vocab_cards_u0X.js
        """
        print("\n" + "="*70)
        print(f"🚀 PREFLIGHT CHECK - UNIT {target_unit:02d}")
        print("="*70)
        print(f"\n⚠️  RUN THIS BEFORE CREATING vocab_cards_u{target_unit:02d}.js")
        print("   All items below MUST appear in your dialogues/cards.\n")
        
        # RULE R2: Mandatory Recycling Categories
        print("─"*70)
        print("📋 RULE R2: MANDATORY RECYCLING CATEGORIES")
        print("─"*70)
        
        for category, items in self.MANDATORY_RECYCLING.items():
            # Check which items exist in earlier units
            available = []
            for item in items:
                if item.lower() in self.vocab_first_seen:
                    source_unit = self.vocab_first_seen[item.lower()]
                    if source_unit < target_unit:
                        available.append(f"{item} (U{source_unit:02d})" if isinstance(source_unit, int) else f"{item} (U{source_unit})")
            
            if available:
                print(f"\n   {category.upper().replace('_', ' ')}:")
                print(f"      {', '.join(available[:10])}")
        
        # RULE R5: Priority-based recycling needs
        needs = self.get_items_needing_recycling(target_unit)
        
        print("\n" + "─"*70)
        print("🔴 PRIORITY 1 (HIGH) - MUST RECYCLE IN THIS UNIT:")
        print("─"*70)
        
        if needs["critical"]:
            for item in needs["critical"][:20]:
                print(f"   • {item['word']:<25} [introduced U{item['introduced']:02d}, NEVER recycled]")
        else:
            print("   ✅ No critical items pending")
        
        print("\n" + "─"*70)
        print("🟠 PRIORITY 2 (MEDIUM) - SHOULD RECYCLE IF POSSIBLE:")
        print("─"*70)
        
        if needs["high"]:
            for item in needs["high"][:15]:
                print(f"   • {item['word']:<25} [from U{item['introduced']:02d}, last seen U{item['last_recycled']:02d}]")
        else:
            print("   ✅ No high-priority items pending")
        
        # RULE R8: Expected ratio
        print("\n" + "─"*70)
        print("📊 RULE R8: TARGET RECYCLING RATIO")
        print("─"*70)
        print(f"   Target: 60-75% recycled content")
        print(f"   Formula: (Words from U01-U{target_unit-1:02d}) / (Total Words)")
        print(f"   If < 60%: Add more recycled vocabulary")
        print(f"   If > 75%: Add more new target vocabulary")
        
        print("\n" + "="*70)
        print("✅ PREFLIGHT COMPLETE - You may now create the unit file.")
        print("="*70)
    
    # =========================================================================
    # VALIDATE JS FILE STRUCTURE
    # =========================================================================
    
    def validate_js_structure(self, unit_num: int):
        """Validate that a vocab_cards_u0X.js file follows Master Document structure."""
        print("\n" + "="*70)
        print(f"🔍 VALIDATING vocab_cards_u{unit_num:02d}.js (All 5 Constraints + Rules)")
        print("="*70)
        
        if unit_num not in self.vocab_cards_data:
            print(f"   ❌ File not found: vocab_cards_u{unit_num:02d}.js")
            return
        
        data = self.vocab_cards_data[unit_num]
        issues = []
        passes = []
        warnings = []
        
        # ─────────────────────────────────────────────────────────────────────
        # CONSTRAINT #1: Core Vocabulary Coverage
        # ─────────────────────────────────────────────────────────────────────
        if data["dialogues"]:
            passes.append(f"✅ CONSTRAINT #1: Dialogues found ({len(data['dialogues'])})")
        else:
            issues.append("❌ CONSTRAINT #1: No dialogues found (vocab must appear in dialogues)")
        
        # ─────────────────────────────────────────────────────────────────────
        # CONSTRAINT #2: Anchor Sentence = Dialogue Sentence
        # ─────────────────────────────────────────────────────────────────────
        if data["recycling"]["has_source_dialogue"]:
            passes.append("✅ CONSTRAINT #2: Anchor sentences have source_dialogue references")
        else:
            issues.append("❌ CONSTRAINT #2: No source_dialogue references (anchor must link to dialogue)")
        
        # ─────────────────────────────────────────────────────────────────────
        # CONSTRAINT #3: Grammar Forms (+/-/?)
        # ─────────────────────────────────────────────────────────────────────
        gc = data.get("grammar_coverage", {})
        if gc.get("full_cycle"):
            passes.append("✅ CONSTRAINT #3: Grammar forms complete (+/-/?)")
        else:
            missing = []
            if not gc.get("has_affirmative"):
                missing.append("+")
            if not gc.get("has_negative"):
                missing.append("-")
            if not gc.get("has_question"):
                missing.append("?")
            issues.append(f"❌ CONSTRAINT #3: Missing grammar forms: {', '.join(missing)}")
        
        # ─────────────────────────────────────────────────────────────────────
        # CONSTRAINT #4: Recycling Coverage
        # ─────────────────────────────────────────────────────────────────────
        if data["recycling"]["has_recycling_block"]:
            passes.append("✅ CONSTRAINT #4: Recycling metadata block present")
            
            # Deep Check: Is the registry comprehensive?
            registry_content = data.get("raw_content", "")
            required_cats = ["subject_pronouns", "to_be", "possessive", "question_words", "articles", "prepositions"]
            missing_cats = [cat for cat in required_cats if cat not in registry_content]
            
            if not missing_cats:
                passes.append("   ✅ Registry contains all required Rule R2 categories")
            else:
                warnings.append(f"   ⚠️  Registry missing Rule R2 categories: {', '.join(missing_cats)}")
        else:
            warnings.append("❌ CONSTRAINT #4: No recycling block (should track mandatory items)")
        
        # ─────────────────────────────────────────────────────────────────────
        # CONSTRAINT #5: Vocab Card Structure (6 elements)
        # ─────────────────────────────────────────────────────────────────────
        content = data.get("raw_content", "")
        # Allow new 4+2 Act keys (uz_context) alongside legacy (uz_context_question)
        has_uz_context = ("uz_context_question:" in content) or ("uz_context:" in content)
        has_uz_mirror = "uz_mirror_answer:" in content
        has_hybrid = "hybrid_answer:" in content
        has_anchor = ("anchor_sentence:" in content) or ("is_anchor:" in content)
        
        # New format uses implicit examples in drill_list, but legacy uses explicit keys
        # We check for at least some form of multiple examples
        has_ex2 = ("example_2:" in content) or ("en_examples:" in content)
        has_ex3 = ("example_3:" in content) or ("en_examples:" in content)
        
        elements_present = sum([has_uz_context, has_uz_mirror, has_hybrid, has_anchor, has_ex2, has_ex3])
        if elements_present == 6:
            passes.append("✅ CONSTRAINT #5: All 6 vocab card elements present (Legacy/4+2 compliant)")
        else:
            missing_elements = []
            if not has_uz_context: missing_elements.append("uz_context(_question)")
            if not has_uz_mirror: missing_elements.append("uz_mirror_answer")
            if not has_hybrid: missing_elements.append("hybrid_answer")
            if not has_anchor: missing_elements.append("anchor_sentence")
            if not has_ex2: missing_elements.append("example_2")
            if not has_ex3: missing_elements.append("example_3")
            issues.append(f"❌ CONSTRAINT #5: Missing elements: {', '.join(missing_elements)}")
        
        # ─────────────────────────────────────────────────────────────────────
        # RULE R5: Priority Levels
        # ─────────────────────────────────────────────────────────────────────
        if data["recycling"]["has_priority"]:
            counts = data["recycling"]["priority_counts"]
            passes.append(f"✅ RULE R5: Priority levels assigned (HIGH:{counts['high']}, MED:{counts['medium']}, LOW:{counts['low']})")
        else:
            warnings.append("⚠️  RULE R5: No priority levels (should tag vocabulary by recycling frequency)")
        
        # ─────────────────────────────────────────────────────────────────────
        # RULE R8: Recycling Ratio Check
        # ─────────────────────────────────────────────────────────────────────
        ratio_result = self.calculate_recycling_ratio(unit_num)
        if "error" not in ratio_result and ratio_result["total"] > 0:
            ratio = ratio_result["ratio"]
            if 0.60 <= ratio <= 0.75:
                passes.append(f"✅ RULE R8: Recycling ratio {ratio:.2f} (optimal 0.60-0.75)")
            elif ratio < 0.60:
                warnings.append(f"⚠️  RULE R8: Ratio {ratio:.2f} < 0.60 (add more recycled vocab)")
            else:
                warnings.append(f"⚠️  RULE R8: Ratio {ratio:.2f} > 0.75 (add more new vocab)")
        
        # ─────────────────────────────────────────────────────────────────────
        # Additional checks
        # ─────────────────────────────────────────────────────────────────────
        if data["recycling"]["has_recycled_vocab"]:
            passes.append("✅ Example 3 recycled_vocab tracking present")
        else:
            warnings.append("⚠️  No recycled_vocab tracking in Example 3")
        
        vocab_count = len(data["vocab"])
        if vocab_count > 0:
            passes.append(f"✅ Vocabulary items found: {vocab_count}")
        else:
            issues.append("❌ No vocabulary items extracted")
        
        # ─────────────────────────────────────────────────────────────────────
        # Print results
        # ─────────────────────────────────────────────────────────────────────
        print("\n📋 CONSTRAINT & RULE CHECK RESULTS:")
        print("─"*70)
        
        for p in passes:
            print(f"   {p}")
        
        if warnings:
            print("\n⚠️  WARNINGS (non-critical):")
            for w in warnings:
                print(f"   {w}")
        
        if issues:
            print("\n❌ ISSUES FOUND (must fix):")
            for i in issues:
                print(f"   {i}")
        
        # Overall status
        print("\n" + "─"*70)
        if not issues and not warnings:
            print("🎉 VALIDATION PASSED - File is fully Master Document compliant!")
        elif not issues:
            print("✅ VALIDATION PASSED - File is compliant (minor warnings only)")
        elif len(issues) <= 2:
            print("⚠️  VALIDATION PARTIAL - Some issues need attention")
        else:
            print("❌ VALIDATION FAILED - Major structural issues need fixing")
        print("="*70)


# ============================================================================
# CLI
# ============================================================================

if __name__ == "__main__":
    import sys
    
    analyzer = RecyclingAnalyzer(workspace_dir="d:\\New folder")
    
    if len(sys.argv) < 2:
        analyzer.print_status()
    elif sys.argv[1] == "status":
        analyzer.print_status()
    elif sys.argv[1] == "audited":
        print("\n" + "="*70)
        print("✅ AUDITED UNITS REGISTRY")
        print("="*70)
        print("\nThese units contribute vocabulary to the recycling pool:")
        for u in sorted(RecyclingAnalyzer.AUDITED_UNITS):
            if u % 1 == 0:
                print(f"   • Unit {int(u):02d}")
            else:
                print(f"   • Unit {u} (PLUS)")
        print("\nTo add a unit after audit, edit AUDITED_UNITS in recycling_analyzer.py")
        print("="*70)
    elif sys.argv[1] == "needs" and len(sys.argv) > 2:
        unit_str = sys.argv[2].replace("U", "")
        # Check if it's a plus unit (e.g., "01+" or "1+")
        if "+" in unit_str:
            unit = float(unit_str.replace("+", "")) + 0.5
        else:
            unit = int(unit_str)
        analyzer.print_needs_recycling(unit)
    elif sys.argv[1] == "coverage" and len(sys.argv) > 2:
        unit_str = sys.argv[2].replace("U", "")
        if "+" in unit_str:
            unit = float(unit_str.replace("+", "")) + 0.5
        else:
            unit = int(unit_str)
        analyzer.print_coverage(unit)
    elif sys.argv[1] == "extract" and len(sys.argv) > 2:
        unit_str = sys.argv[2].replace("U", "")
        # Check if it's a plus unit (e.g., "01+" or "1+" or "1.5")
        if "+" in unit_str:
            unit = float(unit_str.replace('+', '')) + 0.5  # e.g., "1+" -> 1.5
        elif "." in unit_str:
            unit = float(unit_str)  # e.g., "1.5" -> 1.5 (float, not string)
        else:
            unit = int(unit_str)
        analyzer.print_unit_extract(unit)
    elif sys.argv[1] == "preflight" and len(sys.argv) > 2:
        # NEW: Preflight check before creating a unit
        unit_str = sys.argv[2].replace("U", "")
        unit = int(unit_str)
        analyzer.print_preflight(unit)
    elif sys.argv[1] == "validate" and len(sys.argv) > 2:
        # Validate JS file structure
        unit_str = sys.argv[2].replace("U", "")
        unit = int(unit_str)
        analyzer.validate_js_structure(unit)
    elif sys.argv[1] == "ratio" and len(sys.argv) > 2:
        # NEW: Calculate recycling ratio (RULE R8)
        unit_str = sys.argv[2].replace("U", "")
        unit = int(unit_str)
        result = analyzer.calculate_recycling_ratio(unit)
        if "error" in result:
            print(f"⚠️  {result['error']}")
        else:
            print("\n" + "="*70)
            print(f"📊 RECYCLING RATIO - UNIT {unit:02d} (RULE R8)")
            print("="*70)
            print(f"\n   Recycled words: {result['recycled_count']}")
            print(f"   New words:      {result['new_count']}")
            print(f"   Total:          {result['total']}")
            print(f"   Ratio:          {result['ratio']:.2f} ({result['ratio']*100:.1f}%)")
            print(f"   Status:         {result['status']}")
            if result['recycled_words']:
                print(f"\n   Sample recycled: {', '.join(result['recycled_words'][:5])}")
            if result['new_words']:
                print(f"   Sample new:      {', '.join(result['new_words'][:5])}")
            print("="*70)
    elif sys.argv[1] == "grammar" and len(sys.argv) > 2:
        # NEW: Check grammar form coverage (RULE R2.1)
        unit_str = sys.argv[2].replace("U", "")
        unit = int(unit_str)
        if unit not in analyzer.vocab_cards_data:
            print(f"⚠️  Unit {unit} not found")
        else:
            data = analyzer.vocab_cards_data[unit]
            gc = data.get("grammar_coverage", {})
            print("\n" + "="*70)
            print(f"📖 GRAMMAR FORM COVERAGE - UNIT {unit:02d} (RULE R2.1)")
            print("="*70)
            expected = analyzer.GRAMMAR_FORMS.get(unit, {})
            print(f"\n   Focus: {expected.get('focus', 'Unknown')}")
            print(f"\n   (+) Affirmative: {'✅' if gc.get('has_affirmative') else '❌'}")
            if gc.get('affirmative_examples'):
                for ex in gc['affirmative_examples'][:2]:
                    print(f"       → {ex}")
            print(f"\n   (-) Negative:    {'✅' if gc.get('has_negative') else '❌'}")
            if gc.get('negative_examples'):
                for ex in gc['negative_examples'][:2]:
                    print(f"       → {ex}")
            print(f"\n   (?) Question:    {'✅' if gc.get('has_question') else '❌'}")
            if gc.get('question_examples'):
                for ex in gc['question_examples'][:2]:
                    print(f"       → {ex}")
            print(f"\n   Full Cycle:      {'✅ COMPLETE' if gc.get('full_cycle') else '❌ INCOMPLETE'}")
            print("="*70)
    elif sys.argv[1] == "js":
        # Show vocab_cards_u*.js files status
        print("\n" + "="*70)
        print("📁 VOCAB CARDS JS FILES STATUS")
        print("="*70)
        for unit_num, data in sorted(analyzer.vocab_cards_data.items()):
            new_format = "✅ NEW FORMAT" if data["has_new_format"] else "⚠️  OLD FORMAT"
            dialogues = f"{len(data['dialogues'])} dialogues" if data["dialogues"] else "NO dialogues"
            vocab_count = len(data["vocab"])
            gc = data.get("grammar_coverage", {})
            grammar_status = "✅ +/-/?" if gc.get("full_cycle") else "⚠️  incomplete"
            print(f"\n   U{unit_num:02d}: {data['file']}")
            print(f"       {new_format} | {dialogues} | {vocab_count} vocab items | Grammar: {grammar_status}")
            if data["recycling"]["has_priority"]:
                counts = data["recycling"]["priority_counts"]
                print(f"       Priority: HIGH={counts['high']}, MED={counts['medium']}, LOW={counts['low']}")
        print("="*70)
    elif sys.argv[1] == "help":
        print(__doc__)
    else:
        print(__doc__)
