import os

file_path = "C:/Users/LENOVO/Desktop/Wellnista/UI_Prototypes/wellbook_prototype_app.html"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# CSS Injection
css_to_add = """
        body.lang-en .lang-th { display: none !important; }
        body.lang-th .lang-en { display: none !important; }
"""
content = content.replace('</style>', css_to_add + '</style>')

# JS Language Switch Update
select_lang_old = """        function selectLang(lang) {
            state.lang = lang;
            saveState();
            if(lang === 'en') {
                alert('English language mode is coming soon in the React App. Proceeding with Thai UI.');
            }
            nextStep(1);
        }"""
select_lang_new = """        function selectLang(lang) {
            state.lang = lang;
            saveState();
            document.body.className = document.body.className.replace(/lang-th|lang-en/g, '').trim() + ' lang-' + lang;
            nextStep(1);
        }
        
        // Also apply on init
        document.addEventListener('DOMContentLoaded', () => {
            if(state.lang) document.body.classList.add('lang-' + state.lang);
            else document.body.classList.add('lang-th');
        });"""
content = content.replace(select_lang_old, select_lang_new)

# RestoreUIState apply lang
content = content.replace("goToStep(state.currentStep);", "goToStep(state.currentStep);\n            if(state.lang) document.body.classList.add('lang-' + state.lang);\n            else document.body.classList.add('lang-th');")


