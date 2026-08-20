// auth.js

// Selecciona los elementos del DOM en la página de inicio de sesión
const loginForm = document.getElementById('login-form');
const errorMensaje = document.getElementById('login-error');

// Verifica si el formulario existe en la vista actual para evitar errores en otras páginas
if (loginForm) {
    loginForm.addEventListener('submit', function(evento) {
        // Evita que la página se recargue al procesar el formulario
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

            // Ejecuta la redirección basada en el tipo de cuenta
            if (usuarioEncontrado.rol === 'admin') {
                window.location.href = 'admin.html';
            } else if (usuarioEncontrado.rol === 'alumno') {
                window.location.href = 'alumno.html';
            }
        } else {
            errorMensaje.textContent = 'Correo o contraseña incorrectos. Intente de nuevo.';
        }
    });
}

// Función global para cerrar sesión, detecta el botón en admin.html y alumno.html
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', function() {
        localStorage.removeItem('usuarioActivoId');
        localStorage.removeItem('usuarioActivoRol');
        window.location.href = 'index.html';
    });
}