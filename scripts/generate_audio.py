"""
generate_audio.py — Google Cloud TTS audio generator for all dialogue & vocab lines
═══════════════════════════════════════════════════════════════════════════════════
Parses vocab_cards_u*_4act.js files, extracts dialogue lines + en_canonical sentences,
generates SSML, calls Google Cloud TTS Neural2, saves MP3s, builds manifest.json.

Usage:
    python scripts/generate_audio.py --dry-run          # preview what would be generated
    python scripts/generate_audio.py                     # generate all audio
    python scripts/generate_audio.py --unit U01          # generate for one unit only
    python scripts/generate_audio.py --dialogues-only    # skip vocab, only dialogues
    python scripts/generate_audio.py --vocab-only        # skip dialogues, only vocab

Requires:
    pip install google-cloud-texttospeech
    GOOGLE_APPLICATION_CREDENTIALS env var pointing to gcp-key.json
"""

import os
import re
import sys
import json
import argparse
import time
from pathlib import Path

# Fix Windows encoding for emoji in print statements
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if sys.stderr.encoding and sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# Add scripts dir to path for voice_config import
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from voice_config import (
    get_voice_for_speaker, get_speed_for_unit, get_uz_voice,
    SPEAKER_VOICES, UNIT_SPEED
)

# ── Constants ────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
OUTPUT_DIR = ROOT / "public" / "audio_assets"
DATA_GLOB = "vocab_cards_u*_4act.js"

# Unit ID normalization: file "vocab_cards_u01_4act.js" → "U01"
def file_to_unit_id(filename: str) -> str:
    # Match uXX or uXX.5 but stop before _4act / _act suffix
    m = re.search(r'u(\d+(?:\.\d+)?)', filename)
    if not m:
        return "U00"
    raw = m.group(1)
    # Pad single digits: "1" → "01", "1.5" → "01.5"
    if '.' in raw:
        parts = raw.split('.')
        return f"U{parts[0].zfill(2)}.{parts[1]}"
    return f"U{raw.zfill(2)}"

def unit_to_folder(unit_id: str) -> str:
    """U01 → unit_01, U01.5 → unit_01_5"""
    return "unit_" + unit_id[1:].replace('.', '_').lower().zfill(2)


# ══════════════════════════════════════════════════════════════════════
# JS PARSER — Extract dialogues and vocab cards from JS data files
# ══════════════════════════════════════════════════════════════════════