# HTML Text Replacements
html_replacements = {
    "เลือกภาษาที่ต้องการใช้งาน": "Select your preferred language",
    "ภาษาไทย": "ภาษาไทย",
    "English (Coming Soon)": "English",
    "ข้อมูลพื้นฐานของคุณ": "Your Basic Profile",
    "เพื่อให้ระบบปรับแต่งการประเมินให้เหมาะสมกับคุณที่สุด": "To help us tailor the assessment to you",
    "1. เพศ (Gender)": "1. Gender",
    "หญิง": "Female",
    "ชาย": "Male",
    "ไม่ระบุ": "Other",
    "2. ช่วงอายุ (Age Range)": "2. Age Range",
    "55 ปีขึ้นไป": "55+",
    "3. รูปแบบการทำงาน (Work Style)": "3. Work Style",
    "พนักงานบริษัท": "Corporate",
    "ทำงานอิสระ / WFH": "Freelance / WFH",
    "เจ้าของธุรกิจ": "Entrepreneur",
    "นักศึกษา": "Student",
    "สายแพทย์/สาธารณสุข": "Healthcare",
    "สายอาร์ต/ครีเอทีฟ": "Creative",
    "งานบริการ/ค้าขาย": "Service",
    "อื่นๆ": "Others",
    "เริ่มทำแบบประเมิน": "Start Assessment",
    "คุณรู้สึกอย่างไรในสัปดาห์นี้?": "How are you feeling this week?",
    "สำรวจร่างกายและจิตใจอย่างนุ่มนวล": "Gently explore your body and mind",
    "1. สภาพร่างกาย (Physical State)": "1. Physical State",
    "ออฟฟิศซินโดรม": "Office Syndrome",
    "ล้ากล้ามเนื้อ": "Muscle Fatigue",
    "ร่างกายปกติดี แต่อยากฟิตขึ้น": "Healthy & Normal, want to be fitter",
    "2. สภาวะจิตใจ (Mental State)": "2. Mental State",
    "เครียดสะสม": "Chronic Stress",
    "นอนไม่หลับ": "Insomnia",
    "หมดไฟ": "Burnout",
    "แจ่มใสปกติ": "Clear & Fresh",
    "3. หากไม่ได้ฟื้นฟู จะเกิดอะไรขึ้น?": "3. If not recovered, what happens?",
    "เครียดสะสม รับมือปัญหาไม่ไหว": "Unable to cope with stress",
    "อารมณ์แปรปรวน หงุดหงิดง่าย": "Mood swings, easily irritated",
    "ปวดเมื่อยทางกายรุนแรงขึ้น": "Severe physical aches",
    "ใช้ชีวิตปกติได้เรื่อยๆ ไม่มีผลกระทบมาก": "Normal, no major impact",
    "กลับ": "Back",
    "ถัดไป": "Next",
    "ตัวชี้วัดสุขภาพ": "Health Metrics",
    "ข้อมูลเหล่านี้ช่วยเราประเมินความปลอดภัยและสรีรวิทยาของคุณ": "These help us assess your safety and physiology",
    "จังหวะชีพจรขณะพัก (Resting HR)": "Resting Heart Rate",
    "< 60 bpm (เต้นช้า)": "< 60 bpm (Slow)",
    "60-80 bpm (ปกติ)": "60-80 bpm (Normal)",
    "81-99 bpm (เริ่มเร็ว)": "81-99 bpm (Elevated)",
    "> 100 bpm (เต้นเร็ว)": "> 100 bpm (Fast)",
    "เวลานอนเฉลี่ย": "Average Sleep Duration",
    "น้อยกว่า 5 ชม.": "Less than 5 hrs",
    "6-7 ชม.": "6-7 hrs",
    "7-8 ชม.": "7-8 hrs",
    "9 ชม. ขึ้นไป": "9+ hrs",
    "ความถี่การออกกำลังกาย": "Exercise Frequency",
    "ไม่ออกเลย": "None",
    "1-2 วัน/สัปดาห์": "1-2 days/week",
    "3-4 วัน/สัปดาห์": "3-4 days/week",
    "5 วันขึ้นไป/สัปดาห์": "5+ days/week",
    "ระดับความเครียด": "Stress Level",
    "ข้อจำกัดด้านสุขภาพ": "Clinical Vetoes",
    "เพื่อความปลอดภัย โปรดระบุอาการบาดเจ็บหรือโรคประจำตัว (PAR-Q+)": "For safety, please indicate any medical conditions (PAR-Q+)",
    "โรคหัวใจ / ความดันโลหิตสูง": "Heart Disease / High BP",
    "บาดเจ็บข้อต่อ / กระดูก": "Joint / Bone Injury",
    "ไมเกรน / ไวต่อแสงและเสียง": "Migraine / Sensory Sensitivity",
    "ไม่มีข้อจำกัดทางสุขภาพ": "No medical conditions",
    "สไตล์ที่ใช่สำหรับคุณ?": "What's your style?",
    "จับคู่ความชอบที่ตรงกับบุคลิกภาพ": "Match preferences to your personality",
    "1. สไตล์กิจกรรม (Style)": "1. Activity Style",
    "อยู่นิ่งๆ (Passive) ฟื้นฟูตัวเอง": "Passive & Restorative",
    "เรียกเหงื่อ (Active)": "Active & Sweaty",
    "ความคิดสร้างสรรค์ (Creative)": "Creative & Expressive",
    "พัฒนาทักษะ (Growth)": "Skill Growth",
    "2. ความเปิดรับสิ่งใหม่ (Openness)": "2. Openness to Experience",
    "ชอบแบบแผนเดิม": "Prefer Routine",
    "ปานกลาง": "Moderate",
    "เปิดรับสิ่งใหม่ๆ": "Open to New Things",
    "3. ระดับการเข้าสังคม (Social Level)": "3. Social Level",
    "ชอบทำคนเดียวเงียบๆ": "Solo / Quiet",
    "สบายใจกับกลุ่มเล็กๆ": "Small Groups",
    "ชอบพบปะผู้คนใหม่ๆ / คอนเนคชัน": "Networking / Meeting People",
    "วิถีชีวิตและกิจวัตร": "Lifestyle & Routine",
    "เพื่อให้ AI หาโซลูชันที่เข้ากับตารางชีวิตของคุณได้อย่างราบรื่น": "Let AI find a solution that fits your schedule",
    "1. สภาพแวดล้อมที่ชอบ (Environment)": "1. Preferred Environment",
    "ธรรมชาติ / กลางแจ้ง": "Nature / Outdoors",
    "พื้นที่ปิดเงียบสงบ (เช่น สปา)": "Quiet Indoor (e.g., Spa)",
    "สตูดิโอมีพลังงาน / เวิร์กชอป": "Energetic Studio / Workshop",
    "2. ความสะดวกในการเดินทาง": "2. Travel Convenience",
    "ไปได้ทุกสัปดาห์": "Weekly",
    "เดือนละ 1-2 ครั้ง": "1-2 times/month",
    "ไปได้นานๆ ครั้ง": "Rarely",
    "ไม่สะดวก (ขอทำที่บ้าน)": "Not convenient (At-home only)",
    "3. ช่วงเวลาที่คุณว่างพักผ่อน": "3. Free Time",
    "หลังเลิกงานวันธรรมดา": "Weekdays After Work",
    "วันหยุดสุดสัปดาห์": "Weekends",
    "ตอนเช้าก่อนเริ่มงาน": "Mornings Before Work",
    "ไม่แน่นอนจัดสรรยาก": "Irregular / Hard to plan",
    "ประมวลผลด้วย AI": "Process with AI",
    "ระบบได้คัดกรองกิจกรรมที่อาจเสี่ยงต่อสุขภาพของคุณออก (PAR-Q+)": "The system has filtered out activities that may pose health risks (PAR-Q+)",
    "เน้นเฉพาะกิจกรรมที่คุณสามารถทำได้อย่างสะดวกที่บ้าน": "Focusing exclusively on activities you can do at home",
    "ตัวเลือกอื่นๆ ที่เหมาะกับคุณ": "Other Suitable Options",
    "ประสบการณ์นี้ตรงใจคุณไหม?": "Does this match your needs?",
    "โปรดให้คะแนนเพื่อดูผลวิเคราะห์ขั้นสุดท้าย": "Please rate to see the final analysis",
    "คุณคิดว่ากิจกรรมอื่นน่าจะเหมาะกับคุณมากกว่าไหม?": "Do you think another activity would suit you better?",
    "โปรดเลือกสิ่งที่คุณอยากทำที่สุดในตอนนี้ เพื่อสอน AI ให้รู้จักคุณมากขึ้น": "Please select what you want to do most right now to help train the AI",
    "หมวดร่างกาย / พักผ่อน": "Physical / Rest",
    "พอใจกับกิจกรรมที่แนะนำแล้ว ✨": "Satisfied with the recommendation ✨",
    "หมวดจิตใจ / ทางเลือกสงบ": "Mental / Calm",
    "หมวดคอมมูนิตี้ & เติบโต": "Community & Growth",
    "เหตุผลหลักคืออะไร?": "What is the main reason?",
    "ผลลัพธ์ตรงกับความต้องการที่สุด": "Recommendation perfectly matches my needs",
    "บรรเทาอาการปวดเมื่อยทางกาย": "Relieve physical aches",
    "ระบายความเครียด หนีความวุ่นวาย": "Relieve stress, escape chaos",
    "ต้องการพลังงาน ความท้าทายใหม่": "Need energy, new challenges",
    "พัฒนาตัวเอง เรียนรู้และหาเพื่อนใหม่": "Self-development, learn, meet friends",
    "เสร็จสิ้น": "Finish",
    "ขอบคุณที่ให้ข้อมูลเพิ่มเติม<br>ความคิดเห็นของคุณช่วยให้เราออกแบบ Wellness Lifestyle ได้ตอบโจทย์คุณมากยิ่งขึ้น": "Thank you for the extra info<br>Your feedback helps us design a Wellness Lifestyle that better suits you",
    "ทำแบบประเมินอีกครั้ง": "Retake Assessment"
}

