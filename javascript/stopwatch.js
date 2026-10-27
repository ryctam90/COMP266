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
let isRunning = false;

const stopwatch = document.getElementById('container-stopwatch');
const display = document.getElementById('stopwatch-display');
const startBtn = document.getElementById('start-btn-stopwatch');
const resumeBtn = document.getElementById('resume-btn-stopwatch');
const stopBtn = document.getElementById('stop-btn-stopwatch');
const resetBtn = document.getElementById('reset-btn-stopwatch');

// Updates the display by incrementing counter by 1 centisecond
function updateStopwatchDisplay() {
  centiseconds++;
  
  let h = String(Math.floor(centiseconds/100/60/60)).padStart(2,'0');
  let m = String(Math.floor(centiseconds/100/60) % 60).padStart(2,'0');
  let s = String(Math.floor(centiseconds/100) % 60).padStart(2,'0');
  let cs = String(centiseconds % 100).padStart(2,'0');

  display.textContent = `${h}:${m}:${s}.${cs}`;
}

function showBtn(button) {
  startBtn.classList.add('is-hidden');
  resumeBtn.classList.add('is-hidden');
  stopBtn.classList.add('is-hidden');
  button.classList.remove('is-hidden');
};

// Triggers updateStopwatchDisplay, switches button from "start" to "stop", turns text red
function startStopwatch() {
  clearInterval(int);
  showBtn(stopBtn);
  isRunning = true;
  stopwatch.focus();
  display.classList.add('is-in-use');
  int = setInterval(updateStopwatchDisplay,10);
};

// Stops updateStopwatchDisplay, switches button from "stop" to "resume", text stays red
function stopStopwatch() {
  clearInterval(int);
  showBtn(resumeBtn);
  isRunning = false;
  stopwatch.focus();
};

// Resets the stopwatch and all settings back to default
function resetStopwatch() {
  clearInterval(int);
  showBtn(startBtn);
  isRunning = false;
  stopwatch.focus();
  display.classList.remove('is-in-use');
  centiseconds = 0;
  display.textContent = '00:00:00.00';
};

// Triggers for various buttons
startBtn.addEventListener('click', startStopwatch);
resumeBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Starts timer when spacebar is pressed, only when the stopwatch is focused
stopwatch.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    if (isRunning) {stopStopwatch();}
    else {startStopwatch();}
  }
});

// Triggers reset when "R" key is pressed
// I decided not to implement this functionality yet because this is not intuitive and requires text instructions, which I have not decided how to present yet.
// stopwatch.addEventListener('keyup', (event) => {
//   if (event.code === 'KeyR') {resetStopwatch();}
// })