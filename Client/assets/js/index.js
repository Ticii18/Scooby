document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
        // Usuario está autenticado
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        document.getElementById('username').style.display = 'inline-block';
        document.getElementById('username').textContent = `Hola, ${username}`;

        // Añade el evento de cierre de sesión
        document.getElementById('logoutBtn').addEventListener('click', function() {
            // Elimina el token y otros datos de sesión
            localStorage.removeItem('token');
            localStorage.removeItem('username');

            // Redirige al usuario a la página de inicio de sesión
            window.location.href = 'login.html';
        });
    } else {
        // Usuario no está autenticado
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('username').style.display = 'none';
    }
});
