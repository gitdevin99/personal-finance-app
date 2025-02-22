// Chart Configuration
// Detect if we're on mobile
const isMobile = window.innerWidth < 768;

const chartConfig = {
    donutChart: {
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: isMobile ? '65%' : '75%',
            plugins: {
                legend: {
                    position: isMobile ? 'bottom' : 'right',
                    align: 'center',
                    labels: {
                        padding: isMobile ? 10 : 20,
                        usePointStyle: true,
                        boxWidth: isMobile ? 8 : 10,
                        font: {
                            size: isMobile ? 11 : 12
                        }
                    }
                }
            }
        }
    },
    barChart: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: isMobile ? 11 : 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Monthly Spending Trends',
                    font: {
                        size: isMobile ? 13 : 14
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: isMobile ? 10 : 12
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: isMobile ? 10 : 12
                        }
                    }
                }
            }
        }
    }
};

// Initialize Charts
function initializeCharts() {
    // Donut Chart
    const donutCtx = document.getElementById('spendingDonut').getContext('2d');
    const donutData = {
        labels: ['Dining', 'Groceries', 'Subscriptions', 'Shopping', 'Utilities', 'Transport'],
        datasets: [{
            data: [540, 820, 145, 950, 245, 750],
            backgroundColor: ['#FFA500', '#00E19B', '#6D4AFF', '#4A90E2', '#FFD700', '#A0A0A0'],
            borderWidth: 0
        }]
    };
    window.donutChart = new Chart(donutCtx, {
        ...chartConfig.donutChart,
        data: donutData
    });

    // Bar Chart
    const barCtx = document.getElementById('monthlyTrendChart').getContext('2d');
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Monthly Spending',
            data: [3200, 3450, 3100, 3600, 3200, 3450],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };
    window.barChart = new Chart(barCtx, {
        ...chartConfig.barChart,
        data: barData
    });
}

// Handle Time Filter
function initializeTimeFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Update chart data based on selected period
            updateChartData(btn.dataset.period);
        });
    });
}

// Handle Chart Expansion
function initializeChartExpansion() {
    const expandableElements = document.querySelectorAll('.expandable');
    
    expandableElements.forEach(element => {
        element.addEventListener('click', () => {
            // Toggle expanded class
            element.classList.toggle('expanded');
            
            // If element is expanded, add overlay and close button
            if (element.classList.contains('expanded')) {
                const overlay = document.createElement('div');
                overlay.className = 'chart-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                `;
                
                const closeBtn = document.createElement('button');
                closeBtn.className = 'close-btn';
                closeBtn.innerHTML = '×';
                closeBtn.style.cssText = `
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: var(--text-color);
                    cursor: pointer;
                    z-index: 1001;
                `;
                
                element.appendChild(closeBtn);
                document.body.appendChild(overlay);
                
                // Handle closing
                const closeChart = () => {
                    element.classList.remove('expanded');
                    overlay.remove();
                    closeBtn.remove();
                };
                
                overlay.addEventListener('click', closeChart);
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeChart();
                });
            }
            
            // Update chart size
            const chartId = element.querySelector('canvas').id;
            if (chartId === 'spendingDonut') {
                window.donutChart.resize();
            } else if (chartId === 'monthlyTrendChart') {
                window.barChart.resize();
            }
        });
    });
}

// Update Chart Data based on Time Period
function updateChartData(period) {
    // Sample data for different time periods
    const data = {
        '1W': {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [500, 600, 450, 700, 800, 1000, 400]
        },
        '1M': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [2200, 2400, 2100, 2700]
        },
        '6M': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [3200, 3450, 3100, 3600, 3200, 3450]
        },
        '1Y': {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            data: [9800, 10200, 9600, 10400]
        }
    };

    // Update bar chart
    window.barChart.data.labels = data[period].labels;
    window.barChart.data.datasets[0].data = data[period].data;
    window.barChart.update();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeTimeFilter();
    initializeChartExpansion();
});
