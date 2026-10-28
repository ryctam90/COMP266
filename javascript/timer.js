let originalDuration = 600;
let secondsRemaining = null;
let int = null;
let timerIsRunning = false;

const timer = document.getElementById('container-timer');
const timerDisplay = document.getElementById('timer-input');
const timerStartBtn = document.getElementById('start-btn-timer');
const timerResumeBtn = document.getElementById('resume-btn-timer');
const timerStopBtn = document.getElementById('stop-btn-timer');
const timerResetBtn = document.getElementById('reset-btn-timer');


function secondsToHMS(numSeconds) {
  let h = String(Math.floor(numSeconds/60/60)).padStart(2,'0');
  let m = String(Math.floor(numSeconds/60) % 60).padStart(2,'0');
  let s = String(Math.floor(numSeconds) % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
};

function hmsToSeconds(textHMS) {
  const hms = Number(textHMS);
  return (hms % 100) + 60*(Math.floor(hms/100) % 100) + 60*60*Math.floor(hms/10000);
};

function showTimerBtn(button){
  timerStartBtn.classList.add('is-hidden');
  timerResumeBtn.classList.add('is-hidden');
  timerStopBtn.classList.add('is-hidden');
  button.classList.remove('is-hidden');
}

function countdown() {
  secondsRemaining--;
  timerDisplay.value = secondsToHMS(secondsRemaining);
  if (secondsRemaining <= 0 && isRunning) {
    //play some audio
    clearInterval(int);
  }
}

function runTimer () {
  secondsRemaining = hmsToSeconds(timerDisplay.value);
  clearInterval(int);
  showTimerBtn(timerStopBtn);
  isRunning = true;
  int = setInterval(countdown, 1000);
}

function pauseTimer() {
  clearInterval(int);
  showTimerBtn(timerResumeBtn);
  isRunning = false;
  //stop audio
}

function resetTimer () {
  clearInterval(int);
  showTimerBtn(timerStartBtn);
  isRunning = false;
  timerDisplay.value = secondsToHMS(originalDuration);
  //stop audio
}

timerStartBtn.addEventListener('click', () => {
  originalDuration = hmsToSeconds(timerDisplay.value);
  runTimer();
});
timerResumeBtn.addEventListener('click', runTimer);
timerStopBtn.addEventListener('click', pauseTimer);
timerResetBtn.addEventListener('click', resetTimer);