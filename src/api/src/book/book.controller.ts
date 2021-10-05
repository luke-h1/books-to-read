import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookCreateDto } from './dtos/BookCreateDto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/books')
  async all() {
    return this.bookService.find({});
  }

  @Post('/books')
  async create(@Body() body: BookCreateDto) {
    return this.bookService.save(body);
  }

  @Get('/books/:id')
  async get(@Param('id') id: number) {
    return this.bookService.findOne({ id });
  }

  @Put('/books/:id')
  async update(@Param('id') id: number, @Body() body: BookCreateDto) {
    await this.bookService.update(id, body);
    return this.bookService.findOne({ id });
  }

  @Delete('/books/:id')
  async delete(@Param('id') id: number) {
    await this.bookService.delete(id);
    return {
      message: 'success',
    };
  }
}
