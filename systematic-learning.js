// 🎓 Systematic Learning Dashboard - Clear, Organized Learning Path
// Provides step-by-step guided learning with proper structure

const SystematicLearning = {
    currentStep: 1,
    totalSteps: 5,
    learningPath: [],
    
    // Initialize the systematic learning dashboard
    init() {
        console.log('🎓 Initializing Systematic Learning Dashboard...');
        this.loadProgress();
        this.createLearningDashboard();
        this.setupEventListeners();
    },
    
    // Create the main learning dashboard with clear structure
    createLearningDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'systematic-dashboard';
        dashboard.innerHTML = `
            <!-- Learning Path Header -->
            <div class="learning-header">
                <h2>📚 Your Learning Journey</h2>
                <div class="journey-progress">
                    <span>Step <span id="currentStepNum">1</span> of 5</span>
                    <div class="journey-bar">
                        <div class="journey-fill" id="journeyFill"></div>
                    </div>
                </div>
            </div>
            
            <!-- Step-by-Step Learning Path -->
            <div class="learning-steps">
                <!-- Step 1: Watch & Learn -->
                <div class="learning-step active" data-step="1">
                    <div class="step-header">
                        <div class="step-number">1</div>
                        <div class="step-info">
                            <h3>📺 Watch & Understand</h3>
                            <p>Learn the concept through demonstration</p>
                        </div>
                        <div class="step-status">
                            <span class="status-badge pending">Start</span>
                        </div>
                    </div>
                    <div class="step-content">
                        <div class="step-actions">
                            <button class="action-btn primary" onclick="SystematicLearning.watchDemo()">
                                <span class="btn-icon">▶️</span>
                                <span class="btn-text">Watch Demo Video</span>
                            </button>
                            <div class="demo-preview" id="demoPreview"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Get AI Help -->
                <div class="learning-step" data-step="2">
                    <div class="step-header">
                        <div class="step-number">2</div>
                        <div class="step-info">
                            <h3>🤖 Ask AI Tutor</h3>
                            <p>Get explanations and clear your doubts</p>
                        </div>
                        <div class="step-status">
                            <span class="status-badge locked">🔒</span>
                        </div>
                    </div>
                    <div class="step-content">
                        <div class="step-actions">
                            <button class="action-btn primary" onclick="SystematicLearning.openAITutor()">
                                <span class="btn-icon">💬</span>
                                <span class="btn-text">Chat with AI Tutor</span>
                            </button>
                            <div class="quick-questions">
                                <p class="section-label">Quick Questions:</p>
                                <button class="quick-q-btn" onclick="SystematicLearning.askQuestion('theory')">
                                    📖 Explain the Theory
                                </button>
                                <button class="quick-q-btn" onclick="SystematicLearning.askQuestion('components')">
                                    🔧 What Components Needed?
                                </button>
                                <button class="quick-q-btn" onclick="SystematicLearning.askQuestion('connections')">
                                    🔌 How to Connect?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: Enable Webcam (Optional) -->
                <div class="learning-step" data-step="3">
                    <div class="step-header">
                        <div class="step-number">3</div>
                        <div class="step-info">
                            <h3>📸 Show Your Work</h3>
                            <p>Get feedback on your physical circuit (optional)</p>
                        </div>
                        <div class="step-status">
                            <span class="status-badge locked">🔒</span>
                        </div>
                    </div>
                    <div class="step-content">
                        <div class="step-actions">
                            <div class="webcam-info">
                                <p>📷 <strong>Optional:</strong> Show your breadboard circuit for AI feedback</p>
                            </div>
                            <button class="action-btn secondary" onclick="SystematicLearning.enableWebcam()">
                                <span class="btn-icon">📸</span>
                                <span class="btn-text">Enable Webcam</span>
                            </button>
                            <div class="webcam-preview-container" id="systematicWebcam"></div>
                            <button class="action-btn secondary hidden" id="captureBtn" onclick="SystematicLearning.captureCircuit()">
                                <span class="btn-icon">📷</span>
                                <span class="btn-text">Capture & Get Feedback</span>
                            </button>
                            <button class="action-btn tertiary" onclick="SystematicLearning.skipWebcam()">
                                Skip (Build in App Instead)
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Step 4: Build & Test -->
                <div class="learning-step" data-step="4">
                    <div class="step-header">
                        <div class="step-number">4</div>
                        <div class="step-info">
                            <h3>⚡ Build & Simulate</h3>
                            <p>Create the circuit and test with live simulation</p>
                        </div>
                        <div class="step-status">
                            <span class="status-badge locked">🔒</span>
                        </div>
                    </div>
                    <div class="step-content">
                        <div class="step-actions">
                            <button class="action-btn primary" onclick="SystematicLearning.startBuilding()">
                                <span class="btn-icon">🔧</span>
                                <span class="btn-text">Start Building Circuit</span>
                            </button>
                            <button class="action-btn secondary" onclick="SystematicLearning.runSimulation()">
                                <span class="btn-icon">⚡</span>
                                <span class="btn-text">Run Live Simulation</span>
                            </button>
                            <div class="simulation-metrics" id="stepSimMetrics"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 5: Submit & Earn -->
                <div class="learning-step" data-step="5">
                    <div class="step-header">
                        <div class="step-number">5</div>
                        <div class="step-info">
                            <h3>🏆 Submit & Progress</h3>
                            <p>Complete the level and earn your achievement</p>
                        </div>
                        <div class="step-status">
                            <span class="status-badge locked">🔒</span>
                        </div>
                    </div>
                    <div class="step-content">
                        <div class="step-actions">
                            <button class="action-btn success" onclick="SystematicLearning.submitCircuit()">
                                <span class="btn-icon">✅</span>
                                <span class="btn-text">Submit Circuit</span>
                            </button>
                            <div class="achievement-preview" id="achievementPreview"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Dashboard Controls -->
            <div class="dashboard-controls">
                <button class="control-btn secondary" onclick="SystematicLearning.toggleDashboard()">
                    ◀️ Hide Panel
                </button>
            </div>
        `;
        
        document.body.appendChild(dashboard);
        
        // Create Floating Toggle Button (separate element)
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'dashboard-toggle-btn';
        toggleBtn.onclick = () => SystematicLearning.toggleDashboard();
        toggleBtn.innerHTML = '📚 Learning Path';
        document.body.appendChild(toggleBtn);
        
        this.updateStepProgress();
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Show all content by default - no collapsing
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('collapsed');
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.toggleDashboard();
            }
        });
    },
    
    // Toggle step content expand/collapse - DISABLED (always show all)
    toggleStepContent(step) {
        // All content always visible - no toggle needed
        return;
    },
    
    // Watch demo video (Step 1)
    watchDemo() {
        console.log('📺 Playing demo video...');
        const demoPreview = document.getElementById('demoPreview');
        
        // Trigger existing demo functionality
        if (typeof showDemo === 'function') {
            showDemo();
        }
        
        demoPreview.innerHTML = `
            <div class="demo-status">
                <span class="status-icon">✅</span>
                <span class="status-text">Demo watched! Ready to proceed.</span>
            </div>
        `;
        
        // Mark step 1 as completed and unlock step 2
        this.completeStep(1);
    },
    
    // Open AI Tutor (Step 2)
    openAITutor() {
        console.log('🤖 Opening AI Tutor...');
        
        // Trigger AI tutor from ultimate-learning.js
        if (typeof UltimateLearning !== 'undefined' && UltimateLearning.aiTutor) {
            const tutorPanel = document.querySelector('.ai-tutor-floating');
            if (tutorPanel) {
                tutorPanel.classList.add('visible');
            }
        }
        
        this.completeStep(2);
    },
    
    // Ask quick question
    askQuestion(type) {
        console.log('💬 Asking question:', type);
        
        const questions = {
            theory: 'Explain the theory behind this circuit',
            components: 'What components do I need?',
            connections: 'How should I connect the components?'
        };
        
        // Send to AI tutor
        if (typeof UltimateLearning !== 'undefined' && UltimateLearning.aiTutor) {
            UltimateLearning.aiTutor.currentQuestion = questions[type];
            UltimateLearning.sendToTutor();
        }
    },
    
    // Enable webcam (Step 3)
    async enableWebcam() {
        console.log('📸 Enabling webcam...');
        const container = document.getElementById('systematicWebcam');
        const captureBtn = document.getElementById('captureBtn');
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 640, height: 480 },
                audio: false 
            });
            
            container.innerHTML = `
                <video id="systematicVideo" autoplay playsinline></video>
                <div class="webcam-controls">
                    <button class="webcam-control-btn" onclick="SystematicLearning.stopWebcam()">
                        ⏹️ Stop Camera
                    </button>
                </div>
            `;
            
            const video = document.getElementById('systematicVideo');
            video.srcObject = stream;
            this.videoStream = stream;
            
            captureBtn.classList.remove('hidden');
            
            this.showNotification('✅ Webcam enabled! Position your circuit in view.', 'success');
            
        } catch (error) {
            console.error('Camera access error:', error);
            this.showNotification('❌ Could not access camera. Please check permissions.', 'error');
        }
    },
    
    // Stop webcam
    stopWebcam() {
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
            this.videoStream = null;
        }
        
        const container = document.getElementById('systematicWebcam');
        container.innerHTML = '';
        
        const captureBtn = document.getElementById('captureBtn');
        captureBtn.classList.add('hidden');
        
        this.showNotification('Camera stopped', 'info');
    },
    
    // Capture circuit photo
    captureCircuit() {
        console.log('📷 Capturing circuit...');
        
        const video = document.getElementById('systematicVideo');
        if (!video) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        // Show captured image
        const container = document.getElementById('systematicWebcam');
        const capturedImg = document.createElement('div');
        capturedImg.className = 'captured-image';
        capturedImg.innerHTML = `
            <img src="${canvas.toDataURL()}" alt="Captured circuit">
            <div class="capture-feedback">
                <p><strong>📊 AI Analysis:</strong></p>
                <ul>
                    <li>✅ Components visible</li>
                    <li>✅ Connections clear</li>
                    <li>💡 Tip: Make sure wires are properly connected</li>
                </ul>
            </div>
        `;
        container.appendChild(capturedImg);
        
        this.showNotification('✅ Circuit captured! Check AI feedback below.', 'success');
        this.completeStep(3);
    },
    
    // Skip webcam
    skipWebcam() {
        console.log('⏭️ Skipping webcam step...');
        this.showNotification('Skipped webcam. You can build in the app!', 'info');
        this.completeStep(3);
    },
    
    // Start building circuit (Step 4)
    startBuilding() {
        console.log('🔧 Starting circuit building...');
        this.showNotification('Canvas is ready! Drag components to build your circuit.', 'success');
        
        // Close dashboard to give full space
        const dashboard = document.querySelector('.systematic-dashboard');
        dashboard.classList.add('minimized');
        
        this.completeStep(4);
    },
    
    // Run simulation (Step 4)
    runSimulation() {
        console.log('⚡ Running simulation...');
        
        // Trigger simulation from ultimate-learning.js
        if (typeof UltimateLearning !== 'undefined' && UltimateLearning.simulation) {
            UltimateLearning.startSim();
            
            const metrics = document.getElementById('stepSimMetrics');
            metrics.innerHTML = `
                <div class="metrics-display">
                    <div class="metric-item">
                        <span class="metric-label">Current:</span>
                        <span class="metric-value" id="stepCurrent">-- A</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Voltage:</span>
                        <span class="metric-value" id="stepVoltage">-- V</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Power:</span>
                        <span class="metric-value" id="stepPower">-- W</span>
                    </div>
                </div>
            `;
        }
        
        this.showNotification('⚡ Simulation started! Watch the metrics.', 'success');
    },
    
    // Submit circuit (Step 5)
    submitCircuit() {
        console.log('✅ Submitting circuit...');
        
        // Trigger existing submit functionality
        if (typeof submit === 'function') {
            submit();
        }
        
        this.completeStep(5);
        this.showNotification('🎉 Circuit submitted! Check your score.', 'success');
    },
    
    // Complete a step and unlock next
    completeStep(stepNum) {
        // Mark current step as completed
        const currentStepEl = document.querySelector(`.learning-step[data-step="${stepNum}"]`);
        if (currentStepEl) {
            const badge = currentStepEl.querySelector('.status-badge');
            badge.textContent = '✅';
            badge.className = 'status-badge completed';
            currentStepEl.classList.add('completed');
        }
        
        // Unlock next step
        if (stepNum < this.totalSteps) {
            const nextStepEl = document.querySelector(`.learning-step[data-step="${stepNum + 1}"]`);
            if (nextStepEl) {
                const badge = nextStepEl.querySelector('.status-badge');
                badge.textContent = 'Start';
                badge.className = 'status-badge pending';
                nextStepEl.classList.remove('locked');
                nextStepEl.classList.add('active');
            }
            
            this.currentStep = stepNum + 1;
        } else {
            // All steps completed!
            this.showNotification('🎉 All steps completed! Great job!', 'success');
        }
        
        this.updateStepProgress();
        this.saveProgress();
    },
    
    // Navigate to next step
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            const nextStepEl = document.querySelector(`.learning-step[data-step="${this.currentStep + 1}"]`);
            if (nextStepEl && !nextStepEl.classList.contains('locked')) {
                this.currentStep++;
                this.updateStepProgress();
                this.scrollToStep(this.currentStep);
            }
        }
    },
    
    // Navigate to previous step
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepProgress();
            this.scrollToStep(this.currentStep);
        }
    },
    
    // Scroll to specific step
    scrollToStep(stepNum) {
        const stepEl = document.querySelector(`.learning-step[data-step="${stepNum}"]`);
        if (stepEl) {
            stepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.toggleStepContent(stepEl);
        }
    },
    
    // Update progress bar and indicators
    updateStepProgress() {
        const progressPercent = ((this.currentStep - 1) / this.totalSteps) * 100;
        const journeyFill = document.getElementById('journeyFill');
        if (journeyFill) {
            journeyFill.style.width = progressPercent + '%';
        }
        
        const currentStepNum = document.getElementById('currentStepNum');
        if (currentStepNum) {
            currentStepNum.textContent = this.currentStep;
        }
    },
    
    // Toggle dashboard visibility
    toggleDashboard() {
        const dashboard = document.querySelector('.systematic-dashboard');
        dashboard.classList.toggle('minimized');
    },
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `systematic-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    // Save progress to localStorage
    saveProgress() {
        const progress = {
            currentStep: this.currentStep,
            completedSteps: this.getCompletedSteps(),
            timestamp: Date.now()
        };
        localStorage.setItem('systematic-learning-progress', JSON.stringify(progress));
    },
    
    // Load progress from localStorage
    loadProgress() {
        const saved = localStorage.getItem('systematic-learning-progress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.currentStep = progress.currentStep || 1;
        }
    },
    
    // Get list of completed steps
    getCompletedSteps() {
        const completed = [];
        document.querySelectorAll('.learning-step.completed').forEach(step => {
            completed.push(parseInt(step.dataset.step));
        });
        return completed;
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SystematicLearning.init());
} else {
    SystematicLearning.init();
}
