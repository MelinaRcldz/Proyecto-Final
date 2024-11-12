import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Producto from '../components/Producto';

function ProductosPage() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [orden, setOrden] = useState('');
    const [categoria, setCategoria] = useState('');

    const obtenerProductos = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/productos', {
                params: { nombre, precioMin, precioMax, orden, categoria }
            });
            setProductos(response.data.productos);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }, [nombre, precioMin, precioMax, orden, categoria]);

    useEffect(() => {
        obtenerProductos();
    }, [obtenerProductos]);

    return (
        <div>
            <h1>Lista de Productos</h1>

            {/* Filtros */}
            <div>
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
                <button onClick={obtenerProductos}>Aplicar Filtros</button>
            </div>

            {/* Lista de Productos */}
            {productos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
            ))}
        </div>
    );
}

export default ProductosPage;

