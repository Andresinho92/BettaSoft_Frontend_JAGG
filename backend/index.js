const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = require('./db');

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
// 1. RUTAS CRUD PARA LA TABLA ACUARIO_JAGG
// ==========================================

// 1.1 CONSULTAR TODOS LOS ACUARIOS (GET)
app.get('/api/acuarios', async (req, res) => {
    try {
        const [filas] = await db.query('SELECT * FROM acuario_jagg');
        res.json(filas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los acuarios', detalle: error.message });
    }
});

// 1.2 CONSULTAR UN ACUARIO POR ID (GET)
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

// 1.3 INSERTAR UN NUEVO ACUARIO (POST)
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

// 1.4 ACTUALIZAR UN ACUARIO EXISTENTE (PUT)
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

// 1.5 ELIMINAR UN ACUARIO (DELETE)
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

// ==========================================
// 2. RUTAS DE AUTENTICACIÓN (EVIDENCIA GA7-220501096-AA5-EV01)
// ==========================================

// 2.1 REGISTRO DE USUARIOS (POST)
app.post('/api/auth/register', async (req, res) => {
    const { usuario, password } = req.body;

    // Validación de campos requeridos
    if (!usuario || !password) {
        return res.status(400).json({ error: 'El usuario y la contraseña son obligatorios' });
    }

    try {
        // Encriptar la contraseña de forma segura con bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Consulta parametrizada para prevenir inyecciones SQL
        const sql = 'INSERT INTO usuarios_jagg (usuario, password) VALUES (?, ?)';
        const [resultado] = await db.query(sql, [usuario, hashedPassword]);

        res.status(201).json({
            mensaje: 'Registro de usuario satisfactorio',
            id_usuario: resultado.insertId
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'El nombre de usuario ya se encuentra registrado' });
        }
        res.status(500).json({ error: 'Error al registrar el usuario', detalle: error.message });
    }
});

// 2.2 INICIO DE SESIÓN / LOGIN (POST)
app.post('/api/auth/login', async (req, res) => {
    const { usuario, password } = req.body;

    // Validación de campos requeridos
    if (!usuario || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    try {
        // Buscar el usuario en la base de datos de forma segura
        const [filas] = await db.query('SELECT * FROM usuarios_jagg WHERE usuario = ?', [usuario]);

        if (filas.length === 0) {
            return res.status(401).json({ error: 'Error en la autenticación: usuario o contraseña incorrectos' });
        }

        const usuarioEncontrado = filas[0];

        // Comparar la contraseña ingresada con el hash guardado en MySQL
        const passwordValida = await bcrypt.compare(password, usuarioEncontrado.password);

        if (!passwordValida) {
            return res.status(401).json({ error: 'Error en la autenticación: usuario o contraseña incorrectos' });
        }

        // Respuesta satisfactoria requerida por la evidencia del SENA
        res.json({
            mensaje: 'Autenticación satisfactoria',
            usuario: {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.usuario
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor durante el inicio de sesión', detalle: error.message });
    }
});

// ==========================================
// INICIAR EL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});