document.addEventListener("DOMContentLoaded", function() {
    const bubbles = document.querySelectorAll('.bubble');
    const container = document.getElementById('bubble-container');
    const popup = document.getElementById('message-popup');

    const popupText = document.getElementById('popup-text');
    const popupDate = document.getElementById('popup-date');
    const popupLikes = document.getElementById('popup-likes');
    const popupForm = document.getElementById('popup-form');
    const closeBtn = document.getElementById('close-popup');

    // Random Attribute pro Bubble
    bubbles.forEach(bubble => {
        const size = Math.floor(Math.random() * 50) + 50;
        const leftPos = 0
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * -20;
        const topPos = Math.random() * 60+ 20;



        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${leftPos}vw`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.top = `${topPos}vh`;

        // Bubble klick
        bubble.addEventListener('click', (e) => {
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

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        container.classList.remove('paused');
    });
});

// Musik

document.addEventListener("DOMContentLoaded", function() {
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