import {
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { AddBookDTO } from './DTO/addBookDTO';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  @Inject(BooksService) bookSer: BooksService;

  @Post('add')
  async addBook(@Body() book: AddBookDTO) {
    try {
      let res = await this.bookSer.addBookServ(book);
      return { message: 'Book Added', res };
    } catch (err) {
      throw new ConflictException();
    }
  }
}
