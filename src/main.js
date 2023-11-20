// import { Telegraf, session } from 'telegraf'
// import { message } from 'telegraf/filters'
// import config from 'config'
// import { ogg } from './ogg.js'
// import { openai } from './openai.js'
// import { removeFile } from './utils.js'
// import { initCommand, INITIAL_SESSION } from './logic.js'

// const bot = new Telegraf(config.get('TG_TOKEN'))

// bot.use(session())

// bot.command('new', initCommand)

// bot.command('start', initCommand)

// bot.on(message('voice'), async (ctx) => {
//   ctx.session ??= INITIAL_SESSION

//   await ctx.reply('Ждем ответ от сервера...')
//   const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
//   const userId = String(ctx.message.from.id)
//   const oggPath = await ogg.create(link.href, userId)
//   const mp3Path = await ogg.toMp3(oggPath, userId)

//   removeFile(oggPath)

//   const text = await openai.transcription(mp3Path)
//   await processTextToChat(ctx, text)
// })

// bot.on(message('text'), async (ctx) => {
//   ctx.session ??= INITIAL_SESSION

//   await ctx.reply('Жду ответ от сервера')
//   ctx.session.messages.push({
//     role: openai.roles.USER,
//     content: ctx.message.text
//   })

//   const response = await openai.chat(ctx.session.messages)

//   ctx.session.messages.push({
//     role: openai.roles.ASSISTANT,
//     content: response.content
//   })

//   await ctx.reply(response.content)
// })

// bot.launch()

// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))

import { Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import config from 'config'
import { proccessVoiceMessage, proccessTextMessage } from './logic.js'

export const INITIAL_SESSION = {
  messages: [],
}

const bot = new Telegraf(config.get('TG_TOKEN'))

bot.use(session())

bot.command('new', async (ctx) => {
  ctx.session = INITIAL_SESSION
  await ctx.reply('Жду вашего голосового сообщения')
})

bot.command('start', async (ctx) => {
  ctx.session = INITIAL_SESSION
  await ctx.reply('Жду вашего голосового сообщения')
})

bot.on(message('voice'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  await proccessVoiceMessage(ctx)
})

bot.on(message('text'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  await proccessTextMessage(ctx)
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
