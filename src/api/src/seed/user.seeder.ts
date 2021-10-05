/* eslint-disable no-await-in-loop */
import { NestFactory } from '@nestjs/core';
import * as faker from 'faker';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';
import { AppModule } from '../app.module';
import { BookService } from '../book/book.service';
import { UserService } from '../user/user.service';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const hashed = await bcrypt.hash('123', 10);

  for (let i = 0; i < 30; i += 1) {
    await userService.save({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: hashed,
      isAdmin: false,
    });
  }
  process.exit();
})();
