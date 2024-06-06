function updateCurrentDateTime() {
  var now = new Date();
  var timeSpanElement = document.getElementById("time");
  var dateSpanElement = document.getElementById("date");
  timeSpanElement.innerHTML = now.toLocaleTimeString();
  dateSpanElement.innerHTML = now.toLocaleDateString();
}

const stopwatchTickMs = 100;
var ms = 0;
var sec = 0;
var min = 0;
var hour = 0;
var stopwatchInterval;
var stopwatchFaceDiv;

function stopwatchTick() {
  ms += stopwatchTickMs;
  if (ms >= 1000) {
    sec++;
    ms -= 1000;
  }
  if (sec >= 60) {
    min++;
    sec -= 60;
  }
  if (min >= 60) {
    hour++;
    min -= 60;
  }
  updateStopwatchFace();
}

function updateStopwatchFace() {
  let time = "";
  [hour, min, sec].forEach(
    (n) =>
      (time +=
        n.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) + ":")
  );
  time =
    time.substring(0, time.length - 1) +
    "." +
    ms.toLocaleString(undefined, {
      minimumIntegerDigits: 3,
      useGrouping: false,
    });
  stopwatchFaceDiv.innerHTML = time;
}

function stopwatchToggle() {
  if (!stopwatchFaceDiv) {
    stopwatchFaceDiv = document.getElementById("stopwatchFace");
  }
  if (!stopwatchInterval) {
    stopwatchStart();
  } else {
    stopwatchStop();
  }
}

function stopwatchStart() {
  stopwatchInterval = setInterval(stopwatchTick, stopwatchTickMs);
  document.querySelector("#stopwatchToggleBtn").innerHTML = "Stop";
  document.querySelector("#stopwatchResetBtn").disabled = false;
  document.querySelector("#stopwatchLapBtn").disabled = false;
}

function stopwatchStop() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  document.querySelector("#stopwatchToggleBtn").innerHTML = "Start";
  document.querySelector("#stopwatchResetBtn").disabled = true;
  document.querySelector("#stopwatchLapBtn").disabled = true;
}

function stopwatchReset() {
  stopwatchStop();
  [hour, min, sec, ms] = [0, 0, 0, 0];
  updateStopwatchFace();
}

function stopwatchLap() {}
