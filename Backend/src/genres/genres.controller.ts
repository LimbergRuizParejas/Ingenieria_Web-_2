import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Param, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(+id);
  }

  @Get(':id/artists')
  async findArtists(@Param('id') id: string) {
    const artists = await this.genresService.findArtistsByGenreId(+id);
    console.log(artists); // Agregar un log para verificar los datos
    return artists;
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
  create(@Body() createGenreDto: CreateGenreDto, @UploadedFile() image: Express.Multer.File) {
    createGenreDto.image = image.filename;  // Asigna el nombre del archivo al DTO
    return this.genresService.create(createGenreDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(+id);
  }
}
