function updateCurrentDateTime() {
  var now = new Date();
  var timeSpanElement = document.getElementById("time");
  var dateSpanElement = document.getElementById("date");
  timeSpanElement.innerHTML = now.toLocaleTimeString();
  dateSpanElement.innerHTML = now.toLocaleDateString();
}

const stopwatchTickMs = 100;
var msLapsed = 0;
var msLastLap = 0;
var stopwatchInterval;
var stopwatchFaceDiv;

function stopwatchTick() {
  msLapsed += stopwatchTickMs;
  updateStopwatchFace(msLapsed);
}

function updateStopwatchFace(ms) {
  stopwatchFaceDiv.innerHTML = msToString(ms);
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
  document.querySelector("#stopwatchLapBtn").disabled = true;
  if ((msLapsed = 0)) {
    document.querySelector("#stopwatchResetBtn").disabled = true;
  }
}

function stopwatchReset() {
  stopwatchStop();
  msLapsed = 0;
  updateStopwatchFace(0);
  document.getElementById("lapTableBlankRow").style.display = null;
  document.querySelectorAll("*.lapRow").forEach(r => r.remove());
}

function stopwatchLap() {
  let msLap = msLapsed - msLastLap;
  document.getElementById("lapTableBlankRow").style.display = "none";
  let row = document.getElementById("stopwatchLapTable").insertRow(-1);
  row.setAttribute("class", "lapRow");
  row.insertCell(0).innerHTML = msToString(msLap);
  row.insertCell(1).innerHTML = msToString(msLapsed);
  msLastLap = msLapsed;
}

function msToString(ms) {
  let timeParts = [
    Math.floor(ms / 3600000),
    Math.floor((ms / 60000) % 60),
    Math.floor((ms / 1000) % 60),
  ];
  let timeStringParts = [];
  timeParts.forEach((t) => timeStringParts.push(addLeadingZeros(t)));
  let msPart = addLeadingZeros(ms % 1000, 3);
  return timeStringParts.join(":") + "." + msPart;
}

function addLeadingZeros(num, digits = 2) {
  let numString = num.toString();
  let numStringLength = numString.length;
  for (i = 0; i < digits - numStringLength; i++) {
    numString = "0" + numString;
  }
  return numString;
}
