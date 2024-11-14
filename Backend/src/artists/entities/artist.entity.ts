import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Genre } from '../../genres/entities/genre.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @ManyToOne(() => Genre, genre => genre.artists, { eager: true })
  genre!: Genre;

  @OneToMany(() => Album, album => album.artist)
  albums?: Album[]; // Hacer opcional sin inicializar
}
