const { connectDB } = require("../db/database");
const validarJWT = require("../helpers/validarJWT");

const ctrl = {};

ctrl.obtenerTareas = async (req, res) => {
    const connection = await connectDB();

    const [results] = await connection.query('SELECT * FROM TAREAS');

    return res.json(results);
}

ctrl.crearTarea = async (req, res) =>{

    const { nombre, tema } = req.body;

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

        const connection = await connectDB();

        // Ejecutamos la consulta de inserción.
        await connection.query('INSERT INTO TAREAS (nombre, tema, autor) VALUES (?,?,?)', [nombre, tema, usuario.nombre]);


        // Respondemos al cliente.
        res.json({
            msg: 'Tarea creada'
        })
    }

}

module.exports = ctrl;