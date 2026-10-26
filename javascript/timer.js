let originalDuration = 600;
let secondsRemaining = null;
let int = null;
let isRunning = false;

const timer = document.getElementById('container-timer');
const display = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn-timer');
const resumeBtn = document.getElementById('resume-btn-timer');
const pauseBtn = document.getElementById('pause-btn-timer');
const resetBtn = document.getElementById('reset-btn-timer');


function secondsToHMS(numSeconds) {
  let h = String(Math.floor(numSeconds/60/60)).padStart(2,'0');
  let m = String(Math.floor(numSeconds/60) % 60).padStart(2,'0');
  let s = String(Math.floor(numSeconds) % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
};

function hmsToSeconds(textHMS) {
  const hms = Number(textHMS);
  return (hms % 100) + (Math.floor(hms/100) % 100) + Math.floor(hms/10000);
};

function countdown() {
  secondsRemaining--;
  display.textContent = secondsToHMS(secondsRemaining);
  if (secondsRemaining === 0 && isRunning) {
    //play some audio
  }
};

function runTimer () {
  secondsRemaining = hmsToSeconds(display.textContent);
  clearInterval(int);
  startBtn.classList.add('is-hidden');
  resumeBtn.classList.add('is-hidden');
  pauseBtn.classList.remove('is-hidden');
  isRunning = true;
  int = setInterval(countdown, 1000);
};

function pauseTimer() {
  clearInterval(int);
  startBtn.classList.add('is-hidden');
  resumeBtn.classList.remove('is-hidden');
  pauseBtn.classList.add('is-hidden');
  isRunning = false
  //stop audio
};

function resetTimer () {
  clearInterval(int);
  startBtn.classList.remove('is-hidden');
  resumeBtn.classList.add('is-hidden');
  pauseBtn.classList.add('is-hidden');
  isRunning = false
  display.textContent = secondsToHMS(originalDuration);
  //stop audio
};

startBtn.addEventListener('click', () => {
  originalDuration = hmsToSeconds(display.textContent);
  runTimer();
});
resumeBtn.addEventListener('click', runTimer)
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);