// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();
const mysql = require('mysql2');

// Crear la piscina de conexiones (Connection Pool)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Probar la conexión inicial
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos MySQL:', err.message);
    } else {
        console.log('✅ Conexión exitosa a la base de datos MySQL:', process.env.DB_NAME);
        connection.release();
    }
});

// Exportar la conexión para reutilizarla en las rutas de nuestra API
module.exports = pool.promise();