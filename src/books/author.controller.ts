import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private authSer: AuthorService) {}

  @Get('all')
  async getAllAuthors() {
    let res = await this.authSer.getAllAuthorsServ();
    return res;
  }

  @Get(':id')
  async getAuthor(@Param('id', ParseIntPipe) id) {
    let res = await this.authSer.getAuthorServ(id);
    return res;
  }

  @Post('add')
  async addAuthor(@Body() body) {
    let res = await this.authSer.addAuthorServ(body);
    return res;
  }
}
