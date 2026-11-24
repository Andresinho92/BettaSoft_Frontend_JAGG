const express = require('express');
const router = express.Router();
const acuariosController = require('../controllers/acuarios.controller');

// Rutas CRUD para acuarios
router.get('/', acuariosController.getAcuarios);
router.get('/:id', acuariosController.getAcuarioById);
router.post('/', acuariosController.createAcuario);
router.put('/:id', acuariosController.updateAcuario);
router.delete('/:id', acuariosController.deleteAcuario);

module.exports = router;