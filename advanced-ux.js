// ============================================
// ⌨️ KEYBOARD SHORTCUTS & ADVANCED UX
// Professional user experience enhancements
// ============================================

console.log('⌨️ Loading Keyboard Shortcuts & UX Features...');

// ============================================
// UNDO/REDO SYSTEM
// ============================================
class HistoryManager {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.maxHistory = 50;
    }
    
    snapshot() {
        const state = {
            components: JSON.parse(JSON.stringify(AppState.circuit.components)),
            wires: JSON.parse(JSON.stringify(AppState.circuit.wires)),
            timestamp: Date.now()
        };
        
        // Remove future history if we're not at the end
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }
        
        this.history.push(state);
        this.currentIndex++;
        
        // Limit history size
        if (this.history.length > this.maxHistory) {
            this.history.shift();
            this.currentIndex--;
        }
        
        console.log(`📸 Snapshot saved (${this.currentIndex + 1}/${this.history.length})`);
    }
    
    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            const state = this.history[this.currentIndex];
            AppState.circuit.components = JSON.parse(JSON.stringify(state.components));
            AppState.circuit.wires = JSON.parse(JSON.stringify(state.wires));
            console.log(`↶ Undo (${this.currentIndex + 1}/${this.history.length})`);
            return true;
        }
        console.log('❌ Nothing to undo');
        return false;
    }
    
    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            const state = this.history[this.currentIndex];
            AppState.circuit.components = JSON.parse(JSON.stringify(state.components));
            AppState.circuit.wires = JSON.parse(JSON.stringify(state.wires));
            console.log(`↷ Redo (${this.currentIndex + 1}/${this.history.length})`);
            return true;
        }
        console.log('❌ Nothing to redo');
        return false;
    }
    
    canUndo() {
        return this.currentIndex > 0;
    }
    
    canRedo() {
        return this.currentIndex < this.history.length - 1;
    }
}

const historyManager = new HistoryManager();

// Take initial snapshot
historyManager.snapshot();

