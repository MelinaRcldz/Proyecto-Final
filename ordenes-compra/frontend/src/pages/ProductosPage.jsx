import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Producto from '../components/Producto';
import '../styles/ProductosPage.css';

function ProductosPage() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [orden, setOrden] = useState('');
    const [categoria, setCategoria] = useState('');
    const [carrito, setCarrito] = useState({}); // Estado del carrito sincronizado con el backend

    const carritoId = localStorage.getItem('carritoId') || 1;

    // Obtener productos con filtros
    const obtenerProductos = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/productos', {
                params: { nombre, precioMin, precioMax, orden, categoria }
            });

            // Asegurarse de que `precio` sea un número
            const productosFormateados = response.data.productos.map((producto) => ({
                ...producto,
                precio: Number(producto.precio),
            }));

            setProductos(productosFormateados);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }, [nombre, precioMin, precioMax, orden, categoria]);

    // Obtener el estado actual del carrito desde el backend
    const obtenerCarrito = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/carrito/${carritoId}`);
            const carritoProductos = response.data.productos || [];
    
            // Formatear el carrito para manejarlo fácilmente en el frontend
            const carritoFormateado = carritoProductos.reduce((acc, item) => {
                acc[item.productoId] = item.cantidad;
                return acc;
            }, {});
    
            setCarrito(carritoFormateado); // Actualiza el estado local con los datos del backend
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
        }
    }, [carritoId]); // carritoId es una dependencia
    
    // useEffect unificado
    useEffect(() => {
        obtenerProductos();
        obtenerCarrito(); // Sincronizar el carrito con el backend al cargar la página
    }, [obtenerProductos, obtenerCarrito]); // Incluye todas las dependencias relevantes

    // Agregar producto al carrito
    const agregarAlCarrito = async (productoId, cantidad) => {
        const producto = productos.find(p => p.id === productoId);
        if (!producto) {
            alert("Producto no encontrado");
            return;
        }

        const cantidadEnCarrito = carrito[productoId] || 0;
        const cantidadDisponible = producto.stock - cantidadEnCarrito;
        
        if (cantidad < 1 || cantidad > producto.stock) {
            alert(`La cantidad debe estar entre 1 y ${cantidadDisponible}`);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/carrito/add', {
                carritoId,
                productoId,
                cantidad
            });

            // Actualizar el estado del carrito local con la nueva cantidad
            setCarrito((prevCarrito) => ({
                ...prevCarrito,
                [productoId]: (prevCarrito[productoId] || 0) + cantidad,
            }));

            alert(response.data.message || "Producto agregado al carrito");
        } catch (error) {
            console.error("Error al agregar producto al carrito", error.response?.data || error.message);
            alert(error.response?.data || "Hubo un problema al agregar el producto al carrito");
        }
    };

    return (
        <div className="productos-contenedor">
            <h1>Lista de Productos</h1>
            <div className="filtros-contenedor">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio mínimo"
                    value={precioMin}
                    onChange={(e) => setPrecioMin(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio máximo"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                />
                <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                    <option value="">Ordenar por precio</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <input
                    type="text"
                    placeholder="Categoría"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
                <button onClick={obtenerProductos} className="filtro-input">Aplicar Filtros</button>
            </div>

            <div className="productos-lista">
                {productos.map((producto) => (
                    <Producto
                        key={producto.id}
                        producto={producto}
                        cantidadEnCarrito={carrito[producto.id] || 0}
                        onAgregarAlCarrito={agregarAlCarrito}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductosPage;

