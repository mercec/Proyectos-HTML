document.getElementById("formProfesor").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;

  
    const profesor = {
        nombre: nombre,
        apellido: apellido,
        dni: dni
    };

   
    const profesorJSON = JSON.stringify(profesor);

   
    document.getElementById("resultado").innerText = "Datos en JSON: " + profesorJSON;
});