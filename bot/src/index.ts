import TelegramBot from 'node-telegram-bot-api';

import { setupCommands } from './commands';
import { BOT_TOKEN } from './config/config';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

setupCommands(bot);

bot.on('polling_error', console.log);
bot.on('webhook_error', console.error);
