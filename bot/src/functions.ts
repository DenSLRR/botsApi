import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { IProduct } from './types/types';
import { GET_ITEMS } from './text';
import { buttons } from './buttons/buttons';

dotenv.config();

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/product`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Unable to fetch products');
  }
};

export const sendProductsList = async (bot: TelegramBot, chatId: number) => {
  try {
    const products = await fetchProducts();

    await bot.sendMessage(chatId, GET_ITEMS, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: products.map((item: any) => [
          {
            text: `${item.title} -- ${item.price} mdl`,
            callback_data: `product_${item.id}`, // Добавляем callback_data
          },
        ]),
      },
    });
  } catch (error) {
    console.error('Error sending products list:', error);
    await bot.sendMessage(
      chatId,
      'Произошла ошибка при получении списка товаров.',
    );
  }
};

export const chooseProduct = async (bot: TelegramBot, chatId: number) => {};
