// ============================================
// 💼 ADVANCED PROJECT MARKETPLACE SYSTEM
// Real project building + Mentor integration + AI assistance
// ============================================

console.log('💼 Loading Advanced Project Marketplace...');

// ============================================
// PROJECT DATA WITH MENTOR INTEGRATION
// ============================================
const ADVANCED_PROJECTS = [
    {
        id: 'led_basic',
        title: 'Simple LED Circuit',
        difficulty: 'beginner',
        category: 'analog',
        xp: 100,
        duration: '10 min',
        description: 'Build your first LED circuit with current limiting resistor. Learn Ohm\'s law practically.',
        learningOutcomes: [
            'Understand Ohm\'s Law (V = I × R)',
            'Calculate current limiting resistor',
            'Identify LED polarity',
            'Build basic series circuit'
        ],
        components: ['Battery 9V', 'Resistor 470Ω', 'Red LED', 'Wires'],
        mentorAvailable: true,
        mentorName: 'Dr. John Smith',
        mentorSpecialty: 'Analog Circuits',
        meetingLinks: {
            zoom: 'https://zoom.us/j/led-circuit-mentor',
            googleMeet: 'https://meet.google.com/led-circuit',
            webex: 'https://webex.com/meet/led-circuit'
        },
        aiTutor: {
            available: true,
            topics: ['Ohm\'s Law', 'LED specifications', 'Resistor calculation', 'Circuit debugging']
        },
        steps: [
            {
                step: 1,
                instruction: 'Calculate the required resistor value using Ohm\'s Law',
                formula: 'R = (Vsource - VLED) / ILED',
                hint: 'Battery = 9V, LED forward voltage = 2V, LED current = 20mA',
                answer: '350Ω (use 470Ω standard value)',
                aiHelp: 'Ask AI: "How to calculate resistor for LED?"'
            },
            {
                step: 2,
                instruction: 'Identify LED polarity',
                hint: 'Long leg = Anode (+), Short leg = Cathode (-)',
                aiHelp: 'Ask AI: "Which way does LED connect?"'
            },
            {
                step: 3,
                instruction: 'Connect circuit: Battery (+) → Resistor → LED (+) → LED (-) → Battery (-)',
                hint: 'Follow the current flow from positive to negative',
                aiHelp: 'Ask AI: "Show me LED circuit connection"'
            },
            {
                step: 4,
                instruction: 'Test your circuit and measure voltage/current',
                expectedResult: 'LED should glow, current ≈ 15-20mA',
                aiHelp: 'Ask AI: "Why is my LED not glowing?"'
            }
        ],
        autoGrading: {
            enabled: true,
            checkpoints: [
                { check: 'hasResistor', points: 25, message: 'Resistor present' },
                { check: 'correctResistorValue', points: 25, message: 'Correct resistor value (350-1000Ω)' },
                { check: 'ledConnected', points: 25, message: 'LED properly connected' },
                { check: 'currentInRange', points: 25, message: 'Current 10-25mA' }
            ]
        }
    },
    {
        id: 'voltage_divider',
        title: 'Voltage Divider Network',
        difficulty: 'beginner',
        category: 'analog',
        xp: 200,
        duration: '15 min',
        description: 'Design a voltage divider to get specific output voltage. Master voltage division formula.',
        learningOutcomes: [
            'Understand voltage division principle',
            'Calculate resistor ratios',
            'Design for specific output voltage',
            'Measure with multimeter'
        ],
        components: ['DC Power 12V', 'Resistor 1kΩ (x2)', 'Multimeter'],
        mentorAvailable: true,
        mentorName: 'Prof. Sarah Lee',
        mentorSpecialty: 'Circuit Analysis',
        meetingLinks: {
            zoom: 'https://zoom.us/j/voltage-divider-mentor',
            googleMeet: 'https://meet.google.com/voltage-divider',
            webex: 'https://webex.com/meet/voltage-divider'
        },
        aiTutor: {
            available: true,
            topics: ['Voltage division', 'Resistor selection', 'Power calculations', 'Load effects']
        },
        steps: [
            {
                step: 1,
                instruction: 'Calculate resistor values for 6V output from 12V input',
                formula: 'Vout = Vin × (R2 / (R1 + R2))',
                hint: 'For 50% division, use R1 = R2',
                answer: 'R1 = R2 = 1kΩ',
                aiHelp: 'Ask AI: "How to design voltage divider for 6V from 12V?"'
            },
            {
                step: 2,
                instruction: 'Build the circuit on virtual lab',
                hint: 'Connect resistors in series between power supply terminals',
                aiHelp: 'Ask AI: "Show voltage divider circuit diagram"'
            },
            {
                step: 3,
                instruction: 'Measure output voltage between R1 and R2',
                expectedResult: 'Vout = 6V (±0.5V)',
                aiHelp: 'Ask AI: "Why is my voltage not exactly 6V?"'
            }
        ],
        autoGrading: {
            enabled: true,
            checkpoints: [
                { check: 'hasTwoResistors', points: 30, message: 'Two resistors used' },
                { check: 'correctRatio', points: 40, message: 'Correct resistor ratio for Vout' },
                { check: 'outputVoltageCorrect', points: 30, message: 'Output voltage within ±10%' }
            ]
        }
    },
    {
        id: 'transistor_switch',
        title: 'Transistor as Switch',
        difficulty: 'intermediate',
        category: 'analog',
        xp: 400,
        duration: '30 min',
        description: 'Learn to use NPN transistor as electronic switch to control high-power load.',
        learningOutcomes: [
            'Understand transistor switching operation',
            'Calculate base resistor value',
            'Control LED/Motor with transistor',
            'Design switch circuits'
        ],
        components: ['NPN Transistor (2N2222)', 'Resistor 1kΩ', 'LED + 470Ω Resistor', 'DC Power 9V'],
        mentorAvailable: true,
        mentorName: 'Eng. Mike Chen',
        mentorSpecialty: 'Power Electronics',
        meetingLinks: {
            zoom: 'https://zoom.us/j/transistor-mentor',
            googleMeet: 'https://meet.google.com/transistor',
            webex: 'https://webex.com/meet/transistor'
        },
        aiTutor: {
            available: true,
            topics: ['Transistor basics', 'Base resistor calculation', 'Saturation mode', 'Applications']
        },
        steps: [
            {
                step: 1,
                instruction: 'Calculate base resistor for switching 100mA load',
                formula: 'RB = (Vin - VBE) / IB, where IB = IC / 10 (for saturation)',
                hint: 'VBE = 0.7V, β = 100, IC = 100mA',
                answer: 'RB = 430Ω (use 470Ω)',
                aiHelp: 'Ask AI: "How to calculate transistor base resistor?"'
            },
            {
                step: 2,
                instruction: 'Build transistor switch circuit',
                hint: 'Input → Base Resistor → Base, Collector → Load → VCC, Emitter → GND',
                aiHelp: 'Ask AI: "Show NPN transistor switch circuit"'
            },
            {
                step: 3,
                instruction: 'Test switching: Apply 5V at input, LED should glow',
                expectedResult: 'LED glows when input HIGH, off when input LOW',
                aiHelp: 'Ask AI: "Transistor not switching properly"'
            }
        ],
        autoGrading: {
            enabled: true,
            checkpoints: [
                { check: 'hasTransistor', points: 25, message: 'Transistor present' },
                { check: 'baseResistorCorrect', points: 25, message: 'Base resistor 400-1000Ω' },
                { check: 'loadConnected', points: 25, message: 'Load at collector' },
                { check: 'switchingWorks', points: 25, message: 'Proper switching operation' }
            ]
        }
    },
    {
        id: 'and_gate',
        title: 'AND Gate Circuit',
        difficulty: 'intermediate',
        category: 'digital',
        xp: 300,
        duration: '20 min',
        description: 'Build 2-input AND gate and verify truth table with logic analyzer.',
        learningOutcomes: [
            'Understand AND gate logic',
            'Build gate from transistors/diodes',
            'Verify truth table',
            'Use logic analyzer'
        ],
        components: ['AND Gate IC', 'LEDs (3)', 'Resistors 470Ω (3)', 'Switches (2)', 'DC Power 5V'],
        mentorAvailable: true,
        mentorName: 'Dr. Emily Wang',
        mentorSpecialty: 'Digital Logic',
        meetingLinks: {
            zoom: 'https://zoom.us/j/logic-gates-mentor',
            googleMeet: 'https://meet.google.com/logic-gates',
            webex: 'https://webex.com/meet/logic-gates'
        },
        aiTutor: {
            available: true,
            topics: ['Logic gates', 'Boolean algebra', 'Truth tables', 'IC pinouts']
        },
        steps: [
            {
                step: 1,
                instruction: 'Connect AND gate IC with proper power supply',
                hint: 'VCC to pin 14, GND to pin 7 (typical 7408 IC)',
                aiHelp: 'Ask AI: "Show AND gate IC pinout"'
            },
            {
                step: 2,
                instruction: 'Connect inputs A and B with switches, output to LED',
                aiHelp: 'Ask AI: "AND gate circuit diagram with switches"'
            },
            {
                step: 3,
                instruction: 'Verify truth table: Test all 4 input combinations',
                expectedResult: 'Output HIGH only when both inputs HIGH',
                truthTable: '00→0, 01→0, 10→0, 11→1',
                aiHelp: 'Ask AI: "Explain AND gate truth table"'
            }
        ],
        autoGrading: {
            enabled: true,
            checkpoints: [
                { check: 'gateConnected', points: 20, message: 'AND gate properly powered' },
                { check: 'inputsConnected', points: 20, message: 'Two inputs configured' },
                { check: 'outputWorks', points: 20, message: 'Output LED connected' },
                { check: 'truthTableCorrect', points: 40, message: 'All 4 cases verified' }
            ]
        }
    },
    {
        id: 'full_adder',
        title: '1-bit Full Adder',
        difficulty: 'advanced',
        category: 'digital',
        xp: 800,
        duration: '40 min',
        description: 'Design complete 1-bit full adder using basic logic gates. Implement carry propagation.',
        learningOutcomes: [
            'Understand binary addition',
            'Design combinational logic circuits',
            'Implement sum and carry outputs',
            'Test with all input combinations'
        ],
        components: ['XOR Gates (2)', 'AND Gates (2)', 'OR Gate (1)', 'LEDs (2)', 'Switches (3)'],
        mentorAvailable: true,
        mentorName: 'Prof. David Kumar',
        mentorSpecialty: 'Digital Systems',
        meetingLinks: {
            zoom: 'https://zoom.us/j/adder-circuits-mentor',
            googleMeet: 'https://meet.google.com/adder-circuits',
            webex: 'https://webex.com/meet/adder-circuits'
        },
        aiTutor: {
            available: true,
            topics: ['Binary addition', 'Full adder design', 'Karnaugh maps', 'Boolean simplification']
        },
        steps: [
            {
                step: 1,
                instruction: 'Design full adder logic using gates',
                formula: 'Sum = A ⊕ B ⊕ Cin, Carry = (A·B) + (Cin·(A⊕B))',
                hint: 'Use 2 XOR, 2 AND, 1 OR gate',
                aiHelp: 'Ask AI: "Full adder circuit design step by step"'
            },
            {
                step: 2,
                instruction: 'Connect gates according to full adder logic',
                aiHelp: 'Ask AI: "Show full adder gate diagram"'
            },
            {
                step: 3,
                instruction: 'Test all 8 input combinations (000 to 111)',
                expectedResult: 'Correct sum and carry for all cases',
                truthTable: '000→00, 001→01, 010→01, 011→10, 100→01, 101→10, 110→10, 111→11',
                aiHelp: 'Ask AI: "Full adder truth table explanation"'
            }
        ],
        autoGrading: {
            enabled: true,
            checkpoints: [
                { check: 'hasAllGates', points: 20, message: '5 gates used correctly' },
                { check: 'sumOutputCorrect', points: 40, message: 'Sum output works for all inputs' },
                { check: 'carryOutputCorrect', points: 40, message: 'Carry output works for all inputs' }
            ]
        }
    },
    {
        id: '4bit_alu',
        title: '4-bit Arithmetic Logic Unit',
        difficulty: 'master',
        category: 'digital',
        xp: 2000,
        duration: '60 min',
        description: 'Build complete 4-bit ALU with ADD, SUB, AND, OR operations. Implement operation selector.',
        learningOutcomes: [
            'Understand ALU architecture',
            'Design multi-operation circuit',
            'Implement operation selector',
            'Handle overflow and flags'
        ],
        components: ['Full Adders (4)', 'Logic Gates (16+)', 'Multiplexers (4)', '7-Segment Display'],
        mentorAvailable: true,
        mentorName: 'Dr. Robert Wilson',
        mentorSpecialty: 'Computer Architecture',
        meetingLinks: {
            zoom: 'https://zoom.us/j/alu-design-mentor',
            googleMeet: 'https://meet.google.com/alu-design',
            webex: 'https://webex.com/meet/alu-design'
        },
        aiTutor: {
            available: true,
            topics: ['ALU architecture', 'Ripple carry adder', 'Operation encoding', 'Flag generation']
        },
        steps: [
            {
                step: 1,
                instruction: 'Design 4-bit ripple carry adder',
                hint: 'Chain 4 full adders with carry propagation',
                aiHelp: 'Ask AI: "4-bit adder design with full adders"'
            },
            {
                step: 2,
                instruction: 'Add operation selector using multiplexers',
                hint: 'Use 2-bit selector: 00=ADD, 01=SUB, 10=AND, 11=OR',
                aiHelp: 'Ask AI: "ALU operation selector design"'
            },
            {
                step: 3,
                instruction: 'Implement all 4 operations and test',
                expectedResult: 'Correct output for ADD, SUB, AND, OR operations',
                aiHelp: 'Ask AI: "How to test ALU functionality?"'
            },
            {
                step: 4,
                instruction: 'Add overflow detection and zero flag',
                aiHelp: 'Ask AI: "ALU flag generation circuit"'
            }
        ],
        autoGrading: {
            enabled: true,
            checkpoints: [
                { check: 'adderWorks', points: 30, message: '4-bit addition working' },
                { check: 'subtractorWorks', points: 30, message: 'Subtraction working' },
                { check: 'andOrWorks', points: 20, message: 'AND/OR operations working' },
                { check: 'selectorWorks', points: 20, message: 'Operation selector functional' }
            ]
        }
    }
];

