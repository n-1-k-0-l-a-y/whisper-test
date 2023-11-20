// import { openai } from './openai.js'

// export const INITIAL_SESSION = {
//   messages: [],
// }

// export async function initCommand(ctx) {
//   ctx.session = { ...INITIAL_SESSION }
//   await ctx.reply('Привет, жду твоего голосового или текстового сообщения 😼');
// }

import { openai } from './openai.js'
import { ogg } from './ogg.js'
import { gptMessage, removeFile } from './utils.js'

export async function proccessVoiceMessage(ctx) {
  try {
    await ctx.reply('💭')

    const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
    const userId = String(ctx.message.from.id)

    const oggPath = await ogg.create(link.href, userId)
    const mp3Path = await ogg.toMp3(oggPath, userId)
    const text = await openai.transcription(mp3Path)
    removeFile(mp3Path)
    await ctx.reply(code(`Ваш запрос: ${text}`))
    ctx.session.messages.push(gptMessage(text))
    const response = await openai.chat(ctx.session.messages)

    ctx.session.messages.push(
      gptMessage(response.content, openai.roles.ASSISTANT)
    )
    await ctx.reply(response.content)
  } catch (e) {
    console.error(`Error while proccessing voice message`, e.message)
  }
}

export async function proccessTextMessage(ctx) {
  try {
    await ctx.reply('💭')
    ctx.session.messages.push(gptMessage(ctx.message.text))
    const response = await openai.chat(ctx.session.messages)

    ctx.session.messages.push(
      gptMessage(response.content, openai.roles.ASSISTANT)
    )
    await ctx.reply(response.content)
  } catch (e) {
    console.error(`Error while proccessing text message`, e.message)
  }
}

