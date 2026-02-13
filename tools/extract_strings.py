#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
  EXTRACT STRINGS — Vocab Card Translation Pipeline (Step 1)
═══════════════════════════════════════════════════════════════

Extracts all translatable Uzbek strings from vocab_cards_u**_4act.js
files and outputs structured JSON for the translation pipeline.

Usage:
  python tools/extract_strings.py                     # All units
  python tools/extract_strings.py --unit 02            # Single unit
  python tools/extract_strings.py --unit 02 --output custom.json

Output format (tools/extracts/unit_XX.json):
  {
    "meta": { "unit": "02", "source_file": "vocab_cards_u02_4act.js", ... },
    "strings": [
      {
        "id": "U02.dialogues.U02_L01_D01.lines[0].line_uz",
        "field": "line_uz",
        "value": "Xayrli tong! Siz erta turasismi?",
        "context": { "speaker": "Ali", "en_line": "Good morning!...", ... }
      },
      ...
    ]
  }
"""

import os
import re
import json
import argparse
from pathlib import Path

# ── Project root (one level up from tools/) ──
ROOT = Path(__file__).resolve().parent.parent

# ── Field patterns to extract ──
# These are the Uzbek-language fields that need translation counterparts
FIELD_PATTERNS = {
    # Dialogue lines
    'line_uz':           re.compile(r'line_uz\s*:\s*"((?:[^"\\]|\\.)*)"'),

    # Presentation slide
    'uz_context':        re.compile(r'uz_context\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'uz_mirror_answer':  re.compile(r'uz_mirror_answer\s*:\s*"((?:[^"\\]|\\.)*)"'),

    # Production slide
    'uz_prompt':         re.compile(r'uz_prompt\s*:\s*"((?:[^"\\]|\\.)*)"'),

    # Concept check
    'instruction':       re.compile(r'instruction\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'success_msg':       re.compile(r'success_msg\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'fail_msg':          re.compile(r'fail_msg\s*:\s*"((?:[^"\\]|\\.)*)"'),

    # Discovery
    'explanation_uz':    re.compile(r'explanation_uz\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'why_prompt':        re.compile(r'why_prompt\s*:\s*"((?:[^"\\]|\\.)*)"'),

    # Trap message (contains ⚠️ emoji)
    'trap_message':      re.compile(r'message\s*:\s*"((?:[^"\\]|\\.)*⚠️(?:[^"\\]|\\.)*)"'),

    # Option labels (bilingual labels like "Ertalab (In the morning)")
    'option_label':      re.compile(r'label\s*:\s*"((?:[^"\\]|\\.)*\((?:[^"\\]|\\.)*\)(?:[^"\\]|\\.)*)"'),

    # Personalization
    'prompt_uz':         re.compile(r'prompt_uz\s*:\s*"((?:[^"\\]|\\.)*)"'),

    # Syntax scaffold gloss
    'uz_gloss':          re.compile(r'uz_gloss\s*:\s*"((?:[^"\\]|\\.)*)"'),

    # Item-level Uzbek definition (standalone uz field in drill lists & items)
    'item_uz':           re.compile(r'(?:^|\s|,)\s*uz\s*:\s*"((?:[^"\\]|\\.)*)"'),
}

# Extra context fields to capture alongside translatable fields
CONTEXT_PATTERNS = {
    'en_line':           re.compile(r'(?:^|\s)line\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'en_canonical':      re.compile(r'en_canonical\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'speaker':           re.compile(r'speaker\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'phase':             re.compile(r'phase\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'word_en':           re.compile(r'(?:^|\s)en\s*:\s*"((?:[^"\\]|\\.)*)"'),
    'item_id':           re.compile(r'id\s*:\s*"(V_[^"]*)"'),
    'dialogue_id':       re.compile(r'(?:dialogue_id|id)\s*:\s*"(U\d+_L\d+_D\d+)"'),
}


def find_vocab_files(unit=None):
    """Find vocab card JS files in the project root."""
    pattern = f"vocab_cards_u{unit}_4act.js" if unit else "vocab_cards_u*_4act.js"
    files = sorted(ROOT.glob(pattern))
    if not files:
        print(f"⚠️  No files matching '{pattern}' found in {ROOT}")
    return files


def extract_unit_number(filepath):
    """Extract unit number from filename like vocab_cards_u02_4act.js → '02'."""
    m = re.search(r'vocab_cards_u(\d+(?:[._]\d+)?)_4act', filepath.name)
    return m.group(1) if m else 'unknown'


def is_uzbek_string(text):
    """Heuristic: check if a string contains Uzbek-specific characters or patterns."""
    # Uzbek uses apostrophes (o', g', sh, etc.) and Latin chars
    uz_markers = ["o'", "g'", "sh", "ch", "ng'", "'"]
    # Also check for Uzbek common words
    uz_words = ['men', 'siz', 'bilan', 'uchun', 'yoki', 'va ', 'bu ', 'qilish', 'dan', 'emas']

    text_lower = text.lower()
    if any(m in text_lower for m in uz_markers):
        return True
    if any(w in text_lower for w in uz_words):
        return True
    # If field name already indicates Uzbek (line_uz, uz_context, etc.), trust it
    return False


def extract_strings_from_file(filepath):
    """Extract all translatable strings from a single vocab JS file."""
    content = filepath.read_text(encoding='utf-8')
    lines = content.split('\n')

    strings = []
    seen_values = set()  # Deduplicate identical strings

    # Track current context as we scan line by line
    current_context = {}
    current_item_id = None
    current_dialogue_id = None
    current_phase = None
    line_in_dialogue = -1

    for line_num, line in enumerate(lines, 1):
        # Update context tracking
        id_match = CONTEXT_PATTERNS['item_id'].search(line)
        if id_match:
            current_item_id = id_match.group(1)

        dlg_match = CONTEXT_PATTERNS['dialogue_id'].search(line)
        if dlg_match:
            current_dialogue_id = dlg_match.group(1)

        phase_match = CONTEXT_PATTERNS['phase'].search(line)
        if phase_match:
            current_phase = phase_match.group(1)

        speaker_match = CONTEXT_PATTERNS['speaker'].search(line)
        speaker = speaker_match.group(1) if speaker_match else None

        en_line_match = CONTEXT_PATTERNS['en_line'].search(line)
        en_canonical_match = CONTEXT_PATTERNS['en_canonical'].search(line)

        # Search for translatable fields
        for field_name, pattern in FIELD_PATTERNS.items():
            matches = pattern.finditer(line)
            for match in matches:
                value = match.group(1).strip()
                if not value:
                    continue

                # Skip pure English strings (no Uzbek content)
                if field_name in ('instruction', 'success_msg', 'fail_msg', 'option_label', 'trap_message'):
                    # These fields may contain Uzbek or English; check
                    if not is_uzbek_string(value) and "'" not in value:
                        continue

                # Build a unique ID for this string
                path_parts = []
                if current_dialogue_id and field_name == 'line_uz':
                    path_parts = ['dialogues', current_dialogue_id, f'line_{line_num}']
                elif current_item_id:
                    path_parts = ['items', current_item_id]
                    if current_phase:
                        path_parts.append(current_phase)
                    path_parts.append(field_name)
                else:
                    path_parts = [f'line_{line_num}', field_name]

                string_id = '.'.join(path_parts)

                # Dedup check
                dedup_key = f"{field_name}:{value}"
                if dedup_key in seen_values:
                    continue
                seen_values.add(dedup_key)

                # Build context
                context = {
                    'line_number': line_num,
                    'field': field_name,
                }
                if speaker:
                    context['speaker'] = speaker
                if current_item_id:
                    context['item_id'] = current_item_id
                if current_dialogue_id:
                    context['dialogue_id'] = current_dialogue_id
                if current_phase:
                    context['phase'] = current_phase
                if en_line_match:
                    context['en_line'] = en_line_match.group(1)
                if en_canonical_match:
                    context['en_canonical'] = en_canonical_match.group(1)

                strings.append({
                    'id': string_id,
                    'field': field_name,
                    'value': value,
                    'context': context,
                })

    return strings


def extract_unit(filepath, output_dir=None):
    """Extract strings from one unit file and save to JSON."""
    unit = extract_unit_number(filepath)
    print(f"\n📂 Extracting from {filepath.name}...")

    strings = extract_strings_from_file(filepath)

    # Categorize
    categories = {}
    for s in strings:
        cat = s['field']
        categories[cat] = categories.get(cat, 0) + 1

    result = {
        'meta': {
            'unit': unit,
            'source_file': filepath.name,
            'total_strings': len(strings),
            'categories': categories,
            'version': '1.0.0',
        },
        'strings': strings,
    }

    # Output
    if output_dir is None:
        output_dir = ROOT / 'tools' / 'extracts'
    output_dir.mkdir(parents=True, exist_ok=True)

    output_file = output_dir / f'unit_{unit}.json'
    output_file.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')

    print(f"   ✅ {len(strings)} strings extracted")
    for cat, count in sorted(categories.items()):
        print(f"      • {cat}: {count}")
    print(f"   📄 Saved to: {output_file}")

    return result


def main():
    parser = argparse.ArgumentParser(
        description='Extract translatable Uzbek strings from vocab card JS files'
    )
    parser.add_argument('--unit', '-u', type=str, default=None,
                        help='Unit number (e.g. 02). Omit for all units.')
    parser.add_argument('--output', '-o', type=str, default=None,
                        help='Output directory (default: tools/extracts/)')
    args = parser.parse_args()

    output_dir = Path(args.output) if args.output else None
    files = find_vocab_files(args.unit)

    if not files:
        print("❌ No vocab files found.")
        return

    total = 0
    for f in files:
        result = extract_unit(f, output_dir)
        total += result['meta']['total_strings']

    print(f"\n{'='*60}")
    print(f"🎯 Total: {total} strings extracted from {len(files)} files")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
