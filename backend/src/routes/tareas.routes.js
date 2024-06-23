const { obtenerTareas, crearTarea } = require('../controllers/tareas.cotroller');

const router = require('express').Router();

router.get('/', obtenerTareas);


module.exports = router;