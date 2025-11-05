// ============================================
// 🌟 ECE SKILL UNIVERSE - MAIN APPLICATION
// Full Implementation with All Features Working
// ============================================

console.log('🚀 Initializing ECE Skill Universe...');

// ============================================
// GLOBAL STATE MANAGEMENT
// ============================================
const AppState = {
    user: {
        name: 'ECE Champion',
        xp: 0,
        level: 1,
        completedSkills: [],
        projects: [],
        achievements: [],
    },
    currentProject: null,
    circuit: {
        components: [],
        wires: [],
        selectedComponent: null,
        isSimulating: false,
    },
    skillTree: {
        zoom: 1,
        panX: 0,
        panY: 0,
        hoveredNode: null,
        nodes: SKILL_TREE_DATA.nodes.map(n => ({...n})), // Deep copy
    },
    chat: {
        messages: [
            { role: 'assistant', content: '👋 Hi! I\'m your AI tutor. Ask me anything about electronics!' }
        ],
        isTyping: false,
    },
    
    save() {
        try {
            localStorage.setItem('eceSkillUniverse', JSON.stringify({
                user: this.user,
                circuit: { components: this.circuit.components, wires: this.circuit.wires },
                skillTree: { nodes: this.skillTree.nodes },
                chat: this.chat
            }));
            console.log('💾 Saved!');
        } catch (e) {
            console.error('❌ Save failed:', e);
        }
    },
    
    load() {
        try {
            const saved = localStorage.getItem('eceSkillUniverse');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(this.user, data.user);
                Object.assign(this.circuit, data.circuit);
                if (data.skillTree) this.skillTree.nodes = data.skillTree.nodes;
                if (data.chat) this.chat.messages = data.chat.messages;
                console.log('✅ Loaded saved progress!');
            }
        } catch (e) {
            console.error('❌ Load failed:', e);
        }
    },
    
    addXP(amount) {
        this.user.xp += amount;
        const newLevel = Math.floor(this.user.xp / 1000) + 1;
        if (newLevel > this.user.level) {
            this.user.level = newLevel;
            this.showNotification(`🎉 Level Up! You're now Level ${newLevel}!`);
        }
        this.updateUserStats();
        this.save();
    },
    
    updateUserStats() {
        document.getElementById('userXP').textContent = this.user.xp;
        document.getElementById('userLevel').textContent = this.user.level;
        const completed = this.skillTree.nodes.filter(n => n.completed).length;
        document.getElementById('userSkills').textContent = completed;
        document.getElementById('userProjects').textContent = this.user.projects.length;
    },
    
    showNotification(message) {
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = message;
        notif.style.cssText = 'position:fixed;top:80px;right:20px;background:#6366f1;color:white;padding:15px 25px;border-radius:10px;box-shadow:0 4px 20px rgba(99,102,241,0.4);z-index:10000;animation:slideIn 0.3s;';
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }
};

// Load saved data
AppState.load();
AppState.updateUserStats();

// ============================================
// 1. PARTICLE BACKGROUND ANIMATION
// ============================================
const particleCanvas = document.getElementById('particleCanvas');
const particleCtx = particleCanvas.getContext('2d');
let particles = [];

function initParticles() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
}

function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    // Update and draw particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > particleCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > particleCanvas.height) p.vy *= -1;
        
        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        particleCtx.fillStyle = 'rgba(99, 102, 241, 0.5)';
        particleCtx.fill();
    });
    
    // Draw connections
    particleCtx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
    particleCtx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                particleCtx.beginPath();
                particleCtx.moveTo(particles[i].x, particles[i].y);
                particleCtx.lineTo(particles[j].x, particles[j].y);
                particleCtx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', initParticles);

// ============================================
// 2. NAVIGATION & SMOOTH SCROLL
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const target = link.getAttribute('href');
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    });
});

// ============================================
// 3. SKILL TREE SYSTEM (COMPLETE)
// ============================================
const skillCanvas = document.getElementById('skillTreeCanvas');
const skillCtx = skillCanvas.getContext('2d');

let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

