// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.className = savedTheme;
    icon.className = savedTheme === 'dark-mode' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    // Save preference
    localStorage.setItem('theme', body.className);
});

// Dynamic welcome text
const welcomeTexts = [
    "Ready to take control of your finances?",
    "Let's make your money work smarter",
    "Your financial journey begins here",
    "Smart budgeting starts now",
    "Welcome to financial freedom"
];

const dynamicText = document.getElementById('dynamicText');
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

// Form handling
const form = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!isValidEmail(emailInput.value)) {
        shakeElement(emailInput);
        return;
    }
    
    if (passwordInput.value.length < 6) {
        shakeElement(passwordInput);
        return;
    }
    
    // Here you would typically handle the form submission
    console.log('Form submitted:', {
        email: emailInput.value,
        password: passwordInput.value
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeElement(element) {
    element.classList.add('shake');
    element.addEventListener('animationend', () => {
        element.classList.remove('shake');
    }, { once: true });
}

// Social sign-in buttons
document.querySelector('.google-btn').addEventListener('click', () => {
    console.log('Google sign-in clicked');
    // Implement Google sign-in
});

document.querySelector('.apple-btn').addEventListener('click', () => {
    console.log('Apple sign-in clicked');
    // Implement Apple sign-in
});

// AI Assistant animation
const aiAssistant = document.querySelector('.ai-icon');
aiAssistant.addEventListener('mouseover', () => {
    aiAssistant.style.transform = 'scale(1.1) translateY(-5px)';
});

aiAssistant.addEventListener('mouseout', () => {
    aiAssistant.style.transform = 'scale(1) translateY(0)';
});
