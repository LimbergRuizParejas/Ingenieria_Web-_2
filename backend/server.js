const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');

// Middlewares
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

// Importing routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const carreteraRoutes = require('./routes/carreteraRoutes');
const incidenciaRoutes = require('./routes/incidenciaRoutes');
const municipioRoutes = require('./routes/municipioRoutes');

// Using routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carreteras', carreteraRoutes);
app.use('/api/incidencias', incidenciaRoutes);
app.use('/api/municipios', municipioRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Synchronize database and start server
sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;
