const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/test', (req, res) => {
    res.send('Ruta de carritos funcionando');
});

//rutas del carrito

router.post('/add', carritoController.agregarProducto);
router.get('/:carritoId', carritoController.mostrarCarrito);
router.put('/update/:id', carritoController.actualizarCantidad);
router.delete('/remove/:id', carritoController.eliminarProducto);

module.exports = router;
