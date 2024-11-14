import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artists/entities/artist.entity'; // Importa la entidad Artist
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist])], // Incluye Album y Artist
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [TypeOrmModule] // Exporta TypeOrmModule para que esté disponible en otros módulos
})
export class AlbumsModule {}
