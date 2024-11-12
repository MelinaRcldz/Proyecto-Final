const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;


// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, contraseña, telefono, direccion, ciudad } = req.body;

    try {
        // Verificar si el email ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) return res.status(400).send('El email ya está en uso');

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear el usuario
        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contraseña: hashedPassword,
            telefono,
            direccion,
            ciudad,
            rol: 'usuario'
        });

        res.status(201).json({ message: 'Usuario registrado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json('Error al registrar usuario');
    }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Buscar el usuario
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) return res.status(404).send('Usuario no encontrado');

        // Verificar la contraseña
        const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!passwordValida) return res.status(401).send('Contraseña incorrecta');

        // Crear y enviar el token
        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token, usuario });
    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        res.status(500).json('Error al iniciar sesión');
    }
};

// Obtener detalles de usuario
exports.obtenerUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ['contraseña'] }  // Excluye la contraseña de la respuesta
        });
        if (!usuario) return res.status(404).send('Usuario no encontrado');

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json('Error al obtener datos del usuario');
    }
};

// Actualizar datos del usuario
exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion, ciudad } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).send('Usuario no encontrado');

        usuario.nombre = nombre || usuario.nombre;
        usuario.telefono = telefono || usuario.telefono;
        usuario.direccion = direccion || usuario.direccion;
        usuario.ciudad = ciudad || usuario.ciudad;
        await usuario.save();

        res.json({ message: 'Datos del usuario actualizados', usuario });
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        res.status(500).json('Error al actualizar usuario');
    }
};
