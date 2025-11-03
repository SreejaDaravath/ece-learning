// 🎮 ECE MASTER - Practical Hands-On Learning Levels
// No Theory - Only DO, BUILD, TEST, LEARN by DOING!

const LEVEL_DATA = {
  // ============================================
  // MODULE 1: Basic Electronics (Levels 1-10)
  // ============================================
  1: {
    module: "Basic Electronics",
    title: "Connect Your First LED",
    taskType: "BUILD_CIRCUIT",
    description: "Drag battery (🔋) and LED (💡) to breadboard. Click them to connect wires (🔌). Watch it glow! ⚡",
    demo: {
      components: ["battery-5v", "wire", "led-red", "wire"],
      connections: [
        ["battery+", "led+"],
        ["led-", "battery-"]
      ],
      instructions: [
        "1. Drag 🔋 Battery (5V) to left side",
        "2. Drag 💡 LED (Red) to right side", 
        "3. Click battery, then LED to wire them",
        "4. LED will glow when circuit complete!"
      ]
    },
    components: ["battery-5v", "led-red", "led-green", "led-blue", "wire"],
    goal: "Make the LED glow by connecting battery to LED",
    successCriteria: {
      type: "led_on",
      target: "any"
    },
    hint: "Batteries have + and - sides. LEDs have long leg (+) and short leg (-). Click components to connect wires! You need 2 wires: battery+ to LED+, and LED- to battery-.",
    maxTime: 120,
    difficulty: "easy"
  },

  2: {
    module: "Basic Electronics",
    title: "Add a Resistor - Save Your LED!",
    taskType: "BUILD_CIRCUIT",
    description: "⚠️ LED will BURN without resistor! Add 220Ω resistor (〰️) between battery and LED to limit current.",
    demo: {
      components: ["battery-5v", "wire", "resistor-220", "wire", "led-red", "wire"],
      connections: [
        ["battery+", "resistor"],
        ["resistor", "led+"],
        ["led-", "battery-"]
      ],
      instructions: [
        "1. Drag 🔋 Battery (5V)",
        "2. Drag 〰️ Resistor (220Ω) - IMPORTANT!", 
        "3. Drag 💡 LED (Red)",
        "4. Wire: Battery+ → Resistor → LED+ → Battery-",
        "5. Resistor protects LED from burning!"
      ]
    },
    components: ["battery-5v", "resistor-220", "resistor-330", "resistor-1k", "led-red", "wire"],
    goal: "Build safe LED circuit: Battery → Resistor → LED → Battery (current 10-25mA)",
    successCriteria: {
      type: "current_in_range",
      min: 10,
      max: 25,
      unit: "mA"
    },
    hint: "Circuit order: Battery+ → 220Ω Resistor → LED+ (long leg) → LED- (short leg) → Battery-. Use 3 wires to connect!",
    maxTime: 150,
    difficulty: "easy"
  },

  3: {
    module: "Basic Electronics",
    title: "Measure Voltage - Use Multimeter",
    taskType: "MEASURE",
    description: "Build LED circuit. Click multimeter 🔴 button. Measure voltage across LED.",
    demo: {
      components: ["battery-9v", "resistor-470", "led-red"],
      connections: [["battery+", "r1"], ["r1", "led-anode"], ["led-cathode", "battery-"]]
    },
    components: ["battery-9v", "resistor-470", "led-red", "multimeter", "wire"],
    goal: "Measure and report LED voltage (should be ~2V)",
    successCriteria: {
      type: "measurement",
      target: "led_voltage",
      expectedRange: [1.8, 2.4],
      unit: "V"
    },
    hint: "Click multimeter, then click both ends of LED to measure voltage drop.",
    maxTime: 120,
    difficulty: "easy"
  },

  4: {
    module: "Basic Electronics",
    title: "Series Circuit - Two Resistors",
    taskType: "BUILD_AND_MEASURE",
    description: "Connect two 1kΩ resistors in series. Measure total resistance.",
    demo: {
      components: ["resistor-1k", "resistor-1k", "multimeter"],
      connections: [["r1", "r2"]]
    },
    components: ["resistor-1k", "resistor-1k", "multimeter", "wire"],
    goal: "Build series circuit. Total R should be 2kΩ",
    successCriteria: {
      type: "measurement",
      target: "total_resistance",
      expectedRange: [1900, 2100],
      unit: "Ω"
    },
    hint: "Series: R_total = R1 + R2. Connect them end-to-end!",
    maxTime: 90,
    difficulty: "easy"
  },

  5: {
    module: "Basic Electronics",
    title: "Parallel Circuit - Double Current",
    taskType: "BUILD_AND_MEASURE",
    description: "Connect two 1kΩ resistors in PARALLEL. Measure current from battery.",
    demo: {
      components: ["battery-5v", "resistor-1k", "resistor-1k", "multimeter"],
      connections: [["battery+", "r1"], ["battery+", "r2"], ["r1", "battery-"], ["r2", "battery-"]]
    },
    components: ["battery-5v", "resistor-1k", "resistor-1k", "multimeter", "wire"],
    goal: "Build parallel circuit. Current ~10mA",
    successCriteria: {
      type: "measurement",
      target: "total_current",
      expectedRange: [9, 11],
      unit: "mA"
    },
    hint: "Parallel: Connect both resistors between same two points!",
    maxTime: 120,
    difficulty: "medium"
  },

  6: {
    module: "Basic Electronics",
    title: "Voltage Divider - Adjust Output",
    taskType: "ADJUST_VALUES",
    description: "You need 2.5V output from 5V battery. Adjust R1 and R2 to get it!",
    demo: {
      components: ["battery-5v", "resistor-variable", "resistor-variable"],
      connections: [["battery+", "r1"], ["r1", "r2"], ["r2", "battery-"]],
      solution: { r1: 1000, r2: 1000 }
    },
    components: ["battery-5v", "resistor-variable", "resistor-variable", "multimeter", "wire"],
    goal: "Adjust sliders to get Vout = 2.5V ±0.1V",
    successCriteria: {
      type: "voltage_output",
      target: 2.5,
      tolerance: 0.1,
      unit: "V"
    },
    hint: "Vout = Vin × (R2 / (R1 + R2)). Try equal resistors!",
    maxTime: 120,
    difficulty: "medium"
  },

  7: {
    module: "Basic Electronics",
    title: "Power Calculation - Will It Overheat?",
    taskType: "BUILD_AND_CALCULATE",
    description: "Connect 100Ω resistor to 12V. Measure current. Calculate power (P = VI).",
    demo: {
      components: ["battery-12v", "resistor-100", "multimeter"],
      connections: [["battery+", "r1"], ["r1", "battery-"]]
    },
    components: ["battery-12v", "resistor-100", "multimeter", "wire"],
    goal: "Calculate power. Answer: 1.44W",
    successCriteria: {
      type: "calculation",
      formula: "P = V × I",
      expectedAnswer: 1.44,
      tolerance: 0.1,
      unit: "W"
    },
    hint: "Measure I first (I = V/R = 12/100 = 0.12A), then P = 12 × 0.12",
    maxTime: 150,
    difficulty: "medium"
  },

  8: {
    module: "Basic Electronics",
    title: "LED Brightness Control - PWM Simulation",
    taskType: "ADJUST_AND_OBSERVE",
    description: "Adjust resistor value (100Ω to 10kΩ). Watch LED brightness change!",
    demo: {
      components: ["battery-5v", "resistor-variable", "led-red"],
      connections: [["battery+", "r1"], ["r1", "led-anode"], ["led-cathode", "battery-"]]
    },
    components: ["battery-5v", "resistor-variable", "led-red", "multimeter", "wire"],
    goal: "Adjust to get LED brightness at 50% (current ~10mA)",
    successCriteria: {
      type: "current_target",
      target: 10,
      tolerance: 2,
      unit: "mA"
    },
    hint: "Higher resistance = less current = dimmer LED!",
    maxTime: 90,
    difficulty: "easy"
  },

  9: {
    module: "Basic Electronics",
    title: "Choose Right Resistor for 3V LED",
    taskType: "COMPONENT_SELECTION",
    description: "You have 9V battery, LED needs 2V @ 20mA. Which resistor to use?",
    demo: {
      calculation: "R = (Vin - VLED) / I = (9 - 2) / 0.02 = 350Ω"
    },
    components: ["battery-9v", "resistor-220", "resistor-330", "resistor-470", "resistor-680", "led-red", "wire"],
    goal: "Drag correct resistor. Circuit should work safely.",
    successCriteria: {
      type: "component_check",
      correctComponent: "resistor-330",
      reason: "Closest standard value to 350Ω"
    },
    hint: "Calculate: R = (9-2) / 0.020 = ?Ω. Choose closest available!",
    maxTime: 120,
    difficulty: "medium"
  },

  10: {
    module: "Basic Electronics",
    title: "🏆 MODULE 1 CHALLENGE - Traffic Light",
    taskType: "COMPLEX_BUILD",
    description: "Build traffic light: Red LED (5V, 330Ω), Yellow LED (5V, 470Ω), Green LED (5V, 560Ω). All should glow!",
    demo: {
      components: ["battery-5v", "resistor-330", "resistor-470", "resistor-560", "led-red", "led-yellow", "led-green"],
      connections: [
        ["battery+", "r1"], ["r1", "led1"], ["led1", "battery-"],
        ["battery+", "r2"], ["r2", "led2"], ["led2", "battery-"],
        ["battery+", "r3"], ["r3", "led3"], ["led3", "battery-"]
      ]
    },
    components: ["battery-5v", "resistor-330", "resistor-470", "resistor-560", "led-red", "led-yellow", "led-green", "wire"],
    goal: "Build complete 3-LED system. All LEDs should glow with correct brightness.",
    successCriteria: {
      type: "multi_check",
      checks: [
        { type: "led_on", target: "red" },
        { type: "led_on", target: "yellow" },
        { type: "led_on", target: "green" },
        { type: "current_range", min: 15, max: 25, target: "total", unit: "mA" }
      ]
    },
    hint: "Each LED needs its own resistor! Three parallel circuits from same battery.",
    maxTime: 300,
    difficulty: "hard",
    reward: { type: "achievement", name: "Electronics Novice", bonus: 500 }
  },

  // ============================================
  // MODULE 2: Digital Logic Basics (Levels 11-20)
  // ============================================
  11: {
    module: "Digital Logic",
    title: "Binary Switch - ON/OFF",
    taskType: "INTERACTIVE",
    description: "Click switch to turn LED ON/OFF. Understand HIGH (1) and LOW (0).",
    demo: {
      components: ["switch", "battery-5v", "led-green"],
      connections: [["battery+", "switch"], ["switch", "led-anode"], ["led-cathode", "battery-"]]
    },
    components: ["switch", "battery-5v", "led-green", "wire"],
    goal: "Toggle switch 5 times. Watch LED respond!",
    successCriteria: {
      type: "interaction_count",
      target: 5,
      action: "switch_toggle"
    },
    hint: "Switch ON = Logic 1 = HIGH = LED glows! Switch OFF = Logic 0 = LOW = Dark.",
    maxTime: 60,
    difficulty: "easy"
  },

  12: {
    module: "Digital Logic",
    title: "AND Gate - Build Truth Table",
    taskType: "BUILD_TRUTH_TABLE",
    description: "Two switches control one LED through AND gate. Test all combinations!",
    demo: {
      components: ["switch-a", "switch-b", "and-gate", "led-green"],
      truthTable: [[0,0,0], [0,1,0], [1,0,0], [1,1,1]]
    },
    components: ["switch-a", "switch-b", "and-gate", "led-green", "wire"],
    goal: "Fill truth table by testing all 4 input combinations",
    successCriteria: {
      type: "truth_table_complete",
      gate: "AND",
      expectedTable: [[0,0,0], [0,1,0], [1,0,0], [1,1,1]]
    },
    hint: "AND gate: Output HIGH only when BOTH inputs are HIGH!",
    maxTime: 120,
    difficulty: "easy"
  },

  13: {
    module: "Digital Logic",
    title: "OR Gate - Any Input HIGH",
    taskType: "BUILD_TRUTH_TABLE",
    description: "OR gate: LED glows if ANY switch is ON. Test it!",
    demo: {
      components: ["switch-a", "switch-b", "or-gate", "led-yellow"],
      truthTable: [[0,0,0], [0,1,1], [1,0,1], [1,1,1]]
    },
    components: ["switch-a", "switch-b", "or-gate", "led-yellow", "wire"],
    goal: "Complete truth table for OR gate",
    successCriteria: {
      type: "truth_table_complete",
      gate: "OR",
      expectedTable: [[0,0,0], [0,1,1], [1,0,1], [1,1,1]]
    },
    hint: "OR gate: Output HIGH if A OR B OR both are HIGH!",
    maxTime: 120,
    difficulty: "easy"
  },

  14: {
    module: "Digital Logic",
    title: "NOT Gate - Inverter",
    taskType: "BUILD_AND_TEST",
    description: "NOT gate flips signal! ON becomes OFF, OFF becomes ON.",
    demo: {
      components: ["switch", "not-gate", "led-red", "led-green"],
      behavior: "switch-ON → led-red-OFF, led-green-ON"
    },
    components: ["switch", "not-gate", "led-red", "led-green", "wire"],
    goal: "Connect NOT gate. When switch ON, green LED glows (inverted!).",
    successCriteria: {
      type: "behavior_check",
      tests: [
        { input: 0, expectedOutput: 1 },
        { input: 1, expectedOutput: 0 }
      ]
    },
    hint: "NOT gate has 1 input, 1 output. Output is opposite of input!",
    maxTime: 90,
    difficulty: "easy"
  },

  15: {
    module: "Digital Logic",
    title: "NAND Gate - Universal Gate",
    taskType: "BUILD_TRUTH_TABLE",
    description: "NAND = NOT + AND. Output LOW only when BOTH inputs HIGH!",
    demo: {
      components: ["switch-a", "switch-b", "nand-gate", "led-blue"],
      truthTable: [[0,0,1], [0,1,1], [1,0,1], [1,1,0]]
    },
    components: ["switch-a", "switch-b", "nand-gate", "led-blue", "wire"],
    goal: "Complete NAND truth table",
    successCriteria: {
      type: "truth_table_complete",
      gate: "NAND",
      expectedTable: [[0,0,1], [0,1,1], [1,0,1], [1,1,0]]
    },
    hint: "NAND is opposite of AND. Output LOW only when A AND B both HIGH!",
    maxTime: 120,
    difficulty: "medium"
  },

  16: {
    module: "Digital Logic",
    title: "Build AND Gate Using NAND Gates",
    taskType: "COMPLEX_BUILD",
    description: "Use 2 NAND gates to create AND gate! (Universal gate magic)",
    demo: {
      hint: "NAND → NOT = AND. Connect NAND output to another NAND (with both inputs tied)."
    },
    components: ["switch-a", "switch-b", "nand-gate", "nand-gate", "led-green", "wire"],
    goal: "Build AND gate using only NAND gates. Verify truth table!",
    successCriteria: {
      type: "truth_table_complete",
      gate: "AND",
      expectedTable: [[0,0,0], [0,1,0], [1,0,0], [1,1,1]]
    },
    hint: "First NAND gives NAND output. Second NAND (both inputs same) acts as NOT!",
    maxTime: 180,
    difficulty: "hard"
  },

  17: {
    module: "Digital Logic",
    title: "XOR Gate - Difference Detector",
    taskType: "BUILD_TRUTH_TABLE",
    description: "XOR: Output HIGH when inputs are DIFFERENT!",
    demo: {
      components: ["switch-a", "switch-b", "xor-gate", "led-purple"],
      truthTable: [[0,0,0], [0,1,1], [1,0,1], [1,1,0]]
    },
    components: ["switch-a", "switch-b", "xor-gate", "led-purple", "wire"],
    goal: "Complete XOR truth table. Notice: HIGH when inputs differ!",
    successCriteria: {
      type: "truth_table_complete",
      gate: "XOR",
      expectedTable: [[0,0,0], [0,1,1], [1,0,1], [1,1,0]]
    },
    hint: "XOR = Exclusive OR. Output HIGH when one input is different from the other!",
    maxTime: 120,
    difficulty: "medium"
  },

  18: {
    module: "Digital Logic",
    title: "3-Input Logic - Majority Voter",
    taskType: "BUILD_CUSTOM",
    description: "Build circuit: Output HIGH if 2 or more inputs are HIGH. (Voting circuit!)",
    demo: {
      hint: "Use AND gates and OR gates. (A AND B) OR (B AND C) OR (A AND C)"
    },
    components: ["switch-a", "switch-b", "switch-c", "and-gate", "and-gate", "and-gate", "or-gate", "or-gate", "led-green", "wire"],
    goal: "Build majority voter. Output HIGH when ≥2 inputs HIGH.",
    successCriteria: {
      type: "truth_table_match",
      expectedOutputs: {
        "000": 0, "001": 0, "010": 0, "011": 1,
        "100": 0, "101": 1, "110": 1, "111": 1
      }
    },
    hint: "Majority = (A·B) + (B·C) + (A·C). Use 3 AND gates and 1 OR gate!",
    maxTime: 300,
    difficulty: "hard"
  },

  19: {
    module: "Digital Logic",
    title: "Logic Expression - Build From Boolean",
    taskType: "BUILD_FROM_EXPRESSION",
    description: "Build circuit for: Y = (A + B) · C̄ (use OR, AND, NOT gates)",
    demo: {
      expression: "Y = (A OR B) AND (NOT C)",
      breakdown: "OR gate for (A+B), NOT gate for C̄, AND gate to combine"
    },
    components: ["switch-a", "switch-b", "switch-c", "or-gate", "not-gate", "and-gate", "led-yellow", "wire"],
    goal: "Build circuit matching expression. Test all 8 input combinations!",
    successCriteria: {
      type: "expression_match",
      expression: "(A OR B) AND (NOT C)",
      testCount: 8
    },
    hint: "Break it down: (A OR B) first, then NOT C, then AND them together!",
    maxTime: 240,
    difficulty: "hard"
  },

  20: {
    module: "Digital Logic",
    title: "🏆 MODULE 2 CHALLENGE - 2-bit Comparator",
    taskType: "ADVANCED_BUILD",
    description: "Build circuit that checks if A > B (2-bit numbers). Output LED if true!",
    demo: {
      hint: "A > B when: A1=1,B1=0 OR (A1=B1 AND A0=1,B0=0). Use XNOR and logic gates!"
    },
    components: [
      "switch-a0", "switch-a1", "switch-b0", "switch-b1",
      "and-gate", "and-gate", "and-gate", "or-gate", "not-gate", "not-gate",
      "led-green", "wire"
    ],
    goal: "Build 2-bit comparator. LED glows only when A > B.",
    successCriteria: {
      type: "comparator_test",
      testCases: [
        { a: "00", b: "00", expected: 0 },
        { a: "01", b: "00", expected: 1 },
        { a: "10", b: "01", expected: 1 },
        { a: "11", b: "10", expected: 1 },
        { a: "00", b: "01", expected: 0 },
        { a: "01", b: "10", expected: 0 }
      ]
    },
    hint: "MSB matters most! If A1 > B1, then A > B. If equal, check LSB!",
    maxTime: 420,
    difficulty: "expert",
    reward: { type: "achievement", name: "Logic Master", bonus: 1000 }
  }

  // Levels 21-50 will be added in next phase (Combinational Circuits, Sequential Circuits, Advanced Topics)
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LEVEL_DATA;
}