for th, en in html_replacements.items():
    wrapped = f'<span class="lang-th">{th}</span><span class="lang-en hidden">{en}</span>'
    content = content.replace(f">{th}<", f">{wrapped}<")
    content = content.replace(f'"{th}"', f'"{wrapped}"') # In case some are embedded in attributes, but mostly they aren't
    # Handle the ones with spaces or directly in text
    # Since replace without angle brackets is dangerous, let's only do it for specific patterns.
    # The above ">th<" works for most block elements.
    # Let's also do a straight replace for those that might not be enclosed tightly.
    # But wait, replacing >th< is safe. Let's see if there are any that don't match.
    content = content.replace(f' {th} ', f' <span class="lang-th">{th}</span><span class="lang-en hidden">{en}</span> ')
    content = content.replace(f' {th}<', f' <span class="lang-th">{th}</span><span class="lang-en hidden">{en}</span><')
    content = content.replace(f'>{th} ', f'><span class="lang-th">{th}</span><span class="lang-en hidden">{en}</span> ')

# JS Replacements for description
js_desc_replacements = {
    'พิลาทิสบนเครื่องรีฟอร์เมอร์ แก้ออฟฟิศซินโดรม สร้างกล้ามเนื้อแกนกลาง': 'Reformer Pilates for office syndrome and core strength',
    'แช่น้ำแร่ร้อน ลดปวดเมื่อย กระตุ้นการไหลเวียนเลือดและฮอร์โมนฟื้นฟู': 'Hot springs to reduce aches, boost circulation and recovery hormones',
    'บำบัดด้วยคลื่นเสียงความถี่ต่ำ ดึงสมองสู่ความสงบขั้นสุด ลดความเครียด': 'Low-frequency sound therapy for ultimate calm and stress relief',
    'แช่น้ำแข็งฟื้นฟูกล้ามเนื้อเฉียบพลัน กระตุ้นภูมิคุ้มกันและปลุกพลังใจ': 'Ice baths for acute muscle recovery, immunity, and mental toughness',
    'คาร์ดิโอความเข้มข้นสูง ระบายความเครียด เผาผลาญไขมัน': 'High-intensity cardio to relieve stress and burn fat',
    'เวิร์กชอปปั้นดินเผา ฝึกสมาธิ ดึงสมองเข้าสู่ Flow State': 'Pottery workshop to practice mindfulness and enter a Flow State',
    'โยคะยืดเหยียดช้าๆ เน้นลมหายใจ ช่วยให้ระบบประสาทผ่อนคลาย': 'Slow stretching yoga focusing on breath to relax the nervous system',
    'คลาสสอนธุรกิจ หาคอนเนคชัน (เช่น Pitching Event)': 'Business classes for networking (e.g., Pitching Events)',
    'เวิร์กชอปพัฒนาตัวเอง (เช่น Enneagram, Vision Board)': 'Self-development workshops (e.g., Enneagram, Vision Board)',
    'คอมมูนิตี้บอร์ดเกม พบปะพูดคุย เสียงหัวเราะบำบัดจิตใจ': 'Board game community to meet, talk, and heal through laughter'
}

