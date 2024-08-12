import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  phone: number;

  @IsString()
  productId: string;
}

export type UpdateOrderDto = Partial<CreateOrderDto>;
