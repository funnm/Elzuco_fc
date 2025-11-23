// =========================================
// 1. JSON de TODOS los partidos (pasados y futuros)
// =========================================
//
// jugado: true  -> ya tiene resultado
// jugado: false -> aún no se juega (se muestra en "Próximas fechas")

const partidosHexagonal = [
    // ✅ PARTIDOS MÁS RECIENTES (incluye los de hoy)

    {
        fechaISO: "2025-11-22",
        fechaTexto: "2025-11-22",
        hora: "19:00",
        torneo: "LigaPro Ecuabet",
        estadio: "George Capwell",
        local: "Emelec",
        visitante: "Aucas",
        golesLocal: 0,
        golesVisitante: 2,
        estadoTipo: "perdido",
        estadoTexto: "Ganó Aucas",
        jugado: true,
        resumen:
            "Aucas dio el golpe en Guayaquil y se llevó un triunfo 0–2 sobre Emelec en el Capwell, aprovechando al máximo sus opciones en el área rival."
    },
    {
        fechaISO: "2025-11-22",
        fechaTexto: "2025-11-22",
        hora: "14:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Estadio de Echaleche",
        local: "Mushuc Runa",
        visitante: "Técnico Universitario",
        golesLocal: 1,
        golesVisitante: 0,
        estadoTipo: "ganado",
        estadoTexto: "Ganó Mushuc Runa",
        jugado: true,
        resumen:
            "Mushuc Runa se impuso 1–0 a Técnico Universitario en Echaleche, en un partido cerrado donde el ponchito supo aprovechar su mejor ocasión de gol."
    },
    {
        fechaISO: "2025-11-22",
        fechaTexto: "2025-11-22",
        hora: "14:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Estadio Jocay (sede Manta)",
        local: "Manta",
        visitante: "Vinotinto",
        golesLocal: 3,
        golesVisitante: 1,
        estadoTipo: "ganado",
        estadoTexto: "Ganó Manta",
        jugado: true,
        resumen:
            "Manta FC derrotó 3–1 a Vinotinto con una actuación sólida en ataque, controlando el juego y cerrando una jornada positiva ante su afición."
    },


    // ✅ PARTIDOS RECIENTES

    {
        fechaISO: "2025-11-20",
        fechaTexto: "2025-11-20",
        hora: "19:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Alejandro Serrano Aguilar",
        local: "Dep. Cuenca",
        visitante: "El Nacional",
        golesLocal: 5,
        golesVisitante: 0,
        estadoTipo: "ganado",
        estadoTexto: "Ganó Dep. Cuenca",
        jugado: true,
        resumen:
            "Deportivo Cuenca pasó por encima de El Nacional con un contundente 5–0 en el Serrano Aguilar, firmando una noche perfecta ante su hinchada."
    },

    {
        fechaISO: "2025-11-19",
        fechaTexto: "2025-11-19",
        hora: "16:30",
        torneo: "LigaPro Ecuabet",
        estadio: "Olímpico Atahualpa",
        local: "U. Católica",
        visitante: "Libertad FC",
        golesLocal: 1,
        golesVisitante: 1,
        estadoTipo: "empatado",
        estadoTexto: "Empate",
        jugado: true,
        resumen:
            "Universidad Católica y Libertad FC igualaron 1–1 en Quito en un partido muy parejo y disputado, con un gol para cada tiempo."
    },

    // ✅ RESULTADOS ANTERIORES

    {
        fechaISO: "2025-11-10",
        fechaTexto: "2025-11-10",
        hora: "19:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Estadio Gonzalo Pozo",
        local: "Aucas",
        visitante: "Delfín",
        golesLocal: 8,
        golesVisitante: 0,
        estadoTipo: "ganado",
        estadoTexto: "Ganó Aucas",
        jugado: true,
        resumen:
            "Aucas logró una goleada histórica 8–0 frente a Delfín, con total dominio de principio a fin."
    },
    {
        fechaISO: "2025-11-09",
        fechaTexto: "2025-11-09",
        hora: "17:30",
        torneo: "LigaPro Ecuabet",
        estadio: "Estadio 9 de Mayo",
        local: "Orense",
        visitante: "Barcelona SC",
        golesLocal: 1,
        golesVisitante: 2,
        estadoTipo: "perdido",
        estadoTexto: "Ganó Barcelona SC",
        jugado: true,
        resumen:
            "Barcelona SC se impuso 1–2 en su visita a Orense y se mantiene en la pelea en la parte alta."
    },
    {
        fechaISO: "2025-11-09",
        fechaTexto: "2025-11-09",
        hora: "15:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Estadio Olímpico Atahualpa",
        local: "El Nacional",
        visitante: "Emelec",
        golesLocal: 2,
        golesVisitante: 1,
        estadoTipo: "ganado",
        estadoTexto: "Ganó El Nacional",
        jugado: true,
        resumen:
            "El Nacional remontó y terminó venciendo 2–1 a Emelec en un duelo intenso en Quito."
    },
    {
        fechaISO: "2025-11-09",
        fechaTexto: "2025-11-09",
        hora: "14:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Bellavista",
        local: "Técnico Universitario",
        visitante: "Vinotinto",
        golesLocal: 1,
        golesVisitante: 1,
        estadoTipo: "empatado",
        estadoTexto: "Empate",
        jugado: true,
        resumen:
            "Técnico Universitario y Vinotinto igualaron 1–1 en un partido muy luchado en Ambato."
    },
    {
        fechaISO: "2025-11-08",
        fechaTexto: "2025-11-08",
        hora: "19:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Rodrigo Paz Delgado",
        local: "LDU Quito",
        visitante: "Libertad FC",
        golesLocal: 3,
        golesVisitante: 1,
        estadoTipo: "ganado",
        estadoTexto: "Ganó LDU Quito",
        jugado: true,
        resumen:
            "Liga de Quito venció 3–1 a Libertad FC con una sólida actuación ofensiva en el Rodrigo Paz."
    },
    {
        fechaISO: "2025-11-08",
        fechaTexto: "2025-11-08",
        hora: "16:30",
        torneo: "LigaPro Ecuabet",
        estadio: "Banco Guayaquil",
        local: "Independiente del Valle",
        visitante: "U. Católica",
        golesLocal: 0,
        golesVisitante: 2,
        estadoTipo: "perdido",
        estadoTexto: "Ganó U. Católica",
        jugado: true,
        resumen:
            "Universidad Católica sorprendió y derrotó 0–2 a Independiente del Valle como visitante."
    },

    // 🔮 PRÓXIMOS PARTIDOS

    {
        fechaISO: "2025-11-30",
        fechaTexto: "2025-11-30",
        hora: "13:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Bellavista",
        local: "Macará",
        visitante: "Delfín",
        jugado: false
    },
    {
        fechaISO: "2025-11-30",
        fechaTexto: "2025-11-30",
        hora: "15:30",
        torneo: "LigaPro Ecuabet",
        estadio: "Monumental Banco Pichincha",
        local: "Barcelona SC",
        visitante: "LDU Quito",
        jugado: false
    },
    {
        fechaISO: "2025-11-30",
        fechaTexto: "2025-11-30",
        hora: "18:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Banco Guayaquil",
        local: "Independiente del Valle",
        visitante: "Orense",
        jugado: false
    }
];

