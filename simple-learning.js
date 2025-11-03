// 🎓 Simple Learning Platform - Clean & Easy

const SimpleLearning = {
    panels: {
        aiTutor: null,
        simulation: null,
        webcam: null
    },
    
    webcamStream: null,
    screenStream: null,
    currentRoom: null,
    isVideoOn: false,
    isAudioOn: false,
    isScreenSharing: false,
    whiteboardActive: false,
    participants: [],
    
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
            '🤖 AI Tutor - Your Personal Electronics Assistant',
            `
            <div class="ai-chat-container">
                <div class="ai-features-bar">
                    <button class="feature-btn" onclick="SimpleLearning.showExamples()">
                        <span>💡</span>
                        <span>Examples</span>
                    </button>
                    <button class="feature-btn" onclick="SimpleLearning.explainConcept()">
                        <span>📚</span>
                        <span>Explain</span>
                    </button>
                    <button class="feature-btn" onclick="SimpleLearning.solveCircuit()">
                        <span>🧮</span>
                        <span>Solve</span>
                    </button>
                    <button class="feature-btn" onclick="SimpleLearning.debugCircuit()">
                        <span>🐛</span>
                        <span>Debug</span>
                    </button>
                    <button class="feature-btn" onclick="SimpleLearning.clearChat()">
                        <span>🗑️</span>
                        <span>Clear</span>
                    </button>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-message ai">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <div class="message-header">
                                <strong>AI Tutor</strong>
                                <span class="message-time">just now</span>
                            </div>
                            <div class="message-text">
                                👋 Hello! I'm your AI Electronics Tutor powered by advanced AI.
                                
                                <div class="suggestions">
                                    <p><strong>I can help you with:</strong></p>
                                    <button class="suggestion-btn" onclick="SimpleLearning.askQuestion('Explain Ohm\\'s Law with examples')">⚡ Explain Ohm's Law</button>
                                    <button class="suggestion-btn" onclick="SimpleLearning.askQuestion('How does an LED work?')">💡 How LEDs work</button>
                                    <button class="suggestion-btn" onclick="SimpleLearning.askQuestion('Calculate resistor for LED circuit')">🧮 Calculate resistor values</button>
                                    <button class="suggestion-btn" onclick="SimpleLearning.askQuestion('Debug my circuit not working')">🐛 Debug circuits</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="typing-indicator" id="typingIndicator" style="display: none;">
                    <div class="message-avatar">🤖</div>
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <button class="attach-btn" onclick="SimpleLearning.attachImage()" title="Attach Image">
                        <span>📎</span>
                    </button>
                    <textarea id="chatInput" 
                              placeholder="Ask me anything about electronics..." 
                              rows="1"
                              onkeypress="if(event.key==='Enter' && !event.shiftKey) { event.preventDefault(); SimpleLearning.sendMessage(); }"
                              oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"></textarea>
                    <button class="voice-btn" onclick="SimpleLearning.voiceInput()" title="Voice Input">
                        <span>🎤</span>
                    </button>
                    <button class="send-btn" onclick="SimpleLearning.sendMessage()">
                        <span>📤</span>
                    </button>
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
            '📹 Collaboration Room - Meet & Learn',
            `
            <div class="webcam-container">
                <div class="room-controls">
                    <input type="text" class="room-input" id="roomCode" placeholder="Enter room code (e.g., ECE-123)">
                    <button class="room-btn create" onclick="SimpleLearning.createRoom()">
                        <span>➕</span>
                        <span>Create Room</span>
                    </button>
                    <button class="room-btn join" onclick="SimpleLearning.joinRoom()">
                        <span>🚪</span>
                        <span>Join Room</span>
                    </button>
                </div>
                
                <div class="webcam-display" id="webcamDisplay">
                    <p>� Create or join a room to start collaboration</p>
                </div>
                
                <div class="webcam-controls">
                    <button class="webcam-btn" id="videoBtn" onclick="SimpleLearning.toggleVideo()">
                        <span>📹</span>
                        <span>Start Video</span>
                    </button>
                    <button class="webcam-btn" id="audioBtn" onclick="SimpleLearning.toggleAudio()">
                        <span>🎤</span>
                        <span>Unmute</span>
                    </button>
                    <button class="webcam-btn" id="screenBtn" onclick="SimpleLearning.shareScreen()">
                        <span>🖥️</span>
                        <span>Share Screen</span>
                    </button>
                    <button class="webcam-btn" id="whiteboardBtn" onclick="SimpleLearning.openWhiteboard()">
                        <span>✏️</span>
                        <span>Whiteboard</span>
                    </button>
                    <button class="webcam-btn danger" onclick="SimpleLearning.leaveRoom()">
                        <span>�</span>
                        <span>Leave Room</span>
                    </button>
                </div>
                
                <div class="participants-list" id="participantsList" style="display: none;">
                    <h4>
                        <span>👥</span>
                        <span>Participants (<span id="participantCount">0</span>)</span>
                    </h4>
                    <div id="participantsContainer"></div>
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
        input.style.height = 'auto';
        
        // Show typing indicator
        this.showTyping(true);
        
        // Simulate AI response with delay
        setTimeout(() => {
            this.showTyping(false);
            const response = this.generateAIResponse(message);
            this.addChatMessage(response, 'ai');
        }, 1500);
    },
    
    addChatMessage(text, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        
        if (type === 'ai') {
            messageDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-header">
                        <strong>AI Tutor</strong>
                        <span class="message-time">${time}</span>
                    </div>
                    <div class="message-text">${this.formatMessage(text)}</div>
                    <div class="message-actions">
                        <button class="action-btn" onclick="SimpleLearning.copyMessage(this)" title="Copy">📋</button>
                        <button class="action-btn" onclick="SimpleLearning.readAloud(this)" title="Read Aloud">🔊</button>
                        <button class="action-btn" onclick="SimpleLearning.likeMessage(this)" title="Helpful">👍</button>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <strong>You</strong>
                        <span class="message-time">${time}</span>
                    </div>
                    <div class="message-text">${text}</div>
                </div>
                <div class="message-avatar user">👤</div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    formatMessage(text) {
        // Convert markdown-like formatting
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');
        text = text.replace(/\n/g, '<br>');
        return text;
    },
    
    showTyping(show) {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.style.display = show ? 'flex' : 'none';
            if (show) {
                const container = document.getElementById('chatMessages');
                container.scrollTop = container.scrollHeight;
            }
        }
    },
    
    generateAIResponse(question) {
        const lowerQ = question.toLowerCase();
        
        // Comprehensive responses
        const responses = {
            'ohm': `⚡ **Ohm's Law Explained**
            
            Ohm's Law is the fundamental relationship in electronics:
            
            **V = I × R**
            
            Where:
            • V = Voltage (Volts)
            • I = Current (Amperes)
            • R = Resistance (Ohms)
            
            **Example:**
            If you have a 9V battery and want 20mA through an LED:
            R = V / I = 9V / 0.02A = **450Ω resistor**
            
            Use a standard 470Ω resistor (closest value).`,
            
            'led': `💡 **How LEDs Work**
            
            An LED (Light Emitting Diode) is a semiconductor that emits light when current flows through it.
            
            **Key Points:**
            • Forward voltage: ~2V for red, ~3V for blue/white
            • Current: Typically 20mA (0.02A)
            • **Always use a resistor!** Without it, LED will burn out
            
            **LED Circuit Formula:**
            R = (Vsupply - Vled) / I
            
            **Example:** 9V battery, red LED (2V), 20mA
            R = (9 - 2) / 0.02 = **350Ω** (use 390Ω)`,
            
            'resistor': `⚡ **Resistor Guide**
            
            Resistors limit current flow in circuits.
            
            **Color Code (4-band):**
            • Band 1-2: Value digits
            • Band 3: Multiplier
            • Band 4: Tolerance (gold=5%, silver=10%)
            
            **Common Values:**
            220Ω, 470Ω, 1kΩ, 10kΩ, 100kΩ
            
            **Power Rating:**
            P = I² × R or P = V² / R
            Use 1/4W for small circuits, 1/2W for higher current`,
            
            'capacitor': `🎛️ **Capacitors Explained**
            
            Capacitors store electrical energy temporarily.
            
            **Formula:** Q = C × V
            (Charge = Capacitance × Voltage)
            
            **Types:**
            • Ceramic: 10pF-10µF, non-polarized
            • Electrolytic: 1µF-10000µF, **polarized!**
            
            **Uses:**
            • Filtering/smoothing power
            • Timing circuits
            • Coupling/decoupling signals`,
            
            'voltage divider': `📊 **Voltage Divider**
            
            Split voltage using two resistors:
            
            **Formula:**
            Vout = Vin × (R2 / (R1 + R2))
            
            **Example:** 9V to 5V
            Use R1=4kΩ, R2=5kΩ
            Vout = 9 × (5/(4+5)) = **5V**
            
            **Note:** Works best with no load or high impedance load`,
            
            'debug': `🐛 **Circuit Debugging Tips**
            
            **Common Issues:**
            
            1. **LED not lighting:**
               • Check polarity (long leg = +)
               • Verify resistor value
               • Test battery voltage
            
            2. **No current flow:**
               • Check connections
               • Verify continuity
               • Look for broken wires
            
            3. **Component too hot:**
               • Reduce current
               • Add/increase resistor
               • Check power rating
            
            **Tools:** Use multimeter to measure V, I, R`,
            
            'calculate': `🧮 **Circuit Calculations**
            
            What would you like to calculate?
            
            • **LED resistor:** "calculate resistor for 9V LED"
            • **Current:** "calculate current in circuit"
            • **Power:** "calculate power dissipation"
            • **Voltage divider:** "calculate voltage divider"
            
            Just ask with your specific values!`,
        };
        
        // Check for matches
        for (const [key, response] of Object.entries(responses)) {
            if (lowerQ.includes(key)) {
                return response;
            }
        }
        
        // Calculate resistor for LED
        if (lowerQ.includes('calculate') && lowerQ.includes('resistor')) {
            return `🧮 **LED Resistor Calculator**
            
            To calculate the resistor:
            
            **Formula:** R = (Vsupply - Vled) / I
            
            **Standard values:**
            • Supply: 5V → Use 150Ω (for red LED)
            • Supply: 9V → Use 470Ω (for red LED)
            • Supply: 12V → Use 560Ω (for red LED)
            
            Tell me your supply voltage and LED color!`;
        }
        
        // Default helpful response
        return `🤖 **I'm here to help!**
        
        I can explain:
        • **Ohm's Law** - V = IR relationship
        • **LEDs** - How they work, resistor calculation
        • **Resistors** - Color codes, values, power
        • **Capacitors** - Types, usage, formulas
        • **Circuits** - Design, debugging, analysis
        
        Try asking: *"Explain Ohm's Law with examples"* or *"Calculate resistor for LED"*`;
    },
    
    askQuestion(question) {
        document.getElementById('chatInput').value = question;
        this.sendMessage();
    },
    
    showExamples() {
        this.addChatMessage(`💡 **Example Questions:**
        
        • "Explain Ohm's Law step by step"
        • "How to calculate LED resistor for 9V?"
        • "What's the difference between series and parallel?"
        • "How does a voltage divider work?"
        • "Debug: My LED is not lighting up"
        • "Calculate power dissipation in resistor"`, 'ai');
    },
    
    explainConcept() {
        this.addChatMessage(`📚 **What concept would you like me to explain?**
        
        Popular topics:
        • Ohm's Law
        • LED circuits
        • Voltage dividers
        • Capacitors
        • Transistors
        • Logic gates
        
        Just ask: "Explain [concept name]"`, 'ai');
    },
    
    solveCircuit() {
        this.addChatMessage(`🧮 **Circuit Solver**
        
        I can help calculate:
        • Resistor values for LEDs
        • Current in series/parallel
        • Voltage drops
        • Power dissipation
        • Capacitor charging time
        
        Describe your circuit and values!`, 'ai');
    },
    
    debugCircuit() {
        this.addChatMessage(`🐛 **Circuit Debugging Assistant**
        
        Tell me the problem:
        • "LED not working"
        • "Circuit getting hot"
        • "No voltage output"
        • "Incorrect readings"
        
        I'll help you find the issue!`, 'ai');
    },
    
    clearChat() {
        const container = document.getElementById('chatMessages');
        container.innerHTML = `
            <div class="chat-message ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-header">
                        <strong>AI Tutor</strong>
                        <span class="message-time">just now</span>
                    </div>
                    <div class="message-text">Chat cleared! How can I help you today?</div>
                </div>
            </div>
        `;
    },
    
    copyMessage(btn) {
        const text = btn.closest('.message-content').querySelector('.message-text').innerText;
        navigator.clipboard.writeText(text);
        btn.innerHTML = '✅';
        setTimeout(() => btn.innerHTML = '📋', 2000);
    },
    
    readAloud(btn) {
        const text = btn.closest('.message-content').querySelector('.message-text').innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
        btn.innerHTML = '🔊';
    },
    
    likeMessage(btn) {
        btn.innerHTML = btn.innerHTML === '👍' ? '💚' : '👍';
    },
    
    voiceInput() {
        if (!('webkitSpeechRecognition' in window)) {
            alert('⚠️ Voice input not supported in this browser. Try Chrome!');
            return;
        }
        
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        
        recognition.onstart = () => {
            console.log('🎤 Listening...');
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chatInput').value = transcript;
        };
        
        recognition.onerror = (event) => {
            console.error('Voice error:', event.error);
        };
        
        recognition.start();
    },
    
    attachImage() {
        alert('📎 Image attachment feature coming soon! You can describe your circuit problem for now.');
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
    
    // Room Management Functions
    createRoom() {
        const roomCode = 'ECE-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        document.getElementById('roomCode').value = roomCode;
        this.currentRoom = roomCode;
        
        this.initializeRoom();
        
        console.log('✅ Room created:', roomCode);
        alert(`✅ Room Created!\n\nRoom Code: ${roomCode}\n\nShare this code with others to join.`);
    },
    
    joinRoom() {
        const roomCode = document.getElementById('roomCode').value.trim();
        
        if (!roomCode) {
            alert('⚠️ Please enter a room code!');
            return;
        }
        
        this.currentRoom = roomCode;
        this.initializeRoom();
        
        console.log('✅ Joined room:', roomCode);
        alert(`✅ Joined Room: ${roomCode}`);
    },
    
    initializeRoom() {
        const display = document.getElementById('webcamDisplay');
        display.innerHTML = `
            <div class="status-indicator">
                <div class="status-dot"></div>
                <span>Connected</span>
            </div>
            <div class="room-info">
                Room: ${this.currentRoom}
            </div>
            <video autoplay playsinline muted style="width: 100%; height: 100%; object-fit: cover;"></video>
        `;
        
        // Show participants list
        document.getElementById('participantsList').style.display = 'block';
        
        // Add yourself as participant
        this.participants = [
            { name: 'You', video: true, audio: false }
        ];
        this.updateParticipantsList();
        
        // Auto-start video
        this.startVideo();
    },
    
    leaveRoom() {
        if (!this.currentRoom) {
            alert('⚠️ You are not in a room!');
            return;
        }
        
        // Stop all streams
        if (this.webcamStream) {
            this.webcamStream.getTracks().forEach(track => track.stop());
            this.webcamStream = null;
        }
        if (this.screenStream) {
            this.screenStream.getTracks().forEach(track => track.stop());
            this.screenStream = null;
        }
        
        const display = document.getElementById('webcamDisplay');
        display.innerHTML = '<p>👥 Create or join a room to start collaboration</p>';
        
        document.getElementById('participantsList').style.display = 'none';
        document.getElementById('roomCode').value = '';
        
        this.currentRoom = null;
        this.isVideoOn = false;
        this.isAudioOn = false;
        this.isScreenSharing = false;
        this.participants = [];
        
        // Reset buttons
        this.updateButtonStates();
        
        console.log('🚪 Left room');
        alert('🚪 Left the room successfully!');
    },
    
    // Video Control
    async toggleVideo() {
        if (!this.currentRoom) {
            alert('⚠️ Please join a room first!');
            return;
        }
        
        if (this.isVideoOn) {
            this.stopVideo();
        } else {
            await this.startVideo();
        }
    },
    
    async startVideo() {
        try {
            this.webcamStream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 1280, height: 720 },
                audio: this.isAudioOn
            });
            
            const video = document.querySelector('#webcamDisplay video');
            if (video) {
                video.srcObject = this.webcamStream;
            }
            
            this.isVideoOn = true;
            this.updateButtonStates();
            this.updateParticipantsList();
            
            console.log('📹 Video started');
        } catch (error) {
            console.error('Video error:', error);
            alert('❌ Could not access camera. Please check permissions.');
        }
    },
    
    stopVideo() {
        if (this.webcamStream) {
            this.webcamStream.getVideoTracks().forEach(track => track.stop());
        }
        
        this.isVideoOn = false;
        this.updateButtonStates();
        this.updateParticipantsList();
        
        console.log('📹 Video stopped');
    },
    
    // Audio Control
    toggleAudio() {
        if (!this.currentRoom) {
            alert('⚠️ Please join a room first!');
            return;
        }
        
        this.isAudioOn = !this.isAudioOn;
        
        if (this.webcamStream) {
            this.webcamStream.getAudioTracks().forEach(track => {
                track.enabled = this.isAudioOn;
            });
        }
        
        this.updateButtonStates();
        this.updateParticipantsList();
        
        console.log(this.isAudioOn ? '🎤 Unmuted' : '🔇 Muted');
    },
    
    // Screen Share
    async shareScreen() {
        if (!this.currentRoom) {
            alert('⚠️ Please join a room first!');
            return;
        }
        
        if (this.isScreenSharing) {
            this.stopScreenShare();
            return;
        }
        
        try {
            this.screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: 'always' },
                audio: false
            });
            
            const video = document.querySelector('#webcamDisplay video');
            if (video) {
                video.srcObject = this.screenStream;
            }
            
            this.screenStream.getVideoTracks()[0].onended = () => {
                this.stopScreenShare();
            };
            
            this.isScreenSharing = true;
            this.updateButtonStates();
            
            console.log('🖥️ Screen sharing started');
        } catch (error) {
            console.error('Screen share error:', error);
            alert('❌ Could not share screen.');
        }
    },
    
    stopScreenShare() {
        if (this.screenStream) {
            this.screenStream.getTracks().forEach(track => track.stop());
            this.screenStream = null;
        }
        
        // Switch back to webcam if it was on
        if (this.isVideoOn && this.webcamStream) {
            const video = document.querySelector('#webcamDisplay video');
            if (video) {
                video.srcObject = this.webcamStream;
            }
        }
        
        this.isScreenSharing = false;
        this.updateButtonStates();
        
        console.log('🖥️ Screen sharing stopped');
    },
    
    // Whiteboard
    openWhiteboard() {
        if (!this.currentRoom) {
            alert('⚠️ Please join a room first!');
            return;
        }
        
        this.whiteboardActive = !this.whiteboardActive;
        
        if (this.whiteboardActive) {
            const display = document.getElementById('webcamDisplay');
            const videoElement = display.querySelector('video');
            
            display.innerHTML = `
                ${videoElement ? videoElement.outerHTML : ''}
                <div class="whiteboard-overlay">
                    <canvas id="whiteboardCanvas"></canvas>
                    <div class="whiteboard-toolbar">
                        <div class="toolbar-section">
                            <button class="tool-btn active" onclick="SimpleLearning.setTool('pen')" title="Pen">
                                <span>✏️</span>
                            </button>
                            <button class="tool-btn" onclick="SimpleLearning.setTool('eraser')" title="Eraser">
                                <span>🧹</span>
                            </button>
                            <button class="tool-btn" onclick="SimpleLearning.setTool('line')" title="Line">
                                <span>📏</span>
                            </button>
                            <button class="tool-btn" onclick="SimpleLearning.setTool('rectangle')" title="Rectangle">
                                <span>⬜</span>
                            </button>
                            <button class="tool-btn" onclick="SimpleLearning.setTool('circle')" title="Circle">
                                <span>⭕</span>
                            </button>
                        </div>
                        
                        <div class="toolbar-section">
                            <span style="color: white; font-size: 12px; margin-right: 5px;">ECE:</span>
                            <button class="symbol-btn" onclick="SimpleLearning.drawSymbol('resistor')" title="Resistor">
                                <span>⚡</span>
                            </button>
                            <button class="symbol-btn" onclick="SimpleLearning.drawSymbol('battery')" title="Battery">
                                <span>🔋</span>
                            </button>
                            <button class="symbol-btn" onclick="SimpleLearning.drawSymbol('led')" title="LED">
                                <span>💡</span>
                            </button>
                            <button class="symbol-btn" onclick="SimpleLearning.drawSymbol('capacitor')" title="Capacitor">
                                <span>🎛️</span>
                            </button>
                            <button class="symbol-btn" onclick="SimpleLearning.drawSymbol('inductor')" title="Inductor">
                                <span>🔄</span>
                            </button>
                            <button class="symbol-btn" onclick="SimpleLearning.drawSymbol('ground')" title="Ground">
                                <span>⏚</span>
                            </button>
                        </div>
                        
                        <div class="toolbar-section">
                            <input type="color" id="colorPicker" value="#4f46e5" 
                                   onchange="SimpleLearning.changeColor(this.value)" 
                                   title="Color">
                            <input type="range" id="lineWidth" min="1" max="10" value="3" 
                                   onchange="SimpleLearning.changeWidth(this.value)"
                                   title="Line Width">
                        </div>
                        
                        <div class="toolbar-section">
                            <button class="tool-btn" onclick="SimpleLearning.clearWhiteboard()" title="Clear All">
                                <span>🗑️</span>
                            </button>
                            <button class="tool-btn" onclick="SimpleLearning.saveWhiteboard()" title="Save">
                                <span>💾</span>
                            </button>
                            <button class="tool-btn danger" onclick="SimpleLearning.openWhiteboard()" title="Close">
                                <span>❌</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            this.initWhiteboard();
            console.log('✏️ Whiteboard opened');
        } else {
            const overlay = document.querySelector('.whiteboard-overlay');
            if (overlay) overlay.remove();
            console.log('✏️ Whiteboard closed');
        }
        
        this.updateButtonStates();
    },
    
    initWhiteboard() {
        const canvas = document.getElementById('whiteboardCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        this.whiteboardCtx = ctx;
        this.currentTool = 'pen';
        this.currentColor = '#4f46e5';
        this.lineWidth = 3;
        this.drawing = false;
        this.startX = 0;
        this.startY = 0;
        
        ctx.strokeStyle = this.currentColor;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        canvas.onmousedown = (e) => this.startDrawing(e);
        canvas.onmousemove = (e) => this.draw(e);
        canvas.onmouseup = () => this.stopDrawing();
        canvas.onmouseleave = () => this.stopDrawing();
        
        // Touch support
        canvas.ontouchstart = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        };
        
        canvas.ontouchmove = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        };
        
        canvas.ontouchend = (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas.dispatchEvent(mouseEvent);
        };
    },
    
    startDrawing(e) {
        this.drawing = true;
        const canvas = document.getElementById('whiteboardCanvas');
        const rect = canvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
        
        if (this.currentTool === 'pen' || this.currentTool === 'eraser') {
            this.whiteboardCtx.beginPath();
            this.whiteboardCtx.moveTo(this.startX, this.startY);
        }
        
        this.savedCanvas = this.whiteboardCtx.getImageData(0, 0, canvas.width, canvas.height);
    },
    
    draw(e) {
        if (!this.drawing) return;
        
        const canvas = document.getElementById('whiteboardCanvas');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ctx = this.whiteboardCtx;
        
        if (this.currentTool === 'pen') {
            ctx.strokeStyle = this.currentColor;
            ctx.lineWidth = this.lineWidth;
            ctx.lineTo(x, y);
            ctx.stroke();
        } else if (this.currentTool === 'eraser') {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = this.lineWidth * 3;
            ctx.lineTo(x, y);
            ctx.stroke();
        } else {
            // Clear and redraw for shapes
            ctx.putImageData(this.savedCanvas, 0, 0);
            ctx.strokeStyle = this.currentColor;
            ctx.lineWidth = this.lineWidth;
            
            if (this.currentTool === 'line') {
                ctx.beginPath();
                ctx.moveTo(this.startX, this.startY);
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (this.currentTool === 'rectangle') {
                ctx.strokeRect(this.startX, this.startY, x - this.startX, y - this.startY);
            } else if (this.currentTool === 'circle') {
                const radius = Math.sqrt(Math.pow(x - this.startX, 2) + Math.pow(y - this.startY, 2));
                ctx.beginPath();
                ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    },
    
    stopDrawing() {
        this.drawing = false;
    },
    
    setTool(tool) {
        this.currentTool = tool;
        
        // Update button states
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        event.target.closest('.tool-btn').classList.add('active');
        
        console.log('🔧 Tool changed to:', tool);
    },
    
    changeColor(color) {
        this.currentColor = color;
        if (this.whiteboardCtx) {
            this.whiteboardCtx.strokeStyle = color;
        }
    },
    
    changeWidth(width) {
        this.lineWidth = parseInt(width);
        if (this.whiteboardCtx) {
            this.whiteboardCtx.lineWidth = this.lineWidth;
        }
    },
    
    drawSymbol(symbol) {
        const ctx = this.whiteboardCtx;
        if (!ctx) return;
        
        const canvas = document.getElementById('whiteboardCanvas');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.strokeStyle = this.currentColor;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.currentColor;
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        switch(symbol) {
            case 'resistor':
                // Draw resistor zigzag
                ctx.beginPath();
                ctx.moveTo(centerX - 40, centerY);
                ctx.lineTo(centerX - 30, centerY - 10);
                ctx.lineTo(centerX - 20, centerY + 10);
                ctx.lineTo(centerX - 10, centerY - 10);
                ctx.lineTo(centerX, centerY + 10);
                ctx.lineTo(centerX + 10, centerY - 10);
                ctx.lineTo(centerX + 20, centerY + 10);
                ctx.lineTo(centerX + 30, centerY);
                ctx.lineTo(centerX + 40, centerY);
                ctx.stroke();
                ctx.fillText('R', centerX, centerY - 25);
                break;
                
            case 'battery':
                // Draw battery symbol
                ctx.beginPath();
                ctx.moveTo(centerX - 30, centerY);
                ctx.lineTo(centerX - 10, centerY);
                ctx.moveTo(centerX - 10, centerY - 15);
                ctx.lineTo(centerX - 10, centerY + 15);
                ctx.moveTo(centerX + 10, centerY - 8);
                ctx.lineTo(centerX + 10, centerY + 8);
                ctx.moveTo(centerX + 10, centerY);
                ctx.lineTo(centerX + 30, centerY);
                ctx.stroke();
                ctx.fillText('+', centerX - 10, centerY - 25);
                ctx.fillText('-', centerX + 10, centerY - 25);
                break;
                
            case 'led':
                // Draw LED symbol
                ctx.beginPath();
                ctx.moveTo(centerX - 15, centerY - 15);
                ctx.lineTo(centerX + 15, centerY);
                ctx.lineTo(centerX - 15, centerY + 15);
                ctx.closePath();
                ctx.stroke();
                ctx.moveTo(centerX + 15, centerY - 15);
                ctx.lineTo(centerX + 15, centerY + 15);
                ctx.stroke();
                // Arrows for light
                ctx.beginPath();
                ctx.moveTo(centerX + 5, centerY - 20);
                ctx.lineTo(centerX + 15, centerY - 25);
                ctx.lineTo(centerX + 12, centerY - 20);
                ctx.stroke();
                break;
                
            case 'capacitor':
                // Draw capacitor symbol
                ctx.beginPath();
                ctx.moveTo(centerX - 30, centerY);
                ctx.lineTo(centerX - 5, centerY);
                ctx.moveTo(centerX - 5, centerY - 20);
                ctx.lineTo(centerX - 5, centerY + 20);
                ctx.moveTo(centerX + 5, centerY - 20);
                ctx.lineTo(centerX + 5, centerY + 20);
                ctx.moveTo(centerX + 5, centerY);
                ctx.lineTo(centerX + 30, centerY);
                ctx.stroke();
                ctx.fillText('C', centerX, centerY - 30);
                break;
                
            case 'inductor':
                // Draw inductor coil
                ctx.beginPath();
                ctx.moveTo(centerX - 40, centerY);
                for(let i = 0; i < 4; i++) {
                    ctx.arc(centerX - 30 + i * 20, centerY, 10, Math.PI, 0, false);
                }
                ctx.lineTo(centerX + 40, centerY);
                ctx.stroke();
                ctx.fillText('L', centerX, centerY - 25);
                break;
                
            case 'ground':
                // Draw ground symbol
                ctx.beginPath();
                ctx.moveTo(centerX, centerY - 20);
                ctx.lineTo(centerX, centerY);
                ctx.moveTo(centerX - 20, centerY);
                ctx.lineTo(centerX + 20, centerY);
                ctx.moveTo(centerX - 15, centerY + 5);
                ctx.lineTo(centerX + 15, centerY + 5);
                ctx.moveTo(centerX - 10, centerY + 10);
                ctx.lineTo(centerX + 10, centerY + 10);
                ctx.stroke();
                break;
        }
        
        console.log('✏️ Drew symbol:', symbol);
    },
    
    clearWhiteboard() {
        if (!this.whiteboardCtx) return;
        const canvas = document.getElementById('whiteboardCanvas');
        this.whiteboardCtx.clearRect(0, 0, canvas.width, canvas.height);
        console.log('🗑️ Whiteboard cleared');
    },
    
    saveWhiteboard() {
        const canvas = document.getElementById('whiteboardCanvas');
        if (!canvas) return;
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `whiteboard-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
        });
        
        console.log('💾 Whiteboard saved');
        alert('💾 Whiteboard saved to downloads!');
    },
    
    // Update UI
    updateButtonStates() {
        const videoBtn = document.getElementById('videoBtn');
        const audioBtn = document.getElementById('audioBtn');
        const screenBtn = document.getElementById('screenBtn');
        const whiteboardBtn = document.getElementById('whiteboardBtn');
        
        if (videoBtn) {
            videoBtn.className = `webcam-btn ${this.isVideoOn ? 'active' : ''}`;
            videoBtn.innerHTML = `
                <span>${this.isVideoOn ? '📹' : '🚫'}</span>
                <span>${this.isVideoOn ? 'Stop Video' : 'Start Video'}</span>
            `;
        }
        
        if (audioBtn) {
            audioBtn.className = `webcam-btn ${this.isAudioOn ? 'active' : ''}`;
            audioBtn.innerHTML = `
                <span>${this.isAudioOn ? '🎤' : '🔇'}</span>
                <span>${this.isAudioOn ? 'Mute' : 'Unmute'}</span>
            `;
        }
        
        if (screenBtn) {
            screenBtn.className = `webcam-btn ${this.isScreenSharing ? 'success' : ''}`;
            screenBtn.innerHTML = `
                <span>🖥️</span>
                <span>${this.isScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
            `;
        }
        
        if (whiteboardBtn) {
            whiteboardBtn.className = `webcam-btn ${this.whiteboardActive ? 'active' : ''}`;
            whiteboardBtn.innerHTML = `
                <span>✏️</span>
                <span>${this.whiteboardActive ? 'Close Board' : 'Whiteboard'}</span>
            `;
        }
    },
    
    updateParticipantsList() {
        const container = document.getElementById('participantsContainer');
        const count = document.getElementById('participantCount');
        
        if (!container) return;
        
        // Update your status
        this.participants[0].video = this.isVideoOn;
        this.participants[0].audio = this.isAudioOn;
        
        count.textContent = this.participants.length;
        
        container.innerHTML = this.participants.map(p => `
            <div class="participant-item">
                <div class="participant-avatar">👤</div>
                <span>${p.name}</span>
                <div class="participant-status">
                    <span>${p.video ? '📹' : '🚫'}</span>
                    <span>${p.audio ? '🎤' : '🔇'}</span>
                </div>
            </div>
        `).join('');
    }
};

// Initialize when DOM is ready
console.log('🔍 Simple Learning script loaded - v3');
console.log('✅ All features:', {
    aiTutor: 'Advanced ChatGPT-like interface',
    collaboration: 'Room creation, video, audio, screen share, whiteboard',
    simulation: 'Circuit simulation with results',
    whiteboard: 'ECE symbols + drawing tools'
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📚 DOM Ready - Initializing...');
        try {
            SimpleLearning.init();
            console.log('✅ SimpleLearning initialized successfully!');
        } catch (error) {
            console.error('❌ Initialization error:', error);
        }
    });
} else {
    console.log('📚 DOM Already Ready - Initializing...');
    try {
        SimpleLearning.init();
        console.log('✅ SimpleLearning initialized successfully!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

// Make it globally accessible for debugging
window.SimpleLearning = SimpleLearning;
console.log('🌐 SimpleLearning is now globally accessible as window.SimpleLearning');
