// 🎓 COMPLETE INTERACTIVE LEARNING WITH AI VOICE SYSTEM
// Full educational content + Voice interaction for each skill

console.log('🎓 Loading Complete Learning System with AI Voice...');

// ============================================
// COMPREHENSIVE LEARNING CONTENT DATABASE
// ============================================
const COMPLETE_LEARNING_CONTENT = {
    'basics': {
        skillName: 'Electronics Basics',
        icon: '⚡',
        totalConcepts: 8,
        estimatedTime: '45 minutes',
        difficulty: 'Beginner',
        concepts: [
            {
                id: 1,
                title: 'What is Electronics?',
                duration: '5 min',
                content: 'Electronics is the branch of physics and engineering dealing with electron behavior and effects. It includes circuits, components, and systems that control electrical energy.',
                keyPoints: [
                    'Electronics uses electrical energy to perform tasks',
                    'Voltage (V) = Electrical pressure measured in Volts',
                    'Current (I) = Flow of electrons measured in Amperes',
                    'Resistance (R) = Opposition to current measured in Ohms',
                    'Power (P) = Rate of energy use measured in Watts'
                ],
                examples: [
                    '🔦 Flashlight: Battery provides voltage, LED converts to light',
                    '📱 Phone: Complex electronics process signals',
                    '💡 Light bulb: Converts electrical energy to light and heat'
                ],
                quiz: [
                    { q: 'What is voltage?', a: 'Electrical pressure that pushes electrons through a circuit' },
                    { q: 'What is current?', a: 'The flow of electrons through a conductor' },
                    { q: 'What unit measures resistance?', a: 'Ohms (Ω)' }
                ],
                practiceTask: 'Identify voltage, current, and resistance in a simple flashlight circuit'
            },
            {
                id: 2,
                title: 'Understanding Voltage, Current & Resistance',
                duration: '6 min',
                content: 'These three properties form the foundation of electronics. Voltage pushes, current flows, and resistance opposes.',
                keyPoints: [
                    'Voltage (V) = Potential difference between two points',
                    'Current (I) = Rate of electron flow (Coulombs per second)',
                    'Resistance (R) = Material property that opposes flow',
                    'Relationship: V = I × R (Ohm\'s Law)',
                    'Power = Voltage × Current (P = V × I)'
                ],
                formula: 'V = I × R (Ohm\'s Law)',
                visualAid: 'Water analogy: Voltage = Pressure, Current = Flow rate, Resistance = Pipe width',
                examples: [
                    '🔋 9V battery creates 9 volts of pressure',
                    '⚡ 1A current = 1 Coulomb of charge per second',
                    '▭ 1kΩ resistor significantly reduces current'
                ],
                quiz: [
                    { q: 'If voltage increases, what happens to current?', a: 'Current increases (if resistance stays same)' },
                    { q: 'What happens if resistance increases?', a: 'Current decreases (if voltage stays same)' }
                ]
            },
            {
                id: 3,
                title: 'Electronic Components Overview',
                duration: '7 min',
                content: 'Circuits are built from various components, each serving a specific purpose.',
                keyPoints: [
                    '🔋 Battery/Power Supply: Provides voltage',
                    '▭ Resistor: Limits current, drops voltage',
                    '⫴ Capacitor: Stores charge, blocks DC, passes AC',
                    '🌀 Inductor: Stores energy in magnetic field',
                    '▷ Diode: Allows current one direction only',
                    '💡 LED: Light Emitting Diode',
                    '⚡ Transistor: Amplifies or switches signals',
                    '⎋ Switch: Opens/closes circuit'
                ],
                examples: [
                    'LED circuit: Battery + Resistor + LED',
                    'Capacitor smooths voltage fluctuations',
                    'Diode protects against reverse polarity'
                ]
            },
            {
                id: 4,
                title: 'Series vs Parallel Circuits',
                duration: '6 min',
                content: 'Components can connect in series (one after another) or parallel (side by side), each with different properties.',
                keyPoints: [
                    '📏 Series: Same current everywhere, voltages add',
                    '📏 Series R_total = R1 + R2 + R3...',
                    '∥ Parallel: Same voltage, currents add',
                    '∥ Parallel 1/R_total = 1/R1 + 1/R2 + 1/R3...',
                    'Series: One break stops all',
                    'Parallel: Each branch independent'
                ],
                examples: [
                    'Christmas lights in series',
                    'Home outlets in parallel',
                    'Two 100Ω resistors in series = 200Ω',
                    'Two 100Ω resistors in parallel = 50Ω'
                ]
            }
        ]
    },
    
    'ohmslaw': {
        skillName: "Ohm's Law",
        icon: '⚡',
        totalConcepts: 5,
        estimatedTime: '30 minutes',
        difficulty: 'Beginner',
        concepts: [
            {
                id: 1,
                title: 'The Foundation: V = I × R',
                duration: '6 min',
                content: 'Ohm\'s Law is the most fundamental equation in electronics, relating voltage, current, and resistance.',
                formula: 'V = I × R',
                keyPoints: [
                    'V (Voltage) in Volts',
                    'I (Current) in Amperes',
                    'R (Resistance) in Ohms',
                    'Knowing any two → Calculate the third',
                    'Works for DC and AC (resistive loads)'
                ],
                examples: [
                    'V=12V, R=4Ω → I = 12/4 = 3A',
                    'I=2A, R=10Ω → V = 2×10 = 20V',
                    'V=5V, I=0.5A → R = 5/0.5 = 10Ω'
                ],
                quiz: [
                    { q: 'If V=24V and R=8Ω, what is I?', a: 'I = V/R = 24/8 = 3A' },
                    { q: 'If I=5A and R=2Ω, what is V?', a: 'V = I×R = 5×2 = 10V' }
                ],
                practiceProblems: [
                    { V: '9V', R: '3Ω', I: '?' },
                    { V: '12V', I: '2A', R: '?' },
                    { I: '0.5A', R: '100Ω', V: '?' }
                ]
            },
            {
                id: 2,
                title: 'Calculating Voltage',
                duration: '5 min',
                formula: 'V = I × R',
                content: 'When you know current and resistance, multiply them to find voltage.',
                examples: [
                    'LED circuit: I=20mA, R=220Ω → V = 0.02 × 220 = 4.4V',
                    'Heater: I=10A, R=12Ω → V = 10 × 12 = 120V'
                ],
                practiceProblems: [
                    { I: '3A', R: '15Ω', answer: '45V' },
                    { I: '0.05A', R: '1000Ω', answer: '50V' }
                ]
            },
            {
                id: 3,
                title: 'Calculating Current',
                duration: '5 min',
                formula: 'I = V / R',
                content: 'Divide voltage by resistance to find current.',
                examples: [
                    'LED circuit: V=5V, R=250Ω → I = 5/250 = 0.02A = 20mA',
                    'Motor: V=12V, R=6Ω → I = 12/6 = 2A'
                ]
            },
            {
                id: 4,
                title: 'Calculating Resistance',
                duration: '5 min',
                formula: 'R = V / I',
                content: 'Divide voltage by current to find resistance.',
                examples: [
                    'Unknown resistor: V=9V, I=0.03A → R = 9/0.03 = 300Ω',
                    'Light bulb: V=120V, I=0.5A → R = 120/0.5 = 240Ω'
                ]
            },
            {
                id: 5,
                title: 'Power Calculations',
                duration: '7 min',
                content: 'Power is how fast energy is used or generated.',
                formula: 'P = V × I = I² × R = V² / R',
                keyPoints: [
                    'Power (P) in Watts (W)',
                    'P = V × I (basic formula)',
                    'P = I² × R (current squared)',
                    'P = V² / R (voltage squared)',
                    '1W = 1 Joule per second'
                ],
                examples: [
                    '💡 Bulb: V=120V, I=0.5A → P = 60W',
                    '▭ Resistor: I=3A, R=4Ω → P = 9 × 4 = 36W',
                    '🔌 Device: V=12V, R=6Ω → P = 144/6 = 24W'
                ]
            }
        ]
    }
};

