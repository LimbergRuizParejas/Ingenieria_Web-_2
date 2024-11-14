import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
export declare class GenresController {
    private readonly genresService;
    constructor(genresService: GenresService);
    create(createGenreDto: CreateGenreDto): Promise<import("./entities/genre.entity").Genre>;
    findAll(): Promise<import("./entities/genre.entity").Genre[]>;
    findOne(id: string): Promise<import("./entities/genre.entity").Genre>;
    update(id: string, updateGenreDto: UpdateGenreDto): Promise<import("./entities/genre.entity").Genre>;
    remove(id: string): Promise<void>;
}
