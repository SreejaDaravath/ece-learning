/* Skill Tree Puzzle/Task System - Beautiful Modern UI */

class SkillTreePuzzleSystem {
    constructor() {
        this.puzzles = {};
        this.currentPuzzle = null;
        this.developerMode = true; // Set to false for production
        this.init();
    }

    init() {
        this.loadPuzzles();
        this.createPuzzleUI();
        this.setupDeveloperControls();
    }

    // Load All Puzzles for Each Skill
    loadPuzzles() {
        this.puzzles = {
            // Electronics Basics
            'basics': {
                type: 'quiz',
                difficulty: 'easy',
                title: 'Electronics Foundation Quiz',
                description: 'Answer 5 questions to prove your understanding',
                icon: '⚡',
                xpReward: 100,
                questions: [
                    {
                        question: 'What is voltage?',
                        options: [
                            'Flow of electrons',
                            'Electrical pressure',
                            'Resistance to current',
                            'Power consumption'
                        ],
                        correct: 1,
                        explanation: 'Voltage is electrical pressure that pushes electrons through a circuit.'
                    },
                    {
                        question: 'Which component resists current flow?',
                        options: ['Capacitor', 'Inductor', 'Resistor', 'Transistor'],
                        correct: 2,
                        explanation: 'A resistor is designed to resist or limit current flow.'
                    },
                    {
                        question: 'What is the unit of current?',
                        options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
                        correct: 1,
                        explanation: 'Current is measured in Amperes (A).'
                    },
                    {
                        question: 'What does LED stand for?',
                        options: [
                            'Light Emitting Diode',
                            'Low Energy Device',
                            'Linear Electric Display',
                            'Latest Electronic Device'
                        ],
                        correct: 0,
                        explanation: 'LED stands for Light Emitting Diode.'
                    },
                    {
                        question: 'In a series circuit, if one component fails:',
                        options: [
                            'Others still work',
                            'Entire circuit breaks',
                            'Current increases',
                            'Voltage drops'
                        ],
                        correct: 1,
                        explanation: 'In a series circuit, all components are connected in one path, so if one fails, the entire circuit breaks.'
                    }
                ]
            },

            // Ohm's Law
            'ohmslaw': {
                type: 'calculation',
                difficulty: 'medium',
                title: 'Ohm\'s Law Challenge',
                description: 'Solve circuit problems using V = I × R',
                icon: '📐',
                xpReward: 150,
                problems: [
                    {
                        question: 'A circuit has 12V and 3Ω resistance. Calculate current (I = V/R)',
                        answer: 4,
                        unit: 'A',
                        tolerance: 0.1,
                        hint: 'I = V / R = 12 / 3'
                    },
                    {
                        question: 'If current is 2A and resistance is 5Ω, what is voltage? (V = I × R)',
                        answer: 10,
                        unit: 'V',
                        tolerance: 0.1,
                        hint: 'V = I × R = 2 × 5'
                    },
                    {
                        question: 'Voltage is 24V, current is 4A. Find resistance (R = V/I)',
                        answer: 6,
                        unit: 'Ω',
                        tolerance: 0.1,
                        hint: 'R = V / I = 24 / 4'
                    }
                ]
            },

            // Resistors
            'resistors': {
                type: 'interactive',
                difficulty: 'medium',
                title: 'Resistor Color Code Challenge',
                description: 'Decode resistor color bands to find resistance',
                icon: '🎨',
                xpReward: 120,
                colorCodes: {
                    'Black': 0, 'Brown': 1, 'Red': 2, 'Orange': 3,
                    'Yellow': 4, 'Green': 5, 'Blue': 6, 'Violet': 7,
                    'Gray': 8, 'White': 9
                },
                challenges: [
                    {
                        colors: ['Brown', 'Black', 'Red'],
                        answer: 1000,
                        unit: 'Ω',
                        explanation: 'Brown(1) Black(0) Red(×100) = 1000Ω = 1kΩ'
                    },
                    {
                        colors: ['Red', 'Violet', 'Brown'],
                        answer: 270,
                        unit: 'Ω',
                        explanation: 'Red(2) Violet(7) Brown(×10) = 270Ω'
                    },
                    {
                        colors: ['Orange', 'Orange', 'Red'],
                        answer: 3300,
                        unit: 'Ω',
                        explanation: 'Orange(3) Orange(3) Red(×100) = 3300Ω = 3.3kΩ'
                    }
                ]
            },

            // Capacitors
            'capacitors': {
                type: 'matching',
                difficulty: 'medium',
                title: 'Capacitor Types Matching',
                description: 'Match capacitor types with their applications',
                icon: '🔋',
                xpReward: 130,
                pairs: [
                    {
                        item: 'Ceramic Capacitor',
                        match: 'High-frequency filtering',
                        image: '📀'
                    },
                    {
                        item: 'Electrolytic Capacitor',
                        match: 'Power supply smoothing',
                        image: '🔌'
                    },
                    {
                        item: 'Tantalum Capacitor',
                        match: 'Compact high-capacitance',
                        image: '💎'
                    },
                    {
                        item: 'Film Capacitor',
                        match: 'Audio applications',
                        image: '🎵'
                    }
                ]
            },

            // Transistors
            'transistors': {
                type: 'circuit-build',
                difficulty: 'hard',
                title: 'Build a Transistor Switch',
                description: 'Connect components to create a working transistor switch',
                icon: '🔌',
                xpReward: 200,
                components: ['NPN Transistor', 'Resistor (1kΩ)', 'LED', 'Battery (9V)', 'Push Button'],
                correctConnections: [
                    { from: 'Battery +', to: 'Resistor' },
                    { from: 'Resistor', to: 'LED +' },
                    { from: 'LED -', to: 'Transistor Collector' },
                    { from: 'Transistor Emitter', to: 'Battery -' },
                    { from: 'Push Button', to: 'Transistor Base' }
                ]
            },

            // Logic Gates
            'logicgates': {
                type: 'truth-table',
                difficulty: 'medium',
                title: 'Logic Gates Truth Tables',
                description: 'Complete truth tables for logic gates',
                icon: '🚪',
                xpReward: 140,
                gates: [
                    {
                        type: 'AND',
                        inputs: [[0,0], [0,1], [1,0], [1,1]],
                        outputs: [0, 0, 0, 1],
                        symbol: '&'
                    },
                    {
                        type: 'OR',
                        inputs: [[0,0], [0,1], [1,0], [1,1]],
                        outputs: [0, 1, 1, 1],
                        symbol: '≥1'
                    },
                    {
                        type: 'XOR',
                        inputs: [[0,0], [0,1], [1,0], [1,1]],
                        outputs: [0, 1, 1, 0],
                        symbol: '=1'
                    }
                ]
            },

            // Memory
            'memory': {
                type: 'sequence',
                difficulty: 'hard',
                title: 'Memory Address Sequence',
                description: 'Understand memory addressing and data storage',
                icon: '💾',
                xpReward: 180,
                sequences: [
                    {
                        question: 'Binary to Decimal: 1010',
                        answer: 10,
                        explanation: '8 + 0 + 2 + 0 = 10'
                    },
                    {
                        question: 'Hexadecimal to Decimal: 2F',
                        answer: 47,
                        explanation: '2×16 + 15 = 32 + 15 = 47'
                    },
                    {
                        question: 'How many bytes in 1 KB?',
                        answer: 1024,
                        explanation: '1 KB = 1024 bytes (2^10)'
                    }
                ]
            }
        };
    }

