import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class AlbumsService {
  constructor(
      @InjectRepository(Album)
      private readonly albumRepository: Repository<Album>,
      @InjectRepository(Artist)
      private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const artist = await this.artistRepository.findOne({ where: { id: createAlbumDto.artistId } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${createAlbumDto.artistId} not found`);
    }
    const album = this.albumRepository.create({ ...createAlbumDto, artist });
    return this.albumRepository.save(album);
  }

  findAll(): Promise<Album[]> {
    return this.albumRepository.find({ relations: ['artist', 'songs'] }); // Asegúrate de incluir 'songs' en las relaciones
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['artist', 'songs'] // Asegúrate de incluir 'songs' en las relaciones
    });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.preload({
      id,
      ...updateAlbumDto,
    });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return this.albumRepository.save(album);
  }

  async remove(id: number): Promise<void> {
    await this.albumRepository.delete(id);
  }
}