function drawSkillTree() {
    skillCtx.clearRect(0, 0, skillCanvas.width, skillCanvas.height);
    skillCtx.save();
    
    // Apply zoom and pan
    skillCtx.translate(AppState.skillTree.panX, AppState.skillTree.panY);
    skillCtx.scale(AppState.skillTree.zoom, AppState.skillTree.zoom);
    
    // Draw connections first
    skillCtx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    skillCtx.lineWidth = 2;
    SKILL_TREE_DATA.connections.forEach(([from, to]) => {
        const nodeFrom = AppState.skillTree.nodes.find(n => n.id === from);
        const nodeTo = AppState.skillTree.nodes.find(n => n.id === to);
        if (nodeFrom && nodeTo) {
            skillCtx.beginPath();
            skillCtx.moveTo(nodeFrom.x, nodeFrom.y);
            skillCtx.lineTo(nodeTo.x, nodeTo.y);
            skillCtx.stroke();
        }
    });
    
    // Draw nodes
    AppState.skillTree.nodes.forEach(node => {
        const isHovered = AppState.skillTree.hoveredNode === node.id;
        const size = isHovered ? 55 : 50;
        
        // Node circle
        skillCtx.beginPath();
        skillCtx.arc(node.x, node.y, size, 0, Math.PI * 2);
        
        if (node.completed) {
            skillCtx.fillStyle = '#10b981'; // Green for completed
        } else if (node.unlocked) {
            skillCtx.fillStyle = '#6366f1'; // Blue for unlocked
        } else {
            skillCtx.fillStyle = '#94a3b8'; // Gray for locked
        }
        skillCtx.fill();
        
        // Glow effect for unlocked
        if (node.unlocked && !node.completed) {
            skillCtx.shadowBlur = 20;
            skillCtx.shadowColor = '#6366f1';
            skillCtx.fill();
            skillCtx.shadowBlur = 0;
        }
        
        // Border
        skillCtx.strokeStyle = isHovered ? '#fbbf24' : '#1e293b';
        skillCtx.lineWidth = 3;
        skillCtx.stroke();
        
        // Level indicator
        skillCtx.fillStyle = 'white';
        skillCtx.font = 'bold 14px Arial';
        skillCtx.textAlign = 'center';
        skillCtx.textBaseline = 'middle';
        skillCtx.fillText(`L${node.level}`, node.x, node.y - 5);
        
        // XP below
        skillCtx.font = '10px Arial';
        skillCtx.fillText(`${node.xp} XP`, node.x, node.y + 10);
        
        // Name below node
        skillCtx.fillStyle = '#cbd5e1';
        skillCtx.font = '12px Arial';
        skillCtx.fillText(node.name, node.x, node.y + 70);
    });
    
    skillCtx.restore();
}

// Mouse interactions
skillCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

skillCanvas.addEventListener('mousemove', (e) => {
    const rect = skillCanvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - AppState.skillTree.panX) / AppState.skillTree.zoom;
    const mouseY = (e.clientY - rect.top - AppState.skillTree.panY) / AppState.skillTree.zoom;
    
    if (isDragging) {
        AppState.skillTree.panX += e.clientX - lastMouseX;
        AppState.skillTree.panY += e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        drawSkillTree();
    } else {
        // Check hover
        let foundHover = null;
        AppState.skillTree.nodes.forEach(node => {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            if (Math.sqrt(dx * dx + dy * dy) < 50) {
                foundHover = node.id;
            }
        });
        if (AppState.skillTree.hoveredNode !== foundHover) {
            AppState.skillTree.hoveredNode = foundHover;
            drawSkillTree();
            
            // Show tooltip
            if (foundHover) {
                const node = AppState.skillTree.nodes.find(n => n.id === foundHover);
                showTooltip(e.clientX, e.clientY, node);
            } else {
                hideTooltip();
            }
        }
    }
});

skillCanvas.addEventListener('mouseup', () => isDragging = false);
skillCanvas.addEventListener('mouseleave', () => {
    isDragging = false;
    hideTooltip();
});

