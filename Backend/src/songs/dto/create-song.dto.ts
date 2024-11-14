import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  mp3!: string;

  @IsNumber()
  @IsNotEmpty()
  albumId!: number;
}
