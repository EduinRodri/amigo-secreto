// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];
let sorteados = [];

// variable que recordará el formato elegido en la primera entrada: solo nombre o nombre y apellido
let formatoInicial = "";

function validarNombre(nombre) {
  const permitidos = "abcdefghijklmnopqrstuvwxyzáéíóúñ ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ";
  let inicio = 0;
  let fin = nombre.length - 1;
  while (inicio < nombre.length && nombre[inicio] === " ") { inicio++; }
  while (fin >= 0 && nombre[fin] === " ") { fin--; }
  if (fin - inicio + 1 <= 0) { alert("El campo está vacío."); return false; }

  // validar caracteres permitidos
  for (let i = inicio; i <= fin; i++) {
    let c = nombre[i];
    let ok = false;
    for (let j = 0; j < permitidos.length; j++) {
      if (c === permitidos[j]) { ok = true; break; }
    }
    if (!ok) {
      alert("No se permiten números ni símbolos.");
      return false;
    }
  }

  // quitar espacios externos
  let limpio = "";
  for (let k = inicio; k <= fin; k++) { limpio += nombre[k]; }

  // separar palabras
  let partes = [];
  let palabra = "";
  for (let p = 0; p < limpio.length; p++) {
    if (limpio[p] === " ") {
      if (palabra !== "") { partes[partes.length] = palabra; palabra = ""; }
    } else {
      palabra += limpio[p];
    }
  }
  if (palabra !== "") { partes[partes.length] = palabra; }

  // máximo 2 palabras
  if (partes.length > 2) { alert("Solo se permite un nombre y un apellido."); return false; }

  // validar mayúsculas y minúsculas
  for (let i = 0; i < partes.length; i++) {
    let w = partes[i];
    if (!(w[0] >= "A" && w[0] <= "Z" || "ÁÉÍÓÚÑ".includes(w[0]))) {
      alert("Cada palabra debe iniciar con mayúscula.");
      return false;
    }
    for (let r = 1; r < w.length; r++) {
      let c = w[r];
      if (!(c >= "a" && c <= "z" || "áéíóúñ".includes(c))) {
        alert("Solo la primera letra de cada palabra en mayúscula.");
        return false;
      }
    }
  }

  // validar formato de entrada inicial
  if (formatoInicial === "") {
    // primera vez: definimos el formato
    formatoInicial = (partes.length === 1) ? "nombre" : "nombreApellido";
  } else {
    if (formatoInicial === "nombre" && partes.length !== 1) {
      alert("Ya iniciaste solo con nombre. Las demás entradas deben ser solo nombre.");
      return false;
    }
    if (formatoInicial === "nombreApellido" && partes.length !== 2) {
      alert("Ya iniciaste con nombre y apellido. Las demás entradas deben tener nombre y apellido.");
      return false;
    }
  }

  return true;
}

function agregarAmigo() {
  let input = document.getElementById("amigo");
  let amigo = input.value;

  if (validarNombre(amigo)) {
    // evitar duplicados exactos
    let repetido = false;
    for (let i = 0; i < amigos.length; i++) {
      if (amigos[i] === amigo) { repetido = true; break; }
    }
    if (repetido) {
      alert("Ese nombre ya está en la lista.");
    } else {
      amigos[amigos.length] = amigo;
      mostrarLista();
    }
  }
  input.value = "";
}

function mostrarLista() {
  let texto = "";
  for (let j = 0; j < amigos.length; j++) {
    texto += "<li>" + amigos[j] + "</li>";
  }
  document.querySelector("#listaAmigos").innerHTML = texto;
}

function sortearAmigo() {
  let ulResultado = document.getElementById("resultado");

  if (amigos.length === 0) {
    alert("No hay amigos para sortear.");
    ulResultado.innerHTML = "<li>No hay amigos para sortear</li>";
    return;
  }

  let indice = Math.floor(Math.random() * amigos.length);
  let ganador = amigos[indice];

  // evitar repetidos en el sorteo
  let ya = false;
  for (let i = 0; i < sorteados.length; i++) {
    if (sorteados[i] === ganador) { ya = true; }
  }

  if (ya) {
    let intentos = 0;
    while (ya && intentos < amigos.length) {
      indice = Math.floor(Math.random() * amigos.length);
      ganador = amigos[indice];
      ya = false;
      for (let i = 0; i < sorteados.length; i++) {
        if (sorteados[i] === ganador) { ya = true; }
      }
      intentos++;
    }
  }

  sorteados[sorteados.length] = ganador;
  ulResultado.innerHTML = "<li>El amigo secreto es: " + ganador + "</li>";

  if (sorteados.length === amigos.length) {
    alert("¡Todos los amigos fueron sorteados! Reiniciando el juego.");
    amigos = [];
    sorteados = [];
    formatoInicial = ""; // reiniciar el formato
    document.querySelector("#listaAmigos").innerHTML = "";
    document.querySelector("#resultado").innerHTML = "";
  }
}