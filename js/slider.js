
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Video Slider Logic
    const slides = document.querySelectorAll('.video-slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    
    if (slides.length > 0) {
        let currentIndex = 0;

        function showSlide(index) {
            // Pause and reset all videos
            slides.forEach((slide) => {
                const vid = slide.querySelector('video');
                if (vid) {
                    vid.pause();
                    vid.currentTime = 0;
                }
                slide.classList.remove('active');
            });

            // Activate target slide
            currentIndex = (index + slides.length) % slides.length;
            const activeSlide = slides[currentIndex];
            activeSlide.classList.add('active');

            // Play active slide video
            const activeVideo = activeSlide.querySelector('video');
            if (activeVideo) {
                activeVideo.play().catch(error => {
                    console.log("Autoplay prevented or blocked: ", error);
                });
            }
        }

        // Initialize first slide
        showSlide(currentIndex);

        // Setup 'ended' listener for auto-advance when video finishes
        slides.forEach((slide, idx) => {
            const video = slide.querySelector('video');
            if (video) {
                video.addEventListener('ended', () => {
                    showSlide(idx + 1);
                });
            }
        });

        // Next Button Click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentIndex + 1);
            });
        }

        // Prev Button Click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentIndex - 1);
            });
        }
    }

    // 2. Bestsellers & Fantastic Finds Sliders (Existing)
    const bestsellersTrack = document.getElementById('bestsellersTrack');
    const bestsellersPrev = document.querySelector('.prev-btn');
    const bestsellersNext = document.querySelector('.next-btn');

    if (bestsellersTrack && bestsellersPrev && bestsellersNext) {
        bestsellersNext.addEventListener('click', () => {
            bestsellersTrack.scrollBy({ left: 300, behavior: 'smooth' });
        });
        bestsellersPrev.addEventListener('click', () => {
            bestsellersTrack.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    const findsTrack = document.getElementById('findsTrack');
    const findsPrev = document.querySelector('.finds-prev');
    const findsNext = document.querySelector('.finds-next');

    if (findsTrack && findsPrev && findsNext) {
        findsNext.addEventListener('click', () => {
            findsTrack.scrollBy({ left: 280, behavior: 'smooth' });
        });
        findsPrev.addEventListener('click', () => {
            findsTrack.scrollBy({ left: -280, behavior: 'smooth' });
        });
    }
});