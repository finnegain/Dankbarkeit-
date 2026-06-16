document.addEventListener("DOMContentLoaded", function() {
    const bubbles = document.querySelectorAll('.bubble');
    const container = document.getElementById('bubble-container');
    const popup = document.getElementById('message-popup');

    // Elemente im Pop-up, die wir mit Text füllen müssen
    const popupText = document.getElementById('popup-text');
    const popupDate = document.getElementById('popup-date');
    const popupLikes = document.getElementById('popup-likes');
    const popupForm = document.getElementById('popup-form');
    const closeBtn = document.getElementById('close-popup');

    // Jedem Ball zufällige Eigenschaften geben
    bubbles.forEach(bubble => {
        // Zufällige Größe zwischen 50px und 100px
        const size = Math.floor(Math.random() * 50) + 50;
        // Zufällige Startposition auf der X-Achse (0% bis 90% der Fensterbreite)
        const leftPos = Math.random() * 90;
        // Zufällige Dauer für den Flug nach oben (10 bis 25 Sekunden)
        const duration = Math.random() * 15 + 10;
        // Zufällige Verzögerung, damit nicht alle gleichzeitig starten (-20s bis 0s)
        const delay = Math.random() * -20;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${leftPos}vw`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;

        // Klick-Event für jeden Ball
        bubble.addEventListener('click', (e) => {
            // 1. Alle Animationen anhalten
            container.classList.add('paused');

            // 2. Daten aus dem Ball auslesen und ins Pop-up schreiben
            popupText.textContent = `"${bubble.dataset.text}"`;
            popupDate.textContent = `Veröffentlicht am: ${bubble.dataset.date}`;
            popupLikes.textContent = bubble.dataset.likes;

            // 3. Dem Formular sagen, welche URL beim Liken aufgerufen werden soll
            popupForm.action = bubble.dataset.url;

            // 4. Pop-up direkt über dem angeklickten Ball positionieren
            const rect = bubble.getBoundingClientRect();
            // Wir positionieren es exakt in die Mitte des Balls
            popup.style.left = `${rect.left + (size / 2)}px`;
            popup.style.top = `${rect.top}px`;

            // 5. Pop-up einblenden
            popup.classList.add('active');
        });
    });

    // Pop-up schließen und Animation fortsetzen
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        container.classList.remove('paused');
    });
});