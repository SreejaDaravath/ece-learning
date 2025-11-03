// 🎓 ECE MASTER - Ultimate Learning Suite v6.0
// AI Tutor, Live Simulation, Certificates, Webcam Integration

const UltimateLearning = {
    // ================================
    // 🤖 AI TUTOR WITH WEBCAM
    // ================================
    aiTutor: {
        active: false,
        webcamEnabled: false,
        videoStream: null,
        context: []
    },

    initAITutor() {
        this.createAITutorPanel();
    },

    createAITutorPanel() {
        const panel = document.createElement('div');
        panel.className = 'ai-tutor-floating';
        panel.id = 'aiTutorFloating';
        panel.innerHTML = `
            <div class="tutor-header">
                <div class="tutor-avatar-animated">🤖</div>
                <div class="tutor-info">
                    <h3>AI Tutor</h3>
                    <p class="tutor-status">Ready to help!</p>
                </div>
                <button class="minimize-btn" onclick="UltimateLearning.toggleTutor()">−</button>
            </div>
            
            <div class="tutor-body" id="tutorBody">
                <!-- Webcam Section -->
                <div class="webcam-section">
                    <div class="webcam-preview" id="webcamPreview">
                        <video id="aiTutorWebcam" autoplay playsinline></video>
                        <div class="webcam-overlay">
                            <button class="webcam-toggle-btn" onclick="UltimateLearning.toggleWebcam()">
                                <span id="webcamBtnIcon">📹</span>
                                <span id="webcamBtnText">Start Video Help</span>
                            </button>
                        </div>
                    </div>
                    <canvas id="aiWebcamCanvas" style="display:none;"></canvas>
                </div>
                
                <!-- Chat Interface -->
                <div class="chat-container">
                    <div class="chat-messages" id="aiChatMessages">
                        <div class="ai-message">
                            <div class="message-avatar">🤖</div>
                            <div class="message-content">
                                <p><strong>Hello! I'm your AI Electronics Tutor!</strong></p>
                                <p>I can help you with:</p>
                                <div class="help-chips">
                                    <span class="chip">🔌 Circuit Design</span>
                                    <span class="chip">📐 Calculations</span>
                                    <span class="chip">🔍 Component Info</span>
                                    <span class="chip">🎯 Problem Solving</span>
                                </div>
                                <p>Ask me anything or show me your circuit via webcam!</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="quick-actions-grid">
                        <button class="qa-btn" onclick="UltimateLearning.quickHelp('explain')">
                            💡 Explain Concept
                        </button>
                        <button class="qa-btn" onclick="UltimateLearning.quickHelp('solve')">
                            🔧 Solve Problem
                        </button>
                        <button class="qa-btn" onclick="UltimateLearning.quickHelp('example')">
                            📝 Show Example
                        </button>
                        <button class="qa-btn" onclick="UltimateLearning.quickHelp('tips')">
                            🎯 Get Tips
                        </button>
                    </div>
                    
                    <!-- Input Area -->
                    <div class="chat-input-area">
                        <input 
                            type="text" 
                            id="aiTutorInput" 
                            placeholder="Ask me anything about electronics..."
                            onkeypress="if(event.key==='Enter') UltimateLearning.sendToTutor()"
                        />
                        <button class="send-button" onclick="UltimateLearning.sendToTutor()">
                            ▶️
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
    },

    toggleTutor() {
        const body = document.getElementById('tutorBody');
        const btn = document.querySelector('.minimize-btn');
        if (body.style.display === 'none') {
            body.style.display = 'flex';
            btn.textContent = '−';
        } else {
            body.style.display = 'none';
            btn.textContent = '+';
        }
    },

    async toggleWebcam() {
        const video = document.getElementById('aiTutorWebcam');
        const btnIcon = document.getElementById('webcamBtnIcon');
        const btnText = document.getElementById('webcamBtnText');
        
        if (!this.aiTutor.webcamEnabled) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { width: 640, height: 480 },
                    audio: false 
                });
                video.srcObject = stream;
                this.aiTutor.videoStream = stream;
                this.aiTutor.webcamEnabled = true;
                btnIcon.textContent = '⏸️';
                btnText.textContent = 'Stop Video';
                this.addAIMessage('✅ Webcam activated! Show me your circuit and I\'ll analyze it in real-time.');
            } catch (error) {
                alert('📹 Cannot access webcam. Please allow camera permissions.');
            }
        } else {
            if (this.aiTutor.videoStream) {
                this.aiTutor.videoStream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
                this.aiTutor.videoStream = null;
                this.aiTutor.webcamEnabled = false;
                btnIcon.textContent = '📹';
                btnText.textContent = 'Start Video Help';
                this.addAIMessage('Webcam stopped. Click to start again when you need help!');
            }
        }
    },

    addAIMessage(text) {
        const container = document.getElementById('aiChatMessages');
        const msg = document.createElement('div');
        msg.className = 'ai-message';
        msg.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    },

    addUserMessage(text) {
        const container = document.getElementById('aiChatMessages');
        const msg = document.createElement('div');
        msg.className = 'user-message';
        msg.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-avatar">👤</div>
        `;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    },

    sendToTutor() {
        const input = document.getElementById('aiTutorInput');
        const text = input.value.trim();
        if (!text) return;
        
        this.addUserMessage(text);
        input.value = '';
        
        setTimeout(() => {
            const response = this.generateSmartResponse(text);
            this.addAIMessage(response);
        }, 1000);
    },

    generateSmartResponse(question) {
        const q = question.toLowerCase();
        
        if (q.includes('ohm') || q.includes('voltage') || q.includes('current') || q.includes('resistance')) {
            return `<strong>⚡ Ohm's Law Explained:</strong><br><br>
                V = I × R<br><br>
                <strong>V</strong> (Voltage) = Electrical pressure in Volts<br>
                <strong>I</strong> (Current) = Flow of electrons in Amperes<br>
                <strong>R</strong> (Resistance) = Opposition in Ohms<br><br>
                💡 <strong>Tip:</strong> If you increase resistance, current decreases (if voltage stays constant)!`;
        }
        
        if (q.includes('help') || q.includes('stuck') || q.includes('how')) {
            return `<strong>🔧 Here's How to Succeed:</strong><br><br>
                ✅ <strong>Step 1:</strong> Understand the level requirements<br>
                ✅ <strong>Step 2:</strong> Place components on breadboard<br>
                ✅ <strong>Step 3:</strong> Connect wires properly<br>
                ✅ <strong>Step 4:</strong> Test your circuit<br><br>
                💡 Use the simulation to see current flow in real-time!`;
        }
        
        if (q.includes('example') || q.includes('show') || q.includes('demo')) {
            return `<strong>📝 Circuit Building Example:</strong><br><br>
                <strong>Simple LED Circuit:</strong><br>
                1. Battery (+) → Resistor → LED (+) → Ground<br>
                2. Resistor limits current to protect LED<br>
                3. LED only works one direction (polarity matters!)<br><br>
                🎯 Try building this in Sandbox mode first!`;
        }
        
        if (q.includes('calculate') || q.includes('math') || q.includes('formula')) {
            return `<strong>📐 Circuit Calculations:</strong><br><br>
                <strong>Common Formulas:</strong><br>
                • Ohm's Law: V = I × R<br>
                • Power: P = V × I = I²R = V²/R<br>
                • Series: R_total = R1 + R2 + ...<br>
                • Parallel: 1/R_total = 1/R1 + 1/R2 + ...<br><br>
                📊 What would you like to calculate?`;
        }
        
        return `<strong>Great question!</strong> 🤔<br><br>
            Based on your current level, here are some tips:<br><br>
            🎯 Focus on understanding components first<br>
            🔌 Practice wire connections<br>
            📊 Use measurement tools<br>
            💡 Don't hesitate to use hints<br><br>
            <strong>Ask me specific questions for better help!</strong>`;
    },

    quickHelp(type) {
        const prompts = {
            explain: 'Can you explain Ohm\'s Law and how it applies to this circuit?',
            solve: 'I need help solving this circuit problem step by step',
            example: 'Can you show me an example of a working circuit?',
            tips: 'What are some tips for building better circuits?'
        };
        document.getElementById('aiTutorInput').value = prompts[type];
        this.sendToTutor();
    },

    // ================================
    // ⚡ LIVE CIRCUIT SIMULATION
    // ================================
    simulation: {
        active: false,
        speed: 1,
        visualizations: {
            currentFlow: true,
            voltagePoints: true,
            heatMap: false
        }
    },

    initSimulation() {
        this.createSimulationPanel();
    },

    createSimulationPanel() {
        const panel = document.createElement('div');
        panel.className = 'simulation-panel';
        panel.id = 'simulationPanel';
        panel.innerHTML = `
            <div class="sim-header">
                <h3>⚡ Live Simulation</h3>
                <div class="sim-status">
                    <span class="status-indicator" id="simIndicator"></span>
                    <span id="simStatusText">Ready</span>
                </div>
            </div>
            
            <div class="sim-controls">
                <button class="sim-control-btn primary" onclick="UltimateLearning.startSim()">
                    ▶️ Start
                </button>
                <button class="sim-control-btn" onclick="UltimateLearning.pauseSim()">
                    ⏸️ Pause
                </button>
                <button class="sim-control-btn" onclick="UltimateLearning.resetSim()">
                    🔄 Reset
                </button>
            </div>
            
            <div class="sim-options">
                <h4>Visualization Options</h4>
                <label class="sim-checkbox">
                    <input type="checkbox" checked onchange="UltimateLearning.toggleSimViz('currentFlow', this.checked)">
                    <span>💫 Current Flow Animation</span>
                </label>
                <label class="sim-checkbox">
                    <input type="checkbox" checked onchange="UltimateLearning.toggleSimViz('voltagePoints', this.checked)">
                    <span>⚡ Voltage Indicators</span>
                </label>
                <label class="sim-checkbox">
                    <input type="checkbox" onchange="UltimateLearning.toggleSimViz('heatMap', this.checked)">
                    <span>🔥 Component Heat Map</span>
                </label>
            </div>
            
            <div class="sim-speed">
                <label>
                    <span>⏱️ Speed:</span>
                    <input type="range" min="0.5" max="3" step="0.5" value="1" 
                           oninput="UltimateLearning.setSimSpeed(this.value)">
                    <span id="speedDisplay">1.0x</span>
                </label>
            </div>
            
            <div class="sim-metrics">
                <div class="metric-card">
                    <span class="metric-icon">⚡</span>
                    <div class="metric-data">
                        <span class="metric-value" id="simCurrent">0 mA</span>
                        <span class="metric-label">Current</span>
                    </div>
                </div>
                <div class="metric-card">
                    <span class="metric-icon">🔋</span>
                    <div class="metric-data">
                        <span class="metric-value" id="simVoltage">0 V</span>
                        <span class="metric-label">Voltage</span>
                    </div>
                </div>
                <div class="metric-card">
                    <span class="metric-icon">💡</span>
                    <div class="metric-data">
                        <span class="metric-value" id="simPower">0 mW</span>
                        <span class="metric-label">Power</span>
                    </div>
                </div>
            </div>
        `;
        
        const workspace = document.querySelector('.main-workspace') || document.body;
        workspace.appendChild(panel);
    },

    startSim() {
        this.simulation.active = true;
        document.getElementById('simIndicator').className = 'status-indicator active';
        document.getElementById('simStatusText').textContent = 'Running';
        this.runSimulationLoop();
    },

    pauseSim() {
        this.simulation.active = false;
        document.getElementById('simIndicator').className = 'status-indicator paused';
        document.getElementById('simStatusText').textContent = 'Paused';
    },

    resetSim() {
        this.pauseSim();
        document.getElementById('simIndicator').className = 'status-indicator';
        document.getElementById('simStatusText').textContent = 'Ready';
        document.getElementById('simCurrent').textContent = '0 mA';
        document.getElementById('simVoltage').textContent = '0 V';
        document.getElementById('simPower').textContent = '0 mW';
    },

    runSimulationLoop() {
        if (!this.simulation.active) return;
        
        // Simulate realistic values
        const current = (Math.random() * 100 + 20).toFixed(1);
        const voltage = (Math.random() * 12 + 3).toFixed(1);
        const power = (current * voltage / 1000).toFixed(2);
        
        document.getElementById('simCurrent').textContent = `${current} mA`;
        document.getElementById('simVoltage').textContent = `${voltage} V`;
        document.getElementById('simPower').textContent = `${power} mW`;
        
        setTimeout(() => this.runSimulationLoop(), 1000 / this.simulation.speed);
    },

    setSimSpeed(speed) {
        this.simulation.speed = parseFloat(speed);
        document.getElementById('speedDisplay').textContent = `${speed}x`;
    },

    toggleSimViz(type, enabled) {
        this.simulation.visualizations[type] = enabled;
        console.log(`Simulation ${type}: ${enabled ? 'ON' : 'OFF'}`);
    },

    // ================================
    // 🏆 CERTIFICATE SYSTEM
    // ================================
    certificates: {
        earned: [],
        available: [
            { id: 'basic', name: 'Basic Circuits Champion', levels: 10, icon: '🎓' },
            { id: 'intermediate', name: 'Intermediate Designer', levels: 25, icon: '⚡' },
            { id: 'advanced', name: 'Advanced Engineer', levels: 40, icon: '🔧' },
            { id: 'expert', name: 'Electronics Expert', levels: 50, icon: '🏆' }
        ]
    },

    initCertificates() {
        this.createCertificateButton();
        this.loadCertificates();
    },

    createCertificateButton() {
        const btn = document.createElement('button');
        btn.className = 'certificate-floating-btn';
        btn.id = 'certFloatingBtn';
        btn.innerHTML = '🏆 <span>Certificates</span>';
        btn.onclick = () => this.showCertificateModal();
        document.body.appendChild(btn);
    },

    showCertificateModal() {
        const modal = document.createElement('div');
        modal.className = 'certificate-modal-overlay';
        modal.innerHTML = `
            <div class="certificate-modal">
                <div class="cert-modal-header">
                    <h2>🏆 Your Certificates</h2>
                    <button class="close-modal-btn" onclick="this.closest('.certificate-modal-overlay').remove()">✕</button>
                </div>
                
                <div class="cert-grid">
                    ${this.certificates.available.map(cert => {
                        const earned = this.certificates.earned.includes(cert.id);
                        return `
                            <div class="cert-card ${earned ? 'earned' : 'locked'}">
                                <div class="cert-icon-large">${earned ? cert.icon : '🔒'}</div>
                                <h3>${cert.name}</h3>
                                <p class="cert-requirement">
                                    ${earned ? 'Completed!' : `Complete ${cert.levels} levels`}
                                </p>
                                ${earned ? `
                                    <button class="download-cert-btn" onclick="UltimateLearning.generateCertificate('${cert.id}')">
                                        📥 Download Certificate
                                    </button>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    checkAndAwardCertificates(levelsCompleted) {
        this.certificates.available.forEach(cert => {
            if (levelsCompleted >= cert.levels && !this.certificates.earned.includes(cert.id)) {
                this.awardCertificate(cert);
            }
        });
    },

    awardCertificate(cert) {
        this.certificates.earned.push(cert.id);
        this.saveCertificates();
        this.showCertificateEarnedModal(cert);
    },

    showCertificateEarnedModal(cert) {
        const modal = document.createElement('div');
        modal.className = 'certificate-earned-modal';
        modal.innerHTML = `
            <div class="cert-earned-card">
                <div class="confetti">🎉🎊✨🎈</div>
                <div class="cert-badge-large">${cert.icon}</div>
                <h2>Congratulations!</h2>
                <p>You've earned the</p>
                <h3>${cert.name}</h3>
                <p class="cert-date">${new Date().toLocaleDateString()}</p>
                <button class="download-cert-btn primary" onclick="UltimateLearning.generateCertificate('${cert.id}')">
                    📥 Download Certificate
                </button>
                <button class="close-btn" onclick="this.closest('.certificate-earned-modal').remove()">
                    Close
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    },

    generateCertificate(certId) {
        const cert = this.certificates.available.find(c => c.id === certId);
        if (!cert) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 850;
        const ctx = canvas.getContext('2d');
        
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(0.5, '#764ba2');
        gradient.addColorStop(1, '#667eea');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // White certificate area
        ctx.fillStyle = 'white';
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
        
        // Gold border
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 15;
        ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);
        
        // Title
        ctx.fillStyle = '#2d3748';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF ACHIEVEMENT', canvas.width / 2, 180);
        
        // Subtitle
        ctx.font = '30px Arial';
        ctx.fillStyle = '#4a5568';
        ctx.fillText('This certifies that', canvas.width / 2, 250);
        
        // Student name
        ctx.font = 'bold 50px Arial';
        ctx.fillStyle = '#667eea';
        ctx.fillText('ECE MASTER Student', canvas.width / 2, 340);
        
        // Achievement
        ctx.font = '32px Arial';
        ctx.fillStyle = '#2d3748';
        ctx.fillText('has successfully completed', canvas.width / 2, 410);
        
        // Certificate name
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = '#764ba2';
        ctx.fillText(cert.name, canvas.width / 2, 490);
        
        // Description
        ctx.font = '26px Arial';
        ctx.fillStyle = '#4a5568';
        ctx.fillText(`Demonstrating mastery in electronics and circuit design`, canvas.width / 2, 560);
        
        // Date
        ctx.font = '24px Arial';
        const date = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        ctx.fillText(date, canvas.width / 2, 630);
        
        // Signature line
        ctx.strokeStyle = '#2d3748';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 200, 710);
        ctx.lineTo(canvas.width / 2 + 200, 710);
        ctx.stroke();
        
        ctx.font = '22px Arial';
        ctx.fillText('ECE MASTER Learning Platform', canvas.width / 2, 745);
        
        // Download
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${cert.name.replace(/\s+/g, '-')}-Certificate.png`;
            a.click();
            URL.revokeObjectURL(url);
            alert('✅ Certificate downloaded successfully!');
        });
    },

    saveCertificates() {
        localStorage.setItem('ece-certificates-earned', JSON.stringify(this.certificates.earned));
    },

    loadCertificates() {
        const saved = localStorage.getItem('ece-certificates-earned');
        if (saved) {
            this.certificates.earned = JSON.parse(saved);
        }
    },

    // ================================
    // 🚀 INITIALIZATION
    // ================================
    init() {
        console.log('🚀 Initializing Ultimate Learning Suite v6.0...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initAll());
        } else {
            this.initAll();
        }
    },

    initAll() {
        try {
            this.initAITutor();
            this.initSimulation();
            this.initCertificates();
            
            console.log('✅ All ultimate features initialized!');
        } catch (error) {
            console.error('❌ Error initializing features:', error);
        }
    }
};

// Auto-initialize
UltimateLearning.init();

// Global export
if (typeof window !== 'undefined') {
    window.UltimateLearning = UltimateLearning;
}