def parse_js_file(filepath: Path) -> dict:
    """Parse a vocab_cards_u*_4act.js file and extract dialogues + vocab cards.
    
    Returns {
        dialogues: { dialogue_id: { id, title, lines: [{speaker, line, line_uz, ...}] } },
        vocab_cards: [ { id, en_canonical, ... } ]
    }
    """
    content = filepath.read_text(encoding='utf-8')
    
    result = {
        "dialogues": {},
        "vocab_cards": []
    }
    
    # ── Extract dialogues ────────────────────────────────────────────
    # Find the dialogues: { ... } block
    dialogues_match = re.search(r'dialogues\s*:\s*\{', content)
    if dialogues_match:
        # Parse each dialogue block
        # Pattern: "U01_L01_D01": { id: "U01_L01_D01", title: "...", lines: [...] }
        dialogue_pattern = re.compile(
            r'"(U\d+(?:_\d+)?_L\d+_D\d+)"\s*:\s*\{[^}]*?'
            r'id\s*:\s*"([^"]+)"[^}]*?'
            r'title\s*:\s*"([^"]*)"',
            re.DOTALL
        )
        
        for dm in dialogue_pattern.finditer(content):
            d_key = dm.group(1)
            d_id = dm.group(2)
            d_title = dm.group(3)
            
            # Find lines array for this dialogue
            # Search from this match position forward
            start_pos = dm.start()
            lines_match = re.search(
                r'lines\s*:\s*\[',
                content[start_pos:]
            )
            if not lines_match:
                continue
            
            lines_start = start_pos + lines_match.end()
            # Find matching ] bracket — count nesting
            bracket_depth = 1
            pos = lines_start
            while pos < len(content) and bracket_depth > 0:
                if content[pos] == '[':
                    bracket_depth += 1
                elif content[pos] == ']':
                    bracket_depth -= 1
                pos += 1
            lines_block = content[lines_start:pos-1]
            
            # Parse individual line objects
            lines = []
            line_pattern = re.compile(
                r'\{\s*'
                r'speaker\s*:\s*"([^"]+)"\s*,\s*'
                r'line\s*:\s*"([^"]*?)"\s*,\s*'
                r'line_uz\s*:\s*"([^"]*?)"',
                re.DOTALL
            )
            for lm in line_pattern.finditer(lines_block):
                lines.append({
                    "speaker": lm.group(1),
                    "line": lm.group(2),
                    "line_uz": lm.group(3),
                })
            
            result["dialogues"][d_id] = {
                "id": d_id,
                "title": d_title,
                "lines": lines,
            }
    
    # ── Extract vocab cards with en_canonical ────────────────────────
    # Pattern: en_canonical: "Some sentence."
    card_id_pattern = re.compile(r'id\s*:\s*"([^"]+)"')
    en_canonical_pattern = re.compile(r'en_canonical\s*:\s*"([^"]+)"')
    # Fallback for U10+ format: act_3_drill.anchor.translation
    anchor_translation_pattern = re.compile(r'anchor\s*:\s*\{[^}]*translation\s*:\s*"([^"]+)"')
    
    # Find card blocks — each card starts with { id: "..." and has en_canonical
    # We need to pair card IDs with their en_canonical
    card_blocks = re.split(r'(?=\{\s*id\s*:\s*")', content)
    for block in card_blocks:
        id_match = card_id_pattern.search(block)
        if not id_match:
            continue
        card_id = id_match.group(1)
        # Skip non-vocab IDs (dialogue IDs etc.)
        if not card_id.startswith("V_"):
            continue
        
        en_match = en_canonical_pattern.search(block)
        if en_match:
            en_text = en_match.group(1)
        else:
            # Fallback: use act_3_drill anchor translation (U10 format)
            anchor_match = anchor_translation_pattern.search(block)
            if anchor_match:
                # Strip markdown bold markers
                en_text = anchor_match.group(1).replace("**", "")
            else:
                continue
        
        result["vocab_cards"].append({
            "id": card_id,
            "en_canonical": en_text,
        })
    
    return result


# ══════════════════════════════════════════════════════════════════════
# SSML BUILDER — Natural-sounding speech markup
# ══════════════════════════════════════════════════════════════════════

def build_ssml(text: str, pitch: float = 0.0, rate: float = 1.0) -> str:
    """Build SSML for a text line with prosody and intonation markers.
    
    - Questions (?) get a slight pitch rise
    - Exclamations (!) get emphasis
    - Commas get a brief pause
    """
    # Escape XML special chars
    escaped = (text
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace("'", '&apos;'))
    
    # Build prosody attributes
    pitch_str = f"{pitch:+.1f}st" if pitch != 0 else "+0st"
    rate_str = f"{rate:.0%}"
    
    # Add natural pauses at commas
    escaped = escaped.replace(',', ',<break time="200ms"/>')
    
    # Question intonation: wrap final clause in higher pitch
    if text.strip().endswith('?'):
        # Raise pitch slightly for questions
        pitch_val = pitch + 2.0
        pitch_str = f"{pitch_val:+.1f}st"
    
    # Exclamation emphasis
    if text.strip().endswith('!'):
        escaped = f'<emphasis level="moderate">{escaped}</emphasis>'
    
    ssml = f'<speak><prosody rate="{rate_str}" pitch="{pitch_str}">{escaped}</prosody></speak>'
    return ssml


# ══════════════════════════════════════════════════════════════════════
# TTS GENERATOR — Google Cloud Text-to-Speech
# ══════════════════════════════════════════════════════════════════════

def generate_audio_file(
    text: str,
    output_path: Path,
    voice_name: str,
    language_code: str,
    pitch: float,
    speaking_rate: float,
    use_ssml: bool = True,
    dry_run: bool = False,
    client=None
):
    """Generate a single MP3 file via Google Cloud TTS.
    
    Returns character count consumed.
    """
    if dry_run:
        return len(text)
    
    from google.cloud import texttospeech
    
    if client is None:
        client = texttospeech.TextToSpeechClient()
    
    ssml = build_ssml(text, pitch, speaking_rate) if use_ssml else None
    
    if use_ssml:
        synthesis_input = texttospeech.SynthesisInput(ssml=ssml)
    else:
        synthesis_input = texttospeech.SynthesisInput(text=text)
    
    voice = texttospeech.VoiceSelectionParams(
        language_code=language_code,
        name=voice_name,
    )
    
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=speaking_rate,
        pitch=pitch,
    )
    
    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config,
    )
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(response.audio_content)
    
    return len(text)


