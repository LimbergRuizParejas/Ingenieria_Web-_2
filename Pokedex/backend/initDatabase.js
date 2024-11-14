const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Pokedex',
  password: 'root',
  port: 5432,
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS pokemon (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50),
        nroPokedex INTEGER,
        idHabilidad1 VARCHAR(50),
        idHabilidad2 VARCHAR(50),
        idHabilidad3 VARCHAR(50),
        idTipo1 VARCHAR(50),
        idTipo2 VARCHAR(50),
        descripcion TEXT,
        hp INTEGER,
        attack INTEGER,
        defense INTEGER,
        spattack INTEGER,
        spdefense INTEGER,
        speed INTEGER,
        nivelEvolution INTEGER,
        idEvPrevia INTEGER,
        idEvSiguiente INTEGER,
        imagen TEXT
      );
    `);
    console.log("Tablas creadas exitosamente");
  } catch (err) {
    console.error("Error creando las tablas", err);
  } finally {
    client.release();
  }
};

createTables();
