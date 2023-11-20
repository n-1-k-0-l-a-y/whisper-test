import { openai } from './openai.js';
import { ogg } from './ogg.js';
import { gptMessage, removeFile } from './utils.js';

export async function proccessVoiceMessage(ctx) {
  await ctx.reply('💭');

  const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
  const userId = String(ctx.message.from.id);

  const oggPath = await ogg.create(link.href, userId);
  const mp3Path = await ogg.toMp3(oggPath, userId);
  const text = await openai.transcription(mp3Path);

  removeFile(mp3Path);

  await ctx.reply(code(`Your message: ${text}`));
  ctx.session.messages.push(gptMessage(text));
  const response = await openai.chat(ctx.session.messages);

  ctx.session.messages.push(
    gptMessage(response.content, openai.roles.ASSISTANT)
  );

  await ctx.reply(response.content);
}

export async function proccessTextMessage(ctx) {
  await ctx.reply('💭');

  ctx.session.messages.push(gptMessage(ctx.message.text));
  const response = await openai.chat(ctx.session.messages);

  ctx.session.messages.push(
    gptMessage(response.content, openai.roles.ASSISTANT)
  );

  await ctx.reply(response.content);
}

