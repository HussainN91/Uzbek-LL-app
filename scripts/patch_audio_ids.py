"""
patch_audio_ids.py — Add audio_id + mastery_key to dialogue lines that are missing them
══════════════════════════════════════════════════════════════════════════════════════════
U01-U07 already have audio_id fields. This script patches U08, U09, U10.

Usage:
    python scripts/patch_audio_ids.py --dry-run     # preview changes
    python scripts/patch_audio_ids.py               # apply changes
    python scripts/patch_audio_ids.py --unit U08     # patch one unit only

Pattern: audio_id: "{dialogue_id}_L{line_index}"  (e.g., "U08_L01_D01_L0")
"""

import os
import re
import sys
import argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent


def patch_file(filepath: Path, dry_run: bool = False) -> dict:
    """Patch a single vocab_cards JS file to add audio_id to dialogue lines.
    
    Returns stats dict with counts.
    """
    content = filepath.read_text(encoding='utf-8')
    original = content
    
    stats = {"file": filepath.name, "patched": 0, "already_has": 0, "dialogues": 0}
    
    # Find all dialogue blocks and their lines
    # We need to find lines that have speaker/line/line_uz but NO audio_id
    
    # First, find which dialogue we're in by tracking dialogue IDs
    # Pattern: "UXX_LYY_DZZ": { ... lines: [ ... ] }
    
    current_dialogue_id = None
    line_counter = 0
    lines = content.split('\n')
    new_lines = []
    
    dialogue_id_pattern = re.compile(r'"(U\d+(?:_\d+)?_L\d+_D\d+)"\s*:\s*\{')
    lines_array_pattern = re.compile(r'lines\s*:\s*\[')
    speaker_line_pattern = re.compile(
        r'^(\s*\{\s*speaker\s*:\s*"[^"]+"\s*,\s*line\s*:\s*"[^"]*"\s*,\s*line_uz\s*:\s*"[^"]*")'
    )
    
    in_lines_block = False
    bracket_depth = 0
    
    for i, line in enumerate(lines):
        # Check for dialogue ID
        d_match = dialogue_id_pattern.search(line)
        if d_match:
            current_dialogue_id = d_match.group(1)
            line_counter = 0
            stats["dialogues"] += 1
        
        # Check for lines: [ start
        if lines_array_pattern.search(line):
            in_lines_block = True
            bracket_depth = 0
            line_counter = 0
        
        # Track bracket depth in lines block
        if in_lines_block:
            bracket_depth += line.count('[') - line.count(']')
            if bracket_depth <= 0:
                in_lines_block = False
        
        # Check if this line has speaker but no audio_id
        if in_lines_block and 'speaker:' in line and 'audio_id:' not in line and current_dialogue_id:
            audio_id = f"{current_dialogue_id}_L{line_counter}"
            
            # Also add mastery_key if missing
            mastery_key = f"{current_dialogue_id}_{line_counter}"
            
            # Find where to insert — before the closing }
            # The line ends with either }, or } (last line)
            additions = []
            if 'mastery_key:' not in line:
                additions.append(f'mastery_key: "{mastery_key}"')
            additions.append(f'audio_id: "{audio_id}"')
            
            insert_str = ', '.join(additions)
            
            # Insert before the closing } or },
            if line.rstrip().endswith('},'):
                line = line.rstrip()[:-2] + f', {insert_str}' + ' },'
            elif line.rstrip().endswith('}'):
                line = line.rstrip()[:-1] + f', {insert_str}' + ' }'
            else:
                # Shouldn't happen, but append anyway
                line = line.rstrip() + f', {insert_str}'
            
            stats["patched"] += 1
            line_counter += 1
        elif in_lines_block and 'speaker:' in line and 'audio_id:' in line:
            stats["already_has"] += 1
            line_counter += 1
        
        new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    
    if not dry_run and new_content != original:
        filepath.write_text(new_content, encoding='utf-8')
    
    return stats, new_content != original


def main():
    parser = argparse.ArgumentParser(description="Patch audio_id into dialogue lines")
    parser.add_argument("--dry-run", action="store_true", help="Preview without writing")
    parser.add_argument("--unit", type=str, default=None, help="Patch one unit only (e.g. U08)")
    args = parser.parse_args()
    
    print("🔧 Audio ID Patcher")
    print("=" * 60)
    if args.dry_run:
        print("  🔍 DRY RUN — no files will be modified\n")
    
    js_files = sorted(ROOT.glob("vocab_cards_u*_4act.js"))
    
    total_patched = 0
    total_already = 0
    files_changed = 0
    
    for js_file in js_files:
        # Filter by unit if specified
        if args.unit:
            unit_num = args.unit.lower().replace('u', '')
            if f'u{unit_num.zfill(2)}' not in js_file.name and f'u{unit_num}' not in js_file.name:
                continue
        
        stats, changed = patch_file(js_file, args.dry_run)
        
        if stats["patched"] > 0 or stats["already_has"] > 0:
            status = "✏️ PATCHED" if changed else "✅ OK"
            print(f"  {status} {stats['file']}: {stats['dialogues']} dialogues, "
                  f"{stats['patched']} lines patched, {stats['already_has']} already had audio_id")
        
        total_patched += stats["patched"]
        total_already += stats["already_has"]
        if changed:
            files_changed += 1
    
    print(f"\n{'='*60}")
    print(f"📊 Summary:")
    print(f"   Lines patched:     {total_patched}")
    print(f"   Already had id:    {total_already}")
    print(f"   Files modified:    {files_changed}")
    
    if args.dry_run and total_patched > 0:
        print(f"\n  Run without --dry-run to apply changes.")


if __name__ == "__main__":
    main()
