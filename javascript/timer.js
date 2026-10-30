let originalDuration = 600;
let elapsedTimeAtPause = 0;
let elapsedTimeTotal = 0;
let displayAtPause = 0;
let displayAtRun = 0;
let startTime = null;
let timerInt = null;
let timerIsRunning = false;


const timer = document.getElementById('container-timer');
const timerDisplay = document.getElementById('timer-input');
const timerStartBtn = document.getElementById('start-btn-timer');
const timerResumeBtn = document.getElementById('resume-btn-timer');
const timerStopBtn = document.getElementById('stop-btn-timer');
const timerResetBtn = document.getElementById('reset-btn-timer');

function secondsToHMS(numSeconds) {
  // return Math.floor(numSeconds/60/60)*10000 + 
  //   (Math.floor(numSeconds/60) % 60)*100 +
  //   (numSeconds % 60);
  let h = String(Math.floor(numSeconds/60/60)).padStart(2,'0');
  let m = String(Math.floor(numSeconds/60) % 60).padStart(2,'0');
  let s = String(Math.floor(numSeconds) % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
};

function hmsToSeconds(textHMS) {
  const hms = Number(textHMS.replace(/:/g,''));
  return (hms % 100) + 60*(Math.floor(hms/100) % 100) + 60*60*Math.floor(hms/10000);
};

function showTimerBtn(button){
  timerStartBtn.classList.add('is-hidden');
  timerResumeBtn.classList.add('is-hidden');
  timerStopBtn.classList.add('is-hidden');
  button.classList.remove('is-hidden');
}

function countdown() {
  elapsedTimeTotal = elapsedTimeAtPause + Date.now() - startTime;
  timerDisplay.value = secondsToHMS(Math.ceil(originalDuration - elapsedTimeTotal/1000));
  if (elapsedTimeTotal >= originalDuration && timerIsRunning) {
    //play some audio
    // clearInterval(timerInt);
    // timerDisplay.classList.add('is-in-use');
  };
}

function runTimer () {
  clearInterval(timerInt);
  displayAtRun = hmsToSeconds(timerDisplay.value);
  if (displayAtRun !== displayAtPause) {
    originalDuration = displayAtRun;
    elapsedTimeAtPause = 0;
    elapsedTimeTotal = 0;
  };
  startTime = Date.now();
  timerInt = setInterval(countdown, 50);
  showTimerBtn(timerStopBtn);
  timerIsRunning = true;
  timerDisplay.disabled = true;
  timerDisplay.classList.add('is-in-use');
}

function pauseTimer() {
  clearInterval(timerInt);
  showTimerBtn(timerResumeBtn);
  timerIsRunning = false;
  timerDisplay.disabled = false;
  displayAtPause = hmsToSeconds(timerDisplay.value);
  elapsedTimeAtPause = elapsedTimeTotal;
  //stop audio
}

function resetTimer () {
  clearInterval(timerInt);
  showTimerBtn(timerStartBtn);
  timerIsRunning = false;
  timerDisplay.disabled = false;
  timerDisplay.value = secondsToHMS(originalDuration);
  elapsedTimeAtPause = 0;
  elapsedTimeTotal = 0;
  displayAtPause = null;
  //stop audio
}

timerDisplay.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    runTimer();
  }
})

timerStartBtn.addEventListener('click', runTimer);
timerResumeBtn.addEventListener('click', runTimer);
timerStopBtn.addEventListener('click', pauseTimer);
timerResetBtn.addEventListener('click', resetTimer);