# 🎓 ECE MASTER v6.0 - Ultimate Learning Suite

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://sreejadaravath.github.io/ece-learning/)
[![Version](https://img.shields.io/badge/version-6.0.0-blue)](WHATS_NEW_v6.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**The Ultimate Interactive Electronics Learning Platform!** Master electronics with AI Tutor + Webcam, Live Simulation, Professional Certificates, and 50 hands-on levels. Build circuits, learn by doing, earn achievements!

🚀 [**Play Now**](https://sreejadaravath.github.io/ece-learning/) • 🆕 [What's New in v6.0](WHATS_NEW_v6.md) • 📖 [User Guide](USER_GUIDE.md) • 🐛 [Report Issue](https://github.com/SreejaDaravath/ece-learning/issues)

---

## 🌟 NEW in v6.0 - Ultimate Learning Suite

### 🤖 AI Tutor with Webcam Integration
- **Smart Conversational Interface** - Ask questions in natural language
- **Webcam Support** - Show your circuit setup for visual help
- **Context-Aware Responses** - Educational explanations with real-world analogies
- **Quick Help Actions** - One-click access to common electronics topics
- **24/7 Available** - Your personal electronics tutor anytime, anywhere

### ⚡ Live Circuit Simulation
- **Real-Time Metrics** - Watch current, voltage, and power update live
- **Interactive Controls** - Start, pause, reset simulation with one click
- **Speed Adjustment** - Control simulation speed (0.5x, 1x, 2x)
- **Visual Feedback** - See how circuit changes affect measurements instantly

### 🏆 Professional Certificate System
- **4 Achievement Levels** - Basic → Intermediate → Advanced → Expert
- **Professional Design** - Canvas-generated certificates with gradients and signatures
- **Downloadable** - Save as PNG and share on LinkedIn, portfolios
- **Progress Tracking** - See your journey from beginner to circuit master

### 📹 Enhanced Webcam Features
- **Show Physical Circuits** - Get AI feedback on real-world builds
- **Video Preview** - See yourself while learning for better engagement
- **Privacy-First** - Camera only activates when you enable it
- **One-Click Toggle** - Easy on/off control

> 📘 **[Read the full v6.0 feature guide →](WHATS_NEW_v6.md)**

---

## ✨ Features

### 🎓 Learning & Gameplay
- 🎮 **50 Interactive Levels** - From basic LED circuits to complex logic gates
- 🔌 **Drag & Drop Components** - Batteries, LEDs, resistors, logic gates, and more
- ✏️ **Draw Smooth Wires** - Hand-drawn wire tool for natural circuit building
- � **Demo Videos** - Watch demonstrations before each level
- 👁️ **Show Answer** - See the solution when stuck
- 💡 **Smart Hints** - Context-aware hints (costs 25 points)

### 📹 Interactive Learning Tools
- **AI Tutor Chat** - Ask questions and get instant educational responses
- **Webcam Integration** - Show your physical circuit for visual feedback
- **Quick Help System** - Ohm's Law, Kirchhoff's Laws, voltage division explained
- **Smart Response Engine** - Context-aware answers based on your level

### 🔧 Tools & Measurements
- 📊 **Virtual Multimeter** - Measure voltage, current, and resistance
- 📈 **Logic Analyzer** - Debug digital circuits
- 〰️ **Oscilloscope** - Visualize waveforms
- 🧪 **Circuit Simulator** - Test before submitting

### 🎯 Progress & Achievements
- 🏆 **Achievement System** - Unlock badges for milestones
- 📈 **Score Tracking** - Base score + time bonus + attempt bonus
- ⏱️ **Timer Challenges** - Race against time for bonus points
- 🔥 **Streak Tracking** - Maintain perfect level completion streaks

### 🌐 Accessibility & Compatibility
- 🌐 **Multilingual** - English and Hindi (हिन्दी) support
- 📴 **Works Offline** - Install as PWA for offline learning
- ♿ **Fully Accessible** - Keyboard navigation and screen reader support
- 📱 **Mobile Responsive** - Works perfectly on phones and tablets
- 🎨 **Modern UI** - Beautiful gradients and smooth animations

---

## 🎯 What You'll Learn

### Levels 1-10: Basic Electronics
- LED circuits and current flow
- Voltage dividers (Ohm's Law)
- Series and parallel circuits
- Resistor selection and power

### Levels 11-30: Digital Logic
- Logic gates (AND, OR, NOT, NAND, NOR, XOR)
- Truth tables and Boolean algebra
- Half adders and full adders
- Multiplexers and demultiplexers

### Levels 31-50: Advanced Circuits
- Sequential circuits and flip-flops
- Counter circuits
- Complex combinational logic
- Real-world circuit design

---

Files
- `index.html` — main UI (open in browser)
- `style.css` — styles
- `simulation.js` — small simulation helper (UMD)
- `main.js` — UI logic and puzzle behavior
- `test_vout.js` — node test for `computeVout`

How to run
- Open `note-gate/index.html` in a modern browser to play.
- The prototype now includes multiple levels and a simple scoring system. Use the sliders to match the target Vout. When you match the target within the tolerance the gate opens and you can advance to the next level.
- If you have Node.js installed, run tests:

```powershell
node ./note-gate/test_vout.js
```

Design notes
- Level: beginner ECE (voltage dividers)
- Mechanic: adjust R1 and R2 to match a target Vout. Gate opens when within tolerance.

Next steps (optional)
- Add more levels and scoring
- Add visual wiring/diagram
- Provide guided lessons and explanations

Accessibility & broad compatibility
----------------------------------

I want this app to be usable by as many people as possible. The repository now includes a few small accessibility and PWA improvements:

- Keyboard navigation: a "Skip to content" link is available and interactive controls include ARIA labels so screen readers can identify them.
- Language selector: a simple language `<select id="lang">` has been added to the header — the app already contains English and Hindi strings and will persist the choice in localStorage.
- Focusable canvases: canvas elements have `tabindex="0"` and `aria-label` attributes to help keyboard users and screen readers.
- PWA & offline: a `manifest.json` and a simple `service-worker.js` were added to enable installability and basic offline caching of core assets. (Add proper icons `icon-192.png` and `icon-512.png` for a full install experience.)
- Reduced motion & high-contrast: consider adding CSS respecting `prefers-reduced-motion` and a toggle for high contrast (I can add this quickly if you want).

Keyboard shortcuts (recommended / implemented UI hints)
- Tab/Shift+Tab — move focus through controls
- Enter/Space — activate focused button
- Use the language selector to switch UI strings (English/Hindi)

Notes & next accessibility steps
- Add actual app icons to replace `icon-192.png`/`icon-512.png` used by the manifest.
- Run an accessibility audit (Lighthouse) and fix any warnings: color contrast, ARIA roles, live region announcements on dynamic updates.
- Add alternative text descriptions for any images/screenshots used in the repo and consider adding short narrated demo video captions.

---

## � How to Use ECE AI Assistant

The **ECE AI Assistant** is your personal electronics tutor! Here's how to use it:

### 🎯 Getting Started

1. **Click the 📹 ECE Assistant button** in the left panel (below the Hint button)
2. A modal will open with webcam controls and AI tips

### 📷 Using the Webcam Feature

**Step 1: Enable Camera**
- Click **📷 Start Camera** button
- Allow camera permissions when prompted
- Position your physical circuit in the camera view

**Step 2: Get Feedback**
- Click **📸 Capture Circuit** to analyze your setup
- The AI will analyze component placement and connections
- Get instant feedback with specific suggestions

**Step 3: Stop When Done**
- Click **⏹️ Stop Camera** to turn off the webcam
- Camera only runs when you need it (privacy-focused)

### 💡 Quick Tips (No Camera Required)

Click any of these buttons for instant help:

- **Show All Components** - See what components you need for the level
- **Check Connections** - Learn how to wire components correctly
- **Verify Values** - Understand component values and ratings
- **Explain Theory** - Get circuit theory explanations (Ohm's Law, Kirchhoff's Laws)

### 🎓 Smart Features

- **Context-Aware Hints** - Suggestions based on your current level
- **Progressive Learning** - Tips adapt to your skill level
- **No Penalties** - Using the assistant doesn't cost points!
- **Works Offline** - Quick tips work even without internet

### 🔒 Privacy First

- Camera activates ONLY when you click "Start Camera"
- Images are processed locally (not sent to servers)
- Stop camera anytime with one click
- No recording or storage of webcam data

---

## �🚀 Publishing to GitHub & Making It Public

### If You Already Have a GitHub Repository

Open PowerShell in your project directory and run:

```powershell
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit with a message
git commit -m "Update: ECE MASTER with PWA, accessibility, and deployment ready"

# Add your existing repository as remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/ece-learning.git

# If remote already exists, remove and re-add:
# git remote remove origin
# git remote add origin https://github.com/yourusername/ece-learning.git

# Push to your repository
git branch -M main
git push -u origin main --force

# Note: Use --force only if you want to overwrite existing content
# Otherwise, remove --force and resolve any conflicts
```

### If You Need a New GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `ece-learning` (or keep your existing name)
3. Make it **Public** so everyone can access it
4. Don't initialize with README (we already have one)
5. Copy the repository URL and use it in the commands above

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select branch: `gh-pages` (will be created automatically by the workflow)
4. Wait a few minutes for the first deploy
5. Your site will be live at: `https://yourusername.github.io/ece-master/`

**Note:** The GitHub Actions workflow (`.github/workflows/gh-pages.yml`) will automatically deploy your site when you push to `main`.

### Step 4: Update URLs

After deploying, replace `yourusername` with your actual GitHub username in:

1. **index.html** - Open Graph and Twitter Card URLs
2. **README.md** - Badge links and demo link
3. **SOCIAL_MEDIA.md** - All example links

### Step 5: Share Everywhere!

Your app is now live and accessible to everyone! Share it on:

- 📱 Social Media (Twitter, LinkedIn, Reddit r/electronics, r/ECE)
- 🎓 Educational Platforms (Khan Academy forums, edX communities)
- 💬 Discord/Slack communities (electronics hobbyists, STEM educators)
- 📧 Email to professors, teachers, students
- 🌐 Submit to directories (Product Hunt, Hacker News Show HN)

---

## 📊 Analytics & Tracking (Optional)

To understand how people use your app, consider adding:

1. **Google Analytics** - Free, detailed usage stats
2. **Plausible Analytics** - Privacy-friendly alternative
3. **Simple Analytics** - Minimal, GDPR-compliant

Add the tracking code snippet to `index.html` before `</body>`.

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Quick ways to help:
- 🐛 Report bugs or suggest features
- 📝 Improve documentation or tutorials
- 🎨 Design better component icons
- 🌍 Add translations for more languages
- 📊 Create new levels or circuit challenges

---

## 📜 License

MIT License - feel free to use, modify, and distribute!

---

## 🙏 Acknowledgments

Built for ECE students and electronics enthusiasts worldwide. Special thanks to the open-source community and educators who inspired this project.

**Made with ❤️ for learners everywhere!**

---

## 📞 Support & Community

- 🐛 [Report Issues](https://github.com/yourusername/ece-learning/issues)
- 💬 [Discussions](https://github.com/yourusername/ece-learning/discussions)
- 📧 Email: your.email@example.com (optional)

**Happy learning! ⚡🎓**


Quick start (run locally)
-------------------------

These files form a static, browser-based app. The fastest way to try it locally is to run a small static server.

Requirements
- Node.js (recommended) — optional but makes running a local server easy

Run locally
1. From the project root, install dependencies:

```powershell
npm ci
```

2. Start a lightweight static server (binds to port 8002):

```powershell
npm run start

# Open http://localhost:8002 in your browser
```

If you prefer not to install dependencies, you can open `index.html` directly in a modern browser, but some features (local file access, service workers) may behave differently.

Deploy to GitHub Pages
----------------------

This repository includes a GitHub Actions workflow `.github/workflows/gh-pages.yml` which will publish the repository root to GitHub Pages (gh-pages branch) when you push to the `main` branch.

Steps:
1. Create a GitHub repository and push this project to it (default branch `main`).
2. Confirm the workflow (`gh-pages.yml`) exists under `.github/workflows/`.
3. Push to `main` — the Action will run and publish the site. After the action completes, enable Pages for the repository (should point to the `gh-pages` branch).

Next recommended quick wins
- Add an `index-v2.html` or gentler landing page with a short demo GIF + prominent "Play" button.
- Add a small analytics snippet (Plausible / GA) and an error-reporting stub.
- Create screenshots and a short demo GIF for the repo `README` so visitors can try without running locally.

