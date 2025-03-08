import PropTypes from "prop-types";

function CarritoProducto({ nombre, precio, cantidad, subtotal, onRemove }) {
    return (
        <div className="carrito-producto">
            <h3>{nombre}</h3>
            <p>Precio: ${precio.toFixed(2)}</p>
            <p>Cantidad: {cantidad}</p>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            {onRemove && (
                <button onClick={onRemove} className="btn-remove">
                    Eliminar
                </button>
            )}
        </div>
    );
}

CarritoProducto.propTypes = {
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
    subtotal: PropTypes.number.isRequired,
    onRemove: PropTypes.func,
};

export default CarritoProducto;
