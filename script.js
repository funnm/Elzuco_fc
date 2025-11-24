// =========================================
// 1. JSON de TODOS los partidos LigaPro (pasados y futuros)
// =========================================
//
// jugado: true  -> ya tiene resultado
// jugado: false -> aún no se juega (se muestra en "Próximas fechas")

const partidosHexagonal = [
    // ✅ PARTIDOS MÁS RECIENTES (INCLUYE LOS DE HOY)

    {
        fechaISO: "2025-11-23",
        fechaTexto: "2025-11-23",
        hora: "18:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Banco Guayaquil",
        local: "Independiente del Valle",
        visitante: "Orense FC",
        golesLocal: 0,
        golesVisitante: 0,
        estadoTipo: "empatado",
        estadoTexto: "Empate",
        jugado: true,
        resumen:
            "Independiente del Valle y Orense FC igualaron 0–0 en Sangolquí, en un juego cerrado donde las defensas se impusieron sobre los ataques."
    },

    {
        fechaISO: "2025-11-23",
        fechaTexto: "2025-11-23",
        hora: "15:30",
        torneo: "LigaPro Ecuabet",
        estadio: "Monumental Banco Pichincha",
        local: "Barcelona SC",
        visitante: "LDU Quito",
        golesLocal: 2,
        golesVisitante: 2,
        estadoTipo: "empatado",
        estadoTexto: "Empate",
        jugado: true,
        resumen:
            "Barcelona SC y Liga de Quito protagonizaron un partidazo 2–2 en el Monumental, con emociones en ambas áreas y reparto de puntos."
    },

    {
        fechaISO: "2025-11-23",
        fechaTexto: "2025-11-23",
        hora: "13:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Bellavista",
        local: "Macará",
        visitante: "Delfín",
        golesLocal: 3,
        golesVisitante: 0,
        estadoTipo: "ganado",
        estadoTexto: "Ganó Macará",
        jugado: true,
        resumen:
            "Macará fue contundente en Ambato y venció 3–0 a Delfín, aprovechando su efectividad en el área rival para quedarse con los tres puntos."
    },

    // ✅ PARTIDOS RECIENTES

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

    // ✅ RESULTADOS ANTERIORES

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
    }

    // 🔮 Si más adelante quieres agregar nuevas fechas de LigaPro,
    // puedes seguir usando este mismo arreglo con jugado: false.
];

// =========================================
// 1.b Partidos COPA ECUADOR
// =========================================

const partidosCopaEcuador = [
    // ✅ RESULTADOS RECIENTES

    {
        fechaISO: "2025-11-17",
        fechaTexto: "2025-11-17",
        hora: "19:00",
        torneo: "Copa Ecuador",
        fase: "Semifinal · Partido 1 de 2",
        estadio: "George Capwell",
        local: "Emelec",
        visitante: "LDU Quito",
        golesLocal: 1,
        golesVisitante: 2,
        estadoTipo: "perdido",
        estadoTexto: "Ganó LDU Quito",
        jugado: true,
        resumen:
            "LDU Quito se llevó un valioso triunfo 1–2 del Capwell en la ida de semifinales de la Copa Ecuador."
    },

    // 🔮 PRÓXIMOS PARTIDOS

    {
        fechaISO: "2025-11-25",
        fechaTexto: "2025-11-25",
        hora: "19:00",
        torneo: "Copa Ecuador",
        fase: "Semifinal · Partido 1 de 2",
        estadio: "Olímpico Atahualpa",
        local: "U. Católica",
        visitante: "Cuenca Juniors",
        jugado: false
    },
    {
        fechaISO: "2025-11-29",
        fechaTexto: "2025-11-29",
        hora: "14:00",
        torneo: "LigaPro Ecuabet",
        fase: "Fase de grupos · Jornada 6",
        estadio: "Por confirmar",
        local: "Vinotinto",
        visitante: "Mushuc Runa",
        jugado: false
    },
    {
        fechaISO: "2025-11-29",
        fechaTexto: "2025-11-29",
        hora: "14:00",
        torneo: "LigaPro Ecuabet",
        fase: "Fase de grupos · Jornada 6",
        estadio: "Por",
        local: "Técnico Universitario",
        visitante: "Manta",
        jugado: false
    },
    {
        fechaISO: "2025-12-02",
        fechaTexto: "2025-12-02",
        hora: "19:00",
        torneo: "Copa Ecuador",
        fase: "Semifinal · Partido 2 de 2",
        estadio: "Alejandro Serrano Aguilar",
        local: "Cuenca Juniors",
        visitante: "U. Católica",
        jugado: false
    },
    {
        fechaISO: "2025-12-03",
        fechaTexto: "2025-12-03",
        hora: "19:00",
        torneo: "Copa Ecuador",
        fase: "Semifinal · Partido 2 de 2",
        estadio: "Rodrigo Paz Delgado",
        local: "LDU Quito",
        visitante: "Emelec",
        jugado: false
    },
    {
        fechaISO: "2025-12-10",
        fechaTexto: "2025-12-10",
        hora: "17:00",
        torneo: "Copa Ecuador",
        fase: "Fase de grupos · Jornada 3",
        estadio: "Banco Guayaquil",
        local: "Independiente del Valle",
        visitante: "LDU Quito",
        jugado: false
    }
];

