const Carrito = require('../models/Carrito');
const CarritoItem = require('../models/CarritoItem');
const Producto = require('../models/Producto');

// Agregar productos
exports.agregarProducto = async (req, res) => {
    const { carritoId, productoId, cantidad } = req.body;

    try {
        const carrito = await Carrito.findByPk(carritoId);
        if (!carrito) return res.status(404).send('Carrito no encontrado');

        const producto = await Producto.findByPk(productoId);
        if (!producto) return res.status(404).send('Producto no encontrado');

        if (producto.stock < cantidad) {
            return res.status(400).send(`Stock insuficiente. Solo quedan ${producto.stock} unidades.`);
        }

        let item = await CarritoItem.findOne({
            where: {
                carrito_id: carritoId,
                producto_id: productoId
            }
        });

        if (item) {
            item.cantidad += cantidad;
            item.precio = item.cantidad * producto.precio;
            await item.save();
        } else {
            item = await CarritoItem.create({
                carrito_id: carritoId,
                producto_id: productoId,
                cantidad,
                precio: producto.precio * cantidad
            });
        }

        res.status(201).send('Producto agregado al carrito');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json('Error al agregar producto al carrito');
    }
};


//Mostrar carrito
exports.mostrarCarrito = async (req, res) => {
    const { carritoId } = req.params;

    try {
        const items = await CarritoItem.findAll({
            where: { carrito_id: carritoId },
            include: [{ model: Producto, attributes: ['nombre', 'precio'] }]
        });

        if (items.length === 0) return res.status(404).send('El carrito está vacío');

        //precio total
        const total = items.reduce((sum, item) => sum + item.precio, 0);
        res.json({ items, total });
    } catch (error) {
        res.status(500).json('Error al mostrar el carrito');
    }
};

//cantidad productos
exports.actualizarCantidad = async (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;

    try {
        // Cambia 'id' a 'idcarrito_items' en la búsqueda
        const item = await CarritoItem.findOne({
            where: { idcarrito_items: id },
            include: Producto
        });

        if (!item) return res.status(404).json('Producto no encontrado en el carrito');

        item.cantidad = cantidad;
        item.precio = item.Producto.precio * cantidad;
        await item.save();

        res.send('Cantidad de productos actualizada');
    } catch (error) {
        console.error(error);
        res.status(500).json('Error al actualizar cantidad');
    }
};

//Eliminar productos
exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await CarritoItem.findByPk(id); // Busca el producto en carrito_items
        if (!item) {
            return res.status(404).json('Producto no encontrado en el carrito');
        }

        await item.destroy(); // Elimina el producto del carrito
        res.json({ message: 'Producto eliminado del carrito correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        res.status(500).json('Error al eliminar el producto del carrito');
    }
};
