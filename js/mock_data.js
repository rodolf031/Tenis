const baseDatosSimulada = {
    usuarios: [
        {
            id: 1,
            nombre: "Profesor Michell",
            rol: "admin",
            correo: "admin@tenis.com",
            password: "admin", 
            horasDisponibles: null 
        },
        {
            id: 2,
            nombre: "Alumno Uno",
            rol: "alumno",
            correo: "alumno1@test.com",
            password: "123",
            horasDisponibles: 10
        },
        {
            id: 3,
            nombre: "Alumno Dos",
            rol: "alumno",
            correo: "alumno2@test.com",
            password: "123",
            horasDisponibles: 0
        }
    ],
    sedes: [
        { id: 1, nombre: "Sede 1" },
        { id: 2, nombre: "Sede 2" },
        { id: 3, nombre: "Sede 3" }
    ],
    niveles: [
        { id: 1, nombre: "Nivel 1" },
        { id: 2, nombre: "Nivel 2" },
        { id: 3, nombre: "Nivel 3" }
    ],
    clases: [
        {
            id: 1,
            fecha: "2026-08-25",
            hora: "08:00",
            sedeId: 1,
            nivelId: 2,
            capacidadMaxima: 4,
            inscritos: [2] 
        },
        {
            id: 2,
            fecha: "2026-08-25",
            hora: "10:00",
            sedeId: 2,
            nivelId: 1,
            capacidadMaxima: 8,
            inscritos: []
        }
    ]
};