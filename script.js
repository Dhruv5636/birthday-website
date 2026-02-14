document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Magic Cursor Effect ---
    // Create particles on move
    const cursorContainer = document.getElementById('cursor-effects');
    
    function createMagicParticle(x, y) {
        const particle = document.createElement('div');
        particle.innerText = Math.random() > 0.5 ? '❤️' : '✨';
        particle.className = 'magic-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        
        // Random drift
        const xDrift = (Math.random() - 0.5) * 50;
        particle.style.setProperty('--x-drift', xDrift + 'px');
        
        cursorContainer.appendChild(particle);
        
        setTimeout(() => { particle.remove(); }, 1000);
    }

    // Mouse & Touch Events
    document.addEventListener('mousemove', (e) => {
        if(Math.random() > 0.8) createMagicParticle(e.clientX, e.clientY);
    });
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        if(Math.random() > 0.8) createMagicParticle(touch.clientX, touch.clientY);
    });

    // --- 1. Balloon Generator ---
    const balloonContainer = document.getElementById('balloon-container');
    const balloonColors = ['#ffafcc', '#a2d2ff', '#cdb4db', '#ffc8dd'];

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.animationDuration = (Math.random() * 5 + 10) + 's'; // 10-15s
        
        balloonContainer.appendChild(balloon);
        
        setTimeout(() => { balloon.remove(); }, 15000);
    }
    setInterval(createBalloon, 2000);

    // --- 2. Load Config ---
    if (CONFIG.theme) document.body.classList.add(`theme-${CONFIG.theme}`);

    document.title = CONFIG.pageTitle;
    document.getElementById('popup-title').innerText = CONFIG.popupTitle;
    document.getElementById('popup-text').innerText = CONFIG.popupText;
    document.getElementById('enter-btn').innerText = CONFIG.openingBtn;

    // Hero Avatar
    document.getElementById('hero-avatar').src = CONFIG.heroAvatar;
    document.getElementById('hero-title').innerHTML = CONFIG.heroTitle;
    document.getElementById('hero-msg').innerText = CONFIG.heroMsg;
    
    document.getElementById('letter-title').innerText = CONFIG.letterTitle;
    document.getElementById('letter-body').innerHTML = CONFIG.letterBody;

    // Music
    document.getElementById('track-name').innerText = CONFIG.musicTitle;
    const audio = document.getElementById('audio-player');
    audio.src = CONFIG.musicFile;

    // --- 3. Landing & Music ---
    const envelope = document.getElementById('envelope');
    const btn = document.getElementById('enter-btn');
    const landing = document.getElementById('landing-screen');
    const app = document.getElementById('app');
    const musicWidget = document.getElementById('music-control');

    btn.addEventListener('click', () => {
        envelope.classList.add('open');
        btn.style.opacity = '0';
        setTimeout(() => {
            landing.style.transform = 'translateY(-100vh)';
            app.classList.remove('hidden');
            musicWidget.classList.remove('hidden');
            audio.play().catch(() => console.log("User interaction needed for audio"));
        }, 1500);
    });

    const playBtn = document.getElementById('play-pause');
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerText = "⏸";
            document.querySelector('.vinyl').style.animationPlayState = 'running';
        } else {
            audio.pause();
            playBtn.innerText = "▶";
            document.querySelector('.vinyl').style.animationPlayState = 'paused';
        }
    });

    // --- 4. Render Timeline ---
    const timelineBox = document.getElementById('timeline-box');
    CONFIG.timeline.forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span style="font-size:0.8rem; color:var(--primary); font-weight:bold;">${item.date}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        timelineBox.appendChild(div);
    });

    // Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

    // --- 5. Render Quiz ---
    const quizContainer = document.getElementById('quiz-container');
    document.getElementById('quiz-title').innerText = CONFIG.quizTitle;
    
    CONFIG.quiz.forEach((q, qIndex) => {
        const qBox = document.createElement('div');
        qBox.style.marginBottom = "30px";
        qBox.innerHTML = `<h3 style="margin-bottom:10px">${q.question}</h3>`;
        
        q.options.forEach((opt, optIndex) => {
            const btn = document.createElement('button');
            btn.className = "quiz-option";
            btn.innerText = opt;
            btn.onclick = () => {
                if (btn.disabled) return; 
                const siblings = qBox.querySelectorAll('.quiz-option');
                siblings.forEach(s => s.disabled = true);

                if (optIndex === q.correct) {
                    btn.classList.add('correct');
                    const feedback = document.createElement('p');
                    feedback.className = "feedback-msg";
                    feedback.innerText = q.feedback;
                    qBox.appendChild(feedback);
                    confetti({ particleCount: 50, origin: { y: 0.7 } });
                } else {
                    btn.classList.add('wrong');
                    siblings[q.correct].classList.add('correct');
                }
            };
            qBox.appendChild(btn);
        });
        quizContainer.appendChild(qBox);
    });

    // --- 6. Render Open When ---
    const openWhenBox = document.getElementById('open-when-box');
    CONFIG.openWhen.forEach(item => {
        const card = document.createElement('div');
        card.className = "open-when-card";
        card.innerHTML = `<h3>${item.label}</h3><div class="open-when-content">${item.message}</div>`;
        card.addEventListener('click', () => { card.classList.toggle('open'); });
        openWhenBox.appendChild(card);
    });

    // --- 7. Render Gallery & Coupons ---
    const galleryBox = document.getElementById('gallery-box');
    CONFIG.gallery.forEach(src => {
        const img = document.createElement('img');
        img.src = `images/${src}`;
        img.className = 'gallery-img';
        img.onerror = () => { img.style.display = 'none'; };
        galleryBox.appendChild(img);
    });

    const couponBox = document.getElementById('coupon-box');
    CONFIG.coupons.forEach(coupon => {
        const card = document.createElement('div');
        card.className = 'coupon-card';
        card.innerHTML = `<h3>🎟️ ${coupon.title}</h3><p>${coupon.desc}</p><small>(Tap to Redeem)</small>`;
        card.addEventListener('click', () => {
            if (!card.classList.contains('redeemed')) {
                if (confirm(`Redeem "${coupon.title}"?`)) {
                    card.classList.add('redeemed');
                    card.querySelector('small').innerText = "(Redeemed ✅)";
                    confetti({ origin: { y: 0.8 } });
                }
            }
        });
        couponBox.appendChild(card);
    });
});

// --- 8. Cake Logic ---
let candlesBlown = 0;
function blowCandle(element) {
    const flame = element.querySelector('.flame');
    if (!flame.classList.contains('out')) {
        flame.classList.add('out');
        candlesBlown++;
        if (candlesBlown === 3) {
            document.getElementById('wish-msg').classList.remove('hidden');
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }
    }
}
