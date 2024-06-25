const { obtenerTareas, crearTarea } = require('../controllers/tareas.cotroller');
const router = require('express').Router();
const express = require('express');
const { newConex } = require('../db/db');

router.get('/', async (req, res) => {
    try {
        const conexion = await newConex();
        const [publicaciones] = await conexion.query('SELECT * FROM publicaciones order by id_publi DESC')
        await conexion.end();

        console.log(publicaciones); // Verificar los datos que se envían al frontend

        res.status(200).json(publicaciones);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ message: 'Error al obtener las publicaciones' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const conexion = await newConex();
        const [result] = await conexion.query('DELETE FROM publicaciones WHERE id_publi = ?', [id]);
        await conexion.end();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Publicación eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Publicación no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).json({ message: 'Error al eliminar la publicación' });
    }
});
module.exports = router;

