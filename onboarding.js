/**
 * ECE MASTER - Onboarding & Tutorial System
 * Systematic onboarding for new users with interactive tutorials
 */

const OnboardingManager = {
    currentStep: 0,
    steps: [
        {
            id: 'welcome',
            title: '👋 Welcome to ECE MASTER!',
            message: `
                <h2>Learn Electronics by Building Real Circuits!</h2>
                <p>This interactive game teaches you:</p>
                <ul>
                    <li>⚡ Basic Electronics & Ohm's Law</li>
                    <li>🔌 Circuit Building & Wiring</li>
                    <li>💡 LED Circuits & Components</li>
                    <li>🔢 Digital Logic Gates</li>
                    <li>🎓 Advanced Circuit Design</li>
                </ul>
                <p><strong>50 levels</strong> from beginner to advanced!</p>
            `,
            target: null,
            position: 'center'
        },
        {
            id: 'components',
            title: '🔧 Component Palette',
            message: `
                <p><strong>Drag components</strong> from this palette onto the breadboard.</p>
                <p>Available components:</p>
                <ul>
                    <li>🔋 <strong>Batteries</strong> - Power sources</li>
                    <li>💡 <strong>LEDs</strong> - Light emitting diodes</li>
                    <li>📟 <strong>Resistors</strong> - Control current</li>
                    <li>🔢 <strong>Logic Gates</strong> - Digital circuits</li>
                </ul>
                <p><em>Try dragging a battery!</em></p>
            `,
            target: '.component-palette',
            position: 'right',
            highlight: true
        },
        {
            id: 'breadboard',
            title: '📋 Breadboard Workspace',
            message: `
                <p>This is your <strong>breadboard</strong> - where you build circuits.</p>
                <p><strong>How to use:</strong></p>
                <ol>
                    <li>Drag components here</li>
                    <li>Click components to select them</li>
                    <li>Use "Draw Wire" to connect</li>
                    <li>Test your circuit!</li>
                </ol>
            `,
            target: '#breadboard',
            position: 'top',
            highlight: true
        },
        {
            id: 'wire-tool',
            title: '🔌 Wire Drawing Tool',
            message: `
                <p>Click this button to <strong>connect components with wires</strong>.</p>
                <p><strong>Two modes:</strong></p>
                <ul>
                    <li>📌 <strong>Click-to-Connect:</strong> Click component A, then B</li>
                    <li>✏️ <strong>Free Draw:</strong> Draw natural wire paths</li>
                </ul>
                <p><em>Wires carry electricity between components!</em></p>
            `,
            target: '#drawWireBtn',
            position: 'right',
            highlight: true
        },
        {
            id: 'tools',
            title: '📊 Measurement Tools',
            message: `
                <p>Use these tools to <strong>measure and debug</strong> your circuits:</p>
                <ul>
                    <li>🔴 <strong>Multimeter:</strong> Measure voltage, current, resistance</li>
                    <li>📈 <strong>Logic Analyzer:</strong> View digital signals</li>
                    <li>〰️ <strong>Oscilloscope:</strong> See waveforms</li>
                </ul>
                <p><em>Real engineers use these tools!</em></p>
            `,
            target: '.tools-section',
            position: 'right',
            highlight: true
        },
        {
            id: 'ai-assistant',
            title: '📹 ECE AI Assistant',
            message: `
                <p><strong>NEW!</strong> Your personal electronics tutor!</p>
                <p><strong>Features:</strong></p>
                <ul>
                    <li>📷 <strong>Webcam Analysis:</strong> Show your circuit for feedback</li>
                    <li>💡 <strong>Smart Tips:</strong> Get instant help</li>
                    <li>🎓 <strong>Theory:</strong> Learn Ohm's Law & circuit principles</li>
                    <li>🔍 <strong>Hints:</strong> Never get stuck!</li>
                </ul>
                <p><em>Use it whenever you need help!</em></p>
            `,
            target: '#eceAssistant',
            position: 'right',
            highlight: true,
            pulse: true
        },
        {
            id: 'test-submit',
            title: '✅ Testing & Submission',
            message: `
                <p><strong>Before submitting:</strong></p>
                <ol>
                    <li>🧪 <strong>Test Circuit:</strong> Check if it works</li>
                    <li>🔍 <strong>Verify Connections:</strong> All wires connected?</li>
                    <li>✓ <strong>Submit Answer:</strong> Get scored!</li>
                </ol>
                <p><strong>Scoring:</strong></p>
                <ul>
                    <li>Base Score: +100 points</li>
                    <li>Time Bonus: Up to +100</li>
                    <li>First Try: +100 bonus!</li>
                </ul>
            `,
            target: '#submitAnswer',
            position: 'top',
            highlight: true
        },
        {
            id: 'achievements',
            title: '🏆 Achievements & Progress',
            message: `
                <p>Track your learning journey!</p>
                <p><strong>Unlock badges:</strong></p>
                <ul>
                    <li>🎓 <strong>Scholar:</strong> Complete many levels</li>
                    <li>⚡ <strong>Speed Demon:</strong> Fast completions</li>
                    <li>🎯 <strong>Perfectionist:</strong> First-try wins</li>
                    <li>🔥 <strong>Hot Streak:</strong> Consecutive successes</li>
                </ul>
                <p><em>Can you unlock them all?</em></p>
            `,
            target: '.achievements',
            position: 'left',
            highlight: true
        },
        {
            id: 'ready',
            title: '🚀 Ready to Start!',
            message: `
                <h2>You're All Set!</h2>
                <p><strong>Quick tips for success:</strong></p>
                <ul>
                    <li>💡 Watch the demo for each level</li>
                    <li>🔌 Connect + to + and - to -</li>
                    <li>📹 Use AI Assistant when stuck</li>
                    <li>🧪 Test before submitting</li>
                    <li>⏱️ Faster = More points!</li>
                </ul>
                <p><strong>Start with Level 1:</strong> Connect Your First LED</p>
                <p><em>Have fun learning! 🎓⚡</em></p>
            `,
            target: null,
            position: 'center'
        }
    ],

    init() {
        // Check if user has completed onboarding
        const completed = localStorage.getItem('onboarding-completed');
        
        if (!completed) {
            setTimeout(() => {
                this.start();
            }, 1000); // Start after 1 second
        }

        // Add "Show Tutorial" button to UI
        this.addTutorialButton();
    },

    start() {
        this.currentStep = 0;
        this.showStep(0);
        
        // Track onboarding start
        if (window.trackEvent) {
            trackEvent('Onboarding', 'Started', 'Tutorial', 1);
        }
    },

    showStep(stepIndex) {
        const step = this.steps[stepIndex];
        if (!step) return;

        // Remove any existing overlay
        this.removeOverlay();

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'onboarding-overlay';
        overlay.className = 'onboarding-overlay';

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'onboarding-tooltip';
        tooltip.innerHTML = `
            <div class="onboarding-header">
                <span class="onboarding-step">${stepIndex + 1}/${this.steps.length}</span>
                <h3>${step.title}</h3>
                <button class="onboarding-skip" id="skipOnboarding">Skip Tutorial</button>
            </div>
            <div class="onboarding-content">
                ${step.message}
            </div>
            <div class="onboarding-footer">
                ${stepIndex > 0 ? '<button class="onboarding-btn secondary" id="prevStep">← Previous</button>' : '<div></div>'}
                ${stepIndex < this.steps.length - 1 
                    ? '<button class="onboarding-btn primary" id="nextStep">Next →</button>'
                    : '<button class="onboarding-btn success" id="finishOnboarding">Start Learning! 🚀</button>'}
            </div>
        `;

        // Position tooltip
        if (step.target) {
            const target = document.querySelector(step.target);
            if (target) {
                // Highlight target
                if (step.highlight) {
                    target.classList.add('onboarding-highlight');
                    if (step.pulse) {
                        target.classList.add('onboarding-pulse');
                    }
                }

                // Position relative to target
                const rect = target.getBoundingClientRect();
                tooltip.style.position = 'fixed';
                
                switch(step.position) {
                    case 'right':
                        tooltip.style.left = (rect.right + 20) + 'px';
                        tooltip.style.top = rect.top + 'px';
                        break;
                    case 'left':
                        tooltip.style.right = (window.innerWidth - rect.left + 20) + 'px';
                        tooltip.style.top = rect.top + 'px';
                        break;
                    case 'top':
                        tooltip.style.left = rect.left + 'px';
                        tooltip.style.bottom = (window.innerHeight - rect.top + 20) + 'px';
                        break;
                    case 'bottom':
                        tooltip.style.left = rect.left + 'px';
                        tooltip.style.top = (rect.bottom + 20) + 'px';
                        break;
                }
            }
        } else {
            // Center on screen
            tooltip.style.position = 'fixed';
            tooltip.style.top = '50%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            tooltip.style.maxWidth = '600px';
        }

        overlay.appendChild(tooltip);
        document.body.appendChild(overlay);

        // Add event listeners
        const nextBtn = document.getElementById('nextStep');
        const prevBtn = document.getElementById('prevStep');
        const skipBtn = document.getElementById('skipOnboarding');
        const finishBtn = document.getElementById('finishOnboarding');

        if (nextBtn) nextBtn.onclick = () => this.next();
        if (prevBtn) prevBtn.onclick = () => this.previous();
        if (skipBtn) skipBtn.onclick = () => this.skip();
        if (finishBtn) finishBtn.onclick = () => this.complete();
    },

    next() {
        this.currentStep++;
        if (this.currentStep < this.steps.length) {
            this.showStep(this.currentStep);
        } else {
            this.complete();
        }
    },

    previous() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    },

    skip() {
        if (confirm('Are you sure you want to skip the tutorial? You can always restart it from the help menu.')) {
            this.removeOverlay();
            localStorage.setItem('onboarding-completed', 'skipped');
            
            if (window.trackEvent) {
                trackEvent('Onboarding', 'Skipped', `Step ${this.currentStep + 1}`, this.currentStep);
            }
        }
    },

    complete() {
        this.removeOverlay();
        localStorage.setItem('onboarding-completed', 'true');
        
        if (window.trackEvent) {
            trackEvent('Onboarding', 'Completed', 'Tutorial', this.steps.length);
        }

        // Show success message
        if (window.game && window.game.showToast) {
            game.showToast('🎉 Tutorial Complete! Ready to learn electronics!', 'success');
        }
    },

    removeOverlay() {
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            overlay.remove();
        }

        // Remove all highlights
        document.querySelectorAll('.onboarding-highlight').forEach(el => {
            el.classList.remove('onboarding-highlight', 'onboarding-pulse');
        });
    },

    addTutorialButton() {
        // Add "?" help button to header
        const header = document.querySelector('.header-right');
        if (header && !document.getElementById('tutorialBtn')) {
            const btn = document.createElement('button');
            btn.id = 'tutorialBtn';
            btn.className = 'tutorial-btn';
            btn.innerHTML = '<span>❓</span>';
            btn.title = 'Show Tutorial';
            btn.onclick = () => this.start();
            header.appendChild(btn);
        }
    },

    restart() {
        localStorage.removeItem('onboarding-completed');
        this.start();
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => OnboardingManager.init());
} else {
    OnboardingManager.init();
}

// Export for global access
window.OnboardingManager = OnboardingManager;
