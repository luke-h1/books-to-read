/* eslint-disable no-await-in-loop */
import { NestFactory } from '@nestjs/core';
import * as faker from 'faker';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';
import { AppModule } from '../app.module';
import { BookService } from '../book/book.service';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const bookService = app.get(BookService);

  for (let i = 0; i < 30; i += 1) {
    await bookService.save({
      title: faker.lorem.words(11),
      description: faker.lorem.words(11),
      link: faker.internet.url(),
      price: randomInt(10, 1000),
      userId: randomInt(1, 50),
    });
  }
  process.exit();
})();
