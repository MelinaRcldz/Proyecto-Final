import { useEffect, useState } from 'react';
import Producto from '../components/Producto';
import API_URL from '../config';

function Home() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetch(`${API_URL}/productos`);
                const data = await response.json();
                setProductos(data.productos);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        obtenerProductos();
    }, []);

    return (
        <div>
            <h1>Lista de Productos</h1>
            <div>
                {productos.map((producto) => (
                    <Producto key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
}

export default Home;
