// vista_alumno.js

const idUsuarioActivo = parseInt(localStorage.getItem('usuarioActivoId'));
const rolUsuarioActivo = localStorage.getItem('usuarioActivoRol');

// Valida que exista una sesión activa y que corresponda al rol de alumno
if (!idUsuarioActivo || rolUsuarioActivo !== 'alumno') {
    window.location.href = 'index.html';
}

const alumnoActivo = baseDatosSimulada.usuarios.find(usuario => usuario.id === idUsuarioActivo);

// Selecciona los contenedores del DOM
const contenedorNombre = document.getElementById('nombre-alumno');
const contenedorHoras = document.getElementById('saldo-horas');
const contenedorClases = document.getElementById('lista-clases-disponibles');
const contenedorNotificaciones = document.getElementById('notificaciones-container');
const btnComprarHoras = document.getElementById('btn-comprar-horas');

function cargarDatosAlumno() {
    contenedorNombre.textContent = `Bienvenido, ${alumnoActivo.nombre}`;
    contenedorHoras.textContent = alumnoActivo.horasDisponibles;
}

function fechaFormateada(fechaString) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date(fechaString + 'T00:00:00');
    return fecha.toLocaleDateString('es-ES', opciones);
}

// Genera las tarjetas HTML para cada clase disponible en el sistema
function renderizarClases() {
    contenedorClases.innerHTML = '';

    baseDatosSimulada.clases.forEach(clase => {
        const sede = baseDatosSimulada.sedes.find(s => s.id === clase.sedeId);
        const nivel = baseDatosSimulada.niveles.find(n => n.id === clase.nivelId);
        
        const cuposDisponibles = clase.capacidadMaxima - clase.inscritos.length;
        const yaInscrito = clase.inscritos.includes(idUsuarioActivo);

        const tarjeta = document.createElement('div');
        tarjeta.className = 'clase-card';

        let htmlBoton = '';
        if (yaInscrito) {
            htmlBoton = `<button disabled style="background-color: var(--color-texto-claro);">Inscrito</button>`;
        } else if (cuposDisponibles === 0) {
            htmlBoton = `<button disabled style="background-color: var(--color-error);">Llena</button>`;
        } else {
            htmlBoton = `<button onclick="reservarClase(${clase.id})">Reservar</button>`;
        }

        tarjeta.innerHTML = `
            <div>
                <h4>${fechaFormateada(clase.fecha)} - ${clase.hora}</h4>
                <p>Sede: ${sede.nombre} | Nivel: ${nivel.nombre}</p>
                <p><small>Cupos disponibles: ${cuposDisponibles} / ${clase.capacidadMaxima}</small></p>
            </div>
            <div>
                ${htmlBoton}
            </div>
        `;
        contenedorClases.appendChild(tarjeta);
    });
}

// Procesa la deducción de horas y registra al alumno en la clase
window.reservarClase = function(idClase) {
    const clase = baseDatosSimulada.clases.find(c => c.id === idClase);

    if (alumnoActivo.horasDisponibles > 0) {
        if (clase.inscritos.length < clase.capacidadMaxima) {
            alumnoActivo.horasDisponibles -= 1;
            clase.inscritos.push(idUsuarioActivo);
            
            cargarDatosAlumno();
            renderizarClases();
            mostrarNotificacion('Reserva confirmada con éxito. Se ha descontado 1 hora.', 'exito');
        }
    } else {
        mostrarNotificacion('No tienes horas suficientes. Por favor compra un paquete.', 'error');
    }
};

function mostrarNotificacion(mensaje, tipo) {
    const colorFondo = tipo === 'error' ? 'var(--color-error)' : 'var(--color-secundario)';
    contenedorNotificaciones.innerHTML = `
        <div style="padding: 1rem; margin-bottom: 1rem; border-radius: 6px; color: white; background-color: ${colorFondo}; transition: var(--transicion);">
            ${mensaje}
        </div>
    `;
    
    setTimeout(() => {
        contenedorNotificaciones.innerHTML = '';
    }, 3000);
}

// Simula la compra de un paquete de horas
if (btnComprarHoras) {
    btnComprarHoras.addEventListener('click', () => {
        alumnoActivo.horasDisponibles += 5;
        cargarDatosAlumno();
        mostrarNotificacion('Has comprado un paquete de 5 horas de prueba.', 'exito');
    });
}

cargarDatosAlumno();
renderizarClases();