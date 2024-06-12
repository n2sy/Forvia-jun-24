import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthorEntity } from './entities/author.entity';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [BooksController, AuthorController],
  providers: [BooksService, AuthorService],
})
export class BooksModule {}