for th, en in js_desc_replacements.items():
    content = content.replace(f'description: "{th}"', f'description: {{ th: "{th}", en: "{en}" }}')

# Fix document.getElementById('res-desc').innerText = topMatch.description;
content = content.replace("document.getElementById('res-desc').innerText = topMatch.description;", "document.getElementById('res-desc').innerText = topMatch.description[state.lang || 'th'];")

# JS Stress Text
stress_js_old = """
                const descMap = {
                    '1': 'ผ่อนคลายมาก (Relaxed) - สงบ ไม่มีเรื่องกวนใจ',
                    '2': 'ผ่อนคลายมาก (Relaxed) - สงบ ไม่มีเรื่องกวนใจ',
                    '3': 'เครียดเล็กน้อย (Mild) - มีเรื่องให้คิดบ้าง แต่ยังจัดการได้',
                    '4': 'เครียดเล็กน้อย (Mild) - มีเรื่องให้คิดบ้าง แต่ยังจัดการได้',
                    '5': 'เครียดปานกลาง (Moderate) - เริ่มรู้สึกกดดัน แต่พอรับมือไหว',
                    '6': 'เครียดปานกลาง (Moderate) - เริ่มรู้สึกกดดัน แต่พอรับมือไหว',
                    '7': 'เครียดสูง (High) - หนักอึ้ง อารมณ์แปรปรวน ส่งผลต่อการนอน',
                    '8': 'เครียดสูง (High) - หนักอึ้ง อารมณ์แปรปรวน ส่งผลต่อการนอน',
                    '9': 'เครียดรุนแรง (Severe) - รับมือไม่ไหว รู้สึกหมดไฟ (Burnout)',
                    '10': 'เครียดรุนแรง (Severe) - รับมือไม่ไหว รู้สึกหมดไฟ (Burnout)'
                };"""
