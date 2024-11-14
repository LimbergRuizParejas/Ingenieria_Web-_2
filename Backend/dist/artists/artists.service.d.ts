import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
export declare class ArtistsService {
    private readonly artistRepository;
    constructor(artistRepository: Repository<Artist>);
    create(createArtistDto: CreateArtistDto): Promise<Artist>;
    findAll(): Promise<Artist[]>;
    findOne(id: number): Promise<Artist>;
    update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist>;
    remove(id: number): Promise<void>;
}
