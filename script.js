// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to corresponding nav link
    const targetNavLink = document.querySelector(`[href="#${sectionId}"]`);
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
    // Beep sound removed per user request
    // playBeep();
}

// PDF opening functionality
function openPDF(pdfPath) {
    // Open PDF in new window/tab
    window.open(pdfPath, '_blank');
    // playBeep(); // Removed per user request
}

// Update the displayed manual page
function updateManualPage(pdfPath, pageTitle) {
    const manualPdf = document.getElementById('manual-pdf');
    const manualTitle = document.getElementById('manual-title');
    
    if (manualPdf && manualTitle) {
        manualPdf.src = pdfPath;
        manualTitle.textContent = pageTitle;
    }
}

// Simulated retro beep sound
function playBeep() {
    // Create a simple beep using Web Audio API
    if (typeof(AudioContext) !== "undefined" || typeof(webkitAudioContext) !== "undefined") {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800; // Retro beep frequency
            oscillator.type = 'square'; // Square wave for retro sound
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Fallback: no sound if audio context fails
            console.log('Audio not available');
        }
    }
}

// Navigation event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const sectionId = href.substring(1); // Remove the '#'
            showSection(sectionId);
        });
    });
    
    // Gameboy control interactions
    const dpadButtons = document.querySelectorAll('.dpad-up, .dpad-down, .dpad-left, .dpad-right');
    const actionButtons = document.querySelectorAll('.btn-a, .btn-b');
    const systemButtons = document.querySelectorAll('.btn-select, .btn-start');
    
    // D-pad navigation
    dpadButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            // playBeep(); // Removed per user request
            
            // Navigate sections with D-pad
            const currentSection = document.querySelector('.section.active');
            const currentId = currentSection ? currentSection.id : 'home';
            
            if (this.classList.contains('dpad-right')) {
                navigateNext(currentId);
            } else if (this.classList.contains('dpad-left')) {
                navigatePrevious(currentId);
            }
        });
    });
    
    // Action buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'translateY(4px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            // playBeep(); // Removed per user request
            
            // A button activates primary action
            if (this.classList.contains('btn-a')) {
                const currentSection = document.querySelector('.section.active');
                if (currentSection && currentSection.id === 'home') {
                    showSection('game');
                }
            }
        });
    });
    
    // System buttons
    systemButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.background = '#555';
            setTimeout(() => {
                this.style.background = '#333';
            }, 100);
            // playBeep(); // Removed per user request
            
            if (this.classList.contains('btn-start')) {
                showSection('home');
            }
        });
    });
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                const currentSection = document.querySelector('.section.active');
                const currentId = currentSection ? currentSection.id : 'home';
                navigatePrevious(currentId);
                break;
            case 'ArrowRight':
                e.preventDefault();
                const currentSection2 = document.querySelector('.section.active');
                const currentId2 = currentSection2 ? currentSection2.id : 'home';
                navigateNext(currentId2);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                const currentSection3 = document.querySelector('.section.active');
                if (currentSection3 && currentSection3.id === 'home') {
                    showSection('game');
                }
                break;
            case 'Escape':
                e.preventDefault();
                showSection('home');
                break;
        }
    });
    
    // Screen flicker effect removed per user request
    // addScreenFlicker();
    
    // Add retro loading animation
    addLoadingAnimation();
});

// Navigation helpers
function navigateNext(currentId) {
    const sections = ['home', 'game', 'instructions', 'gallery'];
    const currentIndex = sections.indexOf(currentId);
    const nextIndex = (currentIndex + 1) % sections.length;
    showSection(sections[nextIndex]);
}

function navigatePrevious(currentId) {
    const sections = ['home', 'game', 'instructions', 'gallery'];
    const currentIndex = sections.indexOf(currentId);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    showSection(sections[prevIndex]);
}

// Retro screen effects
function addScreenFlicker() {
    const screen = document.querySelector('.screen');
    if (screen) {
        setInterval(() => {
            if (Math.random() < 0.02) { // 2% chance every interval
                screen.style.filter = 'brightness(1.1) contrast(1.1)';
                setTimeout(() => {
                    screen.style.filter = '';
                }, 50);
            }
        }, 100);
    }
}

// Loading animation
function addLoadingAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            body.style.transition = 'opacity 0.5s ease-in';
            body.style.opacity = '1';
            
            // Splash screen removed per user request
            // showStartupText();
        }, 100);
    });
}

function showStartupText() {
    const startupDiv = document.createElement('div');
    startupDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #9bbc0f;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            font-family: 'Press Start 2P', monospace;
            font-size: 24px;
            color: #0f380f;
        ">
            PACKS GAME
        </div>
    `;
    
    document.body.appendChild(startupDiv);
    
    setTimeout(() => {
        startupDiv.style.transition = 'opacity 0.5s ease-out';
        startupDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(startupDiv);
        }, 500);
    }, 1500);
}

// Download functionality (placeholder)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-gameboy')) {
        alert('ROM download would be implemented here!\n\nThis would typically link to your .gb or .gbc file.');
        // playBeep(); // Removed per user request
    }
    
    if (e.target.classList.contains('btn-emulator')) {
        alert('Browser emulator would be implemented here!\n\nThis could integrate with JS-based Game Boy emulators.');
        // playBeep(); // Removed per user request
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length) {
        let match = true;
        for (let i = 0; i < konamiSequence.length; i++) {
            if (konamiCode[i] !== konamiSequence[i]) {
                match = false;
                break;
            }
        }
        
        if (match) {
            activateEasterEgg();
            konamiCode = [];
        }
    }
});

function activateEasterEgg() {
    const screen = document.querySelector('.screen');
    screen.style.filter = 'hue-rotate(180deg) saturate(2)';
    
    // Beep sounds removed per user request
    // for (let i = 0; i < 5; i++) {
    //     setTimeout(() => playBeep(), i * 200);
    // }
    
    // Show easter egg message
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #0f380f;
            color: #9bbc0f;
            padding: 20px;
            border: 2px solid #9bbc0f;
            font-family: 'Press Start 2P', monospace;
            font-size: 8px;
            text-align: center;
            z-index: 9999;
            animation: pulse 1s infinite;
        ">
            🎮 KONAMI CODE ACTIVATED! 🎮<br><br>
            RETRO MODE ENABLED!<br>
            PRESS ESC TO RETURN
        </div>
    `;
    
    document.body.appendChild(easterEgg);
    
    // Reset after 5 seconds or ESC key
    const resetEasterEgg = () => {
        screen.style.filter = '';
        if (document.body.contains(easterEgg)) {
            document.body.removeChild(easterEgg);
        }
        document.removeEventListener('keydown', escapeHandler);
    };
    
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            resetEasterEgg();
        }
    };
    
    document.addEventListener('keydown', escapeHandler);
    setTimeout(resetEasterEgg, 5000);
}

// CSS animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.05); }
    }
`;
document.head.appendChild(style);
