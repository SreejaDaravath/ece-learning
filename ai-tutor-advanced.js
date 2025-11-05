// ============================================
// 🤖 ADVANCED AI TUTOR SYSTEM
// Context-aware responses, step-by-step guides
// ============================================

console.log('🤖 Loading Advanced AI Tutor...');

// ============================================
// AI TUTOR ENGINE
// ============================================
class AITutor {
    constructor() {
        this.context = [];
        this.currentTopic = null;
        this.step = 0;
    }
    
    async getResponse(userMessage) {
        const msg = userMessage.toLowerCase();
        
        // Detect topic
        if (msg.includes('ohm') || msg.includes('resistance')) {
            return this.explainOhmsLaw(msg);
        } else if (msg.includes('led') || msg.includes('light')) {
            return this.explainLED(msg);
        } else if (msg.includes('transistor') || msg.includes('bjt') || msg.includes('fet')) {
            return this.explainTransistor(msg);
        } else if (msg.includes('logic') || msg.includes('gate') || msg.includes('and') || msg.includes('or')) {
            return this.explainLogic(msg);
        } else if (msg.includes('debug') || msg.includes('help') || msg.includes('not working')) {
            return this.debugCircuit(msg);
        } else if (msg.includes('project') || msg.includes('build')) {
            return this.suggestProject(msg);
        } else if (msg.includes('learn') || msg.includes('start')) {
            return this.suggestLearningPath();
        } else {
            return this.generalHelp();
        }
    }
    
    explainOhmsLaw(msg) {
        if (msg.includes('calculate') || msg.includes('how')) {
            return {
                text: `**📐 Ohm's Law Calculator**

**Formula:** V = I × R

**What do you know?**

1️⃣ **Know Voltage & Resistance? Calculate Current:**
   I = V / R
   Example: 9V / 470Ω = 19.1mA

2️⃣ **Know Voltage & Current? Calculate Resistance:**
   R = V / I
   Example: 9V / 0.02A = 450Ω

3️⃣ **Know Current & Resistance? Calculate Voltage:**
   V = I × R
   Example: 0.02A × 470Ω = 9.4V

**Try it yourself!**
Build a simple circuit with:
- 9V Battery
- 470Ω Resistor  
- LED (2V forward voltage)

Calculate expected current:
I = (9V - 2V) / 470Ω = 14.9mA ✅ Safe for LED!`,
                suggestions: ['Show example circuit', 'What is resistance?', 'Power calculation']
            };
        } else {
            return {
                text: AI_KNOWLEDGE_BASE.ohm.response,
                suggestions: AI_KNOWLEDGE_BASE.ohm.examples
            };
        }
    }
    
    explainLED(msg) {
        if (msg.includes('calculate') || msg.includes('resistor')) {
            return {
                text: `**💡 LED Circuit Calculator**

**Step-by-Step Guide:**

**1️⃣ Identify LED specs:**
   - Forward Voltage (VLED): Usually 2.0V for red, 3.3V for blue/white
   - Forward Current (ILED): Usually 20mA (0.02A)

**2️⃣ Know your power supply:**
   - Vsource = ? (e.g., 9V battery, 5V USB)

**3️⃣ Calculate resistor:**
   R = (Vsource - VLED) / ILED

**Example Calculations:**

**Red LED + 9V Battery:**
   R = (9V - 2V) / 0.02A = 350Ω
   ✅ Use 470Ω resistor (standard value)

**White LED + 5V USB:**
   R = (5V - 3.3V) / 0.02A = 85Ω
   ✅ Use 100Ω resistor

**4️⃣ Check power rating:**
   P = I² × R
   P = (0.02)² × 470 = 0.188W
   ✅ Use 1/4W (0.25W) resistor

**Common Problems:**
❌ LED too dim → Resistor too high
❌ LED too bright/hot → Resistor too low
❌ LED not glowing → Check polarity (long leg = +)`,
                suggestions: ['LED not glowing', 'Multiple LEDs', 'RGB LED wiring']
            };
        } else if (msg.includes('not') || msg.includes('dim') || msg.includes('bright')) {
            return {
                text: `**🔍 LED Troubleshooting**

**Problem: LED Not Glowing?**
1. ✅ Check polarity - Long leg (Anode) to +, Short leg (Cathode) to -
2. ✅ Is resistor connected? Never connect LED directly!
3. ✅ Battery good? Test with multimeter
4. ✅ LED burned out? Try another LED

**Problem: LED Too Dim?**
1. Resistor value too high
2. Battery voltage too low
3. Poor connections

**Problem: LED Too Bright / Getting Hot?**
⚠️ DANGER! Resistor too small or missing!
1. Turn off immediately
2. Calculate proper resistor: R = (Vsource - VLED) / 0.02
3. Use higher wattage resistor if needed

**Quick Test Circuit:**
Connect: 9V Battery → 470Ω Resistor → LED (+) → LED (-) → Battery (-)
Should glow nicely! 🎉`,
                suggestions: ['Calculate my resistor', 'Series vs parallel LEDs', 'LED colors']
            };
        } else {
            return {
                text: AI_KNOWLEDGE_BASE.led.response,
                suggestions: AI_KNOWLEDGE_BASE.led.examples
            };
        }
    }
    
