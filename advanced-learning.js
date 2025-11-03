/**
 * ECE MASTER - Advanced Learning System
 * AI-powered adaptive learning with knowledge base
 */

const AdvancedLearning = {
    // Electronics Knowledge Base (AI Knowledge Integration)
    knowledgeBase: {
        'ohms-law': {
            title: "Ohm's Law",
            formula: "V = I × R",
            explanation: `
                <h3>⚡ Ohm's Law - The Foundation of Electronics</h3>
                <p><strong>Formula:</strong> V = I × R</p>
                <ul>
                    <li><strong>V (Voltage):</strong> Electrical pressure measured in Volts (V)</li>
                    <li><strong>I (Current):</strong> Flow of electrons measured in Amperes (A)</li>
                    <li><strong>R (Resistance):</strong> Opposition to flow measured in Ohms (Ω)</li>
                </ul>
                <h4>💡 Real-World Analogy:</h4>
                <p>Think of water flowing through a pipe:</p>
                <ul>
                    <li><strong>Voltage</strong> = Water pressure</li>
                    <li><strong>Current</strong> = Amount of water flowing</li>
                    <li><strong>Resistance</strong> = Pipe thickness (narrow pipe = high resistance)</li>
                </ul>
                <h4>📊 Practice Problems:</h4>
                <p>1. If V = 12V and R = 4Ω, find I</p>
                <p><em>Solution: I = V/R = 12/4 = 3A</em></p>
                <p>2. If I = 2A and R = 5Ω, find V</p>
                <p><em>Solution: V = I×R = 2×5 = 10V</em></p>
            `,
            relatedTopics: ['voltage-divider', 'power-calculation', 'resistors']
        },
        
        'voltage-divider': {
            title: "Voltage Divider",
            formula: "Vout = Vin × (R2 / (R1 + R2))",
            explanation: `
                <h3>📊 Voltage Divider - Splitting Voltage</h3>
                <p><strong>Formula:</strong> Vout = Vin × (R2 / (R1 + R2))</p>
                <p>A voltage divider uses two resistors to create a lower voltage from a higher voltage source.</p>
                <h4>🔌 How It Works:</h4>
                <ul>
                    <li>Connect two resistors in <strong>series</strong></li>
                    <li>Input voltage across both resistors</li>
                    <li>Output voltage measured across R2</li>
                    <li>Larger R2 = Higher output voltage</li>
                </ul>
                <h4>📐 Example:</h4>
                <p>Vin = 10V, R1 = 1kΩ, R2 = 1kΩ</p>
                <p>Vout = 10 × (1000 / (1000 + 1000)) = 10 × 0.5 = <strong>5V</strong></p>
                <p><em>Equal resistors divide voltage in half!</em></p>
                <h4>🎯 Applications:</h4>
                <ul>
                    <li>Sensor circuits (potentiometers)</li>
                    <li>Reference voltages</li>
                    <li>Signal conditioning</li>
                    <li>Level shifting</li>
                </ul>
            `,
            relatedTopics: ['ohms-law', 'series-circuits', 'resistors']
        },
        
        'power-calculation': {
            title: "Electrical Power",
            formula: "P = V × I = I²R = V²/R",
            explanation: `
                <h3>⚡ Electrical Power - Energy Transfer</h3>
                <p><strong>Power (P)</strong> is the rate of energy transfer, measured in Watts (W).</p>
                <h4>📐 Three Forms of Power Formula:</h4>
                <ul>
                    <li><strong>P = V × I</strong> (Voltage × Current)</li>
                    <li><strong>P = I² × R</strong> (Current squared × Resistance)</li>
                    <li><strong>P = V² / R</strong> (Voltage squared / Resistance)</li>
                </ul>
                <h4>💡 Why Multiple Formulas?</h4>
                <p>Use the formula that matches your known values:</p>
                <ul>
                    <li>Know V and I? Use P = V × I</li>
                    <li>Know I and R? Use P = I²R</li>
                    <li>Know V and R? Use P = V²/R</li>
                </ul>
                <h4>📊 Example:</h4>
                <p>LED circuit: V = 2V, I = 20mA (0.020A)</p>
                <p>P = V × I = 2 × 0.020 = <strong>0.04W</strong> (40 milliwatts)</p>
                <h4>⚠️ Power Ratings:</h4>
                <p>Components must handle the power dissipated as heat:</p>
                <ul>
                    <li>Standard resistors: 1/4W (0.25W)</li>
                    <li>Power resistors: 1W, 5W, 10W+</li>
                    <li>LEDs: Typically 0.06W - 0.5W</li>
                </ul>
            `,
            relatedTopics: ['ohms-law', 'heat-dissipation', 'component-ratings']
        },
        
        'logic-gates': {
            title: "Digital Logic Gates",
            formula: "Boolean Algebra",
            explanation: `
                <h3>🔢 Logic Gates - Digital Building Blocks</h3>
                <p>Logic gates process binary signals (0 and 1, or LOW and HIGH).</p>
                <h4>🚪 Basic Gates:</h4>
                <ul>
                    <li><strong>AND Gate:</strong> Output = 1 only if ALL inputs = 1</li>
                    <li><strong>OR Gate:</strong> Output = 1 if ANY input = 1</li>
                    <li><strong>NOT Gate:</strong> Inverts input (0→1, 1→0)</li>
                    <li><strong>NAND Gate:</strong> AND + NOT (Universal gate)</li>
                    <li><strong>NOR Gate:</strong> OR + NOT (Universal gate)</li>
                    <li><strong>XOR Gate:</strong> Output = 1 if inputs are DIFFERENT</li>
                </ul>
                <h4>📊 Truth Tables:</h4>
                <p><strong>AND Gate:</strong></p>
                <pre>
A | B | Output
0 | 0 |   0
0 | 1 |   0
1 | 0 |   0
1 | 1 |   1
                </pre>
                <p><strong>XOR Gate:</strong></p>
                <pre>
A | B | Output
0 | 0 |   0
0 | 1 |   1
1 | 0 |   1
1 | 1 |   0
                </pre>
                <h4>🎯 Applications:</h4>
                <ul>
                    <li>Adders and subtractors</li>
                    <li>Multiplexers and decoders</li>
                    <li>Memory circuits (flip-flops)</li>
                    <li>Processors and CPUs</li>
                </ul>
            `,
            relatedTopics: ['boolean-algebra', 'truth-tables', 'digital-circuits']
        },
        
        'series-parallel': {
            title: "Series vs Parallel Circuits",
            formula: "Rs = R1 + R2 + ..., Rp = 1/(1/R1 + 1/R2 + ...)",
            explanation: `
                <h3>🔌 Series vs Parallel - Circuit Topologies</h3>
                <h4>📏 Series Circuits:</h4>
                <p>Components connected <strong>end-to-end</strong> (same current through all):</p>
                <ul>
                    <li><strong>Resistance:</strong> Rs = R1 + R2 + R3 + ...</li>
                    <li><strong>Current:</strong> Same through all components</li>
                    <li><strong>Voltage:</strong> Splits across components</li>
                    <li><strong>Example:</strong> Christmas lights (old style)</li>
                </ul>
                <h4>🔀 Parallel Circuits:</h4>
                <p>Components connected <strong>side-by-side</strong> (same voltage across all):</p>
                <ul>
                    <li><strong>Resistance:</strong> 1/Rp = 1/R1 + 1/R2 + ...</li>
                    <li><strong>Current:</strong> Splits through components</li>
                    <li><strong>Voltage:</strong> Same across all components</li>
                    <li><strong>Example:</strong> Home electrical outlets</li>
                </ul>
                <h4>📊 Comparison:</h4>
                <table>
                    <tr>
                        <th>Property</th>
                        <th>Series</th>
                        <th>Parallel</th>
                    </tr>
                    <tr>
                        <td>Current</td>
                        <td>Same</td>
                        <td>Splits</td>
                    </tr>
                    <tr>
                        <td>Voltage</td>
                        <td>Splits</td>
                        <td>Same</td>
                    </tr>
                    <tr>
                        <td>Resistance</td>
                        <td>Adds</td>
                        <td>Decreases</td>
                    </tr>
                </table>
                <h4>💡 Key Insight:</h4>
                <p>Parallel resistance is <strong>always less</strong> than the smallest resistor!</p>
            `,
            relatedTopics: ['ohms-law', 'kirchhoff-laws', 'circuit-analysis']
        },
        
        'led-basics': {
            title: "LED Circuits",
            formula: "Rled = (Vsupply - Vled) / Iled",
            explanation: `
                <h3>💡 LED Circuits - Light Emitting Diodes</h3>
                <p>LEDs are <strong>diodes</strong> that emit light when current flows through them.</p>
                <h4>🔴 Key LED Properties:</h4>
                <ul>
                    <li><strong>Forward Voltage (Vf):</strong> Voltage drop across LED
                        <ul>
                            <li>Red LED: ~2.0V</li>
                            <li>Green LED: ~2.1V</li>
                            <li>Blue/White: ~3.2V</li>
                        </ul>
                    </li>
                    <li><strong>Forward Current (If):</strong> Typically 20mA (0.020A)</li>
                    <li><strong>Polarity:</strong> Must connect correctly (+ to anode, - to cathode)</li>
                </ul>
                <h4>📐 Current Limiting Resistor:</h4>
                <p><strong>Formula:</strong> R = (Vsupply - Vled) / Iled</p>
                <p><strong>Example:</strong> 5V supply, Red LED (2V), 20mA current</p>
                <p>R = (5 - 2) / 0.020 = 3 / 0.020 = <strong>150Ω</strong></p>
                <h4>⚠️ Why Need Resistor?</h4>
                <p>Without a resistor, LED draws too much current and burns out!</p>
                <h4>🎨 LED Colors & Voltages:</h4>
                <ul>
                    <li>🔴 Red: 1.8V - 2.2V</li>
                    <li>🟡 Yellow: 2.0V - 2.2V</li>
                    <li>🟢 Green: 2.0V - 3.0V</li>
                    <li>🔵 Blue: 3.0V - 3.4V</li>
                    <li>⚪ White: 3.0V - 3.6V</li>
                </ul>
            `,
            relatedTopics: ['ohms-law', 'diodes', 'current-limiting']
        }
    },

    // Adaptive difficulty system
    difficultyAdjuster: {
        playerStats: {
            successRate: 1.0,
            averageTime: 0,
            hintsUsed: 0,
            assistantUsage: 0,
            consecutiveSuccesses: 0
        },

        updateStats(levelCompleted, timeSpent, hintsUsed, usedAssistant) {
            const stats = this.playerStats;
            
            if (levelCompleted) {
                stats.consecutiveSuccesses++;
                stats.successRate = (stats.successRate * 0.9) + (1.0 * 0.1);
            } else {
                stats.consecutiveSuccesses = 0;
                stats.successRate = (stats.successRate * 0.9) + (0.0 * 0.1);
            }

            stats.averageTime = (stats.averageTime * 0.8) + (timeSpent * 0.2);
            stats.hintsUsed += hintsUsed;
            if (usedAssistant) stats.assistantUsage++;

            localStorage.setItem('player-stats', JSON.stringify(stats));
        },

        getSuggestion() {
            const stats = this.playerStats;
            const suggestions = [];

            if (stats.successRate < 0.5) {
                suggestions.push({
                    type: 'help',
                    message: '💡 Struggling? Try using the ECE Assistant for detailed guidance!',
                    action: () => document.getElementById('eceAssistant').click()
                });
            }

            if (stats.consecutiveSuccesses >= 3) {
                suggestions.push({
                    type: 'encouragement',
                    message: '🔥 You\'re on fire! ' + stats.consecutiveSuccesses + ' levels in a row!',
                    action: null
                });
            }

            if (stats.hintsUsed === 0 && stats.assistantUsage === 0) {
                suggestions.push({
                    type: 'tip',
                    message: '🎓 Did you know? The ECE Assistant can explain circuit theory!',
                    action: null
                });
            }

            return suggestions;
        }
    },

    // Show knowledge article
    showKnowledge(topic) {
        const knowledge = this.knowledgeBase[topic];
        if (!knowledge) return;

        const modal = document.createElement('div');
        modal.className = 'knowledge-modal';
        modal.innerHTML = `
            <div class="knowledge-content">
                <div class="knowledge-header">
                    <h2>📚 ${knowledge.title}</h2>
                    <button class="close-knowledge">✕</button>
                </div>
                <div class="knowledge-body">
                    <div class="knowledge-formula">
                        <strong>Formula:</strong> <code>${knowledge.formula}</code>
                    </div>
                    ${knowledge.explanation}
                    <div class="related-topics">
                        <h4>🔗 Related Topics:</h4>
                        <div class="topic-buttons">
                            ${knowledge.relatedTopics.map(t => 
                                `<button class="topic-btn" data-topic="${t}">${t.replace(/-/g, ' ')}</button>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.close-knowledge').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        modal.querySelectorAll('.topic-btn').forEach(btn => {
            btn.onclick = () => {
                modal.remove();
                this.showKnowledge(btn.dataset.topic);
            };
        });

        // Track usage
        if (window.trackEvent) {
            trackEvent('Learning', 'Knowledge Article', topic, 1);
        }
    },

    // Add knowledge button to UI
    init() {
        // Add knowledge base button
        const header = document.querySelector('.header-right');
        if (header && !document.getElementById('knowledgeBtn')) {
            const btn = document.createElement('button');
            btn.id = 'knowledgeBtn';
            btn.className = 'knowledge-btn';
            btn.innerHTML = '<span>📚</span>';
            btn.title = 'Knowledge Base';
            btn.onclick = () => this.showKnowledgeMenu();
            header.appendChild(btn);
        }

        // Load player stats
        const savedStats = localStorage.getItem('player-stats');
        if (savedStats) {
            this.difficultyAdjuster.playerStats = JSON.parse(savedStats);
        }
    },

    showKnowledgeMenu() {
        const modal = document.createElement('div');
        modal.className = 'knowledge-modal';
        modal.innerHTML = `
            <div class="knowledge-content">
                <div class="knowledge-header">
                    <h2>📚 Electronics Knowledge Base</h2>
                    <button class="close-knowledge">✕</button>
                </div>
                <div class="knowledge-body">
                    <p>Click any topic to learn more:</p>
                    <div class="knowledge-grid">
                        ${Object.keys(this.knowledgeBase).map(key => {
                            const kb = this.knowledgeBase[key];
                            return `
                                <button class="knowledge-card" data-topic="${key}">
                                    <h3>${kb.title}</h3>
                                    <code>${kb.formula}</code>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-knowledge').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        modal.querySelectorAll('.knowledge-card').forEach(card => {
            card.onclick = () => {
                modal.remove();
                this.showKnowledge(card.dataset.topic);
            };
        });
    }
};

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdvancedLearning.init());
} else {
    AdvancedLearning.init();
}

window.AdvancedLearning = AdvancedLearning;