// ============================================
// AI VOICE LEARNING ASSISTANT
// ============================================
class AIVoiceAssistant {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.voiceEnabled = true;
        this.currentSkill = null;
        this.currentConceptIndex = 0;
        this.setupVoiceRecognition();
    }
    
    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('🎤 You said:', transcript);
                this.processCommand(transcript);
            };
            
            this.recognition.onerror = (error) => {
                console.error('Speech error:', error);
                this.isListening = false;
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateMicButton();
            };
            
            console.log('✅ Voice recognition ready!');
        } else {
            console.warn('⚠️ Voice not supported in this browser');
        }
    }
    
    speak(text, interrupt = false) {
        if (!this.voiceEnabled) return;
        
        if (interrupt) {
            this.synthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        const voices = this.synthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;
        
        this.synthesis.speak(utterance);
    }
    
    startListening() {
        if (!this.recognition) {
            alert('Voice not supported. Use Chrome or Edge browser.');
            return;
        }
        
        if (!this.isListening) {
            this.recognition.start();
            this.isListening = true;
            this.updateMicButton();
            this.speak('Yes, I am listening. What would you like to know?', true);
        }
    }
    
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateMicButton();
        }
    }
    
    processCommand(command) {
        const cmd = command.toLowerCase();
        
        // Navigation commands
        if (cmd.includes('next') || cmd.includes('continue')) {
            this.nextConcept();
        }
        else if (cmd.includes('previous') || cmd.includes('back')) {
            this.previousConcept();
        }
        else if (cmd.includes('repeat') || cmd.includes('again')) {
            this.repeatConcept();
        }
        
        // Content requests
        else if (cmd.includes('explain') || cmd.includes('tell me about')) {
            this.explainCurrent();
        }
        else if (cmd.includes('example')) {
            this.giveExamples();
        }
        else if (cmd.includes('formula')) {
            this.tellFormula();
        }
        else if (cmd.includes('quiz') || cmd.includes('question')) {
            this.askQuiz();
        }
        else if (cmd.includes('key point')) {
            this.readKeyPoints();
        }
        
        // Help
        else if (cmd.includes('help') || cmd.includes('command')) {
            this.showHelp();
        }
        
        // Default: Try to answer
        else {
            this.answerQuestion(command);
        }
    }
    
    loadSkill(skillId) {
        this.currentSkill = COMPLETE_LEARNING_CONTENT[skillId];
        this.currentConceptIndex = 0;
        
        if (this.currentSkill) {
            const intro = `Welcome to ${this.currentSkill.skillName}! This module has ${this.currentSkill.totalConcepts} concepts and takes about ${this.currentSkill.estimatedTime}. You can ask me to explain, give examples, or test you with a quiz. Say "help" anytime for commands.`;
            this.speak(intro);
            this.displayConcept();
        }
    }
    
    displayConcept() {
        if (!this.currentSkill) return;
        
        const concept = this.currentSkill.concepts[this.currentConceptIndex];
        const modal = this.createConceptModal();
        
        modal.innerHTML = `
            <div class="learning-modal-header">
                <div>
                    <span class="skill-badge">${this.currentSkill.icon} ${this.currentSkill.skillName}</span>
                    <span class="concept-progress">Concept ${this.currentConceptIndex + 1}/${this.currentSkill.totalConcepts}</span>
                </div>
                <button class="close-modal-btn" onclick="aiVoice.closeModal()">✕</button>
            </div>
            
            <div class="learning-modal-content">
                <h2 class="concept-title">${concept.title}</h2>
                <span class="concept-duration">⏱️ ${concept.duration}</span>
                
                <div class="concept-main-content">
                    <p class="concept-text">${concept.content}</p>
                </div>
                
                ${concept.formula ? `
                    <div class="formula-box">
                        <div class="formula-label">📐 Formula</div>
                        <div class="formula-text">${concept.formula}</div>
                    </div>
                ` : ''}
                
                ${concept.keyPoints ? `
                    <div class="key-points-box">
                        <h3>🎯 Key Points</h3>
                        <ul class="key-points-list">
                            ${concept.keyPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${concept.examples ? `
                    <div class="examples-box">
                        <h3>💡 Examples</h3>
                        <ul class="examples-list">
                            ${concept.examples.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${concept.quiz ? `
                    <div class="quiz-box">
                        <h3>❓ Practice Questions</h3>
                        ${concept.quiz.map(q => `
                            <div class="quiz-item">
                                <div class="quiz-q"><strong>Q:</strong> ${q.q}</div>
                                <div class="quiz-a"><strong>A:</strong> ${q.a}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="learning-modal-footer">
                <button class="voice-btn ${this.isListening ? 'listening' : ''}" onclick="aiVoice.startListening()">
                    ${this.isListening ? '🎤 Listening...' : '🎤 Ask AI'}
                </button>
                <button class="read-btn" onclick="aiVoice.readConcept()">
                    🔊 Read Aloud
                </button>
                <div class="nav-buttons">
                    <button onclick="aiVoice.previousConcept()" ${this.currentConceptIndex === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button onclick="aiVoice.nextConcept()" ${this.currentConceptIndex === this.currentSkill.concepts.length - 1 ? 'disabled' : ''}>
                        Next →
                    </button>
                </div>
            </div>
        `;
    }
    
    createConceptModal() {
        let modal = document.getElementById('learningModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'learningModal';
            modal.className = 'learning-modal';
            document.body.appendChild(modal);
        }
        modal.style.display = 'block';
        return modal;
    }
    
    closeModal() {
        const modal = document.getElementById('learningModal');
        if (modal) modal.style.display = 'none';
        this.synthesis.cancel();
    }
    
    nextConcept() {
        if (!this.currentSkill) return;
        
        if (this.currentConceptIndex < this.currentSkill.concepts.length - 1) {
            this.currentConceptIndex++;
            this.displayConcept();
            const concept = this.currentSkill.concepts[this.currentConceptIndex];
            this.speak(`Moving to concept ${this.currentConceptIndex + 1}: ${concept.title}`);
        } else {
            this.speak('You have completed all concepts in this module! Great job!');
        }
    }
    
    previousConcept() {
        if (!this.currentSkill) return;
        
        if (this.currentConceptIndex > 0) {
            this.currentConceptIndex--;
            this.displayConcept();
            const concept = this.currentSkill.concepts[this.currentConceptIndex];
            this.speak(`Going back to concept ${this.currentConceptIndex + 1}: ${concept.title}`);
        } else {
            this.speak('This is the first concept.');
        }
    }
    
    repeatConcept() {
        this.readConcept();
    }
    
    readConcept() {
        if (!this.currentSkill) return;
        
        const concept = this.currentSkill.concepts[this.currentConceptIndex];
        let text = `${concept.title}. ${concept.content}`;
        
        if (concept.formula) {
            text += ` The formula is: ${concept.formula}.`;
        }
        
        this.speak(text, true);
    }
    
    explainCurrent() {
        this.readConcept();
    }
    
    giveExamples() {
        if (!this.currentSkill) return;
        
        const concept = this.currentSkill.concepts[this.currentConceptIndex];
        if (concept.examples && concept.examples.length > 0) {
            this.speak('Here are some examples:', true);
            concept.examples.forEach((ex, i) => {
                setTimeout(() => this.speak(`Example ${i + 1}: ${ex}`), (i + 1) * 3500);
            });
        } else {
            this.speak('No examples available for this concept.');
        }
    }
    
    tellFormula() {
        if (!this.currentSkill) return;
        
        const concept = this.currentSkill.concepts[this.currentConceptIndex];
        if (concept.formula) {
            this.speak(`The formula is: ${concept.formula}`, true);
        } else {
            this.speak('There is no specific formula for this concept.');
        }
    }
    
    readKeyPoints() {
        if (!this.currentSkill) return;
        
        const concept = this.currentSkill.concepts[this.currentConceptIndex];
        if (concept.keyPoints && concept.keyPoints.length > 0) {
            this.speak('Here are the key points:', true);
            concept.keyPoints.forEach((point, i) => {
                setTimeout(() => this.speak(`Point ${i + 1}: ${point}`), (i + 1) * 3000);
            });
        } else {
            this.speak('No key points available.');
        }
    }
    
    askQuiz() {
        if (!this.currentSkill) return;
        
        const concept = this.currentSkill.concepts[this.currentConceptIndex];
        if (concept.quiz && concept.quiz.length > 0) {
            const q = concept.quiz[Math.floor(Math.random() * concept.quiz.length)];
            this.speak(`Question: ${q.q}`, true);
            setTimeout(() => this.speak(`The answer is: ${q.a}`), 4000);
        } else {
            this.speak('No quiz questions available for this concept.');
        }
    }
    
    showHelp() {
        const help = 'You can say: Explain this, Give examples, Next concept, Previous concept, Read key points, Ask me a question, What is the formula, Repeat, Help.';
        this.speak(help, true);
    }
    
    answerQuestion(question) {
        // Simple keyword-based answering
        const concept = this.currentSkill?.concepts[this.currentConceptIndex];
        if (!concept) return;
        
        const q = question.toLowerCase();
        
        // Check if question contains keywords from content
        if (concept.keyPoints) {
            const matchingPoint = concept.keyPoints.find(p => 
                q.split(' ').some(word => p.toLowerCase().includes(word))
            );
            
            if (matchingPoint) {
                this.speak(matchingPoint, true);
                return;
            }
        }
        
        // Default response
        this.speak('Let me explain the current concept. ' + concept.content, true);
    }
    
    updateMicButton() {
        const btn = document.querySelector('.voice-btn');
        if (btn) {
            btn.innerHTML = this.isListening ? '🎤 Listening...' : '🎤 Ask AI';
            btn.classList.toggle('listening', this.isListening);
        }
    }
    
    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        this.speak(this.voiceEnabled ? 'Voice enabled' : 'Voice disabled', true);
    }
}

// Initialize
const aiVoice = new AIVoiceAssistant();
window.aiVoice = aiVoice;
window.COMPLETE_LEARNING_CONTENT = COMPLETE_LEARNING_CONTENT;

console.log('✅ AI Voice Learning System Ready!');
console.log('📚 Available modules:', Object.keys(COMPLETE_LEARNING_CONTENT));
