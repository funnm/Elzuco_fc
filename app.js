import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

let dbEjercicios = [];
let dbMaterias = [];
let isAdmin = false;
let materiaFiltro = 'Todas';

// --- SEGURIDAD ---
onAuthStateChanged(auth, (user) => {
    isAdmin = !!user;
    document.querySelectorAll('.admin-controls').forEach(el => el.classList.toggle('d-none', !isAdmin));
    document.getElementById('btnAdmin').classList.toggle('d-none', isAdmin);
    document.getElementById('btnLogout').classList.toggle('d-none', !isAdmin);
    renderizarTodo();
});

// --- ICONOS POR EXTENSIÓN ---
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const map = {
        pdf: 'bi-file-earmark-pdf text-danger',
        xlsx: 'bi-file-earmark-excel text-success', xls: 'bi-file-earmark-excel text-success', csv: 'bi-file-earmark-excel text-success',
        docx: 'bi-file-earmark-word text-primary', doc: 'bi-file-earmark-word text-primary',
        dwg: 'bi-pencil-square text-warning', dxf: 'bi-pencil-square text-warning',
        zip: 'bi-file-zip text-secondary', rar: 'bi-file-zip text-secondary', '7z': 'bi-file-zip text-secondary',
        png: 'bi-image text-info', jpg: 'bi-image text-info', jpeg: 'bi-image text-info',
        py: 'bi-filetype-py text-dark', js: 'bi-filetype-js text-dark'
    };
    return map[ext] || 'bi-file-earmark text-muted';
}

function mostrarToast(msg, bg = "bg-dark") {
    const toast = document.getElementById('liveToast');
    document.getElementById('toastMsg').innerText = msg;
    toast.className = `toast align-items-center text-white border-0 ${bg}`;
    new bootstrap.Toast(toast).show();
}

// --- GESTIÓN DE MATERIAS ---
async function cargarMaterias() {
    const snap = await getDocs(collection(db, "materias"));
    dbMaterias = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Poblar Menú Lateral
    const menu = document.getElementById('menu-materias');
    menu.innerHTML = dbMaterias.map(m => `
        <a class="nav-link" onclick="filtrar('${m.nombre}')"><i class="bi bi-chevron-right small me-2"></i> ${m.nombre}</a>
    `).join('');

    // Poblar Selector del Formulario
    const select = document.getElementById('selectMat');
    select.innerHTML = dbMaterias.map(m => `<option>${m.nombre}</option>`).join('');

    // Lista de gestión (borrar)
    const listaBorrar = document.getElementById('lista-materias-borrar');
    listaBorrar.innerHTML = dbMaterias.map(m => `
        <div class="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
            <span class="small fw-bold">${m.nombre}</span>
            <button class="btn btn-sm text-danger p-0" onclick="borrarMateria('${m.id}')"><i class="bi bi-x-circle-fill"></i></button>
        </div>
    `).join('');
}

document.getElementById('formMateria').onsubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const nombre = document.getElementById('nombreMat').value;
    await addDoc(collection(db, "materias"), { nombre });
    e.target.reset();
    mostrarToast("Materia agregada", "bg-success");
    cargarMaterias();
};

window.borrarMateria = async (id) => {
    if (confirm("¿Eliminar materia?")) {
        await deleteDoc(doc(db, "materias", id));
        cargarMaterias();
    }
};

// --- GESTIÓN DE ARCHIVOS ---
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
    btn.disabled = true; btn.innerText = "Procesando...";

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
        mostrarToast("Publicado correctamente", "bg-success");
        cargarEjercicios();
    } catch (err) { mostrarToast("Error de subida", "bg-danger"); }
    finally { btn.disabled = false; btn.innerText = "Publicar Registro"; }
};

window.eliminarEjercicio = async (id) => {
    if (!confirm("¿Eliminar registro?")) return;
    const item = dbEjercicios.find(x => x.id === id);
    for (let f of item.archivos) await deleteObject(ref(storage, f.storagePath)).catch(() => { });
    await deleteDoc(doc(db, "ejercicios", id));
    mostrarToast("Eliminado", "bg-danger");
    cargarEjercicios();
};

// --- RENDER ---
function renderizarTodo() {
    cargarMaterias();
    cargarEjercicios();
}

window.renderizarTarjetas = (filtro = materiaFiltro, busqueda = '') => {
    materiaFiltro = filtro;
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    document.getElementById('pageTitle').innerText = filtro === 'Todas' ? 'Dashboard General' : filtro;

    const filtrados = dbEjercicios.filter(i =>
        (filtro === 'Todas' || i.materia === filtro) &&
        (i.titulo.toLowerCase().includes(busqueda.toLowerCase()))
    );

    filtrados.forEach(i => {
        const links = i.archivos.map(f => `
            <a href="${f.url}" target="_blank" class="badge-archivo">
                <i class="bi ${getFileIcon(f.nombre)} me-2"></i> ${f.nombre}
            </a>
        `).join('');

        grid.innerHTML += `
        <div class="col-md-6 col-lg-4">
            <div class="card exercise-card-pro h-100">
                <div class="card-header-pro d-flex justify-content-between">
                    <span class="badge bg-light text-dark border rounded-pill">${i.materia}</span>
                    ${isAdmin ? `<button class="btn btn-sm text-danger" onclick="eliminarEjercicio('${i.id}')"><i class="bi bi-trash3"></i></button>` : ''}
                </div>
                <div class="card-body d-flex flex-column p-4">
                    <h5 class="fw-bold mb-2">${i.titulo}</h5>
                    <p class="text-muted small mb-4 flex-grow-1">${i.descripcion}</p>
                    <div class="mb-3">${links}</div>
                    <div class="mt-auto border-top pt-3 small text-muted d-flex justify-content-between">
                        <span><i class="bi bi-calendar-event me-1"></i> ${i.fecha}</span>
                        <span class="fw-bold">Elzuco_ing</span>
                    </div>
                </div>
            </div>
        </div>`;
    });
};

// --- INTERACCIÓN ---
window.filtrar = (m) => {
    document.querySelectorAll('.nav-link').forEach(n => n.classList.toggle('active', n.innerText.includes(m)));
    renderizarTarjetas(m);
};

window.login = async () => {
    try {
        await signInWithEmailAndPassword(auth, document.getElementById('email').value, document.getElementById('pass').value);
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    } catch { mostrarToast("Error de acceso", "bg-danger"); }
};
window.logout = () => signOut(auth);

document.getElementById('searchInput').oninput = (e) => renderizarTarjetas(materiaFiltro, e.target.value);

// Preview de archivos al seleccionar
document.getElementById('archivosSubidos').onchange = function () {
    const files = Array.from(this.files);
    document.getElementById('file-preview-container').innerHTML = files.map(f => `
        <div class="file-preview-item">
            <span class="small fw-bold"><i class="bi ${getFileIcon(f.name)} me-2"></i> ${f.name}</span>
            <span class="text-muted extra-small">${(f.size / 1024).toFixed(1)} KB</span>
        </div>
    `).join('');
};

document.addEventListener("DOMContentLoaded", renderizarTodo);