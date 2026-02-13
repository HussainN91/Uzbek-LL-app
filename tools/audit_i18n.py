#!/usr/bin/env python3
"""Deep audit: compare old i18n.js dictionaries vs new locale files."""
import re
import subprocess
import sys

def extract_keys_and_values(text, dict_name):
    """Extract key→value pairs from a JS const dict block."""
    # Match: const XX = { ... };  (greedy within the block)
    # Use a smarter approach: find the start, then brace-match
    start_pattern = rf'const {dict_name} = \{{'
    m = re.search(start_pattern, text)
    if not m:
        return {}
    
    # Find matching closing brace
    start = m.end()
    depth = 1
    i = start
    while i < len(text) and depth > 0:
        if text[i] == '{':
            depth += 1
        elif text[i] == '}':
            depth -= 1
        i += 1
    
    block = text[start:i-1]
    
    # Extract 'key': 'value' pairs
    pairs = {}
    for match in re.finditer(r"'([^']+)'\s*:\s*'((?:[^'\\]|\\.)*)'", block):
        pairs[match.group(1)] = match.group(2)
    # Also match "key": "value" (double quotes)
    for match in re.finditer(r"'([^']+)'\s*:\s*\"((?:[^\"\\]|\\.)*)\"", block):
        if match.group(1) not in pairs:
            pairs[match.group(1)] = match.group(2)
    
    return pairs

def extract_from_locale_file(path):
    """Extract key→value pairs from a new locale file."""
    with open(path, encoding='utf-8') as f:
        text = f.read()
    
    pairs = {}
    for match in re.finditer(r"'([^']+)'\s*:\s*'((?:[^'\\]|\\.)*)'", text):
        pairs[match.group(1)] = match.group(2)
    for match in re.finditer(r"'([^']+)'\s*:\s*\"((?:[^\"\\]|\\.)*)\"", text):
        if match.group(1) not in pairs:
            pairs[match.group(1)] = match.group(2)
    
    return pairs

