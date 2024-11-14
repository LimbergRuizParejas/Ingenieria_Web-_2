import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsNumber()
  @IsNotEmpty()
  genreId!: number;  // Asegúrate de que esté configurado correctamente
}
