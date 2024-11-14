const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',       // Usuario correcto
  host: 'localhost',      // Host correcto
  database: 'Pokedex',   // Nombre de la base de datos correcto
  password: 'root',       // Contraseña correcta
  port: 5432,
});

module.exports = pool;
