import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  mp3!: string;

  @ManyToOne(() => Album, album => album.songs, { nullable: false, onDelete: 'CASCADE' })
  album!: Album;
}
