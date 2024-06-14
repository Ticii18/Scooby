// backend/src/controllers/auth.controller.js

const { newConex } = require("../db/db.js");
const generarJWT = require("../helpers/generarJWT.js");
const validarJWT = require("../helpers//validarJWT");

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!username || !email || !password) {
        return res.status(400).send("Por favor, complete todos los campos del formulario");
    }

    try {
        // Crear una nueva conexión a la base de datos
        const conex = await newConex();

        // Consulta para insertar los datos del usuario en la base de datos
        await conex.query("INSERT INTO usuarios (nombre_usuario, email, contraseña) VALUES (?, ?, ?)", [username, email, password]);

        // Cerrar la conexión a la base de datos
        await conex.end();

        // Generar el token JWT con el ID del usuario recién registrado
        const token = await generarJWT({ username, email });

        // Enviar el token como respuesta
        res.send("Se registro correctamente");
    } catch (error) {
        // Manejar errores
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!email || !password) {
        return res.status(400).send("Por favor, complete todos los campos del formulario");
    }

    try {
        // Crear una nueva conexión a la base de datos
        const conex = await newConex();

        // Consulta para verificar las credenciales del usuario
        const [usuario] = await conex.query("SELECT id_usuario FROM usuarios WHERE email = ? AND contraseña = ?", [email, password]);

        // Si no se encuentra el usuario, devolver un error de credenciales inválidas
        if (!usuario) {
            return res.status(401).send("Credenciales inválidas");
        }

        // Generar el token JWT con el ID del usuario
        const token = await generarJWT({ id: usuario.id });

        // Cerrar la conexión a la base de datos
        await conex.end();

        // Enviar el token como respuesta
        res.send({ token });
    } catch (error) {
        // Manejar errores
        console.error("Error al iniciar sesión:", error);
        res.status(500).send("Error interno del servidor");
    }
};
module.exports = { registerUser, login };
