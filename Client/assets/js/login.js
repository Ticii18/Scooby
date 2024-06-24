document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

    const formData = new FormData(event.target); // Obtener los datos del formulario
    const formDataObject = Object.fromEntries(formData.entries()); // Convertirlos en un objeto

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });

        if (response.ok) {
            const data = await response.json();

            // Almacenar el token en el almacenamiento local
            localStorage.setItem('token', data.token);

            // Redirigir al usuario a la página principal después de iniciar sesión exitosamente
            window.location.href = '/index.html'; // Reemplazar con la ruta correcta

            console.log('Inicio de sesión exitoso');
            console.log('Token JWT:', data.token);
        } else {
            const errorData = await response.json();
            alert(errorData.message); // Mostrar alert con el mensaje de error
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        alert('Error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Al hacer clic en el botón de inicio de sesión, se inicia sesión y se guarda el token en el almacenamiento local
    loginBtn.addEventListener('click', () => {
        // Aquí iría tu código para iniciar sesión y obtener el token
        // Después de obtener el token, guárdalo en el almacenamiento local
        localStorage.setItem('token', 'tu-token-aqui');

        // Oculta el botón de inicio de sesión y muestra el botón de cerrar sesión
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline';
    });

    // Al cargar la página, verifica si hay un token en el almacenamiento local
    const token = localStorage.getItem('token');
    if (token) {
        // Si hay un token, muestra el botón de cerrar sesión y oculta el botón de inicio de sesión
        logoutBtn.style.display = 'inline';
        loginBtn.style.display = 'none';
    } else {
        // Si no hay un token, muestra el botón de inicio de sesión y oculta el botón de cerrar sesión
        loginBtn.style.display = 'inline';
        logoutBtn.style.display = 'none';
    }
});
