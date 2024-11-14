import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultValues1612345678901 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insertar un artista por defecto si no existe
        await queryRunner.query(`
      INSERT INTO artist (id, name) 
      SELECT 1, 'Default Artist' 
      WHERE NOT EXISTS (SELECT 1 FROM artist WHERE id = 1);
    `);

        // Insertar un álbum por defecto si no existe
        await queryRunner.query(`
      INSERT INTO album (id, title, image, artistId) 
      SELECT 1, 'Default Album', 'default.jpg', 1 
      WHERE NOT EXISTS (SELECT 1 FROM album WHERE id = 1);
    `);

        // Asegurar que todos los registros en song tienen un albumId válido
        await queryRunner.query(`
      UPDATE song SET "albumId" = 1 WHERE "albumId" IS NULL;
    `);

        // Actualizar la columna para que no acepte valores null
        await queryRunner.query(`ALTER TABLE song ALTER COLUMN "albumId" SET NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Permitir valores nulos nuevamente en caso de revertir la migración
        await queryRunner.query(`ALTER TABLE song ALTER COLUMN "albumId" DROP NOT NULL;`);
    }
}
