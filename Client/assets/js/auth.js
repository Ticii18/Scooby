// Ejecutamos la siguiente logica al cargar el html.
document.addEventListener('DOMContentLoaded', ()=>{

    // Obtenemos del localStorage el token.
    const token = localStorage.getItem('token');

    // En caso de que no exita el token, mostraremos en el navbar los botones para iniciar sesion y registrarse.
    if(!token){
        document.getElementById('nav-item').innerHTML = `
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html">Register</a></li>`;
    } else {

        // En caso de que si exista el token, mostraremos un boton de cerrar sesión.
        document.getElementById('nav-item').innerHTML = `<li><a href="" id="logout">Cerrar Sesión</a></li>`;


        // Le agregamos un evento click a dicho boton.
        document.getElementById('logout').addEventListener('click', ()=> {

            // Al clickear se eliminara del localStorage el token.
            localStorage.removeItem('token');

            // Recargamos la pagina para que hagan efecto los cambios.
            window.location.reload();
        })
    }
})

