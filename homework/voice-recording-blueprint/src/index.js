// import "./styles.css";

const record = document.getElementById("jsRecordBtn");
const TimeElapsed = document.getElementById("jsTimeElapsed");

let mediaRecorder;
let timdId;

const handleAudioData = () => {
    const { data: audioFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(audioFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
}
const elapsedTime = () => {
    var nStart = new Date().getTime();
    timdId = setInterval(function () {
        var now = new Date().getTime();
        var distance = now - nStart;
        TimeElapsed.innerText = `${Math.round(distance / 1000, 1)} seconds elapsed`;
    }, 1000)
};

const startRecording = () => {
    mediaRecorder.start();
    elapsedTime();
    record.innerHTML = "STOP RECORDING"
    record.removeEventListener("click", startRecording);
    record.addEventListener("click", stopRecording);
};

const stopRecording = () => {
    clearInterval(timdId);
    mediaRecorder.stop();
    TimeElapsed.innerText = "";
    record.innerHTML = "START Record";
    record.removeEventListener("click", stopRecording);
    record.addEventListener("click", startRecording);
};

function init() {
    var constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);
            record.addEventListener("click", startRecording);
            mediaRecorder.addEventListener("dataavailable", handleAudioData);
        })
        .catch(function (err) {
            console.log('The following error occurred: ' + err);
        })
}

if (navigator.mediaDevices) {
    init();
}
