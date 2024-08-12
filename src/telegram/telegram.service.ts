import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
    this.bot = new TelegramBot(token, { polling: false });
  }

  async sendMessage(message: string) {
    await this.bot.sendMessage(this.chatId, message);
  }
}
