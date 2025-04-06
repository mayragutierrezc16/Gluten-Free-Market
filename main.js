// Toggle del menú en mobile
const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  function moveToNextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    const offset = slides[currentIndex].offsetLeft;
    track.scrollTo({ left: offset, behavior: 'smooth' });
  }

  setInterval(moveToNextSlide, 4000);
