import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { BookEntity } from './book.entity';

@Entity('auteur')
export class AuthorEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prenom: string;

  @Column({
    update: false,
  })
  nom: string;

  @OneToMany(() => BookEntity, (book) => book.id)
  listeLivres: BookEntity[];
}
