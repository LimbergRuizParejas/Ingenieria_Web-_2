import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song } from './entities/song.entity';
import { AlbumsModule } from '../albums/albums.module';  // Importa AlbumsModule
import { Album } from '../albums/entities/album.entity';  // Importa Album

@Module({
  imports: [
    TypeOrmModule.forFeature([Song, Album]),  // Añade Album al TypeOrmModule
    AlbumsModule,  // Importa AlbumsModule
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
