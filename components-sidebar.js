// 🔧 Circuit Components Sidebar - Essential Building Tools

const ComponentsSidebar = {
    components: {
        power: [
            { icon: '🔋', name: 'Battery', value: '9V', id: 'battery' },
            { icon: '⚡', name: 'Power Supply', value: 'Variable', id: 'power-supply' }
        ],
        basic: [
            { icon: '💡', name: 'LED', value: 'Red/Green/Blue', id: 'led' },
            { icon: '⚡', name: 'Resistor', value: '220Ω - 10kΩ', id: 'resistor' },
            { icon: '🔌', name: 'Wire', value: 'Connector', id: 'wire' },
            { icon: '⭕', name: 'Switch', value: 'ON/OFF', id: 'switch' }
        ],
        advanced: [
            { icon: '🎛️', name: 'Capacitor', value: '100μF', id: 'capacitor' },
            { icon: '🔄', name: 'Inductor', value: '10mH', id: 'inductor' },
            { icon: '📟', name: 'Transistor', value: 'NPN', id: 'transistor' },
            { icon: '🎚️', name: 'Diode', value: '1N4148', id: 'diode' }
        ],
        logic: [
            { icon: '🔲', name: 'AND Gate', value: '2-input', id: 'and-gate' },
            { icon: '🔳', name: 'OR Gate', value: '2-input', id: 'or-gate' },
            { icon: '⬜', name: 'NOT Gate', value: 'Inverter', id: 'not-gate' },
            { icon: '🔘', name: 'XOR Gate', value: '2-input', id: 'xor-gate' }
        ]
    },
    
    tools: [
        { icon: '📊', name: 'Multimeter', action: 'openMultimeter' },
        { icon: '〰️', name: 'Oscilloscope', action: 'openOscilloscope' },
        { icon: '📈', name: 'Logic Analyzer', action: 'openLogicAnalyzer' },
        { icon: '🗑️', name: 'Clear All', action: 'clearCircuit' }
    ],
    
    init() {
        console.log('🔧 Initializing Components Sidebar...');
        this.createSidebar();
        this.attachEventListeners();
    },
    
    createSidebar() {
        const sidebar = document.createElement('div');
        sidebar.className = 'circuit-components-sidebar';
        sidebar.id = 'componentsSidebar';
        
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <h3>🔧 Circuit Components</h3>
                <p>Drag and drop to build your circuit</p>
            </div>
            
            <!-- Power Sources -->
            <div class="component-group">
                <div class="group-title">⚡ Power Sources</div>
                <div class="components-list">
                    ${this.renderComponents('power')}
                </div>
            </div>
            
            <!-- Basic Components -->
            <div class="component-group">
                <div class="group-title">🔌 Basic Components</div>
                <div class="components-list">
                    ${this.renderComponents('basic')}
                </div>
            </div>
            
            <!-- Advanced Components -->
            <div class="component-group">
                <div class="group-title">🎛️ Advanced Components</div>
                <div class="components-list">
                    ${this.renderComponents('advanced')}
                </div>
            </div>
            
            <!-- Logic Gates -->
            <div class="component-group">
                <div class="group-title">🔲 Logic Gates</div>
                <div class="components-list">
                    ${this.renderComponents('logic')}
                </div>
            </div>
            
            <!-- Tools Section -->
            <div class="tools-section">
                <div class="group-title">🛠️ Tools</div>
                <div class="tools-grid">
                    ${this.renderTools()}
                </div>
            </div>
        `;
        
        document.body.appendChild(sidebar);
        
        // Add class to main content
        const mainContent = document.querySelector('#main') || document.querySelector('.main-content');
        if (mainContent) {
            mainContent.classList.add('with-sidebar');
        }
    },
    
    renderComponents(category) {
        return this.components[category].map(comp => `
            <div class="component-card" 
                 draggable="true" 
                 data-component="${comp.id}"
                 data-type="${category}">
                <span class="component-icon">${comp.icon}</span>
                <p class="component-name">${comp.name}</p>
                <p class="component-value">${comp.value}</p>
            </div>
        `).join('');
    },
    
    renderTools() {
        return this.tools.map(tool => `
            <button class="tool-button" onclick="ComponentsSidebar.${tool.action}()">
                <span class="icon">${tool.icon}</span>
                <span>${tool.name}</span>
            </button>
        `).join('');
    },
    
    attachEventListeners() {
        // Drag and drop for components
        document.querySelectorAll('.component-card').forEach(card => {
            card.addEventListener('dragstart', (e) => {
                const componentId = e.target.dataset.component;
                const componentType = e.target.dataset.type;
                e.dataTransfer.setData('componentId', componentId);
                e.dataTransfer.setData('componentType', componentType);
                e.target.style.opacity = '0.5';
            });
            
            card.addEventListener('dragend', (e) => {
                e.target.style.opacity = '1';
            });
            
            // Mobile touch support
            card.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e);
            });
        });
    },
    
    handleTouchStart(e) {
        const card = e.target.closest('.component-card');
        if (!card) return;
        
        // Add visual feedback
        card.style.transform = 'scale(1.1)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    },
    
    // Tool Actions
    openMultimeter() {
        console.log('📊 Opening Multimeter...');
        // Trigger existing multimeter if available
        if (typeof toggleMultimeter === 'function') {
            toggleMultimeter();
        }
    },
    
    openOscilloscope() {
        console.log('〰️ Opening Oscilloscope...');
        // Trigger existing oscilloscope if available
        if (typeof toggleOscilloscope === 'function') {
            toggleOscilloscope();
        }
    },
    
    openLogicAnalyzer() {
        console.log('📈 Opening Logic Analyzer...');
        // Trigger existing logic analyzer if available
        if (typeof toggleLogicAnalyzer === 'function') {
            toggleLogicAnalyzer();
        }
    },
    
    clearCircuit() {
        console.log('🗑️ Clearing circuit...');
        if (confirm('Clear all components from the circuit?')) {
            // Trigger existing clear function if available
            if (typeof clearAll === 'function') {
                clearAll();
            }
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ComponentsSidebar.init());
} else {
    ComponentsSidebar.init();
}
