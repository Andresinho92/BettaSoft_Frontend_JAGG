
const pool = require('../config/db');

// ==========================================
// 1. CONSULTAR TODOS LOS ACUARIOS
// ==========================================
const getAcuarios = async (req, res) => {
    try {
        const [filas] = await pool.query(
            'SELECT * FROM acuario_jagg'
        );

        res.json(filas);
    } catch (error) {
        console.error('Error al consultar los acuarios:', error);
        res.status(500).json({
            error: 'Error al consultar los acuarios',
            detalle: error.message
        });
    }
};

// ==========================================
// 2. CONSULTAR UN ACUARIO POR SU ID
// ==========================================
const getAcuarioById = async (req, res) => {
    try {
        const { id } = req.params;

        const [filas] = await pool.query(
            'SELECT * FROM acuario_jagg WHERE id_acuario = ?',
            [id]
        );

        if (filas.length === 0) {
            return res.status(404).json({
                mensaje: 'Acuario no encontrado'
            });
        }

        res.json(filas[0]);
    } catch (error) {
        console.error('Error al buscar el acuario:', error);
        res.status(500).json({
            error: 'Error al buscar el acuario',
            detalle: error.message
        });
    }
};

// ==========================================
// 3. CREAR UN ACUARIO
// ==========================================
const createAcuario = async (req, res) => {
    try {
        const {
            id_usuario,
            nombre,
            tipo,
            fecha_registro,
            capacidad,
            tipo_filtro,
            temp_estable
        } = req.body;

        const [result] = await pool.query(
            `INSERT INTO acuario_jagg
             (id_usuario, nombre, tipo, fecha_registro, capacidad, tipo_filtro, temp_estable)
             VALUES (?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), ?, ?, ?)`,
            [
                id_usuario ?? null,
                nombre,
                tipo,
                fecha_registro ?? null,
                capacidad,
                tipo_filtro ?? null,
                temp_estable ?? null
            ]
        );

        res.status(201).json({
            mensaje: 'Acuario creado exitosamente',
            id_acuario: result.insertId
        });
    } catch (error) {
        console.error('Error al crear acuario:', error);
        res.status(500).json({
            error: 'Error interno del servidor al crear el acuario',
            detalle: error.message
        });
    }
};

// ==========================================
// 4. ACTUALIZAR UN ACUARIO
// ==========================================
const updateAcuario = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            id_usuario,
            nombre,
            tipo,
            fecha_registro,
            capacidad,
            tipo_filtro,
            temp_estable
        } = req.body;

        const [result] = await pool.query(
            `UPDATE acuario_jagg
             SET id_usuario = ?,
                 nombre = ?,
                 tipo = ?,
                 fecha_registro = COALESCE(?, fecha_registro),
                 capacidad = ?,
                 tipo_filtro = ?,
                 temp_estable = ?
             WHERE id_acuario = ?`,
            [
                id_usuario ?? null,
                nombre,
                tipo,
                fecha_registro ?? null,
                capacidad,
                tipo_filtro ?? null,
                temp_estable ?? null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Acuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Acuario actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar acuario:', error);
        res.status(500).json({
            error: 'Error interno del servidor al actualizar el acuario',
            detalle: error.message
        });
    }
};

// ==========================================
// 5. ELIMINAR UN ACUARIO
// ==========================================
const deleteAcuario = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM acuario_jagg WHERE id_acuario = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Acuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Acuario eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar acuario:', error);
        res.status(500).json({
            error: 'Error interno del servidor al eliminar el acuario',
            detalle: error.message
        });
    }
};

// ==========================================
// EXPORTAR FUNCIONES DEL CONTROLADOR
// ==========================================
module.exports = {
    getAcuarios,
    getAcuarioById,
    createAcuario,
    updateAcuario,
    deleteAcuario
};
