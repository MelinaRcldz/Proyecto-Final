const { Op } = require('sequelize');
const Producto = require('../models/Producto');

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body; // Incluye categoría

    try {
        const nuevoProducto = await Producto.create({ nombre, descripcion, precio, stock, categoria });
        res.status(201).json({ message: 'Producto creado correctamente', producto: nuevoProducto });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

// Obtener todos los productos con filtros
exports.obtenerProductos = async (req, res) => {
    const { nombre, precioMin, precioMax, categoria, orden, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (nombre) whereClause.nombre = { [Op.like]: `%${nombre}%` };
    if (precioMin) whereClause.precio = { ...whereClause.precio, [Op.gte]: precioMin };
    if (precioMax) whereClause.precio = { ...whereClause.precio, [Op.lte]: precioMax };
    if (categoria) whereClause.categoria = categoria;

    const orderClause = orden === 'asc' ? [['precio', 'ASC']] : orden === 'desc' ? [['precio', 'DESC']] : [];

    try {
        const productos = await Producto.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            totalItems: productos.count,
            totalPages: Math.ceil(productos.count / limit),
            currentPage: parseInt(page),
            productos: productos.rows
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        res.json(producto);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ message: 'Error al obtener producto' });
    }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.precio = precio || producto.precio;
        producto.stock = stock || producto.stock;
        producto.categoria = categoria || producto.categoria; // Actualizar la categoría
        await producto.save();

        res.json({ message: 'Producto actualizado correctamente', producto });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        await producto.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};
