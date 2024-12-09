const { Municipio } = require('../models');

// Obtener todos los municipios
exports.getAllMunicipios = async (req, res) => {
  try {
    const municipios = await Municipio.findAll();
    res.json(municipios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener municipios', error });
  }
};

// Crear un nuevo municipio
exports.createMunicipio = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoMunicipio = await Municipio.create({ nombre });
    res.status(201).json(nuevoMunicipio);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el municipio', error });
  }
};

// Actualizar un municipio existente
exports.updateMunicipio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const municipio = await Municipio.findByPk(id);

    if (!municipio) {
      return res.status(404).json({ message: 'Municipio no encontrado' });
    }

    municipio.nombre = nombre;
    await municipio.save();
    res.json(municipio);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el municipio', error });
  }
};

// Eliminar un municipio existente
exports.deleteMunicipio = async (req, res) => {
  try {
    const { id } = req.params;
    const municipio = await Municipio.findByPk(id);

    if (!municipio) {
      return res.status(404).json({ message: 'Municipio no encontrado' });
    }

    await municipio.destroy();
    res.json({ message: 'Municipio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el municipio', error });
  }
};
