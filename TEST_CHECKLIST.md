# Note Gate - Testing Checklist

## ✅ Features to Test

### 1. Level Progression (CRITICAL)
- [ ] Level 1 completes → Gate opens → Next Level button appears
- [ ] Click Next Level → Level 2 loads correctly
- [ ] Level 2 completes → Next Level button appears
- [ ] Continue through Levels 3, 4, 5

### 2. Analog Levels (1, 2, 3, 6, 9, 12...)
- [ ] Only resistor sliders visible (R1, R2)
- [ ] Circuit diagram visible with wire connections
- [ ] NO Input A/B switches visible
- [ ] Adjust sliders → Vout updates
- [ ] Match target voltage → Gate opens
- [ ] Next Level button appears immediately

### 3. Digital Levels (4, 5, 6, 7, 8, 10, 11...)
- [ ] Only Input A/B switches visible
- [ ] Gate type displayed (AND, OR, NOT, etc.)
- [ ] NO resistor sliders visible
- [ ] NO circuit diagram visible
- [ ] Toggle inputs → Output updates
- [ ] Correct output → Gate opens
- [ ] Next Level button appears

### 4. Progress Save
- [ ] Complete Level 1
- [ ] Refresh page (Ctrl+R)
- [ ] Should load Level 2 automatically
- [ ] Score should be saved
- [ ] Message: "Welcome back! Continuing from Level 2"

### 5. Manual Input
- [ ] Enter R1 manually (e.g., 2200)
- [ ] Click Apply
- [ ] Slider updates to 2200
- [ ] Vout calculates correctly
- [ ] Same for R2

### 6. Skip Level
- [ ] Click "⏭️ Skip Level" button
- [ ] Moves to next level
- [ ] No points awarded
- [ ] Message: "Level skipped!"

### 7. Reset Progress
- [ ] Click "🔄 Reset Progress" button
- [ ] Confirm dialog appears
- [ ] Click OK
- [ ] Reloads to Level 1
- [ ] Score resets to 0

## 🔍 Console Messages to Check (F12)

### On Page Load:
```
💾 Loaded saved progress: Level X
💰 Loaded saved score: X
🔓 Unlocked levels 1-X
👋 Welcome back! Continuing from Level X
```

### On Level Start:
```
🎮 Starting Level X (analog/digital)
📺 Showing analog controls   OR   🔌 Showing digital controls
✅ Level X is unlocked. Starting game...
```

### On Gate Opening:
```
🎯 Target matched! Vout: X.XXX Target: X.XX ± X.XX
🚪 Gate opened!
✅ Next Level button shown for level X
```

## ❌ Common Issues to Watch For

1. **Both analog AND digital controls showing** - SHOULD NOT HAPPEN
2. **Gate opens but no Next Level button** - CRITICAL BUG
3. **Next Level button doesn't work** - Check console for errors
4. **Progress not saving** - Check localStorage in DevTools
5. **Wrong level loads on refresh** - Check saved level number

## 🎯 Success Criteria

✅ All analog levels show ONLY analog controls
✅ All digital levels show ONLY digital controls  
✅ Gate opens → Next Level button ALWAYS appears
✅ Progress saves and loads correctly
✅ Can complete 5+ levels in sequence without issues
