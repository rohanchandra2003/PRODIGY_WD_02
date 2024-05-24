let startTime;
let running = false;
let laps = [];
let lapCount = 1;

function startStop() {
  if (!running) {
    startTime = new Date().getTime();
    running = true;
    document.getElementById('startStop').textContent = 'Stop';
    update();
  } else {
    running = false;
    document.getElementById('startStop').textContent = 'Start';
  }
}

function update() {
  if (running) {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    let formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
    requestAnimationFrame(update);
  }
}

function formatTime(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor((milliseconds % 3600000) / 60000);
  let seconds = Math.floor((milliseconds % 60000) / 1000);
  let millis = Math.floor((milliseconds % 1000) / 10);

  return (
    pad(hours) + ':' +
    pad(minutes) + ':' +
    pad(seconds) + ':' +
    pad(millis)
  );
}

function pad(num) {
  return (num < 10 ? '0' : '') + num;
}

function recordLap() {
  if (running) {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    let formattedTime = formatTime(elapsedTime);
    laps.push({ lap: lapCount, time: formattedTime });
    lapCount++;
    displayLaps();
  }
}

function displayLaps() {
  let lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach(lap => {
    let li = document.createElement('li');
    li.textContent = `Lap ${lap.lap}: ${lap.time}`;
    lapsList.appendChild(li);
  });
}

function reset() {
  running = false;
  startTime = 0;
  laps = [];
  lapCount = 1;
  document.getElementById('startStop').textContent = 'Start';
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
}
