// Water ripple simulation
const canvas = document.getElementById('water-sim');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const ripples = [];

function createRipple(x, y) {
    ripples.push({ x, y, radius: 0, opacity: 1 });
}

function drawRipples() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < ripples.length; i++) {
        const ripple = ripples[i];
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52, 152, 219, ${ripple.opacity})`;
        ctx.stroke();
        
        ripple.radius += 2;
        ripple.opacity -= 0.02;
        
        if (ripple.opacity <= 0) {
            ripples.splice(i, 1);
            i--;
        }
    }
    
    if (Math.random() < 0.05) {
        createRipple(Math.random() * width, Math.random() * height);
    }
    
    requestAnimationFrame(drawRipples);
}

drawRipples();

// Project cards
const projects = [
    { name: "Project 1", description: "A brief description of Project 1." },
    { name: "Project 2", description: "A brief description of Project 2." },
    { name: "Project 3", description: "A brief description of Project 3." }
];

function createProjectCards() {
    const container = document.getElementById('project-container');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
        `;
        container.appendChild(card);
    });
}

createProjectCards();

// Fade-in animation
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= windowHeight * 0.8) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);

// Water droplet name reveal animation
function revealName() {
    const nameElement = document.getElementById('name-reveal');
    const nameText = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.opacity = 1;

    const letters = nameText.split('');
    letters.forEach((letter, index) => {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.style.display = 'inline-block';
        letterSpan.style.opacity = '0';
        letterSpan.style.transform = 'translateY(-50px)';
        letterSpan.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        letterSpan.style.transitionDelay = `${Math.random() * 2000}ms`;
        nameElement.appendChild(letterSpan);

        setTimeout(() => {
            letterSpan.style.opacity = '1';
            letterSpan.style.transform = 'translateY(0)';
        }, 100 + Math.random() * 1000);
    });
}

// Start animations
document.addEventListener('DOMContentLoaded', () => {
    revealName();
    handleScrollAnimation();
});

// Make sure project cards are visible
setTimeout(() => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => card.classList.add('visible'));
}, 500);
