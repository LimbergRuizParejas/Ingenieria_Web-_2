const express = require('express');
const app = express();
const sequelize = require('./config/database');
require('dotenv').config();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const carreteraRoutes = require('./routes/carreteraRoutes');
const incidenciaRoutes = require('./routes/incidenciaRoutes');
const municipioRoutes = require('./routes/municipioRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/carreteras', carreteraRoutes);
app.use('/api/incidencias', incidenciaRoutes);
app.use('/api/municipios', municipioRoutes);

// Ruta para manejar la raíz y cualquier otra ruta no definida
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

sequelize.sync().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

app.listen(3000, () => {
  console.log('API is running on http://localhost:3000');
});

module.exports = app;
