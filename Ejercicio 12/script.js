let words = ["SEDA", "NENE", "TERMOTANQUE", "CERO", "CEREALES"];
const grid = document.getElementById("word-search");
const wordsList = document.getElementById("words-list");
const gridSize = 10;
let selectedCells = [];
let foundWords = new Set();

// lista de palabras aleatorias \\
function generateRandomWords() {
    const possibleWords = ["HOGAR", "PAJARO", "PERRO", "GATO", "NETFLIX", "DISNEY", "MOTO", "AUTO", "MANO", "CABEZA", "OJOS", "CASTAÑO", "ABRAZO", "AMIGO", "ARENA", "LAVANDA", "BARCA", "BRAZO", "BRUJULA", "CABLE", "CAFÉ", "CAMPO", "CASA", "CELULA", "CIELO", "CIRCE", "CLASE", "COBRE", "COCHERA", "COLOR", "COMIDA", "CORREO", "CUENTO", "DANZA", "DEDO", "DELTA", "DIENTE", "DOLOR", "ECO", "EDAD", "ELEFANTE", "ENERGÍA", "ESCOBAR", "ESCUDO", "ESPAÑA", "ESPUMA", "ESTRELLA", "FAROL", "FLECHA", "FLOR", "FRUTA", "FUEGO", "RATA", "GLOBO", "GRANO", "GUANTE", "GUITARRA", "HACHA", "HADA", "HAMBRE", "HOJA", "IGLESIA", "ISLA", "JABÓN", "JUEGO", "JUGO", "LAGO", "LUNA", "MADERA", "MANO", "MARIPOSA", "MELÓN", "MIEL", "MONTAÑA", "NARANJA", "NIEVE", "NUBE", "NUDO", "OLLA", "OREJA", "ORO", "CALLOSUM", "PAPEL", "PIEDRA", "PLUMA", "POLLO", "RADIO", "RAMA", "RÍO", "ROSA", "SAL", "SANGRE", "SILLA", "SOL", "SONRISA", "TABLA", "TAMBOR", "TAZA", "TELA", "TIERRA", "TINTO", "TORO", "TRIGO", "TROMPETA", "UNA", "VENTANA", "VIENTO", "YATE", "ZANAHORIA", "ZAPATO", "ÁRBOL", "ÁLAMO", "ÓRGANO", "ABEJA", "ÁGATA", "ÉBANO", "ÍNDIGO", "ÓPALO", "ÚTERO", "ÍCARO", "ÚLTIMO", "ÉXITO", "ÓXIDO", "AMOR", "ÚLTIMO", "ÉXITO", "ÓXIDO", "ÁBACO", "ÍCONO", "ÚLCERA", "ÉPICA", "ÓXIDO", "ÁBACO", "ÍCONO", "ÚLCERA", "ABANICO", "ÁBACO", "ABDOMEN", "ABIERTO", "ABISMO", "ABOGADO", "ABONO", "ABRIGO", "ABUELO", "ACEITE", "ACERO", "ACIERTO", "ACUERDO", "ADENTRO", "ADIVINA", "AFILADO", "AGENDA", "ÁGIL", "AGUA", "ÁGUILA", "AHOGADO", "AHORA", "ALBARICOQUE", "ALCACHOFA", "ALFOMBRA", "ALACENA", "ALTURA", "ALUMNO", "AMBIENTE", "AMENAZA", "AMIGO", "ÁNIMO", "ANTENA", "ÁNGULO", "ANILLO", "ANORMAL", "ANSIEDAD", "ANTES", "AÑO", "ANUNCIO", "APOYO", "APRETADO", "APROBADO", "ARCO", "ÁREA", "ARGUMENTO", "ARMARIO", "ARROZ", "ARTE", "ARTISTA", "ASIENTO", "ASOMBRO", "ASUNTO", "ATAQUE", "ÁTOMO", "AULLIDO", "AUTORIDAD", "AVANZADO", "AVE", "AVIÓN", "AYUDA", "AZOTE", "AZUL", "BACTERIA", "BAILARÍN", "BAJO", "BALCÓN", "BALÓN", "BANDERA", "BANQUETA", "BARRIGA", "BASURA", "BATA", "BATERÍA", "BAYA", "BEBIDA", "BÉISBOL", "BELLEZA", "BENDICIÓN", "BICICLETA", "BILLETE", "BIZARRO", "BLANCO", "BLOQUE", "BODA", "BOLÍGRAFO", "BOMBA", "BONITO", "BORRADOR", "BOSQUE", "BOTÓN", "BRILLANTE", "BRÓCOLI", "BRUJO", "BUCEO", "BUFANDA", "BÚHO", "BULTO", "BURRO", "CABEZA", "CABINA", "CABRA", "CACHORRO", "CACIQUE", "CÁCTUS", "CADENA", "CAJA", "CAJÓN", "CALABAZA", "CALOR", "CAMBIO", "CAMELLO", "CAMINO", "CAMISA", "CAMPANA"];
    words = [];
    while (words.length < 5) {
        const word = possibleWords[Math.floor(Math.random() * possibleWords.length)];
        if (!words.includes(word)) {
            words.push(word);
        }
    }
}

