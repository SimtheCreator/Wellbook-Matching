import re

file_path = "C:/Users/LENOVO/Desktop/Wellnista/UI_Prototypes/wellbook_prototype_app.html"
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

thai_lines = []
for i, line in enumerate(lines):
    if re.search(r'[\u0E00-\u0E7F]', line):
        thai_lines.append(f"{i+1}: {line.strip()}")

with open("C:/Users/LENOVO/Desktop/Wellnista/UI_Prototypes/thai_lines.txt", 'w', encoding='utf-8') as f:
    f.write('\n'.join(thai_lines))
