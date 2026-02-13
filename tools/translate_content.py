#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
  TRANSLATE CONTENT — Vocab Card Translation Pipeline (Step 2)
═══════════════════════════════════════════════════════════════

Takes extracted JSON from Step 1 and translates all Uzbek strings
to the target language using OpenAI (GPT-4o-mini) or Anthropic (Claude).

Usage:
  python tools/translate_content.py --unit 02 --target ar
  python tools/translate_content.py --unit 02 --target ar --provider anthropic
  python tools/translate_content.py --all --target ar

Prerequisites:
  pip install openai anthropic
  Set environment variable: OPENAI_API_KEY or ANTHROPIC_API_KEY

Output:
  tools/translations/unit_02_ar.json

Cost estimate: ~$0.50-2.00 per unit with GPT-4o-mini
"""

import os
import json
import time
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXTRACTS_DIR = ROOT / 'tools' / 'extracts'
TRANSLATIONS_DIR = ROOT / 'tools' / 'translations'

# ── Language metadata ──
LANGUAGE_META = {
    'ar': {
        'name': 'Arabic',
        'native': 'العربية',
        'direction': 'rtl',
        'system_prompt': (
            'You are a professional translator for a language learning app. '
            'Translate Uzbek text to Modern Standard Arabic (فصحى). '
            'The app teaches English to Uzbek speakers. When a string contains '
            'instructions or explanations about English grammar, translate the '
            'Uzbek explanation parts to Arabic but keep English examples intact. '
            'For example, if the Uzbek says \'Men\' = "I", the Arabic should say \'أنا\' = "I". '
            'Keep emoji, HTML tags, and {placeholder} tokens unchanged. '
            'Preserve the instructional tone — clear, encouraging, for A1-A2 learners.'
        ),
    },
    'zh': {
        'name': 'Chinese (Simplified)',
        'native': '简体中文',
        'direction': 'ltr',
        'system_prompt': (
            'You are a professional translator for a language learning app. '
            'Translate Uzbek text to Simplified Chinese (简体中文). '
            'The app teaches English to Uzbek speakers. The Chinese version is for '
            'Chinese-speaking learners. Keep English examples, emoji, HTML tags, '
            'and {placeholder} tokens unchanged. Use simple Chinese for A1-A2 level.'
        ),
    },
    'id': {
        'name': 'Indonesian',
        'native': 'Bahasa Indonesia',
        'direction': 'ltr',
        'system_prompt': (
            'You are a professional translator for a language learning app. '
            'Translate Uzbek text to Bahasa Indonesia. '
            'The app teaches English — translate Uzbek explanations to Indonesian '
            'but keep English examples intact. Keep emoji, HTML tags, and '
            '{placeholder} tokens unchanged.'
        ),
    },
    'ru': {
        'name': 'Russian',
        'native': 'Русский',
        'direction': 'ltr',
        'system_prompt': (
            'You are a professional translator for a language learning app. '
            'Translate Uzbek text to Russian. '
            'The app teaches English — translate Uzbek explanations to Russian '
            'but keep English examples intact. Keep emoji, HTML tags, and '
            '{placeholder} tokens unchanged.'
        ),
    },
}

# ── Batch size for API calls ──
BATCH_SIZE = 25  # Strings per API call (balances cost vs context)


def load_extract(unit):
    """Load extracted strings JSON for a unit."""
    path = EXTRACTS_DIR / f'unit_{unit}.json'
    if not path.exists():
        raise FileNotFoundError(
            f"Extract not found: {path}\n"
            f"Run: python tools/extract_strings.py --unit {unit}"
        )
    return json.loads(path.read_text(encoding='utf-8'))


def translate_batch_openai(strings, target_lang, system_prompt):
    """Translate a batch of strings using OpenAI API."""
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError("Install openai: pip install openai")

    client = OpenAI()

    # Build the user prompt with numbered strings
    numbered = '\n'.join(
        f'{i+1}. {s["value"]}' for i, s in enumerate(strings)
    )

    user_prompt = (
        f'Translate these {len(strings)} Uzbek strings to {LANGUAGE_META[target_lang]["name"]}. '
        f'Return ONLY a JSON array of translated strings in the same order.\n'
        f'Do NOT include the numbers, just the translations in order.\n'
        f'Keep all English words, emoji, **bold**, {{placeholders}} unchanged.\n\n'
        f'Strings:\n{numbered}\n\n'
        f'Return format: ["translation1", "translation2", ...]'
    )

    response = client.chat.completions.create(
        model='gpt-4o-mini',
        messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_prompt},
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )

    raw = response.choices[0].message.content.strip()
    result = json.loads(raw)

    # Handle various response shapes
    if isinstance(result, list):
        return result
    if isinstance(result, dict):
        # Try common keys
        for key in ('translations', 'result', 'data', 'strings'):
            if key in result and isinstance(result[key], list):
                return result[key]
        # If dict values are the translations
        values = list(result.values())
        if len(values) == len(strings):
            return values

    raise ValueError(f"Unexpected API response shape: {type(result)}")


def translate_batch_anthropic(strings, target_lang, system_prompt):
    """Translate a batch of strings using Anthropic Claude API."""
    try:
        import anthropic
    except ImportError:
        raise ImportError("Install anthropic: pip install anthropic")

    client = anthropic.Anthropic()

    numbered = '\n'.join(
        f'{i+1}. {s["value"]}' for i, s in enumerate(strings)
    )

    user_prompt = (
        f'Translate these {len(strings)} Uzbek strings to {LANGUAGE_META[target_lang]["name"]}. '
        f'Return ONLY a JSON array of translated strings in the same order.\n'
        f'Do NOT include the numbers, just the translations in order.\n'
        f'Keep all English words, emoji, **bold**, {{placeholders}} unchanged.\n\n'
        f'Strings:\n{numbered}\n\n'
        f'Return format: ["translation1", "translation2", ...]'
    )

    message = client.messages.create(
        model='claude-sonnet-4-20250514',
        max_tokens=4096,
        system=system_prompt,
        messages=[{'role': 'user', 'content': user_prompt}],
    )

    raw = message.content[0].text.strip()
    # Claude may wrap in ```json ... ```
    if raw.startswith('```'):
        raw = raw.split('\n', 1)[1].rsplit('```', 1)[0].strip()

    return json.loads(raw)


def translate_unit(unit, target_lang, provider='openai', dry_run=False):
    """Translate all strings for a unit to the target language."""
    extract = load_extract(unit)
    strings = extract['strings']
    meta = extract['meta']

    lang_info = LANGUAGE_META.get(target_lang)
    if not lang_info:
        raise ValueError(
            f"Unsupported target language: {target_lang}\n"
            f"Supported: {', '.join(LANGUAGE_META.keys())}"
        )

    print(f"\n🌍 Translating Unit {unit} → {lang_info['name']} ({lang_info['native']})")
    print(f"   📊 {len(strings)} strings, {len(strings) // BATCH_SIZE + 1} batches")

    if dry_run:
        print("   🔍 DRY RUN — no API calls")
        return None

    # Check for existing translations (resume support)
    output_file = TRANSLATIONS_DIR / f'unit_{unit}_{target_lang}.json'
    existing = {}
    if output_file.exists():
        existing_data = json.loads(output_file.read_text(encoding='utf-8'))
        existing = {s['id']: s for s in existing_data.get('strings', [])}
        print(f"   ♻️  Found {len(existing)} existing translations — will skip")

    # Filter out already-translated strings
    to_translate = [s for s in strings if s['id'] not in existing]
    if not to_translate:
        print("   ✅ All strings already translated!")
        return existing_data

    translate_fn = (
        translate_batch_openai if provider == 'openai'
        else translate_batch_anthropic
    )
    system_prompt = lang_info['system_prompt']

    translated_strings = list(existing.values())
    errors = []

    # Process in batches
    for batch_start in range(0, len(to_translate), BATCH_SIZE):
        batch = to_translate[batch_start:batch_start + BATCH_SIZE]
        batch_num = batch_start // BATCH_SIZE + 1
        total_batches = (len(to_translate) - 1) // BATCH_SIZE + 1

        print(f"   📦 Batch {batch_num}/{total_batches} ({len(batch)} strings)...", end=' ')

        try:
            translations = translate_fn(batch, target_lang, system_prompt)

            if len(translations) != len(batch):
                print(f"⚠️ Got {len(translations)}, expected {len(batch)}")
                # Pad or truncate
                while len(translations) < len(batch):
                    translations.append(batch[len(translations)]['value'])  # fallback to source

            for original, translated_text in zip(batch, translations):
                translated_strings.append({
                    'id': original['id'],
                    'field': original['field'],
                    'source': original['value'],
                    'translated': translated_text,
                    'context': original['context'],
                })

            print("✅")

        except Exception as e:
            print(f"❌ Error: {e}")
            errors.append({
                'batch': batch_num,
                'error': str(e),
                'strings': [s['id'] for s in batch],
            })

        # Rate limiting
        if batch_start + BATCH_SIZE < len(to_translate):
            time.sleep(1)

    # Save result
    result = {
        'meta': {
            'unit': unit,
            'source_file': meta['source_file'],
            'target_language': target_lang,
            'target_name': lang_info['name'],
            'total_strings': len(translated_strings),
            'errors': len(errors),
            'provider': provider,
            'version': '1.0.0',
        },
        'strings': translated_strings,
        'errors': errors if errors else None,
    }

    TRANSLATIONS_DIR.mkdir(parents=True, exist_ok=True)
    output_file.write_text(
        json.dumps(result, indent=2, ensure_ascii=False),
        encoding='utf-8'
    )

    print(f"\n   ✅ {len(translated_strings)} strings translated")
    if errors:
        print(f"   ⚠️  {len(errors)} batch errors (retry these batches)")
    print(f"   📄 Saved to: {output_file}")

    return result


def main():
    parser = argparse.ArgumentParser(
        description='Translate extracted Uzbek strings to target language via API'
    )
    parser.add_argument('--unit', '-u', type=str, default=None,
                        help='Unit number (e.g. 02)')
    parser.add_argument('--all', '-a', action='store_true',
                        help='Translate all available extracted units')
    parser.add_argument('--target', '-t', type=str, required=True,
                        help=f'Target language: {", ".join(LANGUAGE_META.keys())}')
    parser.add_argument('--provider', '-p', type=str, default='openai',
                        choices=['openai', 'anthropic'],
                        help='Translation API provider (default: openai)')
    parser.add_argument('--dry-run', action='store_true',
                        help='Show what would be translated without calling API')
    args = parser.parse_args()

    if args.all:
        extract_files = sorted(EXTRACTS_DIR.glob('unit_*.json'))
        if not extract_files:
            print("❌ No extract files found. Run extract_strings.py first.")
            return
        for f in extract_files:
            unit = f.stem.replace('unit_', '')
            translate_unit(unit, args.target, args.provider, args.dry_run)
    elif args.unit:
        translate_unit(args.unit, args.target, args.provider, args.dry_run)
    else:
        print("❌ Specify --unit or --all")


if __name__ == '__main__':
    main()
