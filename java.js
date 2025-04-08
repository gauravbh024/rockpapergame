// Galaxy Background
const spaceCanvas = document.getElementById('space-canvas');
const spaceCtx = spaceCanvas.getContext('2d');
spaceCanvas.width = window.innerWidth;
spaceCanvas.height = window.innerHeight;

// Stars
const stars = [];
const numStars = 300;
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * spaceCanvas.width,
        y: Math.random() * spaceCanvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1
    });
}

// Planets
const planets = [];
const numPlanets = 5;
const planetColors = [
    'rgba(255, 100, 100, 0.7)',
    'rgba(100, 255, 100, 0.7)',
    'rgba(100, 100, 255, 0.7)',
    'rgba(255, 255, 100, 0.7)',
    'rgba(255, 100, 255, 0.7)'
];

for (let i = 0; i < numPlanets; i++) {
    planets.push({
        x: Math.random() * spaceCanvas.width,
        y: Math.random() * spaceCanvas.height,
        radius: Math.random() * 15 + 10,
        color: planetColors[i],
        speed: Math.random() * 0.2 + 0.05,
        angle: Math.random() * Math.PI * 2
    });
}

// Nebulas
const nebulas = [];
const numNebulas = 3;

for (let i = 0; i < numNebulas; i++) {
    nebulas.push({
        x: Math.random() * spaceCanvas.width,
        y: Math.random() * spaceCanvas.height,
        radius: Math.random() * 200 + 100,
        color1: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100}, ${Math.random() * 155 + 100}, 0.1)`,
        color2: `rgba(${Math.random() * 100}, ${Math.random() * 100 + 155}, ${Math.random() * 155 + 100}, 0.1)`
    });
}

function drawSpace() {
    // Clear canvas
    spaceCtx.fillStyle = '#000';
    spaceCtx.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);
    
    // Draw nebulas
    for (const nebula of nebulas) {
        const gradient = spaceCtx.createRadialGradient(
            nebula.x, nebula.y, 0,
            nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color1);
        gradient.addColorStop(1, 'transparent');
        
        spaceCtx.beginPath();
        spaceCtx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        spaceCtx.fillStyle = gradient;
        spaceCtx.fill();
        
        const gradient2 = spaceCtx.createRadialGradient(
            nebula.x + nebula.radius * 0.3, nebula.y - nebula.radius * 0.3, 0,
            nebula.x + nebula.radius * 0.3, nebula.y - nebula.radius * 0.3, nebula.radius * 0.7
        );
        gradient2.addColorStop(0, nebula.color2);
        gradient2.addColorStop(1, 'transparent');
        
        spaceCtx.beginPath();
        spaceCtx.arc(nebula.x + nebula.radius * 0.3, nebula.y - nebula.radius * 0.3, nebula.radius * 0.7, 0, Math.PI * 2);
        spaceCtx.fillStyle = gradient2;
        spaceCtx.fill();
    }
    
    // Draw and update stars
    spaceCtx.fillStyle = '#fff';
    for (const star of stars) {
        spaceCtx.beginPath();
        spaceCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        spaceCtx.fill();
        
        // Move stars
        star.y += star.speed;
        if (star.y > spaceCanvas.height) {
            star.y = 0;
            star.x = Math.random() * spaceCanvas.width;
        }
    }
    
    // Draw and update planets
    for (const planet of planets) {
        spaceCtx.beginPath();
        spaceCtx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        spaceCtx.fillStyle = planet.color;
        spaceCtx.fill();
        
        // Create ring for some planets
        if (planet.radius > 20) {
            spaceCtx.beginPath();
            spaceCtx.ellipse(
                planet.x, planet.y,
                planet.radius * 1.5, planet.radius * 0.5,
                Math.PI / 4, 0, Math.PI * 2
            );
            spaceCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            spaceCtx.lineWidth = 3;
            spaceCtx.stroke();
        }
        
        // Move planets in circular paths
        planet.angle += planet.speed / 100;
        planet.x = spaceCanvas.width / 2 + Math.cos(planet.angle) * (spaceCanvas.width / 3);
        planet.y = spaceCanvas.height / 2 + Math.sin(planet.angle) * (spaceCanvas.height / 3);
    }
    
    requestAnimationFrame(drawSpace);
}

// Start the space animation
drawSpace();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    spaceCanvas.width = window.innerWidth;
    spaceCanvas.height = window.innerHeight;
});

// Game logic
const options = ['rock', 'paper', 'scissors'];
const emojis = {
    'rock': '🪨',
    'paper': '📄',
    'scissors': '✂️'
};

let playerScore = 0;
let computerScore = 0;
let lastComputerChoice = null;
let consecutiveLosses = 0;

const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const playerChoiceElem = document.getElementById('player-choice');
const computerChoiceElem = document.getElementById('computer-choice');
const resultElem = document.getElementById('result');
const cardInner = document.getElementById('card-inner');

// Fireworks canvas
const fireworksCanvas = document.getElementById('fireworks-canvas');
const fireworksCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.exploded = false;
        
        for (let i = 0; i < 80; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: this.color
            });
        }
    }
    
    update() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.alpha -= 0.01;
        }
        
        this.particles = this.particles.filter(p => p.alpha > 0);
        return this.particles.length > 0;
    }
    
    draw() {
        fireworksCtx.globalCompositeOperation = 'lighter';
        for (const p of this.particles) {
            fireworksCtx.fillStyle = p.color;
            fireworksCtx.globalAlpha = p.alpha;
            fireworksCtx.beginPath();
            fireworksCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            fireworksCtx.fill();
        }
        fireworksCtx.globalCompositeOperation = 'source-over';
        fireworksCtx.globalAlpha = 1;
    }
}

const fireworks = [];

function animateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    for (let i = 0; i < fireworks.length; i++) {
        const firework = fireworks[i];
        const active = firework.update();
        firework.draw();
        
        if (!active) {
            fireworks.splice(i, 1);
            i--;
        }
    }
    
    if (fireworks.length > 0) {
        requestAnimationFrame(animateFireworks);
    }
}

function createFireworks() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = Math.random() * fireworksCanvas.width;
            const y = Math.random() * fireworksCanvas.height * 0.5;
            fireworks.push(new Firework(x, y));
            if (i === 0) {
                animateFireworks();
            }
        }, i * 300);
    }
}

function getComputerChoice() {
    // Don't repeat the last choice
    let availableOptions = [...options];
    if (lastComputerChoice) {
        availableOptions = availableOptions.filter(option => option !== lastComputerChoice);
    }
    
    // If player has lost 5 times in a row, let them win
    if (consecutiveLosses >= 5) {
        const playerChoice = document.querySelector('.option.selected').id;
        switch (playerChoice) {
            case 'rock': return 'scissors';
            case 'paper': return 'rock';
            case 'scissors': return 'paper';
        }
    }
    
    return availableOptions[Math.floor(Math.random() * availableOptions.length)];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        consecutiveLosses = 0;
        playerScoreElem.textContent = playerScore;
        
        if (playerScore % 5 === 0) {
            createFireworks();
            return '🎉 You win! 🎉';
        }
        
        return 'You win!';
    } else {
        computerScore++;
        consecutiveLosses++;
        computerScoreElem.textContent = computerScore;
        return 'Computer wins!';
    }
}

// Add click event listeners to options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove selected class from all options
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
            opt.classList.remove('bounce');
        });
        
        // Add selected class to clicked option
        this.classList.add('selected');
        this.classList.add('bounce');
        
        // Set player choice
        const playerChoice = this.id;
        playerChoiceElem.textContent = emojis[playerChoice];
        playerChoiceElem.classList.add('pulse');
        
        // Get computer choice
        const computerChoice = getComputerChoice();
        lastComputerChoice = computerChoice;
        
        // Show computer choice with animation
        cardInner.classList.add('flip');
        setTimeout(() => {
            computerChoiceElem.textContent = emojis[computerChoice];
        }, 150);
        
        // Determine winner after animation
        setTimeout(() => {
            const result = determineWinner(playerChoice, computerChoice);
            resultElem.textContent = result;
            resultElem.classList.add('shake');
            
            // Reset animations
            setTimeout(() => {
                playerChoiceElem.classList.remove('pulse');
                resultElem.classList.remove('shake');
            }, 500);
            
            setTimeout(() => {
                cardInner.classList.remove('flip');
            }, 1500);
        }, 600);
    });
});

// Reset animations after they complete
playerChoiceElem.addEventListener('animationend', () => {
    playerChoiceElem.classList.remove('pulse');
});

resultElem.addEventListener('animationend', () => {
    resultElem.classList.remove('shake');
});
