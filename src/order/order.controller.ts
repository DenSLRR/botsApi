import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';

import { CreateOrderDto } from './dto/order.dto';
import { TelegramService } from '../telegram/telegram.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post('/create')
  async create(@Body() dto: CreateOrderDto) {
    const product = await this.orderService.create(dto);
    const message: string = `Новый заказ:\n${JSON.stringify(product, null, 2)}`;
    await this.telegramService.sendMessage(message);
    return product;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.getById(id);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }
}
