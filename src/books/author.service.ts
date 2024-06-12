import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity) private authRepo: Repository<AuthorEntity>,
  ) {}

  addAuthorServ(nAuthor) {
    return this.authRepo.save(nAuthor);
  }

  getAllAuthorsServ() {
    return this.authRepo.find();
  }

  getAuthorServ(id) {
    return this.authRepo.find({
      where: {
        id: id,
      },
    });
  }
}
