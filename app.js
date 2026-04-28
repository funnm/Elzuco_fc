// ==========================================
// 1. IMPORTACIONES DE FIREBASE (Versión 12.12.1)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";

// ==========================================
// 2. CONFIGURACIÓN DE TU PROYECTO (ELZUCO VAULT)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyBDoCi9pfNP8pj3MAyfmDiHuqGHb9naPrA",
    authDomain: "elzuco-vault-73760.firebaseapp.com",
    databaseURL: "https://elzuco-vault-73760-default-rtdb.firebaseio.com",
    projectId: "elzuco-vault-73760",
    storageBucket: "elzuco-vault-73760.firebasestorage.app",
    messagingSenderId: "68119814899",
    appId: "1:68119814899:web:3ee8b0f0a145dcadf6cd86",
    measurementId: "G-FYMVEBL4M4"
};

// ==========================================
// 3. INICIALIZACIÓN DE SERVICIOS
// ==========================================
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ==========================================
// VARIABLES GLOBALES
// ==========================================
let dbNube = [];
let isAdmin = false;
let materiaActual = 'Todas';
const CLAVE_ADMIN = "1234";

// ==========================================
// FUNCIONES DE UTILIDAD Y UI
// ==========================================
function normalizarClaseCSS(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
}

function mostrarToast(mensaje, tipo = "bg-dark") {
    const toastEl = document.getElementById('liveToast');
    const toastBody = document.getElementById('toastMsg');
    toastEl.className = `toast align-items-center text-white border-0 ${tipo}`;
    toastBody.innerHTML = mensaje;
    new bootstrap.Toast(toastEl).show();
}

function setEstadoCargando(cargando) {
    const btnSubmit = document.querySelector('#uploadForm button[type="submit"]');
    if (cargando) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Subiendo a la nube...';
    } else {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = 'Guardar en Bóveda';
    }
}

// ==========================================
// LÓGICA DE BASE DE DATOS (FIRESTORE)
// ==========================================

// Obtener los datos de Firestore y renderizarlos
async function cargarDatosDeFirebase() {
    try {
        const q = query(collection(db, "ejercicios"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        dbNube = [];
        querySnapshot.forEach((doc) => {
            dbNube.push({ id: doc.id, ...doc.data() });
        });

        renderizarTarjetas(materiaActual);
    } catch (error) {
        console.error("Error al cargar datos:", error);
        mostrarToast('<i class="bi bi-exclamation-triangle me-2"></i>Error al cargar base de datos', 'bg-danger');
    }
}

// Subir nuevo registro a la nube (Firestore + Storage)
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // CANDADO DE SEGURIDAD: Evita que se envíen datos si la sesión está cerrada
    if (!isAdmin) {
        mostrarToast('<i class="bi bi-shield-x me-2"></i>Error: No tienes permisos para subir archivos.', 'bg-danger');
        return;
    }

    setEstadoCargando(true);

    const archivosInput = document.getElementById('archivosSubidos').files;
    let archivosProcesados = [];

    try {
        // 1. Subir cada archivo a Firebase Storage
        for (let i = 0; i < archivosInput.length; i++) {
            let file = archivosInput[i];
            let extension = file.name.split('.').pop().toLowerCase();
            let tipoAsignado = extension === "pdf" ? "pdf" : (extension === "py" ? "python" : (extension.includes("xls") ? "excel" : "otro"));

            const nombreUnico = `${Date.now()}_${file.name}`;
            const storageRef = ref(storage, `archivos/${tipoAsignado}/${nombreUnico}`);

            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            archivosProcesados.push({
                tipo: tipoAsignado,
                nombre: file.name,
                url: downloadURL,
                storagePath: storageRef.fullPath
            });
        }

        // 2. Guardar estructura de datos en Firestore Database
        const nuevoRegistro = {
            titulo: document.getElementById('tit').value,
            materia: document.getElementById('mat').value,
            descripcion: document.getElementById('desc').value,
            dificultad: document.getElementById('dif').value,
            fecha: new Date().toLocaleDateString('es-ES'),
            timestamp: Date.now(),
            archivos: archivosProcesados
        };

        await addDoc(collection(db, "ejercicios"), nuevoRegistro);

        // 3. Resetear UI
        this.reset();
        document.getElementById('file-list').innerHTML = '';
        bootstrap.Collapse.getInstance(document.getElementById('collapseCarga')).hide();
        mostrarToast('<i class="bi bi-cloud-check me-2"></i>¡Guardado en la nube exitosamente!', 'bg-success');

        cargarDatosDeFirebase();

    } catch (error) {
        console.error("Error subiendo archivo:", error);
        mostrarToast('<i class="bi bi-x-circle me-2"></i>Hubo un error al subir los archivos.', 'bg-danger');
    } finally {
        setEstadoCargando(false);
    }
});

