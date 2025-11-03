// 🎮 ECE MASTER - Game Engine v2.0
// Interactive Learning with Real Simulations

class GameEngine {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.highScore = 0;
        this.attempts = 0;
        this.maxAttempts = 3;
        this.startTime = null;
        this.timerInterval = null;
        this.phase = 'demo'; // demo, practice, test
        
        // Canvas & Circuit State
        this.canvas = document.getElementById('breadboard');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.circuit = {
            components: [],
            wires: [],
            measurements: {}
        };
        
        // Drag & Drop State
        this.draggedComponent = null;
        this.selectedPoints = [];
        this.multimeterMode = 'voltage';
        
        // Achievements
        this.achievements = {
            scholar: false,
            speedDemon: false,
            perfectionist: false,
            hotStreak: false
        };
        this.streak = 0;
        
        this.init();
    }

    init() {
        console.log('🎮 ECE MASTER - Game Engine Starting...');
        this.loadProgress();
        this.setupEventListeners();
        this.loadLevel(this.currentLevel);
    }

    loadProgress() {
        const saved = localStorage.getItem('eceMasterProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentLevel = data.level || 1;
            this.score = data.score || 0;
            this.highScore = data.highScore || 0;
            this.achievements = data.achievements || this.achievements;
        }
        this.updateUI();
    }

    saveProgress() {
        const data = {
            level: this.currentLevel,
            score: this.score,
            highScore: this.highScore,
            achievements: this.achievements,
            timestamp: Date.now()
        };
        localStorage.setItem('eceMasterProgress', JSON.stringify(data));
    }

    setupEventListeners() {
        // Component Drag & Drop
        document.addEventListener('dragstart', (e) => this.onDragStart(e));
        document.addEventListener('dragover', (e) => e.preventDefault());
        document.addEventListener('drop', (e) => this.onDrop(e));
        
        // Canvas Interactions
        if (this.canvas) {
            this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));
            this.canvas.addEventListener('mousemove', (e) => this.onCanvasHover(e));
        }
        
        // Control Buttons
        document.getElementById('testCircuit')?.addEventListener('click', () => this.testCircuit());
        document.getElementById('submitAnswer')?.addEventListener('click', () => this.submitAnswer());
        document.getElementById('nextLevel')?.addEventListener('click', () => this.nextLevel());
        document.getElementById('clearCircuit')?.addEventListener('click', () => this.clearCircuit());
        document.getElementById('getHint')?.addEventListener('click', () => this.showHint());
        document.getElementById('resetProgress')?.addEventListener('click', () => this.resetProgress());
        
        // Tool Buttons
        document.getElementById('multimeterBtn')?.addEventListener('click', () => this.openMultimeter());
        document.getElementById('logicAnalyzerBtn')?.addEventListener('click', () => this.showToast('Logic Analyzer - Coming Soon! 📈', 'info'));
        document.getElementById('oscilloscopeBtn')?.addEventListener('click', () => this.showToast('Oscilloscope - Coming Soon! 〰️', 'info'));
        
        // Modal Buttons
        document.getElementById('skipDemo')?.addEventListener('click', () => this.skipDemo());
        document.getElementById('continueBtn')?.addEventListener('click', () => this.closeSuccessModal());
        document.getElementById('closeHint')?.addEventListener('click', () => this.closeHintModal());
        document.getElementById('closeMultimeter')?.addEventListener('click', () => this.closeMultimeter());
        document.getElementById('closeMeasurement')?.addEventListener('click', () => this.closeMeasurement());
        
        // Multimeter Mode Buttons
        document.querySelectorAll('.meter-mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.meter-mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.multimeterMode = e.target.dataset.mode;
            });
        });
    }

    loadLevel(levelNum) {
        console.log(`📚 Loading Level ${levelNum}...`);
        
        const levelData = LEVEL_DATA[levelNum];
        if (!levelData) {
            console.error(`❌ Level ${levelNum} not found!`);
            this.showToast('Level not available yet! 🚧', 'warning');
            return;
        }
        
        this.currentLevel = levelNum;
        this.attempts = 0;
        this.startTime = Date.now();
        this.phase = 'demo';
        
        // Update UI
        document.getElementById('levelNum').textContent = levelNum;
        document.getElementById('moduleName').textContent = levelData.module;
        document.getElementById('taskTitle').textContent = levelData.title;
        document.getElementById('taskDescription').textContent = levelData.description;
        document.getElementById('taskGoal').textContent = levelData.goal;
        document.getElementById('timerValue').textContent = `${levelData.maxTime}s`;
        document.getElementById('attemptsValue').textContent = `0/${this.maxAttempts}`;
        
        // Load Components
        this.loadComponents(levelData.components);
        
        // Clear Circuit
        this.clearCircuit();
        
        // Show Demo (if available)
        if (levelData.demo) {
            this.showDemo(levelData.demo);
        } else {
            this.startPractice();
        }
        
        // Update Progress Bar
        const progress = ((levelNum - 1) / 50) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `${Math.floor(progress)}%`;
        
        this.saveProgress();
    }

    loadComponents(componentList) {
        const palette = document.getElementById('componentsList');
        if (!palette) return;
        
        palette.innerHTML = '';
        
        const componentIcons = {
            'battery-5v': { icon: '🔋', name: 'Battery', value: '5V' },
            'battery-9v': { icon: '🔋', name: 'Battery', value: '9V' },
            'battery-12v': { icon: '🔋', name: 'Battery', value: '12V' },
            'led-red': { icon: '💡', name: 'Red LED', value: '2V' },
            'led-green': { icon: '💡', name: 'Green LED', value: '2.2V' },
            'led-blue': { icon: '💡', name: 'Blue LED', value: '3V' },
            'led-yellow': { icon: '💡', name: 'Yellow LED', value: '2V' },
            'resistor-100': { icon: '〰️', name: 'Resistor', value: '100Ω' },
            'resistor-220': { icon: '〰️', name: 'Resistor', value: '220Ω' },
            'resistor-330': { icon: '〰️', name: 'Resistor', value: '330Ω' },
            'resistor-470': { icon: '〰️', name: 'Resistor', value: '470Ω' },
            'resistor-680': { icon: '〰️', name: 'Resistor', value: '680Ω' },
            'resistor-1k': { icon: '〰️', name: 'Resistor', value: '1kΩ' },
            'resistor-variable': { icon: '🎚️', name: 'Variable R', value: '0-10kΩ' },
            'switch': { icon: '🔘', name: 'Switch', value: 'ON/OFF' },
            'switch-a': { icon: '🔘', name: 'Switch A', value: 'Input A' },
            'switch-b': { icon: '🔘', name: 'Switch B', value: 'Input B' },
            'switch-c': { icon: '🔘', name: 'Switch C', value: 'Input C' },
            'and-gate': { icon: '🔷', name: 'AND Gate', value: '2 inputs' },
            'or-gate': { icon: '🔶', name: 'OR Gate', value: '2 inputs' },
            'not-gate': { icon: '🔺', name: 'NOT Gate', value: '1 input' },
            'nand-gate': { icon: '💠', name: 'NAND Gate', value: '2 inputs' },
            'nor-gate': { icon: '🔸', name: 'NOR Gate', value: '2 inputs' },
            'xor-gate': { icon: '🔹', name: 'XOR Gate', value: '2 inputs' },
            'multimeter': { icon: '🔴', name: 'Multimeter', value: 'Measure' },
            'wires': { icon: '➰', name: 'Wires', value: 'Connect' }
        };
        
        componentList.forEach(compId => {
            const comp = componentIcons[compId];
            if (!comp) return;
            
            const div = document.createElement('div');
            div.className = 'component-item';
            div.draggable = true;
            div.dataset.component = compId;
            
            div.innerHTML = `
                <span class="component-icon">${comp.icon}</span>
                <div class="component-details">
                    <span class="component-name">${comp.name}</span>
                    <span class="component-value">${comp.value}</span>
                </div>
            `;
            
            palette.appendChild(div);
        });
    }

    showDemo(demoData) {
        console.log('📺 Showing demo...');
        const demoPanel = document.getElementById('demoPanel');
        if (!demoPanel) return;
        
        demoPanel.classList.remove('hidden');
        this.phase = 'demo';
        document.getElementById('phaseStatus').textContent = 'Demo';
        
        // Auto-skip demo after 10 seconds
        let demoTime = 10;
        const demoTimer = document.getElementById('demoTimer');
        
        const demoInterval = setInterval(() => {
            demoTime--;
            if (demoTimer) demoTimer.textContent = `${demoTime}s`;
            
            if (demoTime <= 0) {
                clearInterval(demoInterval);
                this.skipDemo();
            }
        }, 1000);
        
        // Draw demo circuit
        this.drawDemoCircuit(demoData);
    }

    skipDemo() {
        const demoPanel = document.getElementById('demoPanel');
        if (demoPanel) demoPanel.classList.add('hidden');
        this.startPractice();
    }

    startPractice() {
        console.log('🎯 Practice phase started!');
        this.phase = 'practice';
        document.getElementById('phaseStatus').textContent = 'Practice';
        
        // Start timer
        const levelData = LEVEL_DATA[this.currentLevel];
        let timeLeft = levelData.maxTime;
        const timerDisplay = document.getElementById('timerValue');
        const timerElement = document.getElementById('timer');
        
        this.timerInterval = setInterval(() => {
            timeLeft--;
            if (timerDisplay) timerDisplay.textContent = `${timeLeft}s`;
            
            // Warning at 30s
            if (timeLeft === 30) {
                timerElement?.classList.add('warning');
            }
            
            // Danger at 10s
            if (timeLeft === 10) {
                timerElement?.classList.remove('warning');
                timerElement?.classList.add('danger');
            }
            
            // Time's up!
            if (timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.showToast('⏰ Time\'s up! Try again!', 'warning');
                this.attempts++;
                if (this.attempts >= this.maxAttempts) {
                    this.showToast('❌ Max attempts reached! Moving to next level...', 'error');
                    setTimeout(() => this.nextLevel(), 2000);
                }
            }
        }, 1000);
    }

    drawDemoCircuit(demoData) {
        const demoCanvas = document.getElementById('demoCanvas');
        if (!demoCanvas) return;
        
        const ctx = demoCanvas.getContext('2d');
        ctx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);
        
        // Draw simple demo visualization
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔧 Demo Circuit Animation', demoCanvas.width / 2, 50);
        ctx.fillText('(Watch how components connect!)', demoCanvas.width / 2, 80);
        
        // Draw components from demo data
        if (demoData.components) {
            let y = 120;
            demoData.components.forEach((comp, i) => {
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(150, y, 100, 40);
                ctx.fillStyle = '#fff';
                ctx.fillText(comp, 200, y + 25);
                y += 60;
            });
        }
    }

    onDragStart(e) {
        if (e.target.classList.contains('component-item')) {
            this.draggedComponent = e.target.dataset.component;
            e.dataTransfer.effectAllowed = 'copy';
            console.log('🖐️ Dragging:', this.draggedComponent);
        }
    }

    onDrop(e) {
        e.preventDefault();
        
        if (!this.draggedComponent) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Add component to circuit
        const component = {
            id: `${this.draggedComponent}-${Date.now()}`,
            type: this.draggedComponent,
            x: x,
            y: y,
            connections: []
        };
        
        this.circuit.components.push(component);
        console.log('✅ Component placed:', component);
        
        this.drawCircuit();
        this.showToast(`${this.draggedComponent} added!`, 'success');
        
        this.draggedComponent = null;
    }

    onCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if clicking on a component
        const clicked = this.circuit.components.find(comp => {
            const dist = Math.sqrt((comp.x - x) ** 2 + (comp.y - y) ** 2);
            return dist < 30;
        });
        
        if (clicked) {
            console.log('🖱️ Clicked component:', clicked);
            
            // Toggle switch
            if (clicked.type.includes('switch')) {
                clicked.state = !clicked.state;
                this.drawCircuit();
                this.showToast(`Switch ${clicked.state ? 'ON' : 'OFF'}`, 'info');
            }
            
            // Select for wiring
            this.selectedPoints.push(clicked);
            
            if (this.selectedPoints.length === 2) {
                // Create wire connection
                const wire = {
                    from: this.selectedPoints[0],
                    to: this.selectedPoints[1]
                };
                this.circuit.wires.push(wire);
                console.log('🔗 Wire connected!');
                this.selectedPoints = [];
                this.drawCircuit();
                this.showToast('Wire connected! 🔌', 'success');
            }
        }
    }

    onCanvasHover(e) {
        // Visual feedback for hover
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const hovered = this.circuit.components.find(comp => {
            const dist = Math.sqrt((comp.x - x) ** 2 + (comp.y - y) ** 2);
            return dist < 30;
        });
        
        this.canvas.style.cursor = hovered ? 'pointer' : 'crosshair';
    }

    drawCircuit() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw wires first (behind components)
        this.ctx.strokeStyle = '#3b82f6';
        this.ctx.lineWidth = 3;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#3b82f6';
        
        this.circuit.wires.forEach(wire => {
            this.ctx.beginPath();
            this.ctx.moveTo(wire.from.x, wire.from.y);
            this.ctx.lineTo(wire.to.x, wire.to.y);
            this.ctx.stroke();
        });
        
        this.ctx.shadowBlur = 0;
        
        // Draw components
        this.circuit.components.forEach(comp => {
            this.drawComponent(comp);
        });
        
        // Draw selected points
        this.ctx.fillStyle = '#10b981';
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#10b981';
        this.selectedPoints.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.shadowBlur = 0;
    }

    drawComponent(comp) {
        const ctx = this.ctx;
        
        // Component background
        ctx.fillStyle = comp.state ? '#10b981' : '#334155';
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        
        if (comp.type.includes('battery')) {
            // Draw battery
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(comp.x - 25, comp.y - 15, 50, 30);
            ctx.strokeRect(comp.x - 25, comp.y - 15, 50, 30);
            ctx.fillStyle = '#000';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('+', comp.x - 15, comp.y + 5);
            ctx.fillText('-', comp.x + 15, comp.y + 5);
            
        } else if (comp.type.includes('led')) {
            // Draw LED
            const color = comp.type.includes('red') ? '#ef4444' : 
                         comp.type.includes('green') ? '#10b981' :
                         comp.type.includes('blue') ? '#3b82f6' : '#fbbf24';
            
            ctx.fillStyle = comp.state ? color : '#334155';
            ctx.beginPath();
            ctx.arc(comp.x, comp.y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            if (comp.state) {
                // Glow effect
                ctx.shadowBlur = 20;
                ctx.shadowColor = color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
            
        } else if (comp.type.includes('resistor')) {
            // Draw resistor
            ctx.fillStyle = '#a78bfa';
            ctx.fillRect(comp.x - 30, comp.y - 10, 60, 20);
            ctx.strokeRect(comp.x - 30, comp.y - 10, 60, 20);
            
        } else if (comp.type.includes('switch')) {
            // Draw switch
            ctx.fillStyle = comp.state ? '#10b981' : '#ef4444';
            ctx.fillRect(comp.x - 20, comp.y - 15, 40, 30);
            ctx.strokeRect(comp.x - 20, comp.y - 15, 40, 30);
            ctx.fillStyle = '#fff';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(comp.state ? 'ON' : 'OFF', comp.x, comp.y + 4);
            
        } else if (comp.type.includes('-gate')) {
            // Draw logic gate
            ctx.fillStyle = '#6366f1';
            ctx.beginPath();
            ctx.moveTo(comp.x - 25, comp.y - 20);
            ctx.lineTo(comp.x + 25, comp.y);
            ctx.lineTo(comp.x - 25, comp.y + 20);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // Gate label
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            const gateLabel = comp.type.split('-')[0].toUpperCase();
            ctx.fillText(gateLabel, comp.x, comp.y + 4);
        }
        
        // Component label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(comp.id.split('-')[0], comp.x, comp.y + 35);
    }

    testCircuit() {
        console.log('🧪 Testing circuit...');
        this.phase = 'test';
        document.getElementById('phaseStatus').textContent = 'Testing';
        
        // Simulate circuit
        this.simulateCircuit();
        
        this.showToast('Circuit tested! Check measurements. 📊', 'info');
    }

    simulateCircuit() {
        // Basic circuit simulation
        let voltage = 0;
        let current = 0;
        let resistance = 0;
        let power = 0;
        
        // Find battery
        const battery = this.circuit.components.find(c => c.type.includes('battery'));
        if (battery) {
            voltage = parseFloat(battery.type.split('-')[1]);
        }
        
        // Find resistors
        const resistors = this.circuit.components.filter(c => c.type.includes('resistor'));
        resistors.forEach(r => {
            const value = r.type.includes('variable') ? 1000 : 
                         parseInt(r.type.match(/\d+/)?.[0] || '0');
            resistance += value;
        });
        
        // Calculate current (Ohm's Law)
        if (resistance > 0 && voltage > 0) {
            current = voltage / resistance;
            power = voltage * current;
        }
        
        // Update measurements
        document.getElementById('voltageDisplay').textContent = `${voltage.toFixed(2)} V`;
        document.getElementById('currentDisplay').textContent = `${(current * 1000).toFixed(2)} mA`;
        document.getElementById('resistanceDisplay').textContent = `${resistance.toFixed(0)} Ω`;
        document.getElementById('powerDisplay').textContent = `${(power * 1000).toFixed(2)} mW`;
        
        // Store measurements
        this.circuit.measurements = { voltage, current, resistance, power };
        
        // Check if LEDs should be on
        const leds = this.circuit.components.filter(c => c.type.includes('led'));
        leds.forEach(led => {
            led.state = current > 0.001; // Minimum current for LED
        });
        
        this.drawCircuit();
    }

    submitAnswer() {
        console.log('✅ Submitting answer...');
        
        const levelData = LEVEL_DATA[this.currentLevel];
        const success = this.checkSuccessCriteria(levelData.successCriteria);
        
        if (success) {
            this.onLevelSuccess(levelData);
        } else {
            this.onLevelFailure(levelData);
        }
    }

    checkSuccessCriteria(criteria) {
        // Check if circuit meets success criteria
        const { type, target, expectedRange, min, max, unit } = criteria;
        
        if (type === 'led_on') {
            const leds = this.circuit.components.filter(c => c.type.includes('led'));
            return leds.some(led => led.state);
        }
        
        if (type === 'current_in_range') {
            const current = this.circuit.measurements.current * 1000; // mA
            return current >= min && current <= max;
        }
        
        if (type === 'measurement') {
            const value = this.circuit.measurements[target.split('_')[0]];
            return value >= expectedRange[0] && value <= expectedRange[1];
        }
        
        // Default: circuit has components and wires
        return this.circuit.components.length > 0 && this.circuit.wires.length > 0;
    }

    onLevelSuccess(levelData) {
        console.log('🎉 Level Complete!');
        
        clearInterval(this.timerInterval);
        
        // Calculate score
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        const baseScore = 100;
        const timeBonus = timeTaken < 30 ? 50 : 0;
        const attemptBonus = this.attempts === 0 ? 100 : 0;
        const totalScore = baseScore + timeBonus + attemptBonus;
        
        this.score += totalScore;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        
        // Update streak
        this.streak++;
        
        // Check achievements
        this.checkAchievements();
        
        // Show success modal
        document.getElementById('baseScore').textContent = `+${baseScore}`;
        document.getElementById('timeBonus').textContent = timeBonus > 0 ? `+${timeBonus}` : '0';
        document.getElementById('attemptBonus').textContent = attemptBonus > 0 ? `+${attemptBonus}` : '0';
        document.getElementById('totalScore').textContent = `+${totalScore}`;
        
        document.getElementById('successModal').classList.remove('hidden');
        document.getElementById('nextLevel').classList.remove('hidden');
        
        this.updateUI();
        this.saveProgress();
        
        this.showToast('🎉 Level Complete! Great job!', 'success');
    }

    onLevelFailure(levelData) {
        console.log('❌ Level Failed!');
        
        this.attempts++;
        document.getElementById('attemptsValue').textContent = `${this.attempts}/${this.maxAttempts}`;
        
        // Reset streak
        this.streak = 0;
        
        if (this.attempts >= this.maxAttempts) {
            this.showToast('❌ Max attempts reached! Try next level!', 'error');
            setTimeout(() => this.nextLevel(), 2000);
        } else {
            this.showToast(`❌ Not quite! Try again! (${this.maxAttempts - this.attempts} attempts left)`, 'warning');
        }
        
        // Show hint in feedback
        const feedback = document.getElementById('feedbackPanel');
        const content = document.getElementById('feedbackContent');
        if (feedback && content) {
            content.innerHTML = `
                <p><strong>❌ Incorrect!</strong></p>
                <p>${levelData.hint}</p>
            `;
            feedback.classList.remove('hidden', 'success');
            feedback.classList.add('error');
        }
    }

    checkAchievements() {
        // Scholar: Complete 10 levels
        if (this.currentLevel >= 10 && !this.achievements.scholar) {
            this.achievements.scholar = true;
            this.showAchievement('🎓 Scholar', 'Complete 10 levels!');
        }
        
        // Hot Streak: 5 consecutive wins
        if (this.streak >= 5 && !this.achievements.hotStreak) {
            this.achievements.hotStreak = true;
            this.showAchievement('🔥 Hot Streak', '5 consecutive wins!');
        }
    }

    showAchievement(name, desc) {
        const achievementDiv = document.getElementById('newAchievement');
        if (achievementDiv) {
            achievementDiv.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
                <div style="font-size: 1.125rem; font-weight: 700;">${name}</div>
                <div style="font-size: 0.875rem; opacity: 0.9;">${desc}</div>
            `;
        }
        
        this.showToast(`🏆 Achievement Unlocked: ${name}!`, 'success');
    }

    nextLevel() {
        document.getElementById('successModal')?.classList.add('hidden');
        
        if (this.currentLevel >= 50) {
            this.showToast('🎉 You completed all levels! You are an ECE MASTER!', 'success');
            return;
        }
        
        this.loadLevel(this.currentLevel + 1);
    }

    clearCircuit() {
        this.circuit.components = [];
        this.circuit.wires = [];
        this.circuit.measurements = {};
        this.selectedPoints = [];
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.showToast('Circuit cleared! 🗑️', 'info');
    }

    showHint() {
        const levelData = LEVEL_DATA[this.currentLevel];
        if (!levelData) return;
        
        // Deduct points
        this.score = Math.max(0, this.score - 25);
        this.updateUI();
        
        // Show hint modal
        document.getElementById('hintText').textContent = levelData.hint;
        document.getElementById('hintModal').classList.remove('hidden');
    }

    closeHintModal() {
        document.getElementById('hintModal')?.classList.add('hidden');
    }

    closeSuccessModal() {
        document.getElementById('successModal')?.classList.add('hidden');
    }

    openMultimeter() {
        document.getElementById('multimeterModal')?.classList.remove('hidden');
        this.showToast('Click two points on circuit to measure!', 'info');
    }

    closeMultimeter() {
        document.getElementById('multimeterModal')?.classList.add('hidden');
    }

    closeMeasurement() {
        document.getElementById('measurementOverlay')?.classList.add('hidden');
    }

    resetProgress() {
        if (confirm('⚠️ Reset all progress? This cannot be undone!')) {
            localStorage.removeItem('eceMasterProgress');
            this.currentLevel = 1;
            this.score = 0;
            this.highScore = 0;
            this.achievements = {
                scholar: false,
                speedDemon: false,
                perfectionist: false,
                hotStreak: false
            };
            this.loadLevel(1);
            this.showToast('Progress reset! Starting fresh! 🔄', 'info');
        }
    }

    updateUI() {
        document.getElementById('scoreValue').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
    }

    showToast(message, type = 'info') {
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
        
        // Create toast element
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
            z-index: 3000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Start the game!
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 ECE MASTER - Initializing...');
    window.game = new GameEngine();
});
