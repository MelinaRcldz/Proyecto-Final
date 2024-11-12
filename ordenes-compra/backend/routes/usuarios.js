const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta de registro de usuario
router.post('/register', usuarioController.registrarUsuario);

// Ruta de inicio de sesión
router.post('/login', usuarioController.iniciarSesion);

// Ruta para obtener detalles del usuario
router.get('/:id', usuarioController.obtenerUsuario);

// Ruta para actualizar datos del usuario
router.put('/:id', usuarioController.actualizarUsuario);

module.exports = router;
