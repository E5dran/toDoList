const inputTarea = document.getElementById('inputTarea');
const selectPrioridad = document.getElementById('selectPrioridad');
const formulario = document.getElementById('formulario');

const inputTareaFilter = document.getElementById('inputTareaFilter');
const selectPrioridadFilter = document.getElementById('selectPrioridadFilter');
const btnLimpiar = document.getElementById('btnLimpiar');

const listaTareas = document.getElementById('listaTareas');

let tareas = [];
if (localStorage.getItem('listTareas')) {
    tareas = JSON.parse(localStorage.getItem('listTareas'))
};
pintarLista(tareas);

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const dato = {
        /* idTarea, */
        titulo: inputTarea.value.toLowerCase(),
        prioridad: selectPrioridad.value
    }
    tareas.push(dato);
    localStorage.setItem('listTareas', JSON.stringify(tareas));

    inputTarea.value = '';
    selectPrioridad.value = '';
    pintarLista(tareas);
})

selectPrioridadFilter.addEventListener('change', (event) => {
    event.preventDefault();
    let tareasFiltro = [];
    tareasFiltro = tareas.filter(tarea => tarea.prioridad === selectPrioridadFilter.value)
    pintarLista(tareasFiltro);
    if (selectPrioridadFilter.value === 'all') {
        pintarLista(tareas);
    }
})

inputTareaFilter.addEventListener('input', (event) => {
    let tareasFiltro = [];
    tareasFiltro = tareas.filter(tarea => tarea.titulo === inputTareaFilter.value.toLowerCase())
    pintarLista(tareasFiltro);
})

btnLimpiar.addEventListener('click', () => {
    pintarLista(tareas);
    selectPrioridadFilter.value = 'all';
    inputTareaFilter.value = '';
})

function pintarLista(tareas) {
    listaTareas.innerHTML = '';
    for (let i = 0; i < tareas.length; i++) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.innerText = tareas[i].titulo;
        div.classList.add("col-10")
        li.classList.add(tareas[i].prioridad);
        li.classList.add("p-2", "row", "border", "border-dark", "border-1");

        const btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.classList.add("col-2", "rounded");
        btnEliminar.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            tareas.splice(i, 1);
            localStorage.setItem('listTareas', JSON.stringify(tareas));
        });

        li.append(div, btnEliminar);
        listaTareas.append(li);
    }
}



