const timer1 = document.getElementById("timer1");
const timer2 = document.getElementById("timer2");
const switchButton = document.getElementById("switchButton");
const timeSelect = document.getElementById("timeSelect");

let activeTimer = 1;
let timer1Time = 15 * 60; // Set default time to 15 minutes
let timer2Time = 15 * 60; // Set default time to 15 minutes

const updateClock = (timer, time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timer.querySelector("h1").textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const switchTimers = () => {
  if (activeTimer === 1) {
    activeTimer = 2;
  } else {
    activeTimer = 1;
  }
};

// Initialize the timers with the default time
updateClock(timer1, timer1Time);
updateClock(timer2, timer2Time);
switchButton.disabled = false;

switchButton.addEventListener("click", switchTimers);

timeSelect.addEventListener("change", () => {
  const selectedTime = parseInt(timeSelect.value) * 60;
  timer1Time = selectedTime;
  timer2Time = selectedTime;
  updateClock(timer1, timer1Time);
  updateClock(timer2, timer2Time);
});

const timerInterval = setInterval(() => {
  if (timer1Time === 0 || timer2Time === 0) {
    clearInterval(timerInterval);
    const winner = timer1Time === 0 ? "Player 2" : "Player 1";
    alert(`${winner} wins!`);
    switchButton.disabled = true;
  } else {
    if (activeTimer === 1) {
      timer1Time--;
      updateClock(timer1, timer1Time);
    } else {
      timer2Time--;
      updateClock(timer2, timer2Time);
    }
  }
}, 1000);