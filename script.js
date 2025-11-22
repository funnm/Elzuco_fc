// =========================================
// 1. JSON de TODOS los partidos (pasados y futuros)
// =========================================
//
// jugado: true  -> ya tiene resultado
// jugado: false -> aún no se juega (se muestra en "Próximas fechas")

const partidosHexagonal = [
    // ✅ PARTIDOS DE HOY (nuevos resultados)

    {
        fechaISO: "2025-11-21",
        fechaTexto: "Hoy, 21/11",
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
            "Deportivo Cuenca pasó por encima de El Nacional con un contundente 5–0 en el Serrano Aguilar."
    },
    {
        fechaISO: "2025-11-21",
        fechaTexto: "Hoy, 21/11",
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
            "Universidad Católica y Libertad FC igualaron 1–1 en Quito en un partido muy parejo y disputado."
    },

    // ✅ RESULTADOS ANTERIORES

    {
        fechaISO: "2025-11-10",
        fechaTexto: "Lun, 10/11",
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
        fechaTexto: "Dom, 9/11",
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
        fechaTexto: "Dom, 9/11",
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
        fechaTexto: "Dom, 9/11",
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
        fechaTexto: "Sáb, 8/11",
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
        fechaTexto: "Sáb, 8/11",
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

    // 🔮 PRÓXIMOS PARTIDOS (según la captura)

    {
        fechaISO: "2025-11-22",
        fechaTexto: "Mañana, 22/11",
        hora: "14:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Bellavista",
        local: "Mushuc Runa",
        visitante: "Técnico Universitario",
        jugado: false
    },
    {
        fechaISO: "2025-11-22",
        fechaTexto: "Mañana, 22/11",
        hora: "14:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Por definir",
        local: "Manta",
        visitante: "Vinotinto",
        jugado: false
    },
    {
        fechaISO: "2025-11-22",
        fechaTexto: "Mañana, 22/11",
        hora: "19:00",
        torneo: "LigaPro Ecuabet",
        estadio: "George Capwell",
        local: "Emelec",
        visitante: "Aucas",
        jugado: false
    },
    {
        fechaISO: "2025-11-23",
        fechaTexto: "Dom, 23/11",
        hora: "13:00",
        torneo: "LigaPro Ecuabet",
        estadio: "Por definir",
        local: "Macará",
        visitante: "Delfín",
        jugado: false
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
// Tabla de resultados
// ===================
function renderTablaResultados(partidosJugados) {
    const tbody = document.getElementById("tbody-resultados");
    if (!tbody) return;

    tbody.innerHTML = "";

    partidosJugados.forEach((partido) => {
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
      <td>
        <span class="badge ${claseEstado}">
          ${partido.estadoTexto}
        </span>
      </td>
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
