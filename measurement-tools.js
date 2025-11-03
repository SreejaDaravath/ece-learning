// 📊 Measurement Tools - Multimeter, Oscilloscope, Logic Analyzer

const MeasurementTools = {
    multimeterActive: false,
    oscilloscopeActive: false,
    logicAnalyzerActive: false,
    
    // Simulate circuit readings
    circuitData: {
        voltage: 0,
        current: 0,
        resistance: 0,
        power: 0,
        frequency: 0,
        waveform: []
    },
    
    init() {
        console.log('📊 Initializing Measurement Tools...');
        this.createToolsUI();
        this.startMonitoring();
    },
    
    createToolsUI() {
        const toolsContainer = document.createElement('div');
        toolsContainer.className = 'measurement-tools-container';
        toolsContainer.innerHTML = `
            <div class="tools-panel">
                <h3>🔧 Measurement Tools</h3>
                <div class="tools-buttons">
                    <button class="tool-toggle-btn" onclick="MeasurementTools.toggleMultimeter()">
                        <span class="tool-icon">📊</span>
                        <span>Multimeter</span>
                        <span class="tool-status" id="multimeterStatus">OFF</span>
                    </button>
                    <button class="tool-toggle-btn" onclick="MeasurementTools.toggleOscilloscope()">
                        <span class="tool-icon">〰️</span>
                        <span>Oscilloscope</span>
                        <span class="tool-status" id="oscilloscopeStatus">OFF</span>
                    </button>
                    <button class="tool-toggle-btn" onclick="MeasurementTools.toggleLogicAnalyzer()">
                        <span class="tool-icon">📈</span>
                        <span>Logic Analyzer</span>
                        <span class="tool-status" id="logicAnalyzerStatus">OFF</span>
                    </button>
                </div>
            </div>
            
            <!-- Multimeter Display -->
            <div class="tool-display multimeter-display" id="multimeterDisplay" style="display: none;">
                <div class="display-header">
                    <h3>📊 Digital Multimeter</h3>
                    <button class="close-display" onclick="MeasurementTools.toggleMultimeter()">×</button>
                </div>
                <div class="multimeter-screen">
                    <div class="main-reading">
                        <span class="reading-value" id="mainReading">0.00</span>
                        <span class="reading-unit" id="mainUnit">V</span>
                    </div>
                    <div class="mode-selector">
                        <button class="mode-btn active" onclick="MeasurementTools.setMode('voltage')">V</button>
                        <button class="mode-btn" onclick="MeasurementTools.setMode('current')">A</button>
                        <button class="mode-btn" onclick="MeasurementTools.setMode('resistance')">Ω</button>
                        <button class="mode-btn" onclick="MeasurementTools.setMode('continuity')">🔊</button>
                    </div>
                    <div class="secondary-readings">
                        <div class="reading-item">
                            <span class="label">Voltage:</span>
                            <span class="value" id="voltageReading">0.00 V</span>
                        </div>
                        <div class="reading-item">
                            <span class="label">Current:</span>
                            <span class="value" id="currentReading">0.00 mA</span>
                        </div>
                        <div class="reading-item">
                            <span class="label">Resistance:</span>
                            <span class="value" id="resistanceReading">0.00 Ω</span>
                        </div>
                        <div class="reading-item">
                            <span class="label">Power:</span>
                            <span class="value" id="powerReading">0.00 W</span>
                        </div>
                    </div>
                </div>
                <div class="connection-status" id="multimeterConnection">
                    <span class="status-dot"></span>
                    <span>Connect probes to circuit</span>
                </div>
            </div>
            
            <!-- Oscilloscope Display -->
            <div class="tool-display oscilloscope-display" id="oscilloscopeDisplay" style="display: none;">
                <div class="display-header">
                    <h3>〰️ Oscilloscope</h3>
                    <button class="close-display" onclick="MeasurementTools.toggleOscilloscope()">×</button>
                </div>
                <canvas id="oscilloscopeCanvas" width="600" height="300"></canvas>
                <div class="oscilloscope-controls">
                    <div class="control-group">
                        <label>Time/Div:</label>
                        <select id="timeDiv" onchange="MeasurementTools.updateTimebase()">
                            <option value="1">1 ms</option>
                            <option value="5" selected>5 ms</option>
                            <option value="10">10 ms</option>
                            <option value="50">50 ms</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label>Volt/Div:</label>
                        <select id="voltDiv" onchange="MeasurementTools.updateVoltage()">
                            <option value="1">1 V</option>
                            <option value="2" selected>2 V</option>
                            <option value="5">5 V</option>
                            <option value="10">10 V</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label>Trigger:</label>
                        <button class="trigger-btn" onclick="MeasurementTools.triggerScope()">Auto</button>
                    </div>
                </div>
                <div class="scope-readings">
                    <div class="reading-item">
                        <span class="label">Frequency:</span>
                        <span class="value" id="freqReading">0 Hz</span>
                    </div>
                    <div class="reading-item">
                        <span class="label">Vpp:</span>
                        <span class="value" id="vppReading">0.00 V</span>
                    </div>
                    <div class="reading-item">
                        <span class="label">Vrms:</span>
                        <span class="value" id="vrmsReading">0.00 V</span>
                    </div>
                </div>
            </div>
            
            <!-- Logic Analyzer Display -->
            <div class="tool-display logic-analyzer-display" id="logicAnalyzerDisplay" style="display: none;">
                <div class="display-header">
                    <h3>📈 Logic Analyzer</h3>
                    <button class="close-display" onclick="MeasurementTools.toggleLogicAnalyzer()">×</button>
                </div>
                <div class="logic-channels">
                    <div class="channel" id="channel0">
                        <div class="channel-label">CH0</div>
                        <canvas class="channel-canvas" width="500" height="40"></canvas>
                        <div class="channel-status">HIGH</div>
                    </div>
                    <div class="channel" id="channel1">
                        <div class="channel-label">CH1</div>
                        <canvas class="channel-canvas" width="500" height="40"></canvas>
                        <div class="channel-status">LOW</div>
                    </div>
                    <div class="channel" id="channel2">
                        <div class="channel-label">CH2</div>
                        <canvas class="channel-canvas" width="500" height="40"></canvas>
                        <div class="channel-status">HIGH</div>
                    </div>
                    <div class="channel" id="channel3">
                        <div class="channel-label">CH3</div>
                        <canvas class="channel-canvas" width="500" height="40"></canvas>
                        <div class="channel-status">LOW</div>
                    </div>
                </div>
                <div class="logic-controls">
                    <button class="control-btn" onclick="MeasurementTools.startCapture()">▶️ Start</button>
                    <button class="control-btn" onclick="MeasurementTools.stopCapture()">⏸️ Stop</button>
                    <button class="control-btn" onclick="MeasurementTools.clearCapture()">🗑️ Clear</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(toolsContainer);
    },
    
    // Toggle Tools
    toggleMultimeter() {
        this.multimeterActive = !this.multimeterActive;
        const display = document.getElementById('multimeterDisplay');
        const status = document.getElementById('multimeterStatus');
        
        if (this.multimeterActive) {
            display.style.display = 'block';
            status.textContent = 'ON';
            status.style.color = '#10b981';
            this.updateMultimeterReadings();
        } else {
            display.style.display = 'none';
            status.textContent = 'OFF';
            status.style.color = '#9ca3af';
        }
    },
    
    toggleOscilloscope() {
        this.oscilloscopeActive = !this.oscilloscopeActive;
        const display = document.getElementById('oscilloscopeDisplay');
        const status = document.getElementById('oscilloscopeStatus');
        
        if (this.oscilloscopeActive) {
            display.style.display = 'block';
            status.textContent = 'ON';
            status.style.color = '#10b981';
            this.drawWaveform();
        } else {
            display.style.display = 'none';
            status.textContent = 'OFF';
            status.style.color = '#9ca3af';
        }
    },
    
    toggleLogicAnalyzer() {
        this.logicAnalyzerActive = !this.logicAnalyzerActive;
        const display = document.getElementById('logicAnalyzerDisplay');
        const status = document.getElementById('logicAnalyzerStatus');
        
        if (this.logicAnalyzerActive) {
            display.style.display = 'block';
            status.textContent = 'ON';
            status.style.color = '#10b981';
            this.drawLogicSignals();
        } else {
            display.style.display = 'none';
            status.textContent = 'OFF';
            status.style.color = '#9ca3af';
        }
    },
    
    // Start monitoring circuit
    startMonitoring() {
        setInterval(() => {
            this.simulateCircuitReadings();
            
            if (this.multimeterActive) {
                this.updateMultimeterReadings();
            }
            
            if (this.oscilloscopeActive) {
                this.drawWaveform();
            }
            
            if (this.logicAnalyzerActive) {
                this.drawLogicSignals();
            }
        }, 100);
    },
    
    simulateCircuitReadings() {
        // Simulate circuit connected with LED
        const isLedConnected = this.checkCircuitConnection();
        
        if (isLedConnected) {
            this.circuitData.voltage = 9 + (Math.random() - 0.5) * 0.2; // 9V ± 0.1V
            this.circuitData.current = 18 + (Math.random() - 0.5) * 2; // ~18mA
            this.circuitData.resistance = 470 + (Math.random() - 0.5) * 10; // 470Ω
            this.circuitData.power = (this.circuitData.voltage * this.circuitData.current) / 1000;
            this.circuitData.frequency = 50 + Math.random() * 10; // 50Hz AC ripple
        } else {
            this.circuitData.voltage = 0;
            this.circuitData.current = 0;
            this.circuitData.resistance = 999999; // Open circuit
            this.circuitData.power = 0;
            this.circuitData.frequency = 0;
        }
    },
    
    checkCircuitConnection() {
        // Check if circuit elements exist and are connected
        const battery = document.querySelector('[data-component="battery"]');
        const led = document.querySelector('[data-component="led"]');
        return battery && led; // Simplified check
    },
    
    // Multimeter functions
    updateMultimeterReadings() {
        document.getElementById('voltageReading').textContent = 
            this.circuitData.voltage.toFixed(2) + ' V';
        document.getElementById('currentReading').textContent = 
            this.circuitData.current.toFixed(2) + ' mA';
        document.getElementById('resistanceReading').textContent = 
            this.circuitData.resistance < 1000 
                ? this.circuitData.resistance.toFixed(0) + ' Ω'
                : (this.circuitData.resistance / 1000).toFixed(1) + ' kΩ';
        document.getElementById('powerReading').textContent = 
            this.circuitData.power.toFixed(3) + ' W';
        
        // Update main reading based on mode
        const mode = document.querySelector('.mode-btn.active')?.textContent || 'V';
        let mainValue, mainUnit;
        
        if (mode === 'V') {
            mainValue = this.circuitData.voltage.toFixed(2);
            mainUnit = 'V';
        } else if (mode === 'A') {
            mainValue = this.circuitData.current.toFixed(2);
            mainUnit = 'mA';
        } else {
            mainValue = this.circuitData.resistance.toFixed(0);
            mainUnit = 'Ω';
        }
        
        document.getElementById('mainReading').textContent = mainValue;
        document.getElementById('mainUnit').textContent = mainUnit;
        
        // Update connection status
        const connected = this.circuitData.voltage > 0;
        const connectionStatus = document.getElementById('multimeterConnection');
        if (connected) {
            connectionStatus.innerHTML = '<span class="status-dot active"></span><span>✅ Connected to circuit</span>';
        } else {
            connectionStatus.innerHTML = '<span class="status-dot"></span><span>⚠️ Connect probes to circuit</span>';
        }
    },
    
    setMode(mode) {
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        this.updateMultimeterReadings();
    },
    
    // Oscilloscope functions
    drawWaveform() {
        const canvas = document.getElementById('oscilloscopeCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= width; x += width / 10) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= height; y += height / 6) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw waveform
        if (this.circuitData.voltage > 0) {
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const amplitude = (this.circuitData.voltage / 10) * (height / 2);
            const frequency = this.circuitData.frequency;
            const time = Date.now() / 1000;
            
            for (let x = 0; x < width; x++) {
                const t = (x / width) * 0.1 + time;
                const y = height / 2 - amplitude * Math.sin(2 * Math.PI * frequency * t);
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
            
            // Update readings
            const vpp = this.circuitData.voltage * 2;
            const vrms = this.circuitData.voltage / Math.sqrt(2);
            document.getElementById('freqReading').textContent = frequency.toFixed(1) + ' Hz';
            document.getElementById('vppReading').textContent = vpp.toFixed(2) + ' V';
            document.getElementById('vrmsReading').textContent = vrms.toFixed(2) + ' V';
        }
    },
    
    // Logic Analyzer functions
    drawLogicSignals() {
        const channels = document.querySelectorAll('.channel-canvas');
        
        channels.forEach((canvas, index) => {
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            
            // Clear
            ctx.fillStyle = '#0a0e27';
            ctx.fillRect(0, 0, width, height);
            
            // Draw signal
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const time = Date.now() / 1000;
            let lastState = 0;
            
            for (let x = 0; x < width; x++) {
                // Generate digital signal based on channel and time
                const state = Math.sin((x / 50) + time + index) > 0 ? 1 : 0;
                const y = state === 1 ? height * 0.2 : height * 0.8;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else if (state !== lastState) {
                    ctx.lineTo(x, lastState === 1 ? height * 0.2 : height * 0.8);
                    ctx.lineTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                lastState = state;
            }
            
            ctx.stroke();
            
            // Update status
            const status = lastState === 1 ? 'HIGH' : 'LOW';
            const statusElem = canvas.parentElement.querySelector('.channel-status');
            statusElem.textContent = status;
            statusElem.style.color = status === 'HIGH' ? '#10b981' : '#9ca3af';
        });
    },
    
    updateTimebase() {
        console.log('⏱️ Timebase updated');
    },
    
    updateVoltage() {
        console.log('⚡ Voltage scale updated');
    },
    
    triggerScope() {
        console.log('📊 Scope triggered');
    },
    
    startCapture() {
        console.log('▶️ Logic capture started');
    },
    
    stopCapture() {
        console.log('⏸️ Logic capture stopped');
    },
    
    clearCapture() {
        console.log('🗑️ Logic capture cleared');
        this.drawLogicSignals();
    }
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MeasurementTools.init());
} else {
    MeasurementTools.init();
}

window.MeasurementTools = MeasurementTools;
