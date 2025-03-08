const Orden = require('../models/Orden');
const Carrito = require('../models/Carrito');
const CarritoItem = require('../models/CarritoItem');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

exports.crearOrden = async (req, res) => {
    const usuarioId = req.body.usuarioId;

    try {
        const carrito = await Carrito.findOne({
            where: { usuario_id: usuarioId },
            include: [{ model: CarritoItem, include: [Producto] }],
        });

        if (!carrito || carrito.CarritoItems.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío' });
        }

        let total = 0;
        carrito.CarritoItems.forEach((item) => {
            total += item.cantidad * item.Producto.precio;
        });

        const nuevaOrden = await Orden.create({
            usuario_id: usuarioId,
            total,
        });

        for (const item of carrito.CarritoItems) {
            const producto = item.Producto;
            if (producto.stock < item.cantidad) {
                return res.status(400).json({ error: `No hay suficiente stock para ${producto.nombre}.` });
            }
            await producto.update ({ stock: producto.stock - item.cantidad });
        }


        await CarritoItem.destroy({ where: { carrito_id: carrito.id} });

        res.status(201).json({ mensaje: 'Orden creada exitosamente', orden: nuevaOrden });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};

exports.obtenerOrdenesUsuario = async (req, res) => {
    const usuarioId = req.params.usuarioId;

    try {
        const ordenes = await Orden.findAll({
            where: { usuario_id: usuarioId },
            include: [{ model: Usuario }],
        });
        
        if (!ordenes.length) {
            return res.status(404).json({ mensaje: 'No hay órdenes para este usuario'});
        }

        res.status(200).json({ ordenes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};