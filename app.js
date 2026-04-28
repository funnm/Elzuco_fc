// ============================================================================
// CONFIGURACIÓN E IMPORTACIONES DE FIREBASE (v12.12.1)
// ============================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBDoCi9pfNP8pj3MAyfmDiHuqGHb9naPrA",
    authDomain: "elzuco-vault-73760.firebaseapp.com",
    databaseURL: "https://elzuco-vault-73760-default-rtdb.firebaseio.com",
    projectId: "elzuco-vault-73760",
    storageBucket: "elzuco-vault-73760.firebasestorage.app",
    messagingSenderId: "68119814899",
    appId: "1:68119814899:web:3ee8b0f0a145dcadf6cd86"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Variables Globales
let dbEjercicios = [];
let dbMaterias = [];
let isAdmin = false;
let materiaFiltro = 'Todas';

// ============================================================================
// 1. MANEJO DE INTERFAZ (UI) Y MÓVILES
// ============================================================================
const toggleBtn = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

const toggleMenu = () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
};

toggleBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

function mostrarToast(msg, bg = "bg-dark") {
    const toast = document.getElementById('liveToast');
    document.getElementById('toastMsg').innerHTML = msg;
    toast.className = `toast align-items-center text-white border-0 shadow-lg ${bg}`;
    new bootstrap.Toast(toast).show();
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const map = {
        pdf: 'bi-file-earmark-pdf-fill text-danger',
        xlsx: 'bi-file-earmark-excel-fill text-success', xls: 'bi-file-earmark-excel-fill text-success', csv: 'bi-file-earmark-excel-fill text-success',
        docx: 'bi-file-earmark-word-fill text-primary', doc: 'bi-file-earmark-word-fill text-primary',
        dwg: 'bi-pencil-square text-warning', dxf: 'bi-pencil-square text-warning',
        zip: 'bi-file-zip-fill text-secondary', rar: 'bi-file-zip-fill text-secondary', '7z': 'bi-file-zip-fill text-secondary',
        png: 'bi-image-fill text-info', jpg: 'bi-image-fill text-info', jpeg: 'bi-image-fill text-info',
        py: 'bi-filetype-py text-dark', js: 'bi-filetype-js text-dark'
    };
    return map[ext] || 'bi-file-earmark-fill text-muted';
}

// ============================================================================
// 2. AUTENTICACIÓN Y SEGURIDAD
// ============================================================================
onAuthStateChanged(auth, (user) => {
    isAdmin = !!user;
    document.querySelectorAll('.admin-controls').forEach(el => el.classList.toggle('d-none', !isAdmin));
    document.getElementById('btnAdmin').classList.toggle('d-none', isAdmin);
    document.getElementById('btnLogout').classList.toggle('d-none', !isAdmin);

    // Proteger cierre de panel
    if (!isAdmin) {
        const panel = document.getElementById('collapseCarga');
        if (panel && panel.classList.contains('show')) bootstrap.Collapse.getInstance(panel).hide();
    }
    renderizarTodo();
});

window.login = async () => {
    const btn = document.getElementById('btnIngresar');
    btn.innerHTML = "<span class='spinner-border spinner-border-sm me-2'></span>Verificando...";
    try {
        await signInWithEmailAndPassword(auth, document.getElementById('email').value, document.getElementById('pass').value);
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        mostrarToast("<i class='bi bi-shield-lock-fill me-2'></i>Ingreso Autorizado", "bg-success");
        document.getElementById('email').value = ''; document.getElementById('pass').value = '';
    } catch {
        mostrarToast("<i class='bi bi-x-circle-fill me-2'></i>Credenciales incorrectas", "bg-danger");
    } finally { btn.innerHTML = "Ingresar"; }
};

window.logout = async () => {
    await signOut(auth);
    mostrarToast("<i class='bi bi-power me-2'></i>Sesión cerrada", "bg-dark");
};

