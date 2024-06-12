import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AddBookDTO } from './DTO/addBookDTO';
import { UpdateBookDTO } from './DTO/updateBookDTO';
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
  @Get('stats')
  async nbBookPerYear() {
    let res = await this.bookSer.nbBooksPerYearServ();
    return res;
  }
  @Get(':id')
  async getBook(@Param('id') livreId) {
    let res = await this.bookSer.getBookByIdServ(livreId);
    if (!res) throw new NotFoundException("Ce livre n'existe pas");
    else return res;
  }

  @Put('edit/:id')
  async updateBook(@Param('id', ParseIntPipe) id, @Body() body: UpdateBookDTO) {
    try {
      let res = await this.bookSer.updateBookServ(body, id);
      return res;
    } catch (err) {
      throw new ConflictException();
    }
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id', ParseIntPipe) id) {
    try {
      let res = await this.bookSer.deleteBookServ(id);
      return res;
    } catch (err) {
      throw new ConflictException();
    }
  }
  @Delete('softdelete/:id')
  async softDeleteBook(@Param('id', ParseIntPipe) id) {
    try {
      let res = await this.bookSer.softDeleteBookServ(id);
      return res;
    } catch (err) {
      throw new ConflictException();
    }
  }

  @Delete('restore/:id')
  async restoreBook(@Param('id', ParseIntPipe) id) {
    try {
      let res = await this.bookSer.restoreBookServ(id);
      return res;
    } catch (err) {
      throw new ConflictException();
    }
  }
  @Delete('recover/:id')
  async recoverBook(@Param('id', ParseIntPipe) id) {
    try {
      let res = await this.bookSer.recoverBookServ(id);
      return res;
    } catch (err) {
      throw new ConflictException();
    }
  }
  @Delete('remove/:id')
  async removeBook(@Param('id', ParseIntPipe) id) {
    try {
      let res = await this.bookSer.removeBookServ(id);
      return { res, message: `le livre intitulé ${res.title} a été supprimé` };
    } catch (err) {
      throw new ConflictException();
    }
  }
  @Delete('softremove/:id')
  async softRemoveBook(@Param('id', ParseIntPipe) id) {
    try {
      let res = await this.bookSer.softRemoveBookServ(id);
      return { res, message: `le livre intitulé ${res.title} a été supprimé` };
    } catch (err) {
      throw new ConflictException();
    }
  }
}
