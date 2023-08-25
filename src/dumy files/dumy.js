const celeb = document.querySelector(".celeb");
const celebrity = document.querySelector(".celebrity");
const withus = celebrity.querySelector(".withus").offsetWidth;
const arrorbtn = document.querySelectorAll(".celeb i");
const celebritychild = [...celebrity.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the celebrity at once
let cardPerView = Math.round(celebrity.offsetWidth / withus);

// Insert copies of the last few cards to beginning of celebrity for infinite scrolling
celebritychild.slice(-cardPerView).reverse().forEach(card => {
    celebrity.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of celebrity for infinite scrolling
celebritychild.slice(0, cardPerView).forEach(card => {
    celebrity.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the celebrity at appropriate postition to hide first few duplicate cards on Firefox
celebrity.classList.add("no-transition");
celebrity.scrollLeft = celebrity.offsetWidth;
celebrity.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the celebrity left and right
arrorbtn.forEach(btn => {
    btn.addEventListener("click", () => {
        celebrity.scrollLeft += btn.id == "left" ? -withus : withus;
    });
});

const dragStart = (e) => {
    isDragging = true;
    celebrity.classList.add("dragging");
    // Records the initial cursor and scroll position of the celebrity
    startX = e.pageX;
    startScrollLeft = celebrity.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the celebrity based on the cursor movement
    celebrity.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    celebrity.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the celebrity is at the beginning, scroll to the end
    if(celebrity.scrollLeft === 0) {
        celebrity.classList.add("no-transition");
        celebrity.scrollLeft = celebrity.scrollWidth - (2 * celebrity.offsetWidth);
        celebrity.classList.remove("no-transition");
    }
    // If the celebrity is at the end, scroll to the beginning
    else if(Math.ceil(celebrity.scrollLeft) === celebrity.scrollWidth - celebrity.offsetWidth) {
        celebrity.classList.add("no-transition");
        celebrity.scrollLeft = celebrity.offsetWidth;
        celebrity.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over celebrity
    clearTimeout(timeoutId);
    if(!celeb.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the celebrity after every 2500 ms
    timeoutId = setTimeout(() => celebrity.scrollLeft += withus, 2500);
}
autoPlay();

celebrity.addEventListener("mousedown", dragStart);
celebrity.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
celebrity.addEventListener("scroll", infiniteScroll);
celeb.addEventListener("mouseenter", () => clearTimeout(timeoutId));
celeb.addEventListener("mouseleave", autoPlay);