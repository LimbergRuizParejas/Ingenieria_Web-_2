const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }
        next();
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(401).json({ message: 'Token no válido' });
    }
};
