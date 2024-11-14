import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
export declare class ArtistsController {
    private readonly artistsService;
    constructor(artistsService: ArtistsService);
    create(createArtistDto: CreateArtistDto): Promise<import("./entities/artist.entity").Artist>;
    findAll(): Promise<import("./entities/artist.entity").Artist[]>;
    findOne(id: string): Promise<import("./entities/artist.entity").Artist>;
    update(id: string, updateArtistDto: UpdateArtistDto): Promise<import("./entities/artist.entity").Artist>;
    remove(id: string): Promise<void>;
}
