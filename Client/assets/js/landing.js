// Tomamos el tbody del html.
let tbody = document.getElementById('body');

// Función para pintar todas las publicaciones.
const pintarPublicaciones = (data) => {
    // Reseteamos el contenido html del tbody o div
    tbody.innerHTML = '';

    // Verificar el orden de las publicaciones en el frontend
    console.log('Publicaciones recibidas:', data);

    // Recorremos todas las publicaciones con un forEach
    data.forEach((publicacion) => {
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

        // Añadir evento al botón de eliminar
        divPublicacion.querySelector('.eliminar-publicacion').addEventListener('click', () => {
            eliminarPublicacion(publicacion.id_publi);
        });

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
    }
};

// Función para obtener las publicaciones.
const obtenerPublicaciones = async () => {
    try {
        const response = await fetch('http://localhost:4000/publicacion');

        if (response.ok) {
            const data = await response.json();
            console.log('Publicaciones obtenidas:', data); // Verificar el orden de las publicaciones en el frontend
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
