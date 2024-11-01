document.getElementById("formMateria").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    const nombreMateria = document.getElementById("nombreMateria").value;
    const anio = document.getElementById("anio").value;
    const nombreProfesor = document.getElementById("nombreProfesor").value;

    
    const materia = {
        nombre: nombreMateria,
        anio: anio,
        profesor: nombreProfesor
    };

    
    const materiaJSON = JSON.stringify(materia);

    document.getElementById("resultadoMateria").innerText = "Datos en JSON: " + materiaJSON;
});
document.getElementById("formDispositivo").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    const tipo = document.getElementById("tipo").value;
    const codigo = document.getElementById("codigo").value;

    
    const dispositivo = {
        tipo: tipo,
        codigo: codigo
    };

    const dispositivoJSON = JSON.stringify(dispositivo);

    
    document.getElementById("resultadoDispositivo").innerText = "Datos en JSON: " + dispositivoJSON;
});