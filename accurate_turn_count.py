#!/usr/bin/env python3
"""
Accurate dialogue turn counting that doesn't double-count Uzbek translations.
"""

import re

def count_dialogue_turns_accurately(dialogue_text):
    """Count dialogue turns, treating A/B pairs as one unit (not counting translations separately)."""
    # Find all lines starting with **A or **B (English part only)
    # We'll count only the lines before the Uzbek translation
    
    lines = dialogue_text.split('\n')
    turn_count = 0
    skip_next_uzbek = False
    
    for line in lines:
        # If line starts with **A or **B and ends with speaker marker, it's a turn
        if re.match(r'^\*\*[AB]\s*\(', line) or re.match(r'^[AB]:', line):
            if not line.strip().startswith('['):  # Not a continuation/Uzbek line
                turn_count += 1
                skip_next_uzbek = True
        elif skip_next_uzbek and (line.startswith('**A') or line.startswith('**B') or 
                                   line.strip().startswith('**') and ':' not in line[:10]):
            # This is likely the Uzbek translation line - skip it
            skip_next_uzbek = False
    
    return turn_count


# Test on Unit 01 Dialogue 1
u01_d1 = """### DIALOGUE 1: Meeting Someone New (Ali & Sara)

**Context:** Two students meeting for the first time at school

**A (Ali):** Hello! My name is Ali.  
**A (Ali):** Salom! Mening ismim Ali.

**B (Sara):** Hello, Ali! I am Sara.  
**B (Sara):** Salom, Ali! Men Sara.

**A (Ali):** Nice to meet you, Sara. Are you a teacher?  
**A (Ali):** Seni tanishib o'tganimdan xursandman, Sara. Siz o'qituvchimisiz?

**B (Sara):** No, I am a student. Are you a student too?  
**B (Sara):** Yo'q, men talabaman. Siz ham talabamissiz?

**A (Ali):** Yes, I am a student. What is his name?  
**A (Ali):** Ha, men talabaman. Uning ismi nima?

**B (Sara):** His name is Karim. He is a teacher. This is my mother. Her name is Malika.  
**B (Sara):** Uning ismi Karim. U o'qituvchi. Bu mening onam. Uning ismi Malika.

**A (Ali):** Nice to meet you, Malika.  
**A (Ali):** Seni tanishib o'tganimdan xursandman, Malika."""

# Simple count: Look for **A and **B patterns that appear before Uzbek translation
def count_simple(text):
    # Count lines that are English dialogue (followed by Uzbek on next line)
    english_turns = len(re.findall(r'^\*\*[AB] \(.*?\):\s+[A-Z]', text, re.MULTILINE))
    if english_turns == 0:
        english_turns = len(re.findall(r'^[AB]:', text, re.MULTILINE)) // 2
    return english_turns

print("Unit 01 Dialogue 1 turn count:", count_simple(u01_d1))
print("Expected: 7 turns")
