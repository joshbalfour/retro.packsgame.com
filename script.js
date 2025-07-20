// Slideshow configuration
const slideImages = [
    'assets/menu.png',
    'assets/gameplay.png', 
    'assets/paused.png',
    'assets/done.png',
    'assets/splash.png'
];

let currentSlide = 0;
let slideInterval;

// Initialize slideshow
function initSlideshow() {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas) return;
    
    // Create image element for slideshow
    const slideImage = document.createElement('img');
    slideImage.id = 'slideshow-image';
    slideImage.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
        background: #9bb56e;
        transition: opacity 0.5s ease-in-out;
    `;
    
    canvas.innerHTML = '';
    canvas.appendChild(slideImage);
    
    // Start slideshow
    showSlide(0);
    startAutoSlide();
    
    // Add click handlers for manual navigation
    canvas.addEventListener('click', nextSlide);
}

// Show specific slide
function showSlide(index) {
    const slideImage = document.getElementById('slideshow-image');
    if (!slideImage || !slideImages[index]) return;
    
    slideImage.style.opacity = '0';
    
    setTimeout(() => {
        slideImage.src = slideImages[index];
        slideImage.alt = `Game Screenshot ${index + 1}`;
        slideImage.style.opacity = '1';
    }, 250);
    
    currentSlide = index;
}

// Go to next slide
function nextSlide() {
    const nextIndex = (currentSlide + 1) % slideImages.length;
    showSlide(nextIndex);
    
    // Reset auto-slide timer when manually navigating
    stopAutoSlide();
    startAutoSlide();
}

// Go to previous slide
function prevSlide() {
    const prevIndex = currentSlide === 0 ? slideImages.length - 1 : currentSlide - 1;
    showSlide(prevIndex);
    
    // Reset auto-slide timer when manually navigating
    stopAutoSlide();
    startAutoSlide();
}

// Start automatic slideshow
function startAutoSlide() {
    slideInterval = setInterval(() => {
        const nextIndex = (currentSlide + 1) % slideImages.length;
        showSlide(nextIndex);
    }, 3000); // Change slide every 3 seconds
}

// Stop automatic slideshow
function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initSlideshow);

// Pause slideshow when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});
