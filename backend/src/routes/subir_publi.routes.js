const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { newConex } = require('../db/db'); // Importa la función de conexión

// Configuración de Multer para almacenar imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // Ajusta esta línea
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre único para el archivo de imagen
    }
});

const upload = multer({ storage: storage });

// Ruta POST para subir una publicación con imagen
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        // Obtener la conexión a la base de datos
        const connection = await newConex();

        // Aquí puedes procesar la publicación recibida y guardarla en tu base de datos
        const { titulo, contenido, ubicacion } = req.body; // Asegúrate de que estos nombres coincidan con los del formulario HTML
        const imagenPath = req.file.path; // Ruta donde se guardó la imagen

        // Insertar los datos en la base de datos
        const [result] = await connection.execute('INSERT INTO publicaciones (titulo, contenido, imagen_url) VALUES (?, ?, ?)', [titulo, contenido, imagenPath]);

        // Cerrar la conexión
        await connection.end();

        res.status(200).json({ msg: 'Publicación subida exitosamente.' });
    } catch (error) {
        console.error('Error al subir la publicación:', error.message);
        res.status(500).json({ msg: 'Hubo un problema al subir la publicación.' });
    }
});

module.exports = router;
