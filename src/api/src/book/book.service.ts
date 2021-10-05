import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Book } from './book';

@Injectable()
export class BookService extends AbstractService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
    super(bookRepository);
  }
}