# ══════════════════════════════════════════════════════════════════════
# MAIN PIPELINE
# ══════════════════════════════════════════════════════════════════════

def collect_all_tasks(data_dir: Path, unit_filter: str = None) -> tuple:
    """Scan all data files and collect audio generation tasks.
    
    Returns (dialogue_tasks, vocab_tasks) where each task is a dict with
    all info needed to generate one MP3.
    """
    dialogue_tasks = []
    vocab_tasks = []
    
    js_files = sorted(data_dir.glob(DATA_GLOB))
    
    for js_file in js_files:
        unit_id = file_to_unit_id(js_file.name)
        
        if unit_filter and unit_id != unit_filter:
            continue
        
        unit_folder = unit_to_folder(unit_id)
        speed = get_speed_for_unit(unit_id)
        
        print(f"  📄 Parsing {js_file.name} → {unit_id}")
        parsed = parse_js_file(js_file)
        
        # ── Dialogue tasks ───────────────────────────────────────────
        for d_id, dialogue in parsed["dialogues"].items():
            for i, line in enumerate(dialogue["lines"]):
                audio_id = f"{d_id}_L{i}"
                speaker = line["speaker"]
                voice_cfg = get_voice_for_speaker(speaker)
                
                # EN dialogue line
                dialogue_tasks.append({
                    "audio_id": audio_id,
                    "text": line["line"],
                    "speaker": speaker,
                    "dialogue_id": d_id,
                    "line_index": i,
                    "unit_id": unit_id,
                    "output_path": OUTPUT_DIR / unit_folder / "lesson_dialogues" / f"{audio_id}.mp3",
                    "voice_name": voice_cfg["voice_name"],
                    "language_code": voice_cfg["language_code"],
                    "pitch": voice_cfg["pitch"],
                    "speaking_rate": speed,
                })
                
                # UZ dialogue lines skipped — English only
        
        # ── Vocab tasks ──────────────────────────────────────────────
        for card in parsed["vocab_cards"]:
            card_id = card["id"]
            en_text = card["en_canonical"]
            
            # EN vocab sentence — use a neutral female voice
            vocab_tasks.append({
                "audio_id": card_id,
                "text": en_text,
                "unit_id": unit_id,
                "output_path": OUTPUT_DIR / unit_folder / "vocab" / f"{card_id}.mp3",
                "voice_name": "en-US-Neural2-A",
                "language_code": "en-US",
                "pitch": 0.0,
                "speaking_rate": speed,
            })
    
    return dialogue_tasks, vocab_tasks


