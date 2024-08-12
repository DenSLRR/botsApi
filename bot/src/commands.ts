import TelegramBot from 'node-telegram-bot-api';
import { buttons } from './buttons/buttons';
import { GET_ITEMS, TEXT_START } from './text';
import { sendProductsList } from './functions';

export const setupCommands = (bot: TelegramBot) => {
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, TEXT_START, {
      reply_markup: {
        inline_keyboard: [[buttons.viewProducts]],
      },
    });
  });

  bot.on('callback_query', async (query) => {
    const chatId = query.message?.chat.id;

    if (chatId && query.message && query.data === 'VIEW_PRODUCTS') {
      await bot.deleteMessage(chatId, query.message.message_id);
      await sendProductsList(bot, chatId);
    }
  });
};
