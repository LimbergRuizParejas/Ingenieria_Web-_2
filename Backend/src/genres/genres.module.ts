import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { Genre } from './entities/genre.entity';
import { Artist } from '../artists/entities/artist.entity'; // Asegúrate de importar el entity de Artist
import { ArtistsModule } from '../artists/artists.module'; // Importa el módulo de Artists

@Module({
  imports: [
    TypeOrmModule.forFeature([Genre, Artist]),
    ArtistsModule, // Importa el módulo de Artists
  ],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