// =========================================
// 1.b JSON de NOVEDADES
// =========================================

const novedadesHexagonal = [
    {
        titulo: "Deportivo Cuenca firma una goleada ante El Nacional",
        fechaTexto: "Esta semana · ELZUCO_FC",
        imagen:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFTm00drhc2jsko2jXAToqqax5cXa0Xf-ipw&s",
        textoCorto:
            "Dep. Cuenca venció 5–0 a El Nacional y se hizo fuerte en el Serrano Aguilar, uno de los marcadores más amplios de la fecha.",
        textoLargo:
            "Deportivo Cuenca venció 5–0 a El Nacional en el estadio Alejandro Serrano Aguilar, en una noche redonda para el cuadro morlaco. " +
            "El equipo local fue superior de principio a fin, presionó alto y aprovechó cada error defensivo de la visita. " +
            "Con este resultado, el Cuenca suma puntos clave en el Hexagonal por el título y deja tocado a un El Nacional que nunca logró reaccionar. " +
            "La hinchada celebró a lo grande el rendimiento del equipo y ya piensa en los próximos duelos decisivos de la LigaPro Ecuabet.",
        tags: ["#DepCuenca", "#LigaProEcuabet"]
    },
    {
        titulo: "Empate con sabor a poco entre U. Católica y Libertad FC",
        fechaTexto: "Esta semana · ELZUCO_FC",
        imagen:
            "https://imagenes.primicias.ec/files/og_thumbnail/uploads/2024/05/26/6653554931ade.jpeg",
        textoCorto:
            "Universidad Católica y Libertad FC igualaron 1–1 en el Olímpico Atahualpa. Los locales tuvieron opciones claras para ganar.",
        textoLargo:
            "Universidad Católica y Libertad FC empataron 1–1 en el estadio Olímpico Atahualpa, en un compromiso muy parejo pero con mayor iniciativa del cuadro local. " +
            "La Católica generó varias situaciones de peligro, pero careció de efectividad en los metros finales. " +
            "Libertad, por su parte, fue ordenado tácticamente y aprovechó una contra para marcar. " +
            "El resultado deja la sensación de haber perdido dos puntos para los capitalinos, mientras que el conjunto lojano se va conforme con el empate fuera de casa.",
        tags: ["#UCatólica", "#LibertadFC"]
    },
    {
        titulo: "Aucas sorprende y se lleva los puntos del Capwell",
        fechaTexto: "Hoy · ELZUCO_FC",
        imagen:
            "https://imagenes.primicias.ec/files/image_480_270/files/fp/uploads/2025/10/19/68f5547777f67.r_d.1518-924-1601.jpeg",
        textoCorto:
            "Aucas venció 0–2 a Emelec como visitante y se mete de lleno en la pelea por el Hexagonal por el título.",
        textoLargo:
            "El Club Deportivo Aucas consiguió una importantísima victoria 0–2 ante Emelec en el estadio George Capwell. " +
            "El cuadro oriental mostró personalidad para jugar en Guayaquil, supo aguantar los momentos de presión eléctrica y golpeó en los instantes justos. " +
            "Emelec intentó reaccionar, pero se encontró con una defensa bien parada y un arquero seguro. " +
            "Con este triunfo, Aucas suma puntos de oro y manda un mensaje claro de que será un rival durísimo en la definición del campeonato.",
        tags: ["#Aucas", "#Emelec"]
    },
    {
        titulo: "Barcelona SC se mantiene en carrera tras ganar en Machala",
        fechaTexto: "2025-11-09 · ELZUCO_FC",
        imagen:
            "https://www.eluniverso.com/resizer/v2/2QOTQSEKPFHZ5PAW4UHSFJZJKI.jpg?auth=48c72064ac2d907061ad9b7c9763cdb4c36411ab679619915548404152573f7d&width=1024&height=670&quality=75&smart=true",
        textoCorto:
            "Barcelona SC derrotó 1–2 a Orense y sigue firme en la lucha por el título en la LigaPro Ecuabet.",
        textoLargo:
            "Barcelona Sporting Club consiguió una victoria trabajada por 1–2 ante Orense en Machala. " +
            "El Ídolo del Astillero mostró oficio para manejar los tiempos del partido y aprovechar su jerarquía individual en ataque. " +
            "Orense complicó por momentos y hasta tuvo opciones para empatar, pero no estuvo fino en la definición. " +
            "El triunfo permite a Barcelona mantenerse entre los punteros del Hexagonal, manteniendo viva la ilusión de pelear el campeonato hasta el final.",
        tags: ["#BarcelonaSC", "#Orense"]
    }
];

