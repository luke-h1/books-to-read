import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { isProd } from './shared/isProd';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'books',
      entities: [],
      autoLoadEntities: !isProd,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController, UserController, AuthController, BookController],
  providers: [AppService, UserService, AuthService, BookService],
})
export class AppModule {}
