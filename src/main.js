import { Telegraf, session } from 'telegraf';
import { message } from 'telegraf/filters';
import config from 'config';
import { proccessVoiceMessage, proccessTextMessage } from './logic.js';

export const INITIAL_SESSION = {
  messages: [],
}

const bot = new Telegraf(config.get('TG_TOKEN'));

bot.use(session());

bot.command('new', async (ctx) => {
  ctx.session = INITIAL_SESSION;
  await ctx.reply('Waiting for your voice or text message 😼');
});

bot.command('start', async (ctx) => {
  ctx.session = INITIAL_SESSION;
  await ctx.reply('Waiting for your voice or text message 😼');
});

bot.on(message('voice'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION;
  await proccessVoiceMessage(ctx);
});

bot.on(message('text'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION;
  await proccessTextMessage(ctx);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
