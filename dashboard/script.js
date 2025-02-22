document.addEventListener('DOMContentLoaded', () => {
    // Initialize trend chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        const trendData = {
            labels: ['Dec', 'Jan', 'Feb', 'Mar (Est)'],
            datasets: [{
                label: 'Monthly Expenses',
                data: [2450, 2600, 2650, 2750],
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-btn').trim(),
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-btn').trim(),
                pointRadius: 3,
                tension: 0.4
            }]
        };

        new Chart(trendCtx, {
            type: 'line',
            data: trendData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim(),
                            drawBorder: false,
                            tickLength: 0
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(),
                            font: {
                                size: 10
                            },
                            callback: value => '$' + value,
                            maxTicksLimit: 4
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(),
                            font: {
                                size: 10
                            },
                            maxRotation: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--card-bg').trim(),
                        titleColor: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
                        bodyColor: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim(),
                        borderWidth: 1,
                        padding: 8,
                        displayColors: false,
                        callbacks: {
                            label: context => '$' + context.parsed.y
                        }
                    }
                }
            }
        });
    }

    // Initialize spending donut chart
    const spendingCtx = document.getElementById('spendingDonut');
    if (spendingCtx) {
        const spendingData = {
            labels: ['Dining', 'Groceries', 'Subscriptions', 'Shopping', 'Utilities', 'Transport'],
            datasets: [{
                data: [540, 820, 145, 950, 245, 750],
                backgroundColor: [
                    '#FFA500', // Dining
                    '#00E19B', // Groceries
                    '#6D4AFF', // Subscriptions
                    '#4A90E2', // Shopping
                    '#FFD700', // Utilities
                    '#A0A0A0'  // Transport
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        };

        const spendingChart = new Chart(spendingCtx, {
            type: 'doughnut',
            data: spendingData,
            options: {
                cutout: '65%',
                responsive: true,
                maintainAspectRatio: true,
                layout: {
                    padding: 10
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0,
                        borderRadius: 6
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1000
                }
            }
        });
    }

    // Intersection Observer for score animation
    const scoreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scorePath = entry.target.querySelector('.score-path');
                if (scorePath) {
                    scorePath.style.animation = 'none';
                    scorePath.offsetHeight; // Trigger reflow
                    scorePath.style.animation = 'scoreProgress 1.5s ease forwards';
                }
            }
        });
    }, { threshold: 0.5 });

    const scoreCircle = document.querySelector('.score-circle');
    if (scoreCircle) {
        scoreObserver.observe(scoreCircle);
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;
    icon.className = savedTheme === 'dark-mode' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        body.className = isDarkMode ? 'light-mode' : 'dark-mode';
        icon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', body.className);
    });

    // AI Assistant Button
    const aiAssistantBtn = document.querySelector('.ai-assistant-btn');
    aiAssistantBtn.addEventListener('click', () => {
        // Show AI chat interface
        showAIChatInterface();
    });

    // Simulate real-time balance updates
    let currentBalance = 24562.84;
    setInterval(() => {
        const change = (Math.random() - 0.5) * 10;
        currentBalance += change;
        document.querySelector('.balance-amount').textContent = 
            `$${currentBalance.toFixed(2)}`;
        
        // Update trend
        const trend = document.querySelector('.ai-trend');
        const trendValue = ((currentBalance - 24562.84) / 24562.84) * 100;
        trend.innerHTML = `
            <i class="fas fa-arrow-trend-${trendValue >= 0 ? 'up' : 'down'}"></i>
            <span>${Math.abs(trendValue).toFixed(1)}%</span>
        `;
        trend.className = `ai-trend ${trendValue >= 0 ? 'positive' : 'negative'}`;
    }, 5000);

    // Action Buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.textContent;
            handleAction(action);
        });
    });

    // AI Chat Interface
    function showAIChatInterface() {
        const chatInterface = document.createElement('div');
        chatInterface.className = 'ai-chat-interface';
        chatInterface.innerHTML = `
            <div class="chat-header">
                <h3>AI Financial Assistant</h3>
                <button class="close-chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages">
                <div class="message ai">
                    <i class="fas fa-robot"></i>
                    <div class="message-content">
                        Hello! I'm your AI financial assistant. How can I help you today?
                        <div class="quick-actions">
                            <button>💰 Check my spending</button>
                            <button>📊 View budget analysis</button>
                            <button>💡 Get saving tips</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything about your finances...">
                <button>
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;

        document.body.appendChild(chatInterface);

        // Add chat interface styles
        const style = document.createElement('style');
        style.textContent = `
            .ai-chat-interface {
                position: fixed;
                bottom: 80px;
                right: 1.5rem;
                width: calc(100% - 3rem);
                max-width: 360px;
                height: 480px;
                background: var(--card-bg-light);
                border-radius: 16px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                animation: slideUp 0.3s ease;
            }

            .dark-mode .ai-chat-interface {
                background: var(--card-bg-dark);
            }

            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            .chat-header {
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--input-bg-light);
            }

            .dark-mode .chat-header {
                border-bottom-color: var(--input-bg-dark);
            }

            .close-chat {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }

            .close-chat:hover {
                opacity: 1;
            }

            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 1rem;
            }

            .message {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .message.ai {
                align-items: flex-start;
            }

            .message i {
                width: 32px;
                height: 32px;
                background: var(--input-bg-light);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .dark-mode .message i {
                background: var(--input-bg-dark);
            }

            .message-content {
                flex: 1;
                padding: 1rem;
                background: var(--input-bg-light);
                border-radius: 12px;
                border-top-left-radius: 4px;
                font-size: 14px;
            }

            .dark-mode .message-content {
                background: var(--input-bg-dark);
            }

            .quick-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 1rem;
            }

            .quick-actions button {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 20px;
                background: var(--card-bg-light);
                color: var(--text-light);
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .dark-mode .quick-actions button {
                background: var(--card-bg-dark);
                color: var(--text-dark);
            }

            .quick-actions button:hover {
                background: var(--primary-btn-light);
                color: white;
            }

            .dark-mode .quick-actions button:hover {
                background: var(--primary-btn-dark);
                color: var(--background-dark);
            }

            .chat-input {
                padding: 1rem;
                display: flex;
                gap: 0.5rem;
                border-top: 1px solid var(--input-bg-light);
            }

            .dark-mode .chat-input {
                border-top-color: var(--input-bg-dark);
            }

            .chat-input input {
                flex: 1;
                padding: 0.75rem;
                border: none;
                border-radius: 8px;
                background: var(--input-bg-light);
                color: var(--text-light);
                font-size: 14px;
            }

            .dark-mode .chat-input input {
                background: var(--input-bg-dark);
                color: var(--text-dark);
            }

            .chat-input button {
                width: 40px;
                height: 40px;
                border: none;
                border-radius: 20px;
                background: var(--primary-btn-light);
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .dark-mode .chat-input button {
                background: var(--primary-btn-dark);
                color: var(--background-dark);
            }
        `;
        document.head.appendChild(style);

        // Close chat
        const closeBtn = chatInterface.querySelector('.close-chat');
        closeBtn.addEventListener('click', () => {
            chatInterface.remove();
            style.remove();
        });

        // Quick action buttons
        const quickActions = chatInterface.querySelectorAll('.quick-actions button');
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                handleQuickAction(btn.textContent);
            });
        });

        // Chat input
        const input = chatInterface.querySelector('input');
        const sendBtn = chatInterface.querySelector('.chat-input button');
        
        function sendMessage() {
            if (input.value.trim()) {
                addUserMessage(input.value);
                handleUserMessage(input.value);
                input.value = '';
            }
        }

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        sendBtn.addEventListener('click', sendMessage);
    }

    // Handle user messages
    function addUserMessage(text) {
        const messages = document.querySelector('.chat-messages');
        const message = document.createElement('div');
        message.className = 'message user';
        message.innerHTML = `
            <div class="message-content" style="margin-left: auto; border-radius: 12px; border-top-right-radius: 4px;">
                ${text}
            </div>
        `;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function addAIMessage(text, quickActions = []) {
        const messages = document.querySelector('.chat-messages');
        const message = document.createElement('div');
        message.className = 'message ai';
        message.innerHTML = `
            <i class="fas fa-robot"></i>
            <div class="message-content">
                ${text}
                ${quickActions.length ? `
                    <div class="quick-actions">
                        ${quickActions.map(action => `
                            <button>${action}</button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function handleUserMessage(text) {
        // Simulate AI response
        setTimeout(() => {
            if (text.toLowerCase().includes('spending')) {
                addAIMessage(
                    "Based on your recent transactions, you've spent $2,140 this month. Your biggest expenses were:\n" +
                    "1. Rent: $1,200\n" +
                    "2. Groceries: $400\n" +
                    "3. Transportation: $200",
                    ["📊 View full breakdown", "💡 Get saving tips"]
                );
            } else if (text.toLowerCase().includes('budget')) {
                addAIMessage(
                    "You're currently under budget by $360! Here's your progress:\n" +
                    "✅ Essentials: 80% used\n" +
                    "✅ Discretionary: 60% used\n" +
                    "🎯 Savings: On track",
                    ["💰 Adjust budget", "📈 View trends"]
                );
            } else if (text.toLowerCase().includes('saving')) {
                addAIMessage(
                    "I've analyzed your spending and found potential savings:\n" +
                    "1. Switch to a cheaper phone plan (save $25/mo)\n" +
                    "2. Cancel unused subscriptions (save $30/mo)\n" +
                    "3. Use cashback credit card (earn ~$40/mo)",
                    ["💳 Compare cards", "📱 Review subscriptions"]
                );
            } else {
                addAIMessage(
                    "I can help you with spending analysis, budgeting, and saving tips. What would you like to know?",
                    ["💰 Check my spending", "📊 View budget analysis", "💡 Get saving tips"]
                );
            }
        }, 1000);
    }

    function handleQuickAction(action) {
        // Handle quick action button clicks
        if (action.includes('Check my spending')) {
            handleUserMessage('Show me my spending');
        } else if (action.includes('View budget')) {
            handleUserMessage('Show me my budget');
        } else if (action.includes('saving tips')) {
            handleUserMessage('Give me saving tips');
        }
    }

    function handleAction(action) {
        // Handle main UI action button clicks
        switch(action) {
            case 'Adjust Budget':
                window.location.href = '/onboarding/budget-setup';
                break;
            case 'Pay Now':
                // Show payment interface
                break;
            case 'Review Plan':
                // Show subscription management
                break;
        }
    }
});
