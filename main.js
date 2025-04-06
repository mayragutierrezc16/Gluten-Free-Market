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

  const form = document.getElementById('newsletter-form');
  const messageDiv = document.getElementById('subscribe-message');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    const response = await fetch('subscribe.php', {
      method: 'POST',
      body: formData
    });

    const result = await response.text();

    if (result.trim() === "success") {
      messageDiv.textContent = "¡Gracias por suscribirte!";
      messageDiv.style.color = "white";
      form.reset();
    } else {
      messageDiv.textContent = "Hubo un error. Intentá nuevamente.";
      messageDiv.style.color = "red";
    }
  });