import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class AddTaskDTO {
  @IsString()
  @MinLength(8, {
    message: 'Le title doit dépasser 8 caactères',
  })
  public title: string;

  @IsIn(['pending', 'todo', 'done'])
  public statut: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsInt()
  @Min(2020)
  @Max(2030)
  public year: number;
}
