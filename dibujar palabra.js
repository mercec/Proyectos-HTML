function dibujarPalabra(){
    let palabra = document.querySelector("#palabra");
    let dibujo = document.querySelector("#dibujo");
   
    for (const letra of palabra.value) {
        dibujo.innerHTML+=`<span onclick="mostrarLetra('${letra}')"><h1>${letra}</h1></span>`;
       
    }


}

function mostrarLetra(letra){
    alert(letra);
}
function placeWord(word) {
    const directions = [
        { x: 1, y: 0 }, // Horizontal
        { x: 0, y: 1 }, // Vertical
        { x: 1, y: 1}, // diagonal
    ]
}