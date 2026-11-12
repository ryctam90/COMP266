let originalDuration = 600;
let elapsedTimeAtPause = 0;
let elapsedTimeTotal = 0;
let displayAtPause = 0;
let displayAtRun = 0;
let startTime = null;
let timerInt = null;
let timerDoneInt = null;
let timerIsRunning = false;

const timer = document.getElementById('container-timer');
const timerDisplay = document.getElementById('timer-display');
const timerInput = document.getElementById('timer-input');
const timerStartBtn = document.getElementById('start-btn-timer');
const timerResumeBtn = document.getElementById('resume-btn-timer');
const timerStopBtn = document.getElementById('stop-btn-timer');
const timerResetBtn = document.getElementById('reset-btn-timer');
const chime = document.getElementById('chime');
const timerMuteBtn = document.getElementById('mute-toggle');
const timerFullscreenBtn = document.getElementById('fullscreen-toggle');

//ensures input appears from right to left when inputted.
timerInput.addEventListener('input', () => {
  const userInput = timerInput.value
    .replace(/\D/g,'') //take out all non-digits
    .replace(/^0+/,'') //take out all leading zeroes
    .slice(-6); //take only the six most recent inputted digits
  const sixDigits = userInput.padStart(6,'0');
  timerInput.value = `${sixDigits.slice(0,2)}:${sixDigits.slice(2,4)}:${sixDigits.slice(4,6)}`;
});

//takes text in the form of hh:mm:ss and turns it into number of seconds
function hmsToSeconds(textHMS) {
  const hms = Number(textHMS.replace(/:/g,'')); //take out all colons
  return (hms % 100) + 60*(Math.floor(hms/100) % 100) + 60*60*Math.floor(hms/10000);
}

//takes the number of seconds and turns it into text in the form of hh:mm:ss
function secondsToHMS(numSeconds) {
  const h = String(Math.floor(numSeconds/60/60)).padStart(2,'0');
  const m = String(Math.floor(numSeconds/60) % 60).padStart(2,'0');
  const s = String(Math.floor(numSeconds) % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
}

//hides the unnecessary buttons and only shows the required button
function showTimerBtn(button){
  timerStartBtn.classList.add('is-hidden');
  timerResumeBtn.classList.add('is-hidden');
  timerStopBtn.classList.add('is-hidden');
  button.classList.remove('is-hidden');
}

//refreshes the timer display by counting down the seconds (rounded up)
function countdown() {
  //calculates ellapsed time by adding ellapsed time since the countdown started to the total ellapsed time since most recent pause
  elapsedTimeTotal = elapsedTimeAtPause + Date.now() - startTime;

  //rounds the remaining time up to the nearest second, then refreshes display
  timerInput.value = secondsToHMS(Math.ceil(originalDuration - elapsedTimeTotal/1000));

  //when timer hits zero, stops countdown, makes the text red, and plays a chime continuously
  if (elapsedTimeTotal/1000 >= originalDuration) {
    clearInterval(timerInt);
    chime.play();
    timerDoneInt = setInterval(() => {chime.play()}, 550);
    timerInput.classList.add('accentuate-text');
  }
}

//starts the timer
function runTimer () {
  clearInterval(timerInt);

  //detects if user has changed the time on the timer. If there was a change,
  //the most recent change is noted so that the reset button can reset to the duration that the user typed
  displayAtRun = hmsToSeconds(timerInput.value);
  if (displayAtRun !== displayAtPause) {
    originalDuration = displayAtRun;
    elapsedTimeAtPause = 0;
    elapsedTimeTotal = 0;
  }

  //notes the time when timer starts and runs the countdown functions every 50 milliseconds
  startTime = Date.now();
  timerInt = setInterval(countdown, 50);
  showTimerBtn(timerStopBtn);
  timerIsRunning = true;
  timerInput.readOnly = true; //ensures user can't change input whlie timer is running
}

//pauses the timer.
//Updates and stores the total ellapsed time to be used for the next time the timer resumes
//Updates and stores the time display at pause to compare with the next time the timer resumes
function pauseTimer() {
  clearInterval(timerInt);
  clearInterval(timerDoneInt);
  showTimerBtn(timerResumeBtn);
  timerIsRunning = false;
  displayAtPause = hmsToSeconds(timerInput.value);
  elapsedTimeAtPause = elapsedTimeTotal;
  timerInput.readOnly = false; //enables the user to change timer input
}

//resets the timer and all settings back to default.
//The duration sets back to the most recent change made to the timer display
//If user did not input anything, the initial duration is 10 minutes.
function resetTimer () {
  clearInterval(timerInt);
  clearInterval(timerDoneInt);
  showTimerBtn(timerStartBtn);
  timerIsRunning = false;
  timerInput.value = secondsToHMS(originalDuration);
  elapsedTimeAtPause = 0;
  elapsedTimeTotal = 0;
  displayAtPause = 0;
  timerInput.classList.remove('accentuate-text');
  timerInput.readOnly = false; //enables the user to change timer input
}

//triggers for various buttons
timerStartBtn.addEventListener('click', runTimer);
timerResumeBtn.addEventListener('click', runTimer);
timerStopBtn.addEventListener('click', pauseTimer);
timerResetBtn.addEventListener('click', resetTimer);

//enables timers to start when user presses enter after inputting duration
timerInput.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    runTimer();
  }
});

//toggles muting of the chime
timerMuteBtn.addEventListener('click', () => {
  if (chime.muted) {
    timerMuteBtn.classList.remove('accentuate-bg');
    chime.muted = false;
  } 
  else {
    timerMuteBtn.classList.add('accentuate-bg');
    chime.muted = true;
  }
});

//toggles fullscreen of the timer
//webkit prefix is needed to work on older versions of Safari
//iPhone can't fullscreen non-video elements, so a message is presented if fullscreen is not available
timerFullscreenBtn.addEventListener('click', () => {
  if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) {
    alert('Fullscreen is unavailable on this device/browser.');
  }
  else if (document.fullscreenElement || document.webkitFullscreenElement) {
    if (document.exitFullscreen) {document.exitFullscreen();}
    else if (document.webkitExitFullscreen) {document.webkitExitFullscreen();}
  }
  else {
    if (timer.requestFullscreen) {timer.requestFullscreen();}
    else if (timer.webkitRequestFullscreen) {timer.webkitRequestFullscreen();}
  }
});