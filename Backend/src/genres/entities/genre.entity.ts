import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @OneToMany(() => Artist, artist => artist.genre)
  artists!: Artist[];
}
