import { openai } from './openai.js'

export const INITIAL_SESSION = {
  messages: [],
}

export async function initCommand(ctx) {
  ctx.session = { ...INITIAL_SESSION }
  await ctx.reply('Привет, жду твоего голосового или текстового сообщения 😼');
}

