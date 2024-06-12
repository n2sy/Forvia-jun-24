import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';

@Entity('livre')
export class BookEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  editor: string;

  @Column({
    type: 'int',
  })
  year: number;
}

// {
//     name: 'titre',
//     type : "varchar",
//     update : true,
//     length : 20,
//     unique : true,
// }
