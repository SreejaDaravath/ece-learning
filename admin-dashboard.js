// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentSection = 'overview';
        this.activityInterval = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadOverviewData();
        this.startLiveActivityFeed();
        this.setupCharts();
        this.loadUsers();
        this.loadContent();
        this.loadAssignments();
    }

    // Navigation
    setupNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);
                
                // Update active state
                menuItems.forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    switchSection(section) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(s => {
            s.classList.remove('active');
        });

        // Show selected section
        document.getElementById(`${section}-section`).classList.add('active');
        
        // Update header
        const titles = {
            overview: 'Dashboard Overview',
            users: 'User Management',
            content: 'Content Management',
            analytics: 'Analytics & Reports',
            assignments: 'Assignments Management',
            live: 'Live Sessions',
            simulator: 'Simulator Controls',
            settings: 'Platform Settings'
        };
        
        document.getElementById('section-title').textContent = titles[section] || section;
        this.currentSection = section;
    }

    // Load Overview Data
    loadOverviewData() {
        // Simulate real-time data
        setInterval(() => {
            this.updateStats();
        }, 5000);
    }

    updateStats() {
        // Simulate stat updates
        const totalUsers = document.getElementById('total-users');
        const currentValue = parseInt(totalUsers.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 3);
        
        this.animateNumber(totalUsers, currentValue, newValue, 1000);
    }

    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Live Activity Feed
    startLiveActivityFeed() {
        const feed = document.getElementById('live-activity-feed');
        const activities = [
            'Student <strong>Ravi Kumar</strong> completed <strong>Ohm\'s Law</strong> module',
            'Faculty <strong>Dr. Sharma</strong> created new assignment',
            'Student <strong>Priya Singh</strong> submitted project',
            'New user <strong>Aditya Reddy</strong> registered',
            'Student <strong>Sneha Patel</strong> unlocked achievement 🏆',
            'Faculty <strong>Prof. Rao</strong> started live session',
            'Student <strong>Kiran Kumar</strong> earned 50 XP',
            'System backup completed successfully',
            'Student <strong>Neha Sharma</strong> asked AI tutor a question',
            'Faculty <strong>Dr. Gupta</strong> graded 15 assignments'
        ];

        this.activityInterval = setInterval(() => {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                ${randomActivity}
                <span class="activity-time">Just now</span>
            `;
            
            feed.insertBefore(activityItem, feed.firstChild);
            
            // Keep only last 10 activities
            if (feed.children.length > 10) {
                feed.removeChild(feed.lastChild);
            }
        }, 3000);
    }

    // Setup Charts
    setupCharts() {
        // Activity Chart
        const activityCtx = document.getElementById('activityChart');
        if (activityCtx) {
            new Chart(activityCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Active Users',
                        data: [45, 62, 58, 72, 85, 90, 95],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Performance Chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            new Chart(performanceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Excellent (90-100)', 'Good (75-89)', 'Average (60-74)', 'Below (0-59)'],
                    datasets: [{
                        data: [45, 35, 15, 5],
                        backgroundColor: [
                            '#43e97b',
                            '#4facfe',
                            '#f093fb',
                            '#f5576c'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    // Load Users
    loadUsers() {
        const users = [
            { name: 'Ravi Kumar', role: 'student', progress: 85, lastActive: '2 min ago' },
            { name: 'Dr. Sharma', role: 'faculty', progress: 100, lastActive: '5 min ago' },
            { name: 'Priya Singh', role: 'student', progress: 72, lastActive: '10 min ago' },
            { name: 'Aditya Reddy', role: 'student', progress: 45, lastActive: '1 hour ago' },
            { name: 'Prof. Rao', role: 'faculty', progress: 100, lastActive: '30 min ago' },
            { name: 'Sneha Patel', role: 'student', progress: 91, lastActive: '5 min ago' },
            { name: 'Kiran Kumar', role: 'student', progress: 67, lastActive: '2 hours ago' },
            { name: 'Dr. Gupta', role: 'faculty', progress: 100, lastActive: '15 min ago' }
        ];

        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        tbody.innerHTML = users.map(user => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random" 
                             alt="${user.name}" 
                             style="width: 35px; height: 35px; border-radius: 50%;">
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>
                    <span class="role-badge ${user.role}">${user.role}</span>
                </td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${user.progress}%"></div>
                    </div>
                    <span style="font-size: 12px; color: #666; margin-left: 10px;">${user.progress}%</span>
                </td>
                <td>${user.lastActive}</td>
                <td>
                    <button class="control-btn" style="padding: 8px 12px; font-size: 12px;">View</button>
                    <button class="control-btn" style="padding: 8px 12px; font-size: 12px;">Edit</button>
                </td>
            </tr>
        `).join('');
    }

    // Load Content
    loadContent() {
        const skills = [
            { name: 'Electronics Basics', concepts: 8, students: 145, status: 'active' },
            { name: 'Ohm\'s Law', concepts: 5, students: 132, status: 'active' },
            { name: 'Resistors', concepts: 7, students: 98, status: 'draft' },
            { name: 'Capacitors', concepts: 6, students: 87, status: 'active' },
            { name: 'Transistors', concepts: 9, students: 76, status: 'active' },
            { name: 'Logic Gates', concepts: 8, students: 124, status: 'active' }
        ];

        const contentGrid = document.getElementById('content-grid');
        if (!contentGrid) return;

        contentGrid.innerHTML = skills.map(skill => `
            <div class="stat-card" style="flex-direction: column; align-items: flex-start;">
                <h3>${skill.name}</h3>
                <p style="color: #666; margin: 10px 0;">${skill.concepts} concepts | ${skill.students} students</p>
                <span class="role-badge ${skill.status === 'active' ? 'faculty' : 'student'}">${skill.status}</span>
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button class="control-btn" style="padding: 8px 12px; font-size: 12px;">Edit</button>
                    <button class="control-btn" style="padding: 8px 12px; font-size: 12px;">Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Load Assignments
    loadAssignments() {
        const assignments = [
            { title: 'Circuit Analysis Lab 1', dueDate: '2025-11-10', submissions: 45, total: 60 },
            { title: 'Ohm\'s Law Problem Set', dueDate: '2025-11-08', submissions: 58, total: 60 },
            { title: 'Transistor Project', dueDate: '2025-11-15', submissions: 12, total: 60 },
            { title: 'Logic Gates Quiz', dueDate: '2025-11-06', submissions: 60, total: 60 }
        ];

        const assignmentsGrid = document.getElementById('assignments-grid');
        if (!assignmentsGrid) return;

        assignmentsGrid.innerHTML = assignments.map(assignment => `
            <div class="stat-card" style="flex-direction: column; align-items: flex-start;">
                <h3>${assignment.title}</h3>
                <p style="color: #666; margin: 10px 0;">Due: ${assignment.dueDate}</p>
                <div class="progress-bar" style="width: 200px; margin: 10px 0;">
                    <div class="progress-fill" style="width: ${(assignment.submissions / assignment.total) * 100}%"></div>
                </div>
                <p style="font-size: 12px; color: #666;">${assignment.submissions}/${assignment.total} submissions</p>
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button class="control-btn" style="padding: 8px 12px; font-size: 12px;">View</button>
                    <button class="control-btn" style="padding: 8px 12px; font-size: 12px;">Grade</button>
                </div>
            </div>
        `).join('');
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});
