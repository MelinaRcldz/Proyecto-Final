const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

router.get('/test', (req, res) => {
    res.send('Ruta de ordenes funcionando');
});

// Crear una nueva orden
router.post('/crear', ordenController.crearOrden);

// Obtener las órdenes de un usuario
router.get('/usuario/:usuarioId', ordenController.obtenerOrdenesUsuario);

module.exports = router;