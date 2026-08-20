const idUsuarioActivo = parseInt(localStorage.getItem('usuarioActivoId'));
const rolUsuarioActivo = localStorage.getItem('usuarioActivoRol');

// Valida que exista una sesión activa y que corresponda al rol de administrador
if (!idUsuarioActivo || rolUsuarioActivo !== 'admin') {
    window.location.href = 'index.html';
}

// Selecciona los contenedores principales del DOM
const formCrearClase = document.getElementById('form-crear-clase');
const selectSede = document.getElementById('sede-clase');
const selectNivel = document.getElementById('nivel-clase');
const contenedorAlumnos = document.getElementById('lista-alumnos');

// Puebla los menús desplegables del formulario con los datos simulados
function inicializarFormulario() {
    baseDatosSimulada.sedes.forEach(sede => {
        const option = document.createElement('option');
        option.value = sede.id;
        option.textContent = sede.nombre;
        selectSede.appendChild(option);
    });

    baseDatosSimulada.niveles.forEach(nivel => {
        const option = document.createElement('option');
        option.value = nivel.id;
        option.textContent = nivel.nombre;
        selectNivel.appendChild(option);
    });
}

// Genera una tabla HTML para visualizar el estado y horas de los alumnos
function renderizarAlumnos() {
    contenedorAlumnos.innerHTML = '';
    
    // Filtra la base de datos para obtener solo los registros de alumnos
    const alumnos = baseDatosSimulada.usuarios.filter(usuario => usuario.rol === 'alumno');

    if (alumnos.length === 0) {
        contenedorAlumnos.innerHTML = '<p>No hay alumnos registrados.</p>';
        return;
    }

    let htmlTabla = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
            <thead>
                <tr style="border-bottom: 2px solid var(--color-primario);">
                    <th style="padding: 1rem 0.5rem; color: var(--color-texto-claro);">Nombre</th>
                    <th style="padding: 1rem 0.5rem; color: var(--color-texto-claro);">Correo</th>
                    <th style="padding: 1rem 0.5rem; color: var(--color-texto-claro);">Horas Restantes</th>
                </tr>
            </thead>
            <tbody>
    `;

    alumnos.forEach(alumno => {
        htmlTabla += `
            <tr style="border-bottom: 1px solid var(--color-borde);">
                <td style="padding: 1rem 0.5rem;">${alumno.nombre}</td>
                <td style="padding: 1rem 0.5rem;">${alumno.correo}</td>
                <td style="padding: 1rem 0.5rem; color: var(--color-primario);"><strong>${alumno.horasDisponibles}</strong></td>
            </tr>
        `;
    });

    htmlTabla += `</tbody></table>`;
    contenedorAlumnos.innerHTML = htmlTabla;
}

// Intercepta el envío del formulario para registrar una nueva clase
if (formCrearClase) {
    formCrearClase.addEventListener('submit', function(evento) {
        evento.preventDefault();

        // Extrae los valores de los campos del formulario
        const fecha = document.getElementById('fecha-clase').value;
        const hora = document.getElementById('hora-clase').value;
        const sedeId = parseInt(selectSede.value);
        const nivelId = parseInt(selectNivel.value);
        const capacidadMaxima = parseInt(document.getElementById('capacidad-clase').value);

        // Genera un identificador secuencial para el nuevo registro
        const nuevoId = baseDatosSimulada.clases.length + 1;

        // Construye el nuevo objeto de clase
        const nuevaClase = {
            id: nuevoId,
            fecha: fecha,
            hora: hora,
            sedeId: sedeId,
            nivelId: nivelId,
            capacidadMaxima: capacidadMaxima,
            inscritos: []
        };

        // Agrega la clase a la estructura de datos
        baseDatosSimulada.clases.push(nuevaClase);

        // Reinicia los campos del formulario a su estado por defecto
        formCrearClase.reset();

        alert('Clase programada exitosamente en el sistema.');
    });
}

// Ejecuta las funciones iniciales al cargar el script
inicializarFormulario();
renderizarAlumnos();

const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', function() {
        localStorage.removeItem('usuarioActivoId');
        localStorage.removeItem('usuarioActivoRol');
        window.location.href = 'index.html';
    });
}