stress_js_new = """
                const descMap = state.lang === 'en' ? {
                    '1': 'Relaxed - Calm, no worries',
                    '2': 'Relaxed - Calm, no worries',
                    '3': 'Mild - Some thoughts, but manageable',
                    '4': 'Mild - Some thoughts, but manageable',
                    '5': 'Moderate - Feeling pressured, but coping',
                    '6': 'Moderate - Feeling pressured, but coping',
                    '7': 'High - Heavy mood, affecting sleep',
                    '8': 'High - Heavy mood, affecting sleep',
                    '9': 'Severe - Overwhelmed, Burnout',
                    '10': 'Severe - Overwhelmed, Burnout'
                } : {
                    '1': 'ผ่อนคลายมาก (Relaxed) - สงบ ไม่มีเรื่องกวนใจ',
                    '2': 'ผ่อนคลายมาก (Relaxed) - สงบ ไม่มีเรื่องกวนใจ',
                    '3': 'เครียดเล็กน้อย (Mild) - มีเรื่องให้คิดบ้าง แต่ยังจัดการได้',
                    '4': 'เครียดเล็กน้อย (Mild) - มีเรื่องให้คิดบ้าง แต่ยังจัดการได้',
                    '5': 'เครียดปานกลาง (Moderate) - เริ่มรู้สึกกดดัน แต่พอรับมือไหว',
                    '6': 'เครียดปานกลาง (Moderate) - เริ่มรู้สึกกดดัน แต่พอรับมือไหว',
                    '7': 'เครียดสูง (High) - หนักอึ้ง อารมณ์แปรปรวน ส่งผลต่อการนอน',
                    '8': 'เครียดสูง (High) - หนักอึ้ง อารมณ์แปรปรวน ส่งผลต่อการนอน',
                    '9': 'เครียดรุนแรง (Severe) - รับมือไม่ไหว รู้สึกหมดไฟ (Burnout)',
                    '10': 'เครียดรุนแรง (Severe) - รับมือไม่ไหว รู้สึกหมดไฟ (Burnout)'
                };"""
content = content.replace(stress_js_old, stress_js_new)

# JS Loading Text
loading_js_old = """            const msgs = [
                {t: "ANALYZING BIOMARKERS", s: "ประเมินสรีรวิทยาและนาฬิกาชีวิต..."},
                {t: "CLINICAL SCREENING", s: "ตรวจสอบข้อจำกัดสุขภาพ (PAR-Q+)..."},
                {t: "LIFESTYLE MATCHING", s: "ค้นหาความสมดุลที่เข้ากับตารางชีวิต..."},
                {t: "CURATING WELLNESS", s: "เลือกสิ่งที่ดีที่สุดสำหรับคุณในวันนี้..."}
            ];"""
loading_js_new = """            const msgs = state.lang === 'en' ? [
                {t: "ANALYZING BIOMARKERS", s: "Assessing physiology and circadian rhythm..."},
                {t: "CLINICAL SCREENING", s: "Checking health constraints (PAR-Q+)..."},
                {t: "LIFESTYLE MATCHING", s: "Finding balance for your schedule..."},
                {t: "CURATING WELLNESS", s: "Curating the best options for you today..."}
            ] : [
                {t: "ANALYZING BIOMARKERS", s: "ประเมินสรีรวิทยาและนาฬิกาชีวิต..."},
                {t: "CLINICAL SCREENING", s: "ตรวจสอบข้อจำกัดสุขภาพ (PAR-Q+)..."},
                {t: "LIFESTYLE MATCHING", s: "ค้นหาความสมดุลที่เข้ากับตารางชีวิต..."},
                {t: "CURATING WELLNESS", s: "เลือกสิ่งที่ดีที่สุดสำหรับคุณในวันนี้..."}
            ];"""
content = content.replace(loading_js_old, loading_js_new)

# Save
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
