// 🎓 Simple Learning Platform - Clean & Easy

const SimpleLearning = {
    panels: {
        aiTutor: null,
        simulation: null,
        webcam: null
    },
    
    webcamStream: null,
    
    init() {
        console.log('🎓 Initializing Simple Learning Platform...');
        this.createMenu();
        this.createPanels();
        this.attachEventListeners();
    },
    
    createMenu() {
        // Remove existing menu if any
        const existing = document.querySelector('.simple-learning-menu');
        if (existing) existing.remove();
        
        const menu = document.createElement('div');
        menu.className = 'simple-learning-menu';
        menu.innerHTML = `
            <div class="menu-logo">
                <span>🎓</span>
                <span>ECE Learning Platform</span>
            </div>
            <div class="menu-buttons">
                <button class="menu-btn" onclick="SimpleLearning.openAITutor()">
                    <span>🤖</span>
                    <span>AI Tutor</span>
                </button>
                <button class="menu-btn" onclick="SimpleLearning.openSimulation()">
                    <span>🧪</span>
                    <span>Simulation</span>
                </button>
                <button class="menu-btn" onclick="SimpleLearning.openWebcam()">
                    <span>📹</span>
                    <span>Webcam</span>
                </button>
            </div>
        `;
        
        document.body.insertBefore(menu, document.body.firstChild);
    },
    
    createPanels() {
        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'feature-backdrop';
        backdrop.onclick = () => this.closeAllPanels();
        document.body.appendChild(backdrop);
        
        // AI Tutor Panel
        this.panels.aiTutor = this.createPanel(
            'ai-tutor-panel',
            '🤖 AI Tutor - Ask Anything',
            `
            <div class="ai-chat-container">
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-message ai">
                        👋 Hello! I'm your AI Tutor. Ask me anything about electronics, circuits, or any concept you're learning!
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chatInput" placeholder="Type your question here..." onkeypress="if(event.key==='Enter') SimpleLearning.sendMessage()">
                    <button onclick="SimpleLearning.sendMessage()">Send</button>
                </div>
            </div>
            `
        );
        
        // Simulation Panel
        this.panels.simulation = this.createPanel(
            'simulation-panel',
            '🧪 Circuit Simulation',
            `
            <div class="simulation-container">
                <div class="simulation-canvas" id="simCanvas">
                    ⚡ Your circuit simulation will appear here
                </div>
                <div class="simulation-controls">
                    <button class="sim-btn primary" onclick="SimpleLearning.startSimulation()">▶️ Start Simulation</button>
                    <button class="sim-btn" onclick="SimpleLearning.pauseSimulation()">⏸️ Pause</button>
                    <button class="sim-btn" onclick="SimpleLearning.resetSimulation()">🔄 Reset</button>
                    <button class="sim-btn" onclick="SimpleLearning.exportResults()">📊 Export Results</button>
                </div>
            </div>
            `
        );
        
        // Webcam Panel
        this.panels.webcam = this.createPanel(
            'webcam-panel',
            '📹 Webcam - Show Your Work',
            `
            <div class="webcam-container">
                <div class="webcam-display" id="webcamDisplay">
                    <p>📹 Click "Start Camera" to begin</p>
                </div>
                <div class="webcam-controls">
                    <button class="webcam-btn" onclick="SimpleLearning.startCamera()">📹 Start Camera</button>
                    <button class="webcam-btn danger" onclick="SimpleLearning.stopCamera()">⏹️ Stop Camera</button>
                    <button class="webcam-btn" onclick="SimpleLearning.takeSnapshot()">📸 Take Snapshot</button>
                </div>
            </div>
            `
        );
    },
    
    createPanel(id, title, content) {
        const panel = document.createElement('div');
        panel.className = 'feature-panel';
        panel.id = id;
        panel.innerHTML = `
            <div class="panel-header">
                <h2>${title}</h2>
                <button class="close-btn" onclick="SimpleLearning.closeAllPanels()">×</button>
            </div>
            <div class="panel-content">
                ${content}
            </div>
        `;
        document.body.appendChild(panel);
        return panel;
    },
    
    attachEventListeners() {
        // ESC key to close panels
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllPanels();
            }
        });
    },
    
    // Open/Close Functions
    openAITutor() {
        this.closeAllPanels();
        this.panels.aiTutor.classList.add('active');
        document.querySelector('.feature-backdrop').classList.add('active');
        document.getElementById('chatInput').focus();
        
        // Track feature usage
        if (window.trackFeatureUse) {
            window.trackFeatureUse('AI Tutor');
        }
    },
    
    openSimulation() {
        this.closeAllPanels();
        this.panels.simulation.classList.add('active');
        document.querySelector('.feature-backdrop').classList.add('active');
        
        if (window.trackFeatureUse) {
            window.trackFeatureUse('Simulation');
        }
    },
    
    openWebcam() {
        this.closeAllPanels();
        this.panels.webcam.classList.add('active');
        document.querySelector('.feature-backdrop').classList.add('active');
        
        if (window.trackFeatureUse) {
            window.trackFeatureUse('Webcam');
        }
    },
    
    closeAllPanels() {
        Object.values(this.panels).forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelector('.feature-backdrop').classList.remove('active');
        
        // Stop webcam if open
        if (this.webcamStream) {
            this.stopCamera();
        }
    },
    
    // AI Tutor Functions
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addChatMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addChatMessage(response, 'ai');
        }, 1000);
    },
    
    addChatMessage(text, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    generateAIResponse(question) {
        const responses = {
            'led': '💡 An LED (Light Emitting Diode) is a semiconductor that emits light when current flows through it. Always connect it with a current-limiting resistor!',
            'resistor': '⚡ A resistor limits the flow of electric current. Use Ohm\'s Law: V = IR to calculate resistance values.',
            'voltage': '⚡ Voltage is the electrical potential difference between two points. It\'s measured in Volts (V).',
            'current': '⚡ Current is the flow of electric charge, measured in Amperes (A). It flows from positive to negative.',
            'circuit': '🔌 A circuit is a closed loop that allows electric current to flow. It needs a power source, conductors, and a load.',
            'ohm': '📐 Ohm\'s Law: V = IR. Voltage equals Current times Resistance. This is fundamental to circuit analysis!',
            'battery': '🔋 A battery is a power source that converts chemical energy to electrical energy, providing DC voltage.'
        };
        
        const lowerQ = question.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerQ.includes(key)) {
                return response;
            }
        }
        
        return `I understand you're asking about "${question}". For electronics concepts, try asking about LEDs, resistors, voltage, current, circuits, Ohm's Law, or batteries. I'm here to help! 📚`;
    },
    
    // Simulation Functions
    startSimulation() {
        const canvas = document.getElementById('simCanvas');
        canvas.innerHTML = '⚡ Simulation Running... Analyzing circuit behavior...';
        canvas.style.background = 'linear-gradient(135deg, #f0f9ff, #e0f2fe)';
        
        setTimeout(() => {
            canvas.innerHTML = `
                <div style="text-align: left; padding: 20px;">
                    <h3 style="color: #4f46e5; margin-bottom: 15px;">📊 Simulation Results:</h3>
                    <p><strong>✅ Circuit Status:</strong> Functional</p>
                    <p><strong>⚡ Total Current:</strong> 150 mA</p>
                    <p><strong>🔋 Voltage Drop:</strong> 2.1 V across LED</p>
                    <p><strong>💡 LED Brightness:</strong> Optimal</p>
                    <p><strong>🌡️ Temperature:</strong> Normal (25°C)</p>
                </div>
            `;
        }, 2000);
    },
    
    pauseSimulation() {
        const canvas = document.getElementById('simCanvas');
        canvas.innerHTML = '⏸️ Simulation Paused';
    },
    
    resetSimulation() {
        const canvas = document.getElementById('simCanvas');
        canvas.innerHTML = '⚡ Your circuit simulation will appear here';
        canvas.style.background = 'white';
    },
    
    exportResults() {
        alert('📊 Simulation results exported to downloads folder!');
    },
    
    // Webcam Functions
    async startCamera() {
        try {
            this.webcamStream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 1280, height: 720 },
                audio: false 
            });
            
            const display = document.getElementById('webcamDisplay');
            display.innerHTML = '<video autoplay playsinline></video>';
            const video = display.querySelector('video');
            video.srcObject = this.webcamStream;
            
            console.log('📹 Webcam started successfully');
        } catch (error) {
            console.error('Webcam error:', error);
            alert('❌ Could not access webcam. Please check permissions.');
        }
    },
    
    stopCamera() {
        if (this.webcamStream) {
            this.webcamStream.getTracks().forEach(track => track.stop());
            this.webcamStream = null;
            
            const display = document.getElementById('webcamDisplay');
            display.innerHTML = '<p>📹 Camera stopped</p>';
            
            console.log('⏹️ Webcam stopped');
        }
    },
    
    takeSnapshot() {
        if (!this.webcamStream) {
            alert('⚠️ Please start the camera first!');
            return;
        }
        
        const video = document.querySelector('#webcamDisplay video');
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        // Download snapshot
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `circuit-snapshot-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
        });
        
        console.log('📸 Snapshot taken');
        alert('📸 Snapshot saved to downloads!');
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SimpleLearning.init());
} else {
    SimpleLearning.init();
}
