import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Genre } from '../genres/entities/genre.entity'; // Importa la entidad Genre
import { Album } from '../albums/entities/album.entity'; // Importa la entidad Album

@Injectable()
export class ArtistsService {
  constructor(
      @InjectRepository(Artist)
      private readonly artistRepository: Repository<Artist>,
      @InjectRepository(Genre)
      private readonly genreRepository: Repository<Genre>,
      @InjectRepository(Album)
      private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    // Verificar si el género existe
    const genre = await this.genreRepository.findOne({
      where: { id: createArtistDto.genreId }
    });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${createArtistDto.genreId} not found`);
    }
    // Crear el artista con el género asociado
    const artist = this.artistRepository.create({
      ...createArtistDto,
      genre // Asegúrate de que el género se asocia correctamente
    });
    return this.artistRepository.save(artist);
  }

  findAll(): Promise<Artist[]> {
    return this.artistRepository.find({ relations: ['genre'] });
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: ['albums', 'genre'] // Asegúrate de incluir 'genre' en las relaciones
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async findAlbumsByArtistId(id: number): Promise<Album[]> {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: ['albums']
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist.albums || []; // Maneja el caso de undefined
  }


  async update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.preload({
      id,
      ...updateArtistDto,
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return this.artistRepository.save(artist);
  }

  async remove(id: number): Promise<void> {
    await this.artistRepository.delete(id);
  }
}