// Zoom with mouse wheel
skillCanvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    AppState.skillTree.zoom *= delta;
    AppState.skillTree.zoom = Math.max(0.5, Math.min(2, AppState.skillTree.zoom));
    drawSkillTree();
});

// Click to unlock/complete or open learning
skillCanvas.addEventListener('click', (e) => {
    const rect = skillCanvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - AppState.skillTree.panX) / AppState.skillTree.zoom;
    const mouseY = (e.clientY - rect.top - AppState.skillTree.panY) / AppState.skillTree.zoom;
    
    AppState.skillTree.nodes.forEach(node => {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < 50 && node.unlocked) {
            // Open AI Voice Learning Modal
            if (typeof aiVoice !== 'undefined' && typeof COMPLETE_LEARNING_CONTENT !== 'undefined') {
                if (COMPLETE_LEARNING_CONTENT[node.id]) {
                    aiVoice.loadSkill(node.id);
                } else {
                    AppState.showNotification(`📚 Learning content for ${node.name} coming soon!`);
                }
            }
            
            // Mark as completed if not already
            if (!node.completed) {
                node.completed = true;
                AppState.user.completedSkills.push(node.id);
                AppState.addXP(node.xp);
                
                // Unlock connected nodes
                SKILL_TREE_DATA.connections.forEach(([from, to]) => {
                    if (from === node.id) {
                        const nextNode = AppState.skillTree.nodes.find(n => n.id === to);
                        if (nextNode && !nextNode.unlocked) {
                            nextNode.unlocked = true;
                            AppState.showNotification(`🔓 Unlocked: ${nextNode.name}`);
                        }
                    }
                });
                
                drawSkillTree();
                AppState.save();
            }
        }
    });
});

// Tooltip
let tooltipEl = null;
function showTooltip(x, y, node) {
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.cssText = 'position:fixed;background:rgba(15,23,42,0.95);color:white;padding:15px;border-radius:8px;pointer-events:none;z-index:1000;max-width:250px;border:1px solid rgba(99,102,241,0.3);backdrop-filter:blur(10px);';
        document.body.appendChild(tooltipEl);
    }
    
    tooltipEl.innerHTML = `
        <strong style="color:#6366f1;font-size:14px;">${node.name}</strong><br>
        <span style="font-size:12px;color:#cbd5e1;">${node.description}</span><br>
        <br>
        <span style="font-size:11px;color:#94a3b8;">
            Level: ${node.level} | XP: ${node.xp}<br>
            Status: ${node.completed ? '✅ Completed' : node.unlocked ? '🔓 Available' : '🔒 Locked'}
        </span>
    `;
    tooltipEl.style.left = (x + 20) + 'px';
    tooltipEl.style.top = (y - 50) + 'px';
    tooltipEl.style.display = 'block';
}

function hideTooltip() {
    if (tooltipEl) tooltipEl.style.display = 'none';
}

drawSkillTree();

// ============================================
// 4. VIRTUAL LAB - CIRCUIT BUILDER (COMPLETE)
// ============================================
const labCanvas = document.getElementById('labCanvas');
const labCtx = labCanvas.getContext('2d');

