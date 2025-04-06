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

// Inicializa EmailJS
(function(){
    emailjs.init("b64dukZbjEqkEjnDT"); // Reemplazá con tu User ID de EmailJS
  })();
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("newsletter-form");
    const successMessage = document.getElementById("success-message");
  
    form.addEventListener("submit", function(e) {
      e.preventDefault();
  
      emailjs.sendForm('service_l0aagcd', 'template_s4acr5q', form)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          successMessage.style.display = "block";
          form.reset();
        }, function(error) {
          console.error('FAILED...', error);
          alert("Hubo un error al suscribirte. Por favor, intentá de nuevo.");
        });
    });
  });
  