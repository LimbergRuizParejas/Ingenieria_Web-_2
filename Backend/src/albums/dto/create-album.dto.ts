import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  artistId!: number;
}
