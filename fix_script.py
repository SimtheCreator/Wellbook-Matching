import re
import os

html_path = 'C:/Users/LENOVO/Desktop/Wellnista/UI_Prototypes/wellbook_prototype_app.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
script_content = ''
for s in scripts:
    if 'defaultState' in s:
        script_content = s
        break

# Only replace the specific DOMContentLoaded
script_content = script_content.replace("document.addEventListener('DOMContentLoaded', () => {", "function initAfterMount() {")
# To fix the closing bracket for initAfterMount without breaking forEach, let's just do a reverse replace of the last '});'
last_idx = script_content.rfind('});')
if last_idx != -1:
    script_content = script_content[:last_idx] + '}' + script_content[last_idx+3:]

script_content = script_content.replace('lucide.createIcons();', '')
script_content = script_content.replace('window.onload = initApp;', '')

# Also add Firebase save function inside processUserChoice
# wait, processUserChoice currently goes to step 10:
# function processUserChoice() {
#     goToStep(10);
# }
# We want it to call window.saveAssessmentAnonymous(state) and then goToStep(10)
# Let's replace goToStep(10) inside processUserChoice:
new_process_user_choice = """
        function processUserChoice() {
            if (typeof window.saveAssessmentAnonymous === 'function') {
                window.saveAssessmentAnonymous(state).then(id => {
                    console.log('Saved assessment', id);
                    goToStep(10);
                });
            } else {
                goToStep(10);
            }
        }
"""
script_content = re.sub(r'function processUserChoice\(\)\s*\{\s*goToStep\(10\);\s*\}', new_process_user_choice, script_content)


with open('C:/Users/LENOVO/Desktop/Codex/Wellnista/src/pages/WellnistaAssessment.jsx', 'r', encoding='utf-8') as f:
    jsx_content = f.read()

# Replace the script block inside the JSX
new_jsx = re.sub(r'// Global Script Logic.*?export default function', '// Global Script Logic\\n' + script_content + '\\n\\nexport default function', jsx_content, flags=re.DOTALL)

with open('C:/Users/LENOVO/Desktop/Codex/Wellnista/src/pages/WellnistaAssessment.jsx', 'w', encoding='utf-8') as f:
    f.write(new_jsx)
print('Fixed global script logic!')
