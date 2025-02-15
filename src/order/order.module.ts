import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma.service';
import { TelegramService } from '../telegram/telegram.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, TelegramService],
})
export class OrderModule {}