// Eliminar registro de Firestore y de Storage
window.eliminarFalso = async function (idDocumento) {
    if (confirm("¿Eliminar este registro de la bóveda permanentemente? Esto borrará los archivos de la nube.")) {
        try {
            const registro = dbNube.find(r => r.id === idDocumento);
            // Eliminar archivos físicos primero
            if (registro && registro.archivos) {
                for (let archivo of registro.archivos) {
                    if (archivo.storagePath) {
                        const fileRef = ref(storage, archivo.storagePath);
                        await deleteObject(fileRef).catch(e => console.log("El archivo ya no existía en el storage."));
                    }
                }
            }

            // Eliminar documento
            await deleteDoc(doc(db, "ejercicios", idDocumento));

            mostrarToast('<i class="bi bi-trash me-2"></i>Registro eliminado de la nube', 'bg-danger');
            cargarDatosDeFirebase();
        } catch (error) {
            console.error("Error eliminando:", error);
            mostrarToast('Error al eliminar el registro.', 'bg-danger');
        }
    }
}

// ==========================================
// RENDERIZADO Y NAVEGACIÓN
// ==========================================
window.renderizarTarjetas = function (filtro = materiaActual, terminoBusqueda = '') {
    materiaActual = filtro;
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    document.getElementById('pageTitle').innerText = filtro === 'Todas' ? 'Dashboard General' : filtro;

    const datosFiltrados = dbNube.filter(item => {
        const coincideMateria = filtro === 'Todas' || item.materia === filtro;
        const coincideBusqueda = item.titulo.toLowerCase().includes(terminoBusqueda) ||
            item.descripcion.toLowerCase().includes(terminoBusqueda);
        return coincideMateria && coincideBusqueda;
    });

    if (datosFiltrados.length === 0) {
        grid.innerHTML = `
        <div class="col-12 text-center py-5 mt-4">
            <i class="bi bi-cloud-slash display-3 text-muted opacity-50 mb-3 d-block"></i>
            <h5 class="text-dark fw-bold">Bóveda Vacía</h5>
            <p class="text-muted">Aún no hay archivos subidos. Inicia sesión como Autor para subir el primer registro.</p>
        </div>`;
        return;
    }

    datosFiltrados.forEach((item) => {
        const claseMateria = `bg-materia-${normalizarClaseCSS(item.materia)}`;
        let enlacesArchivos = '';

        item.archivos.forEach(archivo => {
            if (archivo.tipo === 'pdf') {
                enlacesArchivos += `<a href="${archivo.url}" target="_blank" class="badge-archivo text-dark" title="Abrir PDF"><i class="bi bi-file-earmark-pdf-fill text-danger"></i> ${archivo.nombre}</a>`;
            } else if (archivo.tipo === 'python') {
                enlacesArchivos += `<a href="${archivo.url}" target="_blank" class="badge-archivo text-dark" title="Descargar Script"><i class="bi bi-filetype-py text-primary"></i> ${archivo.nombre}</a>`;
            } else if (archivo.tipo === 'excel') {
                enlacesArchivos += `<a href="${archivo.url}" target="_blank" class="badge-archivo text-dark" title="Descargar Excel"><i class="bi bi-file-earmark-spreadsheet-fill text-success"></i> ${archivo.nombre}</a>`;
            } else {
                enlacesArchivos += `<a href="${archivo.url}" target="_blank" class="badge-archivo text-dark"><i class="bi bi-file-earmark-fill text-secondary"></i> ${archivo.nombre}</a>`;
            }
        });

        const btnEliminar = isAdmin ? `<button class="btn btn-sm text-danger bg-light rounded-circle p-2 ms-2 lh-1" onclick="eliminarFalso('${item.id}')" title="Eliminar"><i class="bi bi-trash"></i></button>` : '';

        const tarjeta = `
        <div class="col-md-6 col-lg-6 col-xl-4">
            <div class="card exercise-card-pro h-100">
                <div class="card-header-pro d-flex justify-content-between align-items-center">
                    <span class="badge ${claseMateria} px-3 py-2 rounded-pill">${item.materia}</span>
                    <div class="d-flex align-items-center">
                        <span class="dificultad-dot ${item.dificultad}"></span>
                        ${btnEliminar}
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="fw-bold text-dark mb-2">${item.titulo}</h5>
                    <p class="text-muted small mb-4 flex-grow-1">${item.descripcion}</p>
                    <div class="archivos-disponibles mb-3">${enlacesArchivos}</div>
                    <div class="mt-auto border-top pt-3 d-flex justify-content-between">
                        <span class="fecha-publicacion"><i class="bi bi-calendar3 me-1"></i> ${item.fecha}</span>
                        <span class="fecha-publicacion"><i class="bi bi-person me-1"></i> Elzuco_ing</span>
                    </div>
                </div>
            </div>
        </div>`;
        grid.innerHTML += tarjeta;
    });
}

