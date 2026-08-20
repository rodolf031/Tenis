// auth.js

const loginForm = document.getElementById('login-form');
const errorMensaje = document.getElementById('login-error');
const modalLogin = document.getElementById('modal-login');
const btnCerrarModal = document.getElementById('cerrar-modal');

// Controladores para abrir el modal desde diferentes botones en el landing
const btnLoginNav = document.getElementById('btn-login-nav');
const btnInscribirme = document.getElementById('btn-inscribirme');

function abrirModal() {
    if (modalLogin) modalLogin.style.display = 'flex';
}

function cerrarModal() {
    if (modalLogin) modalLogin.style.display = 'none';
}

if (btnLoginNav) btnLoginNav.addEventListener('click', abrirModal);
if (btnInscribirme) btnInscribirme.addEventListener('click', abrirModal);
if (btnCerrarModal) btnCerrarModal.addEventListener('click', cerrarModal);

// Cierra el modal si se hace clic fuera del recuadro blanco
window.addEventListener('click', function(event) {
    if (event.target === modalLogin) {
        cerrarModal();
    }
});

// Lógica de validación
if (loginForm) {
    loginForm.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const correoIngresado = document.getElementById('correo').value;
        const passwordIngresado = document.getElementById('password').value;

        const usuarioEncontrado = baseDatosSimulada.usuarios.find(
            usuario => usuario.correo === correoIngresado && usuario.password === passwordIngresado
        );

        if (usuarioEncontrado) {
            errorMensaje.textContent = '';
            localStorage.setItem('usuarioActivoId', usuarioEncontrado.id);
            localStorage.setItem('usuarioActivoRol', usuarioEncontrado.rol);

            if (usuarioEncontrado.rol === 'admin') {
                window.location.href = 'admin.html';
            } else if (usuarioEncontrado.rol === 'alumno') {
                window.location.href = 'alumno.html';
            }
        } else {
            errorMensaje.textContent = 'Correo o contraseña incorrectos. Verifica tus datos.';
        }
    });
}

const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', function() {
        localStorage.removeItem('usuarioActivoId');
        localStorage.removeItem('usuarioActivoRol');
        window.location.href = 'index.html';
    });
}