// ============================================
// PROJECT MANAGER CLASS
// ============================================
class ProjectManager {
    constructor() {
        this.currentProject = null;
        this.currentStep = 0;
        this.projectState = {
            started: false,
            completed: false,
            score: 0,
            hints: 0,
            aiQueries: 0,
            mentorSessions: 0
        };
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.attachEventListeners();
        console.log('✅ Project Manager initialized');
    }
    
    renderProjects() {
        const grid = document.querySelector('.projects-grid');
        if (!grid) return;
        
        grid.innerHTML = ADVANCED_PROJECTS.map(project => `
            <div class="project-card enhanced" data-difficulty="${project.difficulty}" data-id="${project.id}">
                <div class="project-header">
                    <div class="project-badge ${project.difficulty}">${project.difficulty}</div>
                    <div class="project-category">${project.category}</div>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                
                <div class="project-outcomes">
                    <strong>📚 You'll Learn:</strong>
                    <ul>
                        ${project.learningOutcomes.slice(0, 2).map(outcome => `<li>${outcome}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-meta">
                    <span>⏱️ ${project.duration}</span>
                    <span>🎁 ${project.xp} XP</span>
                    <span>📝 ${project.steps.length} Steps</span>
                </div>
                
                ${project.mentorAvailable ? `
                    <div class="mentor-badge">
                        <span class="mentor-avatar">👨‍🏫</span>
                        <div class="mentor-info">
                            <strong>${project.mentorName}</strong>
                            <span>${project.mentorSpecialty}</span>
                        </div>
                    </div>
                ` : ''}
                
                <div class="project-actions">
                    <button class="btn-primary start-project-btn" data-project="${project.id}">
                        🚀 Start Project
                    </button>
                    ${project.aiTutor.available ? `
                        <button class="btn-secondary ai-help-btn" data-project="${project.id}">
                            🤖 AI Help
                        </button>
                    ` : ''}
                    ${project.mentorAvailable ? `
                        <button class="btn-secondary mentor-btn" data-project="${project.id}">
                            👨‍🏫 Book Mentor
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
    
    attachEventListeners() {
        // Start project buttons
        document.querySelectorAll('.start-project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.target.dataset.project;
                this.startProject(projectId);
            });
        });
        
        // AI help buttons
        document.querySelectorAll('.ai-help-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.target.dataset.project;
                this.openAIHelp(projectId);
            });
        });
        
        // Mentor booking buttons
        document.querySelectorAll('.mentor-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.target.dataset.project;
                this.openMentorBooking(projectId);
            });
        });
    }
    
    startProject(projectId) {
        this.currentProject = ADVANCED_PROJECTS.find(p => p.id === projectId);
        if (!this.currentProject) return;
        
        this.currentStep = 0;
        this.projectState = {
            started: true,
            completed: false,
            score: 0,
            hints: 0,
            aiQueries: 0,
            mentorSessions: 0
        };
        
        this.openProjectWorkspace();
        AppState.showNotification(`🚀 Started: ${this.currentProject.title}`);
        console.log('✅ Project started:', this.currentProject.title);
    }
    
    openProjectWorkspace() {
        // Create project workspace modal
        const workspace = document.createElement('div');
        workspace.className = 'project-workspace-modal';
        workspace.innerHTML = `
            <div class="workspace-container">
                <div class="workspace-header">
                    <h2>${this.currentProject.title}</h2>
                    <button class="close-workspace">✕</button>
                </div>
                
                <div class="workspace-body">
                    <div class="workspace-sidebar">
                        <div class="project-progress">
                            <h3>📊 Progress</h3>
                            <div class="progress-bar-container">
                                <div class="progress-bar-fill" id="projectProgressBar" style="width: 0%"></div>
                            </div>
                            <span class="progress-text">Step <span id="currentStepNum">0</span>/${this.currentProject.steps.length}</span>
                        </div>
                        
                        <div class="project-components">
                            <h3>🔧 Required Components</h3>
                            <ul>
                                ${this.currentProject.components.map(comp => `
                                    <li class="component-item">
                                        <input type="checkbox" class="component-check">
                                        <span>${comp}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="project-help">
                            <h3>💡 Need Help?</h3>
                            <button class="help-btn ai-assist-btn">🤖 Ask AI Tutor</button>
                            <button class="help-btn mentor-call-btn">👨‍🏫 Call Mentor</button>
                            <button class="help-btn hint-btn">💡 Get Hint</button>
                        </div>
                    </div>
                    
                    <div class="workspace-main">
                        <div class="step-instructions" id="stepInstructions">
                            <!-- Step instructions will be loaded here -->
                        </div>
                        
                        <div class="circuit-workspace">
                            <h3>🔬 Build Your Circuit Here</h3>
                            <div class="lab-workspace-embed">
                                <p>Drag components from the left panel to build your circuit.</p>
                                <button class="open-lab-btn">🔬 Open Virtual Lab</button>
                            </div>
                        </div>
                        
                        <div class="step-actions">
                            <button class="btn-secondary prev-step-btn" disabled>← Previous</button>
                            <button class="btn-primary verify-step-btn">✓ Verify Step</button>
                            <button class="btn-primary next-step-btn">Next Step →</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(workspace);
        this.loadStep(0);
        this.attachWorkspaceListeners(workspace);
    }
    
    loadStep(stepIndex) {
        const step = this.currentProject.steps[stepIndex];
        if (!step) return;
        
        this.currentStep = stepIndex;
        const instructionsDiv = document.getElementById('stepInstructions');
        
        instructionsDiv.innerHTML = `
            <div class="step-header">
                <span class="step-number">Step ${step.step}</span>
                <span class="step-status">In Progress</span>
            </div>
            
            <div class="step-content">
                <h3>📋 Task</h3>
                <p class="instruction">${step.instruction}</p>
                
                ${step.formula ? `
                    <div class="formula-box">
                        <strong>📐 Formula:</strong>
                        <code>${step.formula}</code>
                    </div>
                ` : ''}
                
                ${step.hint ? `
                    <div class="hint-box collapsed" id="hintBox">
                        <button class="hint-toggle">💡 Show Hint</button>
                        <div class="hint-content" style="display: none;">
                            ${step.hint}
                        </div>
                    </div>
                ` : ''}
                
                ${step.aiHelp ? `
                    <div class="ai-suggestion">
                        <span>🤖 ${step.aiHelp}</span>
                    </div>
                ` : ''}
                
                ${step.expectedResult ? `
                    <div class="expected-result">
                        <strong>✓ Expected Result:</strong>
                        <p>${step.expectedResult}</p>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Update progress
        const progress = ((stepIndex + 1) / this.currentProject.steps.length) * 100;
        document.getElementById('projectProgressBar').style.width = progress + '%';
        document.getElementById('currentStepNum').textContent = stepIndex + 1;
        
        // Update buttons
        document.querySelector('.prev-step-btn').disabled = stepIndex === 0;
        document.querySelector('.next-step-btn').disabled = stepIndex === this.currentProject.steps.length - 1;
    }
    
    attachWorkspaceListeners(workspace) {
        // Close workspace
        workspace.querySelector('.close-workspace').addEventListener('click', () => {
            if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
                workspace.remove();
            }
        });
        
        // AI Assist
        workspace.querySelector('.ai-assist-btn').addEventListener('click', () => {
            this.openAIHelp(this.currentProject.id);
            this.projectState.aiQueries++;
        });
        
        // Mentor Call
        workspace.querySelector('.mentor-call-btn').addEventListener('click', () => {
            this.openMentorBooking(this.currentProject.id);
            this.projectState.mentorSessions++;
        });
        
        // Hint button
        workspace.querySelector('.hint-btn').addEventListener('click', () => {
            const hintBox = document.getElementById('hintBox');
            const hintContent = hintBox.querySelector('.hint-content');
            const toggle = hintBox.querySelector('.hint-toggle');
            
            if (hintContent.style.display === 'none') {
                hintContent.style.display = 'block';
                toggle.textContent = '🔽 Hide Hint';
                this.projectState.hints++;
            } else {
                hintContent.style.display = 'none';
                toggle.textContent = '💡 Show Hint';
            }
        });
        
        // Step navigation
        workspace.querySelector('.prev-step-btn').addEventListener('click', () => {
            if (this.currentStep > 0) {
                this.loadStep(this.currentStep - 1);
            }
        });
        
        workspace.querySelector('.next-step-btn').addEventListener('click', () => {
            if (this.currentStep < this.currentProject.steps.length - 1) {
                this.loadStep(this.currentStep + 1);
            }
        });
        
        // Verify step
        workspace.querySelector('.verify-step-btn').addEventListener('click', () => {
            this.verifyCurrentStep();
        });
        
        // Open lab
        workspace.querySelector('.open-lab-btn').addEventListener('click', () => {
            document.querySelector('a[href="#lab"]').click();
        });
    }
    
    verifyCurrentStep() {
        // Simulate verification (in real app, check circuit state)
        const verified = Math.random() > 0.3; // 70% success rate for demo
        
        if (verified) {
            AppState.showNotification('✅ Step verified! Great work!');
            this.projectState.score += 25;
            
            if (this.currentStep < this.currentProject.steps.length - 1) {
                setTimeout(() => this.loadStep(this.currentStep + 1), 1000);
            } else {
                this.completeProject();
            }
        } else {
            AppState.showNotification('❌ Not quite right. Check your circuit and try again.');
        }
    }
    
    completeProject() {
        this.projectState.completed = true;
        const finalScore = this.calculateFinalScore();
        
        AppState.addXP(this.currentProject.xp);
        AppState.user.projects.push({
            id: this.currentProject.id,
            completedAt: new Date().toISOString(),
            score: finalScore
        });
        
        // Show completion modal
        const modal = document.createElement('div');
        modal.className = 'completion-modal';
        modal.innerHTML = `
            <div class="completion-content">
                <h2>🎉 Project Completed!</h2>
                <div class="completion-stats">
                    <div class="stat">
                        <span class="stat-value">${finalScore}%</span>
                        <span class="stat-label">Final Score</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">+${this.currentProject.xp}</span>
                        <span class="stat-label">XP Earned</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${this.projectState.hints}</span>
                        <span class="stat-label">Hints Used</span>
                    </div>
                </div>
                <button class="btn-primary close-completion">Continue Learning</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.querySelector('.close-completion').addEventListener('click', () => {
            modal.remove();
            document.querySelector('.project-workspace-modal')?.remove();
        });
        
        console.log('🎉 Project completed:', this.currentProject.title);
    }
    
    calculateFinalScore() {
        let score = 100;
        score -= this.projectState.hints * 5; // -5% per hint
        return Math.max(score, 50); // Minimum 50%
    }
    
    openAIHelp(projectId) {
        const project = ADVANCED_PROJECTS.find(p => p.id === projectId);
        if (!project) return;
        
        // Open AI chat with project context
        document.getElementById('aiTutorFab').click();
        
        const context = `I'm working on: ${project.title}. ${project.description}`;
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = `Help me with ${project.title}`;
            chatInput.focus();
        }
        
        AppState.showNotification('🤖 AI Tutor opened with project context');
    }
    
    openMentorBooking(projectId) {
        const project = ADVANCED_PROJECTS.find(p => p.id === projectId);
        if (!project || !project.mentorAvailable) return;
        
        const modal = document.createElement('div');
        modal.className = 'mentor-booking-modal';
        modal.innerHTML = `
            <div class="booking-content">
                <div class="booking-header">
                    <h2>👨‍🏫 Book Mentor Session</h2>
                    <button class="close-booking">✕</button>
                </div>
                
                <div class="mentor-profile">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${project.mentorName}" alt="${project.mentorName}" class="mentor-avatar-large">
                    <div class="mentor-details">
                        <h3>${project.mentorName}</h3>
                        <p class="mentor-specialty">${project.mentorSpecialty}</p>
                        <div class="mentor-rating">⭐⭐⭐⭐⭐ 4.9/5 (200+ sessions)</div>
                    </div>
                </div>
                
                <div class="project-context">
                    <h4>📝 Project: ${project.title}</h4>
                    <p>${project.description}</p>
                </div>
                
                <div class="meeting-options">
                    <h3>🎥 Choose Meeting Platform:</h3>
                    <div class="meeting-buttons">
                        <a href="${project.meetingLinks.zoom}" target="_blank" class="meeting-btn zoom-btn">
                            <span class="meeting-icon">📹</span>
                            <span>Join via Zoom</span>
                        </a>
                        <a href="${project.meetingLinks.googleMeet}" target="_blank" class="meeting-btn meet-btn">
                            <span class="meeting-icon">📺</span>
                            <span>Join via Google Meet</span>
                        </a>
                        <a href="${project.meetingLinks.webex}" target="_blank" class="meeting-btn webex-btn">
                            <span class="meeting-icon">🎦</span>
                            <span>Join via WebEx</span>
                        </a>
                    </div>
                </div>
                
                <div class="booking-info">
                    <p>💡 <strong>Tip:</strong> Prepare your questions and have your circuit ready to share screen!</p>
                    <p>⏱️ Session duration: 30 minutes</p>
                    <p>💰 Cost: Free for students (Included in platform)</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-booking').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        AppState.showNotification(`📞 Opening mentor booking for ${project.mentorName}`);
    }
}

// Initialize Project Manager
let projectManager;
document.addEventListener('DOMContentLoaded', () => {
    projectManager = new ProjectManager();
    console.log('✅ Advanced Project Marketplace loaded!');
});

// Export for global access
window.ProjectManager = ProjectManager;
window.ADVANCED_PROJECTS = ADVANCED_PROJECTS;
