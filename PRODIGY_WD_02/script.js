let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function updateDisplay() {
    const display = document.getElementById('display');
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
    const startStopBtn = document.getElementById('startStopBtn');
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = elapsedTime + Date.now() - startTime;
        laps.push(lapTime);
        const lapList = document.getElementById('laps');
        const lapItem = document.createElement('li');
        const time = new Date(lapTime);
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        lapItem.textContent = `Lap ${laps.length}: ${minutes}:${seconds}:${milliseconds}`;
        lapList.appendChild(lapItem);
    }
}

updateDisplay();
