// Tomamos el tbody del html.
let tbody = document.getElementById('body');

// Función para pintar todas las publicaciones.
const pintarPublicaciones = (data) => {
    // Reseteamos el contenido html del tbody
    tbody.innerHTML = '';

    // Recorremos todas las publicaciones con un forEach
    data.forEach((publicacion, index) => {
        // Vamos agregando tr's con la información de cada publicación.
        tbody.innerHTML += `
            <div class="post">
        <div class="post-header">
      
            <div class="post-header-info">
                <h3>${publicacion.titulo}</h3>
         
            </div>
        </div>
        <div class="post-content">
            <p>${publicacion.contenido}</</p>
           <img src="${publicacion.imagen_url}" >
        </div>
        <div class="post-actions">
            <button>Me gusta</button>
            <button>Comentar</button>
            <button>Compartir</button>
        </div>
    </div>
        `;
    });
};

// Función para obtener las publicaciones.
const obtenerPublicaciones = async () => {
    try {
        // Realizamos la petición a nuestro servidor.
        const peticion = await fetch('http://localhost:4000/publicacion');

        // Convertimos en JSON la respuesta.
        const response = await peticion.json();

        // Ejecutamos la función de pintarPublicaciones pasándole los datos.
        pintarPublicaciones(response);
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
    }
};

// Ejecutar la función para obtener las publicaciones cuando se cargue la página.
document.addEventListener('DOMContentLoaded', obtenerPublicaciones);
