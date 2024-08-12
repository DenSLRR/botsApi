import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany();
  }

  async create(dto: CreateOrderDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: +dto.productId,
      },
    });

    if (!product.available) {
      throw new BadRequestException('Product is not available');
    }

    const order = await this.prisma.order.create({
      data: {
        productName: product.title,
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
      },
    });

    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        available: product.available - 1,
      },
    });

    return order;
  }
  async getById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: +id },
    });
    if (!order) throw new NotFoundException('Product not found');

    return order;
  }
}
