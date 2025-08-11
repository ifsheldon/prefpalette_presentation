// Application state
let currentTab = 0;
const tabs = ['overview', 'method', 'findings', 'connections', 'discussion'];

// DOM elements
const tabButtons = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const progressIndicator = document.querySelector('.progress-indicator');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const expandableCards = document.querySelectorAll('.expandable-card');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeExpandableCards();
    initializeNavigation();
    initializeKeyboardNavigation();
    applyTabFromQueryParam();
    updateUI();
});

// Tab functionality
function initializeTabs() {
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            switchToTab(index);
        });
    });
}

function switchToTab(index) {
    if (index < 0 || index >= tabs.length) return;
    
    // Update current tab index
    currentTab = index;
    
    // Update tab buttons
    tabButtons.forEach((button, i) => {
        if (i === index) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update tab contents with smooth transition
    tabContents.forEach((content, i) => {
        if (i === index) {
            content.classList.remove('hidden');
            content.classList.add('active');
            // Smooth scroll to top when switching tabs
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            content.classList.add('hidden');
            content.classList.remove('active');
        }
    });
    
    updateUI();
}

// Expandable cards functionality
function initializeExpandableCards() {
    expandableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent event if clicking on a link or button inside the card
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            toggleCard(this);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(this);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');
    });
}

function toggleCard(card) {
    const expandableContent = card.querySelector('.expandable-content');
    const expandIcon = card.querySelector('.expand-icon');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse the card
        card.classList.remove('expanded');
        expandableContent.classList.remove('expanded');
        expandableContent.classList.add('hidden');
        expandIcon.textContent = '+';
        card.setAttribute('aria-expanded', 'false');
    } else {
        // Expand the card
        card.classList.add('expanded');
        expandableContent.classList.remove('hidden');
        expandableContent.classList.add('expanded');
        expandIcon.textContent = '×';
        card.setAttribute('aria-expanded', 'true');
    }
}

// Navigation functionality
function initializeNavigation() {
    prevBtn.addEventListener('click', () => {
        if (currentTab > 0) {
            switchToTabWithFocus(currentTab - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentTab < tabs.length - 1) {
            switchToTabWithFocus(currentTab + 1);
        }
    });
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Only handle arrow keys when not in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                if (currentTab > 0) {
                    e.preventDefault();
                    switchToTab(currentTab - 1);
                }
                break;
            case 'ArrowRight':
                if (currentTab < tabs.length - 1) {
                    e.preventDefault();
                    switchToTab(currentTab + 1);
                }
                break;
        }
    });
}

// Read ?tab=... from URL and switch accordingly
function applyTabFromQueryParam() {
    try {
        const url = new URL(window.location.href);
        const tabParam = url.searchParams.get('tab');
        if (!tabParam) return;
        const index = tabs.indexOf(tabParam);
        if (index !== -1) {
            switchToTab(index);
        }
    } catch (_) {
        // no-op
    }
}

// Update UI elements based on current state
function updateUI() {
    // Update progress bar
    const progressPercentage = ((currentTab + 1) / tabs.length) * 100;
    progressIndicator.style.width = `${progressPercentage}%`;
    
    // Update navigation buttons
    prevBtn.disabled = currentTab === 0;
    nextBtn.disabled = currentTab === tabs.length - 1;
    
    // Update button text for last tab
    if (currentTab === tabs.length - 1) {
        nextBtn.textContent = 'Discussion Complete';
        nextBtn.classList.remove('btn--primary');
        nextBtn.classList.add('btn--secondary');
    } else {
        nextBtn.textContent = 'Next →';
        nextBtn.classList.add('btn--primary');
        nextBtn.classList.remove('btn--secondary');
    }
}

// Utility functions for smooth animations
function fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    const start = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    const start = performance.now();
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = initialOpacity * (1 - progress);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// Add smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recalculate any size-dependent elements if needed
        updateResponsiveElements();
    }, 250);
});

function updateResponsiveElements() {
    // Handle responsive adjustments if needed
    const windowWidth = window.innerWidth;
    
    // Adjust tab display on mobile
    if (windowWidth < 768) {
        tabButtons.forEach(tab => {
            tab.style.fontSize = 'var(--font-size-xs)';
        });
    } else {
        tabButtons.forEach(tab => {
            tab.style.fontSize = 'var(--font-size-sm)';
        });
    }
}

// Add intersection observer for scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Add CSS class for scroll animations
const style = document.createElement('style');
style.textContent = `
    .card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered animation delay for cards in a grid */
    .card-grid .card:nth-child(1) { transition-delay: 0ms; }
    .card-grid .card:nth-child(2) { transition-delay: 100ms; }
    .card-grid .card:nth-child(3) { transition-delay: 200ms; }
    .card-grid .card:nth-child(4) { transition-delay: 300ms; }
    .card-grid .card:nth-child(5) { transition-delay: 400ms; }
    .card-grid .card:nth-child(6) { transition-delay: 500ms; }
`;
document.head.appendChild(style);

// Handle focus management for accessibility
function manageFocus() {
    // When switching tabs, focus should go to the content area
    const activeTabContent = document.querySelector('.tab-content.active');
    if (activeTabContent) {
        const firstFocusableElement = activeTabContent.querySelector('button, [tabindex="0"], a, input, select, textarea');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    }
}

// Enhanced tab switching with focus management
function switchToTabWithFocus(index) {
    switchToTab(index);
    setTimeout(manageFocus, 100); // Small delay to ensure DOM is updated
}

// Navigation listeners are attached in initializeNavigation using focus-aware switching

// Add escape key handler to close expanded cards
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close all expanded cards
        const expandedCards = document.querySelectorAll('.expandable-card.expanded');
        expandedCards.forEach(card => {
            toggleCard(card);
        });
    }
});

// Initialize theme handling if needed
function initializeTheme() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
    } else if (systemDark) {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
    } else {
        document.documentElement.setAttribute('data-color-scheme', 'light');
    }
}

// Note: Theme functionality is available but not used as per strict instructions
// initializeTheme();

// Export functions for potential external use
window.PrefPaletteApp = {
    switchToTab,
    toggleCard,
    currentTab: () => currentTab,
    totalTabs: tabs.length
};