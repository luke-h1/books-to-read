import { Exclude } from 'class-transformer';
import { Book } from 'src/book/book';
import {
  Column, Entity, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Book, (book) => book.creator)
  books: Book[];
}
