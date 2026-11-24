
// ============================================
// CONFIGURACIÓN DE CONEXIÓN A BASE DE DATOS
// BettaSoft - Backend
// ============================================

// Cargar variables de entorno
require('dotenv').config();

const mysql = require('mysql2');

// Crear una única piscina de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar conexión compatible con async/await
module.exports = pool.promise();