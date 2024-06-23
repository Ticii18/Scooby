// Tomamos el tbody del html.
let tbody = document.getElementById('body');

// Función para pintar todas las publicaciones.
const pintarPublicaciones = (data) => {
    // Reseteamos el contenido html del tbody o div
    tbody.innerHTML = '';

    // Recorremos todas las publicaciones con un forEach
    data.forEach((publicacion, index) => {
        console.log('Imagen URL:', publicacion.imagen_url); // Verificar la URL de la imagen

        // Vamos agregando divs con la información de cada publicación.
        tbody.innerHTML += `
            <div class="post">
                <div class="post-header">
                    <div class="post-header-info">
                        <h3>${publicacion.titulo}</h3>
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
            </div>
        `;
    });
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
