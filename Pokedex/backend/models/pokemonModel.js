const pool = require('../config/database');

class Pokemon {
  static async getAll() {
    const result = await pool.query('SELECT * FROM pokemon ORDER BY nroPokedex');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM pokemon WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const {
      nombre,
      nroPokedex,
      idHabilidad1,
      idHabilidad2,
      idHabilidad3,
      idTipo1,
      idTipo2,
      descripcion,
      hp,
      attack,
      defense,
      spattack,
      spdefense,
      speed,
      nivelEvolution,
      idEvPrevia,
      idEvSiguiente,
      imagen
    } = data;

    const result = await pool.query(
      `INSERT INTO pokemon (nombre, nroPokedex, idHabilidad1, idHabilidad2, idHabilidad3, idTipo1, idTipo2, descripcion, hp, attack, defense, spattack, spdefense, speed, nivelEvolution, idEvPrevia, idEvSiguiente, imagen)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::INTEGER, $10::INTEGER, $11::INTEGER, $12::INTEGER, $13::INTEGER, $14::INTEGER, $15::INTEGER, $16::INTEGER, $17::INTEGER, $18) RETURNING *`,
      [nombre, nroPokedex, idHabilidad1 || null, idHabilidad2 || null, idHabilidad3 || null, idTipo1 || null, idTipo2 || null, descripcion, hp, attack, defense, spattack, spdefense, speed, nivelEvolution, idEvPrevia || null, idEvSiguiente || null, imagen || null]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const {
      nombre,
      nroPokedex,
      idHabilidad1,
      idHabilidad2,
      idHabilidad3,
      idTipo1,
      idTipo2,
      descripcion,
      hp,
      attack,
      defense,
      spattack,
      spdefense,
      speed,
      nivelEvolution,
      idEvPrevia,
      idEvSiguiente,
      imagen
    } = data;

    const result = await pool.query(
      `UPDATE pokemon
       SET nombre = $1, nroPokedex = $2, idHabilidad1 = $3, idHabilidad2 = $4, idHabilidad3 = $5, idTipo1 = $6, idTipo2 = $7, descripcion = $8, hp = $9::INTEGER, attack = $10::INTEGER, defense = $11::INTEGER, spattack = $12::INTEGER, spdefense = $13::INTEGER, speed = $14::INTEGER, nivelEvolution = $15::INTEGER, idEvPrevia = $16::INTEGER, idEvSiguiente = $17::INTEGER, imagen = $18
       WHERE id = $19 RETURNING *`,
      [nombre, nroPokedex, idHabilidad1 || null, idHabilidad2 || null, idHabilidad3 || null, idTipo1 || null, idTipo2 || null, descripcion, hp, attack, defense, spattack, spdefense, speed, nivelEvolution, idEvPrevia || null, idEvSiguiente || null, imagen || null, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM pokemon WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Pokemon;
