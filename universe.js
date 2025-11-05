// 🌟 ECE SKILL UNIVERSE - Main JavaScript
// Revolutionary ECE Learning Platform

console.log('🌟 ECE Skill Universe Loading...');

// ============================================
// Particle Background Animation
// ============================================
const particleCanvas = document.getElementById('particleCanvas');
const particleCtx = particleCanvas.getContext('2d');

function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
resizeParticleCanvas();
window.addEventListener('resize', resizeParticleCanvas);

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
    });
}

function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > particleCanvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > particleCanvas.height) particle.vy *= -1;
        
        particleCtx.beginPath();
        particleCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        particleCtx.fillStyle = 'rgba(99, 102, 241, 0.5)';
        particleCtx.fill();
    });
    
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                particleCtx.beginPath();
                particleCtx.moveTo(particles[i].x, particles[i].y);
                particleCtx.lineTo(particles[j].x, particles[j].y);
                particleCtx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 150)})`;
                particleCtx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================================
// Skill Tree Preview Animation
// ============================================
const skillTreePreview = document.getElementById('skillTreePreview');
if (skillTreePreview) {
    const previewCtx = skillTreePreview.getContext('2d');
    
    function drawSkillTreePreview() {
        previewCtx.clearRect(0, 0, 600, 600);
        
        // Draw nodes and connections (simplified)
        const nodes = [
            { x: 300, y: 50, completed: true, label: 'Basics' },
            { x: 200, y: 150, completed: true, label: 'Ohm\'s Law' },
            { x: 400, y: 150, completed: false, label: 'Kirchhoff' },
            { x: 300, y: 250, completed: false, label: 'Op-Amps' },
            { x: 150, y: 350, completed: false, label: 'Filters' },
            { x: 450, y: 350, completed: false, label: 'Oscillators' },
        ];
        
        // Draw connections
        previewCtx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        previewCtx.lineWidth = 3;
        previewCtx.beginPath();
        previewCtx.moveTo(300, 50);
        previewCtx.lineTo(200, 150);
        previewCtx.moveTo(300, 50);
        previewCtx.lineTo(400, 150);
        previewCtx.moveTo(200, 150);
        previewCtx.lineTo(300, 250);
        previewCtx.moveTo(400, 150);
        previewCtx.lineTo(300, 250);
        previewCtx.stroke();
        
        // Draw nodes
        nodes.forEach(node => {
            previewCtx.beginPath();
            previewCtx.arc(node.x, node.y, 30, 0, Math.PI * 2);
            previewCtx.fillStyle = node.completed ? '#10b981' : '#334155';
            previewCtx.fill();
            previewCtx.strokeStyle = node.completed ? '#10b981' : '#6366f1';
            previewCtx.lineWidth = 3;
            previewCtx.stroke();
            
            // Draw label
            previewCtx.fillStyle = '#f1f5f9';
            previewCtx.font = '12px Inter';
            previewCtx.textAlign = 'center';
            previewCtx.fillText(node.label, node.x, node.y + 50);
        });
    }
    
    drawSkillTreePreview();
}

// ============================================
// Navigation
// ============================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const target = link.getAttribute('href');
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    });
});

// ============================================
// Hero CTA Buttons
// ============================================
document.getElementById('startJourneyBtn')?.addEventListener('click', () => {
    document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('watchDemoBtn')?.addEventListener('click', () => {
    alert('🎬 Demo video coming soon!');
});

// ============================================
// Feature Cards
// ============================================
document.querySelectorAll('.feature-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('✨ Feature coming soon!');
    });
});

// ============================================
// Lab Section - Drag & Drop
// ============================================
const labCanvas = document.getElementById('labCanvas');
if (labCanvas) {
    const labCtx = labCanvas.getContext('2d');
    const placedComponents = [];
    
    // Make components draggable
    document.querySelectorAll('.component').forEach(comp => {
        comp.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('componentType', comp.dataset.type);
        });
    });
    
    labCanvas.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    labCanvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const componentType = e.dataTransfer.getData('componentType');
        const rect = labCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        placedComponents.push({ type: componentType, x, y });
        drawLabCanvas();
    });
    
    function drawLabCanvas() {
        labCtx.clearRect(0, 0, labCanvas.width, labCanvas.height);
        
        // Draw grid
        labCtx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        labCtx.lineWidth = 1;
        for (let x = 0; x < labCanvas.width; x += 20) {
            labCtx.beginPath();
            labCtx.moveTo(x, 0);
            labCtx.lineTo(x, labCanvas.height);
            labCtx.stroke();
        }
        for (let y = 0; y < labCanvas.height; y += 20) {
            labCtx.beginPath();
            labCtx.moveTo(0, y);
            labCtx.lineTo(labCanvas.width, y);
            labCtx.stroke();
        }
        
        // Draw placed components
        placedComponents.forEach(comp => {
            labCtx.fillStyle = '#6366f1';
            labCtx.fillRect(comp.x - 25, comp.y - 15, 50, 30);
            labCtx.fillStyle = '#f1f5f9';
            labCtx.font = '12px Inter';
            labCtx.textAlign = 'center';
            labCtx.fillText(comp.type, comp.x, comp.y + 5);
        });
    }
    
    drawLabCanvas();
    
    // Simulate button
    document.getElementById('simulateCircuit')?.addEventListener('click', () => {
        if (placedComponents.length === 0) {
            alert('⚠️ Add some components first!');
            return;
        }
        
        document.getElementById('simulateCircuit').classList.add('hidden');
        document.getElementById('stopSimulation').classList.remove('hidden');
        
        // Simulate voltage reading
        let voltage = 0;
        const interval = setInterval(() => {
            voltage = (Math.random() * 10).toFixed(2);
            document.getElementById('meterValue').textContent = `${voltage} V`;
            document.getElementById('resVoltage').textContent = `${voltage} V`;
            document.getElementById('resCurrent').textContent = `${(voltage / 470).toFixed(2)} mA`;
            document.getElementById('resPower').textContent = `${(voltage * voltage / 470).toFixed(2)} mW`;
        }, 100);
        
        document.getElementById('stopSimulation').addEventListener('click', () => {
            clearInterval(interval);
            document.getElementById('simulateCircuit').classList.remove('hidden');
            document.getElementById('stopSimulation').classList.add('hidden');
        }, { once: true });
    });
    
    // Clear lab
    document.getElementById('clearLab')?.addEventListener('click', () => {
        placedComponents.length = 0;
        drawLabCanvas();
    });
}

// ============================================
// AI Tutor Chat
// ============================================
const aiFab = document.getElementById('aiFab');
const aiChat = document.getElementById('aiChat');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

aiFab?.addEventListener('click', () => {
    aiChat.classList.remove('hidden');
    aiFab.style.display = 'none';
});

closeChatBtn?.addEventListener('click', () => {
    aiChat.classList.add('hidden');
    aiFab.style.display = 'block';
});

function addMessage(text, isBot = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isBot ? 'bot' : 'user'}`;
    messageDiv.innerHTML = `
        <div class="message-avatar">${isBot ? '🤖' : '👤'}</div>
        <div class="message-bubble">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn?.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, false);
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "Great question! Ohm's Law states that V = I × R. This means voltage equals current times resistance.",
                "For your circuit, try checking the connections between the power source and LED.",
                "Transistors are like electronic switches that can amplify signals. Think of them as valves for electricity!",
                "To calculate the resistor value for an LED, use: R = (Vsource - VLED) / ILED",
            ];
            addMessage(responses[Math.floor(Math.random() * responses.length)], true);
        }, 1000);
    }
});

chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

document.querySelectorAll('.quick-q').forEach(btn => {
    btn.addEventListener('click', () => {
        chatInput.value = btn.textContent;
        sendBtn.click();
    });
});

// ============================================
// Project Filters
// ============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.difficulty === filter || filter === 'prize') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ============================================
// User Stats (Demo)
// ============================================
let userXP = 0;
let userLevel = 1;

function updateStats() {
    document.getElementById('userXP').textContent = userXP;
    document.getElementById('userLevel').textContent = userLevel;
}

// Simulate XP gain
setInterval(() => {
    userXP += Math.floor(Math.random() * 10);
    if (userXP >= userLevel * 1000) {
        userLevel++;
    }
    updateStats();
}, 5000);

// ============================================
// Oscilloscope Animation
// ============================================
const oscCanvas = document.getElementById('oscCanvas');
if (oscCanvas) {
    const oscCtx = oscCanvas.getContext('2d');
    let oscPhase = 0;
    
    function drawOscilloscope() {
        oscCtx.fillStyle = '#0a0e27';
        oscCtx.fillRect(0, 0, oscCanvas.width, oscCanvas.height);
        
        // Draw grid
        oscCtx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
        oscCtx.lineWidth = 1;
        for (let x = 0; x < oscCanvas.width; x += 20) {
            oscCtx.beginPath();
            oscCtx.moveTo(x, 0);
            oscCtx.lineTo(x, oscCanvas.height);
            oscCtx.stroke();
        }
        for (let y = 0; y < oscCanvas.height; y += 20) {
            oscCtx.beginPath();
            oscCtx.moveTo(0, y);
            oscCtx.lineTo(oscCanvas.width, y);
            oscCtx.stroke();
        }
        
        // Draw waveform
        oscCtx.beginPath();
        oscCtx.strokeStyle = '#10b981';
        oscCtx.lineWidth = 2;
        for (let x = 0; x < oscCanvas.width; x++) {
            const y = oscCanvas.height / 2 + Math.sin((x + oscPhase) * 0.05) * 40;
            if (x === 0) oscCtx.moveTo(x, y);
            else oscCtx.lineTo(x, y);
        }
        oscCtx.stroke();
        
        oscPhase += 2;
        requestAnimationFrame(drawOscilloscope);
    }
    
    drawOscilloscope();
}

console.log('✅ ECE Skill Universe Ready!');
console.log('🚀 Features: Skill Tree, Virtual Lab, AI Tutor, Projects, Mentors, Compete');
console.log('💡 This is a comprehensive ECE learning platform!');
