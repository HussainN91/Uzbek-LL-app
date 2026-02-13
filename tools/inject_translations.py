#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
  INJECT TRANSLATIONS — Vocab Card Translation Pipeline (Step 3)
═══════════════════════════════════════════════════════════════

Takes translated JSON from Step 2 and injects the translated fields
back into the vocab_cards_u**_4act.js files.

For each Uzbek field, it adds the corresponding target-language field:
  line_uz → line_ar (+ line_zh, line_id, line_ru)
  uz_context → ar_context
  uz_mirror_answer → ar_mirror_answer
  uz_prompt → ar_prompt
  instruction → ar_instruction
  success_msg → ar_success_msg
  fail_msg → ar_fail_msg
  explanation_uz → explanation_ar
  why_prompt → ar_why_prompt
  prompt_uz → prompt_ar
  uz_gloss → ar_gloss
  uz (item def) → ar (item def)

Usage:
  python tools/inject_translations.py --unit 02 --target ar
  python tools/inject_translations.py --all --target ar
  python tools/inject_translations.py --unit 02 --target ar --dry-run

The script creates a backup (.bak) before modifying any JS file.
"""

import os
import re
import json
import shutil
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TRANSLATIONS_DIR = ROOT / 'tools' / 'translations'

# ── Field mapping: source field → target field template ──
# {lang} gets replaced with the target language code
FIELD_MAP = {
    'line_uz':          'line_{lang}',
    'uz_context':       '{lang}_context',
    'uz_mirror_answer': '{lang}_mirror_answer',
    'uz_prompt':        '{lang}_prompt',
    'instruction':      '{lang}_instruction',
    'success_msg':      '{lang}_success_msg',
    'fail_msg':         '{lang}_fail_msg',
    'explanation_uz':   'explanation_{lang}',
    'why_prompt':       '{lang}_why_prompt',
    'prompt_uz':        'prompt_{lang}',
    'uz_gloss':         '{lang}_gloss',
    'item_uz':          '{lang}',
    'option_label':     '{lang}_label',
    'trap_message':     '{lang}_message',
}


def load_translations(unit, target_lang):
    """Load translated strings JSON for a unit."""
    path = TRANSLATIONS_DIR / f'unit_{unit}_{target_lang}.json'
    if not path.exists():
        raise FileNotFoundError(
            f"Translation not found: {path}\n"
            f"Run: python tools/translate_content.py --unit {unit} --target {target_lang}"
        )
    return json.loads(path.read_text(encoding='utf-8'))


def find_vocab_file(unit):
    """Find the vocab card JS file for a unit."""
    path = ROOT / f'vocab_cards_u{unit}_4act.js'
    if not path.exists():
        raise FileNotFoundError(f"Vocab file not found: {path}")
    return path


def build_injection_line(field, target_lang, translated_text, indent=''):
    """Build a JS property line to inject."""
    target_field = FIELD_MAP.get(field, f'{target_lang}_{field}')
    target_field = target_field.replace('{lang}', target_lang)

    # Escape quotes in the translated text
    escaped = translated_text.replace('\\', '\\\\').replace('"', '\\"')
    return f'{indent}{target_field}: "{escaped}"'


def inject_into_file(filepath, translations, target_lang, dry_run=False):
    """Inject translated fields into a vocab JS file."""
    content = filepath.read_text(encoding='utf-8')
    lines = content.split('\n')

    # Build a lookup: source_value → translation info
    trans_lookup = {}
    for t in translations:
        source = t.get('source', '')
        if source:
            if source not in trans_lookup:
                trans_lookup[source] = []
            trans_lookup[source].append(t)

    # Track what we inject
    injections = 0
    skipped = 0
    new_lines = []

    # Regex patterns for finding source fields
    source_patterns = {
        'line_uz':          re.compile(r'''(\s*)line_uz\s*:\s*["'`](.*?)["'`]'''),
        'uz_context':       re.compile(r'''(\s*)uz_context\s*:\s*["'`](.*?)["'`]'''),
        'uz_mirror_answer': re.compile(r'''(\s*)uz_mirror_answer\s*:\s*["'`](.*?)["'`]'''),
        'uz_prompt':        re.compile(r'''(\s*)uz_prompt\s*:\s*["'`](.*?)["'`]'''),
        'instruction':      re.compile(r'''(\s*)instruction\s*:\s*["'`](.*?)["'`]'''),
        'success_msg':      re.compile(r'''(\s*)success_msg\s*:\s*["'`](.*?)["'`]'''),
        'fail_msg':         re.compile(r'''(\s*)fail_msg\s*:\s*["'`](.*?)["'`]'''),
        'explanation_uz':   re.compile(r'''(\s*)explanation_uz\s*:\s*["'`](.*?)["'`]'''),
        'why_prompt':       re.compile(r'''(\s*)why_prompt\s*:\s*["'`](.*?)["'`]'''),
        'prompt_uz':        re.compile(r'''(\s*)prompt_uz\s*:\s*["'`](.*?)["'`]'''),
        'uz_gloss':         re.compile(r'''(\s*)uz_gloss\s*:\s*["'`](.*?)["'`]'''),
    }

    target_field_check = {}
    for field, template in FIELD_MAP.items():
        target_field_check[field] = template.replace('{lang}', target_lang)

    for i, line in enumerate(lines):
        new_lines.append(line)

        for field_name, pattern in source_patterns.items():
            match = pattern.search(line)
            if not match:
                continue

            indent = match.group(1)
            source_value = match.group(2)

            # Check if translation already exists nearby
            target_field = target_field_check.get(field_name, f'{target_lang}_{field_name}')

            # Look ahead a few lines to see if already injected
            already_exists = False
            for lookahead in range(1, 5):
                if i + lookahead < len(lines):
                    if target_field in lines[i + lookahead]:
                        already_exists = True
                        break
            # Also look behind
            for lookbehind in range(1, 3):
                if i - lookbehind >= 0:
                    if target_field in lines[i - lookbehind]:
                        already_exists = True
                        break

            if already_exists:
                skipped += 1
                continue

            # Find translation
            if source_value in trans_lookup:
                trans_list = trans_lookup[source_value]
                # Use first matching translation
                for trans in trans_list:
                    if trans['field'] == field_name:
                        translated = trans['translated']
                        injection = build_injection_line(
                            field_name, target_lang, translated, indent
                        )

                        # Add comma to current line if needed
                        stripped = line.rstrip()
                        if stripped and not stripped.endswith(',') and not stripped.endswith('{'):
                            new_lines[-1] = line.rstrip() + ','

                        # Inject the translated field with a trailing comma
                        new_lines.append(injection + ',')
                        injections += 1
                        break

    if dry_run:
        return injections, skipped

    if injections > 0:
        # Create backup
        backup_path = filepath.with_suffix('.js.bak')
        if not backup_path.exists():
            shutil.copy2(filepath, backup_path)
            print(f"   💾 Backup: {backup_path.name}")

        # Write modified file
        filepath.write_text('\n'.join(new_lines), encoding='utf-8')

    return injections, skipped


def inject_unit(unit, target_lang, dry_run=False):
    """Inject translations for one unit."""
    print(f"\n💉 Injecting Unit {unit} → {target_lang}")

    data = load_translations(unit, target_lang)
    translations = data['strings']
    filepath = find_vocab_file(unit)

    injections, skipped = inject_into_file(
        filepath, translations, target_lang, dry_run
    )

    if dry_run:
        print(f"   🔍 DRY RUN: Would inject {injections} fields ({skipped} already exist)")
    else:
        print(f"   ✅ Injected {injections} fields ({skipped} already existed)")

    return injections


def main():
    parser = argparse.ArgumentParser(
        description='Inject translated fields into vocab card JS files'
    )
    parser.add_argument('--unit', '-u', type=str, default=None,
                        help='Unit number (e.g. 02)')
    parser.add_argument('--all', '-a', action='store_true',
                        help='Inject all available translations')
    parser.add_argument('--target', '-t', type=str, required=True,
                        help='Target language code (ar, zh, id, ru)')
    parser.add_argument('--dry-run', action='store_true',
                        help='Preview injections without modifying files')
    args = parser.parse_args()

    if args.all:
        trans_files = sorted(TRANSLATIONS_DIR.glob(f'unit_*_{args.target}.json'))
        if not trans_files:
            print(f"❌ No translation files found for '{args.target}'")
            return
        total = 0
        for f in trans_files:
            unit = f.stem.split('_')[1]
            total += inject_unit(unit, args.target, args.dry_run)
        print(f"\n{'='*60}")
        print(f"🎯 Total: {total} fields injected across {len(trans_files)} files")
    elif args.unit:
        inject_unit(args.unit, args.target, args.dry_run)
    else:
        print("❌ Specify --unit or --all")


if __name__ == '__main__':
    main()
