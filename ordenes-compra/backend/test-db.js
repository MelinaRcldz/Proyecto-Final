
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

// Crear una instancia de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', 
  port: 3306 
});

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos usando Sequelize.');
  })
  .catch((error) => {
    console.error('Error de conexión con Sequelize:', error.message);
  })
  .finally(() => {
    sequelize.close(); 
  });
