document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".video-slide");
    const videoContainer = document.querySelector(".video-container");
    const videoOffset = videoContainer.offsetTop;

    function handleScroll() {
        const scrollY = window.scrollY;
        const scrollPercent = (scrollY - videoOffset) / window.innerHeight;

        videos.forEach((video, index) => {
            const videoOpacity = Math.max(0, 1 - Math.abs(scrollPercent - index) * 2);
            video.style.opacity = videoOpacity;
            if (videoOpacity === 1) {
                video.play();
            } else {
                video.pause();
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
});
 