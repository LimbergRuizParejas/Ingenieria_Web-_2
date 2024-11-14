import { Artist } from '../../artists/entities/artist.entity';
export declare class Genre {
    id: number;
    name: string;
    image: string;
    artists: Artist[];
}
