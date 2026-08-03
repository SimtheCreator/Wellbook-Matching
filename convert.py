import re
import os

html_path = 'C:/Users/LENOVO/Desktop/Wellnista/UI_Prototypes/wellbook_prototype_app.html'
out_path = 'C:/Users/LENOVO/Desktop/Codex/Wellnista/src/pages/WellnistaAssessment.jsx'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

body_match = re.search(r'<body[^>]*>(.*?)<script>', content, re.DOTALL)
if body_match:
    body_content = body_match.group(1)
else:
    body_content = content

# Replace standard HTML attributes with React equivalents
body_content = re.sub(r'\bclass=', 'className=', body_content)
def replace_onclick(match):
    inner = match.group(1)
    inner = inner.replace(', this', ', e.currentTarget')
    inner = inner.replace('(this', '(e.currentTarget')
    return f'onClick={{(e) => {{{inner}}}}}'
body_content = re.sub(r'onclick=\"([^\"]+)\"', replace_onclick, body_content)
body_content = re.sub(r'\bfor=', 'htmlFor=', body_content)

# Self-closing tags
body_content = re.sub(r'<br>', '<br />', body_content)
body_content = re.sub(r'<hr([^>]*)>', r'<hr\1 />', body_content)
body_content = re.sub(r'<img([^>]*)(?<!/)>', r'<img\1 />', body_content)
body_content = re.sub(r'<input([^>]*)(?<!/)>', r'<input\1 />', body_content)

# HTML comments to JSX comments
body_content = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', body_content)

# Style attribute fixes
body_content = body_content.replace('style="display: none"', "style={{ display: 'none' }}")
body_content = body_content.replace('style="width: 16.66%"', "style={{ width: '16.66%' }}")

# Extract the script block
scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
script_content = ""
for s in scripts:
    if 'defaultState' in s:
        script_content = s
        break

# Remove lucide.createIcons() as we will handle it differently or keep it if CDN is used
script_content = script_content.replace('lucide.createIcons();', '')
script_content = script_content.replace("document.addEventListener('DOMContentLoaded', () => {", "function initAfterMount() {")
script_content = script_content.replace("window.onload = initApp;", "")
script_content = script_content.replace("});", "}")

with open(out_path, 'w', encoding='utf-8') as f:
    f.write('import React, { useEffect } from "react";\n')
    f.write('import { saveAssessmentAnonymous } from "../lib/firebase";\n\n')
    f.write('// Global Script Logic\n')
    f.write(script_content)
    f.write('\n\nexport default function WellnistaAssessment() {\n')
    f.write('  useEffect(() => {\n')
    f.write('    window.selectLang = selectLang;\n')
    f.write('    window.selectSingle = selectSingle;\n')
    f.write('    window.selectMultiple = selectMultiple;\n')
    f.write('    window.setRating = setRating;\n')
    f.write('    window.saveGoal = saveGoal;\n')
    f.write('    window.goToStep = goToStep;\n')
    f.write('    window.nextStep = nextStep;\n')
    f.write('    window.resetApp = resetApp;\n')
    f.write('    window.processData = processData;\n')
    f.write('    window.submitRating = submitRating;\n')
    f.write('    window.processUserChoice = processUserChoice;\n')
    f.write('    \n')
    f.write('    const script = document.createElement("script");\n')
    f.write('    script.src = "https://unpkg.com/lucide@latest";\n')
    f.write('    script.onload = () => { window.lucide.createIcons(); };\n')
    f.write('    document.body.appendChild(script);\n')
    f.write('    \n')
    f.write('    initApp();\n')
    f.write('    if (typeof initAfterMount === "function") initAfterMount();\n')
    f.write('  }, []);\n\n')
    f.write('  return (\n')
    f.write('    <div className="w-full min-h-screen bg-[#f5f3ef] text-[#2c3329] overflow-x-hidden font-[Inter]">\n')
    f.write(body_content)
    f.write('\n    </div>\n  );\n}\n')

print('Conversion script rewritten.')
