import React, { useEffect } from "react";
import { saveAssessmentAnonymous } from "../lib/firebase";

// Global Script Logic

        // Initialize Lucide Icons
        

        // Database with Vector Dimensions (P: Physical, M: Mental, S: Social, N: Novelty, G: Growth)
        // Range: -5 to +5
        const clinicalData = [
            { id: "pilates", name: "Reformer Pilates", type: "onsite", env: "studio", icon: "🤸‍♀️", pubmed: "PMID: 22375213", mechanism: "Controlled eccentric contractions target deep-trunk musculature, improving lumbo-pelvic stability.", description: { th: "พิลาทิสบนเครื่องรีฟอร์เมอร์ แก้ออฟฟิศซินโดรม สร้างกล้ามเนื้อแกนกลาง", en: "Reformer Pilates for office syndrome and core strength" }, veto: ["joint_injury"], vector: { p: 3, m: 1, s: 2, n: 0, g: 2 } },
            { id: "onsen", name: "Onsen & Hot Springs", type: "onsite", env: "indoor", icon: "♨️", pubmed: "PMID: 29882782", mechanism: "Thermal stress triggers Heat Shock Factor 1 (HSF1), producing systemic anti-inflammatory effects.", description: { th: "แช่น้ำแร่ร้อน ลดปวดเมื่อย กระตุ้นการไหลเวียนเลือดและฮอร์โมนฟื้นฟู", en: "Hot springs to reduce aches, boost circulation and recovery hormones" }, veto: ["heart_risk"], vector: { p: -4, m: -3, s: -4, n: 0, g: -2 } },
            { id: "sound_bath", name: "Sound Bath", type: "any", env: "indoor", icon: "🧘", pubmed: "PMID: 36826208", mechanism: "Low-frequency acoustic vibrations stimulate the vagus nerve and promote parasympathetic dominance.", description: { th: "บำบัดด้วยคลื่นเสียงความถี่ต่ำ ดึงสมองสู่ความสงบขั้นสุด ลดความเครียด", en: "Low-frequency sound therapy for ultimate calm and stress relief" }, veto: ["sensory"], vector: { p: -4, m: -5, s: -3, n: 2, g: 1 } },
            { id: "ice_bath", name: "Ice Baths / Cold Plunge", type: "onsite", env: "studio", icon: "🧊", pubmed: "PMID: 24799686", mechanism: "Cold water immersion spikes epinephrine, upregulating anti-inflammatory cytokines.", description: { th: "แช่น้ำแข็งฟื้นฟูกล้ามเนื้อเฉียบพลัน กระตุ้นภูมิคุ้มกันและปลุกพลังใจ", en: "Ice baths for acute muscle recovery, immunity, and mental toughness" }, veto: ["heart_risk"], vector: { p: 2, m: 2, s: -4, n: 4, g: 3 } },
            { id: "muaythai", name: "Muay Thai / HIIT", type: "any", env: "studio", icon: "🥊", pubmed: "PMID: 35547204", mechanism: "High-intensity mechanical loading stimulates osteoblast activity via Wolff's Law.", description: { th: "คาร์ดิโอความเข้มข้นสูง ระบายความเครียด เผาผลาญไขมัน", en: "High-intensity cardio to relieve stress and burn fat" }, veto: ["heart_risk", "joint_injury"], vector: { p: 5, m: 2, s: 3, n: 1, g: 3 } },
            { id: "clay_art", name: "Pottery & Clay Art", type: "onsite", env: "indoor", icon: "🏺", pubmed: "PMID: 28730717", mechanism: "Bilateral tactile stimulation engages the somatosensory cortex and facilitates emotion regulation.", description: { th: "เวิร์กชอปปั้นดินเผา ฝึกสมาธิ ดึงสมองเข้าสู่ Flow State", en: "Pottery workshop to practice mindfulness and enter a Flow State" }, veto: [], vector: { p: -2, m: -2, s: 2, n: 4, g: 1 } },
            { id: "yoga", name: "Restorative Yoga", type: "any", env: "indoor", icon: "🧘‍♀️", pubmed: "PMID: 32240757", mechanism: "Sustained stretching decreases sympathetic tone and significantly improves HRV metrics.", description: { th: "โยคะยืดเหยียดช้าๆ เน้นลมหายใจ ช่วยให้ระบบประสาทผ่อนคลาย", en: "Slow stretching yoga focusing on breath to relax the nervous system" }, veto: [], vector: { p: -3, m: -4, s: 1, n: 0, g: 1 } },
            { id: "business", name: "Business Workshop", type: "onsite", env: "studio", icon: "📈", pubmed: "PMID: 11148302", mechanism: "Fulfills psychological needs for competence and relatedness, buffering against existential burnout.", description: { th: "คลาสสอนธุรกิจ หาคอนเนคชัน (เช่น Pitching Event)", en: "Business classes for networking (e.g., Pitching Events)" }, veto: [], vector: { p: 0, m: 5, s: 5, n: 2, g: 5 } },
            { id: "selfdev", name: "Self-Development", type: "any", env: "indoor", icon: "🧠", pubmed: "PMID: 24192560", mechanism: "Cognitive engagement increases neural plasticity and builds cognitive reserve against stress.", description: { th: "เวิร์กชอปพัฒนาตัวเอง (เช่น Enneagram, Vision Board)", en: "Self-development workshops (e.g., Enneagram, Vision Board)" }, veto: [], vector: { p: -1, m: 4, s: 3, n: 2, g: 5 } },
            { id: "boardgame", name: "Board Game Club", type: "onsite", env: "studio", icon: "🎲", pubmed: "PMID: 25910392", mechanism: "Positive social interaction releases oxytocin, reducing cortisol and mitigating social isolation risks.", description: { th: "คอมมูนิตี้บอร์ดเกม พบปะพูดคุย เสียงหัวเราะบำบัดจิตใจ", en: "Board game community to meet, talk, and heal through laughter" }, veto: [], vector: { p: -1, m: 2, s: 5, n: 3, g: 0 } }
        ];

        // Default State
        const defaultState = {
            version: '4.3',
            currentStep: 0,
            lang: '',
            gender: '', age: '', work: '',
            physical: '', mental: '', negative: '',
            vitals: { rhr: '', sleep: '', exercise: '', stress: '' },
            redFlags: [],
            style: '', openness: '', social: '',
            env: '', access: '', time: '',
            rating: 0,
            targetActivity: '', targetReason: '',
            aiScores: [],
            topMatchId: ''
        };

        let state = JSON.parse(JSON.stringify(defaultState));

        function initApp() {
            const savedState = localStorage.getItem('wellbook_state');
            if(savedState) {
                try {
                    let parsed = JSON.parse(savedState);
                    if (parsed.version !== defaultState.version) {
                        localStorage.removeItem('wellbook_state');
                    } else {
                        state = parsed;
                        restoreUIState();
                    }
                } catch(e) {
                    console.error("Failed to parse saved state", e);
                    localStorage.removeItem('wellbook_state');
                }
            }
            
            if (state.currentStep >= 7) {
                state.currentStep = 6;
            }
            
            goToStep(state.currentStep);
            if(state.lang) document.body.classList.add('lang-' + state.lang);
            else document.body.classList.add('lang-th');
        }

        function saveState() {
            localStorage.setItem('wellbook_state', JSON.stringify(state));
        }

        function resetApp() {
            localStorage.removeItem('wellbook_state');
            location.reload();
        }

        function restoreUIState() {
            const singles = ['gender', 'age', 'work', 'physical', 'mental', 'negative', 'style', 'openness', 'social', 'env', 'access', 'time', 'targetActivity', 'targetReason'];
            singles.forEach(key => {
                if(state[key]) {
                    const buttons = document.querySelectorAll(`button[onclick*="'${key}', '${state[key]}'"]`);
                    if(buttons.length > 0) {
                        buttons[0].classList.add('selected');
                    }
                }
            });

            const vitals = ['rhr', 'sleep', 'exercise', 'stress'];
            vitals.forEach(key => {
                if(state.vitals[key]) {
                    const buttons = document.querySelectorAll(`button[onclick*="'${key}', '${state.vitals[key]}', this, 'vitals'"]`);
                    if(buttons.length > 0) {
                        buttons[0].classList.add('selected');
                    }
                }
            });

            if (state.vitals.stress) {
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
                };
                let stressTextEl = document.getElementById('stress-desc');
                if(stressTextEl) {
                    stressTextEl.classList.remove('hidden');
                    stressTextEl.innerHTML = `<span class="text-wellnista-olive font-bold"><span class="lang-th">ระดับ</span><span class="lang-en hidden">Level</span> ${state.vitals.stress}:</span> ${descMap[state.vitals.stress]}`;
                }
            }

            if(state.redFlags.length === 0) {
                document.getElementById('btn-none').classList.add('selected');
            } else {
                state.redFlags.forEach(val => {
                    const buttons = document.querySelectorAll(`button[onclick*="'${val}'"]`);
                    if(buttons.length > 0) {
                        buttons[0].classList.add('selected');
                    }
                });
            }
            
            if (state.rating > 0) {
                const starEls = document.querySelectorAll('.star');
                starEls.forEach((el, index) => {
                    if (index < state.rating) {
                        el.classList.remove('text-[#e0d6b8]');
                        el.classList.add('text-wellnista-gold');
                    }
                });
            }

            checkSteps();
        }

        function goToStep(step) {
            state.currentStep = step;
            saveState();
            
            document.querySelectorAll('.step').forEach(el => {
                el.classList.remove('active');
                setTimeout(() => el.style.display = 'none', 400); 
            });
            setTimeout(() => {
                const target = document.getElementById(`step-${step}`);
                target.style.display = 'flex';
                void target.offsetWidth;
                target.classList.add('active');
            }, 400);
        }
        function nextStep(step) { goToStep(step); }

        function selectLang(lang) {
            state.lang = lang;
            saveState();
            document.body.className = document.body.className.replace(/lang-th|lang-en/g, '').trim() + ' lang-' + lang;
            nextStep(1);
        }
        
        // Also apply on init
        function initAfterMount() {
            if(state.lang) document.body.classList.add('lang-' + state.lang);
            else document.body.classList.add('lang-th');
        }

        function selectSingle(group, val, el, category = null) {
            if (category === 'vitals') {
                state.vitals[group] = val;
            } else {
                state[group] = val;
            }

            const parentId = group === 'targetActivity' ? null : `q-${group}`;
            
            if (parentId) {
                document.querySelectorAll(`#${parentId} button`).forEach(btn => btn.classList.remove('selected'));
            } else if (group === 'targetActivity') {
                document.querySelectorAll(`[id^="q-target-activity"] button`).forEach(btn => btn.classList.remove('selected'));
            }

            if(group === 'targetReason') {
                document.querySelectorAll(`#q-target-reason button`).forEach(btn => btn.classList.remove('selected'));
            }

            el.classList.add('selected');
            
            if (group === 'stress') {
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
                };
                let stressTextEl = document.getElementById('stress-desc');
                if(stressTextEl) {
                    stressTextEl.classList.remove('hidden');
                    stressTextEl.innerHTML = `<span class="text-wellnista-olive font-bold"><span class="lang-th">ระดับ</span><span class="lang-en hidden">Level</span> ${val}:</span> ${descMap[val]}`;
                }
            }

            saveState();
            checkSteps();
        }

        function checkSteps() {
            if(state.gender && state.age && state.work) document.getElementById('btn-next-1').disabled = false;
            if(state.physical && state.mental && state.negative) document.getElementById('btn-next-2').disabled = false;
            if(state.vitals.rhr && state.vitals.sleep && state.vitals.exercise && state.vitals.stress) document.getElementById('btn-next-3').disabled = false;
            
            const btnNone = document.getElementById('btn-none');
            const step4Valid = state.redFlags.length > 0 || (btnNone && btnNone.classList.contains('selected'));
            if(document.getElementById('btn-next-4')) document.getElementById('btn-next-4').disabled = !step4Valid;

            if(state.style && state.openness && state.social) document.getElementById('btn-next-5').disabled = false;
            if(state.env && state.access && state.time) document.getElementById('btn-next-6').disabled = false;
            if(state.targetActivity && state.targetReason) document.getElementById('btn-next-9').disabled = false;
        }

        function toggleCheckbox(val, el) {
            const idx = state.redFlags.indexOf(val);
            if(idx > -1) {
                state.redFlags.splice(idx, 1);
                el.classList.remove('selected');
            } else {
                state.redFlags.push(val);
                el.classList.add('selected');
            }
            document.getElementById('btn-none').classList.remove('selected');
            saveState();
            checkSteps();
        }

        function toggleNone(el) {
            state.redFlags = [];
            document.querySelectorAll('#q-vetoes .checkbox-btn').forEach(btn => btn.classList.remove('selected'));
            el.classList.add('selected');
            saveState();
            checkSteps();
        }

        function processData() {
            goToStep(7);
            const msgs = state.lang === 'en' ? [
                {t: "ANALYZING BIOMARKERS", s: "Assessing physiology and circadian rhythm..."},
                {t: "CLINICAL SCREENING", s: "Checking health constraints (PAR-Q+)..."},
                {t: "LIFESTYLE MATCHING", s: "Finding balance for your schedule..."},
                {t: "CURATING WELLNESS", s: "Curating the best options for you today..."}
            ] : [
                {t: "ANALYZING BIOMARKERS", s: "ประเมินสรีรวิทยาและนาฬิกาชีวิต..."},
                {t: "CLINICAL SCREENING", s: "ตรวจสอบข้อจำกัดสุขภาพ (PAR-Q+)..."},
                {t: "LIFESTYLE MATCHING", s: "ค้นหาความสมดุลที่เข้ากับตารางชีวิต..."},
                {t: "CURATING WELLNESS", s: "เลือกสิ่งที่ดีที่สุดสำหรับคุณในวันนี้..."}
            ];
            let i = 0;
            const intv = setInterval(() => {
                if(i < msgs.length) {
                    document.getElementById('loading-text').innerText = msgs[i].t;
                    document.getElementById('loading-sub').innerText = msgs[i].s;
                    i++;
                } else {
                    clearInterval(intv);
                    calculateMatch();
                    goToStep(8);
                }
            }, 1200); 
        }

        function calculateMatch() {
            let vetoTriggered = false;
            let athomeTriggered = state.access === 'athome';
            
            if(athomeTriggered) document.getElementById('home-banner').classList.remove('hidden');
            else document.getElementById('home-banner').classList.add('hidden');

            // 1. Calculate User's Vector from Choices
            // p = Physical, m = Mental, s = Social, n = Novelty, g = Growth
            let uv = { p: 0, m: 0, s: 0, n: 0, g: 0 };

            // Step 2: Physical & Mental State
            if(state.physical === 'pain') uv.p -= 2;
            else if(state.physical === 'fatigue') uv.p -= 3;
            else if(state.physical === 'normal') uv.p += 1;

            if(state.mental === 'stress') uv.m -= 3;
            else if(state.mental === 'insomnia') { uv.m -= 4; uv.p -= 2; }
            else if(state.mental === 'burnout') { uv.m += 2; uv.n += 3; }
            else if(state.mental === 'normal') uv.m += 1;

            if(state.negative === 'tension') uv.m -= 3;
            else if(state.negative === 'mood') uv.m -= 4;
            else if(state.negative === 'aches') uv.p -= 3;
            else if(state.negative === 'normal') { uv.p += 1; uv.m += 1; }

            // Step 3: Biomarkers
            if(state.vitals.rhr === 'high' || state.vitals.rhr === 'veryhigh') { uv.p -= 3; uv.m -= 2; }
            else if(state.vitals.rhr === 'normal' || state.vitals.rhr === 'low') { uv.p += 1; }

            if(state.vitals.sleep === 'less5') { uv.p -= 4; uv.m -= 3; }
            else if(state.vitals.sleep === '6to7') { uv.p -= 1; uv.m -= 1; }
            else if(state.vitals.sleep === 'more9') { uv.p += 2; uv.m += 1; }

            if(state.vitals.exercise === 'none') uv.p -= 2;
            else if(state.vitals.exercise === '3to4') uv.p += 2;
            else if(state.vitals.exercise === '5plus') uv.p += 4;

            let stressVal = parseInt(state.vitals.stress) || 5;
            if(stressVal <= 3) uv.m += 1;
            else if(stressVal <= 6) uv.m -= 1;
            else if(stressVal <= 8) uv.m -= 3;
            else { uv.m -= 4; uv.n -= 2; }

            // Step 5: Personality
            if(state.style === 'active') uv.p += 4;
            else if(state.style === 'passive') { uv.p -= 4; uv.m -= 2; }
            else if(state.style === 'creative') uv.n += 4;
            else if(state.style === 'growth') { uv.g += 4; uv.m += 2; }

            if(state.openness === 'low') uv.n -= 4;
            else if(state.openness === 'high') uv.n += 4;

            if(state.social === 'solo') uv.s -= 4;
            else if(state.social === 'smallgroup') uv.s += 1;
            else if(state.social === 'networking') uv.s += 4;

            console.log("User Vector calculated:", uv);

            // 2. Calculate Distance to Activities
            let scoredActivities = [];

            clinicalData.forEach(act => {
                // Check Vetoes first
                const isVetoed = act.veto.some(v => state.redFlags.includes(v));
                if(isVetoed) {
                    vetoTriggered = true;
                    return; 
                }
                if(athomeTriggered && act.type === 'onsite') {
                    return; 
                }

                // Euclidean Distance Calculation
                let pDiff = Math.pow(uv.p - act.vector.p, 2);
                let mDiff = Math.pow(uv.m - act.vector.m, 2);
                let sDiff = Math.pow(uv.s - act.vector.s, 2);
                let nDiff = Math.pow(uv.n - act.vector.n, 2);
                let gDiff = Math.pow(uv.g - act.vector.g, 2);

                let distance = Math.sqrt(pDiff + mDiff + sDiff + nDiff + gDiff);
                
                // Map distance to a % score (Max distance roughly 20-25)
                // Let's say a perfect match (dist=0) is 99%, and dist=15 is ~60%
                let score = Math.max(0, 99 - (distance * 3.5));
                score = Math.round(score);

                // Add flat logistics bonus if environment matches perfectly
                if(state.env === 'indoor' && act.env === 'indoor') score += 2;
                if(state.env === 'studio' && act.env === 'studio') score += 2;
                
                // Target Activity Boost 
                // Removed: targetActivity is asked post-recommendation for ML training. It should not influence initial scoring.

                score = Math.min(score, 99); // Cap at 99%

                console.log(`Distance to ${act.id}: ${distance.toFixed(2)}, Score: ${score}%`);

                scoredActivities.push({ act: act, score: score });
            });

            // Sort by highest score
            scoredActivities.sort((a, b) => b.score - a.score);
            if(scoredActivities.length === 0) {
                scoredActivities.push({ act: clinicalData.find(c => c.id === 'yoga'), score: 75 });
            }

            state.aiScores = scoredActivities;
            state.topMatchId = scoredActivities[0].act.id;
            saveState();

            let topMatch = scoredActivities[0].act;
            let topScore = scoredActivities[0].score;

            if(vetoTriggered) document.getElementById('warning-banner').classList.remove('hidden');
            else document.getElementById('warning-banner').classList.add('hidden');

            document.getElementById('res-score-text').innerText = `${Math.max(topScore, 75)}% MATCH`;
            document.getElementById('res-icon').innerText = topMatch.icon;
            document.getElementById('res-title').innerText = topMatch.name;
            document.getElementById('res-desc').innerText = topMatch.description[state.lang || 'th'];
            document.getElementById('res-mech').innerText = topMatch.mechanism;
            
            // Render Alternatives
            let altHtml = '';
            for(let i=1; i<Math.min(4, scoredActivities.length); i++) {
                let a = scoredActivities[i];
                altHtml += `<div class="bg-white rounded-[16px] border border-wellnista-border p-3 min-w-[120px] flex-shrink-0 text-center shadow-sm snap-start">
                    <div class="text-2xl mb-1">${a.act.icon}</div>
                    <div class="text-[11px] font-bold text-wellnista-textDark mb-1 leading-tight">${a.act.name}</div>
                    <div class="text-[9px] text-wellnista-olive font-bold tracking-wider">${Math.max(a.score, 50)}% MATCH</div>
                </div>`;
            }
            document.getElementById('res-alternatives').innerHTML = altHtml;
            
            
        }

        function submitRating(stars) {
            state.rating = stars;
            saveState();
            
            const starEls = document.querySelectorAll('.star');
            starEls.forEach((el, index) => {
                if (index < stars) {
                    el.classList.remove('text-[#e0d6b8]');
                    el.classList.add('text-wellnista-gold');
                } else {
                    el.classList.add('text-[#e0d6b8]');
                    el.classList.remove('text-wellnista-gold');
                }
            });
            
            // Auto advance to feedback after rating
            setTimeout(() => goToStep(9), 600);
        }

        
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


        
    

