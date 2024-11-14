import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
export declare class AlbumsController {
    private readonly albumsService;
    constructor(albumsService: AlbumsService);
    create(createAlbumDto: CreateAlbumDto): Promise<import("./dto/entities/album.entity").Album>;
    findAll(): Promise<import("./dto/entities/album.entity").Album[]>;
    findOne(id: string): Promise<import("./dto/entities/album.entity").Album>;
    update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<import("./dto/entities/album.entity").Album>;
    remove(id: string): Promise<void>;
}
