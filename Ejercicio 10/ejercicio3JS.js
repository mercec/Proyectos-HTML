let data = [
    {
        id: 1,
        fecha: "24-6-2022 10:30:00",
        profesor: {
            id: 1,
            nombre: "Jason",
            apellido: "Gideon"
        },
        materia: {
            id: 100,
            nombre: "Programación",
            anio: 7
        },
        aula: "Laboratorio 1",
        objetos: [
            { id: 10, tipo: "netbook", codigo: 25 },
            { id: 5, tipo: "mouse", codigo: 10 },
            { id: 7, tipo: "teclado", codigo: 1 }
        ]
    },
    {
        id: 2,
        fecha: "24-6-2022 15:20:00",
        profesor: {
            id: 2,
            nombre: "Aaron",
            apellido: "Hotchner"
        },
        materia: {
            id: 102,
            nombre: "Sistema operativo",
            anio: 3
        },
        aula: "Laboratorio 2",
        objetos: [
            { id: 0, tipo: "netbook", codigo: 1 },
            { id: 6, tipo: "mouse", codigo: 2 }
        ]
    }
];

const contenidoDiv = document.getElementById("contenido");

data.forEach(retiro => {
    let html = `
        <div class="retiro">
            <strong>Fecha:</strong> ${retiro.fecha} <br>
            <strong>Profesor:</strong> ${retiro.profesor.nombre} ${retiro.profesor.apellido} <br>
            <strong>Materia:</strong> ${retiro.materia.nombre} (Año ${retiro.materia.anio}) <br>
            <strong>Aula:</strong> ${retiro.aula} <br>
            <strong>Objetos Retirados:</strong>
            <ul>
    `;
    +
    retiro.objetos.forEach(objeto => {
        html += `
            <li>
                Tipo: ${objeto.tipo}, Código: ${objeto.codigo}
            </li>
        `;
    });

    html += `
            </ul>
        </div>
    `;

    contenidoDiv.innerHTML += html;
});
