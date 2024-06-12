import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBookDTO } from './DTO/addBookDTO';
import { UpdateBookDTO } from './DTO/updateBookDTO';
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
    return this.bookRep.find({
      withDeleted: true,
    });
  }

  getBookByIdServ(id) {
    return this.bookRep.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateBookServ(uBook: UpdateBookDTO, id) {
    let b = await this.bookRep.preload({
      id: id,
      ...uBook,
    });
    return this.bookRep.save(b);
  }

  deleteBookServ(id) {
    return this.bookRep.delete(id);
  }
  async removeBookServ(id) {
    let bookToDelete = await this.getBookByIdServ(id);
    return this.bookRep.remove(bookToDelete);
  }
  async softRemoveBookServ(id) {
    let bookToDelete = await this.getBookByIdServ(id);
    return this.bookRep.softRemove(bookToDelete);
  }

  softDeleteBookServ(id) {
    return this.bookRep.softDelete(id);
  }
  restoreBookServ(id) {
    return this.bookRep.restore(id);
  }
  async recoverBookServ(id) {
    let b = await this.bookRep.find({
      withDeleted: true,
      where: {
        id: id,
      },
    });
    return this.bookRep.recover(b);
  }

  nbBooksPerYearServ() {
    const qb = this.bookRep.createQueryBuilder('book');
    return qb
      .select('book.year, count(book.id) as nbreDeLivres')
      .groupBy('book.year')
      .getRawMany();
  }
}