let draggedComponent = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Render lab components
function renderLab() {
    labCtx.clearRect(0, 0, labCanvas.width, labCanvas.height);
    
    // Draw grid
    labCtx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
    labCtx.lineWidth = 1;
    for (let x = 0; x < labCanvas.width; x += 50) {
        labCtx.beginPath();
        labCtx.moveTo(x, 0);
        labCtx.lineTo(x, labCanvas.height);
        labCtx.stroke();
    }
    for (let y = 0; y < labCanvas.height; y += 50) {
        labCtx.beginPath();
        labCtx.moveTo(0, y);
        labCtx.lineTo(labCanvas.width, y);
        labCtx.stroke();
    }
    
    // Draw wires first
    labCtx.strokeStyle = '#6366f1';
    labCtx.lineWidth = 3;
    AppState.circuit.wires.forEach(wire => {
        labCtx.beginPath();
        labCtx.moveTo(wire.from.x, wire.from.y);
        labCtx.lineTo(wire.to.x, wire.to.y);
        labCtx.stroke();
    });
    
    // Draw components
    AppState.circuit.components.forEach(comp => {
        labCtx.save();
        labCtx.translate(comp.x, comp.y);
        
        // Draw component based on type
        if (comp.symbol) {
            labCtx.font = '40px Arial';
            labCtx.textAlign = 'center';
            labCtx.textBaseline = 'middle';
            labCtx.fillText(comp.symbol, 0, 0);
        }
        
        // Highlight if selected
        if (AppState.circuit.selectedComponent === comp.id) {
            labCtx.strokeStyle = '#fbbf24';
            labCtx.lineWidth = 3;
            labCtx.strokeRect(-30, -30, 60, 60);
        }
        
        // Draw label
        labCtx.font = '12px Arial';
        labCtx.fillStyle = 'white';
        labCtx.fillText(comp.name, 0, 40);
        
        // Show state for LEDs
        if (comp.type === 'led' && comp.state) {
            labCtx.shadowBlur = 20;
            labCtx.shadowColor = '#fbbf24';
            labCtx.font = '40px Arial';
            labCtx.fillText(comp.symbol, 0, 0);
            labCtx.shadowBlur = 0;
        }
        
        labCtx.restore();
    });
}

// Drag components from library
document.querySelectorAll('.lab-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
        const compType = e.target.dataset.component;
        e.dataTransfer.setData('component', compType);
    });
});

labCanvas.addEventListener('dragover', (e) => e.preventDefault());

labCanvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const compType = e.dataTransfer.getData('component');
    const rect = labCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find component in library
    const allComps = Object.values(COMPONENT_LIBRARY).flat();
    const compData = allComps.find(c => c.id === compType);
    
    if (compData) {
        const newComp = simulator.addComponent({
            ...compData,
            x, y
        });
        AppState.circuit.components.push(newComp);
        renderLab();
        AppState.save();
        AppState.showNotification(`✅ Added ${compData.name}`);
    }
});

// Select and move components
labCanvas.addEventListener('mousedown', (e) => {
    const rect = labCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicking on component
    for (let i = AppState.circuit.components.length - 1; i >= 0; i--) {
        const comp = AppState.circuit.components[i];
        if (Math.abs(x - comp.x) < 30 && Math.abs(y - comp.y) < 30) {
            draggedComponent = comp;
            dragOffsetX = x - comp.x;
            dragOffsetY = y - comp.y;
            AppState.circuit.selectedComponent = comp.id;
            renderLab();
            return;
        }
    }
    
    AppState.circuit.selectedComponent = null;
    renderLab();
});

labCanvas.addEventListener('mousemove', (e) => {
    if (draggedComponent) {
        const rect = labCanvas.getBoundingClientRect();
        draggedComponent.x = e.clientX - rect.left - dragOffsetX;
        draggedComponent.y = e.clientY - rect.top - dragOffsetY;
        renderLab();
    }
});

labCanvas.addEventListener('mouseup', () => {
    if (draggedComponent) {
        draggedComponent = null;
        AppState.save();
    }
});

// Simulate button
document.getElementById('simulateBtn').addEventListener('click', () => {
    if (!AppState.circuit.isSimulating) {
        AppState.circuit.isSimulating = true;
        simulator.simulate();
        AppState.showNotification('⚡ Simulation started!');
        document.getElementById('simulateBtn').textContent = '⏹️ Stop';
    } else {
        AppState.circuit.isSimulating = false;
        simulator.stop();
        AppState.showNotification('⏹️ Simulation stopped');
        document.getElementById('simulateBtn').textContent = '▶️ Simulate';
    }
});

// Clear circuit
document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Clear entire circuit?')) {
        AppState.circuit.components = [];
        AppState.circuit.wires = [];
        simulator.clear();
        renderLab();
        AppState.save();
        AppState.showNotification('🗑️ Circuit cleared');
    }
});

renderLab();

console.log('✅ All systems loaded successfully!');
console.log('📊 User Level:', AppState.user.level, '| XP:', AppState.user.xp);