// Genera la sopa de letras \\
function createGrid() {
    grid.innerHTML = '';
    wordsList.innerHTML = '';
    selectedCells = [];
    foundWords.clear();

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.textContent = getRandomLetter();
        cell.addEventListener("click", () => selectCell(cell, i));
        grid.appendChild(cell);
    }
    placeWords();
}

// Genera una letra aleatoria \\
function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

// Coloca las palabras en la sopa de letras \\
function placeWords() {
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            placed = placeWord(word);
        }
    });
}

// Coloca una palabra en la sopa de letras \\
function placeWord(word) {
    const directions = [
        { x: 1, y: 0 }, // Horizontal
        { x: 0, y: 1 }, // Vertical
        { x: 1, y: 1}, // diagonal
    ];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const maxX = direction.x === 1 ? gridSize - word.length : gridSize;
    const maxY = direction.y === 1 ? gridSize - word.length : gridSize;
    const startX = Math.floor(Math.random() * maxX);
    const startY = Math.floor(Math.random() * maxY);

    // Verificar si la palabra cabe
    for (let i = 0; i < word.length; i++) {
        const x = startX + i * direction.x;
        const y = startY + i * direction.y;
        const index = y * gridSize + x;
        const cell = grid.children[index];
        if (cell.dataset.occupied && cell.textContent !== word[i]) {
            return false;
        }
    }

    // Colocar la palabra
    for (let i = 0; i < word.length; i++) {
        const x = startX + i * direction.x;
        const y = startY + i * direction.y;
        const index = y * gridSize + x;
        const cell = grid.children[index];
        cell.textContent = word[i];
        cell.dataset.occupied = true;
        cell.dataset.word = word;
    }

    // Añadir la palabra a la lista
    const listItem = document.createElement("li");
    listItem.textContent = word;
    listItem.dataset.word = word;
    wordsList.appendChild(listItem);
    return true;
}

// Selecciona una celda
function selectCell(cell, index) {
    cell.classList.toggle("selected");
    if (cell.classList.contains("selected")) {
        selectedCells.push(index);
    } else {
        selectedCells = selectedCells.filter(i => i !== index);
    }
    checkWord();
}

// Comprueba si se ha encontrado una palabra
function checkWord() {
    const selectedWord = selectedCells.map(index => grid.children[index].textContent).join("");
    if (words.includes(selectedWord)) {
        selectedCells.forEach(index => grid.children[index].style.backgroundColor = "#f0f");
        selectedCells = [];

        // Tachar la palabra de la lista
        const listItem = document.querySelector(`li[data-word="${selectedWord}"]`);
        if (listItem) {
            listItem.style.textDecoration = "line-through";
        }

        // Añadir la palabra encontrada al conjunto
        foundWords.add(selectedWord);

        // Comprobar si se han encontrado todas las palabras
        if (foundWords.size === words.length) {
            setTimeout(() => {
                alert("Ganaste! YIPPEEEE!!!!!");
                generateRandomWords();
                createGrid();
            }, 100);
        }
    }
}

// Inicializa la sopa de letras con palabras aleatorias
generateRandomWords();
createGrid();
