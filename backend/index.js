const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: '¡Servidor Backend de BettaSoft corriendo correctamente!' });
});

// ==========================================
// RUTAS CRUD PARA LA TABLA ACUARIO_JAGG
// ==========================================

// 1. CONSULTAR TODOS LOS ACUARIOS (GET)
app.get('/api/acuarios', async (req, res) => {
    try {
        const [filas] = await db.query('SELECT * FROM acuario_jagg');
        res.json(filas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los acuarios', detalle: error.message });
    }
});

// 2. CONSULTAR UN ACUARIO POR ID (GET)
app.get('/api/acuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [filas] = await db.query('SELECT * FROM acuario_jagg WHERE id_acuario = ?', [id]);
        if (filas.length === 0) {
            return res.status(404).json({ mensaje: 'Acuario no encontrado' });
        }
        res.json(filas[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el acuario', detalle: error.message });
    }
});

// 3. INSERTAR UN NUEVO ACUARIO (POST)
app.post('/api/acuarios', async (req, res) => {
    const { id_usuario, nombre, fecha_registro, capacidad, tipo_filtro, temp_estable } = req.body;
    try {
        const sql = `INSERT INTO acuario_jagg (id_usuario, nombre, fecha_registro, capacidad, tipo_filtro, temp_estable) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const [resultado] = await db.query(sql, [id_usuario || null, nombre, fecha_registro, capacidad, tipo_filtro, temp_estable]);
        
        res.status(201).json({ 
            mensaje: 'Acuario registrado con éxito', 
            id_acuario: resultado.insertId 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar el acuario', detalle: error.message });
    }
});

// 4. ACTUALIZAR UN ACUARIO EXISTENTE (PUT)
app.put('/api/acuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { id_usuario, nombre, fecha_registro, capacidad, tipo_filtro, temp_estable } = req.body;
    try {
        const sql = `UPDATE acuario_jagg 
                     SET id_usuario = ?, nombre = ?, fecha_registro = ?, capacidad = ?, tipo_filtro = ?, temp_estable = ? 
                     WHERE id_acuario = ?`;
        const [resultado] = await db.query(sql, [id_usuario || null, nombre, fecha_registro, capacidad, tipo_filtro, temp_estable, id]);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Acuario no encontrado para actualizar' });
        }
        res.json({ mensaje: 'Acuario actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el acuario', detalle: error.message });
    }
});

// 5. ELIMINAR UN ACUARIO (DELETE)
app.delete('/api/acuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [resultado] = await db.query('DELETE FROM acuario_jagg WHERE id_acuario = ?', [id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Acuario no encontrado para eliminar' });
        }
        res.json({ mensaje: 'Acuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el acuario', detalle: error.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});