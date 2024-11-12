const dotenv = require('dotenv');
dotenv.config();  // Para cargar variables de entorno desde .env

const sequelize = require('./config/db');  // Conexion de Sequelize a la DB
const app = require('./app');  // Crea una instancia de Express

// Importa los modelos
const Producto = require('./models/Producto');
const Carrito = require('./models/Carrito');
const CarritoItem = require('./models/CarritoItem');
const Orden = require('./models/Orden');
const Usuario = require('./models/Usuario');


// Aquí se definen las relaciones entre los modelos
Producto.hasMany(CarritoItem, { foreignKey: 'producto_id' });
CarritoItem.belongsTo(Producto, { foreignKey: 'producto_id' });

Carrito.hasMany(CarritoItem, { foreignKey: 'carrito_id' });
CarritoItem.belongsTo(Carrito, { foreignKey: 'carrito_id' });

// Sincroniza los modelos con la base de datos
sequelize.sync()  // Si deseas reiniciar las tablas, usa `force: true`
    .then(() => {
        console.log("Models sincronizados con la base de datos");

        // Inicia el servidor Express
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error sincronización models:", error);
    });
