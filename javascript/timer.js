let originalDuration = null;
let startTime = null;
let int = null;
let elapsedTime = 0;
let timerIsRunning = false;
let displayAtPause = null;
let displayAtRun = null;


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
  elapsedTime = elapsedTime +  Date.now() - startTime;
  timerDisplay.value = secondsToHMS(Math.ceil((originalDuration-elapsedTime)/1000));
  if (elapsedTime >= originalDuration && timerIsRunning) {
    //play some audio
    clearInterval(int);
  }
}

function runTimer () {
  clearInterval(int);
  displayAtRun = hmsToSeconds(timerDisplay.value);
  if (displayatRun !== displayAtPause) {originalDuration = displayAtRun};
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
  displayAtPause = hmsToSeconds(timerDisplay.value);
  
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