// =========================================
// 1.c JSON de NOVEDADES
// =========================================

const novedadesHexagonal = [
    {
        titulo: "Macará golea a Delfín y se hace fuerte en casa",
        fechaTexto: "2025-11-23 · ELZUCO_FC",
        imagen:
            "https://studiofutbol.com.ec/wp-content/uploads/2025/11/20251123199547-fbl-liga-ecuabet-macara-delfin-1068x763.jpg",
        textoCorto:
            "Macará superó 3–0 a Delfín en Ambato y sumó una victoria clave en el Hexagonal por el título.",
        textoLargo:
            "En el estadio Bellavista, Macará fue ampliamente superior a Delfín y lo derrotó 3–0 con una actuación muy sólida en todas sus líneas. " +
            "El cuadro ambateño dominó el trámite del encuentro, generó las ocasiones más claras y no perdonó frente al arco rival. " +
            "Con este resultado, Macará se mantiene en la pelea dentro del Hexagonal por el título y deja buenas sensaciones de cara a las próximas jornadas.",
        tags: ["#Macará", "#LigaProEcuabet"]
    },
    {
        titulo: "Empate vibrante entre Barcelona SC y Liga de Quito",
        fechaTexto: "2025-11-23 · ELZUCO_FC",
        imagen:
            "https://www.eluniverso.com/resizer/v2/RFOJZID7PRHSJFA6YFO2C3DLFY.jpg?auth=24dab98a477fc9a4b95c98e5218cc98ebf38445c3e391c99f29a5f58cfbcbb74&width=1005&height=670&quality=75&smart=true",
        textoCorto:
            "Barcelona SC y LDU Quito empataron 2–2 en el Monumental en un duelo intenso y cargado de emociones.",
        textoLargo:
            "Barcelona Sporting Club y Liga Deportiva Universitaria de Quito protagonizaron un partido vibrante en el estadio Monumental. " +
            "El encuentro terminó 2–2 con ocasiones para ambos, golazos y polémicas, dejando la sensación de que cualquiera pudo llevarse la victoria. " +
            "Con el empate, ambos equipos suman en la tabla del Hexagonal, pero siguen obligados a no ceder terreno en las fechas que restan.",
        tags: ["#BarcelonaSC", "#LDUQuito"]
    },
    {
        titulo: "Cero goles pero mucha lucha entre IDV y Orense",
        fechaTexto: "2025-11-23 · ELZUCO_FC",
        imagen:
            "https://www.eluniverso.com/resizer/v2/MW7CH4PE4NAR5MZIASQH3WKURI.jpg?auth=594911d57d5ba23c623cd1170cf13c8b48ee41038e176baf26509bf3110c9031&width=871&height=670&quality=75&smart=true",
        textoCorto:
            "Independiente del Valle y Orense FC igualaron 0–0 en Sangolquí en un partido cerrado y muy táctico.",
        textoLargo:
            "En el estadio Banco Guayaquil, Independiente del Valle y Orense FC empataron sin goles en un compromiso de mucha intensidad defensiva. " +
            "IDV llevó la iniciativa, pero Orense se defendió con orden y supo cerrar los espacios. " +
            "El reparto de puntos deja al conjunto negriazul con la sensación de haber dejado escapar una oportunidad para escalar en la tabla.",
        tags: ["#IDV", "#OrenseFC"]
    },
    {
        titulo: "Deportivo Cuenca firma una goleada ante El Nacional",
        fechaTexto: "2025-11-20 · ELZUCO_FC",
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
];

// ==================================
// 2. Lógica de separación y pintado
// ==================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("ELZUCO_FC blog cargado correctamente 🚀");

    // LigaPro
    const partidosJugados = partidosHexagonal
        .filter((p) => p.jugado)
        .sort((a, b) => new Date(b.fechaISO) - new Date(a.fechaISO));

    const partidosProximosLiga = partidosHexagonal
        .filter((p) => !p.jugado)
        .sort((a, b) => new Date(a.fechaISO) - new Date(b.fechaISO));

    // Copa Ecuador
    const partidosProximosCopa = partidosCopaEcuador
        .filter((p) => !p.jugado)
        .sort((a, b) => new Date(a.fechaISO) - new Date(b.fechaISO));

    renderUltimoResultado(partidosJugados);          // destacado LigaPro
    renderTablaResultados(partidosJugados);          // tabla LigaPro

    // 📌 Próximas fechas: LIGAPRO + COPA ECUADOR solo en sidebar
    renderProximasFechas(partidosProximosLiga, partidosProximosCopa);

    renderNovedades(novedadesHexagonal);             // noticias

    // 📌 Copa Ecuador: solo RESULTADOS RECIENTES en su sección
    renderCopaResultados(partidosCopaEcuador);
});

