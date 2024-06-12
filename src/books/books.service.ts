import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBookDTO } from './DTO/addBookDTO';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity) private bookRep: Repository<BookEntity>,
  ) {}

  addBookServ(nBook: AddBookDTO) {
    return this.bookRep.save(nBook);
  }

  getAllBooksServ() {
    return this.bookRep.find();
  }
}
