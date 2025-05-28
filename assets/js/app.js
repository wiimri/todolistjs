
const tareas = [
  { id: Date.now(), descripcion: "Estudiar JavaScript", completada: false },
  { id: Date.now() + 1, descripcion: "Leer documentación", completada: true },
  { id: Date.now() + 2, descripcion: "Practicar métodos de arreglo", completada: false },
];

const listaTareas = document.getElementById("listaTareas");
const inputTarea = document.getElementById("nuevaTarea");
const agregarBtn = document.getElementById("agregarBtn");

function renderTareas() {
  listaTareas.innerHTML = "";
  for (let tarea of tareas) {
    const div = document.createElement("div");
    div.className = "tarea";
    const span = document.createElement("span");
    span.textContent = tarea.descripcion;
    if (tarea.completada) span.classList.add("realizada");
    const acciones = document.createElement("div");

    const btnCambiar = document.createElement("button");
    btnCambiar.textContent = "✅";
    btnCambiar.title = "Marcar como completada";
    btnCambiar.onclick = () => cambiarEstado(tarea.id);

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "❌";
    btnBorrar.title = "Eliminar tarea";
    btnBorrar.onclick = () => borrarTarea(tarea.id);

    acciones.appendChild(btnCambiar);
    acciones.appendChild(btnBorrar);
    div.appendChild(span);
    div.appendChild(acciones);
    listaTareas.appendChild(div);
  }
  actualizarResumen();
}

function actualizarResumen() {
  document.getElementById("totalTareas").textContent = tareas.length;
  document.getElementById("tareasCompletadas").textContent = tareas.filter(t => t.completada).length;
}

function agregarTarea() {
  const texto = inputTarea.value.trim();
  if (texto) {
    tareas.push({ id: Date.now(), descripcion: texto, completada: false });
    inputTarea.value = "";
    renderTareas();
  }
}

function borrarTarea(id) {
  const index = tareas.findIndex(t => t.id === id);
  if (index !== -1) {
    tareas.splice(index, 1);
    renderTareas();
  }
}

function cambiarEstado(id) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
    renderTareas();
  }
}

agregarBtn.addEventListener("click", agregarTarea);
inputTarea.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

renderTareas();
