const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const actorRoutes = require('./routes/actorRoutes');
const directorRoutes = require('./routes/directorRoutes');
const peliculaRoutes = require('./routes/peliculaRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());

app.use('/api/actores', actorRoutes);
app.use('/api/directores', directorRoutes);
app.use('/api/peliculas', peliculaRoutes);

sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});

module.exports = app;
