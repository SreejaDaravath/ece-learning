/**
 * Basic Tests for ECE MASTER
 * Run with: node tests/basic.test.js
 */

// Simple test framework
const assert = {
    equal: (actual, expected, message) => {
        if (actual === expected) {
            console.log(`✅ PASS: ${message}`);
            return true;
        } else {
            console.error(`❌ FAIL: ${message}`);
            console.error(`   Expected: ${expected}`);
            console.error(`   Actual: ${actual}`);
            return false;
        }
    },
    notEqual: (actual, expected, message) => {
        if (actual !== expected) {
            console.log(`✅ PASS: ${message}`);
            return true;
        } else {
            console.error(`❌ FAIL: ${message}`);
            return false;
        }
    },
    truthy: (value, message) => {
        if (value) {
            console.log(`✅ PASS: ${message}`);
            return true;
        } else {
            console.error(`❌ FAIL: ${message}`);
            return false;
        }
    }
};

// Test suite
let passed = 0;
let failed = 0;

console.log('\n🧪 Running ECE MASTER Tests...\n');

// Test 1: Ohm's Law Calculations
console.log('📊 Testing Circuit Calculations:');

function calculateVoltage(current, resistance) {
    return current * resistance; // V = I × R
}

function calculateCurrent(voltage, resistance) {
    return voltage / resistance; // I = V / R
}

function calculateResistance(voltage, current) {
    return voltage / current; // R = V / I
}

if (assert.equal(calculateVoltage(2, 5), 10, 'V = I × R (2A × 5Ω = 10V)')) passed++;
else failed++;

if (assert.equal(calculateCurrent(10, 5), 2, 'I = V / R (10V / 5Ω = 2A)')) passed++;
else failed++;

if (assert.equal(calculateResistance(10, 2), 5, 'R = V / I (10V / 2A = 5Ω)')) passed++;
else failed++;

// Test 2: Voltage Divider
console.log('\n⚡ Testing Voltage Divider:');

function voltageDivider(vin, r1, r2) {
    return vin * (r2 / (r1 + r2));
}

const vout1 = voltageDivider(10, 1000, 1000);
if (assert.equal(vout1, 5, 'Equal resistors divide voltage in half (10V → 5V)')) passed++;
else failed++;

const vout2 = voltageDivider(12, 3000, 1000);
if (assert.equal(vout2, 3, '3:1 ratio (12V with 3kΩ:1kΩ → 3V)')) passed++;
else failed++;

// Test 3: Series Resistance
console.log('\n🔌 Testing Series Resistance:');

function seriesResistance(...resistors) {
    return resistors.reduce((sum, r) => sum + r, 0);
}

if (assert.equal(seriesResistance(100, 200, 300), 600, 'Series R: 100 + 200 + 300 = 600Ω')) passed++;
else failed++;

// Test 4: Parallel Resistance
console.log('\n🔀 Testing Parallel Resistance:');

function parallelResistance(...resistors) {
    const sum = resistors.reduce((sum, r) => sum + (1/r), 0);
    return 1 / sum;
}

const rParallel = parallelResistance(100, 100);
if (assert.equal(Math.round(rParallel), 50, 'Parallel R: 100Ω || 100Ω = 50Ω')) passed++;
else failed++;

// Test 5: Power Calculation
console.log('\n⚡ Testing Power Calculations:');

function calculatePower(voltage, current) {
    return voltage * current; // P = V × I
}

if (assert.equal(calculatePower(12, 2), 24, 'P = V × I (12V × 2A = 24W)')) passed++;
else failed++;

// Test 6: Logic Gates
console.log('\n🔢 Testing Logic Gates:');

function AND(a, b) { return a && b; }
function OR(a, b) { return a || b; }
function NOT(a) { return !a; }
function XOR(a, b) { return (a || b) && !(a && b); }

if (assert.equal(AND(true, true), true, 'AND gate: 1 AND 1 = 1')) passed++;
else failed++;

if (assert.equal(AND(true, false), false, 'AND gate: 1 AND 0 = 0')) passed++;
else failed++;

if (assert.equal(OR(false, true), true, 'OR gate: 0 OR 1 = 1')) passed++;
else failed++;

if (assert.equal(NOT(true), false, 'NOT gate: NOT 1 = 0')) passed++;
else failed++;

if (assert.equal(XOR(true, false), true, 'XOR gate: 1 XOR 0 = 1')) passed++;
else failed++;

if (assert.equal(XOR(true, true), false, 'XOR gate: 1 XOR 1 = 0')) passed++;
else failed++;

// Test 7: LED Forward Voltage
console.log('\n💡 Testing LED Calculations:');

function calculateCurrentLimitingResistor(supplyVoltage, ledVoltage, ledCurrent) {
    return (supplyVoltage - ledVoltage) / ledCurrent;
}

const r = calculateCurrentLimitingResistor(5, 2, 0.020); // 5V, 2V LED, 20mA
if (assert.equal(r, 150, 'LED resistor: (5V - 2V) / 0.02A = 150Ω')) passed++;
else failed++;

// Test 8: Capacitor Charge Time
console.log('\n🔋 Testing Capacitor Calculations:');

function timeConstant(resistance, capacitance) {
    return resistance * capacitance; // τ = R × C
}

const tau = timeConstant(1000, 0.000001); // 1kΩ, 1µF
if (assert.equal(tau, 0.001, 'Time constant: 1kΩ × 1µF = 0.001s (1ms)')) passed++;
else failed++;

// Test 9: Data Validation
console.log('\n✅ Testing Data Validation:');

function isValidVoltage(v) {
    return typeof v === 'number' && v >= 0 && v <= 1000;
}

function isValidResistance(r) {
    return typeof r === 'number' && r > 0;
}

if (assert.truthy(isValidVoltage(5), 'Valid voltage: 5V')) passed++;
else failed++;

if (assert.truthy(!isValidVoltage(-5), 'Invalid voltage: -5V')) passed++;
else failed++;

if (assert.truthy(isValidResistance(1000), 'Valid resistance: 1000Ω')) passed++;
else failed++;

if (assert.truthy(!isValidResistance(0), 'Invalid resistance: 0Ω')) passed++;
else failed++;

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Test Results:');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
console.log('='.repeat(50) + '\n');

// Exit with appropriate code
process.exit(failed > 0 ? 1 : 0);
