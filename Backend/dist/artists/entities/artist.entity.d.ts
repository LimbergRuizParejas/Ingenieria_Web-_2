import { Genre } from '../../genres/entities/genre.entity';
import { Album } from '../../albums/dto/entities/album.entity';
export declare class Artist {
    id: number;
    name: string;
    image: string;
    genre: Genre;
    albums: Album[];
}
