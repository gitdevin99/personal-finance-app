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
    "Welcome back to your financial dashboard",
    "Let's check on your progress",
    "Your finances missed you",
    "Ready to review your budget?",
    "Let's continue your financial journey"
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
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    resetErrors();
    
    let hasErrors = false;
    
    // Email validation
    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        hasErrors = true;
    }
    
    // Password validation
    if (passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Show loading state
    const loginButton = document.getElementById('loginButton');
    loginButton.disabled = true;
    loginButton.classList.add('loading');
    loginButton.textContent = '';
    
    try {
        // Simulate API call - replace with actual login API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect to dashboard on success
        window.location.href = '/dashboard';
    } catch (error) {
        showError(emailInput, 'Invalid email or password');
        showError(passwordInput, '');
    } finally {
        loginButton.disabled = false;
        loginButton.classList.remove('loading');
        loginButton.textContent = 'Login';
    }
});

function showError(input, message) {
    input.classList.add('error');
    const errorSpan = input.parentElement.querySelector('.error-message');
    errorSpan.textContent = message;
    shakeElement(input);
}

function resetErrors() {
    const inputs = [emailInput, passwordInput];
    inputs.forEach(input => {
        input.classList.remove('error');
        const errorSpan = input.parentElement.querySelector('.error-message');
        errorSpan.textContent = '';
    });
}

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
