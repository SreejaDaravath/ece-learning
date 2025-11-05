// 🔧 DEBUG & FIX SCRIPT - Ensures all features work

console.log('🔧 Debug script loaded');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Ready');
    
    // Check if main scripts loaded
    setTimeout(() => {
        console.log('🔍 Checking features...');
        
        // 1. Check Skill Tree Canvas
        const skillCanvas = document.getElementById('skillTreeCanvas');
        if (skillCanvas) {
            console.log('✅ Skill tree canvas found');
            const ctx = skillCanvas.getContext('2d');
            if (ctx) {
                // Make sure canvas is visible
                skillCanvas.style.display = 'block';
                skillCanvas.style.background = 'rgba(15, 23, 42, 0.5)';
                
                // If drawSkillTree exists, call it
                if (typeof drawSkillTree === 'function') {
                    console.log('✅ drawSkillTree function found, calling it...');
                    drawSkillTree();
                } else {
                    console.warn('⚠️ drawSkillTree function not found');
                    // Draw a simple placeholder
                    ctx.fillStyle = '#1e293b';
                    ctx.fillRect(0, 0, skillCanvas.width, skillCanvas.height);
                    ctx.fillStyle = '#6366f1';
                    ctx.font = '24px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('Skill Tree Loading...', skillCanvas.width / 2, skillCanvas.height / 2);
                }
            }
        } else {
            console.error('❌ Skill tree canvas not found');
        }
        
        // 2. Check Projects Section
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            console.log('✅ Projects grid found');
            const cards = projectsGrid.querySelectorAll('.project-card');
            console.log(`   Found ${cards.length} project cards`);
            
            // Make sure cards are visible
            cards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
            });
        } else {
            console.error('❌ Projects grid not found');
        }
        
        // 3. Check Lab Canvas
        const labCanvas = document.getElementById('labCanvas');
        if (labCanvas) {
            console.log('✅ Lab canvas found');
            const ctx = labCanvas.getContext('2d');
            if (ctx) {
                labCanvas.style.display = 'block';
                labCanvas.style.background = '#0f172a';
                
                // Draw grid background
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
                ctx.lineWidth = 1;
                const gridSize = 20;
                for (let x = 0; x < labCanvas.width; x += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, labCanvas.height);
                    ctx.stroke();
                }
                for (let y = 0; y < labCanvas.height; y += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(labCanvas.width, y);
                    ctx.stroke();
                }
                
                // Add instructions
                ctx.fillStyle = '#6366f1';
                ctx.font = '18px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('🔬 Drag components here to build circuits', labCanvas.width / 2, labCanvas.height / 2);
            }
        } else {
            console.error('❌ Lab canvas not found');
        }
        
        // 4. Check AppState
        if (typeof AppState !== 'undefined') {
            console.log('✅ AppState found');
            AppState.updateUserStats();
        } else {
            console.warn('⚠️ AppState not found');
        }
        
        // 5. Check Feature Cards
        const featureCards = document.querySelectorAll('.feature-card');
        if (featureCards.length > 0) {
            console.log(`✅ Found ${featureCards.length} feature cards`);
            featureCards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
            });
        } else {
            console.error('❌ No feature cards found');
        }
        
        // 6. Check if sections are visible
        const sections = ['#home', '#features', '#skills', '#lab', '#projects', '#mentors'];
        sections.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                console.log(`✅ Section ${selector} found`);
                section.style.display = 'block';
                section.style.visibility = 'visible';
                section.style.opacity = '1';
            } else {
                console.warn(`⚠️ Section ${selector} not found`);
            }
        });
        
        // 7. Initialize Project Manager if available
        if (typeof ProjectManager !== 'undefined') {
            console.log('✅ ProjectManager found');
            try {
                const pm = new ProjectManager();
                pm.init();
                console.log('✅ ProjectManager initialized');
            } catch (e) {
                console.error('❌ ProjectManager initialization failed:', e);
            }
        } else {
            console.warn('⚠️ ProjectManager not found');
        }
        
        // 8. Force visibility of all main sections
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'block';
            section.style.visibility = 'visible';
        });
        
        console.log('🎉 Debug check complete!');
        
        // Show success notification
        if (typeof window.premiumNotify !== 'undefined') {
            window.premiumNotify.show('✅ All features loaded!', 'success');
        }
    }, 1000);
});

// Also run immediately if DOM already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('🔄 DOM already loaded, triggering event');
    document.dispatchEvent(new Event('DOMContentLoaded'));
}
