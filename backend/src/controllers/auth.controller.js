const { newConex } = require("../db/db.js");
const generarJWT = require("../helpers/generarJWT.js");

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
        res.json("Se agrego correctamente el usuario");
    } catch (error) {
        // Manejar errores
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!username || !password) {
        return res.status(400).send("Por favor, complete todos los campos del formulario");
    }

    try {
        // Crear una nueva conexión a la base de datos
        const conex = await newConex();

        // Consulta para verificar las credenciales del usuario
        const [result] = await conex.query("SELECT id_usuario, nombre_usuario, contraseña FROM usuarios WHERE nombre_usuario = ?", [username]);

        // Si no se encuentra el usuario, devolver un mensaje indicando que debe registrarse
        if (result.length === 0) {
            await conex.end();
            return res.status(401).json({ message: "Usuario no registrado. Por favor, regístrese." });
        }

        // Verificar la contraseña (sin cifrar)
        const usuario = result[0];
        if (password !== usuario.contraseña) {
            await conex.end();
            return res.status(401).json({ message: "El usuario o la contraseña no coinciden" });
        }

        // Generar el token JWT con el ID del usuario
        const token = await generarJWT({ id: usuario.id_usuario });

        // Cerrar la conexión a la base de datos
        await conex.end();

        // Retornar el token con un mensaje al cliente.
        res.json({
            msg: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        // Manejar errores
        console.error("Error al iniciar sesión:", error);
        res.status(500).send("Error interno del servidor");
    }
};

module.exports = { registerUser, login };
