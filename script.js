document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('hero');
    const openBtn = document.getElementById('open-surprise-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const flame = document.getElementById('flame');
    const cutBtn = document.getElementById('cut-cake-btn');
    const fallingContainer = document.getElementById('falling-container');

    // --- Interaction 1: Open Surprise ---
    openBtn.addEventListener('click', () => {
        hero.style.transition = 'opacity 1.5s ease';
        hero.style.opacity = '0';

        setTimeout(() => {
            hero.style.display = 'none';
            mainContent.classList.remove('hidden');
            // Play music (handle autoplay policy)
            if (bgMusic) {
                bgMusic.volume = 0.5;
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
            }
        }, 1500);

        startFallingElements();
    });

    // Start fireflies
    startFireflies();

    function startFireflies() {
        const fireflyContainer = document.getElementById('firefly-container');
        if (!fireflyContainer) return;

        const count = 30;
        for (let i = 0; i < count; i++) {
            const fly = document.createElement('div');
            fly.classList.add('firefly');
            fly.style.left = Math.random() * 100 + '%';
            fly.style.top = Math.random() * 100 + '%';
            fly.style.animationDuration = (Math.random() * 5 + 5) + 's';
            fly.style.animationDelay = (Math.random() * 5) + 's';
            fireflyContainer.appendChild(fly);
        }
    }

    // --- Interaction 2: Falling Elements ---
    function startFallingElements() {
        const symbols = ['🌸', '❤️', '✨', '🌹'];
        setInterval(() => {
            const el = document.createElement('div');
            el.classList.add('falling-item');
            el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.animationDuration = (Math.random() * 3 + 5) + 's';
            el.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            el.style.opacity = Math.random() * 0.5 + 0.5;
            fallingContainer.appendChild(el);
            setTimeout(() => el.remove(), 8000);
        }, 300);
    }

    // --- Interaction 3: Blow Candle ---
    let blowTimeout;
    if (flame) {
        // Desktop
        flame.addEventListener('mouseenter', () => blowTimeout = setTimeout(extinguish, 800));
        flame.addEventListener('mouseleave', () => clearTimeout(blowTimeout));
        // Mobile
        flame.addEventListener('touchstart', (e) => {
            e.preventDefault();
            blowTimeout = setTimeout(extinguish, 800);
        });
        flame.addEventListener('touchend', () => clearTimeout(blowTimeout));
    }

    function extinguish() {
        if (!flame.classList.contains('out')) {
            flame.classList.add('out');
            cutBtn.classList.remove('hidden');
            cutBtn.classList.add('fade-in-up');
        }
    }

    // --- Interaction 4: Cut Cake (Knife Animation) ---
    if (cutBtn) {
        cutBtn.addEventListener('click', () => {
            cutBtn.innerText = "Cutting...";
            cutBtn.disabled = true;

            const knife = document.getElementById('knife');
            if (knife) {
                // Show knife
                knife.classList.remove('hidden');
                knife.classList.add('animate');

                // Wait for animation to finish (approx 2.5s)
                setTimeout(() => {
                    // Trigger confetti
                    triggerConfetti();
                    cutBtn.innerText = "YAY! Let's Eat! 🍰";

                    // Hide knife after it's done
                    knife.classList.add('hidden');
                    knife.classList.remove('animate');

                    // Show Envelope Surprise
                    setTimeout(() => {
                        const giftSection = document.getElementById('gift-reveal');
                        if (giftSection) {
                            giftSection.classList.remove('hidden');
                            giftSection.classList.add('fade-in-up');
                            giftSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 1000);

                }, 2500); // Sync with CSS animation duration
            }
        });
    }

    // --- Interaction 5: Envelope Reveal ---
    const envelopeContainer = document.getElementById('envelope-container');
    if (envelopeContainer) {
        envelopeContainer.addEventListener('click', () => {
            const envelope = envelopeContainer.querySelector('.envelope');
            if (envelope && !envelope.classList.contains('open')) {
                envelope.classList.add('open');
                // Trigger confetti again for the reveal
                setTimeout(triggerConfetti, 500);
            }
        });
    }

    // Confetti Logic
    function triggerConfetti() {
        const count = 150;
        for (let i = 0; i < count; i++) {
            createConfettiPiece();
        }
    }

    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * 50 + 50 + 'vh';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '1000';

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 10;

        document.body.appendChild(confetti);

        let x = parseFloat(confetti.style.left);
        let y = parseFloat(confetti.style.top);
        let gravity = 0.5;
        let opacity = 1;
        let currentDy = dy;

        const anim = setInterval(() => {
            x += dx;
            y += currentDy;
            currentDy += gravity;
            opacity -= 0.02;

            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(anim);
                confetti.remove();
            }
        }, 20);
    }

    function getRandomColor() {
        const colors = ['#ffc0cb', '#b76e79', '#ffd700', '#ffffff', '#ff69b4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});