import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
export declare class GenresService {
    private readonly genreRepository;
    constructor(genreRepository: Repository<Genre>);
    create(createGenreDto: CreateGenreDto): Promise<Genre>;
    findAll(): Promise<Genre[]>;
    findOne(id: number): Promise<Genre>;
    update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre>;
    remove(id: number): Promise<void>;
}
