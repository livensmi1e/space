---
title: "Awesome music player"
date: "2026-02-20"
time: "16:20 PM"
description: "With the help of LLM, I have an awesome music player sits on the front of my website, playing Country Road by John Denver."
tags: ["experience"]
---

## Table of Contents

## Logic

For every simple working music player, we need to handle 4 things:
1. The play/pause button
2. Dragging action on progress bar
3. Display current time when song being played
4. Display max duration time of the song

Here is my working version (of course the credits goes to LLMs):

```js
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
```

I won't comment which part, as an exercise for me whenever I read the code.

And the HTML looks like this:

```astro
<div class="hero__music">
    <button class="music__btn" id="playBtn" aria-label="Play">></button>
    <input
        type="range"
        id="progress"
        value="0"
        step="0.1"
        min="0"
        class="music__progress"
    />
    <span class="music__time">
        <span id="current">0</span>
        <span class="music__divider">/</span>
        <span id="duration">0</span>
    </span>
    <audio id="audio" src={`${import.meta.env.BASE_URL}/country-roads-john-denver.mp3`}></audio>
    |
    <p>
        <a href="https://www.youtube.com/watch?v=1vrEljMfXYo&list=RDV1bFr2SWP1I&index=4" target="_blank">by John Denver</a>
    </p>
</div>
```