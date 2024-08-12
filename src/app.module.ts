import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModule,
    OrderModule,
    TelegramModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