// ============================================================================
// 3. GESTIÓN DE MATERIAS (CRUD)
// ============================================================================
async function cargarMaterias() {
    const snap = await getDocs(collection(db, "materias"));
    dbMaterias = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Sidebar
    document.getElementById('menu-materias').innerHTML = dbMaterias.map(m => `
        <a class="nav-link" onclick="filtrar('${m.nombre}')"><i class="bi bi-chevron-right small me-3"></i> ${m.nombre}</a>
    `).join('');

    // Selects
    const options = dbMaterias.map(m => `<option>${m.nombre}</option>`).join('');
    document.getElementById('selectMat').innerHTML = options;
    document.getElementById('editMat').innerHTML = options; // Actualiza también el select de edición

    // Admin List
    document.getElementById('lista-materias-borrar').innerHTML = dbMaterias.map(m => `
        <div class="d-flex justify-content-between align-items-center mb-2 p-2 bg-light border rounded">
            <span class="small fw-semibold text-dark">${m.nombre}</span>
            <button class="btn btn-sm text-danger p-0" onclick="borrarMateria('${m.id}')" title="Borrar materia"><i class="bi bi-trash-fill fs-5"></i></button>
        </div>
    `).join('');
}

document.getElementById('formMateria').onsubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const nombre = document.getElementById('nombreMat').value;
    await addDoc(collection(db, "materias"), { nombre });
    e.target.reset();
    mostrarToast("<i class='bi bi-tag-fill me-2'></i>Materia agregada", "bg-success");
    cargarMaterias();
};

window.borrarMateria = async (id) => {
    if (confirm("¿Eliminar esta materia permanentemente del menú?")) {
        await deleteDoc(doc(db, "materias", id));
        cargarMaterias();
    }
};

// ============================================================================
// 4. GESTIÓN DE EJERCICIOS Y ARCHIVOS (CRUD)
// ============================================================================
async function cargarEjercicios() {
    const q = query(collection(db, "ejercicios"), orderBy("timestamp", "desc"));
    const snap = await getDocs(q);
    dbEjercicios = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderizarTarjetas(materiaFiltro);
}

document.getElementById('uploadForm').onsubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.innerHTML = "<span class='spinner-border spinner-border-sm me-2'></span>Procesando...";

    try {
        const archivos = document.getElementById('archivosSubidos').files;
        const procesados = [];
        for (let file of archivos) {
            const path = `vault/${Date.now()}_${file.name}`;
            const sRef = ref(storage, path);
            await uploadBytes(sRef, file);
            procesados.push({ nombre: file.name, url: await getDownloadURL(sRef), storagePath: path });
        }
        await addDoc(collection(db, "ejercicios"), {
            titulo: document.getElementById('tit').value,
            materia: document.getElementById('selectMat').value,
            descripcion: document.getElementById('desc').value,
            fecha: new Date().toLocaleDateString('es-ES'),
            timestamp: Date.now(),
            archivos: procesados
        });
        e.target.reset();
        document.getElementById('file-preview-container').innerHTML = '';
        bootstrap.Collapse.getInstance(document.getElementById('panelAdmin')).hide();
        mostrarToast("<i class='bi bi-cloud-check-fill me-2'></i>Publicado correctamente", "bg-success");
        cargarEjercicios();
    } catch (err) { mostrarToast("Error de subida", "bg-danger"); }
    finally { btn.disabled = false; btn.innerText = "Subir a la Nube"; }
};

// Abrir modal de edición
window.prepararEdicion = (id) => {
    const item = dbEjercicios.find(x => x.id === id);
    if (!item) return;
    document.getElementById('editId').value = item.id;
    document.getElementById('editTit').value = item.titulo;
    document.getElementById('editMat').value = item.materia;
    document.getElementById('editDesc').value = item.descripcion;
    new bootstrap.Modal(document.getElementById('editModal')).show();
};

// Guardar cambios de edición
document.getElementById('editForm').onsubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const id = document.getElementById('editId').value;
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;

    try {
        await updateDoc(doc(db, "ejercicios", id), {
            titulo: document.getElementById('editTit').value,
            materia: document.getElementById('editMat').value,
            descripcion: document.getElementById('editDesc').value
        });
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
        mostrarToast("<i class='bi bi-pencil-square me-2'></i>Actualizado", "bg-success");
        cargarEjercicios();
    } catch (err) { mostrarToast("Error al actualizar", "bg-danger"); }
    finally { btn.disabled = false; }
};

