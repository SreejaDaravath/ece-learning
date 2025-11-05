/* Leaderboard & Gamification System */
class LeaderboardSystem {
    constructor() {
        this.players = [];
        this.achievements = [];
        this.dailyChallenges = [];
        this.init();
    }

    init() {
        this.loadPlayers();
        this.loadAchievements();
        this.setupDailyChallenges();
        this.createLeaderboardUI();
        this.startRealTimeUpdates();
    }

    // Load Players with Real-time Data
    loadPlayers() {
        this.players = [
            { 
                id: 1, 
                name: 'Ravi Kumar', 
                avatar: 'https://ui-avatars.com/api/?name=Ravi+Kumar&background=667eea&color=fff',
                xp: 8500, 
                level: 25, 
                streak: 15,
                badges: ['🏆', '⚡', '🎯', '💎'],
                completed: 42,
                rank: 1
            },
            { 
                id: 2, 
                name: 'Priya Singh', 
                avatar: 'https://ui-avatars.com/api/?name=Priya+Singh&background=f093fb&color=fff',
                xp: 7850, 
                level: 23, 
                streak: 12,
                badges: ['🏆', '⚡', '🎯'],
                completed: 38,
                rank: 2
            },
            { 
                id: 3, 
                name: 'Aditya Reddy', 
                avatar: 'https://ui-avatars.com/api/?name=Aditya+Reddy&background=4facfe&color=fff',
                xp: 7200, 
                level: 21, 
                streak: 8,
                badges: ['🏆', '⚡'],
                completed: 35,
                rank: 3
            },
            { 
                id: 4, 
                name: 'Sneha Patel', 
                avatar: 'https://ui-avatars.com/api/?name=Sneha+Patel&background=43e97b&color=fff',
                xp: 6900, 
                level: 20, 
                streak: 10,
                badges: ['🏆', '🎯'],
                completed: 32,
                rank: 4
            },
            { 
                id: 5, 
                name: 'Kiran Kumar', 
                avatar: 'https://ui-avatars.com/api/?name=Kiran+Kumar&background=f5576c&color=fff',
                xp: 6500, 
                level: 19, 
                streak: 5,
                badges: ['🏆'],
                completed: 30,
                rank: 5
            }
        ];
    }

    // Load Achievements System
    loadAchievements() {
        this.achievements = [
            {
                id: 'first_circuit',
                name: 'First Circuit',
                description: 'Complete your first circuit',
                icon: '⚡',
                xp: 100,
                unlocked: true
            },
            {
                id: 'speed_learner',
                name: 'Speed Learner',
                description: 'Complete 5 concepts in one day',
                icon: '🚀',
                xp: 250,
                unlocked: true
            },
            {
                id: 'perfect_score',
                name: 'Perfect Score',
                description: 'Get 100% on any quiz',
                icon: '💯',
                xp: 300,
                unlocked: false
            },
            {
                id: 'week_streak',
                name: 'Week Warrior',
                description: 'Maintain 7-day learning streak',
                icon: '🔥',
                xp: 500,
                unlocked: true
            },
            {
                id: 'master_mind',
                name: 'Master Mind',
                description: 'Complete all concepts in a skill',
                icon: '🧠',
                xp: 1000,
                unlocked: false
            },
            {
                id: 'helping_hand',
                name: 'Helping Hand',
                description: 'Help 10 other students',
                icon: '🤝',
                xp: 750,
                unlocked: false
            }
        ];
    }

    // Daily Challenges
    setupDailyChallenges() {
        this.dailyChallenges = [
            {
                id: 1,
                title: 'Quick Learner',
                description: 'Complete 3 concepts today',
                progress: 2,
                target: 3,
                reward: 200,
                icon: '📚'
            },
            {
                id: 2,
                title: 'Quiz Master',
                description: 'Score 90% or higher on 2 quizzes',
                progress: 1,
                target: 2,
                reward: 150,
                icon: '🎯'
            },
            {
                id: 3,
                title: 'Voice Learner',
                description: 'Use AI voice feature 5 times',
                progress: 3,
                target: 5,
                reward: 100,
                icon: '🎤'
            }
        ];
    }

