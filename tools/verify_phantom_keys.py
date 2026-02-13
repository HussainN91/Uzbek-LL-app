"""Verify all i18n keys used in source code exist in locale files."""
import re, os

# Read all 3 locale files and extract keys
keys = {}
for lang in ['uz', 'en', 'ar']:
    path = f'src/i18n/locales/{lang}.js'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    found = re.findall(r"\s*'([^']+)'\s*:", content)
    keys[lang] = set(found)

uz_keys = keys['uz']
print(f"Total UZ keys: {len(uz_keys)}")

# Find all keys used in source files
used_keys = {}
for root, dirs, files in os.walk('src'):
    dirs[:] = [d for d in dirs if d not in ['i18n']]
    for fname in files:
        if not fname.endswith('.js'):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        for m in re.finditer(r"(?:uz|en|getUz|getEn|t)\(['\"]([^'\"]+)['\"]\)", content):
            key = m.group(1)
            if key not in uz_keys:
                if key not in used_keys:
                    used_keys[key] = []
                used_keys[key].append(fpath)

print(f"Phantom keys (used but not in locales): {len(used_keys)}")
for k, files in sorted(used_keys.items()):
    locs = ', '.join(set(os.path.basename(f) for f in files))
    print(f"  MISSING: '{k}'  <- {locs}")