window.eliminarEjercicio = async (id) => {
    if (!confirm("¿Eliminar registro y sus archivos de la nube?")) return;
    const item = dbEjercicios.find(x => x.id === id);
    for (let f of item.archivos) await deleteObject(ref(storage, f.storagePath)).catch(() => { });
    await deleteDoc(doc(db, "ejercicios", id));
    mostrarToast("<i class='bi bi-trash-fill me-2'></i>Registro eliminado", "bg-danger");
    cargarEjercicios();
};

// ============================================================================
// 5. RENDERIZADO Y BUSCADOR
// ============================================================================
function renderizarTodo() {
    cargarMaterias();
    cargarEjercicios();
}

window.renderizarTarjetas = (filtro = materiaFiltro, busqueda = '') => {
    materiaFiltro = filtro;
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    document.getElementById('pageTitle').innerText = filtro === 'Todas' ? 'Dashboard General' : filtro;

    const term = busqueda.toLowerCase();
    const filtrados = dbEjercicios.filter(i =>
        (filtro === 'Todas' || i.materia === filtro) &&
        (i.titulo.toLowerCase().includes(term) || i.descripcion.toLowerCase().includes(term))
    );

    if (filtrados.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center py-5 mt-5"><i class="bi bi-folder2-open display-1 text-muted opacity-25"></i><h5 class="text-muted mt-3 fw-bold">Sin resultados en esta categoría</h5></div>`;
        return;
    }

    filtrados.forEach(i => {
        const bgClass = "bg-light text-dark border";
        const links = i.archivos.map(f => `
            <a href="${f.url}" target="_blank" class="badge-archivo" title="Descargar ${f.nombre}">
                <i class="bi ${getFileIcon(f.nombre)} fs-6 me-2"></i> ${f.nombre}
            </a>
        `).join('');

        const controlesAdmin = isAdmin ? `
            <button class="btn btn-sm btn-outline-primary border-0 me-1" onclick="prepararEdicion('${i.id}')" title="Editar"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-sm btn-outline-danger border-0" onclick="eliminarEjercicio('${i.id}')" title="Borrar"><i class="bi bi-trash3-fill"></i></button>
        ` : '';

        grid.innerHTML += `
        <div class="col-12 col-md-6 col-xxl-4">
            <div class="card exercise-card-pro h-100 p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <span class="badge ${bgClass} rounded-pill px-3 py-2 shadow-sm">${i.materia}</span>
                    <div class="d-flex">${controlesAdmin}</div>
                </div>
                <h5 class="fw-bold text-dark mb-2">${i.titulo}</h5>
                <p class="text-muted small mb-4 flex-grow-1">${i.descripcion}</p>
                <div class="mb-3 d-flex flex-wrap">${links}</div>
                <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center small text-muted">
                    <span class="fw-medium"><i class="bi bi-calendar2-event me-2"></i>${i.fecha}</span>
                    <span class="fw-bold text-dark"><i class="bi bi-person-circle me-1"></i> Elzuco_ing</span>
                </div>
            </div>
        </div>`;
    });
};

window.filtrar = (m) => {
    if (window.innerWidth < 992) toggleMenu(); // Cierra el menú al seleccionar en celular
    document.querySelectorAll('.nav-link').forEach(n => n.classList.toggle('active', n.innerText.includes(m) || (m === 'Todas' && n.innerText.includes('Dashboard'))));
    document.getElementById('searchInput').value = '';
    renderizarTarjetas(m, '');
};

document.getElementById('searchInput').oninput = (e) => renderizarTarjetas(materiaFiltro, e.target.value);

// Preview visual de archivos antes de subir
document.getElementById('archivosSubidos').onchange = function () {
    const files = Array.from(this.files);
    document.getElementById('file-preview-container').innerHTML = files.map(f => `
        <div class="file-preview-item shadow-sm">
            <span class="small fw-semibold text-dark text-truncate" style="max-width: 80%;"><i class="bi ${getFileIcon(f.name)} fs-5 me-2"></i> ${f.name}</span>
            <span class="badge bg-secondary bg-opacity-10 text-secondary border">${(f.size / 1024).toFixed(1)} KB</span>
        </div>
    `).join('');
};

document.addEventListener("DOMContentLoaded", renderizarTodo);