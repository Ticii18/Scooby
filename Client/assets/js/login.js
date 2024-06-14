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
    
            // Redirigir al usuario a la pantalla principal después de iniciar sesión exitosamente
            window.location.href = '/index.html'; // Reemplazar con la ruta correcta
    
            console.log('Inicio de sesión exitoso');
            console.log('Token JWT:', data.token);
        } else {
            console.error('Error al iniciar sesión:', response.statusText);
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
    }
})