import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Genre } from '../genres/entities/genre.entity'; // Importa la entidad Genre
import { AlbumsModule } from '../albums/albums.module'; // Importa AlbumsModule

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Genre]), AlbumsModule], // Asegúrate de importar AlbumsModule
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [TypeOrmModule]
})
export class ArtistsModule {}
