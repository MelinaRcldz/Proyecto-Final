// src/components/Producto.jsx
import PropTypes from 'prop-types';

function Producto({ producto, onAgregarAlCarrito }) {
    return (
        <div>
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>

            <button onClick={() => onAgregarAlCarrito(producto.id)}>
                Agregar al Carrito
            </button>
        </div>
    );
}

Producto.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired
    }).isRequired,
    onAgregarAlCarrito: PropTypes.func.isRequired
};

export default Producto;
