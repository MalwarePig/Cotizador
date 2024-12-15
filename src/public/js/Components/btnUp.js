// Mostrar el botón al hacer scroll
const btnScrollTop = document.getElementById('btnScrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) { // Mostrar después de 200px de scroll
    btnScrollTop.style.display = 'block';
  } else {
    btnScrollTop.style.display = 'none';
  }
});

// Función para subir al inicio
btnScrollTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Desplazamiento suave
  });
});


