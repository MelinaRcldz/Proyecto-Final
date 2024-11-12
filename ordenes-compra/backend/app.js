const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173' })); 

app.use(express.json());

const usuarioRoutes = require('./routes/usuarios');
const productoRoutes = require('./routes/productos');
const ordenRoutes = require('./routes/ordenes');
const carritoRoutes = require('./routes/carrito');



app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/api/carrito', carritoRoutes);




module.exports = app;
