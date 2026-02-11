"""
voice_config.py — Speaker-to-Voice mapping for Google Cloud TTS Neural2
═══════════════════════════════════════════════════════════════════════
Maps 39 unique dialogue speakers to Neural2 voices with pitch offsets
so every character has a distinguishable voice across the entire app.

Voices used:
  Female (en-US): Neural2-A, C, E, F, G, H  (6 voices)
  Male   (en-US): Neural2-D, I, J            (3 voices)
  Uzbek  (uz-UZ): Standard-A                 (1 voice)

Pitch offsets (semitones) differentiate speakers sharing the same base voice.
No two speakers in the SAME dialogue share voice+pitch.
"""

# ── Progressive speed by unit ────────────────────────────────────────
UNIT_SPEED = {
    "U01": 0.85, "U01.5": 0.85, "U02": 0.85, "U03": 0.85,
    "U04": 0.90, "U05": 0.90,
    "U06": 1.0,  "U07": 1.0, "U08": 1.0, "U09": 1.0, "U10": 1.0,
}

# ── Speaker → Voice mapping ─────────────────────────────────────────
# Each entry: (voice_name, pitch_semitones)
# Pitch range kept within -4 to +4 for natural sound.
# Verified: no two speakers in the same dialogue share voice+pitch.

SPEAKER_VOICES = {
    # ── Female speakers ──────────────────────────────────────────────
    # Neural2-A
    "Aziza":   ("en-US-Neural2-A",  0.0),
    "Feruza":  ("en-US-Neural2-A",  1.5),
    # Neural2-C
    "Dilnoza": ("en-US-Neural2-C", -1.0),
    "Gulnora": ("en-US-Neural2-C",  0.0),
    "Kamila":  ("en-US-Neural2-C",  1.5),
    "Kamola":  ("en-US-Neural2-C",  3.0),
    # Neural2-E
    "Laylo":   ("en-US-Neural2-E", -1.0),
    "Lola":    ("en-US-Neural2-E",  0.0),
    "Madina":  ("en-US-Neural2-E",  1.5),
    # Neural2-F
    "Malika":  ("en-US-Neural2-F", -1.0),
    "Mina":    ("en-US-Neural2-F",  0.0),
    "Nigora":  ("en-US-Neural2-F",  1.5),
    # Neural2-G
    "Nilufar": ("en-US-Neural2-G", -1.0),
    "Nodira":  ("en-US-Neural2-G",  0.0),
    "Sara":    ("en-US-Neural2-G",  1.5),
    # Neural2-H
    "Shoira":  ("en-US-Neural2-H", -1.0),
    "Zara":    ("en-US-Neural2-H",  0.0),
    "Zarina":  ("en-US-Neural2-H",  1.5),

    # ── Male speakers ────────────────────────────────────────────────
    # Neural2-D
    "Ali":     ("en-US-Neural2-D",  0.0),
    "Anvar":   ("en-US-Neural2-D",  1.5),
    "Ben":     ("en-US-Neural2-D", -1.5),
    "Farhod":  ("en-US-Neural2-D",  3.0),
    "Jamshid": ("en-US-Neural2-D", -3.0),
    "Karim":   ("en-US-Neural2-D",  4.0),
    # Neural2-I
    "Akmal":   ("en-US-Neural2-I", -1.0),
    "Bekzod":  ("en-US-Neural2-I",  0.0),
    "Jasur":   ("en-US-Neural2-I",  1.5),
    "Manager": ("en-US-Neural2-I", -3.0),   # authoritative, deeper
    "Omar":    ("en-US-Neural2-I",  3.0),
    "Otabek":  ("en-US-Neural2-I", -2.0),
    "Sardor":  ("en-US-Neural2-I",  4.0),
    # Neural2-J
    "Bobur":   ("en-US-Neural2-J", -1.0),
    "Farrukh": ("en-US-Neural2-J",  2.0),
    "Rashid":  ("en-US-Neural2-J",  0.0),
    "Ravshan": ("en-US-Neural2-J",  1.0),
    "Rustam":  ("en-US-Neural2-J", -2.0),
    "Timur":   ("en-US-Neural2-J",  3.0),
    "Tom":     ("en-US-Neural2-J", -3.0),
    "Vali":    ("en-US-Neural2-J",  4.0),
}

# Uzbek context voice (for UZ audio buttons)
UZ_VOICE = "uz-UZ-Standard-A"
UZ_PITCH = 0.0
UZ_SPEED = 0.90  # slightly slow for learners

# ── Fallback for unknown speakers ────────────────────────────────────
DEFAULT_FEMALE = ("en-US-Neural2-A", 0.0)
DEFAULT_MALE   = ("en-US-Neural2-D", 0.0)


