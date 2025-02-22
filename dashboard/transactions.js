// Sample transaction data
const transactions = [
    {
        id: 1,
        merchant: 'Whole Foods Market',
        category: 'groceries',
        amount: 89.50,
        date: '2025-02-22',
        logo: 'fa-shopping-basket'
    },
    {
        id: 2,
        merchant: 'Netflix',
        category: 'subscriptions',
        amount: 14.99,
        date: '2025-02-21',
        logo: 'fa-play'
    },
    {
        id: 3,
        merchant: 'Uber Eats',
        category: 'dining',
        amount: 35.25,
        date: '2025-02-20',
        logo: 'fa-utensils'
    },
    // Add more sample transactions as needed
];

// Category mappings
const categoryIcons = {
    groceries: { icon: 'fa-shopping-basket', color: '#00E19B' },
    dining: { icon: 'fa-utensils', color: '#FFA500' },
    entertainment: { icon: 'fa-film', color: '#6D4AFF' },
    shopping: { icon: 'fa-shopping-bag', color: '#4A90E2' },
    subscriptions: { icon: 'fa-repeat', color: '#FF4B55' },
    bills: { icon: 'fa-file-invoice-dollar', color: '#FFD700' },
    rent: { icon: 'fa-home', color: '#A0A0A0' }
};

// AI-powered category prediction
function predictCategory(merchant, amount) {
    // This is a simple simulation of AI categorization
    // In a real app, this would use machine learning
    const merchantLower = merchant.toLowerCase();
    
    if (merchantLower.includes('netflix') || merchantLower.includes('spotify')) {
        return 'subscriptions';
    } else if (merchantLower.includes('uber') || merchantLower.includes('restaurant')) {
        return 'dining';
    } else if (merchantLower.includes('market') || merchantLower.includes('foods')) {
        return 'groceries';
    } else if (amount > 1000) {
        return 'rent';
    } else {
        return 'shopping';
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
    }).format(date);
}

// Render transaction item
function renderTransaction(transaction) {
    const category = predictCategory(transaction.merchant, transaction.amount);
    const { icon, color } = categoryIcons[category] || categoryIcons.shopping;
    
    return `
        <div class="transaction-item">
            <div class="merchant-logo" style="background: ${color}20">
                <i class="fas ${icon}" style="color: ${color}"></i>
            </div>
            <div class="transaction-details">
                <div class="merchant-name">${transaction.merchant}</div>
                <div class="transaction-meta">
                    <span>${formatDate(transaction.date)}</span>
                    <span class="category-tag ${category}">${category}</span>
                </div>
            </div>
            <div class="transaction-amount">
                ${formatCurrency(transaction.amount)}
            </div>
        </div>
    `;
}

// Filter transactions
function filterTransactions(filters) {
    return transactions.filter(transaction => {
        const matchesSearch = !filters.search || 
            transaction.merchant.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchesCategory = !filters.category || 
            predictCategory(transaction.merchant, transaction.amount) === filters.category;
        
        const matchesAmount = !filters.maxAmount || 
            transaction.amount <= filters.maxAmount;
        
        const matchesDate = !filters.startDate || !filters.endDate || 
            (transaction.date >= filters.startDate && transaction.date <= filters.endDate);
        
        return matchesSearch && matchesCategory && matchesAmount && matchesDate;
    });
}

// Update transactions list
function updateTransactionsList() {
    const filters = {
        search: document.getElementById('searchInput').value,
        category: document.getElementById('categoryFilter').value,
        maxAmount: document.getElementById('amountRange').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value
    };
    
    const filteredTransactions = filterTransactions(filters);
    const transactionsContainer = document.getElementById('transactionsList');
    
    transactionsContainer.innerHTML = filteredTransactions
        .map(renderTransaction)
        .join('');
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    updateTransactionsList();
    
    // Search input
    document.getElementById('searchInput').addEventListener('input', updateTransactionsList);
    
    // Category filter
    document.getElementById('categoryFilter').addEventListener('change', updateTransactionsList);
    
    // Amount range
    const amountRange = document.getElementById('amountRange');
    const maxAmount = document.getElementById('maxAmount');
    
    amountRange.addEventListener('input', (e) => {
        const value = e.target.value;
        maxAmount.textContent = value === '1000' ? '$1000+' : formatCurrency(value);
        updateTransactionsList();
    });
    
    // Date filters
    document.getElementById('startDate').addEventListener('change', updateTransactionsList);
    document.getElementById('endDate').addEventListener('change', updateTransactionsList);
});
