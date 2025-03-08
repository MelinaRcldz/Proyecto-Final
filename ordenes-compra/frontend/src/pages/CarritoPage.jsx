import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CarritoProducto from '../components/CarritoProducto';

function CarritoPage() {
    const [carritoProductos, setCarritoProductos] = useState([]);
    const [totalProductos, setTotalProductos] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const carritoId = localStorage.getItem('carritoId') || 1;

    const obtenerCarrito = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3000/api/carrito/${carritoId}`);
            const productos = response.data.productos;

            const totalProductos = productos.reduce((total, p) => total + p.cantidad, 0);
            const precioTotal = productos.reduce((total, p) => total + p.cantidad * p.precio, 0);

            setCarritoProductos(productos);
            setTotalProductos(totalProductos);
            setPrecioTotal(precioTotal);
        } catch (err) {
            console.error("Error al obtener los datos del carrito", err);
            setError('Hubo un problema al cargar el carrito. Por favor, inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    }, [carritoId]);

    useEffect(() => {
        obtenerCarrito();
    }, [obtenerCarrito]);

    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Tu Carrito</h1>

            {carritoProductos.length === 0 ? (
                <p>No hay productos en el carrito</p>
            ) : (
                <div>
                    <ul>
                        {carritoProductos.map((producto) => (
                            <li key={producto.id}>
                                <CarritoProducto
                                    nombre={producto.nombre}
                                    precio={producto.precio}
                                    cantidad={producto.cantidad}
                                    subtotal={producto.precio * producto.cantidad}
                                    onRemove={() => console.log(`Eliminar producto: ${producto.nombre}`)}
                                />
                            </li>
                        ))}
                    </ul>

                    <div>
                        <h3>Total productos: {totalProductos}</h3>
                        <h3>Precio Total: ${precioTotal.toFixed(2)}</h3>
                    </div>

                    <button
                        onClick={() => console.log('Confirmar Pedido: Esta funcionalidad se implementará después')}>
                        Confirmar Pedido
                    </button>
                </div>
            )}
        </div>
    );
}

export default CarritoPage;
