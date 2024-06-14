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
    const peticion = await fetch('http://localhost:3000/tareas');

    // Convertimos en json la respuesta;
    const response = await peticion.json();


    // Ejecutamos la funcion de pintarTareas pasandole los datos.
    pintarTareas(response);
}

// Ejecutamos la funcion de obtenerTareas al cargar el html.
document.addEventListener('DOMContentLoaded', obtenerTareas);


// Funcion para agregar una nueva tarea.
const crearTarea = async (e) => {

    // Evitamos el evento submit.
    e.preventDefault();

    // Tomamos el token del localStorage.
    const token = localStorage.getItem('token');

    // Si no existe el token, retornamos un error.
    if(!token) {
        alert('Debes iniciar sesión para crear una tarea')
    } else {
        
        // Tomamos los valores de los inputs.
        const nombre = document.getElementById('nombre').value;
        const tema = document.getElementById('tema').value;
    
        // Realizamos la peticion a nuestro servidor.
        const peticion = await fetch('http://localhost:3000/tareas', {

            // Especificamos el metodo que vamos a utilizar, en este caso 'POST'
            method: 'POST',

            // Convertimos en json los datos para enviarlos por el cuerpo de la petición.
            body: JSON.stringify({nombre, tema}),

            // Establecemos los headers (información adicional para la peticion).
            headers: {
                // Especificamos que estamos enviando un json.
                'Content-type': 'application/json',
                // Enviamos el token del usuario logueado.
                'token': token
            }
        })
    
        // Convertimos en json la respuesta.
        const respuesta = await peticion.json();
    
        // Preguntamos si la peticion salio bien.
        if(peticion.ok){

            // En caso de que salga bien, reseteamos los campos del formulario.
            form.reset();

            // Y volvemos a obtener las tareas para visualizar los nuevos cambios.
            obtenerTareas();
        } else {

            // En caso de que falle la peticion, mostrar el mensaje de error.
            alert(respuesta.msg)
        }
    
    }
}


// Añadimos el evento submit al formulario.
form.addEventListener('submit', crearTarea)