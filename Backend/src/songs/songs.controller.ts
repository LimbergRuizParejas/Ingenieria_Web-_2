import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Param, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('mp3', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@Body() createSongDto: CreateSongDto, @UploadedFile() mp3: Express.Multer.File) {
    if (!mp3) {
      throw new Error('File is not defined');
    }
    if (!createSongDto.albumId) {
      throw new Error('albumId is not defined');
    }
    console.log('Create Song DTO:', createSongDto);  // Verifica los datos recibidos
    console.log('Uploaded File:', mp3);  // Verifica el archivo subido
    createSongDto.mp3 = mp3.filename;  // Asigna el nombre del archivo al DTO
    return await this.songsService.create(createSongDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return await this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.songsService.remove(+id);
  }
}
