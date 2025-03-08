import { useState } from 'react';
import PropTypes from 'prop-types';

function Producto({ producto, onAgregarAlCarrito, cantidadEnCarrito }) {
    const [cantidad, setCantidad] = useState(cantidadEnCarrito || 0);

    const cantidadDisponible = producto.stock - cantidadEnCarrito;

    return (
        <div className="producto">
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>Precio: ${Number(producto.precio).toFixed(2)}</p>
            <p>Stock disponible: {cantidadDisponible}</p>

            <input
                type="number"
                value={cantidad}
                onChange={(e) => {
                    const valor = Number(e.target.value);

                    // Validar entre 0 y el stock disponible
                    const cantidadFinal = Math.max(0, Math.min(valor, cantidadDisponible));

                    setCantidad(cantidadFinal); // Actualiza el estado
                }}
                min="0"
                max={cantidadDisponible}
            />

            <button 
                onClick={() => onAgregarAlCarrito(producto.id, cantidad)} 
                disabled={cantidad === 0 || cantidad > cantidadDisponible}
            >
                Agregar al carrito
            </button>

            {cantidad > cantidadDisponible && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                    No hay suficiente stock disponible.
                </p>
            )}

            {cantidadEnCarrito > 0 && (
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                    En carrito: {cantidadEnCarrito}
                </p>
            )}
        </div>
    );
}

Producto.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
    }).isRequired,
    onAgregarAlCarrito: PropTypes.func.isRequired,
    cantidadEnCarrito: PropTypes.number
};

export default Producto;