    explainTransistor(msg) {
        if (msg.includes('switch') || msg.includes('how to use')) {
            return {
                text: `**🔧 Transistor as Switch (Complete Guide)**

**NPN Transistor Switching Circuit:**

**Components Needed:**
- NPN Transistor (2N2222, BC547)
- Base Resistor (1kΩ - 10kΩ)
- Load (LED + Resistor, or Motor, or Relay)
- Power Supply

**Circuit Connection:**

\`\`\`
          +Vcc
           |
        [Load]
           |
     C ----+
     |    NPN
     |     |
Input--[Rb]-B
          |
          E
          |
         GND
\`\`\`

**Design Steps:**

**1️⃣ Calculate Base Resistor:**
   - Assume β (gain) = 100
   - Load current IC = 100mA (example)
   - Base current needed: IB = IC / β = 1mA
   - Input voltage = 5V
   - RB = (Vin - VBE) / IB = (5V - 0.7V) / 0.001A = 4.3kΩ
   ✅ Use 4.7kΩ resistor

**2️⃣ Check Saturation:**
   For good switching, use 10× more base current
   IB = IC / 10 = 10mA
   RB = (5V - 0.7V) / 0.01A = 430Ω
   ✅ Use 470Ω for reliable switching

**Example Applications:**
1. 💡 LED control from microcontroller
2. 🔊 Buzzer control
3. ⚙️ Relay driver (for high voltage loads)
4. 🚗 Motor control (small DC motors)

**Try this circuit:**
- Input: 5V from Arduino
- Base: 1kΩ resistor
- Collector: LED + 470Ω → +9V
- Emitter: Ground`,
                suggestions: ['NPN vs PNP', 'Transistor amplifier', 'Darlington pair']
            };
        } else {
            return {
                text: AI_KNOWLEDGE_BASE.transistor.response,
                suggestions: AI_KNOWLEDGE_BASE.transistor.examples
            };
        }
    }
    
    explainLogic(msg) {
        if (msg.includes('truth table') || msg.includes('all gates')) {
            return {
                text: `**🎯 Complete Logic Gates Truth Tables**

**AND Gate (Output HIGH only if ALL inputs HIGH)**
| A | B | OUT |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  0  |
| 1 | 0 |  0  |
| 1 | 1 |  1  | ✅

**OR Gate (Output HIGH if ANY input HIGH)**
| A | B | OUT |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  1  | ✅
| 1 | 0 |  1  | ✅
| 1 | 1 |  1  | ✅

**NOT Gate (Output OPPOSITE of input)**
| A | OUT |
|---|-----|
| 0 |  1  | ✅
| 1 |  0  |

**XOR Gate (Output HIGH if inputs DIFFERENT)**
| A | B | OUT |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  1  | ✅
| 1 | 0 |  1  | ✅
| 1 | 1 |  0  |

**NAND Gate (NOT + AND)**
| A | B | OUT |
|---|---|-----|
| 0 | 0 |  1  | ✅
| 0 | 1 |  1  | ✅
| 1 | 0 |  1  | ✅
| 1 | 1 |  0  |

**NOR Gate (NOT + OR)**
| A | B | OUT |
|---|---|-----|
| 0 | 0 |  1  | ✅
| 0 | 1 |  0  |
| 1 | 0 |  0  |
| 1 | 1 |  0  |

**🔑 Key Facts:**
- NAND and NOR are "universal gates" - can build ANY logic!
- XOR is used in adders and comparators
- Logic gates are built using transistors`,
                suggestions: ['Build full adder', 'Boolean algebra', 'Logic circuit design']
            };
        } else {
            return {
                text: AI_KNOWLEDGE_BASE.logic.response,
                suggestions: AI_KNOWLEDGE_BASE.logic.examples
            };
        }
    }
    
