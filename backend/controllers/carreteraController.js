const { Carretera } = require('../models');

exports.getAllCarreteras = async (req, res) => {
    try {
        const carreteras = await Carretera.findAll();
        res.json(carreteras);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las carreteras', error });
    }
};

exports.createCarretera = async (req, res) => {
    const { nombre, municipio_origen, municipio_destino, estado, path } = req.body;
    console.log('Request to create carretera with data:', { nombre, municipio_origen, municipio_destino, estado, path }); // Añadir log
    try {
        const nuevaCarretera = await Carretera.create({ nombre, municipio_origen, municipio_destino, estado, path });
        console.log('Carretera creada:', nuevaCarretera); // Añadir log
        res.json(nuevaCarretera);
    } catch (error) {
        console.error('Error al crear la carretera:', error); // Añadir log de error detallado
        res.status(400).json({ message: 'Error al crear la carretera', error });
    }
};

exports.updateCarretera = async (req, res) => {
    const { id } = req.params;
    const { nombre, municipio_origen, municipio_destino, estado, path } = req.body;
    try {
        const carretera = await Carretera.findByPk(id);
        if (!carretera) {
            return res.status(404).json({ message: 'Carretera no encontrada' });
        }
        carretera.nombre = nombre;
        carretera.municipio_origen = municipio_origen;
        carretera.municipio_destino = municipio_destino;
        carretera.estado = estado;
        carretera.path = path;
        await carretera.save();
        res.json(carretera);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la carretera', error });
    }
};

exports.deleteCarretera = async (req, res) => {
    const { id } = req.params;
    try {
        const carretera = await Carretera.findByPk(id);
        if (!carretera) {
            return res.status(404).json({ message: 'Carretera no encontrada' });
        }
        await carretera.destroy();
        res.json({ message: 'Carretera eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la carretera', error });
    }
};