// ==================================
// 2. Lógica de separación y pintado
// ==================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("ELZUCO_FC blog cargado correctamente 🚀");

    const partidosJugados = partidosHexagonal
        .filter((p) => p.jugado)
        .sort((a, b) => new Date(b.fechaISO) - new Date(a.fechaISO));

    const partidosProximos = partidosHexagonal
        .filter((p) => !p.jugado)
        .sort((a, b) => new Date(a.fechaISO) - new Date(b.fechaISO));

    renderUltimoResultado(partidosJugados);
    renderTablaResultados(partidosJugados);
    renderProximasFechas(partidosProximos);
    renderNovedades(novedadesHexagonal);
});

// ===================
// Último resultado
// ===================
function renderUltimoResultado(partidosJugados) {
    if (!partidosJugados.length) return;

    const ultimo = partidosJugados[0]; // el más reciente
    const cardContainer = document.getElementById("card-ultimo-resultado");
    if (!cardContainer) return;

    const claseEstado =
        ultimo.estadoTipo === "ganado"
            ? "badge-ganado"
            : ultimo.estadoTipo === "empatado"
                ? "badge-empatado"
                : ultimo.estadoTipo === "perdido"
                    ? "badge-perdido"
                    : "bg-secondary";

    cardContainer.innerHTML = `
    <div class="card mb-3 shadow-sm">
      <div class="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
        <div>
          <div class="text-muted small mb-1">${ultimo.torneo}</div>
          <h3 class="h5 mb-1">
            ${ultimo.local} ${ultimo.golesLocal} – ${ultimo.golesVisitante} ${ultimo.visitante}
          </h3>
          <p class="mb-0 text-muted small">
            ${ultimo.fechaTexto} · ${ultimo.estadio} · ${ultimo.hora}
          </p>
        </div>
        <div class="mt-3 mt-md-0 text-md-end">
          <span class="badge rounded-pill ${claseEstado}">
            ${ultimo.estadoTexto}
          </span>
        </div>
      </div>
      <div class="card-footer small text-muted">
        ${ultimo.resumen || ""}
      </div>
    </div>
  `;
}

