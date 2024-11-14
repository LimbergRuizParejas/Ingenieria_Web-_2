import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Param, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async findAll() {
    const albums = await this.albumsService.findAll();
    return albums.map(album => ({
      id: album.id,
      title: album.title,
      image: album.image,
      artist: {
        id: album.artist.id,
        name: album.artist.name,
        image: album.artist.image,
      },
      songs: album.songs?.map(song => ({
        id: song.id,
        title: song.title,
        mp3: song.mp3,
      })) ?? [],
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const album = await this.albumsService.findOne(+id);
    return {
      id: album.id,
      title: album.title,
      image: album.image,
      artist: {
        id: album.artist.id,
        name: album.artist.name,
        image: album.artist.image,
      },
      songs: album.songs?.map(song => ({
        id: song.id,
        title: song.title,
        mp3: song.mp3,
      })) ?? [],
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@Body() createAlbumDto: CreateAlbumDto, @UploadedFile() image: Express.Multer.File) {
    console.log('Create Album DTO:', createAlbumDto);  // Verificar los datos recibidos
    console.log('Uploaded File:', image);  // Verificar el archivo subido
    createAlbumDto.image = image.filename;  // Asignar el nombre del archivo al DTO
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(+id);
  }
}
