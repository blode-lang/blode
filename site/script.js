// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Typing Simulation Logic
const consoleOutput = document.getElementById('runtime-box');
const messages = [
    { text: "Initializing Blode v0.1.0...", delay: 500 },
    { text: "Loading <sysio> standard library...", delay: 800 },
    { text: "Scanning main action...", delay: 400 },
    { text: "> sys.clear()", delay: 600, color: '#888' },
    { text: "Package installation simulation starting...", delay: 500 },
    { text: "[PROGRESS] Downloading 'pytorch' (192.3 MB)", delay: 1000 },
    { text: "#################### 100%", delay: 1500 },
    { text: "Successfully installed torch-2.1.0", delay: 300 },
    { text: "Blode execution finished with code 0", delay: 1000 }
];

let msgIndex = 0;

function runSimulation() {
    if (msgIndex < messages.length) {
        const msg = messages[msgIndex];
        const p = document.createElement('p');
        p.style.marginBottom = "8px";
        if (msg.color) p.style.color = msg.color;
        
        consoleOutput.insertBefore(p, consoleOutput.lastElementChild);
        
        // Typewriter effect for each line
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < msg.text.length) {
                p.textContent += msg.text[charIndex];
                charIndex++;
                setTimeout(typeChar, 30);
            } else {
                msgIndex++;
                setTimeout(runSimulation, msg.delay);
            }
        };
        typeChar();
    }
}

// Start simulation when section is visible
const simObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        setTimeout(runSimulation, 500);
        simObserver.disconnect();
    }
});
simObserver.observe(document.querySelector('.simulation'));

// Parallax effect for header
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    document.querySelector('.glitch').style.transform = `translateY(${scroll * 0.3}px)`;
});
