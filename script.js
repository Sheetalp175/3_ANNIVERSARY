const startScreen = document.getElementById("startScreen");
const app = document.getElementById("app");
const music = document.getElementById("music");

const storyImage = document.getElementById("storyImage");
const storyCaption = document.getElementById("storyCaption");
const progressWrap = document.getElementById("progressWrap");

const photoStories = [
  { src: "images/img1.jpeg", caption: "A memory I never want to lose ❤️" },
  { src: "images/img2.jpeg", caption: "You make every moment feel magical ✨" },
  { src: "images/img3.jpeg", caption: "My favorite place is always next to you 💖" },
  { src: "images/img4.jpeg", caption: "You turned simple days into beautiful memories 🥺" },
  { src: "images/img5.jpeg", caption: "Every little thing with you means so much to me 💕" },
  { src: "images/img6.jpeg", caption: "Us — my safest, happiest feeling forever ❤️" }
];

let currentPhoto = 0;
let storyTimer = null;
let progressTimer = null;
let progress = 0;
const storyDuration = 3200;

function startExperience() {
  startScreen.classList.add("hidden");
  app.classList.remove("hidden");

  showOnlyStory(1);
  setupProgressBars();
  showPhotoStory(currentPhoto);
  startAutoStory();

  music.volume = 0;
  music.play().catch(() => {});
  fadeInMusic();
}

function fadeInMusic() {
  const fade = setInterval(() => {
    if (music.volume < 0.95) {
      music.volume = Math.min(music.volume + 0.05, 1);
    } else {
      clearInterval(fade);
    }
  }, 180);
}

function setupProgressBars() {
  progressWrap.innerHTML = "";

  photoStories.forEach(() => {
    const bar = document.createElement("div");
    bar.className = "progress-bar";

    const fill = document.createElement("div");
    fill.className = "progress-fill";

    bar.appendChild(fill);
    progressWrap.appendChild(bar);
  });
}

function updateProgressBars(activeIndex, percentage = 0) {
  const fills = document.querySelectorAll(".progress-fill");

  fills.forEach((fill, i) => {
    if (i < activeIndex) {
      fill.style.width = "100%";
    } else if (i === activeIndex) {
      fill.style.width = `${percentage}%`;
    } else {
      fill.style.width = "0%";
    }
  });
}

function showPhotoStory(index) {
  currentPhoto = index;
  storyImage.style.opacity = "0";

  setTimeout(() => {
    storyImage.src = photoStories[index].src;
    storyCaption.textContent = photoStories[index].caption;
    storyImage.style.opacity = "1";
  }, 180);

  progress = 0;
  updateProgressBars(currentPhoto, 0);
}

function startAutoStory() {
  clearInterval(storyTimer);
  clearInterval(progressTimer);

  progress = 0;

  progressTimer = setInterval(() => {
    progress += 100 / (storyDuration / 100);
    if (progress > 100) progress = 100;
    updateProgressBars(currentPhoto, progress);
  }, 100);

  storyTimer = setInterval(() => {
    nextPhoto();
  }, storyDuration);
}

function nextPhoto() {
  if (currentPhoto < photoStories.length - 1) {
    showPhotoStory(currentPhoto + 1);
    startAutoStory();
  } else {
    clearInterval(storyTimer);
    clearInterval(progressTimer);
    goToStory(2);
  }
}

function prevPhoto() {
  if (currentPhoto > 0) {
    showPhotoStory(currentPhoto - 1);
    startAutoStory();
  }
}

function goToStory(number) {
  clearInterval(storyTimer);
  clearInterval(progressTimer);
  showOnlyStory(number);

  if (number === 1) {
    setupProgressBars();
    showPhotoStory(currentPhoto);
    startAutoStory();
  }
}

function showOnlyStory(number) {
  document.querySelectorAll(".story").forEach(story => {
    story.classList.remove("active");
  });

  document.getElementById(`story${number}`).classList.add("active");
}