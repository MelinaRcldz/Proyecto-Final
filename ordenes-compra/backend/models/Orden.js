// models/Orden.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario'); // Asegúrate de importar otros modelos si es necesario

const Orden = sequelize.define('Orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente',
    },
});

Orden.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Orden, { foreignKey: 'usuario_id' });

module.exports = Orden;
