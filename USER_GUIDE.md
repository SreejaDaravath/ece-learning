# 🎓 ECE MASTER - Quick User Guide

## 🚀 How to Start

1. **Open Browser in Incognito Mode:**
   - Chrome: `Ctrl + Shift + N`
   - Firefox/Edge: `Ctrl + Shift + P`

2. **Go to:** `http://localhost:8002`

---

## 🎮 How to Play

### **Step 1: Drag Components**
- Drag 🔋 **Battery** from left panel to canvas
- Drag 💡 **LED** from left panel to canvas
- Components are now **2X BIGGER** - easy to see!

### **Step 2: Connect with Wires** (2 Methods)

#### **Method 1: Draw Wire Tool** (NEW! ✨)
1. Click **🔌 Draw Wire** button (green glowing button in left panel)
2. Button will glow - wire drawing mode ON
3. Click **first point** on canvas where you want wire to start
4. Click **second point** where you want wire to end
5. Green wire appears!
6. Click button again to turn OFF

#### **Method 2: Click Components**
1. Click on **Battery** (it will glow green when selected)
2. Click on **LED** (wire connects automatically!)
3. Green line appears between them

### **Step 3: Test Circuit**
- Click **🧪 Test Circuit** button
- LED will glow if connected correctly!
- Check measurements on right panel

### **Step 4: Submit**
- Click **✓ Submit** button
- If correct: Success modal appears! 🎉
- If wrong: Try again! 🔄

---

## 🎨 New Features

### **1. 🔌 Draw Wire Button**
- **Location:** Left panel, below components
- **Color:** Green with glow effect
- **How to use:**
  - Click to activate (button glows)
  - Click 2 points on canvas
  - Wire appears between points
  - Click button again to deactivate

### **2. 📏 Components 2X Bigger**

#### **🔋 Battery (Much Bigger!)**
- Size: 80x50 pixels (was 50x30)
- Has red (+) terminal on right
- Has gray (-) terminal on left
- Yellow/gold color body
- Large **+** and **-** labels

#### **💡 LED (Double Size!)**
- Radius: 30 pixels (was 15)
- Has legs extending down
- Strong glow effect when ON
- Colors: Red, Green, Blue, Yellow
- Very visible and professional

#### **〰️ Resistor (Bigger with Stripes!)**
- Size: 100x30 pixels (was 60x20)
- Purple body color
- Color code stripes:
  - Red stripe (left)
  - Yellow stripe (middle)
  - Green stripe (right)
- Looks like real resistor!

### **3. ✨ Visual Effects**
- Selected components glow green
- Wires are thicker (3px) with blue glow
- Better click detection (50px radius)
- Smooth animations

---

## 🎯 All Buttons Explained

### **Left Panel - Quick Actions**
1. **🔌 Draw Wire** - Toggle wire drawing mode (GREEN)
2. **🗑️ Clear All** - Clear all components and wires
3. **💡 Hint (-25pts)** - Get help (costs 25 points)

### **Bottom - Control Buttons**
1. **← Previous** - Go to previous level (GRAY)
2. **📺 Watch Demo** - Watch circuit demo (PURPLE)
3. **👁️ Show Answer** - Auto-build circuit, -50pts (ORANGE)
4. **🧪 Test Circuit** - Test your circuit (CYAN)
5. **✓ Submit** - Submit answer (BLUE)
6. **🔄 Retry** - Restart level (RED, shows after failure)
7. **→ Next Level** - Go to next level (GREEN, shows after success)

---

## 📊 Right Panel Info

### **Current Status**
- **Phase:** Learn/Practice/Test
- **Attempts:** How many tries (max 3)
- **Time Taken:** Elapsed time

### **Measurements**
- **Voltage:** Battery voltage
- **Current:** Circuit current (mA)
- **Resistance:** Total resistance (Ω)
- **Power:** Power consumption (mW)

### **Achievements**
- 🎓 Scholar - Complete 10 levels
- ⚡ Speed Demon - Fast completion
- 🎯 Perfectionist - First attempt success
- 🔥 Hot Streak - 5 levels in row