    debugCircuit(msg) {
        // Check current circuit
        const hasComponents = AppState.circuit.components.length > 0;
        
        if (!hasComponents) {
            return {
                text: `**🔍 Circuit Debugging Assistant**

I see your circuit is empty. Let me help you get started!

**Step 1: Build a Simple Test Circuit**
Try this basic LED circuit:
1. Drag a Battery (9V) to workspace
2. Add a Resistor (470Ω)
3. Add an LED
4. Click components to connect them
5. Press "Simulate" button

**Common Beginner Mistakes:**
❌ Forgetting current-limiting resistor with LED
❌ Wrong LED polarity (long leg = positive)
❌ No complete circuit path
❌ Missing ground connection

**Need help with something specific?**
Ask me: "How to build LED circuit" or "Calculate resistor value"`,
                suggestions: ['Build LED circuit', 'How to connect components', 'Ohm\'s law calculator']
            };
        }
        
        // Analyze current circuit
        const analysis = this.analyzeUserCircuit();
        return {
            text: `**🔍 Your Circuit Analysis**

${analysis.report}

${analysis.suggestions.length > 0 ? '**Recommendations:**\n' + analysis.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n') : '✅ Circuit looks good!'}`,
            suggestions: ['Optimize circuit', 'Calculate values', 'Add more components']
        };
    }
    
    analyzeUserCircuit() {
        const report = [];
        const suggestions = [];
        
        report.push(`**Components:** ${AppState.circuit.components.length}`);
        
        const types = {};
        AppState.circuit.components.forEach(c => {
            types[c.type] = (types[c.type] || 0) + 1;
        });
        
        report.push(`**Circuit Contains:**`);
        Object.entries(types).forEach(([type, count]) => {
            report.push(`- ${count}× ${type}`);
        });
        
        // Check for power source
        const hasPower = AppState.circuit.components.some(c => 
            c.type === 'battery' || c.type === 'dcpower' || c.type === 'voltage_source'
        );
        if (!hasPower) {
            suggestions.push('❌ Add a power source (battery or DC power)');
        }
        
        // Check for LED without resistor
        const hasLED = AppState.circuit.components.some(c => c.type === 'led');
        const hasResistor = AppState.circuit.components.some(c => c.type === 'resistor');
        if (hasLED && !hasResistor) {
            suggestions.push('⚠️ WARNING: LED needs current-limiting resistor!');
        }
        
        return { report: report.join('\n'), suggestions };
    }
    
    suggestProject(msg) {
        const level = AppState.user.level;
        let projects = [];
        
        if (level < 3) {
            projects = PROJECT_TEMPLATES.filter(p => p.difficulty === 'beginner');
        } else if (level < 6) {
            projects = PROJECT_TEMPLATES.filter(p => p.difficulty === 'intermediate' || p.difficulty === 'beginner');
        } else {
            projects = PROJECT_TEMPLATES.slice(0, 3);
        }
        
        return {
            text: `**🎯 Recommended Projects for Level ${level}**

${projects.map((p, i) => `**${i + 1}. ${p.title}** (${p.difficulty})
   ${p.description}
   🎁 Reward: ${p.xp} XP
   ⏱️ Time: ${Math.floor(p.timeLimit / 60)} minutes`).join('\n\n')}

**Want to try one?** Go to Projects section!`,
            suggestions: ['Show all projects', 'Project tips', 'How to submit']
        };
    }
    
