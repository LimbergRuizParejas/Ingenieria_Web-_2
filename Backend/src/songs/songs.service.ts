import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class SongsService {
  constructor(
      @InjectRepository(Song)
      private readonly songRepository: Repository<Song>,
      @InjectRepository(Album)
      private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const album = await this.albumRepository.findOne({ where: { id: createSongDto.albumId } }); // Ajusta la consulta
    if (!album) {
      throw new NotFoundException(`Album with ID ${createSongDto.albumId} not found`);
    }
    const song = this.songRepository.create({
      ...createSongDto,
      album,
    });
    return this.songRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songRepository.find({ relations: ['album'] });
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: { id },
      relations: ['album'],
    });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.songRepository.preload({
      id,
      ...updateSongDto,
    });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return this.songRepository.save(song);
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }
}
