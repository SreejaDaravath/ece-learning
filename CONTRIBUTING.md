# 🤝 Contributing to ECE MASTER

Thank you for your interest in contributing! This project aims to make electronics learning accessible and fun for everyone.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/ece-learning.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test locally: `npm ci && npm start`
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 💡 Ways to Contribute

### 🐛 Report Bugs
- Use the [issue tracker](https://github.com/yourusername/ece-learning/issues)
- Include browser version, OS, and steps to reproduce
- Screenshots/videos help a lot!

### ✨ Suggest Features
- Open an issue with the `enhancement` label
- Describe the problem and your proposed solution
- Consider educational value and accessibility

### 📝 Improve Documentation
- Fix typos, clarify instructions
- Add examples or diagrams
- Translate to new languages

### 🎨 Design Improvements
- Better component icons or sprites
- Improved UI/UX
- Accessibility enhancements

### 🔧 Add Levels or Features
- Create new circuit challenges
- Add new components (transistors, capacitors, etc.)
- Implement new measurement tools

## 📋 Development Guidelines

### Code Style
- Use clear, descriptive variable names
- Comment complex logic
- Keep functions small and focused
- Follow existing code patterns

### Testing
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify keyboard navigation works
- Check mobile responsiveness
- Test offline functionality (PWA)

### Commits
- Use clear commit messages: `Add: feature`, `Fix: bug`, `Update: docs`
- One logical change per commit
- Reference issue numbers: `Fix: #123 - Component placement bug`

## 🎓 Level Design Guidelines

When creating new levels:

1. **Educational Value** - Each level should teach one concept
2. **Progressive Difficulty** - Build on previous levels
3. **Clear Goals** - Players should know what to achieve
4. **Helpful Hints** - Provide guidance without giving answers
5. **Test Thoroughly** - Ensure the circuit validation works correctly

### Example Level Structure

```javascript
{
  id: 51,
  title: "Your Level Title",
  module: "Advanced Electronics",
  description: "Clear, concise task description",
  goal: "Specific success criteria",
  components: ['battery-5v', 'led-red', 'resistor-220'],
  maxTime: 90,
  hint: "Helpful hint without spoilers",
  successCriteria: {
    type: 'led_on',
    // ... validation logic
  },
  demo: {
    // Optional demo circuit
  }
}
```

## 🌍 Translation Guidelines

To add a new language:

1. Edit `main.js` - add your language to the `I18N` object
2. Follow the existing structure (English/Hindi examples)
3. Update the language selector in `index.html`
4. Test all UI strings render correctly

## ♿ Accessibility Requirements

All contributions must maintain or improve accessibility:

- ✅ Keyboard navigable
- ✅ Screen reader friendly (ARIA labels)
- ✅ Sufficient color contrast (WCAG AA)
- ✅ No flashing/strobing content
- ✅ Text alternatives for visual content

## 📦 Pull Request Process

1. Update README.md if needed
2. Update USER_GUIDE.md if adding features
3. Ensure all tests pass (if applicable)
4. Request review from maintainers
5. Address feedback promptly

## 🎯 Priority Areas

Currently looking for help with:

- 🌍 Translations (Spanish, French, German, Chinese, etc.)
- 📱 Mobile UX improvements
- 🎨 Better graphics and animations
- 📊 More measurement tools (oscilloscope, logic analyzer)
- 🔧 Advanced components (transistors, op-amps, capacitors)
- 🎓 Curriculum alignment with ECE courses

## ❓ Questions?

- Open a [Discussion](https://github.com/yourusername/ece-learning/discussions)
- Check existing issues and PRs
- Read the [User Guide](USER_GUIDE.md)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help create a positive learning environment

---

**Thank you for making electronics education better for everyone! ⚡🎓**
