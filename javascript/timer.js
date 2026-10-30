let originalDuration = 600;
let elapsedTimeAtPause = 0;
let elapsedTimeTotal = 0;
let displayAtPause = 0;
let displayAtRun = 0;
let startTime = null;
let timerInt = null;
let timerIsRunning = false;

const timer = document.getElementById('container-timer');
const timerDisplay = document.getElementById('timer-display');
const timerInput = document.getElementById('timer-input');
const timerStartBtn = document.getElementById('start-btn-timer');
const timerResumeBtn = document.getElementById('resume-btn-timer');
const timerStopBtn = document.getElementById('stop-btn-timer');
const timerResetBtn = document.getElementById('reset-btn-timer');

timerInput.addEventListener('input', () => {
  const userInput = timerInput.value
    .replace(/\D/g,'')
    .replace(/^0+/,'')
    .slice(0,6);
  const sixDigits = userInput.padStart(6,'0');
  timerInput.value = `${sixDigits.slice(0,2)}:${sixDigits.slice(2,4)}:${sixDigits.slice(4,6)}`;
});

function hmsToSeconds(textHMS) {
  const hms = Number(textHMS.replace(/:/g,''));
  return (hms % 100) + 60*(Math.floor(hms/100) % 100) + 60*60*Math.floor(hms/10000);
}

function secondsToHMS(numSeconds) {
  let h = String(Math.floor(numSeconds/60/60)).padStart(2,'0');
  let m = String(Math.floor(numSeconds/60) % 60).padStart(2,'0');
  let s = String(Math.floor(numSeconds) % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
}

function showTimerBtn(button){
  timerStartBtn.classList.add('is-hidden');
  timerResumeBtn.classList.add('is-hidden');
  timerStopBtn.classList.add('is-hidden');
  button.classList.remove('is-hidden');
}

function countdown() {
  elapsedTimeTotal = elapsedTimeAtPause + Date.now() - startTime;
  timerInput.value = secondsToHMS(Math.ceil(originalDuration - elapsedTimeTotal/1000));
  if (elapsedTimeTotal/1000 >= originalDuration && timerIsRunning) {
    //play some audio
    clearInterval(timerInt);
    timerDisplay.classList.add('accent-with-colour');
  }
}

function runTimer () {
  clearInterval(timerInt);
  displayAtRun = hmsToSeconds(timerInput.value);
  if (displayAtRun !== displayAtPause) {
    originalDuration = displayAtRun;
    elapsedTimeAtPause = 0;
    elapsedTimeTotal = 0;
  };
  startTime = Date.now();
  timerInt = setInterval(countdown, 50);
  showTimerBtn(timerStopBtn);
  timerIsRunning = true;
  timerInput.disabled = true;
}

function pauseTimer() {
  clearInterval(timerInt);
  showTimerBtn(timerResumeBtn);
  timerIsRunning = false;
  timerInput.disabled = false;
  displayAtPause = hmsToSeconds(timerInput.value);
  elapsedTimeAtPause = elapsedTimeTotal;
  //stop audio
}

function resetTimer () {
  clearInterval(timerInt);
  showTimerBtn(timerStartBtn);
  timerIsRunning = false;
  timerInput.disabled = false;
  timerInput.value = secondsToHMS(originalDuration);
  elapsedTimeAtPause = 0;
  elapsedTimeTotal = 0;
  displayAtPause = 0;
  timerDisplay.classList.remove('accent-with-colour');
  //stop audio
}

timerStartBtn.addEventListener('click', runTimer);
timerResumeBtn.addEventListener('click', runTimer);
timerStopBtn.addEventListener('click', pauseTimer);
timerResetBtn.addEventListener('click', resetTimer);

timerInput.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    runTimer();
  }
})