    // Create Leaderboard UI
    createLeaderboardUI() {
        const leaderboardHTML = `
            <div class="leaderboard-overlay" id="leaderboard-overlay">
                <div class="leaderboard-container">
                    <div class="leaderboard-header">
                        <h2>🏆 Live Leaderboard</h2>
                        <button class="close-leaderboard" onclick="leaderboard.closeLeaderboard()">✕</button>
                    </div>

                    <!-- Tabs -->
                    <div class="leaderboard-tabs">
                        <button class="tab-btn active" data-tab="rankings">🏆 Rankings</button>
                        <button class="tab-btn" data-tab="achievements">🎖️ Achievements</button>
                        <button class="tab-btn" data-tab="challenges">⚡ Daily Challenges</button>
                    </div>

                    <!-- Rankings Tab -->
                    <div class="tab-content active" id="rankings-tab">
                        <!-- Your Rank Card -->
                        <div class="your-rank-card">
                            <div class="rank-info">
                                <div class="rank-badge">#5</div>
                                <div class="rank-details">
                                    <h3>Your Rank</h3>
                                    <p>6500 XP | Level 19 | 🔥 5 day streak</p>
                                </div>
                            </div>
                            <div class="rank-progress">
                                <p>Next Rank: 400 XP needed</p>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 60%"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Top 3 Podium -->
                        <div class="podium">
                            <div class="podium-item rank-2">
                                <div class="podium-avatar">
                                    <img src="https://ui-avatars.com/api/?name=Priya+Singh&background=f093fb&color=fff" alt="Rank 2">
                                    <div class="podium-rank">2</div>
                                </div>
                                <h4>Priya Singh</h4>
                                <p>7850 XP</p>
                            </div>
                            <div class="podium-item rank-1">
                                <div class="podium-avatar">
                                    <img src="https://ui-avatars.com/api/?name=Ravi+Kumar&background=667eea&color=fff" alt="Rank 1">
                                    <div class="podium-rank">🏆</div>
                                </div>
                                <h4>Ravi Kumar</h4>
                                <p>8500 XP</p>
                            </div>
                            <div class="podium-item rank-3">
                                <div class="podium-avatar">
                                    <img src="https://ui-avatars.com/api/?name=Aditya+Reddy&background=4facfe&color=fff" alt="Rank 3">
                                    <div class="podium-rank">3</div>
                                </div>
                                <h4>Aditya Reddy</h4>
                                <p>7200 XP</p>
                            </div>
                        </div>

                        <!-- Rankings List -->
                        <div class="rankings-list" id="rankings-list"></div>
                    </div>

                    <!-- Achievements Tab -->
                    <div class="tab-content" id="achievements-tab">
                        <div class="achievements-grid" id="achievements-grid"></div>
                    </div>

                    <!-- Daily Challenges Tab -->
                    <div class="tab-content" id="challenges-tab">
                        <div class="challenges-list" id="challenges-list"></div>
                    </div>
                </div>
            </div>

            <!-- Floating Leaderboard Button -->
            <button class="floating-leaderboard-btn" onclick="leaderboard.openLeaderboard()">
                🏆
                <span class="pulse-ring"></span>
            </button>

            <!-- Achievement Notification -->
            <div class="achievement-notification" id="achievement-notification">
                <div class="achievement-icon">🎉</div>
                <div class="achievement-text">
                    <h4>Achievement Unlocked!</h4>
                    <p id="achievement-message"></p>
                </div>
            </div>

            <!-- XP Gain Notification -->
            <div class="xp-notification" id="xp-notification">
                +<span id="xp-amount">0</span> XP
            </div>

            <!-- Level Up Notification -->
            <div class="levelup-notification" id="levelup-notification">
                <div class="levelup-content">
                    <h2>🎊 LEVEL UP! 🎊</h2>
                    <p>You reached Level <span id="new-level">0</span>!</p>
                    <p class="reward-text">Reward: <span id="level-reward">0</span> XP</p>
                </div>
            </div>
        `;

        // Add to body
        document.body.insertAdjacentHTML('beforeend', leaderboardHTML);

        // Render rankings
        this.renderRankings();
        this.renderAchievements();
        this.renderChallenges();
        this.setupTabs();
    }

