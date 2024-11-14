import { Repository } from 'typeorm';
import { Album } from './dto/entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
export declare class AlbumsService {
    private readonly albumRepository;
    constructor(albumRepository: Repository<Album>);
    create(createAlbumDto: CreateAlbumDto): Promise<Album>;
    findAll(): Promise<Album[]>;
    findOne(id: number): Promise<Album>;
    update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album>;
    remove(id: number): Promise<void>;
}
