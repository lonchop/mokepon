let btnMascotaJugador = document.getElementById("btn-mascota");
let sectionMascota = document.getElementById("mascota");

let sectionAtaque = document.getElementById("ataque");
sectionAtaque.style.display = "none";

let sectionReiniciar = document.getElementById("reiniciar");
sectionReiniciar.style.display = "none";

let mascotaJugador = document.getElementById("mascota-jugador");
let mascotaEnemigo = document.getElementById("mascota-enemigo");

const $ = (selector) => document.getElementById(selector);
let spanVidaJugador = $("vida-jugador");
let spanVidaEnemigo = $("vida-enemigo");

let sectionMensaje = $("resultado");
let nuevoContainer_1 = $("ataque-jugador");
let nuevoContainer_2 = $("ataque-enemigo");
let nuevoParrafo_1;
let nuevoParrafo_2;

const contenedorTarjetas = $("contenedor-tarjetas");

const btnAtaques = $("btn-ataques");

const sectionVerMapa = $("ver-mapa");
const mapa = $("mapa");
sectionVerMapa.style.display = "none";

let ataqueJugador;
let ataqueEnemigo;

let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "../assets/mokemap.png";

// ELEMENTOS DE LOS MOKEPONES
let fuego = "🔥";
let agua = "💧";
let planta = "🌱";
let vidaJugador = ["💚", "💚", "💚"];
let vidaEnemigo = ["💚", "💚", "💚"];
let mokepones = [];
let tarjetasMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputTucapalma;
let inputPydos;
let mascotaIndex;
let mascotaElegidaJugador;
let mascotaElegidaEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;

// ATAQUES
let botones = [];
let btnFuego;
let btnAgua;
let btnPlanta;
let secuenciaJugador = [];
let secuenciaEnemigo = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;

class Mokepon {
  constructor(nombre, imagen) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.ataques = [];
    this.x = 20;
    this.y = 30;
    this.ancho = 80;
    this.alto = 80;
    this.mapaImagen = new Image();
    this.mapaImagen.src = this.imagen;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
}

let hipodoge = new Mokepon(
  "hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png"
);

let capipepo = new Mokepon(
  "capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png"
);

let ratigueya = new Mokepon(
  "ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png"
);

let langostelvis = new Mokepon(
  "langostelvis",
  "./assets/mokepons_mokepon_langostelvis_attack.png"
);
let tucapalma = new Mokepon(
  "tucapalma",
  "./assets/mokepons_mokepon_tucapalma_attack.png"
);

let pydos = new Mokepon("pydos", "./assets/mokepons_mokepon_pydos_attack.png");

hipodoge.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" }
);

capipepo.ataques.push(
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-planta" }
);

langostelvis.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-planta" }
);

tucapalma.ataques.push(
  { nombre: "💧", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" }
);

pydos.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" }
);

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos);

mokepones.forEach((mokepon) => {
  tarjetasMokepones = `
  <input id=${mokepon.nombre} name="mascota" type="radio" />
  <label class="tarjeta-mascota" for=${mokepon.nombre}>
    <p>${mokepon.nombre.charAt(0).toUpperCase() + mokepon.nombre.slice(1)}</p>
    <img src=${mokepon.imagen} alt=${mokepon.nombre} />
  </label>
  `;

  contenedorTarjetas.innerHTML += tarjetasMokepones;

  inputHipodoge = $("hipodoge");
  inputCapipepo = $("capipepo");
  inputRatigueya = $("ratigueya");
  inputLangostelvis = $("langostelvis");
  inputTucapalma = $("tucapalma");
  inputPydos = $("pydos");
});

const seleccionarMascotaJugador = () => {
  let activarEnemigo = true;

  if (inputHipodoge.checked) {
    mascotaIndex = 0;
  } else if (inputCapipepo.checked) {
    mascotaIndex = 1;
  } else if (inputRatigueya.checked) {
    mascotaIndex = 2;
  } else if (inputLangostelvis.checked) {
    mascotaIndex = 3;
  } else if (inputTucapalma.checked) {
    mascotaIndex = 4;
  } else if (inputPydos.checked) {
    mascotaIndex = 5;
  } else {
    alert("Por favor selecciona una mascota");
    activarEnemigo = false;
  }

  mascotaElegidaJugador = mokepones[mascotaIndex];

  if (activarEnemigo) {
    seleccionarMascotaEnemigo();
    btnMascotaJugador.setAttribute("disabled", "");
    extraerAtaque(mascotaElegidaJugador.nombre);
    mostrar();
    secuenciaAtaque();
  }
};

