import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Song } from '../../songs/entities/song.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @ManyToOne(() => Artist, artist => artist.albums, { eager: true })
  artist!: Artist;

  @OneToMany(() => Song, song => song.album, { eager: true }) // { eager: true } para cargar la relación automáticamente
  songs?: Song[];
}
