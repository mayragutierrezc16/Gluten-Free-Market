let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


// Toggle del menú en mobile
const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

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
  
  // productos.js

const contenedor = document.getElementById('contenedor-productos');

function renderCategorias() {
    contenedor.innerHTML = `
      <h1>Categorías</h1>
      <div class="categorias fade-in">
        ${Object.entries(categorias).map(([key, data]) => `
          <a class="categoria-card" href="#${key}">
            <img src="${data.imagen}" alt="${data.nombre}">
            <h2>${data.nombre}</h2>
          </a>
        `).join('')}
      </div>
    `;
  }
  

function renderProductos(cat) {
  if (!productos[cat]) {
    contenedor.innerHTML = `<p class="error">Categoría no encontrada.</p>`;
    return;
  }

  contenedor.innerHTML = `
    <h1>${categorias[cat].nombre}</h1>
    <div class="productos fade-in">
      ${productos[cat].map(p => `
        <div class="producto">
          <img src="${p.imagen}" alt="${p.nombre}">
          <h2>${p.nombre}</h2>
          <p>${p.descripcion}</p>
          <p class="precio">$${p.precio.toLocaleString()}</p>
          <button>Agregar al carrito</button>
        </div>
      `).join('')}
    </div>
    <a class="volver" href="#">← Volver a categorías</a>
  `;
}

// Al cambiar el hash (ej: #panes), renderizar
function manejarRuta() {
  const hash = location.hash.replace('#', '');
  if (!hash) {
    renderCategorias();
  } else {
    renderProductos(hash);
  }
}

window.addEventListener('hashchange', manejarRuta);
window.addEventListener('DOMContentLoaded', manejarRuta);