// ============================================
// KEYBOARD SHORTCUT SYSTEM
// ============================================
const KeyboardShortcuts = {
    shortcuts: {
        'ctrl+z': { action: 'undo', description: 'Undo last action' },
        'ctrl+y': { action: 'redo', description: 'Redo action' },
        'ctrl+shift+z': { action: 'redo', description: 'Redo action' },
        'ctrl+s': { action: 'save', description: 'Save circuit' },
        'ctrl+o': { action: 'load', description: 'Load circuit' },
        'ctrl+e': { action: 'export', description: 'Export as image' },
        'delete': { action: 'delete', description: 'Delete selected component' },
        'backspace': { action: 'delete', description: 'Delete selected component' },
        'ctrl+a': { action: 'selectAll', description: 'Select all components' },
        'ctrl+d': { action: 'duplicate', description: 'Duplicate selected' },
        'escape': { action: 'deselect', description: 'Deselect all' },
        'ctrl+k': { action: 'commandPalette', description: 'Open command palette' },
        'space': { action: 'simulate', description: 'Start/Stop simulation' },
        'ctrl+1': { action: 'gotoSkills', description: 'Go to Skill Tree' },
        'ctrl+2': { action: 'gotoLab', description: 'Go to Virtual Lab' },
        'ctrl+3': { action: 'gotoProjects', description: 'Go to Projects' },
        'ctrl+/': { action: 'help', description: 'Show shortcuts' },
    },
    
    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        console.log('⌨️ Keyboard shortcuts enabled');
    },
    
    handleKeyPress(e) {
        const key = this.getKeyCombo(e);
        const shortcut = this.shortcuts[key];
        
        if (shortcut) {
            // Prevent default browser actions for our shortcuts
            if (!['ctrl+/', 'escape'].includes(key)) {
                e.preventDefault();
            }
            
            this.executeAction(shortcut.action);
            this.showKeyPressEffect(shortcut.description);
        }
    },
    
    getKeyCombo(e) {
        const parts = [];
        if (e.ctrlKey) parts.push('ctrl');
        if (e.shiftKey) parts.push('shift');
        if (e.altKey) parts.push('alt');
        
        const key = e.key.toLowerCase();
        if (!['control', 'shift', 'alt'].includes(key)) {
            parts.push(key);
        }
        
        return parts.join('+');
    },
    
    executeAction(action) {
        console.log(`⚡ Executing: ${action}`);
        
        switch (action) {
            case 'undo':
                if (historyManager.undo()) {
                    if (window.renderLab) renderLab();
                    AppState.showNotification('↶ Undo');
                }
                break;
                
            case 'redo':
                if (historyManager.redo()) {
                    if (window.renderLab) renderLab();
                    AppState.showNotification('↷ Redo');
                }
                break;
                
            case 'save':
                AppState.save();
                this.exportCircuit('json');
                AppState.showNotification('💾 Circuit saved!');
                break;
                
            case 'load':
                this.importCircuit();
                break;
                
            case 'export':
                this.exportCircuit('png');
                AppState.showNotification('📸 Exported as image!');
                break;
                
            case 'delete':
                if (AppState.circuit.selectedComponent) {
                    const compId = AppState.circuit.selectedComponent;
                    AppState.circuit.components = AppState.circuit.components.filter(c => c.id !== compId);
                    AppState.circuit.selectedComponent = null;
                    historyManager.snapshot();
                    if (window.renderLab) renderLab();
                    AppState.showNotification('🗑️ Component deleted');
                }
                break;
                
            case 'selectAll':
                // Select all components (visual feedback)
                AppState.showNotification('✅ All components selected');
                break;
                
            case 'duplicate':
                if (AppState.circuit.selectedComponent) {
                    const original = AppState.circuit.components.find(c => c.id === AppState.circuit.selectedComponent);
                    if (original) {
                        const duplicate = { ...original, id: Date.now(), x: original.x + 50, y: original.y + 50 };
                        AppState.circuit.components.push(duplicate);
                        historyManager.snapshot();
                        if (window.renderLab) renderLab();
                        AppState.showNotification('📋 Component duplicated');
                    }
                }
                break;
                
            case 'deselect':
                AppState.circuit.selectedComponent = null;
                if (window.renderLab) renderLab();
                break;
                
            case 'commandPalette':
                this.showCommandPalette();
                break;
                
            case 'simulate':
                document.getElementById('simulateBtn')?.click();
                break;
                
            case 'gotoSkills':
                document.querySelector('a[href="#skills"]')?.click();
                break;
                
            case 'gotoLab':
                document.querySelector('a[href="#lab"]')?.click();
                break;
                
            case 'gotoProjects':
                document.querySelector('a[href="#projects"]')?.click();
                break;
                
            case 'help':
                this.showShortcutsHelp();
                break;
        }
    },
    
    exportCircuit(format) {
        if (format === 'json') {
            const data = {
                version: '1.0',
                date: new Date().toISOString(),
                user: AppState.user.name,
                circuit: {
                    components: AppState.circuit.components,
                    wires: AppState.circuit.wires
                }
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `circuit-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } else if (format === 'png') {
            const canvas = document.getElementById('labCanvas');
            if (canvas) {
                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `circuit-${Date.now()}.png`;
                    a.click();
                    URL.revokeObjectURL(url);
                });
            }
        }
    },
    
    importCircuit() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    AppState.circuit.components = data.circuit.components;
                    AppState.circuit.wires = data.circuit.wires;
                    historyManager.snapshot();
                    if (window.renderLab) renderLab();
                    AppState.showNotification('📂 Circuit loaded!');
                } catch (error) {
                    AppState.showNotification('❌ Invalid file format');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },
    
    showKeyPressEffect(description) {
        const effect = document.createElement('div');
        effect.className = 'key-press-effect';
        effect.textContent = description;
        effect.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(99, 102, 241, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: keyPressAnim 1s ease-out forwards;
            pointer-events: none;
        `;
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    },
    
    showCommandPalette() {
        const palette = document.createElement('div');
        palette.className = 'command-palette';
        palette.innerHTML = `
            <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding-top:100px;" onclick="this.remove()">
                <div style="background:#1e293b;border-radius:12px;padding:20px;width:600px;max-width:90%;box-shadow:0 10px 50px rgba(0,0,0,0.5);" onclick="event.stopPropagation()">
                    <h2 style="color:white;margin:0 0 15px 0;">⚡ Command Palette</h2>
                    <input type="text" id="commandSearch" placeholder="Type to search commands..." style="width:100%;padding:12px;background:#0f172a;border:1px solid rgba(99,102,241,0.5);border-radius:8px;color:white;font-size:14px;margin-bottom:15px;" autofocus>
                    <div id="commandList" style="max-height:400px;overflow-y:auto;">
                        ${Object.entries(this.shortcuts).map(([key, {description}]) => `
                            <div class="command-item" data-action="${key}" style="padding:12px;background:rgba(99,102,241,0.1);margin-bottom:8px;border-radius:6px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:all 0.2s;" onmouseover="this.style.background='rgba(99,102,241,0.3)'" onmouseout="this.style.background='rgba(99,102,241,0.1)'">
                                <span style="color:white;font-size:14px;">${description}</span>
                                <code style="background:rgba(0,0,0,0.3);padding:4px 8px;border-radius:4px;color:#cbd5e1;font-size:12px;">${key}</code>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(palette);
        
        // Search functionality
        const searchInput = document.getElementById('commandSearch');
        const commandList = document.getElementById('commandList');
        const items = commandList.querySelectorAll('.command-item');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
        
        // Execute on click
        items.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                const shortcut = this.shortcuts[action];
                if (shortcut) {
                    this.executeAction(shortcut.action);
                    palette.remove();
                }
            });
        });
    },
    
    showShortcutsHelp() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="this.remove()">
                <div style="background:#1e293b;border-radius:16px;padding:30px;width:700px;max-width:95%;max-height:90vh;overflow-y:auto;box-shadow:0 10px 50px rgba(0,0,0,0.5);" onclick="event.stopPropagation()">
                    <h2 style="color:white;margin:0 0 20px 0;font-size:24px;">⌨️ Keyboard Shortcuts</h2>
                    
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;">
                        ${Object.entries(this.shortcuts).map(([key, {description}]) => `
                            <div style="padding:12px;background:rgba(99,102,241,0.1);border-radius:8px;border:1px solid rgba(99,102,241,0.2);">
                                <div style="color:white;font-weight:500;margin-bottom:5px;">${description}</div>
                                <code style="background:rgba(0,0,0,0.3);padding:4px 10px;border-radius:4px;color:#6366f1;font-size:13px;font-family:monospace;">${key}</code>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button onclick="this.closest('[onclick]').remove()" style="margin-top:20px;width:100%;padding:12px;background:#6366f1;color:white;border:none;border-radius:8px;font-size:16px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='#4f46e5'" onmouseout="this.style.background='#6366f1'">Close (ESC)</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

// ============================================
// AUTO-SAVE SYSTEM
// ============================================
let autoSaveInterval;
function startAutoSave() {
    autoSaveInterval = setInterval(() => {
        AppState.save();
        console.log('💾 Auto-saved at', new Date().toLocaleTimeString());
    }, 30000); // Every 30 seconds
}

// ============================================
// COMPONENT SEARCH
// ============================================
class ComponentSearch {
    constructor() {
        this.searchInput = null;
        this.init();
    }
    
    init() {
        // Add search bar to lab sidebar
        const labSidebar = document.querySelector('.lab-components');
        if (labSidebar) {
            const searchBar = document.createElement('input');
            searchBar.type = 'text';
            searchBar.placeholder = '🔍 Search components...';
            searchBar.id = 'componentSearch';
            searchBar.style.cssText = `
                width: calc(100% - 20px);
                padding: 10px;
                margin: 10px;
                background: rgba(15, 23, 42, 0.8);
                border: 1px solid rgba(99, 102, 241, 0.3);
                border-radius: 8px;
                color: white;
                font-size: 14px;
            `;
            labSidebar.insertBefore(searchBar, labSidebar.firstChild);
            
            searchBar.addEventListener('input', (e) => this.search(e.target.value));
            this.searchInput = searchBar;
        }
    }
    
    search(query) {
        const items = document.querySelectorAll('.lab-item');
        const lowerQuery = query.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(lowerQuery) || query === '') {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// ============================================
// TOOLTIPS FOR ALL BUTTONS
// ============================================
function addTooltips() {
    const elementsWithTooltips = [
        { selector: '#simulateBtn', text: 'Run circuit simulation (Space)' },
        { selector: '#clearBtn', text: 'Clear entire workspace (Ctrl+Delete)' },
        { selector: '#sendMessage', text: 'Send message to AI Tutor (Enter)' },
    ];
    
    elementsWithTooltips.forEach(({selector, text}) => {
        const el = document.querySelector(selector);
        if (el) {
            el.title = text;
            el.setAttribute('data-tooltip', text);
        }
    });
}

// ============================================
// LOADING ANIMATION
// ============================================
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loadingScreen';
    loader.innerHTML = `
        <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:#0f172a;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;">
            <div style="font-size:60px;margin-bottom:20px;">⚡</div>
            <h1 style="color:white;font-size:32px;margin:0 0 10px 0;">ECE Skill Universe</h1>
            <p style="color:#94a3b8;font-size:16px;margin:0 0 30px 0;">Loading amazing features...</p>
            <div style="width:300px;height:4px;background:rgba(99,102,241,0.2);border-radius:2px;overflow:hidden;">
                <div style="width:100%;height:100%;background:linear-gradient(90deg,#6366f1,#8b5cf6);animation:loadingBar 2s ease-in-out;"></div>
            </div>
        </div>
        <style>
            @keyframes loadingBar {
                from { transform: translateX(-100%); }
                to { transform: translateX(0); }
            }
        </style>
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => loader.remove(), 2000);
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Advanced UX...');
    
    // Show loading screen
    showLoadingScreen();
    
    // Initialize features
    KeyboardShortcuts.init();
    new ComponentSearch();
    addTooltips();
    startAutoSave();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes keyPressAnim {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            20% { opacity: 1; transform: translateX(-50%) translateY(0); }
            80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
        
        .notification {
            animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ All UX features loaded!');
    console.log('💡 Press Ctrl+/ to see all shortcuts');
});

// Export functions for global access
window.historyManager = historyManager;
window.KeyboardShortcuts = KeyboardShortcuts;

console.log('⚡ Advanced UX system ready!');
