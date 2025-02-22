document.addEventListener('DOMContentLoaded', () => {
    const expandBtn = document.querySelector('.expand-btn');
    const insightsContainer = document.querySelector('.insights-container');
    let isExpanded = false;

    // Set initial state
    insightsContainer.style.maxHeight = '400px';

    expandBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        // Toggle the container height
        if (isExpanded) {
            insightsContainer.style.maxHeight = insightsContainer.scrollHeight + 'px';
            expandBtn.querySelector('i').classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            insightsContainer.style.maxHeight = '400px';
            expandBtn.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // Add hover effect to insight items
    const insightItems = document.querySelectorAll('.insight-item');
    insightItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
});
