import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Param, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(+id);
  }

  @Get(':id/albums')
  async findAlbums(@Param('id') id: string) {
    const albums = await this.artistsService.findAlbumsByArtistId(+id);
    console.log(albums); // Verificar los datos
    return albums;
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
  create(@Body() createArtistDto: CreateArtistDto, @UploadedFile() image: Express.Multer.File) {
    console.log('Create Artist DTO:', createArtistDto);  // Verifica los datos recibidos
    console.log('Uploaded File:', image);  // Verifica el archivo subido
    createArtistDto.image = image.filename;  // Asigna el nombre del archivo al DTO
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.remove(+id);
  }
}
