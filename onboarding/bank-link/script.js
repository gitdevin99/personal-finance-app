// Handle bank search
const bankSearch = document.getElementById('bankSearch');
const banksList = document.querySelector('.banks-list');
const bankItems = document.querySelectorAll('.bank-item');
const continueBtn = document.querySelector('.continue-btn');
const skipBtn = document.querySelector('.skip-btn');
const backButton = document.querySelector('.back-button');
const loadingOverlay = document.querySelector('.loading-overlay');
const successModal = document.querySelector('.success-modal');

// Search functionality
bankSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    bankItems.forEach(item => {
        const bankName = item.querySelector('.bank-name').textContent.toLowerCase();
        if (bankName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Connect button handlers
const connectButtons = document.querySelectorAll('.connect-btn');
connectButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const bankItem = button.closest('.bank-item');
        const bankName = bankItem.querySelector('.bank-name').textContent;
        
        // Show loading overlay
        loadingOverlay.style.display = 'flex';
        
        // Simulate API call to LeanTech
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Hide loading overlay and show success modal
        loadingOverlay.style.display = 'none';
        successModal.style.display = 'flex';
        
        // Store connected bank in localStorage
        localStorage.setItem('connectedBank', bankName);
        
        // Enable continue button
        continueBtn.disabled = false;
        
        // Auto-continue after success message
        setTimeout(() => {
            successModal.style.display = 'none';
        }, 3000);
    });
});

// Skip button handler
skipBtn.addEventListener('click', () => {
    continueBtn.disabled = false;
    skipBtn.textContent = 'Skipped';
    skipBtn.style.opacity = '0.7';
    skipBtn.disabled = true;
});

// Back button handler
backButton.addEventListener('click', () => {
    window.location.href = '/onboarding/goals';
});

// Check if user came from goals page
const selectedGoals = localStorage.getItem('selectedGoals');
if (!selectedGoals) {
    // If user didn't select goals, redirect back to goals page
    window.location.href = '/onboarding/goals';
}

// Continue button handler
continueBtn.addEventListener('click', () => {
    // Navigate to next step (to be implemented)
    console.log('Proceeding to next step...');
});

// Dynamic welcome messages for bank linking page
const welcomeTexts = [
    "Connect securely with LeanTech",
    "Link your accounts safely",
    "Get a complete view of your finances",
    "Secure bank connection",
    "Your security is our priority"
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
