const audio = document.getElementById("birthdayAudio");
const playBtn = document.getElementById("playMusicBtn");
const slide = document.getElementById("slide");

let started = false;
let isPlaying = false;
let confettiRunning = false;
let balloonInterval, slideshowInterval, confettiFrame;
let particles = [];

const images = [
  "images/photo1.jpg", "images/photo2.jpg", "images/photo3.jpg",
  "images/photo4.jpg", "images/photo5.jpg", "images/photo6.jpg",
  "images/photo7.jpg", "images/photo8.jpg", "images/photo9.jpg",
    "images/photo10.jpg", "images/photo11.jpg", "images/photo12.jpg",
    "images/photo13.jpg"
];
let i = 0;

playBtn.addEventListener("click", () => {
  if (!started) {
    audio.muted = false;
    audio.play();
    startConfetti();
    startBalloons();
    startSlideshow();
    started = true;
    isPlaying = true;
    playBtn.innerText = "⏸️ Pause Music";
  } else {
    if (isPlaying) {
      audio.pause();
      pauseConfetti();
      clearInterval(balloonInterval);
      clearInterval(slideshowInterval);
      playBtn.innerText = "▶️ Resume Music";
    } else {
      audio.play();
      startConfetti();
      startBalloons();
      startSlideshow();
      playBtn.innerText = "⏸️ Pause Music";
    }
    isPlaying = !isPlaying;
  }
});

// 🎁 Rotating Quotes
const quotes = [
  "💖 You’re not just my love, you’re my reason to smile every day!",
  "🎂 Happy Birthday to the queen of my heart — today’s all about you!",
  "🎁 You’re the best gift life has ever given me.",
  "🌹 You make the world more beautiful just by being in it.",
  "💫 You shine brighter than any birthday sparkler!",
  "👑 Happy Birthday, my princess. Let’s make today unforgettable!"
];
const quoteBox = document.getElementById("quoteBox");
let q = 0;
setInterval(() => {
  quoteBox.innerText = quotes[q];
  q = (q + 1) % quotes.length;
}, 3000);

// Slideshow
function startSlideshow() {
  if (slideshowInterval) clearInterval(slideshowInterval);
  slideshowInterval = setInterval(() => {
    i = (i + 1) % images.length;
    slide.src = images[i];
  }, 3000);
}

// Confetti
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (!particles.length) {
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 100,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.floor(Math.random() * 10) - 10,
      });
    }
  }

  function drawConfetti() {
    if (!confettiRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y += 1.2;
      if (p.y > canvas.height) {
        p.y = Math.random() * -canvas.height;
        p.x = Math.random() * canvas.width;
      }
    });
    confettiFrame = requestAnimationFrame(drawConfetti);
  }

  confettiRunning = true;
  drawConfetti();
}

function pauseConfetti() {
  confettiRunning = false;
  cancelAnimationFrame(confettiFrame);
}

// Balloons
function startBalloons() {
  if (balloonInterval) clearInterval(balloonInterval);
  balloonInterval = setInterval(() => {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    document.querySelector(".balloon-container").appendChild(balloon);
    setTimeout(() => balloon.remove(), 12000);
  }, 600);
}
