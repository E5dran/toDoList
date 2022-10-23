const inputTarea = document.getElementById('inputTarea');
const selectPrioridad = document.getElementById('selectPrioridad');
const formulario = document.getElementById('formulario');

const listaTareas = document.getElementById('listaTareas');

let tareas = [];
if (localStorage.getItem('listTareas')) {
    tareas = JSON.parse(localStorage.getItem('listTareas'))
};
pintarLista();

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const dato = {
        tarea: inputTarea.value,
        prioridad: selectPrioridad.value
    }
    tareas.push(dato);
    localStorage.setItem('listTareas', JSON.stringify(tareas));

    inputTarea.value = '';
    selectPrioridad.value = '';
    pintarLista();
})

function pintarLista() {
    listaTareas.innerHTML = '';
    for (let i = 0; i < tareas.length; i++) {
        const li = document.createElement('li');
        li.innerText = tareas[i].tarea;

        const btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            tareas.splice(i, 1);
            localStorage.setItem('listTareas', JSON.stringify(tareas));
        });

        li.append(btnEliminar);
        listaTareas.append(li);
    }
}


