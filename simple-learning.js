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
console.log('🔍 Simple Learning script loaded');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📚 DOM Ready - Initializing...');
        SimpleLearning.init();
    });
} else {
    console.log('📚 DOM Already Ready - Initializing...');
    SimpleLearning.init();
}

// Make it globally accessible for debugging
window.SimpleLearning = SimpleLearning;
