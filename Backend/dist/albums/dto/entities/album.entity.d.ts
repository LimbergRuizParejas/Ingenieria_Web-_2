import { Artist } from '../../../artists/entities/artist.entity';
import { Song } from '../../../songs/entities/song.entity';
export declare class Album {
    id: number;
    title: string;
    image: string;
    artist: Artist;
    songs: Song[];
}