    // Create Beautiful Puzzle UI
    createPuzzleUI() {
        const puzzleHTML = `
            <!-- Puzzle Modal Overlay -->
            <div class="puzzle-overlay" id="puzzle-overlay">
                <div class="puzzle-container">
                    <!-- Puzzle Header -->
                    <div class="puzzle-header">
                        <div class="puzzle-header-left">
                            <span class="puzzle-icon" id="puzzle-icon">🎯</span>
                            <div>
                                <h2 id="puzzle-title">Challenge</h2>
                                <p id="puzzle-description">Complete this to unlock the skill</p>
                            </div>
                        </div>
                        <div class="puzzle-header-right">
                            <span class="puzzle-difficulty" id="puzzle-difficulty">Medium</span>
                            <span class="puzzle-reward" id="puzzle-reward">+100 XP</span>
                            <button class="close-puzzle-btn" onclick="puzzleSystem.closePuzzle()">✕</button>
                        </div>
                    </div>

                    <!-- Puzzle Content Area -->
                    <div class="puzzle-content" id="puzzle-content">
                        <!-- Dynamic content loaded here -->
                    </div>

                    <!-- Puzzle Progress -->
                    <div class="puzzle-progress">
                        <div class="progress-info">
                            <span>Progress: <strong id="puzzle-progress-text">0/5</strong></span>
                            <span id="puzzle-score">Score: 0</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" id="puzzle-progress-bar"></div>
                        </div>
                    </div>

                    <!-- Puzzle Actions -->
                    <div class="puzzle-actions">
                        <button class="puzzle-btn secondary" onclick="puzzleSystem.showHint()">
                            💡 Hint
                        </button>
                        <button class="puzzle-btn secondary" onclick="puzzleSystem.skipPuzzle()" id="skip-btn">
                            ⏭️ Skip (Watch Video)
                        </button>
                        <button class="puzzle-btn primary" onclick="puzzleSystem.submitAnswer()" id="submit-btn">
                            ✅ Submit Answer
                        </button>
                    </div>

                    <!-- Developer Controls (Hidden by default) -->
                    <div class="developer-controls" id="developer-controls" style="display: none;">
                        <h3>🔧 Developer Controls</h3>
                        <div class="dev-control-grid">
                            <button onclick="puzzleSystem.toggleDifficulty()">Change Difficulty</button>
                            <button onclick="puzzleSystem.addCustomPuzzle()">Add Puzzle</button>
                            <button onclick="puzzleSystem.editCurrentPuzzle()">Edit Puzzle</button>
                            <button onclick="puzzleSystem.viewAnswers()">View Answers</button>
                            <button onclick="puzzleSystem.autoSolve()">Auto-Solve</button>
                            <button onclick="puzzleSystem.resetProgress()">Reset Progress</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Success Modal -->
            <div class="success-modal" id="success-modal">
                <div class="success-content">
                    <div class="success-icon">🎉</div>
                    <h2>Puzzle Completed!</h2>
                    <p id="success-message">You've unlocked the skill!</p>
                    <div class="success-rewards">
                        <div class="reward-item">
                            <span class="reward-icon">⚡</span>
                            <span class="reward-text" id="xp-earned">+100 XP</span>
                        </div>
                        <div class="reward-item">
                            <span class="reward-icon">🏆</span>
                            <span class="reward-text">Achievement Unlocked</span>
                        </div>
                    </div>
                    <button class="continue-btn" onclick="puzzleSystem.continueToSkill()">
                        Continue Learning →
                    </button>
                </div>
            </div>

            <!-- Hint Tooltip -->
            <div class="hint-tooltip" id="hint-tooltip">
                <div class="hint-content">
                    <strong>💡 Hint:</strong>
                    <p id="hint-text"></p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', puzzleHTML);
    }

    // Open Puzzle for Skill
    openPuzzle(skillId) {
        const puzzle = this.puzzles[skillId];
        if (!puzzle) {
            console.log('No puzzle for this skill yet');
            return;
        }

        this.currentPuzzle = { skillId, ...puzzle, currentQuestion: 0, score: 0 };
        
        // Update header
        document.getElementById('puzzle-icon').textContent = puzzle.icon;
        document.getElementById('puzzle-title').textContent = puzzle.title;
        document.getElementById('puzzle-description').textContent = puzzle.description;
        document.getElementById('puzzle-difficulty').textContent = puzzle.difficulty.toUpperCase();
        document.getElementById('puzzle-difficulty').className = `puzzle-difficulty ${puzzle.difficulty}`;
        document.getElementById('puzzle-reward').textContent = `+${puzzle.xpReward} XP`;

        // Load puzzle content based on type
        this.loadPuzzleContent(puzzle);

        // Show overlay
        document.getElementById('puzzle-overlay').classList.add('active');

        // Show developer controls if in dev mode
        if (this.developerMode) {
            document.getElementById('developer-controls').style.display = 'block';
        }
    }

    // Load Puzzle Content Based on Type
    loadPuzzleContent(puzzle) {
        const content = document.getElementById('puzzle-content');
        
        switch(puzzle.type) {
            case 'quiz':
                this.loadQuizContent(content, puzzle);
                break;
            case 'calculation':
                this.loadCalculationContent(content, puzzle);
                break;
            case 'interactive':
                this.loadInteractiveContent(content, puzzle);
                break;
            case 'matching':
                this.loadMatchingContent(content, puzzle);
                break;
            case 'circuit-build':
                this.loadCircuitContent(content, puzzle);
                break;
            case 'truth-table':
                this.loadTruthTableContent(content, puzzle);
                break;
            case 'sequence':
                this.loadSequenceContent(content, puzzle);
                break;
        }
    }

    // Quiz Content
    loadQuizContent(content, puzzle) {
        const question = puzzle.questions[this.currentPuzzle.currentQuestion];
        
        content.innerHTML = `
            <div class="quiz-container">
                <div class="question-header">
                    <span class="question-number">Question ${this.currentPuzzle.currentQuestion + 1}/${puzzle.questions.length}</span>
                </div>
                <h3 class="question-text">${question.question}</h3>
                <div class="options-grid">
                    ${question.options.map((option, index) => `
                        <div class="option-card" data-index="${index}" onclick="puzzleSystem.selectOption(${index})">
                            <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.updateProgress();
    }

    // Calculation Content
    loadCalculationContent(content, puzzle) {
        const problem = puzzle.problems[this.currentPuzzle.currentQuestion];
        
        content.innerHTML = `
            <div class="calculation-container">
                <div class="circuit-diagram">
                    <svg width="300" height="200" viewBox="0 0 300 200">
                        <!-- Simple circuit visualization -->
                        <rect x="50" y="80" width="80" height="40" fill="none" stroke="#667eea" stroke-width="2"/>
                        <text x="90" y="105" text-anchor="middle" fill="#667eea">Circuit</text>
                        <line x1="20" y1="100" x2="50" y2="100" stroke="#667eea" stroke-width="2"/>
                        <line x1="130" y1="100" x2="280" y2="100" stroke="#667eea" stroke-width="2"/>
                        <circle cx="150" cy="100" r="30" fill="none" stroke="#f093fb" stroke-width="2"/>
                        <text x="150" y="105" text-anchor="middle" fill="#f093fb">+</text>
                    </svg>
                </div>
                <h3 class="problem-text">${problem.question}</h3>
                <div class="calculation-input">
                    <input type="number" id="calc-answer" placeholder="Enter answer" step="0.1">
                    <span class="unit-label">${problem.unit}</span>
                </div>
                <div class="formula-helper">
                    <strong>Formula:</strong> V = I × R, I = V / R, R = V / I
                </div>
            </div>
        `;

        this.updateProgress();
    }

    // Interactive Color Code Content
    loadInteractiveContent(content, puzzle) {
        const challenge = puzzle.challenges[this.currentPuzzle.currentQuestion];
        
        const colorMap = {
            'Black': '#000000', 'Brown': '#8B4513', 'Red': '#FF0000',
            'Orange': '#FFA500', 'Yellow': '#FFFF00', 'Green': '#008000',
            'Blue': '#0000FF', 'Violet': '#8B00FF', 'Gray': '#808080', 'White': '#FFFFFF'
        };

        content.innerHTML = `
            <div class="interactive-container">
                <h3>Decode this resistor:</h3>
                <div class="resistor-visual">
                    <div class="resistor-body">
                        ${challenge.colors.map((color, i) => `
                            <div class="color-band" style="background: ${colorMap[color]}; left: ${30 + i * 20}%">
                                <span class="color-name">${color}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="color-code-reference">
                    <h4>Color Code Reference:</h4>
                    <div class="color-grid">
                        ${Object.entries(puzzle.colorCodes).map(([color, value]) => `
                            <div class="color-ref">
                                <div class="color-sample" style="background: ${colorMap[color]}"></div>
                                <span>${color} = ${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="answer-input">
                    <input type="number" id="resistor-answer" placeholder="Resistance value">
                    <span class="unit-label">Ω</span>
                </div>
            </div>
        `;

        this.updateProgress();
    }

    // Select Option (for quiz)
    selectOption(index) {
        // Remove previous selection
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selection
        event.target.closest('.option-card').classList.add('selected');
        this.currentPuzzle.selectedAnswer = index;
    }

    // Submit Answer
    submitAnswer() {
        const puzzle = this.currentPuzzle;
        let isCorrect = false;

        switch(puzzle.type) {
            case 'quiz':
                const question = puzzle.questions[puzzle.currentQuestion];
                isCorrect = puzzle.selectedAnswer === question.correct;
                if (isCorrect) {
                    this.showFeedback(true, question.explanation);
                    puzzle.score++;
                } else {
                    this.showFeedback(false, question.explanation);
                }
                break;

            case 'calculation':
                const problem = puzzle.problems[puzzle.currentQuestion];
                const answer = parseFloat(document.getElementById('calc-answer').value);
                isCorrect = Math.abs(answer - problem.answer) <= problem.tolerance;
                if (isCorrect) {
                    this.showFeedback(true, problem.hint);
                    puzzle.score++;
                } else {
                    this.showFeedback(false, `Correct answer: ${problem.answer} ${problem.unit}`);
                }
                break;

            case 'interactive':
                const challenge = puzzle.challenges[puzzle.currentQuestion];
                const resistorAnswer = parseFloat(document.getElementById('resistor-answer').value);
                isCorrect = resistorAnswer === challenge.answer;
                if (isCorrect) {
                    this.showFeedback(true, challenge.explanation);
                    puzzle.score++;
                } else {
                    this.showFeedback(false, challenge.explanation);
                }
                break;
        }

        // Move to next question after delay
        setTimeout(() => {
            puzzle.currentQuestion++;
            
            if (puzzle.currentQuestion >= this.getTotalQuestions()) {
                this.completePuzzle();
            } else {
                this.loadPuzzleContent(puzzle);
            }
        }, 2000);
    }

    // Show Feedback
    showFeedback(isCorrect, message) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-popup ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.innerHTML = `
            <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
            <div class="feedback-text">
                <strong>${isCorrect ? 'Correct!' : 'Incorrect'}</strong>
                <p>${message}</p>
            </div>
        `;
        
        document.getElementById('puzzle-content').appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    // Get Total Questions
    getTotalQuestions() {
        const puzzle = this.currentPuzzle;
        switch(puzzle.type) {
            case 'quiz': return puzzle.questions.length;
            case 'calculation': return puzzle.problems.length;
            case 'interactive': return puzzle.challenges.length;
            default: return 5;
        }
    }

    // Update Progress
    updateProgress() {
        const total = this.getTotalQuestions();
        const current = this.currentPuzzle.currentQuestion + 1;
        const percentage = (current / total) * 100;

        document.getElementById('puzzle-progress-text').textContent = `${current}/${total}`;
        document.getElementById('puzzle-progress-bar').style.width = `${percentage}%`;
        document.getElementById('puzzle-score').textContent = `Score: ${this.currentPuzzle.score}/${total}`;
    }

    // Complete Puzzle
    completePuzzle() {
        const puzzle = this.currentPuzzle;
        const totalQuestions = this.getTotalQuestions();
        const percentage = (puzzle.score / totalQuestions) * 100;

        document.getElementById('puzzle-overlay').classList.remove('active');
        
        if (percentage >= 60) {
            // Success!
            document.getElementById('success-message').textContent = 
                `You scored ${puzzle.score}/${totalQuestions} (${percentage.toFixed(0)}%)`;
            document.getElementById('xp-earned').textContent = `+${puzzle.xpReward} XP`;
            document.getElementById('success-modal').classList.add('active');
            
            // Award XP and unlock skill
            this.unlockSkill(puzzle.skillId, puzzle.xpReward);
        } else {
            alert(`You scored ${puzzle.score}/${totalQuestions}. Try again! (Need 60% to pass)`);
            this.closePuzzle();
        }
    }

    // Unlock Skill
    unlockSkill(skillId, xp) {
        console.log(`Unlocking skill: ${skillId}, XP: ${xp}`);
        
        // Mark node as completed in skill tree
        if (typeof AppState !== 'undefined') {
            const node = AppState.skillTree.nodes.find(n => n.id === skillId);
            if (node && !node.completed) {
                node.completed = true;
                AppState.user.completedSkills.push(skillId);
                AppState.addXP(xp);
                
                // Unlock connected nodes
                if (typeof SKILL_TREE_DATA !== 'undefined') {
                    SKILL_TREE_DATA.connections.forEach(([from, to]) => {
                        if (from === skillId) {
                            const nextNode = AppState.skillTree.nodes.find(n => n.id === to);
                            if (nextNode && !nextNode.unlocked) {
                                nextNode.unlocked = true;
                                AppState.showNotification(`🔓 Unlocked: ${nextNode.name}`);
                            }
                        }
                    });
                }
                
                if (typeof drawSkillTree === 'function') {
                    drawSkillTree();
                }
                AppState.save();
            }
        }
        
        // Open learning content
        if (typeof window.aiVoice !== 'undefined') {
            window.aiVoice.loadSkill(skillId);
        }
    }

    // Continue to Skill
    continueToSkill() {
        document.getElementById('success-modal').classList.remove('active');
        if (typeof window.aiVoice !== 'undefined') {
            window.aiVoice.loadSkill(this.currentPuzzle.skillId);
        }
    }

    // Show Hint
    showHint() {
        const hints = {
            'quiz': 'Read the question carefully and eliminate obviously wrong answers.',
            'calculation': 'Remember: V = I × R. Rearrange the formula based on what you need to find.',
            'interactive': 'The first two bands are digits, the third is the multiplier.',
        };

        const hint = hints[this.currentPuzzle.type] || 'Think carefully about the problem!';
        document.getElementById('hint-text').textContent = hint;
        
        const tooltip = document.getElementById('hint-tooltip');
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 5000);
    }

    // Skip Puzzle (Watch Video)
    skipPuzzle() {
        if (confirm('Skip puzzle and watch an educational video instead? (50% XP)')) {
            const halfXP = Math.floor(this.currentPuzzle.xpReward / 2);
            this.unlockSkill(this.currentPuzzle.skillId, halfXP);
            this.closePuzzle();
        }
    }

    // Close Puzzle
    closePuzzle() {
        document.getElementById('puzzle-overlay').classList.remove('active');
        this.currentPuzzle = null;
    }

    // Developer Controls
    setupDeveloperControls() {
        // Press Ctrl+D to toggle developer mode
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.developerMode = !this.developerMode;
                console.log('Developer mode:', this.developerMode ? 'ON' : 'OFF');
            }
        });
    }

    toggleDifficulty() {
        const difficulties = ['easy', 'medium', 'hard'];
        const current = this.currentPuzzle.difficulty;
        const index = difficulties.indexOf(current);
        this.currentPuzzle.difficulty = difficulties[(index + 1) % 3];
        alert(`Difficulty changed to: ${this.currentPuzzle.difficulty}`);
    }

    viewAnswers() {
        console.log('Answers:', this.currentPuzzle);
        alert('Check console for answers');
    }

    autoSolve() {
        this.currentPuzzle.score = this.getTotalQuestions();
        this.completePuzzle();
    }

    resetProgress() {
        this.currentPuzzle.currentQuestion = 0;
        this.currentPuzzle.score = 0;
        this.loadPuzzleContent(this.currentPuzzle);
    }

    addCustomPuzzle() {
        alert('Custom puzzle editor - Coming soon!');
    }

    editCurrentPuzzle() {
        alert('Puzzle editor - Coming soon!');
    }
}

// Initialize Puzzle System
let puzzleSystem;
document.addEventListener('DOMContentLoaded', () => {
    puzzleSystem = new SkillTreePuzzleSystem();
    console.log('Puzzle System loaded. Press Ctrl+D for developer mode.');
});
