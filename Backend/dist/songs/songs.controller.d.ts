import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    create(createSongDto: CreateSongDto): Promise<import("./entities/song.entity").Song>;
    findAll(): Promise<import("./entities/song.entity").Song[]>;
    findOne(id: string): Promise<import("./entities/song.entity").Song>;
    update(id: string, updateSongDto: UpdateSongDto): Promise<import("./entities/song.entity").Song>;
    remove(id: string): Promise<void>;
}
