var carousel = document.querySelector('.carousel');
var container = document.querySelector('.carousel-container');
var slides = document.querySelectorAll('.carousel-slide');

var slideWidth = carousel.offsetWidth;

var isDragging = false;
var startPos = 0;
var currentTranslate = 0;
var prevTranslate = 0;
var animationID = 0;
var currentIndex = 0;

slides.forEach((slide, index) => {
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchmove', drag);

    slide.addEventListener('click', () => {
        // Действия при клике на слайд 
       
    });
});

function dragStart(event) {
    if (event.type === 'touchstart') {
        startPos = event.touches[0].clientX;
    } else {
        startPos = event.clientX;
    }

    isDragging = true;
    animationID = requestAnimationFrame(animation);
    carousel.classList.add('grabbing');
}

function drag(event) {
    if (isDragging) {
        var currentPosition;
        if (event.type === 'touchmove') {
            currentPosition = event.touches[0].clientX;
        } else {
            currentPosition = event.clientX;
        }

        var distance = currentPosition - startPos;
        currentTranslate = prevTranslate + distance;
    }
}

function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    var movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex++;
    }

    if (movedBy > 100 && currentIndex > 0) {
        currentIndex--;
    }
    setPositionByIndex();

    carousel.classList.remove('grabbing');
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function setSliderPosition() {
    container.style.transform = `translateX(${currentTranslate}px)`;
}

function animation() {
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

window.addEventListener('resize', () => {
    slideWidth = carousel.offsetWidth;
    setPositionByIndex();
});
carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    cancelAnimationFrame(animationID);

    currentIndex = 0;
    currentTranslate = 0;
    prevTranslate = 0;

    setSliderPosition();

    carousel.classList.remove('grabbing');
});