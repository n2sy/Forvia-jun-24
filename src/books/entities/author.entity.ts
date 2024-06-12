import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';

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
}
