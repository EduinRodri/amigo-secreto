// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = []; // lista de amigos
let sorteados = []; // lleva control de los ya escogidos

function validarNombre(nombre) {
  const permitidos = "abcdefghijklmnopqrstuvwxyzáéíóúñ ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ";
  let inicio = 0;
  let fin = nombre.length - 1;
  while (inicio < nombre.length && nombre[inicio] === " ") { inicio++; }
  while (fin >= 0 && nombre[fin] === " ") { fin--; }
  if (fin - inicio + 1 <= 0) { alert("El campo está vacío."); return false; }

  for (let i = inicio; i <= fin; i++) {
    let c = nombre[i];
    let ok = false;
    for (let j = 0; j < permitidos.length; j++) {
        if (c === permitidos[j]) { ok = true; break; }
    }
    if (!ok) {
        alert("No se permiten números ni símbolos. Solo letras (con acentos) y un espacio para el apellido.");
        return false;
    }
  }


  let limpio = "";
  for (let k = inicio; k <= fin; k++) { limpio = limpio + nombre[k]; }

  // Comprobar mayúsculas correctas
  let partes = [];
  let palabra = "";
  for (let p = 0; p < limpio.length; p++) {
    if (limpio[p] === " ") {
      if (palabra !== "") { partes[partes.length] = palabra; palabra = ""; }
    } else {
      palabra = palabra + limpio[p];
    }
  }
  if (palabra !== "") { partes[partes.length] = palabra; }
  if (partes.length > 2) { alert("Solo se permite un nombre y un apellido."); return false; }

  for (let i = 0; i < partes.length; i++) {
    let w = partes[i];
    if (w.length === 0) { alert("Espacios extras no permitidos."); return false; }
    let primera = w[0];
    if (!(primera >= "A" && primera <= "Z" || "ÁÉÍÓÚÑ".includes(primera))) {
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
  return true;
}

function agregarAmigo() {
  let input = document.getElementById("amigo");
  let amigo = input.value;

  if (validarNombre(amigo)) {
    let repetido = false;
    for (let i = 0; i < amigos.length; i++) {
      if (amigos[i] === amigo) { repetido = true; }
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
    texto = texto + "<li>" + amigos[j] + "</li>";
  }
  document.getElementById("listaAmigos").innerHTML = texto;
}

function sortearAmigo() {
  let ulResultado = document.getElementById("resultado");

  if (amigos.length === 0) {
    alert("No hay amigos para sortear.");
    ulResultado.innerHTML = "<li>No hay amigos para sortear</li>";
    return;
  }

  // Elegir alguien que no se haya sorteado
  let indice = Math.floor(Math.random() * amigos.length);
  let ganador = amigos[indice];

  // Verificar repetición
  let ya = false;
  for (let i = 0; i < sorteados.length; i++) {
    if (sorteados[i] === ganador) { ya = true; }
  }

  if (ya) {
    // buscar otro hasta encontrar no repetido
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

  // Si ya se sortearon todos
  if (sorteados.length === amigos.length) {
    alert("¡Todos los amigos fueron sorteados! Reiniciando el juego.");
    amigos = [];
    sorteados = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
  }
}
