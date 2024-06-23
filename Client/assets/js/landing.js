// Tomamos el tbody del html.
let tbody = document.getElementById('body');

// Función para pintar todas las publicaciones.
const pintarPublicaciones = (data) => {
    // Reseteamos el contenido html del tbody o div
    tbody.innerHTML = '';

    // Verificar qué propiedades tiene cada objeto de publicacion

    // Recorremos todas las publicaciones con un forEach
    data.forEach((publicacion, index) => {
        // Creamos un botón de eliminar por cada publicación
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '🗑️';
        botonEliminar.classList.add('eliminar-publicacion');
        botonEliminar.setAttribute('data-id', publicacion.id_publi); // Aquí guardamos el ID de la publicación como un atributo data-id
        botonEliminar.addEventListener('click', () => {
            eliminarPublicacion(publicacion.id_publi);
        });

        // Creamos un div para la publicación
        const divPublicacion = document.createElement('div');
        divPublicacion.classList.add('post');

        // HTML de la publicación
        divPublicacion.innerHTML = `
            <div class="post-header">
                <div class="post-header-info">
                    <h3>${publicacion.titulo}</h3>
                </div>
                <div class="post-header-right">
                    <button class="eliminar-publicacion" data-id="${publicacion.id_publi}">🗑️</button>
                </div>
            </div>
            <div class="post-content">
                <p>${publicacion.contenido}</p>
                <img src="${publicacion.imagen_url}" alt="${publicacion.titulo}" />
            </div>
            <div class="post-actions">
                <button>Me gusta</button>
                <button>Comentar</button>
                <button>Compartir</button>
            </div>
        `;

        // Agregamos la publicación al tbody o div
        tbody.appendChild(divPublicacion);
    });
};

// Función para eliminar una publicación
const eliminarPublicacion = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/publicacion/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Publicación eliminada:', data);
            // Volver a obtener y mostrar las publicaciones actualizadas después de eliminar
            obtenerPublicaciones();
        } else {
            throw new Error('Error al eliminar la publicación');
        }
    } catch (error) {
        console.error('Error al eliminar publicación:', error);
        throw error; // Asegúrate de lanzar el error para manejarlo correctamente en el frontend
    }
};

// Función para obtener las publicaciones.
const obtenerPublicaciones = async () => {
    try {
        const response = await fetch('http://localhost:4000/publicacion');

        if (response.ok) {
            const data = await response.json();
            pintarPublicaciones(data);
        } else {
            throw new Error('Error al obtener las publicaciones');
        }
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
    }
};

// Ejecutar la función para obtener las publicaciones cuando se cargue la página.
document.addEventListener('DOMContentLoaded', obtenerPublicaciones);
