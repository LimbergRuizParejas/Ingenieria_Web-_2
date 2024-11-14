import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
export declare class SongsService {
    private readonly songRepository;
    constructor(songRepository: Repository<Song>);
    create(createSongDto: CreateSongDto): Promise<Song>;
    findAll(): Promise<Song[]>;
    findOne(id: number): Promise<Song>;
    update(id: number, updateSongDto: UpdateSongDto): Promise<Song>;
    remove(id: number): Promise<void>;
}
