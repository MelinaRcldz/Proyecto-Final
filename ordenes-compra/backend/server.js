const dotenv = require('dotenv');
dotenv.config();  // Para cargar variables de entorno desde .env

const sequelize = require('./config/db');  
const app = require('./app');  

// Importa los modelos
const Producto = require('./models/Producto');
const Carrito = require('./models/Carrito');
const CarritoItem = require('./models/CarritoItem');
const Orden = require('./models/Orden');
const Usuario = require('./models/Usuario');


Producto.hasMany(CarritoItem, { foreignKey: 'producto_id' });
CarritoItem.belongsTo(Producto, { foreignKey: 'producto_id' });

Carrito.hasMany(CarritoItem, { foreignKey: 'carrito_id' });
CarritoItem.belongsTo(Carrito, { foreignKey: 'carrito_id' });


sequelize.sync()  
    .then(() => {
        console.log("Models sincronizados con la base de datos");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error sincronización models:", error);
    });
