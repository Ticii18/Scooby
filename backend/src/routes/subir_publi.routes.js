const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { newConex } = require('../db/db'); // Importa la función de conexión

// Configuración de Multer para almacenar imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // Directorio donde se almacenarán las imágenes
    },
    filename: function (req, file, cb) {
        // Generar un nombre único para cada archivo de imagen
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname); // Obtener la extensión del archivo original
        cb(null, uniqueSuffix + extension); // Nombre único para el archivo de imagen
    }
});

const upload = multer({ storage: storage });

// Ruta POST para subir una publicación con imagen
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        // Obtener la conexión a la base de datos
        const connection = await newConex();

        // Procesar la publicación recibida y guardarla en la base de datos
        const { titulo, contenido, ubicacion } = req.body; // Asegúrate de que estos nombres coincidan con los del formulario HTML
        const imagenName = req.file.filename; // Nombre del archivo de la imagen

        // Construir la URL completa de la imagen
        const imageUrl = `http://localhost:4000/uploads/${imagenName}`;

        // Insertar los datos en la base de datos
        const [result] = await connection.execute('INSERT INTO publicaciones (titulo, contenido, imagen_url) VALUES (?, ?, ?)', [titulo, contenido, imageUrl]);

        // Cerrar la conexión
        await connection.end();

        res.status(200).json({ msg: 'Publicación subida exitosamente.', imageUrl: imageUrl });
    } catch (error) {
        console.error('Error al subir la publicación:', error.message);
        res.status(500).json({ msg: 'Hubo un problema al subir la publicación.' });
    }
});

module.exports = router;