const extraerAtaque = (mokepon) => {
  let ataques = [];
  for (let i = 0; i < mokepones.length; i++) {
    if (mokepon === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }

  mostrarAtaques(ataques);
};

const mostrarAtaques = (ataques) => {
  ataques.forEach((ataque) => {
    btnAtaques.innerHTML += `
    <button id=${ataque.id} class="boton-ataque">${ataque.nombre}</button>
    `;
  });

  btnFuego = document.getElementById("btn-fuego");
  btnAgua = document.getElementById("btn-agua");
  btnPlanta = document.getElementById("btn-planta");

  botones = document.querySelectorAll(".boton-ataque");

  // btnFuego.addEventListener("click", ataqueFuego);
  // btnAgua.addEventListener("click", ataqueAgua);
  // btnPlanta.addEventListener("click", ataquePlanta);
};

const secuenciaAtaque = () => {
  for (let boton of botones) {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        secuenciaJugador.push(fuego);
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        secuenciaJugador.push(agua);
        boton.disabled = true;
      } else if (e.target.textContent === "🌱") {
        secuenciaJugador.push(planta);
        boton.disabled = true;
      }
      ataqueAleaotorioEnemigo();
      console.log("Secuencia Jugador", secuenciaJugador);
    });
  }
};

const mostrar = () => {
  mapa.width = 480
  mapa.height = 360
  intervalo = setInterval(pintarCanvas, 50);

  sectionMascota.style.display = "none";
  sectionVerMapa.style.display = "flex";
  pintarCanvas();

  window.addEventListener("keydown", presionarTecla);
  window.addEventListener("keyup", detenerMovimiento);
  // sectionAtaque.style.display = "flex";

  mascotaJugador.innerHTML = `
  <img class="mini-mokepon" src=${mascotaElegidaJugador.imagen} alt="${mascotaElegidaJugador.nombre}">
  <p>${mascotaElegidaJugador.nombre}</p>
  `;

};

const seleccionarMascotaEnemigo = () => {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  mascotaElegidaEnemigo = mokepones[mascotaAleatoria];

  mascotaEnemigo.innerHTML = `
  <img class="mini-mokepon" src=${mascotaElegidaEnemigo.imagen} alt="${mascotaElegidaEnemigo.nombre}">
  <p>${mascotaElegidaEnemigo.nombre}</p>
  `;

  // if (mascotaAleatoria == 1) {
  //   spanMascotaEnemigo.textContent = "Hipodoge";
  // } else if (mascotaAleatoria == 2) {
  //   spanMascotaEnemigo.textContent = "Capipepo";
  // } else {
  //   spanMascotaEnemigo.textContent = "Ratigueya";
  // }
};

const pintarCanvas = () => {
  mascotaElegidaJugador.x =
    mascotaElegidaJugador.x + mascotaElegidaJugador.velocidadX;
  mascotaElegidaJugador.y =
    mascotaElegidaJugador.y + mascotaElegidaJugador.velocidadY;


  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  lienzo.drawImage(
    mascotaElegidaJugador.mapaImagen,
    mascotaElegidaJugador.x,
    mascotaElegidaJugador.y,
    mascotaElegidaJugador.ancho,
    mascotaElegidaJugador.alto
  );
};

const moverHorizontalIzquierda = () => {
  mascotaElegidaJugador.velocidadX = -4;
};

const moverHorizontalDerecha = () => {
  mascotaElegidaJugador.velocidadX = 4;
};

const moverVerticalArriba = () => {
  mascotaElegidaJugador.velocidadY = -4;
};

const moverVerticalAbajo = () => {
  mascotaElegidaJugador.velocidadY = 4;
};

const moverIzquierda = $("mover-x-izquierda");
const moverDerecha = $("mover-x-derecha");

const moverArriba = $("mover-y-arriba");
const moverAbajo = $("mover-y-abajo");

moverIzquierda.addEventListener("mousedown", moverHorizontalIzquierda);
moverDerecha.addEventListener("mousedown", moverHorizontalDerecha);

moverArriba.addEventListener("mousedown", moverVerticalArriba);
moverAbajo.addEventListener("mousedown", moverVerticalAbajo);

// const detenerMokepon = document.querySelectorAll(".btn-movimiento");
// detenerMokepon.addEventListener("mouseup", detenerMovimiento);

const presionarTecla = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      moverHorizontalIzquierda();
      break;
    case "ArrowRight":
      moverHorizontalDerecha();
      break;
    case "ArrowUp":
      moverVerticalArriba();
      break;
    case "ArrowDown":
      moverVerticalAbajo();
      break;
    default:
      break;
  }
};

const detenerMovimiento = () => {
  mascotaElegidaJugador.velocidadX = 0;
  mascotaElegidaJugador.velocidadY = 0;
};

const aleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// const ataqueFuego = () => {
//   ataqueJugador = fuego;
//   ataqueAleaotorioEnemigo();
// };