    suggestLearningPath() {
        const completed = AppState.skillTree.nodes.filter(n => n.completed).length;
        const unlocked = AppState.skillTree.nodes.filter(n => n.unlocked && !n.completed);
        
        return {
            text: `**📚 Your Learning Path**

**Progress:** ${completed}/${AppState.skillTree.nodes.length} skills completed! 🎉

**Available Skills (Unlock these next):**
${unlocked.slice(0, 5).map((n, i) => `${i + 1}. ${n.name} - ${n.description} (${n.xp} XP)`).join('\n')}

**Recommended Study Order:**
1. Start with **Electronics Basics** (fundamentals)
2. Master **Ohm's Law** and **Kirchhoff's Laws**
3. Learn about **Resistors, Capacitors, Inductors**
4. Move to **Transistors** and **Op-Amps**
5. Tackle **Logic Gates** and **Digital Circuits**
6. Finally: **4-bit ALU** and **8-bit CPU** (expert level!)

**Tip:** Complete projects while learning for maximum XP! 💪`,
            suggestions: ['View skill tree', 'Start beginner project', 'Study resources']
        };
    }
    
    generalHelp() {
        return {
            text: `**👋 How Can I Help You Today?**

I'm your AI Electronics Tutor! I can help with:

📐 **Circuit Calculations**
   - "Calculate resistor for LED"
   - "Ohm's law help"
   - "Voltage divider formula"

🔧 **Component Explanations**
   - "How do transistors work?"
   - "Explain capacitors"
   - "Logic gates tutorial"

🔍 **Debugging**
   - "LED not working"
   - "Debug my circuit"
   - "Why is this wrong?"

💡 **Project Guidance**
   - "Suggest projects"
   - "How to build LED circuit"
   - "Full adder design"

**Just ask me anything in plain English!** 😊`,
            suggestions: ['Ohm\'s law', 'LED circuit', 'Transistor switch', 'Logic gates']
        };
    }
}

// Initialize AI Tutor
const aiTutor = new AITutor();

// Connect to chat interface
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    
    async function sendMessage() {
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;
        
        // Add user message
        addChatMessage('user', userMsg);
        chatInput.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing';
        typingDiv.textContent = '🤔 Thinking...';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Get AI response
        setTimeout(async () => {
            typingDiv.remove();
            const response = await aiTutor.getResponse(userMsg);
            addChatMessage('assistant', response.text, response.suggestions);
            
            // Save to chat history
            AppState.chat.messages.push({ role: 'user', content: userMsg });
            AppState.chat.messages.push({ role: 'assistant', content: response.text });
            AppState.save();
        }, 800);
    }
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Quick question buttons
    document.querySelectorAll('.quick-question').forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.textContent;
            sendMessage();
        });
    });
});

function addChatMessage(role, content, suggestions = []) {
    const chatMessages = document.querySelector('.chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role === 'user' ? 'user' : 'ai'}`;
    
    // Convert markdown-like formatting to HTML
    let formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
    
    msgDiv.innerHTML = formattedContent;
    chatMessages.appendChild(msgDiv);
    
    // Add suggestion buttons
    if (suggestions.length > 0) {
        const suggestDiv = document.createElement('div');
        suggestDiv.className = 'suggestions';
        suggestDiv.style.cssText = 'margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;';
        
        suggestions.forEach(sug => {
            const btn = document.createElement('button');
            btn.textContent = sug;
            btn.className = 'suggestion-btn';
            btn.style.cssText = 'background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.5);color:#cbd5e1;padding:6px 12px;border-radius:6px;font-size:12px;cursor:pointer;transition:all 0.2s;';
            btn.addEventListener('mouseover', () => btn.style.background = 'rgba(99,102,241,0.4)');
            btn.addEventListener('mouseout', () => btn.style.background = 'rgba(99,102,241,0.2)');
            btn.addEventListener('click', () => {
                document.getElementById('chatInput').value = sug;
                document.getElementById('sendMessage').click();
            });
            suggestDiv.appendChild(btn);
        });
        
        chatMessages.appendChild(suggestDiv);
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

console.log('✅ Advanced AI Tutor loaded!');
