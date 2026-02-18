document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("playBtn");
    const progress = document.getElementById("progress");
    const current = document.getElementById("current");
    const duration = document.getElementById("duration");

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = "||";
        } else {
            audio.pause();
            playBtn.textContent = ">";
        }
    });

    const setDuration = () => {
        progress.max = audio.duration;
        duration.textContent = Math.floor(audio.duration);
    };

    if (audio.readyState >= 1) {
        setDuration();
    } else {
        audio.addEventListener("loadedmetadata", setDuration);
    }

    audio.addEventListener("timeupdate", () => {
        progress.value = audio.currentTime;
        current.textContent = Math.floor(audio.currentTime);
    });

    progress.addEventListener("input", () => {
        audio.currentTime = progress.value;
    });
});
