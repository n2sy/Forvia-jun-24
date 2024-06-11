import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('livre')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: 'varchar', length: 50 })
  title;

  @Column({ type: 'varchar', length: 50 })
  editor;

  @Column({
    type: 'int',
  })
  year;
}

// {
//     name: 'titre',
//     type : "varchar",
//     update : true,
//     length : 20,
//     unique : true,
// }
