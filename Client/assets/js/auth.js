// Ejecutamos la siguiente logica al cargar el html.
document.addEventListener('DOMContentLoaded', ()=>{

    // Obtenemos del localStorage el token.
    const token = localStorage.getItem('token');

    // En caso de que no exita el token, mostraremos en el navbar los botones para iniciar sesion y registrarse.
    if(!token){
        console.log("console de auth");
    } else {

        // En caso de que si exista el token, mostraremos un boton de cerrar sesión.
        document.getElementById('navv').innerHTML = `<a class="btn" href="" id="logout"><button>Cerrar Sesion</button></a>`;
        document.getElementById('publiEstilo').innerHTML = `    <a href="subirPubli.html" class="boton-subir">Subir Publicación</a>
`;

        // Le agregamos un evento click a dicho boton.
        document.getElementById('logout').addEventListener('click', ()=> {

            // Al clickear se eliminara del localStorage el token.
            localStorage.removeItem('token');

            // Recargamos la pagina para que hagan efecto los cambios.
            window.location.reload();
        })
    }
})

