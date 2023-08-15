const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slideDescriptions = document.querySelectorAll('.slide-description');

let slideIndex = 0;

function showSlide(index) {
    if (index >= slider.children.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slider.children.length - 1;
    }

    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateSlideDescription();
}

function updateSlideDescription() {
    slideDescriptions.forEach((description, index) => {
        if (index === slideIndex) {
            description.style.display = 'block';
        } else {
            description.style.display = 'none';
        }
    });
}

prevBtn.addEventListener('click', () => {
    slideIndex--;
    showSlide(slideIndex);
});

nextBtn.addEventListener('click', () => {
    slideIndex++;
    showSlide(slideIndex);
});

// Automatically change slide every 3 seconds
setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
}, 3000);