def get_voice_for_speaker(speaker_name: str) -> dict:
    """Return TTS config for a speaker.
    
    Returns:
        {voice_name, pitch, speaking_rate, language_code, ssml_gender}
    """
    voice_name, pitch = SPEAKER_VOICES.get(speaker_name, DEFAULT_MALE)
    
    # Determine gender from voice name
    female_voices = {"Neural2-A", "Neural2-C", "Neural2-E", "Neural2-F", "Neural2-G", "Neural2-H"}
    is_female = any(fv in voice_name for fv in female_voices)
    
    return {
        "voice_name": voice_name,
        "pitch": pitch,
        "language_code": "en-US",
        "ssml_gender": "FEMALE" if is_female else "MALE",
    }


def get_speed_for_unit(unit_id: str) -> float:
    """Return speaking rate for a unit (progressive difficulty)."""
    return UNIT_SPEED.get(unit_id, 1.0)


def get_uz_voice() -> dict:
    """Return TTS config for Uzbek context audio."""
    return {
        "voice_name": UZ_VOICE,
        "pitch": UZ_PITCH,
        "speaking_rate": UZ_SPEED,
        "language_code": "uz-UZ",
        "ssml_gender": "FEMALE",
    }


# ── Dialogue cast (for verification) ────────────────────────────────
DIALOGUE_CAST = {
    "U01_L01_D01": ["Ali", "Sara"],
    "U01_L02_D01": ["Ali", "Sara"],
    "U01_L03_D01": ["Vali"],
    "U02_L01_D01": ["Ali", "Sara"],
    "U02_L01_D02": ["Bekzod", "Madina"],
    "U02_L01_D03": ["Kamila", "Nilufar"],
    "U02_L01_D04": ["Ali", "Bekzod"],
    "U03_L01_D01": ["Ali", "Malika"],
    "U03_L03_D02": ["Karim", "Sara"],
    "U03_L04_D03": ["Laylo", "Vali"],
    "U03_L05_D04": ["Malika", "Omar"],
    "U04_L01_D01": ["Ali", "Vali"],
    "U04_L02_D02": ["Laylo", "Zara"],
    "U04_L03_D03": ["Ben", "Tom"],
    "U04_L04_D04": ["Lola", "Mina"],
    "U05_L01_D01": ["Kamola", "Rashid"],
    "U05_L02_D01": ["Anvar", "Zarina"],
    "U05_L03_D01": ["Nigora", "Sardor"],
    "U05_L04_D01": ["Feruza", "Jasur"],
    "U06_L01_D01": ["Bekzod", "Sara"],
    "U06_L02_D01": ["Ali", "Manager"],
    "U06_L03_D01": ["Madina", "Nilufar"],
    "U07_L01_D01": ["Aziza", "Bobur"],
    "U07_L01_D05": ["Nilufar", "Sardor"],
    "U07_L02_D02": ["Madina", "Rustam"],
    "U07_L03_D03": ["Shoira", "Timur"],
    "U07_L03_D06": ["Dilnoza", "Farhod"],
    "U07_L04_D04": ["Gulnora", "Jamshid"],
    "U08_L01_D01": ["Akmal", "Laylo"],
    "U08_L02_D01": ["Nodira", "Sardor"],
    "U08_L03_D01": ["Malika", "Ravshan"],
    "U09_L01_D01": ["Aziza", "Dilnoza"],
    "U09_L02_D01": ["Farrukh", "Jasur"],
    "U09_L03_D01": ["Kamola", "Sardor"],
    "U10_L01_D01": ["Bekzod", "Nilufar"],
    "U10_L02_D01": ["Madina", "Otabek"],
    "U10_L03_D01": ["Gulnora", "Sardor"],
}


def verify_no_conflicts():
    """Check that no two speakers in the same dialogue share voice+pitch."""
    conflicts = []
    for d_id, cast in DIALOGUE_CAST.items():
        seen = {}
        for speaker in cast:
            voice_name, pitch = SPEAKER_VOICES.get(speaker, DEFAULT_MALE)
            key = (voice_name, pitch)
            if key in seen:
                conflicts.append(f"  ⚠️ {d_id}: {speaker} and {seen[key]} share {voice_name} pitch={pitch}")
            seen[key] = speaker
    if conflicts:
        print("CONFLICTS FOUND:")
        for c in conflicts:
            print(c)
    else:
        print(f"✅ No conflicts — all {len(DIALOGUE_CAST)} dialogues have distinct voice+pitch per speaker")
    return len(conflicts) == 0


if __name__ == "__main__":
    verify_no_conflicts()
    print(f"\n📊 {len(SPEAKER_VOICES)} speakers mapped to Neural2 voices")
    print(f"   Female voices: Neural2-A/C/E/F/G/H ({sum(1 for v,_ in SPEAKER_VOICES.values() if 'A' in v or 'C' in v or 'E' in v or 'F' in v or 'G' in v or 'H' in v)} speakers)")
    print(f"   Male voices:   Neural2-D/I/J ({sum(1 for v,_ in SPEAKER_VOICES.values() if 'D' in v or 'I' in v or 'J' in v)} speakers)")
    print(f"\n🎚️ Speed tiers:")
    for unit, speed in sorted(UNIT_SPEED.items()):
        print(f"   {unit}: {speed}x")
