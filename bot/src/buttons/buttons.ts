import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { BUTTON_START_TEXT } from './buttons_text';

export const buttons = {
  viewProducts: {
    text: BUTTON_START_TEXT,
    callback_data: 'VIEW_PRODUCTS',
  } as InlineKeyboardButton,
};
