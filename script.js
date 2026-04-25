function toggleSound() {
  const video = document.querySelector(".video-bg video");
  const btn = document.getElementById("sound-btn");
  if (video.muted) {
    video.muted = false;
    video.volume = 0.6;
    btn.textContent = "▐▐ MUTE CURSED ENERGY";
    btn.style.color = "#CC0000";
    btn.style.borderColor = "rgba(139,0,0,0.5)";
  } else {
    video.muted = true;
    btn.textContent = "▶ UNMUTE CURSED ENERGY";
    btn.style.color = "rgba(201,168,76,0.6)";
    btn.style.borderColor = "rgba(201,168,76,0.2)";
  }
}
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add("visible");
          e.target.querySelectorAll(".dfill-anim").forEach((bar) => {
            bar.style.width = bar.dataset.width;
          });
        }, i * 70);
      }
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

document.querySelectorAll(".technique").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.borderLeftWidth = "3px";
    card.style.borderLeftColor = "rgba(139,0,0,0.75)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.borderLeftWidth = "1px";
    card.style.borderLeftColor = "rgba(139,0,0,0.15)";
  });
});

if (window.innerWidth > 768) {
  setInterval(() => {
    if (Math.random() < 0.07) {
      document.body.style.filter = "hue-rotate(180deg) contrast(1.06)";
      setTimeout(() => (document.body.style.filter = ""), 75);
    }
  }, 4500);
}

const video = document.querySelector(".video-bg video");
video.addEventListener("error", () => {
  document.querySelector(".video-bg").style.background =
    "radial-gradient(ellipse 120% 80% at 20% 50%, #1A0000 0%, #000 60%)";
  video.style.display = "none";
});
