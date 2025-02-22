document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    const budgetSlider = document.getElementById('budgetSlider');
    const budgetInput = document.getElementById('budgetInput');
    const aiToggle = document.getElementById('aiToggle');
    const breakdownContent = document.getElementById('breakdownContent');
    const backButton = document.querySelector('.back-button');
    const skipBtn = document.querySelector('.skip-btn');
    const continueBtn = document.querySelector('.continue-btn');
    const aiIncomeSection = document.getElementById('aiIncomeSection');

    // Theme handling
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;
    icon.className = savedTheme === 'dark-mode' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        body.className = isDarkMode ? 'light-mode' : 'dark-mode';
        icon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', body.className);
    });

    // Check if bank was connected in previous step
    const connectedBank = localStorage.getItem('connectedBank');
    if (connectedBank) {
        // Show AI income detection section
        aiIncomeSection.style.display = 'block';
        // Simulate detected income (random between 3000-8000)
        const detectedIncome = Math.floor(Math.random() * 5000) + 3000;
        document.getElementById('detectedIncome').textContent = detectedIncome.toLocaleString();
        // Set initial budget to detected income
        budgetSlider.value = detectedIncome;
        budgetInput.value = detectedIncome;
        updateBudgetBreakdown(detectedIncome);
    }

    // Budget slider and input sync
    budgetSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        budgetInput.value = value;
        updateBudgetBreakdown(value);
    });

    budgetInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        if (value < 1000) value = 1000;
        if (value > 20000) value = 20000;
        budgetSlider.value = value;
        updateBudgetBreakdown(value);
    });

    // AI toggle functionality
    aiToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            // Apply AI suggestions animation
            const categories = breakdownContent.querySelectorAll('.category');
            categories.forEach((category, index) => {
                setTimeout(() => {
                    category.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        category.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        }
    });

    // Custom Categories
    const addCategoryBtn = document.querySelector('.add-category-btn');
    const customCategoriesList = document.getElementById('customCategoriesList');
    
    addCategoryBtn.addEventListener('click', () => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'custom-category';
        
        categoryDiv.innerHTML = `
            <div class="category-inputs">
                <input type="text" class="category-name-input" placeholder="Category Name">
                <input type="number" class="category-amount-input" placeholder="Amount" min="0">
            </div>
            <button class="remove-category-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        const removeBtn = categoryDiv.querySelector('.remove-category-btn');
        removeBtn.addEventListener('click', () => {
            categoryDiv.remove();
            updateBudgetBreakdown(parseInt(budgetInput.value));
        });
        
        const amountInput = categoryDiv.querySelector('.category-amount-input');
        amountInput.addEventListener('input', () => {
            updateBudgetBreakdown(parseInt(budgetInput.value));
        });
        
        customCategoriesList.appendChild(categoryDiv);
    });

    // Update budget breakdown
    function updateBudgetBreakdown(total) {
        let customTotal = 0;
        
        // Calculate total from custom categories
        document.querySelectorAll('.category-amount-input').forEach(input => {
            const amount = parseFloat(input.value) || 0;
            customTotal += amount;
        });
        
        // Update remaining budget for default categories
        const remainingBudget = Math.max(0, total - customTotal);
        const essentialAmount = Math.round(remainingBudget * 0.5);
        const discretionaryAmount = Math.round(remainingBudget * 0.3);
        const savingsAmount = remainingBudget - essentialAmount - discretionaryAmount;

        document.querySelector('.essential-amount').textContent = essentialAmount.toLocaleString();
        document.querySelector('.discretionary-amount').textContent = discretionaryAmount.toLocaleString();
        document.querySelector('.savings-amount').textContent = savingsAmount.toLocaleString();
    }

    // Navigation
    backButton.addEventListener('click', () => {
        window.location.href = '/onboarding/bank-link';
    });

    skipBtn.addEventListener('click', () => {
        continueBtn.disabled = false;
        skipBtn.textContent = 'Skipped';
        skipBtn.style.opacity = '0.7';
        skipBtn.disabled = true;
        // Store skipped state
        localStorage.setItem('budgetSetup', 'skipped');
    });

    continueBtn.addEventListener('click', () => {
        // Store budget information
        const budgetData = {
            total: parseInt(budgetInput.value),
            breakdown: {
                essential: Math.round(budgetInput.value * 0.5),
                discretionary: Math.round(budgetInput.value * 0.3),
                savings: Math.round(budgetInput.value * 0.2)
            },
            aiSuggestions: aiToggle.checked
        };
        localStorage.setItem('budgetSetup', JSON.stringify(budgetData));
        // Navigate to dashboard or next step
        window.location.href = '/dashboard';
    });

    // Dynamic welcome messages
    const welcomeTexts = [
        "Plan your finances by setting a budget",
        "Smart budgeting for your goals",
        "AI-powered budget recommendations",
        "Customize your spending categories",
        "Track and optimize your spending"
    ];

    const dynamicText = document.querySelector('.dynamic-text');
    let currentTextIndex = 0;

    function changeWelcomeText() {
        dynamicText.style.opacity = '0';
        
        setTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % welcomeTexts.length;
            dynamicText.textContent = welcomeTexts[currentTextIndex];
            dynamicText.style.opacity = '1';
        }, 500);
    }

    setInterval(changeWelcomeText, 5000);
});
