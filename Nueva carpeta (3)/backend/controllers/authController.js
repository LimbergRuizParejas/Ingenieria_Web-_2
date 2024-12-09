const { User } = require('../models'); // Asegúrate de que esta línea esté correcta
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    console.log('Register request received with:', { email, password, role }); // Log de los datos de la solicitud
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({ email, password: hashedPassword, role });
        console.log('User created successfully:', newUser); // Log de éxito
        res.json(newUser);
    } catch (error) {
        console.error('Error creating user:', error); // Log de error
        res.status(400).json({ message: 'Error al crear el usuario', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

exports.changePassword = async (req, res) => {
    const { userId, newPassword } = req.body;
    
    if (!newPassword) {
        return res.status(400).json({ message: 'Nueva contraseña requerida' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        await User.update({ password: hashedPassword }, { where: { id: userId } });
        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al cambiar la contraseña', error });
    }
};

exports.me = (req, res) => {
    // Lógica para obtener el usuario autenticado
    res.json({ id: 1, nombre: 'Usuario', email: 'usuario@example.com' }); // Simulación
};
