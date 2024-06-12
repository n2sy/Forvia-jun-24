import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AddBookDTO {
  @IsString()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  editor: string;

  @IsInt()
  year: number;
}
