#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
  SCAN HARDCODED STRINGS — i18n Compliance Scanner
═══════════════════════════════════════════════════════════════

Scans JavaScript source files for hardcoded Uzbek (and English)
UI strings that should be using i18n keys via uz()/en() lookups.

Features:
  • Detects 6 code patterns where hardcoded strings appear
  • Uses Uzbek orthographic heuristics (o', g', q+vowel, suffixes)
  • Outputs a structured JSON report + console summary
  • Suggests i18n key names based on file/context
  • Can generate a diff-ready replacement plan

Usage:
  python tools/scan_hardcoded_strings.py                      # Scan all src/
  python tools/scan_hardcoded_strings.py --file src/tiles/done-tile.js
  python tools/scan_hardcoded_strings.py --report json        # JSON output
  python tools/scan_hardcoded_strings.py --severity high      # Only high-severity
  python tools/scan_hardcoded_strings.py --suggest-keys        # Generate key suggestions
  python tools/scan_hardcoded_strings.py --verify              # Verify current i18n coverage

Output:
  Console summary + optional tools/reports/hardcoded_strings.json
"""

import os
import re
import json
import argparse
from pathlib import Path
from collections import defaultdict

# ── Project Layout ──
ROOT = Path(__file__).resolve().parent.parent
SRC  = ROOT / "src"

# ═══════════════════════════════════════════════
# 1. UZBEK TEXT DETECTION HEURISTICS
# ═══════════════════════════════════════════════

# High-confidence Uzbek orthographic markers
UZ_APOSTROPHE  = re.compile(r"[oOgG]['\u2018\u2019\u02BC]")              # o', g'
UZ_Q_VOWEL     = re.compile(r"q[aeiou]", re.IGNORECASE)                   # qa, qi, qo (no qu rule)
UZ_SUFFIXES    = re.compile(r"(?:lash|larni|ning\b|shir|shing|ting\b|ying\b|mang\b|lang\b)", re.IGNORECASE)
UZ_COMMON_WORDS = re.compile(
    r"\b(?:va|uchun|bilan|yoki|kerak|bosing|qiling|tanlang|davom|keyingi|"
    r"qaytish|tekshirish|tugallash|mashq|bosqich|kamida|oldin|yakunlang|"
    r"darsdan|so\'zlar|gapni|tinglang|yozing|eshiting|birlik|topshiriq)\b",
    re.IGNORECASE
)

# False positive exclusions
EXCLUDE_PATTERNS = [
    re.compile(r"^[\s\d\W]+$"),                          # Only digits/symbols/whitespace
    re.compile(r"^[#.@\[\]{}()\w-]+$"),                  # CSS selectors / identifiers
    re.compile(r"^\s*//"),                                # Comments
    re.compile(r"^\s*\*"),                                # JSDoc
    re.compile(r"console\.(log|warn|error|debug)"),       # Console statements
    re.compile(r"^\s*import\s"),                          # Import statements
    re.compile(r"^\s*export\s"),                          # Export statements
    re.compile(r"data-translation"),                      # Already has translation attr
    re.compile(r"\buz\s*\("),                             # Already using uz()
    re.compile(r"\ben\s*\("),                             # Already using en()
    re.compile(r"\bgetUz\s*\("),                          # Already using getUz()
    re.compile(r"\bgetEn\s*\("),                          # Already using getEn()
    re.compile(r"\.className\s*="),                       # CSS class assignments
    re.compile(r"\.style\.\w+\s*="),                      # Style assignments
    re.compile(r"\.setAttribute\s*\(\s*['\"]style"),      # Style attributes
]

# Known English-only strings to skip
ENGLISH_SKIP = {
    "Check", "Next", "Back", "Continue", "Skip", "Done", "Play", "Stop",
    "Submit", "Close", "Confirm", "Review", "Restart", "none", "block",
    "flex", "grid", "inline", "absolute", "relative", "fixed",
}

# ═══════════════════════════════════════════════
# 2. CODE PATTERN MATCHERS
# ═══════════════════════════════════════════════

class PatternMatch:
    """Represents a detected hardcoded string."""
    __slots__ = ('file', 'line', 'pattern_type', 'raw_string', 'context_line',
                 'severity', 'suggested_key', 'has_translation_attr')

    def __init__(self, file, line, pattern_type, raw_string, context_line,
                 severity='medium', suggested_key=None, has_translation_attr=False):
        self.file = file
        self.line = line
        self.pattern_type = pattern_type
        self.raw_string = raw_string
        self.context_line = context_line
        self.severity = severity
        self.suggested_key = suggested_key
        self.has_translation_attr = has_translation_attr

    def to_dict(self):
        return {
            'file': str(self.file),
            'line': self.line,
            'type': self.pattern_type,
            'string': self.raw_string,
            'severity': self.severity,
            'suggested_key': self.suggested_key,
            'has_translation': self.has_translation_attr,
        }


# String extraction regexes for each pattern type
PATTERNS = {
    # Pattern A: .textContent = "..." or .innerText = "..."
    'textContent': re.compile(
        r'\.(textContent|innerText)\s*=\s*(?:'
        r'"((?:[^"\\]|\\.)*)"|'
        r"'((?:[^'\\]|\\.)*)'|"
        r'`((?:[^`\\]|\\.)*)`'
        r')'
    ),

    # Pattern B: createButton("...", ...)
    'createButton': re.compile(
        r'createButton\s*\(\s*(?:'
        r'"((?:[^"\\]|\\.)*)"|'
        r"'((?:[^'\\]|\\.)*)'|"
        r'`((?:[^`\\]|\\.)*)`'
        r')'
    ),

    # Pattern C: .placeholder = "..."
    'placeholder': re.compile(
        r'\.placeholder\s*=\s*(?:'
        r'"((?:[^"\\]|\\.)*)"|'
        r"'((?:[^'\\]|\\.)*)'|"
        r'`((?:[^`\\]|\\.)*)`'
        r')'
    ),

    # Pattern D: .title = "..." (attribute, not CSS)
    'titleAttr': re.compile(
        r'\.title\s*=\s*(?:'
        r'"((?:[^"\\]|\\.)*)"|'
        r"'((?:[^'\\]|\\.)*)'|"
        r'`((?:[^`\\]|\\.)*)`'
        r')'
    ),

    # Pattern E: .innerHTML = "..." with Uzbek text
    'innerHTML': re.compile(
        r'\.innerHTML\s*=\s*(?:'
        r'"((?:[^"\\]|\\.)*)"|'
        r"'((?:[^'\\]|\\.)*)'|"
        r'`((?:[^`\\]|\\.)*)`'
        r')'
    ),

    # Pattern F: Object fields — nameUz, descUz, titleUz, labelUz, etc.
    'dataField': re.compile(
        r'(?:nameUz|descUz|titleUz|subtitleUz|contentUz|labelUz|'
        r'meta_uz|prompt_uz|feedback_uz|uz_instruction)\s*:\s*(?:'
        r'"((?:[^"\\]|\\.)*)"|'
        r"'((?:[^'\\]|\\.)*)'|"
        r'`((?:[^`\\]|\\.)*)`'
        r')'
    ),

    # Pattern G: alert("...") with hardcoded text
    'alert': re.compile(
        r'alert\s*\(\s*(?:'
        r'"((?:[^"\\]|\\.)*)"|'
        r"'((?:[^'\\]|\\.)*)'|"
        r'`((?:[^`\\]|\\.)*)`'
        r')'
    ),
}

# ═══════════════════════════════════════════════
# 3. UZBEK TEXT SCORING
# ═══════════════════════════════════════════════

def uzbek_score(text):
    """
    Score how likely a string is to contain Uzbek text.
    Returns (score, reasons) where score >= 2 = high confidence.
    """
    if not text or len(text.strip()) < 3:
        return 0, []

    score = 0
    reasons = []

    # Check apostrophe letters (strongest signal)
    if UZ_APOSTROPHE.search(text):
        score += 3
        reasons.append("apostrophe_vowel")

    # Check q+vowel pattern
    q_matches = UZ_Q_VOWEL.findall(text)
    if q_matches:
        score += 2
        reasons.append(f"q_vowel({len(q_matches)})")

    # Check Uzbek suffixes
    suffix_matches = UZ_SUFFIXES.findall(text)
    if suffix_matches:
        score += 2
        reasons.append(f"uz_suffix({len(suffix_matches)})")

    # Check common Uzbek words
    word_matches = UZ_COMMON_WORDS.findall(text)
    if word_matches:
        score += min(len(word_matches), 3)
        reasons.append(f"uz_words({len(word_matches)})")

    return score, reasons


def is_likely_uzbek(text):
    """Quick boolean check — score >= 2 means likely Uzbek."""
    score, _ = uzbek_score(text)
    return score >= 2


def classify_severity(text, pattern_type, score):
    """
    Classify severity based on context:
      high   — user-facing UI text (buttons, labels, feedback)
      medium — secondary UI (tooltips, placeholders, gate messages)
      low    — data fields, fallbacks, debug text
    """
    if pattern_type in ('createButton', 'alert'):
        return 'high'
    if pattern_type == 'textContent' and score >= 3:
        return 'high'
    if pattern_type in ('placeholder', 'titleAttr'):
        return 'medium'
    if pattern_type == 'dataField':
        return 'low'
    if score >= 4:
        return 'high'
    if score >= 2:
        return 'medium'
    return 'low'


# ═══════════════════════════════════════════════
# 4. KEY SUGGESTION ENGINE
# ═══════════════════════════════════════════════

# Map file names/paths to i18n namespace prefixes
NAMESPACE_MAP = {
    'controlled-tile':      'controlled',
    'done-tile':            'done',
    'writing-tile':         'writing',
    'listen-write-tile':    'listenWrite',
    'function-tile':        'function',
    'unit-error-tile':      'unitError',
    'mistake-tile':         'mistake',
    'pattern-tile':         'pattern',
    'grand-tile':           'grand',
    'intro-tile':           'intro',
    'transformation-tile':  'transformation',
    'vocab-tile':           'vocabTile',
    'dialogue-tile':        'dialogue',
    'dialogue-practice':    'dialoguePractice',
    'mission-briefing':     'missionBriefing',
    'xp-display':           'xpDisplay',
    'activity-context':     'activityCard',
    'instruction-banner':   'instructionBanner',
    'ui-builders':          'uiBuilders',
    'helpers':              'helpers',
    'app-main':             'app',
    'ui-redesign':          'uiRedesign',
    'vocab-card-renderer':  'vcr',
    'badge-catalog':        'badges',
    'grammar-ppp':          'grammarPPP',
    'pos-speed-game':       'posGame',
    'navigation':           'nav',
    'scoring':              'scoring',
}


def suggest_key(filepath, raw_string, pattern_type):
    """Generate a suggested i18n key based on file and string content."""
    stem = Path(filepath).stem
    
    # Find matching namespace
    namespace = None
    for pattern, ns in NAMESPACE_MAP.items():
        if pattern in stem:
            namespace = ns
            break
    
    if not namespace:
        namespace = stem.replace('-', '_').replace('.', '_')

    # Generate a concise key suffix from the string
    # Take the first 3-4 meaningful words
    clean = re.sub(r'[^\w\s]', '', raw_string)
    words = clean.split()[:4]
    
    if not words:
        return f"{namespace}.text"
    
    # camelCase the words
    suffix = words[0].lower()
    for w in words[1:]:
        suffix += w.capitalize()
    
    # Limit length
    suffix = suffix[:30]
    
    return f"{namespace}.{suffix}"


# ═══════════════════════════════════════════════
# 5. FILE SCANNER
# ═══════════════════════════════════════════════

def should_skip_line(line):
    """Check if a line should be excluded from scanning."""
    stripped = line.strip()
    if not stripped:
        return True
    for pat in EXCLUDE_PATTERNS:
        if pat.search(stripped):
            return True
    return False


def scan_file(filepath):
    """Scan a single JS file for hardcoded strings."""
    matches = []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except (UnicodeDecodeError, IOError):
        return matches

    for line_num, line in enumerate(lines, 1):
        # Skip excluded lines
        if should_skip_line(line):
            continue
        
        # Check if line already uses i18n
        if re.search(r"\buz\s*\(|\ben\s*\(|\bgetUz\s*\(|\bgetEn\s*\(|\bt\s*\(", line):
            # Line already has i18n calls — but might also have hardcoded parts
            # Only flag if there's ALSO a hardcoded Uzbek string
            pass

        for pattern_name, regex in PATTERNS.items():
            for m in regex.finditer(line):
                # Extract the matched string from whichever group captured
                raw = None
                for g in range(1, len(m.groups()) + 1):
                    if m.group(g):
                        raw = m.group(g)
                        break
                if not raw:
                    raw = ''
                
                if not raw or len(raw.strip()) < 3:
                    continue
                
                # Skip known English-only words
                if raw.strip() in ENGLISH_SKIP:
                    continue
                
                # Score for Uzbek content
                score, reasons = uzbek_score(raw)
                
                # Only report if it looks Uzbek (score >= 2)
                if score < 2:
                    continue
                
                # Check if the next few lines have data-translation
                has_translation = False
                for check_line in lines[line_num:min(line_num + 3, len(lines))]:
                    if 'data-translation' in check_line or 'dataset.translation' in check_line:
                        has_translation = True
                        break
                
                severity = classify_severity(raw, pattern_name, score)
                suggested = suggest_key(filepath, raw, pattern_name)

                matches.append(PatternMatch(
                    file=str(Path(filepath).relative_to(ROOT)),
                    line=line_num,
                    pattern_type=pattern_name,
                    raw_string=raw,
                    context_line=line.rstrip(),
                    severity=severity,
                    suggested_key=suggested,
                    has_translation_attr=has_translation,
                ))

    return matches


def scan_directory(directory, file_filter=None):
    """Scan all JS files in a directory tree."""
    all_matches = []
    files_scanned = 0
    
    for root, dirs, files in os.walk(directory):
        # Skip node_modules, __pycache__, etc.
        dirs[:] = [d for d in dirs if d not in ('node_modules', '__pycache__', '.git', 'dist', 'build')]
        
        for fname in sorted(files):
            if not fname.endswith('.js'):
                continue
            
            filepath = os.path.join(root, fname)
            
            if file_filter and file_filter not in filepath:
                continue
            
            # Skip locale files themselves and the i18n hub
            rel = os.path.relpath(filepath, ROOT)
            if 'i18n/locales' in rel or rel.endswith('i18n.js') or rel.endswith('i18n/index.js'):
                continue
            # Skip uz-instructions.js (structured data, different approach needed)
            if 'uz-instructions' in rel:
                continue
            
            file_matches = scan_file(filepath)
            all_matches.extend(file_matches)
            files_scanned += 1
    
    return all_matches, files_scanned


# ═══════════════════════════════════════════════
# 6. I18N COVERAGE VERIFIER
# ═══════════════════════════════════════════════

def load_locale_keys(locale_file):
    """Load all keys from a locale file."""
    keys = set()
    try:
        with open(locale_file, encoding='utf-8') as f:
            text = f.read()
        for m in re.finditer(r"'([a-zA-Z][a-zA-Z0-9_.]+)':", text):
            keys.add(m.group(1))
    except FileNotFoundError:
        pass
    return keys


def verify_coverage():
    """Check that all 3 locale files have matching key sets."""
    locales_dir = SRC / 'i18n' / 'locales'
    
    uz_keys = load_locale_keys(locales_dir / 'uz.js')
    en_keys = load_locale_keys(locales_dir / 'en.js')
    ar_keys = load_locale_keys(locales_dir / 'ar.js')
    
    all_good = True
    
    print(f"\n{'═'*60}")
    print(f"  i18n COVERAGE VERIFICATION")
    print(f"{'═'*60}")
    print(f"  UZ keys: {len(uz_keys)}")
    print(f"  EN keys: {len(en_keys)}")
    print(f"  AR keys: {len(ar_keys)}")
    
    # Cross-check
    uz_only = uz_keys - en_keys
    en_only = en_keys - uz_keys
    ar_missing = uz_keys - ar_keys
    ar_extra = ar_keys - uz_keys
    
    if uz_only:
        print(f"\n  ⚠️  Keys in UZ but not EN: {sorted(uz_only)}")
        all_good = False
    if en_only:
        print(f"\n  ⚠️  Keys in EN but not UZ: {sorted(en_only)}")
        all_good = False
    if ar_missing:
        print(f"\n  ⚠️  Keys in UZ but not AR: {sorted(ar_missing)}")
        all_good = False
    if ar_extra:
        print(f"\n  ⚠️  Keys in AR but not UZ: {sorted(ar_extra)}")
        all_good = False
    
    if all_good:
        print(f"\n  ✅ All 3 locales have identical key sets ({len(uz_keys)} keys)")
    
    return all_good


# ═══════════════════════════════════════════════
# 7. REPORT GENERATORS
# ═══════════════════════════════════════════════

def print_console_report(matches, files_scanned):
    """Pretty-print results to console."""
    print(f"\n{'═'*60}")
    print(f"  HARDCODED STRING SCAN RESULTS")
    print(f"{'═'*60}")
    print(f"  Files scanned:  {files_scanned}")
    print(f"  Strings found:  {len(matches)}")
    
    # Count by severity
    by_severity = defaultdict(list)
    for m in matches:
        by_severity[m.severity].append(m)
    
    for sev in ('high', 'medium', 'low'):
        count = len(by_severity[sev])
        icon = {'high': '🔴', 'medium': '🟡', 'low': '🟢'}[sev]
        print(f"  {icon} {sev.upper():8s}: {count}")
    
    # Group by file
    by_file = defaultdict(list)
    for m in matches:
        by_file[m.file].append(m)
    
    print(f"\n{'─'*60}")
    print(f"  DETAILS BY FILE")
    print(f"{'─'*60}")
    
    for filepath in sorted(by_file.keys()):
        file_matches = by_file[filepath]
        high = sum(1 for m in file_matches if m.severity == 'high')
        med  = sum(1 for m in file_matches if m.severity == 'medium')
        low  = sum(1 for m in file_matches if m.severity == 'low')
        
        print(f"\n  📄 {filepath}  ({len(file_matches)} strings: {high}H/{med}M/{low}L)")
        
        for m in file_matches:
            icon = {'high': '🔴', 'medium': '🟡', 'low': '🟢'}[m.severity]
            # Truncate long strings
            display = m.raw_string[:60] + ('...' if len(m.raw_string) > 60 else '')
            trans = " [has data-translation]" if m.has_translation_attr else ""
            print(f"    {icon} L{m.line:4d} [{m.pattern_type:13s}] \"{display}\"{trans}")
            if m.suggested_key:
                print(f"         → suggested key: {m.suggested_key}")


def save_json_report(matches, output_path):
    """Save structured JSON report."""
    report = {
        'meta': {
            'total_strings': len(matches),
            'by_severity': {
                'high': sum(1 for m in matches if m.severity == 'high'),
                'medium': sum(1 for m in matches if m.severity == 'medium'),
                'low': sum(1 for m in matches if m.severity == 'low'),
            },
            'by_pattern': {},
            'by_file': {},
        },
        'strings': [m.to_dict() for m in matches],
    }
    
    # Aggregate counts
    for m in matches:
        report['meta']['by_pattern'][m.pattern_type] = \
            report['meta']['by_pattern'].get(m.pattern_type, 0) + 1
        report['meta']['by_file'][m.file] = \
            report['meta']['by_file'].get(m.file, 0) + 1
    
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n  📝 JSON report saved to: {output_path}")


def print_key_suggestions(matches):
    """Print a ready-to-paste block of i18n key suggestions."""
    print(f"\n{'═'*60}")
    print(f"  SUGGESTED i18n KEYS")
    print(f"{'═'*60}")
    
    by_namespace = defaultdict(list)
    for m in matches:
        if m.suggested_key:
            ns = m.suggested_key.split('.')[0]
            by_namespace[ns].append(m)
    
    for ns in sorted(by_namespace.keys()):
        print(f"\n  // ── {ns} ──")
        seen_keys = set()
        for m in by_namespace[ns]:
            if m.suggested_key in seen_keys:
                continue
            seen_keys.add(m.suggested_key)
            # Escape single quotes for JS
            escaped = m.raw_string.replace("'", "\\'")
            print(f"  '{m.suggested_key}': '{escaped}',")


# ═══════════════════════════════════════════════
# 8. MAIN
# ═══════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description='Scan JS source files for hardcoded Uzbek UI strings'
    )
    parser.add_argument('--file', '-f', type=str, default=None,
                        help='Scan a specific file (relative or absolute path)')
    parser.add_argument('--dir', '-d', type=str, default=str(SRC),
                        help=f'Directory to scan (default: {SRC})')
    parser.add_argument('--report', '-r', choices=['console', 'json', 'both'],
                        default='console', help='Report format')
    parser.add_argument('--output', '-o', type=str,
                        default=str(ROOT / 'tools' / 'reports' / 'hardcoded_strings.json'),
                        help='JSON output path')
    parser.add_argument('--severity', '-s', choices=['high', 'medium', 'low', 'all'],
                        default='all', help='Filter by minimum severity')
    parser.add_argument('--suggest-keys', action='store_true',
                        help='Print suggested i18n key names')
    parser.add_argument('--verify', action='store_true',
                        help='Verify locale file coverage consistency')
    
    args = parser.parse_args()
    
    # Verify mode
    if args.verify:
        verify_coverage()
        # Also scan
        matches, files_scanned = scan_directory(args.dir, args.file)
        if matches:
            print(f"\n  ⚠️  {len(matches)} hardcoded strings still found!")
        else:
            print(f"\n  ✅ No hardcoded Uzbek strings detected!")
        return
    
    # Scan
    print(f"  Scanning: {args.dir}" + (f" (filter: {args.file})" if args.file else ""))
    matches, files_scanned = scan_directory(args.dir, args.file)
    
    # Filter by severity
    if args.severity != 'all':
        severity_order = {'high': 3, 'medium': 2, 'low': 1}
        min_sev = severity_order[args.severity]
        matches = [m for m in matches if severity_order[m.severity] >= min_sev]
    
    # Output
    if args.report in ('console', 'both'):
        print_console_report(matches, files_scanned)
    
    if args.report in ('json', 'both'):
        save_json_report(matches, args.output)
    
    if args.suggest_keys:
        print_key_suggestions(matches)
    
    # Exit code: 1 if high-severity issues found
    high_count = sum(1 for m in matches if m.severity == 'high')
    if high_count > 0:
        print(f"\n  ⚠️  {high_count} HIGH severity strings need i18n keys!")
        return 1
    
    return 0


if __name__ == '__main__':
    exit(main() or 0)
