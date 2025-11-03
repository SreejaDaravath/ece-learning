// 🎥 ECE MASTER - Live Collaboration System v5.1
// Video Calls, Screen Sharing, Whiteboard - Like Google Meet!

const CollaborationHub = {
    // ================================
    // 🎥 Video Calling System
    // ================================
    videoCall: {
        localStream: null,
        remoteStreams: new Map(),
        peerConnections: new Map(),
        isCallActive: false,
        isMuted: false,
        isVideoOff: false,
        roomId: null,
        participants: new Map()
    },

    // Initialize collaboration system
    async init() {
        console.log('🎥 Initializing Collaboration Hub...');
        this.createCollaborationUI();
        this.setupEventListeners();
        console.log('✅ Collaboration Hub ready!');
    },

    createCollaborationUI() {
        // Create collaboration button in header
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const collabBtn = document.createElement('button');
            collabBtn.className = 'collab-btn';
            collabBtn.innerHTML = '🎥 Collaborate';
            collabBtn.onclick = () => this.openCollaborationModal();
            headerRight.insertBefore(collabBtn, headerRight.firstChild);
        }

        // Create collaboration modal
        const modal = document.createElement('div');
        modal.className = 'collab-modal hidden';
        modal.id = 'collabModal';
        modal.innerHTML = `
            <div class="collab-modal-content">
                <div class="collab-header">
                    <h2>🎥 Live Collaboration</h2>
                    <button class="modal-close" onclick="CollaborationHub.closeCollaborationModal()">×</button>
                </div>
                
                <div class="collab-tabs">
                    <button class="collab-tab active" data-tab="video">📹 Video Call</button>
                    <button class="collab-tab" data-tab="screen">🖥️ Screen Share</button>
                    <button class="collab-tab" data-tab="whiteboard">✏️ Whiteboard</button>
                    <button class="collab-tab" data-tab="chat">💬 Chat</button>
                </div>

                <div class="collab-content">
                    <!-- Video Call Tab -->
                    <div class="collab-tab-content active" id="videoTab">
                        <div class="video-container">
                            <div class="video-grid" id="videoGrid">
                                <div class="video-box local-video">
                                    <video id="localVideo" autoplay muted playsinline></video>
                                    <div class="video-label">You</div>
                                    <div class="video-status" id="localStatus"></div>
                                </div>
                            </div>
                            
                            <div class="video-controls">
                                <button class="control-icon" id="toggleMute" title="Mute/Unmute">
                                    <span>🎤</span>
                                </button>
                                <button class="control-icon" id="toggleVideo" title="Camera On/Off">
                                    <span>📹</span>
                                </button>
                                <button class="control-icon danger" id="endCall" title="End Call">
                                    <span>📞</span>
                                </button>
                                <button class="control-icon" id="shareScreen" title="Share Screen">
                                    <span>🖥️</span>
                                </button>
                                <button class="control-icon" id="openWhiteboard" title="Open Whiteboard">
                                    <span>✏️</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="room-controls">
                            <div class="room-info">
                                <label>Room ID:</label>
                                <input type="text" id="roomIdInput" placeholder="Enter or generate room ID">
                                <button class="btn-primary" onclick="CollaborationHub.generateRoomId()">🎲 Generate</button>
                            </div>
                            <div class="room-actions">
                                <button class="btn-success" id="startCall">🎥 Start Call</button>
                                <button class="btn-primary" id="joinCall">👥 Join Call</button>
                                <button class="btn-secondary" id="copyRoomId">📋 Copy Room ID</button>
                            </div>
                        </div>
                    </div>

                    <!-- Screen Share Tab -->
                    <div class="collab-tab-content" id="screenTab">
                        <div class="screen-share-container">
                            <div class="screen-preview" id="screenPreview">
                                <video id="screenVideo" autoplay playsinline></video>
                                <div class="screen-placeholder">
                                    <span style="font-size: 4rem;">🖥️</span>
                                    <h3>Screen Sharing</h3>
                                    <p>Share your circuit work with others in real-time</p>
                                </div>
                            </div>
                            
                            <div class="screen-controls">
                                <button class="btn-primary" id="startScreenShare">
                                    🖥️ Start Screen Share
                                </button>
                                <button class="btn-danger hidden" id="stopScreenShare">
                                    ⏹️ Stop Sharing
                                </button>
                            </div>

                            <div class="screen-viewers">
                                <h4>👥 Viewers (<span id="viewerCount">0</span>)</h4>
                                <div id="viewersList"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Whiteboard Tab -->
                    <div class="collab-tab-content" id="whiteboardTab">
                        <div class="whiteboard-container">
                            <div class="whiteboard-toolbar">
                                <button class="tool-btn active" data-tool="pen" title="Pen">✏️</button>
                                <button class="tool-btn" data-tool="eraser" title="Eraser">🧹</button>
                                <button class="tool-btn" data-tool="line" title="Line">📏</button>
                                <button class="tool-btn" data-tool="circle" title="Circle">⭕</button>
                                <button class="tool-btn" data-tool="rectangle" title="Rectangle">▭</button>
                                <button class="tool-btn" data-tool="text" title="Text">T</button>
                                
                                <div class="color-picker">
                                    <input type="color" id="penColor" value="#3b82f6">
                                    <label>Color</label>
                                </div>
                                
                                <div class="size-picker">
                                    <input type="range" id="penSize" min="1" max="20" value="3">
                                    <label>Size: <span id="sizeValue">3</span>px</label>
                                </div>
                                
                                <button class="tool-btn" onclick="CollaborationHub.clearWhiteboard()" title="Clear">
                                    🗑️ Clear
                                </button>
                                
                                <button class="tool-btn" onclick="CollaborationHub.saveWhiteboard()" title="Save">
                                    💾 Save
                                </button>
                            </div>
                            
                            <canvas id="whiteboard" width="1200" height="600"></canvas>
                            
                            <div class="whiteboard-users">
                                <div class="users-list" id="whiteboardUsers">
                                    <span class="user-indicator">
                                        <span class="user-dot" style="background: #3b82f6;"></span>
                                        You
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Tab -->
                    <div class="collab-tab-content" id="chatTab">
                        <div class="chat-container">
                            <div class="chat-messages" id="chatMessages">
                                <div class="chat-welcome">
                                    <span style="font-size: 3rem;">💬</span>
                                    <h3>Welcome to Live Chat!</h3>
                                    <p>Discuss circuits, ask questions, share ideas</p>
                                </div>
                            </div>
                            
                            <div class="chat-input-container">
                                <input type="text" id="chatInput" placeholder="Type a message..." maxlength="500">
                                <button class="btn-primary" onclick="CollaborationHub.sendMessage()">
                                    📤 Send
                                </button>
                            </div>
                            
                            <div class="chat-participants">
                                <h4>👥 Participants</h4>
                                <div id="participantsList"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.collab-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Video controls
        document.getElementById('toggleMute')?.addEventListener('click', () => this.toggleMute());
        document.getElementById('toggleVideo')?.addEventListener('click', () => this.toggleVideo());
        document.getElementById('endCall')?.addEventListener('click', () => this.endCall());
        document.getElementById('shareScreen')?.addEventListener('click', () => this.shareScreen());
        
        // Call controls
        document.getElementById('startCall')?.addEventListener('click', () => this.startCall());
        document.getElementById('joinCall')?.addEventListener('click', () => this.joinCall());
        document.getElementById('copyRoomId')?.addEventListener('click', () => this.copyRoomId());

        // Screen share controls
        document.getElementById('startScreenShare')?.addEventListener('click', () => this.startScreenShare());
        document.getElementById('stopScreenShare')?.addEventListener('click', () => this.stopScreenShare());

        // Whiteboard setup
        this.setupWhiteboard();

        // Chat input
        document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    },

    // ================================
    // 📹 Video Call Functions
    // ================================
    async startCall() {
        const roomId = document.getElementById('roomIdInput').value.trim();
        if (!roomId) {
            this.showNotification('Please enter or generate a Room ID', 'warning');
            return;
        }

        try {
            this.videoCall.roomId = roomId;
            await this.initializeMediaDevices();
            this.videoCall.isCallActive = true;
            
            // Update UI
            document.getElementById('startCall').disabled = true;
            document.getElementById('joinCall').disabled = true;
            
            this.showNotification(`Call started! Share Room ID: ${roomId}`, 'success');
            this.addChatMessage('System', `You started a call. Room ID: ${roomId}`, 'system');
            
            // Track event
            if (window.InteractiveLearning) {
                window.InteractiveLearning.logActivity('collab', 'Started video call', '🎥');
            }
        } catch (error) {
            console.error('Error starting call:', error);
            this.showNotification('Failed to start call. Check camera/mic permissions.', 'error');
        }
    },

    async joinCall() {
        const roomId = document.getElementById('roomIdInput').value.trim();
        if (!roomId) {
            this.showNotification('Please enter a Room ID to join', 'warning');
            return;
        }

        try {
            this.videoCall.roomId = roomId;
            await this.initializeMediaDevices();
            this.videoCall.isCallActive = true;
            
            // Update UI
            document.getElementById('startCall').disabled = true;
            document.getElementById('joinCall').disabled = true;
            
            this.showNotification(`Joined call: ${roomId}`, 'success');
            this.addChatMessage('System', `You joined the call`, 'system');
            
            // Simulate adding a participant (in real implementation, this would be from signaling server)
            this.addParticipant('Participant-' + Math.floor(Math.random() * 1000));
        } catch (error) {
            console.error('Error joining call:', error);
            this.showNotification('Failed to join call. Check camera/mic permissions.', 'error');
        }
    },

    async initializeMediaDevices() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: { echoCancellation: true, noiseSuppression: true }
            });
            
            this.videoCall.localStream = stream;
            const localVideo = document.getElementById('localVideo');
            if (localVideo) {
                localVideo.srcObject = stream;
            }
            
            document.getElementById('localStatus').textContent = '🟢 Connected';
            return stream;
        } catch (error) {
            console.error('Error accessing media devices:', error);
            throw error;
        }
    },

    toggleMute() {
        if (!this.videoCall.localStream) return;
        
        const audioTracks = this.videoCall.localStream.getAudioTracks();
        audioTracks.forEach(track => {
            track.enabled = !track.enabled;
        });
        
        this.videoCall.isMuted = !this.videoCall.isMuted;
        const btn = document.getElementById('toggleMute');
        btn.querySelector('span').textContent = this.videoCall.isMuted ? '🔇' : '🎤';
        btn.classList.toggle('muted', this.videoCall.isMuted);
        
        this.showNotification(this.videoCall.isMuted ? 'Microphone muted' : 'Microphone unmuted', 'info');
    },

    toggleVideo() {
        if (!this.videoCall.localStream) return;
        
        const videoTracks = this.videoCall.localStream.getVideoTracks();
        videoTracks.forEach(track => {
            track.enabled = !track.enabled;
        });
        
        this.videoCall.isVideoOff = !this.videoCall.isVideoOff;
        const btn = document.getElementById('toggleVideo');
        btn.querySelector('span').textContent = this.videoCall.isVideoOff ? '📷' : '📹';
        btn.classList.toggle('video-off', this.videoCall.isVideoOff);
        
        this.showNotification(this.videoCall.isVideoOff ? 'Camera off' : 'Camera on', 'info');
    },

    endCall() {
        if (this.videoCall.localStream) {
            this.videoCall.localStream.getTracks().forEach(track => track.stop());
            this.videoCall.localStream = null;
        }
        
        this.videoCall.isCallActive = false;
        this.videoCall.remoteStreams.clear();
        
        document.getElementById('localVideo').srcObject = null;
        document.getElementById('localStatus').textContent = '';
        document.getElementById('startCall').disabled = false;
        document.getElementById('joinCall').disabled = false;
        
        // Clear remote videos
        const videoGrid = document.getElementById('videoGrid');
        videoGrid.querySelectorAll('.video-box:not(.local-video)').forEach(box => box.remove());
        
        this.showNotification('Call ended', 'info');
        this.addChatMessage('System', 'Call ended', 'system');
    },

    addParticipant(participantId) {
        if (this.videoCall.participants.has(participantId)) return;
        
        this.videoCall.participants.set(participantId, { id: participantId, muted: false });
        
        // Add video box
        const videoGrid = document.getElementById('videoGrid');
        const videoBox = document.createElement('div');
        videoBox.className = 'video-box remote-video';
        videoBox.id = `video-${participantId}`;
        videoBox.innerHTML = `
            <video autoplay playsinline></video>
            <div class="video-label">${participantId}</div>
            <div class="video-status">🟢 Connected</div>
        `;
        videoGrid.appendChild(videoBox);
        
        // Update participants list
        this.updateParticipantsList();
        this.showNotification(`${participantId} joined`, 'success');
    },

    // ================================
    // 🖥️ Screen Sharing Functions
    // ================================
    async startScreenShare() {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: 'always' },
                audio: false
            });
            
            const screenVideo = document.getElementById('screenVideo');
            screenVideo.srcObject = screenStream;
            
            document.querySelector('.screen-placeholder').style.display = 'none';
            document.getElementById('startScreenShare').classList.add('hidden');
            document.getElementById('stopScreenShare').classList.remove('hidden');
            
            screenStream.getVideoTracks()[0].onended = () => {
                this.stopScreenShare();
            };
            
            this.showNotification('Screen sharing started', 'success');
            this.addChatMessage('System', 'Started screen sharing', 'system');
            
            // Update viewer count (simulated)
            document.getElementById('viewerCount').textContent = '1';
            
        } catch (error) {
            console.error('Error starting screen share:', error);
            this.showNotification('Screen sharing cancelled or failed', 'warning');
        }
    },

    stopScreenShare() {
        const screenVideo = document.getElementById('screenVideo');
        if (screenVideo.srcObject) {
            screenVideo.srcObject.getTracks().forEach(track => track.stop());
            screenVideo.srcObject = null;
        }
        
        document.querySelector('.screen-placeholder').style.display = 'flex';
        document.getElementById('startScreenShare').classList.remove('hidden');
        document.getElementById('stopScreenShare').classList.add('hidden');
        document.getElementById('viewerCount').textContent = '0';
        
        this.showNotification('Screen sharing stopped', 'info');
    },

    // ================================
    // ✏️ Whiteboard Functions
    // ================================
    setupWhiteboard() {
        const canvas = document.getElementById('whiteboard');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let currentTool = 'pen';
        let startX, startY;
        
        // Get color and size
        const getColor = () => document.getElementById('penColor')?.value || '#3b82f6';
        const getSize = () => parseInt(document.getElementById('penSize')?.value || 3);
        
        // Update size display
        document.getElementById('penSize')?.addEventListener('input', (e) => {
            document.getElementById('sizeValue').textContent = e.target.value;
        });
        
        // Tool selection
        document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentTool = e.target.dataset.tool;
            });
        });
        
        // Drawing functions
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.strokeStyle = getColor();
            ctx.lineWidth = getSize();
            ctx.lineCap = 'round';
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (currentTool === 'pen') {
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (currentTool === 'eraser') {
                ctx.clearRect(x - getSize(), y - getSize(), getSize() * 2, getSize() * 2);
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        
        canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
    },

    clearWhiteboard() {
        const canvas = document.getElementById('whiteboard');
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.showNotification('Whiteboard cleared', 'info');
        }
    },

    saveWhiteboard() {
        const canvas = document.getElementById('whiteboard');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `whiteboard-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
            this.showNotification('Whiteboard saved!', 'success');
        }
    },

    // ================================
    // 💬 Chat Functions
    // ================================
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addChatMessage('You', message, 'user');
        input.value = '';
        
        // Simulate response (in real implementation, this would broadcast to other users)
        setTimeout(() => {
            const responses = [
                'Great question!',
                'Let me help you with that circuit.',
                'Have you tried checking the voltage divider?',
                'That\'s correct! Well done.',
                'Let\'s draw it on the whiteboard.'
            ];
            this.addChatMessage('Instructor', responses[Math.floor(Math.random() * responses.length)], 'remote');
        }, 2000);
    },

    addChatMessage(sender, message, type) {
        const messagesDiv = document.getElementById('chatMessages');
        
        // Remove welcome message
        const welcome = messagesDiv.querySelector('.chat-welcome');
        if (welcome) welcome.remove();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="message-sender">${sender}</span>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-text">${message}</div>
        `;
        
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },

    // ================================
    // 🛠️ Utility Functions
    // ================================
    generateRoomId() {
        const roomId = Math.random().toString(36).substr(2, 9).toUpperCase();
        document.getElementById('roomIdInput').value = roomId;
        this.showNotification(`Room ID generated: ${roomId}`, 'success');
    },

    copyRoomId() {
        const roomId = document.getElementById('roomIdInput').value;
        if (!roomId) {
            this.showNotification('No Room ID to copy', 'warning');
            return;
        }
        
        navigator.clipboard.writeText(roomId).then(() => {
            this.showNotification('Room ID copied to clipboard!', 'success');
        });
    },

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.collab-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.collab-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const tabMap = {
            'video': 'videoTab',
            'screen': 'screenTab',
            'whiteboard': 'whiteboardTab',
            'chat': 'chatTab'
        };
        
        document.getElementById(tabMap[tabName])?.classList.add('active');
    },

    updateParticipantsList() {
        const list = document.getElementById('participantsList');
        if (!list) return;
        
        list.innerHTML = '';
        this.videoCall.participants.forEach((participant, id) => {
            const item = document.createElement('div');
            item.className = 'participant-item';
            item.innerHTML = `
                <span class="participant-name">👤 ${id}</span>
                <span class="participant-status">🟢</span>
            `;
            list.appendChild(item);
        });
    },

    openCollaborationModal() {
        document.getElementById('collabModal').classList.remove('hidden');
    },

    closeCollaborationModal() {
        document.getElementById('collabModal').classList.add('hidden');
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `collab-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CollaborationHub.init());
} else {
    CollaborationHub.init();
}

// Export for external use
if (typeof window !== 'undefined') {
    window.CollaborationHub = CollaborationHub;
}
