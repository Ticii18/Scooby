// Tomamos el tbody del html.
let tbody = document.getElementById('body')

//Tomamos el form del html.
const form = document.getElementById('form')

// Funcion para pintar todas las tareas.
const pintarTareas = (data) => {

    // Reseteamos el contenido html del tbody
    tbody.innerHTML = ''

    // Recorremos todas las tareas con un forEach
    data.forEach( tarea => {

        // Vamos agregando tr's con la informacion de cada tara.
        tbody.innerHTML+= `<tr>
            <td>${tarea.id}</td>
            <td>${tarea.nombre}</td>
            <td>${tarea.tema}</td>
            <td>${tarea.autor}</td>
        </tr>`
    })
}


// Funcion para obtener las tareas.
const obtenerTareas = async () => {

    // Realizamos la peticion a nuestro servidor.
    const peticion = await fetch('http://localhost:4000');

    // Convertimos en json la respuesta;
    const response = await peticion.json();


    // Ejecutamos la funcion de pintarTareas pasandole los datos.
    pintarTareas(response);
}

