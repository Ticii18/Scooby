//Tomamos el form del html.
const form = document.getElementById('form_publi')

// Funcion para registrarse
const register = async (e) => {

    // Evitamos el evento submit.
    e.preventDefault();
    const token = localStorage.getItem('token');
    // Tomamos los valores de los inputs.
    const titulo = document.getElementById('title').value;
    // const image = document.getElementById('image').value;
    const desc = document.getElementById('description').value;

    // Realizamos la peticion a nuestro servidor.
    const peticion = await fetch('http://localhost:4000/subir', {
        method: 'POST',
        body: JSON.stringify({titulo, desc}),
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    })

    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la peticion, mostrar el mensaje de error.
    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        //Caso contrario, mostramos el mensaje.
        alert(respuesta.msg)

        // Redirigimos al usuario al login.
        window.location.href = '/index.html'
    }

}

form.addEventListener('submit', register);


