const express = require('express');
const router = express.Router();
const { getAllMunicipios, createMunicipio } = require('../controllers/municipioController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', getAllMunicipios);
router.post('/', authenticate, createMunicipio);

module.exports = router;
