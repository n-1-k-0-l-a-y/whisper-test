import { openai } from './openai.js'

export const INITIAL_SESSION = {
  messages: [],
}

export async function initCommand(ctx) {
  ctx.session = { ...INITIAL_SESSION }
  await ctx.reply('Жду вашего голосового или текстового сообщения')
}

