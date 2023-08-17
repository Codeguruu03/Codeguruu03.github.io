const slider = document.querySelector(".slider");
let slideIndex = 0;

function slide() {
    slideIndex++;
    if (slideIndex > 2) {
        slideIndex = 0;
    }
    const translateValue = -slideIndex * 100;
    slider.style.transform = `translateX(${translateValue}%)`;
}

// Change slide every 3 seconds
setInterval(slide, 3000);
