// Handle goal selection
document.addEventListener('DOMContentLoaded', () => {
    const goalItems = document.querySelectorAll('.goal-item');
    const continueBtn = document.querySelector('.continue-btn');
    const backButton = document.querySelector('.back-button');

    let selectedGoals = new Set();

    // Goal selection handler
    goalItems.forEach(item => {
        // Make it obvious the item is clickable
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', () => {
            // Toggle selected class
            item.classList.toggle('selected');
            
            const goalId = item.dataset.goal;
            if (item.classList.contains('selected')) {
                selectedGoals.add(goalId);
            } else {
                selectedGoals.delete(goalId);
            }
            
            // Enable/disable continue button based on selection
            continueBtn.disabled = selectedGoals.size === 0;
            
            // Add a subtle pop animation
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);

            console.log('Selected goals:', Array.from(selectedGoals));
        });
    });

    // Continue button handler
    continueBtn.addEventListener('click', () => {
        if (selectedGoals.size > 0) {
            // Store selected goals in localStorage
            localStorage.setItem('selectedGoals', JSON.stringify(Array.from(selectedGoals)));
            // Navigate to bank linking page
            window.location.href = '/onboarding/bank-link';
        }
    });
});

// Back button handler
backButton.addEventListener('click', () => {
    window.location.href = '/signup';
});

// Continue button handler
continueBtn.addEventListener('click', () => {
    // Store selected goals in localStorage for the next step
    localStorage.setItem('selectedGoals', JSON.stringify(Array.from(selectedGoals)));
    // Navigate to the bank linking page
    window.location.href = '/onboarding/bank-link';
});

// Dynamic welcome messages for goals page
const welcomeTexts = [
    "Choose what matters most to you",
    "Let's personalize your experience",
    "What are your financial priorities?",
    "Select your financial goals",
    "Build your financial roadmap"
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

// Ensure theme consistency
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.className = savedTheme;
    const icon = document.querySelector('.theme-toggle i');
    icon.className = savedTheme === 'dark-mode' ? 'fas fa-sun' : 'fas fa-moon';
}
