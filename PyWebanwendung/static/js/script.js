document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('bubble-container');
    const popup = document.getElementById('message-popup');
    const popupText = document.getElementById('popup-text');
    const popupDate = document.getElementById('popup-date');
    const popupLikes = document.getElementById('popup-likes');
    const popupForm = document.getElementById('popup-form');
    const closeBtn = document.getElementById('close-popup');
    const aboutSection = document.getElementById('about-section');
    const btnOpenAbout = document.getElementById('btn-open-about');
    const btnCloseAbout = document.getElementById('btn-close-about');

    // About section
    if (btnOpenAbout && aboutSection) {
        btnOpenAbout.addEventListener('click', () => {
            aboutSection.classList.add('open');
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    if (btnCloseAbout && aboutSection) {
        btnCloseAbout.addEventListener('click', () => {
            aboutSection.classList.remove('open');
        });
    }

    function initBubbles() {
        const bubbles = document.querySelectorAll('.bubble');

        bubbles.forEach(bubble => {
            if (bubble.dataset.initialized) return;

            const size = Math.floor(Math.random() * 50) + 50;
            const leftPos = Math.random() * 90;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * -20;

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${leftPos}vw`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;

            bubble.dataset.initialized = "true";

            bubble.addEventListener('click', () => {
                container.classList.add('paused');
                popupText.textContent = `"${bubble.dataset.text}"`;
                popupDate.textContent = `Veröffentlicht am: ${bubble.dataset.date}`;
                popupLikes.textContent = bubble.dataset.likes;
                popupForm.action = bubble.dataset.url;

                const rect = bubble.getBoundingClientRect();
                popup.style.left = `${rect.left + (size / 2)}px`;
                popup.style.top = `${rect.top}px`;
                popup.classList.add('active');
            });
        });
    }

    initBubbles();

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        container.classList.remove('paused');
    });

    // automatischer Refresh, ohne ganze Seite neu zu laden (damit Musik weiterläuft)
    setInterval(() => {
        fetch(window.location.href)
            .then(response => response.text())
            .then(html => {
                // Wir wandeln den geladenen Text in HTML um
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Wir nehmen NUR den Bubble-Container aus der neuen Seite...
                const newBubbles = doc.getElementById('bubble-container').innerHTML;

                // ...und ersetzen unseren aktuellen Container damit.
                // Die Musik und der Rest der Seite spielen ungestört weiter!
                container.innerHTML = newBubbles;

                // Bälle neu initialisieren
                initBubbles();
            })
            .catch(err => console.error('Fehler beim Aktualisieren der Nachrichten:', err));
    }, 15000);
});

// Musik

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');

    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    const trackPosition = localStorage.getItem('musicPosition') || 0;

    audio.currentTime = trackPosition;

    if (isPlaying) {
        audio.play().then(() => {
            toggleBtn.innerHTML = "⏸️ Musik pausieren";
        }).catch(error => {
            console.log("Browser hat Autoplay blockiert. User muss erst klicken.");
            toggleBtn.innerHTML = "🎵 Musik abspielen";
            localStorage.setItem('musicPlaying', 'false');
        });
    } else {
        toggleBtn.innerHTML = "🎵 Musik abspielen";
    }

    // Play Button
    toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            toggleBtn.innerHTML = "⏸️ Musik pausieren";
            localStorage.setItem('musicPlaying', 'true');
        } else {
            audio.pause();
            toggleBtn.innerHTML = "🎵 Musik abspielen";
            localStorage.setItem('musicPlaying', 'false');
        }
    });

    // Musk Timecode merken um dort wieder einzusetzen
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicPosition', audio.currentTime);
    });
});
console.log("Skript geladen");