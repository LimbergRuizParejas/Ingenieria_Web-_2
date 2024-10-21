const express = require('express');
const cors = require('cors');
const app = express();
const pokemonRoutes = require('./routes/pokemonRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(cors({ origin: 'http://localhost:3001' }));  // Permitir solicitudes desde el origen del frontend
app.use(express.json());
app.use('/pokemon', pokemonRoutes);
app.use('/admin', adminRoutes);

require('./initDatabase');  // Ejecuta el script para crear las tablas

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
