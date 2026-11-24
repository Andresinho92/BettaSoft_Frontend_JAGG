const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./config/db');

const authRoutes = require('./routes/auth.routes');
const acuariosRoutes = require('./routes/acuarios.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES
// ==========================================
app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.json({ mensaje: '¡Servidor Backend de BettaSoft corriendo correctamente!' });
});

// ==========================================
// RUTAS MODULARES
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/acuarios', acuariosRoutes);

// ==========================================
// INICIAR EL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});