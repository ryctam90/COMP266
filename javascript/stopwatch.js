// Original code by Tisha Atkar

// MIT License

// Copyright (c) 2023 Tisha

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Reused and adapted by Ricci Tam. 2026-10-18.

let centiseconds = 0;
let int = null;
let stopwatchIsRunning = false;

const stopwatch = document.getElementById('container-stopwatch');
const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchStartBtn = document.getElementById('start-btn-stopwatch');
const stopwatchResumeBtn = document.getElementById('resume-btn-stopwatch');
const stopwatchStopBtn = document.getElementById('stop-btn-stopwatch');
const stopwatchResetBtn = document.getElementById('reset-btn-stopwatch');

// Updates the display by incrementing counter by 1 centisecond
function updateStopwatchDisplay() {
  centiseconds++;
  
  //padStart ensures single digits are preceded by a leading 0
  const h = String(Math.floor(centiseconds/100/60/60)).padStart(2,'0');
  const m = String(Math.floor(centiseconds/100/60) % 60).padStart(2,'0');
  const s = String(Math.floor(centiseconds/100) % 60).padStart(2,'0');
  const cs = String(centiseconds % 100).padStart(2,'0');

  stopwatchDisplay.textContent = `${h}:${m}:${s}.${cs}`;
}

//hides the unnecessary buttons and only shows the required button
function showStopwatchBtn(button) {
  //hides all of the start/stop/resume buttons
  stopwatchStartBtn.classList.add('is-hidden');
  stopwatchResumeBtn.classList.add('is-hidden');
  stopwatchStopBtn.classList.add('is-hidden');

  //shows the designated button
  button.classList.remove('is-hidden');
}

//triggers updateStopwatchDisplay, switches button from "start" to "stop", turns text red
//refocuses on stopwatch so spacebar actions can work immediately
function startStopwatch() {
  clearInterval(int);
  showStopwatchBtn(stopwatchStopBtn);
  stopwatchIsRunning = true;
  stopwatch.focus();
  stopwatchDisplay.classList.add('accentuate-text');
  int = setInterval(updateStopwatchDisplay,10);
  
}

//stops updateStopwatchDisplay, switches button from "stop" to "resume", text stays red
//refocuses on stopwatch so spacebar actions can work immediately
function stopStopwatch() {
  clearInterval(int);
  showStopwatchBtn(stopwatchResumeBtn);
  stopwatchIsRunning = false;
  stopwatch.focus();
}

//resets the stopwatch and all settings back to default
//refocuses on stopwatch so spacebar actions can work immediately
function resetStopwatch() {
  clearInterval(int);
  showStopwatchBtn(stopwatchStartBtn);
  stopwatchIsRunning = false;
  stopwatch.focus();
  stopwatchDisplay.classList.remove('accentuate-text');
  centiseconds = 0;
  stopwatchDisplay.textContent = '00:00:00.00';
}

//triggers for various buttons
stopwatchStartBtn.addEventListener('click', startStopwatch);
stopwatchResumeBtn.addEventListener('click', startStopwatch);
stopwatchStopBtn.addEventListener('click', stopStopwatch);
stopwatchResetBtn.addEventListener('click', resetStopwatch);

//starts timer when spacebar is pressed, only when the stopwatch is focused
stopwatch.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    if (stopwatchIsRunning) {stopStopwatch();}
    else {startStopwatch();}
  }
});