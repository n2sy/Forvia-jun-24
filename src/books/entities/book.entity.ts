import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { AuthorEntity } from './author.entity';

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

  @ManyToOne(() => AuthorEntity, (author) => author.id, {
    // lazy: true,
    cascade: true,
  })
  author: AuthorEntity;
}

// {
//     name: 'titre',
//     type : "varchar",
//     update : true,
//     length : 20,
//     unique : true,
// }
