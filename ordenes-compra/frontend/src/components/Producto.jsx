// src/components/Producto.jsx
import PropTypes from 'prop-types';

function Producto({ producto }) {
    return (
        <div>
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
        </div>
    );
}

// Definición de los tipos de las props esperadas
Producto.propTypes = {
    producto: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired
    }).isRequired
};

export default Producto;
