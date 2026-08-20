// Función actualizada en vista_alumno.js
function renderizarClases() {
    contenedorClases.innerHTML = '';

    baseDatosSimulada.clases.forEach(clase => {
        const sede = baseDatosSimulada.sedes.find(s => s.id === clase.sedeId);
        const nivel = baseDatosSimulada.niveles.find(n => n.id === clase.nivelId);
        
        const cuposDisponibles = clase.capacidadMaxima - clase.inscritos.length;
        const yaInscrito = clase.inscritos.includes(idUsuarioActivo);

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-clase';

        let htmlBoton = '';
        if (yaInscrito) {
            htmlBoton = `<button disabled>Ya estás inscrito</button>`;
        } else if (cuposDisponibles === 0) {
            htmlBoton = `<button disabled style="background-color: #e74c3c;">Clase Llena</button>`;
        } else {
            htmlBoton = `<button onclick="reservarClase(${clase.id})">Reservar Lugar</button>`;
        }

        // Aquí se inyecta la imagen promocional para cada clase
        tarjeta.innerHTML = `
            <img src="assets/imagen4.jpg" alt="Clase de Tenis" class="tarjeta-img">
            <div class="tarjeta-cuerpo">
                <h4>${fechaFormateada(clase.fecha)} - ${clase.hora}</h4>
                <p><strong>Sede:</strong> ${sede.nombre}</p>
                <p><strong>Nivel:</strong> ${nivel.nombre}</p>
                <p><strong>Disponibilidad:</strong> ${cuposDisponibles} de ${clase.capacidadMaxima} lugares</p>
                ${htmlBoton}
            </div>
        `;
        contenedorClases.appendChild(tarjeta);
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