// Funciones globales para que el HTML pueda llamarlas
window.filtrar = function (materia) {
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById('searchInput').value = '';
    renderizarTarjetas(materia, '');
}

window.login = function () {
    if (document.getElementById('pass').value === CLAVE_ADMIN) {
        isAdmin = true;
        document.querySelectorAll('.admin-controls').forEach(el => el.classList.remove('d-none'));
        document.getElementById('btnAdmin').classList.add('d-none');
        document.getElementById('btnLogout').classList.remove('d-none');
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        document.getElementById('pass').value = '';
        renderizarTarjetas();
        mostrarToast('<i class="bi bi-shield-check me-2"></i>Acceso Autorizado', 'bg-success');
    } else {
        mostrarToast('<i class="bi bi-exclamation-octagon me-2"></i>Clave incorrecta', 'bg-danger');
    }
}

window.logout = function () {
    isAdmin = false;

    // Ocultar botones de admin y mostrar el de login
    document.querySelectorAll('.admin-controls').forEach(el => el.classList.add('d-none'));
    document.getElementById('btnAdmin').classList.remove('d-none');
    document.getElementById('btnLogout').classList.add('d-none');

    // Cerrar el panel de carga si está abierto y limpiar formulario
    const panelCarga = document.getElementById('collapseCarga');
    if (panelCarga.classList.contains('show')) {
        bootstrap.Collapse.getInstance(panelCarga).hide();
    }
    document.getElementById('uploadForm').reset();
    document.getElementById('file-list').innerHTML = '';

    renderizarTarjetas();
    mostrarToast('<i class="bi bi-lock me-2"></i>Sesión cerrada de forma segura', 'bg-dark');
}

// Buscador
document.getElementById('searchInput').addEventListener('input', (e) => {
    renderizarTarjetas(materiaActual, e.target.value.toLowerCase());
});

// Drag & Drop visual
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('archivosSubidos');
const fileList = document.getElementById('file-list');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => dropZone.addEventListener(eventName, e => { e.preventDefault(); e.stopPropagation(); }, false));
['dragenter', 'dragover'].forEach(eventName => dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false));
['dragleave', 'drop'].forEach(eventName => dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false));

fileInput.addEventListener('change', function () {
    let nombres = Array.from(this.files).map(f => `<i class="bi bi-check2 text-success"></i> ${f.name}`).join('<br>');
    fileList.innerHTML = nombres ? nombres : '';
});

// Al cargar la página, traer datos de Firebase
document.addEventListener("DOMContentLoaded", () => {
    cargarDatosDeFirebase();
});