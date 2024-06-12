import {
  Body,
  ConflictException,
  Controller,
  Get,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  @Get('all')
  getBooks(@Res() response: Response) {
    this.bookSer
      .getAllBooksServ()
      .then((res) => {
        return response.json({ allBooks: res });
      })
      .catch((err) => {
        throw new ConflictException();
      });
  }
}
