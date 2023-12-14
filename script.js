let intentos = 6;
var palabra;
const urlAPI = 'https://random-word-api.herokuapp.com/word?lang=en&length=5';

const INPUT = document.getElementById("guess-input");
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const restart = document.getElementById("restart-button");
restart.addEventListener("click", reiniciar);
const errorMensaje = document.getElementById("error");

const GRID = document.getElementById("grid");

function generarPalabra(){
  return fetch(urlAPI).then(response => response.json())
  .then(response => {
    palabra = response[0].toUpperCase();
    console.log("La palabra a adivinar es: ", palabra);
  })
  .catch(err => {
    console.log("Hubo un problema con la API :(");
    let diccionario = [
      "APPLE", "HURLS", "WINGS", "YOUTH", "QUIRK", "FABLE", "CRANE", "BRAVE", "LEAVE", "CRISP",
      "BLAZE", "COAST", "FRUIT", "JUMPS", "PLUMB", "QUICK", "WRIST", "HYPER", "BEACH", "STUMP",
      "GLAZE", "FROST", "THUMP", "SKATE", "PLATE", "GRIPE", "CRISP", "BRIEF", "SLUMP", "BRIEF",
      "CHAMP", "BRISK", "CHALK", "THUMP", "BLITZ", "PRIZE", "TWIST", "WISPY", "HUSKY", "CHIRP",
      "SKIMP", "QUICK", "JIFFY", "CHAMP", "QUIRK", "WHISK", "BRICK", "GLIMP", "PLUMB", "PRIZE"
    ];    
    palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    console.log("La palabra a adivinar es: ", palabra);
  })
}
generarPalabra();

function intentar() {
  errorMensaje.style.display = "none";
  let INTENTO = leerIntento();
  INTENTO = INTENTO.replace(/\s+/g, ''); // Elimina los espacios en la palabra

  if (INTENTO.length !== 5) {
    errorMensaje.style.display = "block";
  } else {
    const ROW = document.createElement("div");
    ROW.className = "row";
    for (let i in palabra) {
      const SPAN = document.createElement("span");
      SPAN.className = "letter";
      if (INTENTO[i] === palabra[i]) {
        //VERDE
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#a7c957";
      } else if (palabra.includes(INTENTO[i])) {
        //AMARILLO
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#e9c46a";
      } else {
        //GRIS
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#e0e1dd";
      }
      ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);

    intentos--;

    if (INTENTO === palabra) {
      terminar("<h1>GANASTE!😀</h1>");
      restart.style.display = "inline-block";
      return;
    }

    if (intentos == 0) {
      terminar("<h1>PERDISTE!😖</h1>");
      restart.style.display = "inline-block";
    }
  }
}

function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

function terminar(mensaje) {
  INPUT.disabled = true;
  button.disabled = true;
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}

function reiniciar(){
  restart.style.display = "none";
  INPUT.disabled = false;
  button.disabled = false;
  
  // Elimina todas las filas de la grid
  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }
  
  intentos = 6; // Restablece los intentos
  const contenedor = document.getElementById("guesses");
  contenedor.innerHTML = ""; // Deja de mostrar el mensaje de ganaste/perdiste
  INPUT.value = ""; // Vacia el input

  // Selecciona una nueva palabra aleatoria
  generarPalabra();
}