def run(args):
    """Main execution."""
    data_dir = ROOT
    
    print("🎤 Audio Generation Pipeline")
    print("=" * 60)
    
    if args.dry_run:
        print("  🔍 DRY RUN — no API calls, no files written\n")
    
    # Collect tasks
    print("📂 Scanning data files...")
    dialogue_tasks, vocab_tasks = collect_all_tasks(data_dir, args.unit)
    
    # Filter by mode
    tasks = []
    if not args.vocab_only:
        tasks.extend(dialogue_tasks)
    if not args.dialogues_only:
        tasks.extend(vocab_tasks)
    
    # Summary
    en_dialogue = [t for t in dialogue_tasks if not t["audio_id"].endswith("_uz")]
    uz_dialogue = [t for t in dialogue_tasks if t["audio_id"].endswith("_uz")]
    
    total_chars = sum(len(t["text"]) for t in tasks)
    print(f"\n📊 Tasks collected:")
    print(f"   EN dialogue lines:  {len(en_dialogue)}")
    print(f"   UZ dialogue lines:  {len(uz_dialogue)}")
    print(f"   Vocab sentences:    {len(vocab_tasks)}")
    print(f"   Total files:        {len(tasks)}")
    print(f"   Total characters:   {total_chars:,}")
    print(f"   Estimated cost:     ${total_chars * 16 / 1_000_000:.2f} (after 1M free tier: $0.00)")
    
    if args.dry_run:
        print(f"\n{'─'*60}")
        print("Sample tasks (first 10):")
        for t in tasks[:10]:
            print(f"  {t['audio_id']:30s} → {t['output_path'].relative_to(ROOT)}")
            print(f"    voice={t['voice_name']} pitch={t['pitch']:+.1f} rate={t['speaking_rate']}")
            print(f"    text: \"{t['text'][:60]}{'...' if len(t['text'])>60 else ''}\"")
        if len(tasks) > 10:
            print(f"  ... and {len(tasks)-10} more")
        
        # Write manifest even in dry run
        write_manifest(tasks, args.dry_run)
        print(f"\n✅ Dry run complete. Run without --dry-run to generate audio.")
        return
    
    # ── Generate audio ───────────────────────────────────────────────
    print(f"\n🔊 Generating {len(tasks)} audio files...")
    
    # Set up GCP credentials
    creds_path = ROOT / "gcp-key.json"
    if creds_path.exists():
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(creds_path)
    elif not os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
        print("❌ No gcp-key.json found and GOOGLE_APPLICATION_CREDENTIALS not set!")
        sys.exit(1)
    
    from google.cloud import texttospeech
    client = texttospeech.TextToSpeechClient()
    
    chars_used = 0
    errors = []
    start_time = time.time()
    
    for i, task in enumerate(tasks, 1):
        try:
            chars = generate_audio_file(
                text=task["text"],
                output_path=task["output_path"],
                voice_name=task["voice_name"],
                language_code=task["language_code"],
                pitch=task["pitch"],
                speaking_rate=task["speaking_rate"],
                client=client,
            )
            chars_used += chars
            
            # Progress
            if i % 20 == 0 or i == len(tasks):
                elapsed = time.time() - start_time
                rate = i / elapsed if elapsed > 0 else 0
                print(f"  [{i}/{len(tasks)}] {rate:.1f} files/sec — {chars_used:,} chars used")
            
            # Rate limiting: ~10 requests/sec to stay safe
            time.sleep(0.1)
            
        except Exception as e:
            errors.append((task["audio_id"], str(e)))
            print(f"  ❌ {task['audio_id']}: {e}")
    
    elapsed = time.time() - start_time
    
    # ── Write manifest ───────────────────────────────────────────────
    write_manifest(tasks, dry_run=False)
    
    # ── Summary ──────────────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"✅ Generated {len(tasks) - len(errors)} / {len(tasks)} files in {elapsed:.1f}s")
    print(f"   Characters used: {chars_used:,}")
    if errors:
        print(f"   ❌ {len(errors)} errors:")
        for aid, err in errors[:5]:
            print(f"      {aid}: {err}")


def write_manifest(tasks: list, dry_run: bool = False):
    """Write manifest.json for traceability."""
    manifest = {}
    for t in tasks:
        manifest[t["audio_id"]] = {
            "file": str(t["output_path"].relative_to(ROOT / "public")),
            "text": t["text"],
            "voice": t["voice_name"],
            "pitch": t["pitch"],
            "rate": t["speaking_rate"],
            "speaker": t.get("speaker", "narrator"),
            "unit": t["unit_id"],
        }
    
    manifest_path = OUTPUT_DIR / "manifest.json"
    if not dry_run:
        manifest_path.parent.mkdir(parents=True, exist_ok=True)
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f"\n📋 Manifest written: {manifest_path.relative_to(ROOT)}")
    else:
        print(f"\n📋 Manifest would be written to: {manifest_path.relative_to(ROOT)} ({len(manifest)} entries)")


# ══════════════════════════════════════════════════════════════════════
# CLI
# ══════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(description="Generate TTS audio for dialogue & vocab")
    parser.add_argument("--dry-run", action="store_true", help="Preview without API calls")
    parser.add_argument("--unit", type=str, default=None, help="Generate for one unit only (e.g. U01)")
    parser.add_argument("--dialogues-only", action="store_true", help="Only dialogue lines")
    parser.add_argument("--vocab-only", action="store_true", help="Only vocab en_canonical")
    args = parser.parse_args()
    
    if args.dialogues_only and args.vocab_only:
        print("❌ Cannot use both --dialogues-only and --vocab-only")
        sys.exit(1)
    
    run(args)


if __name__ == "__main__":
    main()
