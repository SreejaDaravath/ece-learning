// 🎯 ECE MASTER - Professional Interactive Learning Features v5.0
// Student-Focused, Hands-On Learning Experience

const InteractiveLearning = {
    // ================================
    // 📊 Learning Analytics System
    // ================================
    analytics: {
        sessionStart: Date.now(),
        levelsCompleted: 0,
        totalTime: 0,
        hintsUsed: 0,
        errorsEncountered: 0,
        conceptsMastered: [],
        skillProgress: {
            'Basic Circuits': 0,
            'Ohm\'s Law': 0,
            'Voltage Dividers': 0,
            'Logic Gates': 0,
            'Digital Circuits': 0
        },
        recentActivity: []
    },

    // Initialize analytics dashboard
    initAnalytics() {
        this.createAnalyticsDashboard();
        this.loadAnalyticsFromStorage();
        this.updateDashboard();
        setInterval(() => this.updateDashboard(), 30000); // Update every 30s
    },

    createAnalyticsDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'analytics-dashboard';
        dashboard.id = 'analyticsDashboard';
        dashboard.innerHTML = `
            <div class="analytics-header">
                <h3 class="analytics-title">📊 Your Progress</h3>
                <button class="analytics-toggle" onclick="InteractiveLearning.toggleAnalytics()">−</button>
            </div>
            <div class="analytics-content" id="analyticsContent">
                <div class="analytics-stats">
                    <div class="stat-card">
                        <span class="stat-value" id="stat-completed">0</span>
                        <span class="stat-label">Completed</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value" id="stat-time">0m</span>
                        <span class="stat-label">Study Time</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value" id="stat-accuracy">100%</span>
                        <span class="stat-label">Accuracy</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value" id="stat-streak">🔥 0</span>
                        <span class="stat-label">Streak</span>
                    </div>
                </div>
                <div class="recent-activity">
                    <h4 class="activity-title">Recent Activity</h4>
                    <div id="activityList"></div>
                </div>
            </div>
        `;
        document.body.appendChild(dashboard);
    },

    toggleAnalytics() {
        const content = document.getElementById('analyticsContent');
        const toggle = document.querySelector('.analytics-toggle');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggle.textContent = '−';
        } else {
            content.style.display = 'none';
            toggle.textContent = '+';
        }
    },

    updateDashboard() {
        const now = Date.now();
        const sessionMinutes = Math.floor((now - this.analytics.sessionStart) / 60000);
        
        document.getElementById('stat-completed').textContent = this.analytics.levelsCompleted;
        document.getElementById('stat-time').textContent = `${sessionMinutes}m`;
        
        const accuracy = this.analytics.errorsEncountered > 0 
            ? Math.floor((this.analytics.levelsCompleted / (this.analytics.levelsCompleted + this.analytics.errorsEncountered)) * 100)
            : 100;
        document.getElementById('stat-accuracy').textContent = `${accuracy}%`;
        
        // Calculate streak (consecutive successes)
        const streak = this.calculateStreak();
        document.getElementById('stat-streak').textContent = `🔥 ${streak}`;
        
        this.updateActivityList();
        this.saveAnalytics();
    },

    calculateStreak() {
        // Count consecutive successful completions
        let streak = 0;
        const activities = [...this.analytics.recentActivity].reverse();
        for (const activity of activities) {
            if (activity.type === 'success') streak++;
            else break;
        }
        return streak;
    },

    updateActivityList() {
        const listEl = document.getElementById('activityList');
        if (!listEl) return;
        
        const recentActivities = this.analytics.recentActivity.slice(-5).reverse();
        listEl.innerHTML = recentActivities.map(activity => `
            <div class="activity-item">
                <span class="activity-icon">${activity.icon}</span>
                <span class="activity-text">${activity.text}</span>
                <span class="activity-time">${this.getTimeAgo(activity.timestamp)}</span>
            </div>
        `).join('');
    },

    getTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    },

    logActivity(type, text, icon) {
        this.analytics.recentActivity.push({
            type,
            text,
            icon,
            timestamp: Date.now()
        });
        if (this.analytics.recentActivity.length > 20) {
            this.analytics.recentActivity.shift();
        }
        this.updateDashboard();
    },

    saveAnalytics() {
        localStorage.setItem('ece-analytics', JSON.stringify(this.analytics));
    },

    loadAnalyticsFromStorage() {
        const saved = localStorage.getItem('ece-analytics');
        if (saved) {
            const data = JSON.parse(saved);
            this.analytics = { ...this.analytics, ...data, sessionStart: Date.now() };
        }
    },

    // ================================
    // 🎯 Learning Path Visualization
    // ================================
    learningPath: {
        skills: [
            { name: 'Basic Circuits', progress: 0, icon: '🔌' },
            { name: 'Ohm\'s Law', progress: 0, icon: '⚡' },
            { name: 'Voltage Dividers', progress: 0, icon: '📊' },
            { name: 'Logic Gates', progress: 0, icon: '🔢' },
            { name: 'Digital Circuits', progress: 0, icon: '💾' }
        ]
    },

    initLearningPath() {
        this.createLearningPathUI();
        this.loadSkillProgress();
        this.updateLearningPath();
    },

    createLearningPathUI() {
        const pathContainer = document.createElement('div');
        pathContainer.className = 'learning-path';
        pathContainer.id = 'learningPath';
        pathContainer.innerHTML = `
            <h3>🎯 Learning Path</h3>
            <div id="skillProgressList"></div>
        `;
        document.body.appendChild(pathContainer);
    },

    updateLearningPath() {
        const listEl = document.getElementById('skillProgressList');
        if (!listEl) return;
        
        listEl.innerHTML = this.learningPath.skills.map(skill => `
            <div class="skill-progress">
                <div class="skill-name">
                    <span>${skill.icon} ${skill.name}</span>
                    <span>${skill.progress}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-fill" style="width: ${skill.progress}%"></div>
                </div>
            </div>
        `).join('');
    },

    updateSkillProgress(skillName, progress) {
        const skill = this.learningPath.skills.find(s => s.name === skillName);
        if (skill) {
            skill.progress = Math.min(100, Math.max(0, progress));
            this.updateLearningPath();
            this.saveSkillProgress();
        }
    },

    saveSkillProgress() {
        localStorage.setItem('ece-skill-progress', JSON.stringify(this.learningPath.skills));
    },

    loadSkillProgress() {
        const saved = localStorage.getItem('ece-skill-progress');
        if (saved) {
            this.learningPath.skills = JSON.parse(saved);
        }
    },

    // ================================
    // 💡 Smart Hint System
    // ================================
    hints: {
        currentHint: null,
        hintQueue: [],
        hintCooldown: false
    },

    showSmartHint(title, message, duration = 8000) {
        if (this.hints.hintCooldown) return;
        
        // Remove existing hint
        const existingHint = document.querySelector('.smart-hint-container');
        if (existingHint) existingHint.remove();
        
        const hintContainer = document.createElement('div');
        hintContainer.className = 'smart-hint-container';
        hintContainer.innerHTML = `
            <div class="smart-hint">
                <span class="hint-icon">💡</span>
                <div class="hint-content">
                    <div class="hint-title">${title}</div>
                    <div class="hint-text">${message}</div>
                </div>
                <button class="hint-close" onclick="this.closest('.smart-hint-container').remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(hintContainer);
        
        // Auto-remove after duration
        setTimeout(() => {
            if (hintContainer.parentNode) {
                hintContainer.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => hintContainer.remove(), 300);
            }
        }, duration);
        
        // Set cooldown
        this.hints.hintCooldown = true;
        setTimeout(() => { this.hints.hintCooldown = false; }, 15000);
        
        this.analytics.hintsUsed++;
        this.logActivity('hint', `Used hint: ${title}`, '💡');
    },

    // Context-aware hints based on user behavior
    provideContextualHint(context) {
        const hintLibrary = {
            'no-components': {
                title: 'Get Started!',
                message: 'Drag a component from the left panel onto the breadboard to begin building your circuit.'
            },
            'components-no-wires': {
                title: 'Connect Components',
                message: 'Click and drag to draw wires between components. Make sure to complete all necessary connections!'
            },
            'incomplete-circuit': {
                title: 'Check Connections',
                message: 'Your circuit seems incomplete. Verify that all components are properly connected and powered.'
            },
            'wrong-values': {
                title: 'Check Component Values',
                message: 'The component values might not be correct. Review the level requirements and adjust your components.'
            },
            'struggling': {
                title: 'Need Help?',
                message: 'Try using the "Show Answer" button or watch the demo video for guidance.'
            },
            'great-progress': {
                title: 'Great Job!',
                message: 'You\'re making excellent progress! Keep up the good work.'
            },
            'speed-bonus': {
                title: 'Speed Bonus Available!',
                message: 'Complete this level quickly to earn bonus points!'
            }
        };
        
        const hint = hintLibrary[context];
        if (hint) {
            this.showSmartHint(hint.title, hint.message);
        }
    },

    // ================================
    // 🎮 Practice Mode System
    // ================================
    practiceMode: {
        modes: [
            {
                id: 'guided',
                icon: '🎓',
                title: 'Guided Practice',
                description: 'Step-by-step instructions with hints',
                active: true
            },
            {
                id: 'challenge',
                icon: '⚡',
                title: 'Challenge Mode',
                description: 'Test your skills without hints',
                active: false
            },
            {
                id: 'sandbox',
                icon: '🔬',
                title: 'Free Sandbox',
                description: 'Experiment freely with any components',
                active: false
            },
            {
                id: 'timed',
                icon: '⏱️',
                title: 'Timed Challenge',
                description: 'Race against the clock!',
                active: false
            }
        ],
        currentMode: 'guided'
    },

    initPracticeMode() {
        this.createPracticeModeUI();
        this.loadPracticeMode();
    },

    createPracticeModeUI() {
        const existing = document.querySelector('.practice-mode-selector');
        if (existing) existing.remove();
        
        const selector = document.createElement('div');
        selector.className = 'practice-mode-selector';
        selector.innerHTML = this.practiceMode.modes.map(mode => `
            <div class="mode-card ${mode.active ? 'active' : ''}" 
                 data-mode="${mode.id}"
                 onclick="InteractiveLearning.selectPracticeMode('${mode.id}')">
                <span class="mode-icon">${mode.icon}</span>
                <div class="mode-title">${mode.title}</div>
                <div class="mode-description">${mode.description}</div>
            </div>
        `).join('');
        
        // Insert before workspace
        const workspace = document.querySelector('.main-workspace');
        if (workspace) {
            workspace.insertBefore(selector, workspace.firstChild);
        }
    },

    selectPracticeMode(modeId) {
        this.practiceMode.currentMode = modeId;
        this.practiceMode.modes.forEach(mode => {
            mode.active = mode.id === modeId;
        });
        
        this.createPracticeModeUI();
        this.savePracticeMode();
        
        // Apply mode-specific settings
        this.applyModeSettings(modeId);
        
        this.logActivity('mode', `Switched to ${modeId} mode`, '🎮');
    },

    applyModeSettings(modeId) {
        switch(modeId) {
            case 'guided':
                this.showSmartHint('Guided Mode', 'Follow the instructions and use hints when needed!');
                break;
            case 'challenge':
                this.showSmartHint('Challenge Mode', 'No hints available - test your knowledge!');
                break;
            case 'sandbox':
                this.showSmartHint('Sandbox Mode', 'Experiment freely! No restrictions.');
                break;
            case 'timed':
                this.showSmartHint('Timed Mode', 'Complete the level as fast as possible!');
                break;
        }
    },

    savePracticeMode() {
        localStorage.setItem('ece-practice-mode', this.practiceMode.currentMode);
    },

    loadPracticeMode() {
        const saved = localStorage.getItem('ece-practice-mode');
        if (saved) {
            this.selectPracticeMode(saved);
        }
    },

    // ================================
    // ✅ Real-Time Validation Feedback
    // ================================
    validation: {
        checks: [],
        errors: [],
        warnings: []
    },

    validateCircuit(circuit, expectedResult) {
        this.validation.errors = [];
        this.validation.warnings = [];
        
        // Perform various checks
        const checks = {
            hasComponents: this.checkHasComponents(circuit),
            hasPowerSource: this.checkPowerSource(circuit),
            allConnected: this.checkAllConnected(circuit),
            correctValues: this.checkComponentValues(circuit, expectedResult),
            noShortCircuits: this.checkShortCircuits(circuit)
        };
        
        // Provide contextual hints based on validation
        if (!checks.hasComponents) {
            this.provideContextualHint('no-components');
        } else if (!checks.allConnected) {
            this.provideContextualHint('incomplete-circuit');
        } else if (!checks.correctValues) {
            this.provideContextualHint('wrong-values');
        }
        
        return checks;
    },

    checkHasComponents(circuit) {
        return circuit && circuit.components && circuit.components.length > 0;
    },

    checkPowerSource(circuit) {
        if (!circuit.components) return false;
        return circuit.components.some(c => c.type === 'battery' || c.type === 'power-supply');
    },

    checkAllConnected(circuit) {
        // Simplified check - in real implementation, would check graph connectivity
        if (!circuit.wires) return false;
        return circuit.wires.length >= circuit.components.length;
    },

    checkComponentValues(circuit, expected) {
        // Simplified check - compare calculated values with expected
        return true; // Implement actual comparison logic
    },

    checkShortCircuits(circuit) {
        // Check for direct battery connections without resistance
        return true; // Implement actual short circuit detection
    },

    showValidationResult(success, message, details = {}) {
        const overlay = document.createElement('div');
        overlay.className = 'validation-overlay';
        overlay.innerHTML = `
            <div class="validation-card validation-${success ? 'success' : 'error'}">
                <span class="validation-icon">${success ? '✅' : '❌'}</span>
                <h2 class="validation-title">${success ? 'Perfect!' : 'Not Quite Right'}</h2>
                <p class="validation-message">${message}</p>
                ${Object.keys(details).length > 0 ? `
                    <div class="validation-details">
                        ${Object.entries(details).map(([key, value]) => `
                            <div class="detail-row">
                                <span class="detail-label">${key}:</span>
                                <span class="detail-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                <button class="control-btn control-btn-primary" onclick="this.closest('.validation-overlay').remove()">
                    <span>Continue</span>
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => overlay.remove(), 500);
            }
        }, 5000);
        
        // Log activity
        if (success) {
            this.analytics.levelsCompleted++;
            this.logActivity('success', message, '✅');
        } else {
            this.analytics.errorsEncountered++;
            this.logActivity('error', message, '❌');
        }
    },

    // ================================
    // 🏆 Achievement System
    // ================================
    achievements: {
        list: [
            { id: 'first-circuit', name: 'First Circuit', description: 'Complete your first level', icon: '🎓', unlocked: false },
            { id: 'speed-demon', name: 'Speed Demon', description: 'Complete a level in under 30 seconds', icon: '⚡', unlocked: false },
            { id: 'perfectionist', name: 'Perfectionist', description: 'Complete 5 levels without errors', icon: '🎯', unlocked: false },
            { id: 'master-builder', name: 'Master Builder', description: 'Complete 25 levels', icon: '🏆', unlocked: false },
            { id: 'knowledge-seeker', name: 'Knowledge Seeker', description: 'Read all knowledge base articles', icon: '📚', unlocked: false }
        ]
    },

    checkAchievements() {
        const achievements = this.achievements.list;
        let newAchievements = [];
        
        // Check first circuit
        if (!achievements[0].unlocked && this.analytics.levelsCompleted >= 1) {
            achievements[0].unlocked = true;
            newAchievements.push(achievements[0]);
        }
        
        // Check perfectionist (5 consecutive successes)
        if (!achievements[2].unlocked && this.calculateStreak() >= 5) {
            achievements[2].unlocked = true;
            newAchievements.push(achievements[2]);
        }
        
        // Check master builder
        if (!achievements[3].unlocked && this.analytics.levelsCompleted >= 25) {
            achievements[3].unlocked = true;
            newAchievements.push(achievements[3]);
        }
        
        // Show new achievements
        newAchievements.forEach(achievement => {
            this.showAchievement(achievement);
        });
        
        this.saveAchievements();
    },

    showAchievement(achievement) {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-card">
                <span class="achievement-badge">${achievement.icon}</span>
                <h3 class="achievement-name">${achievement.name}</h3>
                <p class="achievement-description">${achievement.description}</p>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Play celebration sound (if available)
        this.playCelebrationSound();
        
        // Remove after 4 seconds
        setTimeout(() => {
            popup.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => popup.remove(), 500);
        }, 4000);
        
        this.logActivity('achievement', `Unlocked: ${achievement.name}`, achievement.icon);
    },

    playCelebrationSound() {
        // Audio context for celebration sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not available');
        }
    },

    saveAchievements() {
        localStorage.setItem('ece-achievements', JSON.stringify(this.achievements.list));
    },

    loadAchievements() {
        const saved = localStorage.getItem('ece-achievements');
        if (saved) {
            this.achievements.list = JSON.parse(saved);
        }
    },

    // ================================
    // 🚀 Initialize All Features
    // ================================
    init() {
        console.log('🎯 Initializing Professional Interactive Learning System...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeFeatures());
        } else {
            this.initializeFeatures();
        }
    },

    initializeFeatures() {
        try {
            // Initialize all systems
            this.initAnalytics();
            this.initLearningPath();
            this.initPracticeMode();
            this.loadAchievements();
            
            // Welcome message
            setTimeout(() => {
                this.showSmartHint(
                    'Welcome to ECE MASTER!',
                    'Choose your practice mode and start building circuits. Track your progress in the dashboard!',
                    12000
                );
            }, 2000);
            
            console.log('✅ All learning features initialized successfully!');
        } catch (error) {
            console.error('Error initializing learning features:', error);
        }
    }
};

// Auto-initialize when script loads
InteractiveLearning.init();

// Export for external use
if (typeof window !== 'undefined') {
    window.InteractiveLearning = InteractiveLearning;
}