// ===================
// Último resultado (LigaPro)
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
// Tabla de resultados (LigaPro, sólo últimos 8)
// ===================
function renderTablaResultados(partidosJugados) {
    const tbody = document.getElementById("tbody-resultados");
    if (!tbody) return;

    tbody.innerHTML = "";

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
// Próximas fechas (sidebar, LigaPro + Copa Ecuador)
// ===================
function renderProximasFechas(partidosProximosLiga, partidosProximosCopa = []) {
    const lista = document.getElementById("lista-proximas-fechas");
    if (!lista) return;

    lista.innerHTML = "";

    const todos = [...(partidosProximosLiga || []), ...(partidosProximosCopa || [])];

    if (!todos.length) {
        lista.innerHTML = `<li class="small text-muted">No hay partidos programados.</li>`;
        return;
    }

    todos
        .sort((a, b) => new Date(a.fechaISO) - new Date(b.fechaISO))
        .slice(0, 6)
        .forEach((partido) => {
            const detalleTorneo = partido.torneo ? ` · ${partido.torneo}` : "";

            const li = document.createElement("li");
            li.className = "mb-2";
            li.innerHTML = `
        <span class="fw-semibold">${partido.local} vs ${partido.visitante}</span><br />
        <small>${partido.fechaTexto} · ${partido.hora} · ${partido.estadio || ""}${detalleTorneo}</small>
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

    const botones = contenedor.querySelectorAll(".btn-leer-mas");
    const modalEl = document.getElementById("modalNovedad");
    if (!modalEl) return;

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

// ===================
// Sección Copa Ecuador
// ===================

// tabla resultados Copa Ecuador
function renderCopaResultados(partidos) {
    const tbody = document.getElementById("tbody-copa-resultados");
    if (!tbody) return;

    tbody.innerHTML = "";

    const jugados = partidos
        .filter((p) => p.jugado)
        .sort((a, b) => new Date(b.fechaISO) - new Date(a.fechaISO))
        .slice(0, 6);

    jugados.forEach((p) => {
        const claseEstado =
            p.estadoTipo === "ganado"
                ? "badge-ganado"
                : p.estadoTipo === "empatado"
                    ? "badge-empatado"
                    : p.estadoTipo === "perdido"
                        ? "badge-perdido"
                        : "bg-secondary";

        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${p.fechaTexto}</td>
      <td>${p.fase || ""}</td>
      <td>${p.local} ${p.golesLocal} – ${p.golesVisitante} ${p.visitante}</td>
      <td><span class="badge ${claseEstado}">${p.estadoTexto || ""}</span></td>
    `;
        tbody.appendChild(tr);
    });
}
