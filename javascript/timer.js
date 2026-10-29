let originalDuration = null;
let startTime = null;
let int = null;
let secondsRemainingAtRun = null;
let secondsRemainingAtPause = null
let preciseElapsedTime = null;
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
  const millisecondsElapsed = Date.now() - startTime;
  const secondsRemainingLive = secondsRemainingAtRun - millisecondsElapsed/1000;
  timerDisplay.value = secondsToHMS(Math.ceil(secondsRemainingLive));
  if (secondsRemainingLive <= 0 && timerIsRunning) {
    //play some audio
    clearInterval(int);
  }
}

function runTimer () {
  clearInterval(int);
  secondsRemainingAtRun = hmsToSeconds(timerDisplay.value);
  if (secondsRemainingAtPause !== secondsRemainingAtRun) {originalDuration = secondsRemainingAtRun};
  startTime = Date.now();
  showTimerBtn(timerStopBtn);
  timerIsRunning = true;
  timerDisplay.disabled = true;
  int = setInterval(countdown, 50);
}

function pauseTimer() {
  clearInterval(int);
  showTimerBtn(timerResumeBtn);
  timerIsRunning = false;
  timerDisplay.disabled = false;
  secondsRemainingAtPause = hmsToSeconds(timerDisplay.value);
  
  //stop audio
}

function resetTimer () {
  clearInterval(int);
  showTimerBtn(timerStartBtn);
  timerIsRunning = false;
  timerDisplay.disabled = false;
  timerDisplay.value = secondsToHMS(originalDuration);
  //stop audio
}

timerDisplay.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    originalDuration = hmsToSeconds(timerDisplay.value);
    runTimer();
  }
})

timerStartBtn.addEventListener('click', () => {
  originalDuration = hmsToSeconds(timerDisplay.value);
  runTimer();
});
timerResumeBtn.addEventListener('click', runTimer);
timerStopBtn.addEventListener('click', pauseTimer);
timerResetBtn.addEventListener('click', resetTimer);