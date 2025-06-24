// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>`;
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
        body.classList.remove('light-theme');
        themeToggle.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>`;
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }
    localStorage.setItem('theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(currentTheme);
});

// Sidebar navigation
const navButtons = document.querySelectorAll('.sidebar button');
const sections = document.querySelectorAll('section');

// Click navigation
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sectionId = button.getAttribute('data-section');
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer for highlighting
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60% 0px',
    threshold: [0.1, 0.5, 0.9]
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            const sectionId = entry.target.id;
            navButtons.forEach(button => {
                button.classList.toggle('active', button.getAttribute('data-section') === sectionId);
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Project carousel
const projects = document.querySelectorAll('.project');
const carouselIndicators = document.querySelector('.carousel-indicators');
const prevButton = document.querySelector('.carousel-controls .prev');
const nextButton = document.querySelector('.carousel-controls .next');
let currentProject = 0;

// Dynamically create indicators based on number of projects
function createIndicators() {
    carouselIndicators.innerHTML = '';
    projects.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.toggle('active', index === 0);
        carouselIndicators.appendChild(indicator);
    });
}

// Show project at given index
function showProject(index) {
    projects.forEach((project, i) => {
        project.classList.toggle('active', i === index);
    });
    const indicators = document.querySelectorAll('.carousel-indicators button');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    currentProject = index;
}

// Initialize carousel
createIndicators();
showProject(currentProject);

// Event listeners for navigation
prevButton.addEventListener('click', () => {
    showProject((currentProject - 1 + projects.length) % projects.length);
});

nextButton.addEventListener('click', () => {
    showProject((currentProject + 1) % projects.length);
});

carouselIndicators.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = Array.from(carouselIndicators.children).indexOf(e.target);
        showProject(index);
    }
});

// Auto-rotate carousel every 5 seconds
setInterval(() => {
    showProject((currentProject + 1) % projects.length);
}, 10000);

// Form submission
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Message sent! Thank you for reaching out. I\'ll get back to you soon.');
    form.reset();
});