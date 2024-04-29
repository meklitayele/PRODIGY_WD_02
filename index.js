let startTime, updatedTime,difference, timeInterval,countdownTimer;
let running = false;
let time = 0;
let numberOfLaps = 1;

function startTimer() {
    if(!running) {
        startTime = new Date().getTime();
        if (!timeInterval) {
            timeInterval = setInterval(getShowTime,1);
        }
        running = true;
        document.getElementById('start').disabled = true;
        document.getElementById('lap').disabled = false;
        document.getElementById('stop').disabled = false;

    }
}

function stopTimer() {
   if(running) {
    clearInterval(timeInterval);
    time += new Date().getTime() - startTime;
    timeInterval = null;
    
   }

   if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
       
    }

    running = false;
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
}

function resetTimer() {
    clearInterval(timeInterval);
    clearInterval(countdownTimer);
    timeInterval = null;
    countdownTimer = null;

    running = false;
    time = 0;
    document.getElementById('days').innerHTML = '00';
    document.getElementById('hours').innerHTML='00'
    document.getElementById('minutes').innerHTML='00'
    document.getElementById('seconds').innerHTML='00'
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
    document.getElementById('laps').innerHTML = '';
    numberOfLaps = 1;

    document.getElementById('endTime').value = ''; 
    document.getElementById('duration').value = ''; 

    

}

function countDownTimer(targetDate) {
    const targetTime = targetDate.getTime();
    countdownTimer = setInterval(()=> {
        const now = new Date().getTime();
        const timeMargin = targetTime - now;

        if(timeMargin < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdownDisplay').textContent = "Time Over";
            return;
        }

        updateDisplay(timeMargin);
    }, [1000]);
}

function specificCountDown() {
    const endTime = document.getElementById('endTime').value;
    countDownTimer(new Date(endTime));
}

function durationCountdown() {
    const duration = document.getElementById('duration').value;
    const now = new Date();
    now.setMinutes(now.getMinutes() + parseInt(duration));
    countDownTimer(now);
}

function updateDisplay(timeMargin) {
    const days = Math.floor((timeMargin / (1000 * 60 * 60 * 24)))
    const hours = Math.floor((timeMargin % (1000 * 60 * 60 * 24)) / (1000 * 60 *60));
    const minutes = Math.floor((timeMargin % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeMargin % (1000 * 60)) / (1000));

    updateIfChanged('days', formatTime(days));
    updateIfChanged('hours', formatTime(hours));
    updateIfChanged('minutes', formatTime(minutes));
    updateIfChanged('seconds', formatTime(seconds));
}

function updateIfChanged(elementId, newVal) {
    const element = document.getElementById(elementId);
    if(element.textContent !== newVal) {
        element.textContent = newVal;
    }
}

function formatTime(num) {
    return num < 10 ? '0' + num : num;
}

function lapTimer() {
    if(running) {
        let days = document.getElementById('days').innerHTML;
        let hours = document.getElementById('hours').innerHTML;
        let minutes = document.getElementById('minutes').innerHTML;
        let seconds = document.getElementById('seconds').innerHTML;    
        let lapRecord = document.createElement('div');
        lapRecord.innerHTML = '<span style = "color: white;">Lap ' + numberOfLaps + '</span> ' + ': ' + days + ':' + hours + ':' + minutes + ':'+ seconds;
        document.getElementById('laps').appendChild(lapRecord);
        numberOfLaps++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    if(time) {
        difference = (updatedTime - startTime) + time;
    } else {
        difference = updatedTime - startTime;
    }
    let days = Math.floor((difference / (1000 * 60 * 60 * 24)))
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 *60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / (1000));
    let milliSeconds = Math.floor((difference % (1000 * 60 )) / (100));

    days = days < 10 ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliSeconds = (milliSeconds < 10) ? "00" + milliSeconds : milliSeconds < 100 ? "0" + milliSeconds : milliSeconds;

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
}

    document.getElementById('start').addEventListener('click', startTimer);
    document.getElementById('stop').addEventListener('click', stopTimer);
    document.getElementById('reset').addEventListener('click', resetTimer);
    document.getElementById('lap').addEventListener('click', lapTimer);