export default function WellnistaAssessment() {
  useEffect(() => {
    window.selectLang = selectLang;
    window.selectSingle = selectSingle;
    window.goToStep = goToStep;
    window.nextStep = nextStep;
    window.resetApp = resetApp;
    window.processData = processData;
    window.submitRating = submitRating;
    window.processUserChoice = processUserChoice;
    window.toggleCheckbox = toggleCheckbox;
    window.toggleNone = toggleNone;
    
    const script = document.createElement("script");
    script.src = "https://unpkg.com/lucide@latest";
    script.onload = () => { window.lucide.createIcons(); };
    document.body.appendChild(script);
    
    initApp();
    if (typeof initAfterMount === "function") initAfterMount();
  }, []);

  return (
    <div className="h-[100dvh] w-full flex justify-center items-center bg-[#eae7e0] font-sans m-0 p-0">


    <div className="w-full h-full md:w-[414px] md:h-[896px] bg-wellnista-bg md:rounded-[40px] premium-shadow relative flex flex-col overflow-hidden border border-[#e8e5df]/50 mobile-container">
        
        <header className="p-5 text-center border-b border-[#e8e5df] flex-shrink-0 z-10 bg-white/80 backdrop-blur-md relative">
            <button onClick={(e) => resetApp()} className="absolute top-1/2 -translate-y-1/2 right-5 text-wellnista-sand hover:text-wellnista-olive transition-colors flex flex-col items-center" title="Change Language / Restart">
                <i data-lucide="globe-2" className="w-5 h-5"></i>
                <span className="text-[8px] mt-1 font-medium tracking-wider"><span className="lang-th">เปลี่ยนภาษา</span><span className="lang-en hidden">LANG</span></span>
            </button>
            <div className="text-2xl md:text-3xl font-bold font-serif text-wellnista-olive tracking-tight cursor-pointer" onClick={(e) => resetApp()}>Wellnista</div>
            <div className="text-[9px] text-wellnista-sand font-mono tracking-[0.2em] mt-1 uppercase">Wellness & Community</div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col relative pb-8" id="app-container">
            
            {/* Step 0: Language Selection */}
            <div id="step-0" className="step active flex-col justify-center items-center flex-1 h-full pb-10">
                <i data-lucide="globe-2" className="w-12 h-12 text-wellnista-sand mb-6"></i>
                <h2 className="text-2xl font-bold font-serif text-wellnista-textDark mb-2">Select Language</h2>
                <p className="text-xs text-wellnista-textMuted mb-10"><span className="lang-th">เลือกภาษาที่ต้องการใช้งาน</span><span className="lang-en hidden">Select your preferred language</span></p>
                
                <div className="w-full space-y-4">
                    <button onClick={(e) => {selectLang('th')}} className="w-full bg-white border border-wellnista-border hover:border-wellnista-olive text-wellnista-textDark font-medium py-4 rounded-[20px] transition-all flex items-center justify-center gap-3">
                        <span className="text-2xl">🇹🇭</span> Thai
                    </button>
                    <button onClick={(e) => {selectLang('en')}} className="w-full bg-white border border-wellnista-border hover:border-wellnista-olive text-wellnista-textDark font-medium py-4 rounded-[20px] transition-all flex items-center justify-center gap-3">
                        <span className="text-2xl">🇬🇧</span> English
                    </button>
                </div>
            </div>

            {/* Step 1: Demographics */}
            <div id="step-1" className="step flex-col flex-1 hidden">
                <div className="flex items-center gap-2 mb-2">
                    <i data-lucide="user-circle" className="w-4 h-4 text-wellnista-sand"></i>
                    <div className="text-[10px] font-mono text-wellnista-sand tracking-widest uppercase">Step 1/6: Profile</div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight text-wellnista-textDark"><span className="lang-th">ข้อมูลพื้นฐานของคุณ</span><span className="lang-en hidden">Your Basic Profile</span></h2>
                <p className="text-wellnista-textMuted text-xs mb-6 font-light leading-relaxed"><span className="lang-th">เพื่อให้ระบบปรับแต่งการประเมินให้เหมาะสมกับคุณที่สุด</span><span className="lang-en hidden">To help us tailor the assessment to you</span></p>
                
                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">1. เพศ (Gender)</span><span className="lang-en hidden">1. Gender</span></h3>
                <div className="grid grid-cols-3 gap-2 mb-6" id="q-gender">
                    <button onClick={(e) => {selectSingle('gender', 'female', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex flex-col items-center gap-2">
                        <i data-lucide="user" className="w-5 h-5 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">หญิง</span><span className="lang-en hidden">Female</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('gender', 'male', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex flex-col items-center gap-2">
                        <i data-lucide="user" className="w-5 h-5 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">ชาย</span><span className="lang-en hidden">Male</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('gender', 'other', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex flex-col items-center gap-2">
                        <i data-lucide="users" className="w-5 h-5 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">ไม่ระบุ</span><span className="lang-en hidden">Other</span></span>
                    </button>
                </div>

                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">2. ช่วงอายุ (Age Range)</span><span className="lang-en hidden">2. Age Range</span></h3>
                <div className="grid grid-cols-3 gap-2 mb-6" id="q-age">
                    <button onClick={(e) => {selectSingle('age', '18-24', e.currentTarget)}} className="option-btn p-2 rounded-xl text-[11px] font-medium text-center">18-24</button>
                    <button onClick={(e) => {selectSingle('age', '25-34', e.currentTarget)}} className="option-btn p-2 rounded-xl text-[11px] font-medium text-center">25-34</button>
                    <button onClick={(e) => {selectSingle('age', '35-44', e.currentTarget)}} className="option-btn p-2 rounded-xl text-[11px] font-medium text-center">35-44</button>
                    <button onClick={(e) => {selectSingle('age', '45-54', e.currentTarget)}} className="option-btn p-2 rounded-xl text-[11px] font-medium text-center">45-54</button>
                    <button onClick={(e) => {selectSingle('age', '55+', e.currentTarget)}} className="option-btn p-2 rounded-xl text-[11px] font-medium text-center col-span-2"><span className="lang-th">55 ปีขึ้นไป</span><span className="lang-en hidden">55+</span></button>
                </div>

                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">3. รูปแบบการทำงาน (Work Style)</span><span className="lang-en hidden">3. Work Style</span></h3>
                <div className="grid grid-cols-2 gap-2 mb-6" id="q-work">
                    <button onClick={(e) => {selectSingle('work', 'corporate', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="building" className="w-4 h-4 text-wellnista-sand"></i><span className="text-[11px] font-medium"><span className="lang-th">พนักงานบริษัท</span><span className="lang-en hidden">Corporate</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('work', 'freelance', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="laptop" className="w-4 h-4 text-wellnista-sand"></i><span className="text-[11px] font-medium"><span className="lang-th">ทำงานอิสระ / WFH</span><span className="lang-en hidden">Freelance / WFH</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('work', 'entrepreneur', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="briefcase" className="w-4 h-4 text-wellnista-sand"></i><span className="text-[11px] font-medium"><span className="lang-th">เจ้าของธุรกิจ</span><span className="lang-en hidden">Entrepreneur</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('work', 'student', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="graduation-cap" className="w-4 h-4 text-wellnista-sand"></i><span className="text-[11px] font-medium"><span className="lang-th">นักศึกษา</span><span className="lang-en hidden">Student</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('work', 'healthcare', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="heart-pulse" className="w-4 h-4 text-wellnista-sand"></i><span className="text-[11px] font-medium"><span className="lang-th">สายแพทย์/สาธารณสุข</span><span className="lang-en hidden">Healthcare</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('work', 'creative', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="palette" className="w-4 h-4 text-wellnista-sand"></i><span className="text-[11px] font-medium"><span className="lang-th">สายอาร์ต/ครีเอทีฟ</span><span className="lang-en hidden">Creative</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('work', 'service', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="coffee" className="w-4 h-4 text-wellnista-sand"></i><span className="text-[11px] font-medium"><span className="lang-th">งานบริการ/ค้าขาย</span><span className="lang-en hidden">Service</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('work', 'other', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="users" className="w-4 h-4 text-wellnista-sand"></i><span className="text-[11px] font-medium"><span className="lang-th">อื่นๆ</span><span className="lang-en hidden">Others</span></span>
                    </button>
                </div>

                <div className="mt-auto pt-4">
                    <button onClick={(e) => {nextStep(2)}} id="btn-next-1" className="w-full bg-wellnista-olive hover:bg-wellnista-oliveDark text-white font-medium py-4 rounded-[20px] shadow-md disabled:opacity-40 disabled:shadow-none transition-all duration-300 flex justify-center items-center gap-2" disabled><span className="lang-th">เริ่มทำแบบประเมิน</span><span className="lang-en hidden">Start Assessment</span> <i data-lucide="arrow-right" className="w-4 h-4"></i></button>
                </div>
            </div>

            {/* Step 2: Physical & Mental State */}
            <div id="step-2" className="step flex-col flex-1 hidden">
                <div className="flex items-center gap-2 mb-2">
                    <i data-lucide="leaf" className="w-4 h-4 text-wellnista-sage"></i>
                    <div className="text-[10px] font-mono text-wellnista-sage tracking-widest uppercase">Step 2/6: Biopsychosocial</div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight text-wellnista-textDark"><span className="lang-th">คุณรู้สึกอย่างไรในสัปดาห์นี้?</span><span className="lang-en hidden">How are you feeling this week?</span></h2>
                <p className="text-wellnista-textMuted text-xs mb-6 font-light leading-relaxed"><span className="lang-th">สำรวจร่างกายและจิตใจอย่างนุ่มนวล</span><span className="lang-en hidden">Gently explore your body and mind</span></p>
                
                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">1. สภาพร่างกาย (Physical State)</span><span className="lang-en hidden">1. Physical State</span></h3>
                <div className="grid grid-cols-2 gap-2 mb-5" id="q-physical">
                    <button onClick={(e) => {selectSingle('physical', 'pain', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex flex-col items-center gap-2 text-center">
                        <i data-lucide="monitor" className="w-6 h-6 text-wellnista-sand"></i>
                        <span className="text-[11px] font-medium"><span className="lang-th">ออฟฟิศซินโดรม</span><span className="lang-en hidden">Office Syndrome</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('physical', 'fatigue', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex flex-col items-center gap-2 text-center">
                        <i data-lucide="battery-low" className="w-6 h-6 text-wellnista-sand"></i>
                        <span className="text-[11px] font-medium"><span className="lang-th">ล้ากล้ามเนื้อ</span><span className="lang-en hidden">Muscle Fatigue</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('physical', 'normal', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex flex-col items-center gap-2 text-center col-span-2">
                        <i data-lucide="activity" className="w-6 h-6 text-wellnista-sand"></i>
                        <span className="text-[11px] font-medium"><span className="lang-th">ร่างกายปกติดี แต่อยากฟิตขึ้น</span><span className="lang-en hidden">Healthy & Normal, want to be fitter</span></span>
                    </button>
                </div>

                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">2. สภาวะจิตใจ (Mental State)</span><span className="lang-en hidden">2. Mental State</span></h3>
                <div className="grid grid-cols-2 gap-2 mb-5" id="q-mental">
                    <button onClick={(e) => {selectSingle('mental', 'stress', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="cloud" className="w-5 h-5 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">เครียดสะสม</span><span className="lang-en hidden">Chronic Stress</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('mental', 'insomnia', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="moon" className="w-5 h-5 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">นอนไม่หลับ</span><span className="lang-en hidden">Insomnia</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('mental', 'burnout', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="wind" className="w-5 h-5 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">หมดไฟ</span><span className="lang-en hidden">Burnout</span></span>
                    </button>
                    <button onClick={(e) => {selectSingle('mental', 'normal', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-2">
                        <i data-lucide="sun" className="w-5 h-5 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">แจ่มใสปกติ</span><span className="lang-en hidden">Clear & Fresh</span></span>
                    </button>
                </div>

                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">3. หากไม่ได้ฟื้นฟู จะเกิดอะไรขึ้น?</span><span className="lang-en hidden">3. If not recovered, what happens?</span></h3>
                <div className="grid grid-cols-1 gap-2 mb-4" id="q-negative">
                    <button onClick={(e) => {selectSingle('negative', 'tension', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-3 text-left">
                        <i data-lucide="cloud-lightning" className="w-4 h-4 text-wellnista-sand flex-shrink-0"></i>
                        <div className="font-medium text-[11px]"><span className="lang-th">เครียดสะสม</span><span className="lang-en hidden">Chronic Stress</span> รับมือปัญหาไม่ไหว</div>
                    </button>
                    <button onClick={(e) => {selectSingle('negative', 'mood', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-3 text-left">
                        <i data-lucide="frown" className="w-4 h-4 text-wellnista-sand flex-shrink-0"></i>
                        <div className="font-medium text-[11px]"><span className="lang-th">อารมณ์แปรปรวน หงุดหงิดง่าย</span><span className="lang-en hidden">Mood swings, easily irritated</span></div>
                    </button>
                    <button onClick={(e) => {selectSingle('negative', 'aches', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-3 text-left">
                        <i data-lucide="shield-alert" className="w-4 h-4 text-wellnista-sand flex-shrink-0"></i>
                        <div className="font-medium text-[11px]"><span className="lang-th">ปวดเมื่อยทางกายรุนแรงขึ้น</span><span className="lang-en hidden">Severe physical aches</span></div>
                    </button>
                    <button onClick={(e) => {selectSingle('negative', 'normal', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-3 text-left">
                        <i data-lucide="sun" className="w-4 h-4 text-wellnista-sand flex-shrink-0"></i>
                        <div className="font-medium text-[11px]"><span className="lang-th">ใช้ชีวิตปกติได้เรื่อยๆ ไม่มีผลกระทบมาก</span><span className="lang-en hidden">Normal, no major impact</span></div>
                    </button>
                </div>

                <div className="flex gap-2 mt-auto pt-4">
                    <button onClick={(e) => {nextStep(1)}} className="w-1/3 bg-white border border-wellnista-border text-wellnista-textDark font-medium py-3 rounded-[20px] hover:bg-slate-50 transition-colors"><span className="lang-th">กลับ</span><span className="lang-en hidden">Back</span></button>
                    <button onClick={(e) => {nextStep(3)}} id="btn-next-2" className="w-2/3 bg-wellnista-olive hover:bg-wellnista-oliveDark text-white font-medium py-3 rounded-[20px] shadow-md disabled:opacity-40 disabled:shadow-none transition-all flex justify-center items-center gap-2" disabled><span className="lang-th">ถัดไป</span><span className="lang-en hidden">Next</span> <i data-lucide="arrow-right" className="w-4 h-4"></i></button>
                </div>
            </div>

            {/* Step 3: Vital Signs Input (Choice Scale) */}
            <div id="step-3" className="step flex-col flex-1 hidden">
                <div className="flex items-center gap-2 mb-2">
                    <i data-lucide="activity" className="w-4 h-4 text-wellnista-olive"></i>
                    <div className="text-[10px] font-mono text-wellnista-olive tracking-widest uppercase">Step 3/6: Biomarkers</div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight text-wellnista-textDark"><span className="lang-th">ตัวชี้วัดสุขภาพ</span><span className="lang-en hidden">Health Metrics</span></h2>
                <p className="text-wellnista-textMuted text-xs mb-6 font-light"><span className="lang-th">ข้อมูลเหล่านี้ช่วยเราประเมินความปลอดภัยและสรีรวิทยาของคุณ</span><span className="lang-en hidden">These help us assess your safety and physiology</span></p>
                
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-[20px] border border-wellnista-border shadow-sm">
                        <label className="flex justify-between text-xs mb-3 font-medium text-wellnista-textDark">
                            <span className="flex items-center gap-2"><i data-lucide="heart-pulse" className="w-4 h-4 text-wellnista-olive"></i> <span className="lang-th">จังหวะชีพจรขณะพัก (Resting HR)</span><span className="lang-en hidden">Resting Heart Rate</span></span>
                        </label>
                        <div className="grid grid-cols-2 gap-2" id="q-rhr">
                            <button onClick={(e) => {selectSingle('rhr', 'low', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">&lt; 60 bpm (เต้นช้า)</span><span className="lang-en hidden">&lt; 60 bpm (Slow)</span></button>
                            <button onClick={(e) => {selectSingle('rhr', 'normal', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">60-80 bpm (ปกติ)</span><span className="lang-en hidden">60-80 bpm (Normal)</span></button>
                            <button onClick={(e) => {selectSingle('rhr', 'high', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">81-99 bpm (เริ่มเร็ว)</span><span className="lang-en hidden">81-99 bpm (Elevated)</span></button>
                            <button onClick={(e) => {selectSingle('rhr', 'veryhigh', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium text-rose-600"><span className="lang-th">&gt; 100 bpm (เต้นเร็ว)</span><span className="lang-en hidden">&gt; 100 bpm (Fast)</span></button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-[20px] border border-wellnista-border shadow-sm">
                        <label className="flex justify-between text-xs mb-3 font-medium text-wellnista-textDark">
                            <span className="flex items-center gap-2"><i data-lucide="clock" className="w-4 h-4 text-wellnista-olive"></i> <span className="lang-th">เวลานอนเฉลี่ย</span><span className="lang-en hidden">Average Sleep Duration</span></span>
                        </label>
                        <div className="grid grid-cols-2 gap-2" id="q-sleep">
                            <button onClick={(e) => {selectSingle('sleep', 'less5', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium text-rose-600"><span className="lang-th">น้อยกว่า 5 ชม.</span><span className="lang-en hidden">Less than 5 hrs</span></button>
                            <button onClick={(e) => {selectSingle('sleep', '6to7', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">6-7 ชม.</span><span className="lang-en hidden">6-7 hrs</span></button>
                            <button onClick={(e) => {selectSingle('sleep', '7to8', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">7-8 ชม.</span><span className="lang-en hidden">7-8 hrs</span></button>
                            <button onClick={(e) => {selectSingle('sleep', 'more9', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">9 ชม. ขึ้นไป</span><span className="lang-en hidden">9+ hrs</span></button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-[20px] border border-wellnista-border shadow-sm">
                        <label className="flex justify-between text-xs mb-3 font-medium text-wellnista-textDark">
                            <span className="flex items-center gap-2"><i data-lucide="flame" className="w-4 h-4 text-wellnista-olive"></i> <span className="lang-th">ความถี่การออกกำลังกาย</span><span className="lang-en hidden">Exercise Frequency</span></span>
                        </label>
                        <div className="grid grid-cols-2 gap-2" id="q-exercise">
                            <button onClick={(e) => {selectSingle('exercise', 'none', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">ไม่ออกเลย</span><span className="lang-en hidden">None</span></button>
                            <button onClick={(e) => {selectSingle('exercise', '1to2', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">1-2 วัน/สัปดาห์</span><span className="lang-en hidden">1-2 days/week</span></button>
                            <button onClick={(e) => {selectSingle('exercise', '3to4', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">3-4 วัน/สัปดาห์</span><span className="lang-en hidden">3-4 days/week</span></button>
                            <button onClick={(e) => {selectSingle('exercise', '5plus', e.currentTarget, 'vitals')}} className="option-btn p-2.5 rounded-xl text-center text-[10px] font-medium"><span className="lang-th">5 วันขึ้นไป/สัปดาห์</span><span className="lang-en hidden">5+ days/week</span></button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-[20px] border border-wellnista-border shadow-sm">
                        <label className="flex justify-between text-xs mb-3 font-medium text-wellnista-textDark">
                            <span className="flex items-center gap-2"><i data-lucide="brain" className="w-4 h-4 text-wellnista-olive"></i> <span className="lang-th">ระดับความเครียด</span><span className="lang-en hidden">Stress Level</span></span>
                        </label>
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5" id="q-stress">
                            <button onClick={(e) => {selectSingle('stress', '1', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">1</button>
                            <button onClick={(e) => {selectSingle('stress', '2', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">2</button>
                            <button onClick={(e) => {selectSingle('stress', '3', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">3</button>
                            <button onClick={(e) => {selectSingle('stress', '4', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">4</button>
                            <button onClick={(e) => {selectSingle('stress', '5', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">5</button>
                            <button onClick={(e) => {selectSingle('stress', '6', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">6</button>
                            <button onClick={(e) => {selectSingle('stress', '7', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">7</button>
                            <button onClick={(e) => {selectSingle('stress', '8', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">8</button>
                            <button onClick={(e) => {selectSingle('stress', '9', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">9</button>
                            <button onClick={(e) => {selectSingle('stress', '10', e.currentTarget, 'vitals')}} className="likert-btn text-[11px]">10</button>
                        </div>
                        <div id="stress-desc" className="text-[10.5px] text-wellnista-textDark mt-3 text-center min-h-[16px] font-medium bg-[#faf8ec] py-1.5 px-2 rounded-lg border border-wellnista-border shadow-sm hidden transition-all"></div>
                    </div>
                </div>

                <div className="flex gap-2 mt-auto pt-4">
                    <button onClick={(e) => {nextStep(2)}} className="w-1/3 bg-white border border-wellnista-border text-wellnista-textDark font-medium py-3 rounded-[20px] hover:bg-slate-50 transition-colors"><span className="lang-th">กลับ</span><span className="lang-en hidden">Back</span></button>
                    <button onClick={(e) => {nextStep(4)}} id="btn-next-3" className="w-2/3 bg-wellnista-olive hover:bg-wellnista-oliveDark text-white font-medium py-3 rounded-[20px] shadow-md disabled:opacity-40 disabled:shadow-none transition-all flex justify-center items-center gap-2" disabled><span className="lang-th">ถัดไป</span><span className="lang-en hidden">Next</span> <i data-lucide="arrow-right" className="w-4 h-4"></i></button>
                </div>
            </div>

            {/* Step 4: Medical Vetoes (PAR-Q+) */}
            <div id="step-4" className="step flex-col flex-1 hidden">
                <div className="flex items-center gap-2 mb-2">
                    <i data-lucide="shield-alert" className="w-4 h-4 text-rose-500"></i>
                    <div className="text-[10px] font-mono text-rose-500 tracking-widest uppercase">Step 4/6: Clinical Rules</div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight text-wellnista-textDark"><span className="lang-th">ข้อจำกัดด้านสุขภาพ</span><span className="lang-en hidden">Clinical Vetoes</span></h2>
                <p className="text-wellnista-textMuted text-xs mb-8 font-light"><span className="lang-th">เพื่อความปลอดภัย โปรดระบุอาการบาดเจ็บหรือโรคประจำตัว (PAR-Q+)</span><span className="lang-en hidden">For safety, please indicate any medical conditions (PAR-Q+)</span></p>
                
                <div className="space-y-3 mb-6" id="q-vetoes">
                    <button onClick={(e) => {toggleCheckbox('heart_risk', e.currentTarget)}} className="checkbox-btn w-full p-4 rounded-[20px] flex items-center gap-4 text-left">
                        <div className="w-5 h-5 border border-wellnista-border rounded flex items-center justify-center indicator flex-shrink-0 transition-colors bg-white"></div>
                        <div className="flex-1">
                            <div className="text-[11px] font-medium"><span className="lang-th">โรคหัวใจ / ความดันโลหิตสูง</span><span className="lang-en hidden">Heart Disease / High BP</span></div>
                        </div>
                    </button>
                    <button onClick={(e) => {toggleCheckbox('joint_injury', e.currentTarget)}} className="checkbox-btn w-full p-4 rounded-[20px] flex items-center gap-4 text-left">
                        <div className="w-5 h-5 border border-wellnista-border rounded flex items-center justify-center indicator flex-shrink-0 transition-colors bg-white"></div>
                        <div className="flex-1">
                            <div className="text-[11px] font-medium"><span className="lang-th">บาดเจ็บข้อต่อ / กระดูก</span><span className="lang-en hidden">Joint / Bone Injury</span></div>
                        </div>
                    </button>
                    <button onClick={(e) => {toggleCheckbox('sensory', e.currentTarget)}} className="checkbox-btn w-full p-4 rounded-[20px] flex items-center gap-4 text-left">
                        <div className="w-5 h-5 border border-wellnista-border rounded flex items-center justify-center indicator flex-shrink-0 transition-colors bg-white"></div>
                        <div className="flex-1">
                            <div className="text-[11px] font-medium"><span className="lang-th">ไมเกรน / ไวต่อแสงและเสียง</span><span className="lang-en hidden">Migraine / Sensory Sensitivity</span></div>
                        </div>
                    </button>
                    
                    <div className="my-6 border-t border-[#e8e5df]"></div>

                    <button onClick={(e) => {toggleNone(e.currentTarget)}} className="checkbox-btn-none w-full p-4 rounded-[20px] flex items-center gap-4 text-left" id="btn-none">
                        <div className="w-5 h-5 border border-wellnista-border rounded flex items-center justify-center flex-shrink-0 transition-colors bg-white" id="ind-none"></div>
                        <div className="flex-1">
                            <div className="text-[11px] font-semibold text-wellnista-oliveDark"><span className="lang-th">ไม่มีข้อจำกัดทางสุขภาพ</span><span className="lang-en hidden">No medical conditions</span></div>
                        </div>
                    </button>
                </div>

                <div className="flex gap-2 mt-auto pt-4">
                    <button onClick={(e) => {nextStep(3)}} className="w-1/3 bg-white border border-wellnista-border text-wellnista-textDark font-medium py-3 rounded-[20px] hover:bg-slate-50 transition-colors"><span className="lang-th">กลับ</span><span className="lang-en hidden">Back</span></button>
                    <button onClick={(e) => {nextStep(5)}} id="btn-next-4" className="w-2/3 bg-wellnista-olive hover:bg-wellnista-oliveDark text-white font-medium py-3 rounded-[20px] shadow-md disabled:opacity-40 disabled:shadow-none transition-all duration-300 flex justify-center items-center gap-2" disabled><span className="lang-th">ถัดไป</span><span className="lang-en hidden">Next</span> <i data-lucide="arrow-right" className="w-4 h-4"></i></button>
                </div>
            </div>

            {/* Step 5: Personality & Style */}
            <div id="step-5" className="step flex-col flex-1 hidden">
                <div className="flex items-center gap-2 mb-2">
                    <i data-lucide="fingerprint" className="w-4 h-4 text-wellnista-sand"></i>
                    <div className="text-[10px] font-mono text-wellnista-sand tracking-widest uppercase">Step 5/6: Personality</div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight text-wellnista-textDark"><span className="lang-th">สไตล์ที่ใช่สำหรับคุณ?</span><span className="lang-en hidden">What's your style?</span></h2>
                <p className="text-wellnista-textMuted text-xs mb-6 font-light"><span className="lang-th">จับคู่ความชอบที่ตรงกับบุคลิกภาพ</span><span className="lang-en hidden">Match preferences to your personality</span></p>
                
                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">1. สไตล์กิจกรรม (Style)</span><span className="lang-en hidden">1. Activity Style</span></h3>
                <div className="grid grid-cols-1 gap-2 mb-4" id="q-style">
                    <button onClick={(e) => {selectSingle('style', 'passive', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-3 text-left">
                        <i data-lucide="wind" className="w-4 h-4 text-wellnista-sage flex-shrink-0"></i> 
                        <div className="font-medium text-[11px]"><span className="lang-th">อยู่นิ่งๆ (Passive) ฟื้นฟูตัวเอง</span><span className="lang-en hidden">Passive & Restorative</span></div>
                    </button>
                    <button onClick={(e) => {selectSingle('style', 'active', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-3 text-left">
                        <i data-lucide="flame" className="w-4 h-4 text-wellnista-sage flex-shrink-0"></i> 
                        <div className="font-medium text-[11px]"><span className="lang-th">เรียกเหงื่อ (Active)</span><span className="lang-en hidden">Active & Sweaty</span></div>
                    </button>
                    <button onClick={(e) => {selectSingle('style', 'creative', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-3 text-left">
                        <i data-lucide="palette" className="w-4 h-4 text-wellnista-sage flex-shrink-0"></i> 
                        <div className="font-medium text-[11px]"><span className="lang-th">ความคิดสร้างสรรค์ (Creative)</span><span className="lang-en hidden">Creative & Expressive</span></div>
                    </button>
                    <button onClick={(e) => {selectSingle('style', 'growth', e.currentTarget)}} className="option-btn p-3 rounded-2xl flex items-center gap-3 text-left">
                        <i data-lucide="book-open" className="w-4 h-4 text-wellnista-sage flex-shrink-0"></i> 
                        <div className="font-medium text-[11px]"><span className="lang-th">พัฒนาทักษะ (Growth)</span><span className="lang-en hidden">Skill Growth</span></div>
                    </button>
                </div>

                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">2. ความเปิดรับสิ่งใหม่ (Openness)</span><span className="lang-en hidden">2. Openness to Experience</span></h3>
                <div className="grid grid-cols-3 gap-2 mb-4" id="q-openness">
                    <button onClick={(e) => {selectSingle('openness', 'low', e.currentTarget)}} className="option-btn p-2 rounded-xl text-[10px] font-medium text-center h-12"><span className="lang-th">ชอบแบบแผนเดิม</span><span className="lang-en hidden">Prefer Routine</span></button>
                    <button onClick={(e) => {selectSingle('openness', 'mid', e.currentTarget)}} className="option-btn p-2 rounded-xl text-[10px] font-medium text-center h-12"><span className="lang-th">ปานกลาง</span><span className="lang-en hidden">Moderate</span></button>
                    <button onClick={(e) => {selectSingle('openness', 'high', e.currentTarget)}} className="option-btn p-2 rounded-xl text-[10px] font-medium text-center h-12"><span className="lang-th">เปิดรับสิ่งใหม่ๆ</span><span className="lang-en hidden">Open to New Things</span></button>
                </div>

                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">3. ระดับการเข้าสังคม (Social Level)</span><span className="lang-en hidden">3. Social Level</span></h3>
                <div className="grid grid-cols-1 gap-2 mb-4" id="q-social">
                    <button onClick={(e) => {selectSingle('social', 'solo', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left text-[11px] font-medium flex items-center gap-2"><i data-lucide="user" className="w-4 h-4 text-wellnista-sand"></i> <span className="lang-th">ชอบทำคนเดียวเงียบๆ</span><span className="lang-en hidden">Solo / Quiet</span></button>
                    <button onClick={(e) => {selectSingle('social', 'smallgroup', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left text-[11px] font-medium flex items-center gap-2"><i data-lucide="users" className="w-4 h-4 text-wellnista-sand"></i> <span className="lang-th">สบายใจกับกลุ่มเล็กๆ</span><span className="lang-en hidden">Small Groups</span></button>
                    <button onClick={(e) => {selectSingle('social', 'networking', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left text-[11px] font-medium flex items-center gap-2"><i data-lucide="globe" className="w-4 h-4 text-wellnista-sand"></i> <span className="lang-th">ชอบพบปะผู้คนใหม่ๆ / คอนเนคชัน</span><span className="lang-en hidden">Networking / Meeting People</span></button>
                </div>

                <div className="flex gap-2 mt-auto pt-2">
                    <button onClick={(e) => {nextStep(4)}} className="w-1/3 bg-white border border-wellnista-border text-wellnista-textDark font-medium py-3 rounded-[20px] hover:bg-slate-50 transition-colors"><span className="lang-th">กลับ</span><span className="lang-en hidden">Back</span></button>
                    <button onClick={(e) => {nextStep(6)}} id="btn-next-5" className="w-2/3 bg-wellnista-olive hover:bg-wellnista-oliveDark text-white font-medium py-3 rounded-[20px] shadow-md disabled:opacity-40 disabled:shadow-none transition-all duration-300 flex justify-center items-center gap-2" disabled><span className="lang-th">ถัดไป</span><span className="lang-en hidden">Next</span> <i data-lucide="arrow-right" className="w-4 h-4"></i></button>
                </div>
            </div>

            {/* Step 6: Environment & Logistics */}
            <div id="step-6" className="step flex-col flex-1 hidden">
                <div className="flex items-center gap-2 mb-2">
                    <i data-lucide="map-pin" className="w-4 h-4 text-wellnista-olive"></i>
                    <div className="text-[10px] font-mono text-wellnista-olive tracking-widest uppercase">Step 6/6: Logistics</div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight text-wellnista-textDark"><span className="lang-th">วิถีชีวิตและกิจวัตร</span><span className="lang-en hidden">Lifestyle & Routine</span></h2>
                <p className="text-wellnista-textMuted text-xs mb-6 font-light"><span className="lang-th">เพื่อให้ AI หาโซลูชันที่เข้ากับตารางชีวิตของคุณได้อย่างราบรื่น</span><span className="lang-en hidden">Let AI find a solution that fits your schedule</span></p>
                
                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">1. สภาพแวดล้อมที่ชอบ (Environment)</span><span className="lang-en hidden">1. Preferred Environment</span></h3>
                <div className="grid grid-cols-1 gap-2 mb-4" id="q-env">
                    <button onClick={(e) => {selectSingle('env', 'nature', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left flex items-center gap-3"><i data-lucide="tree-pine" className="w-4 h-4 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">ธรรมชาติ / กลางแจ้ง</span><span className="lang-en hidden">Nature / Outdoors</span></span></button>
                    <button onClick={(e) => {selectSingle('env', 'indoor', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left flex items-center gap-3"><i data-lucide="home" className="w-4 h-4 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">พื้นที่ปิดเงียบสงบ (เช่น สปา)</span><span className="lang-en hidden">Quiet Indoor (e.g., Spa)</span></span></button>
                    <button onClick={(e) => {selectSingle('env', 'studio', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left flex items-center gap-3"><i data-lucide="users" className="w-4 h-4 text-wellnista-sage"></i><span className="text-[11px] font-medium"><span className="lang-th">สตูดิโอมีพลังงาน / เวิร์กชอป</span><span className="lang-en hidden">Energetic Studio / Workshop</span></span></button>
                </div>

                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">2. ความสะดวกในการเดินทาง</span><span className="lang-en hidden">2. Travel Convenience</span></h3>
                <div className="grid grid-cols-2 gap-2 mb-4" id="q-access">
                    <button onClick={(e) => {selectSingle('access', 'weekly', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-center text-[11px] font-medium"><span className="lang-th">ไปได้ทุกสัปดาห์</span><span className="lang-en hidden">Weekly</span></button>
                    <button onClick={(e) => {selectSingle('access', 'monthly', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-center text-[11px] font-medium"><span className="lang-th">เดือนละ 1-2 ครั้ง</span><span className="lang-en hidden">1-2 times/month</span></button>
                    <button onClick={(e) => {selectSingle('access', 'rarely', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-center text-[11px] font-medium"><span className="lang-th">ไปได้นานๆ ครั้ง</span><span className="lang-en hidden">Rarely</span></button>
                    <button onClick={(e) => {selectSingle('access', 'athome', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-center text-[11px] font-medium"><span className="lang-th">ไม่สะดวก (ขอทำที่บ้าน)</span><span className="lang-en hidden">Not convenient (At-home only)</span></button>
                </div>

                <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">3. ช่วงเวลาที่คุณว่างพักผ่อน</span><span className="lang-en hidden">3. Free Time</span></h3>
                <div className="grid grid-cols-2 gap-2 mb-4" id="q-time">
                    <button onClick={(e) => {selectSingle('time', 'afterwork', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-center text-[11px] font-medium"><span className="lang-th">หลังเลิกงานวันธรรมดา</span><span className="lang-en hidden">Weekdays After Work</span></button>
                    <button onClick={(e) => {selectSingle('time', 'weekend', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-center text-[11px] font-medium"><span className="lang-th">วันหยุดสุดสัปดาห์</span><span className="lang-en hidden">Weekends</span></button>
                    <button onClick={(e) => {selectSingle('time', 'morning', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-center text-[11px] font-medium"><span className="lang-th">ตอนเช้าก่อนเริ่มงาน</span><span className="lang-en hidden">Mornings Before Work</span></button>
                    <button onClick={(e) => {selectSingle('time', 'random', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-center text-[11px] font-medium"><span className="lang-th">ไม่แน่นอนจัดสรรยาก</span><span className="lang-en hidden">Irregular / Hard to plan</span></button>
                </div>

                <div className="flex gap-2 mt-auto pt-4">
                    <button onClick={(e) => {nextStep(5)}} className="w-1/3 bg-white border border-wellnista-border text-wellnista-textDark font-medium py-3 rounded-[20px] hover:bg-slate-50 transition-colors"><span className="lang-th">กลับ</span><span className="lang-en hidden">Back</span></button>
                    <button onClick={(e) => {processData()}} id="btn-next-6" className="w-2/3 bg-wellnista-olive hover:bg-wellnista-oliveDark text-white font-medium py-3 rounded-[20px] shadow-md disabled:opacity-40 disabled:shadow-none transition-all duration-300 flex justify-center items-center gap-2" disabled><span className="lang-th">ประมวลผลด้วย AI</span><span className="lang-en hidden">Process with AI</span> <i data-lucide="sparkles" className="w-4 h-4"></i></button>
                </div>
            </div>

            {/* Step 7: Loading */}
            <div id="step-7" className="step flex-col items-center justify-center flex-1 text-center hidden">
                <div className="relative w-28 h-28 mb-10">
                    <div className="absolute inset-0 rounded-full border-[2px] border-wellnista-border"></div>
                    <div className="absolute inset-0 rounded-full border-[2px] border-wellnista-olive border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 m-auto flex items-center justify-center text-wellnista-olive animate-pulse-slow">
                        <i data-lucide="leaf" className="w-8 h-8"></i>
                    </div>
                </div>
                <div id="loading-text" className="font-serif text-sm text-wellnista-oliveDark font-bold tracking-[0.1em] mb-2 uppercase">Curating for you...</div>
                <div id="loading-sub" className="text-xs text-wellnista-textMuted font-light"><span className="lang-th">ประมวลผลข้อมูลร่างกายและจิตใจ</span><span className="lang-en hidden">Processing physical and mental data</span></div>
            </div>

            {/* Step 8: AI Result & Rating */}
            <div id="step-8" className="step flex-col flex-1 hidden">
                
                <div id="warning-banner" className="hidden bg-rose-50 border border-rose-100 rounded-2xl p-4 mb-4 flex items-start gap-3 shrink-0">
                    <i data-lucide="shield-alert" className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5"></i>
                    <div>
                        <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Medical Veto</div>
                        <div className="text-[11px] text-rose-900/70 leading-relaxed font-light"><span className="lang-th">ระบบได้คัดกรองกิจกรรมที่อาจเสี่ยงต่อสุขภาพของคุณออก (PAR-Q+)</span><span className="lang-en hidden">The system has filtered out activities that may pose health risks (PAR-Q+)</span></div>
                    </div>
                </div>
                
                <div id="home-banner" className="hidden bg-wellnista-sageLight border border-wellnista-sage/30 rounded-2xl p-4 mb-4 flex items-start gap-3 shrink-0">
                    <i data-lucide="home" className="w-5 h-5 text-wellnista-olive flex-shrink-0 mt-0.5"></i>
                    <div>
                        <div className="text-[10px] font-bold text-wellnista-oliveDark uppercase tracking-widest mb-1">At-Home Routine</div>
                        <div className="text-[11px] text-wellnista-olive leading-relaxed font-light"><span className="lang-th">เน้นเฉพาะกิจกรรมที่คุณสามารถทำได้อย่างสะดวกที่บ้าน</span><span className="lang-en hidden">Focusing exclusively on activities you can do at home</span></div>
                    </div>
                </div>

                {/* Main Recommendation */}
                <div className="bg-white border border-wellnista-border rounded-[24px] p-6 text-center mb-4 relative overflow-hidden shadow-sm shrink-0">
                    <div className="absolute top-0 left-0 w-full h-2 bg-wellnista-olive"></div>
                    
                    <div className="flex justify-center mb-4 mt-2">
                        <div id="res-score" className="px-3 py-1 bg-wellnista-sageLight text-wellnista-oliveDark border border-wellnista-sage/50 font-semibold rounded-full text-[9px] uppercase tracking-widest flex items-center gap-1.5">
                            <i data-lucide="check-circle-2" className="w-3 h-3"></i> <span id="res-score-text">98% MATCH</span>
                        </div>
                    </div>
                    
                    <div id="res-icon" className="text-5xl mb-3 text-wellnista-textDark">🧊</div>
                    <h2 id="res-title" className="text-2xl md:text-3xl font-bold font-serif text-wellnista-textDark mb-2 tracking-tight">Cold Plunge</h2>
                    <p id="res-desc" className="text-wellnista-textMuted text-[11px] md:text-xs leading-relaxed mb-4 font-light">Desc</p>
                    
                    <div className="bg-wellnista-bg rounded-2xl p-4 text-left border border-wellnista-border relative overflow-hidden">
                        <div className="text-[9px] font-bold text-wellnista-oliveDark uppercase tracking-widest mb-2 flex justify-between items-center">
                            <span className="flex items-center gap-1.5"><i data-lucide="microscope" className="w-3.5 h-3.5"></i> Science behind it</span>
                        </div>
                        <div id="res-mech" className="text-[10px] text-wellnista-textDark mt-1 font-mono leading-relaxed opacity-90">Mech</div>
                    </div>
                </div>

                {/* Alternatives */}
                <div className="mb-4 shrink-0">
                    <h3 className="text-[9px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">ตัวเลือกอื่นๆ ที่เหมาะกับคุณ</span><span className="lang-en hidden">Other Suitable Options</span></h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full snap-x" id="res-alternatives">
                        {/* Injected by JS */}
                    </div>
                </div>

                {/* Star Rating Prompt (Prominent) */}
                <div className="mt-auto bg-[#faf8ec] rounded-[24px] p-5 text-center border-2 border-wellnista-gold/30 shadow-md animate-glow relative shrink-0">
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-3 py-0.5 bg-wellnista-gold text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                        Required
                    </div>
                    <h3 className="text-xs md:text-sm font-semibold mb-2 text-wellnista-textDark font-serif"><span className="lang-th">ประสบการณ์นี้ตรงใจคุณไหม?</span><span className="lang-en hidden">Does this match your needs?</span></h3>
                    <p className="text-[9px] text-wellnista-textMuted mb-4"><span className="lang-th">โปรดให้คะแนนเพื่อดูผลวิเคราะห์ขั้นสุดท้าย</span><span className="lang-en hidden">Please rate to see the final analysis</span></p>
                    <div className="flex justify-center gap-2 md:gap-3">
                        <span className="star text-3xl md:text-4xl text-[#e0d6b8] hover:text-wellnista-gold cursor-pointer transition-transform hover:scale-110" onClick={(e) => {submitRating(1)}}><i data-lucide="star" className="w-8 h-8 md:w-10 md:h-10 fill-current"></i></span>
                        <span className="star text-3xl md:text-4xl text-[#e0d6b8] hover:text-wellnista-gold cursor-pointer transition-transform hover:scale-110" onClick={(e) => {submitRating(2)}}><i data-lucide="star" className="w-8 h-8 md:w-10 md:h-10 fill-current"></i></span>
                        <span className="star text-3xl md:text-4xl text-[#e0d6b8] hover:text-wellnista-gold cursor-pointer transition-transform hover:scale-110" onClick={(e) => {submitRating(3)}}><i data-lucide="star" className="w-8 h-8 md:w-10 md:h-10 fill-current"></i></span>
                        <span className="star text-3xl md:text-4xl text-[#e0d6b8] hover:text-wellnista-gold cursor-pointer transition-transform hover:scale-110" onClick={(e) => {submitRating(4)}}><i data-lucide="star" className="w-8 h-8 md:w-10 md:h-10 fill-current"></i></span>
                        <span className="star text-3xl md:text-4xl text-[#e0d6b8] hover:text-wellnista-gold cursor-pointer transition-transform hover:scale-110" onClick={(e) => {submitRating(5)}}><i data-lucide="star" className="w-8 h-8 md:w-10 md:h-10 fill-current"></i></span>
                    </div>
                </div>

            </div>

            {/* Step 9: User Feedback (Q14 & Q15) */}
            <div id="step-9" className="step flex-col flex-1 hidden">
                <div className="flex items-center gap-2 mb-2">
                    <i data-lucide="message-square" className="w-4 h-4 text-wellnista-sand"></i>
                    <div className="text-[10px] font-mono text-wellnista-sand tracking-widest uppercase">Your Preference</div>
                </div>
                <h2 className="text-xl font-semibold mb-2 tracking-tight text-wellnista-textDark"><span className="lang-th">คุณคิดว่ากิจกรรมอื่นน่าจะเหมาะกับคุณมากกว่าไหม?</span><span className="lang-en hidden">Do you think another activity would suit you better?</span></h2>
                <p className="text-wellnista-textMuted text-xs mb-4 font-light"><span className="lang-th">โปรดเลือกสิ่งที่คุณอยากทำที่สุดในตอนนี้ เพื่อสอน AI ให้รู้จักคุณมากขึ้น</span><span className="lang-en hidden">Please select what you want to do most right now to help train the AI</span></p>
                
                <div className="overflow-y-auto pr-1 flex-1 pb-4">
                    <h3 className="text-[9px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase border-b border-wellnista-border pb-1"><span className="lang-th">หมวดร่างกาย / พักผ่อน</span><span className="lang-en hidden">Physical / Rest</span></h3>
                    <div className="grid grid-cols-2 gap-2 mb-3" id="q-target-activity-1">
                        <button onClick={(e) => {selectSingle('targetActivity', 'perfect', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium col-span-2"><span className="lang-th">พอใจกับกิจกรรมที่แนะนำแล้ว ✨</span><span className="lang-en hidden">Satisfied with the recommendation ✨</span></button>
                        <button onClick={(e) => {selectSingle('targetActivity', 'pilates', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium">Reformer Pilates</button>
                        <button onClick={(e) => {selectSingle('targetActivity', 'muaythai', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium">Muay Thai / HIIT</button>
                        <button onClick={(e) => {selectSingle('targetActivity', 'onsen', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium">Onsen / Hot Springs</button>
                        <button onClick={(e) => {selectSingle('targetActivity', 'ice_bath', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium">Cold Plunge</button>
                    </div>

                    <h3 className="text-[9px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase border-b border-wellnista-border pb-1"><span className="lang-th">หมวดจิตใจ / ทางเลือกสงบ</span><span className="lang-en hidden">Mental / Calm</span></h3>
                    <div className="grid grid-cols-2 gap-2 mb-3" id="q-target-activity-2">
                        <button onClick={(e) => {selectSingle('targetActivity', 'sound_bath', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium">Sound Bath</button>
                        <button onClick={(e) => {selectSingle('targetActivity', 'clay_art', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium">Clay Art Workshop</button>
                    </div>

                    <h3 className="text-[9px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase border-b border-wellnista-border pb-1"><span className="lang-th">หมวดคอมมูนิตี้ & เติบโต</span><span className="lang-en hidden">Community & Growth</span></h3>
                    <div className="grid grid-cols-2 gap-2 mb-4" id="q-target-activity-3">
                        <button onClick={(e) => {selectSingle('targetActivity', 'boardgame', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium">Board Game Club</button>
                        <button onClick={(e) => {selectSingle('targetActivity', 'selfdev', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium">Self-Development</button>
                        <button onClick={(e) => {selectSingle('targetActivity', 'business', e.currentTarget)}} className="option-btn p-2 rounded-xl text-center text-[10px] font-medium col-span-2">Business & Networking</button>
                    </div>

                    <h3 className="text-[10px] font-medium text-wellnista-textMuted mb-2 tracking-wide uppercase"><span className="lang-th">เหตุผลหลักคืออะไร?</span><span className="lang-en hidden">What is the main reason?</span></h3>
                    <div className="grid grid-cols-1 gap-2" id="q-target-reason">
                        <button onClick={(e) => {selectSingle('targetReason', 'perfect', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left text-[10px] font-medium flex items-center gap-2"><i data-lucide="check-circle-2" className="w-4 h-4 text-wellnista-sage shrink-0"></i> <span className="lang-th">ผลลัพธ์ตรงกับความต้องการที่สุด</span><span className="lang-en hidden">Recommendation perfectly matches my needs</span></button>
                        <button onClick={(e) => {selectSingle('targetReason', 'physical', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left text-[10px] font-medium flex items-center gap-2"><i data-lucide="activity-square" className="w-4 h-4 text-wellnista-sage shrink-0"></i> <span className="lang-th">บรรเทาอาการปวดเมื่อยทางกาย</span><span className="lang-en hidden">Relieve physical aches</span></button>
                        <button onClick={(e) => {selectSingle('targetReason', 'mental', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left text-[10px] font-medium flex items-center gap-2"><i data-lucide="cloud-off" className="w-4 h-4 text-wellnista-sage shrink-0"></i> <span className="lang-th">ระบายความเครียด หนีความวุ่นวาย</span><span className="lang-en hidden">Relieve stress, escape chaos</span></button>
                        <button onClick={(e) => {selectSingle('targetReason', 'stimulation', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left text-[10px] font-medium flex items-center gap-2"><i data-lucide="zap" className="w-4 h-4 text-wellnista-sage shrink-0"></i> <span className="lang-th">ต้องการพลังงาน ความท้าทายใหม่</span><span className="lang-en hidden">Need energy, new challenges</span></button>
                        <button onClick={(e) => {selectSingle('targetReason', 'growth', e.currentTarget)}} className="option-btn p-3 rounded-2xl text-left text-[10px] font-medium flex items-center gap-2"><i data-lucide="users" className="w-4 h-4 text-wellnista-sage shrink-0"></i> <span className="lang-th">พัฒนาตัวเอง เรียนรู้และหาเพื่อนใหม่</span><span className="lang-en hidden">Self-development, learn, meet friends</span></button>
                    </div>
                </div>

                <div className="mt-2 shrink-0">
                    <button onClick={(e) => {processUserChoice()}} id="btn-next-9" className="w-full bg-wellnista-olive hover:bg-wellnista-oliveDark text-white font-medium py-3 md:py-4 rounded-[20px] shadow-md disabled:opacity-40 disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-2" disabled><span className="lang-th">เสร็จสิ้น</span><span className="lang-en hidden">Finish</span> <i data-lucide="check-circle" className="w-4 h-4"></i></button>
                </div>
            </div>

            {/* Step 10: Thank you */}
            <div id="step-10" className="step flex-col items-center justify-center flex-1 text-center hidden">
                <div className="mb-8 flex justify-center mt-6">
                    <div className="w-20 h-20 bg-wellnista-sageLight rounded-full flex items-center justify-center border border-wellnista-sage/30 relative">
                        <i data-lucide="heart" className="w-10 h-10 text-wellnista-olive stroke-[2.5] fill-wellnista-sageLight"></i>
                    </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-wellnista-textDark font-serif">Thank You</h2>
                <p className="text-wellnista-textMuted text-xs md:text-sm mb-10 font-light leading-relaxed max-w-[280px] mx-auto"><span className="lang-th">ขอบคุณที่ให้ข้อมูลเพิ่มเติม<br />ความคิดเห็นของคุณช่วยให้เราออกแบบ Wellness Lifestyle ได้ตอบโจทย์คุณมากยิ่งขึ้น</span><span className="lang-en hidden">Thank you for the extra info<br />Your feedback helps us design a Wellness Lifestyle that better suits you</span></p>
                <button onClick={(e) => {resetApp()}} className="w-full mt-auto bg-white border border-wellnista-border text-wellnista-textDark hover:bg-slate-50 rounded-[20px] py-4 font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
                    <i data-lucide="rotate-ccw" className="w-4 h-4"></i> <span className="lang-th">ทำแบบประเมินอีกครั้ง</span><span className="lang-en hidden">Retake Assessment</span>
                </button>
            </div>

        </main>
    </div>

    
    </div>
  );
}
