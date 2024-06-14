const { obtenerTareas, crearTarea } = require('../controllers/tareas.cotroller');

const router = require('express').Router();

router.get('/tareas', obtenerTareas);

router.post('/tareas', crearTarea);

module.exports = router;