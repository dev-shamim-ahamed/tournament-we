'use strict';

/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * MOBILE NAVBAR
 * navbar will show after clicking menu button
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNav);

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElements(navLinks, "click", navClose);

/**
 * HEADER and BACK TOP BTN
 * header and back top btn will be active after scrolled down to 100px of screen
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeEl = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeEl);

/**
 * Button hover ripple effect
 */

const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  this.style.setProperty("--top", `${event.offsetY}px`);
  this.style.setProperty("--left", `${event.offsetX}px`);
}

addEventOnElements(buttons, "mousemove", buttonHoverRipple);

/**
 * Scroll reveal with smooth animation
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  revealElements.forEach((el) => {
    const isElementInsideWindow = el.getBoundingClientRect().top < window.innerHeight / 1.1;
    if (isElementInsideWindow) {
      el.classList.add("revealed");
    }
  });
}

window.addEventListener("scroll", revealElementOnScroll);
window.addEventListener("load", revealElementOnScroll);

document.documentElement.style.scrollBehavior = "smooth";

/**
 * Custom cursor
 */

const cursor = document.querySelector("[data-cursor]");
const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

const cursorMove = function (event) {
  cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
}

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor.classList.remove("hovered");
});

/**
* Video player
*/
const video = document.getElementById('mainVideo');
const playPauseButton = document.getElementById('playPause');
const currentTimeLabel = document.getElementById('currentTime');
const totalTimeLabel = document.getElementById('totalTime');
const progressBar = document.getElementById('progressBar');
const fullscreenButton = document.getElementById('fullscreen');

video.addEventListener('loadedmetadata', () => {
  totalTimeLabel.textContent = formatTime(video.duration);
  progressBar.max = video.duration;
});

video.addEventListener('timeupdate', () => {
  currentTimeLabel.textContent = formatTime(video.currentTime);
  progressBar.value = video.currentTime;
});

function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseButton.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
  } else {
    video.pause();
    playPauseButton.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
  }
}

playPauseButton.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);

progressBar.addEventListener('input', () => {
  video.currentTime = progressBar.value;
});

fullscreenButton.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
    fullscreenButton.innerHTML = `<ion-icon name="contract-outline"></ion-icon>`;
  } else {
    document.exitFullscreen();
    fullscreenButton.innerHTML = `<ion-icon name="expand-outline"></ion-icon>`;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    togglePlayPause();
  } else if (event.code === 'ArrowRight') {
    video.currentTime += 5;
  } else if (event.code === 'ArrowLeft') {
    video.currentTime -= 5;
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
