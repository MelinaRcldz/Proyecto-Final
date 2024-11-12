const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const CarritoItem = sequelize.define('CarritoItem', {
    idcarrito_items: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    carrito_id: {
        type: DataTypes.INTEGER,
    },
    producto_id: {
        type: DataTypes.INTEGER,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
}, {
    timestamps: false,  // Desactiva las columnas createdAt y updatedAt
});


module.exports = CarritoItem;

