"""Quick check of dialogue/audio_id counts per unit."""
import re
from pathlib import Path

ROOT = Path(r"D:\New folder")

for u in range(1, 11):
    uid = f"u{u:02d}"
    fp = ROOT / f"vocab_cards_{uid}_4act.js"
    if not fp.exists():
        # Check U01.5
        fp = ROOT / f"vocab_cards_{uid}_5_4act.js"
        if not fp.exists():
            print(f"  {uid}: FILE NOT FOUND")
            continue
    
    content = fp.read_text(encoding="utf-8")
    d_ids = re.findall(r'id:\s*["\x27](U\d+_L\d+_D\d+)["\x27]', content)
    aid = re.findall(r'audio_id:\s*["\x27]([^"\x27]+)["\x27]', content)
    cards = re.findall(r'id:\s*["\x27](V_U\d+_L\d+_\w+)["\x27]', content)
    lines = re.findall(r'speaker:\s*["\x27]', content)
    print(f"  {uid}: {len(d_ids)} dialogues, {len(lines)} lines, {len(aid)} audio_ids, {len(cards)} vocab cards  [{fp.name}]")
