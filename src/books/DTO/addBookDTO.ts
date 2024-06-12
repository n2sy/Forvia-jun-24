import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthorEntity } from '../entities/author.entity';

export class AddBookDTO {
  @IsString()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  editor: string;

  @IsInt()
  year: number;

  @IsNotEmpty()
  author: AuthorEntity;
}
