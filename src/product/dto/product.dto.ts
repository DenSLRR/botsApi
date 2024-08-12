import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  available: number;
}

export type UpdateProductDto = Partial<CreateProductDto>;
