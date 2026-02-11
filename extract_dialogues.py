import glob
import re
import os

def find_balanced_block(text, start_index, open_char='[', close_char=']'):
    """
    Finds the substring enclosed by balanced open_char and close_char,
    starting searching for open_char at or after start_index.
    """
    try:
        start_pos = text.index(open_char, start_index)
    except ValueError:
        return None, start_index

    balance = 0
    in_string = False
    string_char = None
    escape = False

    for i in range(start_pos, len(text)):
        char = text[i]
        
        if in_string:
            if escape:
                escape = False
            elif char == '\\':
                escape = True
            elif char == string_char:
                in_string = False
        else:
            if char == '"' or char == "'":
                in_string = True
                string_char = char
            elif char == open_char:
                balance += 1
            elif char == close_char:
                balance -= 1
                if balance == 0:
                    return text[start_pos+1:i], i + 1  # Return content inside []
        
    return None, len(text)

def extract_dialogues():
    files = glob.glob("vocab_cards_*.js")
    all_dialogues = {}
    print(f"Found {len(files)} vocab_cards files.")

    dialogue_def_pattern = re.compile(r'"(U\d+_L\d+_D\d+)":\s*\{\s*id:')

    for file_path in files:
        print(f"Processing {file_path}...")
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find all dialogue occurrences by looking for key pattern
            for match in dialogue_def_pattern.finditer(content):
                d_id = match.group(1)
                start_match = match.start()
                
                # Find title
                # Look for title: "..." after the match
                title_match = re.search(r'title:\s*"((?:[^"\\]|\\.)*?)"', content[start_match:start_match+200])
                title = title_match.group(1) if title_match else "Unknown Title"

                # Find lines: [ ...
                lines_start_search = content.find("lines:", start_match)
                if lines_start_search != -1:
                    lines_content, end_pos = find_balanced_block(content, lines_start_search, '[', ']')
                    
                    if lines_content:
                        lines = []
                        # Now regex the lines content. 
                        # This regex is still safer on the smaller chunk
                        # We need to match { ... } objects potentially containing nested arrays
                        
                        # Simple split by objects is risky if logic is complex, but the objects are comma separated
                        # Regex for individual line properties is safer
                        
                        # Let's iterate over objects using balanced find again?
                        # Or just use the property regex which works if applied to the full valid block
                        
                        line_regex = re.compile(
                            r'speaker:\s*"((?:[^"\\]|\\.)*?)",\s*line:\s*"((?:[^"\\]|\\.)*?)",\s*line_uz:\s*"((?:[^"\\]|\\.)*?)"'
                        )
                        
                        for lm in line_regex.findall(lines_content):
                            lines.append({
                                "speaker": lm[0],
                                "en": lm[1],
                                "uz": lm[2]
                            })
                            
                        # Extract Unit/Lesson
                        parts = d_id.split('_')
                        unit_id = parts[0]
                        lesson_id = parts[0] + '_' + parts[1]

                        all_dialogues[d_id] = {
                            "id": d_id,
                            "unit": unit_id,
                            "lesson": lesson_id,
                            "title": title,
                            "lines": lines
                        }

        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    # Sort dialogues by ID
    sorted_ids = sorted(all_dialogues.keys())

    markdown_output = "# All Dialogues\n\nGenerated from `vocab_cards_*.js` files.\n\n"
    
    current_unit = ""
    current_lesson = ""

    for d_id in sorted_ids:
        data = all_dialogues[d_id]
        
        if data['unit'] != current_unit:
            current_unit = data['unit']
            markdown_output += f"## Unit {current_unit}\n\n"
            
        if data['lesson'] != current_lesson:
            current_lesson = data['lesson']
            markdown_output += f"### Lesson {current_lesson}\n\n"
        
        markdown_output += f"#### Dialogue: {data['title']} ({data['id']})\n\n"
        
        for line in data['lines']:
            speaker = line['speaker']
            en_text = line['en'].replace('\\"', '"')
            uz_text = line['uz'].replace('\\"', '"')
            markdown_output += f"- **{speaker}**: {en_text}<br>*{uz_text}*\n"
        
        markdown_output += "\n"

    with open("ALL_DIALOGUES.md", 'w', encoding='utf-8') as f:
        f.write(markdown_output)
    
    print(f"Successfully extracted {len(all_dialogues)} dialogues to ALL_DIALOGUES.md")

if __name__ == "__main__":
    extract_dialogues()
