const { newConex } = require("../db/db");
const validarJWT = require("../helpers/validarJWT");

const ctrl = {};

ctrl.subir_publicacion = async (req, res) =>{

    const {titulo, image, desc } = req.body;

    // Tomamos el token desde los headers de la peticion de la siguiente manera:
    const token = req.headers.token;

    // En caso de que no exista el token, retornamos un mensaje de error.
    if(!token) {
        return res.status(401).json({
            msg: 'No estas autorizado para realizar esta acción'
        });
    } else {

        // Utilizamos el helper para validar el token.
        const usuario = await validarJWT(token);

        const connection = await newConex();

        // Ejecutamos la consulta de inserción.
        await connection.query('INSERT INTO publicaciones(titulo, contenido) VALUES (?,?)', [titulo, desc]);


        // Respondemos al cliente.
        res.json({
            msg: 'publicacion agregada'
        })
    }
    
}

module.exports = ctrl;