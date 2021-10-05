import { IsNotEmpty } from 'class-validator';

export class BookCreateDto {
  @IsNotEmpty()
  title: string;

  description: string;

  link: string;

  price: number;
}
