const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rol: {
        type: DataTypes.ENUM('usuario', 'administrador'),
        defaultValue: 'usuario',
      },      
    nombre: {  // Nombre completo
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {  // Para login
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contraseña: {  // Para login
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Datos de contacto
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Datos de domicilio
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
{
    timestamps: true,          // Activa timestamps automáticos
    createdAt: 'createdAt',    // Nombre personalizado para createdAt
    updatedAt: 'updatedAt'     // Nombre personalizado para updatedAt
});

module.exports = Usuario;