---

## 🎨 Component Colors

- 🔋 Battery: Yellow/Gold (#fbbf24)
- 💡 LED Red: Bright Red (#ef4444)
- 💡 LED Green: Bright Green (#10b981)
- 💡 LED Blue: Bright Blue (#3b82f6)
- 〰️ Resistor: Purple (#a78bfa)
- 🔌 Wires: Blue (#3b82f6)
- ✅ Selection: Green Glow (#10b981)

---

## 🐛 Troubleshooting

### **Problem: Old version showing**
**Solution:**
1. Open Incognito: Ctrl + Shift + N
2. Or Hard Refresh: Ctrl + Shift + F5
3. Or Clear cache: Settings → Privacy → Clear data

### **Problem: Buttons not working**
**Solution:**
1. Check console (F12) for errors
2. Refresh page (Ctrl + R)
3. Check if JavaScript loaded (Network tab)

### **Problem: Components too small**
**Solution:**
- Clear cache - you're seeing old version
- Current version has 2X bigger components
- Battery should be 80x50 pixels
- LED should be 30px radius

### **Problem: Wire drawing not working**
**Solution:**
1. Click **🔌 Draw Wire** button (should glow green)
2. Make sure button is active
3. Click 2 points on canvas (not components)
4. Wire should appear

### **Problem: Can't connect components**
**Solution:**
1. Click component 1 (glows green)
2. Click component 2 (wire auto-connects)
3. Make sure components are on canvas
4. Check if components are within 50px click radius

---

## 📈 Tips for Success

1. **Always watch demo first** - Click 📺 Watch Demo
2. **Start with simple circuits** - Battery → LED first
3. **Use resistors for safety** - Prevent LED burn
4. **Test before submit** - Click 🧪 Test Circuit
5. **Check measurements** - Right panel shows values
6. **Use hints if stuck** - Better than failing
7. **Try multiple approaches** - 3 attempts available

---

## 🎓 Learning Goals

### **Level 1-5: Basic Circuits**
- Learn component placement
- Understand wire connections
- Basic voltage concepts
- LED operation

### **Level 6-10: Series & Parallel**
- Multiple components
- Current distribution
- Voltage dividers
- Power calculations

### **Level 11-20: Digital Logic**
- Logic gates (AND, OR, NOT)
- Truth tables
- Binary operations
- Combinational circuits

---

## 💾 Progress Saving

- Progress auto-saves to browser LocalStorage
- Score tracked automatically
- High score recorded
- Achievements saved
- Can continue later from same browser

---

## 🎯 Scoring System

### **Base Points**
- Level complete: +100 points
- First attempt bonus: +100 points
- Time bonus: Up to +50 points

### **Penalties**
- Hint used: -25 points
- Show Answer: -50 points
- Multiple attempts: No bonus

### **Achievements**
- Each achievement: Special badge
- Tracked in right panel
- Unlock by completing tasks

---

## 🌟 Best Practices

1. **Component Placement:**
   - Leave space between components
   - Arrange left to right (battery → resistor → LED)
   - Keep organized layout

2. **Wire Management:**
   - Use shortest paths
   - Avoid crossing wires
   - Keep circuit clean

3. **Testing:**
   - Test after each connection
   - Check measurements match goal
   - Verify LED glows

4. **Learning:**
   - Read task description carefully
   - Watch demo if available
   - Use hint for learning, not just passing

---

## 📝 Keyboard Shortcuts

*(Future feature - not yet implemented)*
- `Space` - Test Circuit
- `Enter` - Submit Answer
- `Escape` - Clear Selection
- `Delete` - Remove selected component
- `Ctrl + Z` - Undo last action

---

## 🚀 Performance Tips

1. Clear old wires before adding new ones
2. Use "Clear All" to start fresh
3. Keep number of components reasonable
4. Don't draw too many overlapping wires

---

**Made with ❤️ for ECE Students**
*"Build Circuits, Learn Electronics, Master ECE!"*

---

**Version:** 3.0 (Nov 3, 2025)  
**Status:** ✅ All Features Working  
**Server:** http://localhost:8002