def main():
    # Get old i18n.js from git
    try:
        old = subprocess.check_output(
            ['git', 'show', 'a13ba8c:src/core/i18n.js'],
            text=True, encoding='utf-8'
        )
    except subprocess.CalledProcessError:
        print("ERROR: Cannot retrieve old i18n.js from git")
        sys.exit(1)
    
    old_uz = extract_keys_and_values(old, 'UZ')
    old_en = extract_keys_and_values(old, 'EN')
    old_ar = extract_keys_and_values(old, 'AR')
    
    new_uz = extract_from_locale_file('src/i18n/locales/uz.js')
    new_en = extract_from_locale_file('src/i18n/locales/en.js')
    new_ar = extract_from_locale_file('src/i18n/locales/ar.js')
    
    total_issues = 0
    
    for name, old_dict, new_dict in [
        ('UZ', old_uz, new_uz),
        ('EN', old_en, new_en),
        ('AR', old_ar, new_ar),
    ]:
        print(f"\n{'='*60}")
        print(f"  {name} COMPARISON")
        print(f"{'='*60}")
        print(f"  Old keys: {len(old_dict)}, New keys: {len(new_dict)}")
        
        old_keys = set(old_dict.keys())
        new_keys = set(new_dict.keys())
        
        missing = old_keys - new_keys
        extra = new_keys - old_keys
        
        if missing:
            print(f"\n  ❌ MISSING from new {name.lower()}.js ({len(missing)} keys):")
            for k in sorted(missing):
                print(f"     '{k}': '{old_dict[k]}'")
            total_issues += len(missing)
        
        if extra:
            print(f"\n  ➕ EXTRA in new {name.lower()}.js ({len(extra)} keys):")
            for k in sorted(extra):
                print(f"     '{k}': '{new_dict[k]}'")
        
        # Value comparison for shared keys
        shared = old_keys & new_keys
        value_mismatches = []
        for k in sorted(shared):
            if old_dict[k] != new_dict[k]:
                value_mismatches.append(k)
        
        if value_mismatches:
            print(f"\n  ⚠️  VALUE MISMATCHES ({len(value_mismatches)} keys):")
            for k in value_mismatches[:20]:
                print(f"     '{k}':")
                print(f"       OLD: '{old_dict[k]}'")
                print(f"       NEW: '{new_dict[k]}'")
            if len(value_mismatches) > 20:
                print(f"     ... and {len(value_mismatches) - 20} more")
            total_issues += len(value_mismatches)
        
        if not missing and not extra and not value_mismatches:
            print(f"\n  ✅ PERFECT MATCH — all {len(shared)} keys identical")
    
    # Cross-check consistency
    print(f"\n{'='*60}")
    print(f"  CROSS-CHECK: Key consistency")
    print(f"{'='*60}")
    all_new_keys = set(new_uz.keys()) | set(new_en.keys()) | set(new_ar.keys())
    for name, d in [('uz', new_uz), ('en', new_en), ('ar', new_ar)]:
        missing_cross = all_new_keys - set(d.keys())
        if missing_cross:
            print(f"  ⚠️  {name}.js missing {len(missing_cross)} keys present in others:")
            for k in sorted(missing_cross):
                print(f"     '{k}'")
            total_issues += len(missing_cross)
    
    if set(new_uz.keys()) == set(new_en.keys()) == set(new_ar.keys()):
        print(f"  ✅ All three locale files have identical key sets ({len(new_uz)} keys)")
    
    # Check the shim file
    print(f"\n{'='*60}")
    print(f"  SHIM CHECK: src/core/i18n.js")
    print(f"{'='*60}")
    with open('src/core/i18n.js', encoding='utf-8') as f:
        shim = f.read()
    
    # Should NOT contain any dict definitions
    if 'const UZ' in shim or 'const EN' in shim or 'const AR' in shim:
        print("  ❌ SHIM STILL CONTAINS DICTIONARY DEFINITIONS!")
        total_issues += 1
    else:
        print("  ✅ No dictionary definitions in shim")
    
    if "from '../i18n/index.js'" in shim:
        print("  ✅ Re-exports from '../i18n/index.js'")
    else:
        print("  ❌ Missing re-export from '../i18n/index.js'")
        total_issues += 1
    
    # Check exported symbols
    required_exports = ['t', 'uz', 'en', 'uzEl', 'uzify', 'uzBtn', 'UZ', 'EN', 'AR']
    for sym in required_exports:
        if sym not in shim:
            print(f"  ❌ Missing export: {sym}")
            total_issues += 1
    
    if all(sym in shim for sym in required_exports):
        print(f"  ✅ All {len(required_exports)} required symbols exported")
    
    # Check index.js
    print(f"\n{'='*60}")
    print(f"  HUB CHECK: src/i18n/index.js")
    print(f"{'='*60}")
    with open('src/i18n/index.js', encoding='utf-8') as f:
        hub = f.read()
    
    required_imports = [
        "import UZ from './locales/uz.js'",
        "import EN from './locales/en.js'",
        "import AR from './locales/ar.js'",
        "import ZH from './locales/zh.js'",
        "import ID from './locales/id.js'",
        "import RU from './locales/ru.js'",
    ]
    for imp in required_imports:
        if imp in hub:
            print(f"  ✅ {imp}")
        else:
            print(f"  ❌ MISSING: {imp}")
            total_issues += 1
    
    required_functions = ['export function t(', 'export function uz(', 'export function en(',
                          'export function uzEl(', 'export function uzify(', 'export function uzBtn(']
    for fn in required_functions:
        if fn in hub:
            print(f"  ✅ {fn.strip()}")
        else:
            print(f"  ❌ MISSING: {fn.strip()}")
            total_issues += 1
    
    # Check backward compat
    if 'window.getUz = uz' in hub and 'window.getEn = en' in hub and 'window.i18n' in hub:
        print("  ✅ window.getUz, window.getEn, window.i18n backward compat")
    else:
        print("  ❌ Missing window backward compat")
        total_issues += 1
    
    # Check getCurrentLanguage import
    if "import { getCurrentLanguage }" in hub:
        print("  ✅ getCurrentLanguage imported")
    else:
        print("  ❌ Missing getCurrentLanguage import")
        total_issues += 1
    
    # Summary
    print(f"\n{'='*60}")
    if total_issues == 0:
        print(f"  🎉 AUDIT PASSED — Zero issues found!")
    else:
        print(f"  ⚠️  AUDIT FOUND {total_issues} ISSUE(S) — see above")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
