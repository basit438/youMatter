let selectMusic = document.getElementById("select-music");
let musicContent = document.querySelector(".music-content");
let musicCards = document.querySelectorAll(".music-card");
let audioPlayer = document.querySelector(".audio-player");
let playPauseBtn = document.getElementById("play-pause");
let stopBtn = document.getElementById("stop");
let progressBar = document.querySelector(".progress-bar");
let progress = document.querySelector(".progress");
let timeDisplay = document.querySelector(".time");
let audio = new Audio();
let currentCard = null;

selectMusic.addEventListener("change", (e) => {
    let value = e.target.value;
    musicCards.forEach(card => {
        if (value === "all" || card.classList.contains(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

musicCards.forEach(card => {
    card.addEventListener("click", () => {
        let audioSrc = card.querySelector("audio").src;
        if (currentCard !== card || audio.src !== audioSrc) {
            audio.src = audioSrc;
            audio.load(); // Ensure the audio is loaded
            audio.play(); // Play the audio when a card is clicked
            currentCard = card;
            audioPlayer.style.display = "flex"; // Show the audio player
        } else {
            togglePlay(); // Toggle play/pause if the same card is clicked
        }
    });
});

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

playPauseBtn.addEventListener("click", togglePlay);

stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    audioPlayer.style.display = "none"; // Hide the audio player
});

audio.addEventListener("loadedmetadata", () => {
    // This event fires when the audio's metadata is loaded
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

audio.addEventListener("timeupdate", () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

progress.addEventListener("click", (e) => {
    let progressWidth = progress.clientWidth;
    let clickX = e.offsetX;
    let newTime = (clickX / progressWidth) * audio.duration;
    audio.currentTime = newTime;
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