// ===================
// Tabla de resultados (solo los últimos 8)
// ===================
function renderTablaResultados(partidosJugados) {
    const tbody = document.getElementById("tbody-resultados");
    if (!tbody) return;

    tbody.innerHTML = "";

    // 👉 Mostrar solo los 8 últimos partidos
    const ultimos8 = partidosJugados.slice(0, 8);

    ultimos8.forEach((partido) => {
        const claseEstado =
            partido.estadoTipo === "ganado"
                ? "badge-ganado"
                : partido.estadoTipo === "empatado"
                    ? "badge-empatado"
                    : partido.estadoTipo === "perdido"
                        ? "badge-perdido"
                        : "bg-secondary";

        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${partido.fechaTexto}</td>
      <td>${partido.local} vs ${partido.visitante}</td>
      <td>${partido.golesLocal} – ${partido.golesVisitante}</td>
      <td>${partido.torneo}</td>
      <td><span class="badge ${claseEstado}">${partido.estadoTexto}</span></td>
    `;
        tbody.appendChild(fila);
    });
}

// ===================
// Próximas fechas (sidebar)
// ===================
function renderProximasFechas(partidosProximos) {
    const lista = document.getElementById("lista-proximas-fechas");
    if (!lista) return;

    lista.innerHTML = "";

    if (!partidosProximos.length) {
        lista.innerHTML = `<li class="small text-muted">No hay partidos programados.</li>`;
        return;
    }

    partidosProximos.slice(0, 6).forEach((partido) => {
        const li = document.createElement("li");
        li.className = "mb-2";
        li.innerHTML = `
      <span class="fw-semibold">${partido.local} vs ${partido.visitante}</span><br />
      <small>${partido.fechaTexto} · ${partido.hora} · ${partido.estadio}</small>
    `;
        lista.appendChild(li);
    });
}

// ===================
// Novedades (cards + modal "Leer más")
// ===================
function renderNovedades(novedades) {
    const contenedor = document.getElementById("contenedor-novedades");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    novedades.forEach((item, index) => {
        const col = document.createElement("div");
        col.className = "col-md-6";

        const tagsHTML = (item.tags || [])
            .map((t) => `<span class="badge bg-dark me-1">${t}</span>`)
            .join("");

        const textoCorto = item.textoCorto || item.texto || "";

        col.innerHTML = `
      <div class="card post-card h-100 shadow-sm">
        <img src="${item.imagen}" class="card-img-top" alt="${item.titulo}">
        <div class="card-body d-flex flex-column">
          <h3 class="h5 card-title">${item.titulo}</h3>
          <p class="post-meta mb-2">${item.fechaTexto}</p>
          <p class="card-text flex-grow-1">${textoCorto}</p>
          <button class="btn btn-sm btn-outline-primary mt-2 btn-leer-mas" data-index="${index}">
            Leer más
          </button>
        </div>
        <div class="card-footer d-flex justify-content-start">
          ${tagsHTML}
        </div>
      </div>
    `;

        contenedor.appendChild(col);
    });

    // Eventos de "Leer más"
    const botones = contenedor.querySelectorAll(".btn-leer-mas");
    const modalEl = document.getElementById("modalNovedad");
    if (!modalEl) return; // si no existe el modal en el HTML, se muestran solo las tarjetas

    const modalTitulo = modalEl.querySelector("#modalNovedadTitulo");
    const modalFecha = modalEl.querySelector("#modalNovedadFecha");
    const modalImagen = modalEl.querySelector("#modalNovedadImagen");
    const modalTexto = modalEl.querySelector("#modalNovedadTexto");

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.index, 10);
            const nov = novedades[idx];

            modalTitulo.textContent = nov.titulo;
            modalFecha.textContent = nov.fechaTexto;
            modalImagen.src = nov.imagen;
            modalImagen.alt = nov.titulo;
            modalTexto.textContent =
                nov.textoLargo || nov.texto || nov.textoCorto || "";

            modal.show();
        });
    });
}
