const { Incidencia, Foto } = require('../models');
const Sequelize = require('sequelize');

exports.getAllIncidentes = async (req, res) => {
  try {
    const incidentes = await Incidencia.findAll();
    res.json(incidentes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener incidentes', error });
  }
};

exports.createIncidente = async (req, res) => {
  const { tipo, descripcion, detalle, ubicacion, carretera_id, estado } = req.body;
  console.log('Request to create incidencia with data:', { tipo, descripcion, detalle, ubicacion, carretera_id, estado });
  try {
    const nuevoIncidente = await Incidencia.create({
      tipo,
      descripcion,
      detalle,
      ubicacion: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ubicacion)),
      carretera_id,
      estado
    });
    console.log('Incidencia creada:', nuevoIncidente);
    res.status(201).json(nuevoIncidente);
  } catch (error) {
    console.error('Error al crear la incidencia:', error);
    res.status(400).json({ message: 'Error al crear el incidente', error });
  }
};

exports.reportarIncidente = async (req, res) => {
  const { tipo, descripcion, detalle, ubicacion, carretera_id, estado } = req.body;
  console.log('Request to report incidencia with data:', { tipo, descripcion, detalle, ubicacion, carretera_id, estado });
  try {
    const nuevoIncidente = await Incidencia.create({
      tipo,
      descripcion,
      detalle,
      ubicacion: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ubicacion)),
      carretera_id,
      estado
    });
    console.log('Incidencia reportada:', nuevoIncidente);
    res.status(201).json(nuevoIncidente);
  } catch (error) {
    console.error('Error al reportar la incidencia:', error);
    res.status(400).json({ message: 'Error al reportar el incidente', error });
  }
};

exports.updateIncidente = async (req, res) => {
  const { id } = req.params;
  const { tipo, descripcion, detalle, ubicacion, carretera_id, estado } = req.body;
  try {
    const incidente = await Incidencia.findByPk(id);
    if (!incidente) {
      return res.status(404).json({ message: 'Incidente no encontrado' });
    }
    incidente.tipo = tipo;
    incidente.descripcion = descripcion;
    incidente.detalle = detalle;
    incidente.ubicacion = ubicacion;
    incidente.carretera_id = carretera_id;
    incidente.estado = estado;
    await incidente.save();
    res.json(incidente);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el incidente', error });
  }
};

exports.deleteIncidente = async (req, res) => {
  const { id } = req.params;
  try {
    const incidente = await Incidencia.findByPk(id);
    if (!incidente) {
      return res.status(404).json({ message: 'Incidente no encontrado' });
    }
    await incidente.destroy();
    res.json({ message: 'Incidente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el incidente', error });
  }
};

exports.addFoto = async (req, res) => {
  const { incidenteId } = req.params;
  const { url } = req.body;
  try {
    const incidente = await Incidencia.findByPk(incidenteId);
    if (!incidente) {
      return res.status(404).json({ message: 'Incidente no encontrado' });
    }
    const nuevaFoto = await Foto.create({ url, incidenteId });
    res.status(201).json(nuevaFoto);
  } catch (error) {
    res.status(400).json({ message: 'Error al agregar la foto', error });
  }
};

exports.deleteFoto = async (req, res) => {
  const { id } = req.params;
  try {
    const foto = await Foto.findByPk(id);
    if (!foto) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }
    await foto.destroy();
    res.json({ message: 'Foto eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la foto', error });
  }
};
