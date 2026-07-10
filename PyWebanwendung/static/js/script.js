document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('sheep-container');

    if (!container) {
        return;
    }/*const container = document.getElementById('sheep-container');*/
    const popup = document.getElementById('message-popup');
    const popupText = document.getElementById('popup-text');
    const popupDate = document.getElementById('popup-date');
    const popupLikes = document.getElementById('popup-likes');
    const popupForm = document.getElementById('popup-form');
    const closeBtn = document.getElementById('close-popup');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const feelButton = document.getElementById('feelyou');

    function initSheep() {
        const allSheep = document.querySelectorAll('.sheep');

        allSheep.forEach(sheep => {
            if (sheep.dataset.initialized) return;

            const size = Math.floor(Math.random() * 60) + 60;
            const topPos = Math.random() * 40 + 40;
            const duration = Math.random() * 15 + 15;
            const delay = Math.random() * -30;

            sheep.style.width = `${size}px`;
            sheep.style.height = `${size}px`;
            sheep.style.top = `${topPos}vh`;
            sheep.style.animation = `runRight ${duration}s linear ${delay}s infinite`;
            sheep.dataset.initialized = "true";

            sheep.addEventListener('click', () => {
                container.classList.add('paused');
                popupText.textContent = `"${sheep.dataset.text}"`;
                popupDate.textContent = `Veröffentlicht am: ${sheep.dataset.date}`;
                popupLikes.textContent = sheep.dataset.likes;
                popupForm.action = sheep.dataset.url;

                const rect = sheep.getBoundingClientRect();
                popup.style.left = `${rect.left + (size / 2)}px`;
                popup.style.top = `${rect.top - 10}px`;
                popup.classList.add('active');

            });
        });
    }

    initSheep();


    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        container.classList.remove('paused');
    });

    feelButton.addEventListener('click', () => {

    const url = popupForm.action;


    fetch(url, {

        method: "POST",

        headers: {
            "X-CSRFToken": csrfToken,
            "X-Requested-With": "XMLHttpRequest"
        }

    })


    .then(response => response.json())


    .then(data => {

        // Zahl im Popup aktualisieren
        popupLikes.textContent = data.likes;


        // auch das Schaf-Dataset aktualisieren
        const activeSheep = document.querySelector(
            `.sheep[data-url="${url}"]`
        );

        if (activeSheep) {
            activeSheep.dataset.likes = data.likes;
        }


    })


    .catch(error => {
        console.error("Like Fehler:", error);
    });

});


    // Auto refresh ohne ganze Seite und bestehende Schafe neu zu laden
    setInterval(() => {
        fetch(window.location.href)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const newSheepNodes = doc.querySelectorAll('#sheep-container .sheep');
                const currentContainer = document.getElementById('sheep-container');

                // Prüfen, ob es Schaf schon gibt. Falls nicht hinzufügen
                const newIds = Array.from(newSheepNodes).map(s => s.dataset.id);
                newSheepNodes.forEach(newSheep => {
                    const existingSheep = currentContainer.querySelector(`.sheep[data-id="${newSheep.dataset.id}"]`);
                    if (!existingSheep) {
                        currentContainer.appendChild(newSheep);
                    }
                });

                //Alte Schafe entfernen
                const currentSheepNodes = currentContainer.querySelectorAll('.sheep');
                currentSheepNodes.forEach(oldSheep => {
                    if (!newIds.includes(oldSheep.dataset.id)) {
                        oldSheep.style.opacity = '0';
                        setTimeout(() => oldSheep.remove(), 1000);
                    }
                });
                initSheep();
            })
            .catch(err => console.error('Fehler beim Aktualisieren:', err));
    }, 20000);
});

// Musik
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    const trackPosition = localStorage.getItem('musicPosition') || 0;

    audio.currentTime = trackPosition;

    function setPlayingIcon() {
        musicIcon.src = "/static/images/music_sheep.png";
        musicIcon.alt = "Musik pausieren";
    }

    function setPausedIcon() {
        musicIcon.src = "/static/images/nomusic_sheep.png";
        musicIcon.alt = "Musik abspielen";
    }

    if (isPlaying) {
        audio.play().then(() => {
            setPlayingIcon();
        }).catch(error => {
            console.log("Browser hat Autoplay blockiert.");
            setPausedIcon();
            localStorage.setItem('musicPlaying', 'false');
        });
    } else {
        setPausedIcon();
    }


    // Play / Pause Button
    toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            setPlayingIcon();
            localStorage.setItem('musicPlaying', 'true');
        } else {
            audio.pause();
            setPausedIcon();
            localStorage.setItem('musicPlaying', 'false');
        }
    });


    // Position speichern
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicPosition', audio.currentTime);
    });
});


console.log("Skript geladen");

/* Automatisch zur Hero-Section scrollen*/
window.onload = function () {
    document.getElementById("hero").scrollIntoView();
};