// const ataqueAgua = () => {
//   ataqueJugador = agua;
//   ataqueAleaotorioEnemigo();
// };

// const ataquePlanta = () => {
//   ataqueJugador = planta;
//   ataqueAleaotorioEnemigo();
// };

const ataqueAleaotorioEnemigo = () => {
  let ataqueAleatorio = aleatorio(0, mascotaElegidaEnemigo.ataques.length - 1);

  secuenciaEnemigo.push(mascotaElegidaEnemigo.ataques[ataqueAleatorio].nombre);

  mascotaElegidaEnemigo.ataques.splice(ataqueAleatorio, 1);

  console.log("Secuencia Enemigo", secuenciaEnemigo);

  // if (ataqueAleatorio == 1) {
  //   ataqueEnemigo = fuego;
  // } else if (ataqueAleatorio == 2) {
  //   ataqueEnemigo = agua;
  // } else {
  //   ataqueEnemigo = planta;
  // }

  // debugger ---> se usa para encontrar y solucionar errores
  if (secuenciaJugador.length === mascotaElegidaJugador.ataques.length) {
    combate();
  }
};

const indexAmbosOponentes = (jugador, enemigo) => {
  indexAtaqueJugador = secuenciaJugador[jugador];
  indexAtaqueEnemigo = secuenciaEnemigo[enemigo];
};

const combate = () => {
  for (let i = 0; i < secuenciaJugador.length + 1; i++) {
    if (secuenciaJugador[i] == secuenciaEnemigo[i]) {
      indexAmbosOponentes(i, i);
      crearMensaje();
    } else if (
      (secuenciaJugador[i] == fuego && secuenciaEnemigo[i] == planta) ||
      (secuenciaJugador[i] == agua && secuenciaEnemigo[i] == fuego) ||
      (secuenciaJugador[i] == planta && secuenciaEnemigo[i] == agua)
    ) {
      victoriasJugador++;
      spanVidaJugador.textContent = victoriasJugador;
      indexAmbosOponentes(i, i);
      crearMensaje();
    } else {
      victoriasEnemigo++;
      spanVidaEnemigo.textContent = victoriasEnemigo;
      indexAmbosOponentes(i, i);
      crearMensaje();
    }
  }
  revisarVidas();
  // if (ataqueJugador == ataqueEnemigo) {
  //   crearMensaje("EMPATE");
  // } else if (
  //   (ataqueJugador == fuego && ataqueEnemigo == planta) ||
  //   (ataqueJugador == agua && ataqueEnemigo == fuego) ||
  //   (ataqueJugador == planta && ataqueEnemigo == agua)
  // ) {
  //   crearMensaje("GANASTE");
  //   vidaEnemigo.pop();
  //   spanVidaEnemigo.textContent =
  //     vidaEnemigo.join("") === "" ? "💀" : vidaEnemigo.join("");
  // } else {
  //   crearMensaje("PERDISTE");
  //   vidaJugador.pop();
  //   spanVidaJugador.textContent =
  //     vidaJugador.join("") === "" ? "💀" : vidaJugador.join("");
  // }
};

const crearMensaje = (resultado) => {
  sectionMensaje.textContent = resultado;

  nuevoParrafo_1 = document.createElement("p");
  nuevoParrafo_2 = document.createElement("p");

  nuevoParrafo_1.textContent = indexAtaqueJugador;
  nuevoParrafo_2.textContent = indexAtaqueEnemigo;

  nuevoContainer_1.appendChild(nuevoParrafo_1);
  nuevoContainer_2.appendChild(nuevoParrafo_2);
};

const revisarVidas = () => {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("EMPATADOS");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Tu mascota gano. Felicidades 🎉");
  } else {
    crearMensajeFinal("Tu mascota perdio, vuelve a intentar");
  }

  // if (vidaJugador.length === 0) {
  //   crearMensajeFinal("Tu mascota perdio, vuelve a intentar");
  // } else if (vidaEnemigo.length === 0) {
  //   crearMensajeFinal("Tu mascota gano. Felicidades 🎉");
  // }
};

const crearMensajeFinal = (resultadoFinal) => {
  sectionMensaje.classList.remove("tamaño-mensaje");
  sectionMensaje.textContent = `${resultadoFinal}`;
  // btnFuego.disabled = true;
  // btnAgua.disabled = true;
  // btnPlanta.disabled = true;
  sectionReiniciar.style.display = "block";
  activarBtnReiniciar();
};

const reiniciarJuego = () => {
  location.reload();
};

btnMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

const activarBtnReiniciar = () => {
  let btnReiniciar = document.getElementById("mensaje");
  btnReiniciar.style.cursor = "pointer";
  btnReiniciar.addEventListener("click", reiniciarJuego);
};