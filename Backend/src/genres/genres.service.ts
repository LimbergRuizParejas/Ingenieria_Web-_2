import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { Artist } from '../artists/entities/artist.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(
      @InjectRepository(Genre)
      private readonly genreRepository: Repository<Genre>,
      @InjectRepository(Artist)
      private readonly artistRepository: Repository<Artist>,
  ) {}

  create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create(createGenreDto as unknown as Genre);
    console.log('Genre entity being saved:', genre);  // Verifica los datos antes de guardar
    return this.genreRepository.save(genre);
  }

  findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id }, relations: ['artists'] });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  async findArtistsByGenreId(id: number): Promise<Artist[]> {
    const genre = await this.genreRepository.findOne({
      where: { id },
      relations: ['artists']
    });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre.artists;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    await this.genreRepository.update(id, updateGenreDto as Partial<Genre>);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.genreRepository.delete(id);
  }
}