    // Render Rankings List
    renderRankings() {
        const list = document.getElementById('rankings-list');
        if (!list) return;

        list.innerHTML = this.players.map(player => `
            <div class="ranking-item ${player.rank <= 3 ? 'top-rank' : ''}">
                <div class="rank-number">#${player.rank}</div>
                <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
                <div class="player-info">
                    <h4>${player.name}</h4>
                    <div class="player-stats">
                        <span>Level ${player.level}</span>
                        <span>•</span>
                        <span>${player.xp} XP</span>
                        <span>•</span>
                        <span>🔥 ${player.streak} days</span>
                    </div>
                </div>
                <div class="player-badges">
                    ${player.badges.map(badge => `<span class="badge-icon">${badge}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Render Achievements
    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;

        grid.innerHTML = this.achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon-large">${achievement.icon}</div>
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
                <div class="achievement-xp">+${achievement.xp} XP</div>
                ${achievement.unlocked ? '<div class="unlock-badge">✓ UNLOCKED</div>' : '<div class="lock-badge">🔒 LOCKED</div>'}
            </div>
        `).join('');
    }

    // Render Daily Challenges
    renderChallenges() {
        const list = document.getElementById('challenges-list');
        if (!list) return;

        list.innerHTML = this.dailyChallenges.map(challenge => `
            <div class="challenge-card">
                <div class="challenge-icon">${challenge.icon}</div>
                <div class="challenge-info">
                    <h4>${challenge.title}</h4>
                    <p>${challenge.description}</p>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(challenge.progress / challenge.target) * 100}%"></div>
                        </div>
                        <span class="progress-text">${challenge.progress}/${challenge.target}</span>
                    </div>
                </div>
                <div class="challenge-reward">
                    <span class="reward-badge">+${challenge.reward} XP</span>
                </div>
            </div>
        `).join('');
    }

    // Setup Tabs
    setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                
                // Update active states
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
    }

    // Open/Close Leaderboard
    openLeaderboard() {
        document.getElementById('leaderboard-overlay').classList.add('active');
    }

    closeLeaderboard() {
        document.getElementById('leaderboard-overlay').classList.remove('active');
    }

    // Start Real-time Updates
    startRealTimeUpdates() {
        setInterval(() => {
            this.simulateRankingChanges();
        }, 10000); // Update every 10 seconds
    }

    // Simulate Ranking Changes
    simulateRankingChanges() {
        // Randomly update XP
        const randomPlayer = this.players[Math.floor(Math.random() * this.players.length)];
        const xpGain = Math.floor(Math.random() * 50) + 10;
        randomPlayer.xp += xpGain;
        
        // Re-sort
        this.players.sort((a, b) => b.xp - a.xp);
        this.players.forEach((player, index) => {
            player.rank = index + 1;
        });
        
        // Update UI
        this.renderRankings();
        
        // Show XP notification
        this.showXPGain(xpGain);
    }

    // Show XP Gain Animation
    showXPGain(amount) {
        const notification = document.getElementById('xp-notification');
        const amountSpan = document.getElementById('xp-amount');
        
        amountSpan.textContent = amount;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    // Show Achievement Unlocked
    showAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (!achievement) return;
        
        const notification = document.getElementById('achievement-notification');
        const message = document.getElementById('achievement-message');
        
        message.textContent = `${achievement.icon} ${achievement.name} - +${achievement.xp} XP`;
        notification.classList.add('show');
        
        // Play sound effect (if available)
        this.playSound('achievement');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    // Show Level Up
    showLevelUp(newLevel, reward) {
        const notification = document.getElementById('levelup-notification');
        document.getElementById('new-level').textContent = newLevel;
        document.getElementById('level-reward').textContent = reward;
        
        notification.classList.add('show');
        
        // Play sound effect
        this.playSound('levelup');
        
        // Confetti effect
        this.showConfetti();
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Play Sound
    playSound(type) {
        // Implement sound playing logic
        console.log(`Playing ${type} sound`);
    }

    // Show Confetti
    showConfetti() {
        // Implement confetti animation
        console.log('Showing confetti');
    }
}

// Initialize Leaderboard System
let leaderboard;
document.addEventListener('DOMContentLoaded', () => {
    leaderboard = new LeaderboardSystem();
    
    // Test notifications after 3 seconds
    setTimeout(() => {
        leaderboard.showXPGain(50);
    }, 3000);
    
    setTimeout(() => {
        leaderboard.showAchievement('speed_learner');
    }, 5000);
});
