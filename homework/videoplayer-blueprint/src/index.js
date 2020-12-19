import "./styles.css";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoControls = document.getElementById("jsControls");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsSettings");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const progressBar = document.getElementById("jsProgressBar");


function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        // volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
}
function exitFullScreen() {
    fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScrnBtn.addEventListener("click", goFullScreen);
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
function goFullScreen() {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
    fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScrnBtn.removeEventListener("click", goFullScreen);
}

const formatTime = timeInSeconds => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    let minutes = result.substr(3, 2);
    let seconds = result.substr(6, 2);
    return `${minutes}:${seconds}`;
};

function getCurrentTime() {
    currentTime.innerHTML = formatTime(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
    const totalTimeString = formatTime(videoPlayer.duration);
    progressBar.setAttribute('max', videoPlayer.duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
}

function handleEnded() {
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
function updateProgress() {
    progressBar.value = Math.floor(videoPlayer.currentTime);
}
function handleKeyDown(event) {
    const key = event.which || event.keyCode;
    if (key == 32) {
        handlePlayClick();
    }
}
function showControls(event) {
    videoControls.style.display = "";
    document.body.style.cursor = "";
}
function hideControls(event) {
    videoControls.style.display = "none";
    document.body.style.cursor = "none";
}

(function () {
    var lastMove = Date.now();

    document.onmousemove = function () {
        lastMove = Date.now();
    }

    setInterval(function () {
        var diff = Date.now() - lastMove;
        if (diff > 3000) {
            hideControls();
        }
    }, 1000);
}());

function init() {
    videoPlayer.volumn = 0.5;
    window.addEventListener("mousemove", showControls);
    playBtn.addEventListener("click", handlePlayClick);
    videoPlayer.addEventListener("click", handlePlayClick);
    window.addEventListener("keydown", handleKeyDown);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScrnBtn.addEventListener("click", goFullScreen);
    fullScrnBtn.addEventListener("click", exitFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
    videoPlayer.addEventListener("ended", handleEnded);
    videoPlayer.addEventListener("timeupdate", updateProgress);
    videoPlayer.addEventListener("ended", videoPlayer.play);
}

if (videoContainer) {
    init();
}
