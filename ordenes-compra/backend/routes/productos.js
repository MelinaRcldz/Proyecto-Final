const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Crear un nuevo producto (solo para administradores)
router.post('/', productoController.crearProducto);

// Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Obtener un producto por ID
router.get('/:id', productoController.obtenerProductoPorId);

// Actualizar un producto por ID (solo para administradores)
router.put('/:id', productoController.actualizarProducto);

// Eliminar un producto por ID (solo para administradores)
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
