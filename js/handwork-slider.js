document.addEventListener("DOMContentLoaded", function () {

const slider = document.querySelector(".handwork-model-slider");

if (!slider) {
    return;
}

const slides = Array.from(
    slider.querySelectorAll(".model-slide")
);

const prevButton = slider.querySelector(".model-slider-prev");
const nextButton = slider.querySelector(".model-slider-next");

if (slides.length === 0 || !prevButton || !nextButton) {
    return;
}

let currentIndex = 0;
let isAnimating = false;

const animationDuration = 800;


/* =========================================
   SET INITIAL SLIDE
   ========================================= */

slides.forEach(function (slide, index) {

    slide.classList.remove(
        "active",
        "exit-left",
        "exit-right",
        "enter-left",
        "enter-right"
    );

    if (index === 0) {
        slide.classList.add("active");
    }

});


/* =========================================
   UPDATE ARROW STATES
   ========================================= */

function updateButtons() {

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;

}


/* =========================================
   SHOW SLIDE
   ========================================= */

function showSlide(newIndex, direction) {

    if (isAnimating) {
        return;
    }

    if (newIndex < 0 || newIndex >= slides.length) {
        return;
    }

    if (newIndex === currentIndex) {
        return;
    }

    isAnimating = true;


    const currentSlide = slides[currentIndex];
    const newSlide = slides[newIndex];


    /* -----------------------------------------
       CLEAN OLD CLASSES
       ----------------------------------------- */

    slides.forEach(function (slide) {

        slide.classList.remove(
            "active",
            "exit-left",
            "exit-right",
            "enter-left",
            "enter-right"
        );

    });


    /* -----------------------------------------
       NEXT
       New slide enters from RIGHT
       Current slide leaves to LEFT
       ----------------------------------------- */

    if (direction === "next") {

        /* Current slide starts in center */
        currentSlide.classList.add("active");

        /* New slide starts outside right */
        newSlide.classList.add("enter-right");


        /* Force browser to register starting position */
        newSlide.offsetWidth;


        /* Start animation */
        requestAnimationFrame(function () {

            currentSlide.classList.remove("active");
            currentSlide.classList.add("exit-left");

            newSlide.classList.remove("enter-right");
            newSlide.classList.add("active");

        });

    }


    /* -----------------------------------------
       PREVIOUS
       New slide enters from LEFT
       Current slide leaves to RIGHT
       ----------------------------------------- */

    else {

        /* Current slide starts in center */
        currentSlide.classList.add("active");

        /* New slide starts outside left */
        newSlide.classList.add("enter-left");


        /* Force browser to register starting position */
        newSlide.offsetWidth;


        /* Start animation */
        requestAnimationFrame(function () {

            currentSlide.classList.remove("active");
            currentSlide.classList.add("exit-right");

            newSlide.classList.remove("enter-left");
            newSlide.classList.add("active");

        });

    }


    /* Update index */
    currentIndex = newIndex;


    /* -----------------------------------------
       CLEANUP AFTER ANIMATION
       ----------------------------------------- */

    setTimeout(function () {

        slides.forEach(function (slide, index) {

            slide.classList.remove(
                "active",
                "exit-left",
                "exit-right",
                "enter-left",
                "enter-right"
            );

            if (index === currentIndex) {
                slide.classList.add("active");
            }

        });

        isAnimating = false;

        updateButtons();

    }, animationDuration);

}


/* =========================================
   NEXT BUTTON
   ========================================= */

nextButton.addEventListener("click", function () {

    showSlide(
        currentIndex + 1,
        "next"
    );

});


/* =========================================
   PREVIOUS BUTTON
   ========================================= */

prevButton.addEventListener("click", function () {

    showSlide(
        currentIndex - 1,
        "previous"
    );

});


/* =========================================
   KEYBOARD SUPPORT
   ========================================= */

document.addEventListener("keydown", function (event) {

    /* Don't control slider when typing */
    const tagName = document.activeElement.tagName;

    if (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT"
    ) {
        return;
    }


    if (event.key === "ArrowRight") {

        showSlide(
            currentIndex + 1,
            "next"
        );

    }


    if (event.key === "ArrowLeft") {

        showSlide(
            currentIndex - 1,
            "previous"
        );

    }

});

/* =========================================
   INITIAL BUTTON STATE
   ========================================= */

updateButtons();


});
