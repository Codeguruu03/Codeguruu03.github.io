const videoPlayer = document.getElementById('videoPlayer');
const fullscreenButton = document.getElementById('fullscreenButton');

fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

videoPlayer.addEventListener('click', toggleVideoSize);

function toggleVideoSize() {
    videoPlayer.classList.toggle('full-screen');
}
