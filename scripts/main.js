let timer;
let startBreakSession;
const pomodoro = document.getElementById("counter");
const sessionCounter = document.getElementById("sessionNum");
const breakCounter = document.getElementById("breakNum");
let sessionNumber = parseInt(sessionCounter.innerText);
let breakNumber = parseInt(breakCounter.innerText);

//Set Session Time
document.getElementById("plusSession").addEventListener("click", sessionPlus);
document.getElementById("minusSession").addEventListener("click", sessionMinus);

function sessionPlus() {
  sessionNumber++;
  sessionCounter.innerText = sessionNumber;
  pomodoro.innerText = sessionNumber;
}

function sessionMinus() {
  if (sessionNumber > 1) {
    sessionNumber--;
    sessionCounter.innerText = sessionNumber;
    pomodoro.innerText = sessionNumber;
  }
}

//Set Break Time
document.getElementById("plusBreak").addEventListener("click", breakPlus);
document.getElementById("minusBreak").addEventListener("click", breakMinus);

function breakPlus() {
  breakNumber++;
  breakCounter.innerText = breakNumber;
}

function breakMinus() {
  if (breakNumber > 1) {
    breakNumber--;
    breakCounter.innerText = breakNumber;
  }
}

// Start Pomodoro
document.getElementById("start").addEventListener("click", startPomodoro);

function startPomodoro() {
  timer = setInterval(counter, 1000);
  sessionNumber *= 60;
  breakNumber *= 60;
  document.getElementById("start").style.display = "none";

  function counter() {
    sessionNumber -= 1;
    if (sessionNumber === 0) {
      clearInterval(timer);
      startBreakSession = setInterval(breakCounter, 1000);
      pomodoro.innerText = breakNumber;
    }

    //if it is not a single digit
    if (sessionNumber % 60 >= 10) {
      pomodoro.innerText =
        Math.floor(sessionNumber / 60) + ":" + sessionNumber % 60;
    } else {
      pomodoro.innerText =
        Math.floor(sessionNumber / 60) + ":" + "0" + sessionNumber % 60;
    }

    function breakCounter() {
      breakNumber -= 1;
      if (breakNumber === 0) {
        clearInterval(startBreakSession);
        reset();
      }
      if (breakNumber % 60 >= 10) {
        pomodoro.innerText =
          Math.floor(breakNumber / 60) + ":" + breakNumber % 60;
      } else {
        pomodoro.innerText =
          Math.floor(breakNumber / 60) + ":" + "0" + breakNumber % 60;
      }
    }
  }
}

//Reset Pomodoro
document.getElementById("reset").addEventListener("click", reset);

function reset() {
  clearInterval(timer);
  clearInterval(startBreakSession);
  sessionNumber = 25;
  sessionCounter.innerText = 25;
  breakNumber = 5;
  breakCounter.innerText = 5;
  pomodoro.innerText = 25;
  document.getElementById("start").style.display = "inline-block";
}
