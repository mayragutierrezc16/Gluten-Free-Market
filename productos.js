// ===================
// Carrito
// ===================
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarIconoCarrito() {
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const contador = document.getElementById('carrito-contador');
  if (contador) {
    contador.textContent = total;
  }
}

// ===================
// Render de categorías
// ===================
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

// ===================
// Render de productos
// ===================
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
          <button class="btn-agregar" data-id="${p.nombre}">Agregar al carrito</button>
        </div>
      `).join('')}
    </div>
    <a class="volver" href="#">← Volver a categorías</a>
  `;

  // Eventos para los botones de agregar
  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', () => {
      const nombreProducto = btn.dataset.id;
      const producto = productos[cat].find(p => p.nombre === nombreProducto);

      const existe = carrito.find(p => p.nombre === producto.nombre);
      if (existe) {
        existe.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      guardarCarrito();
      actualizarIconoCarrito();
      alert(`${producto.nombre} agregado al carrito.`);
    });
  });
}

// ===================
// Navegación entre páginas (categorías / productos)
// ===================
function manejarRuta() {
  const hash = location.hash.replace('#', '');
  if (!hash) {
    renderCategorias();
  } else {
    renderProductos(hash);
  }
}

// ===================
// Inicio de la app
// ===================
window.addEventListener('DOMContentLoaded', () => {
  manejarRuta();
  actualizarIconoCarrito();
});

window.addEventListener('hashchange', manejarRuta);

// ===================
// Menú mobile
// ===================
const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// ===================
// Newsletter
// ===================
(function(){
  emailjs.init("b64dukZbjEqkEjnDT");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletter-form");
  const successMessage = document.getElementById("success-message");

  if (form) {
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
  }
});
