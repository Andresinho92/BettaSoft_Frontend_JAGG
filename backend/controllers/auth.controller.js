const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Registro de usuarios (POST /api/auth/register)
const register = async (req, res) => {
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
};

// Inicio de sesión / login (POST /api/auth/login)
const login = async (req, res) => {
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
};

module.exports = {
    register,
    login
};