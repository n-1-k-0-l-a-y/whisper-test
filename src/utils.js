import { unlink } from 'fs/promises';

export async function removeFile(filepath) {
  await unlink(filepath);
};

export const gptMessage = (content, role = 'user') => ({
  content,
  role,
});
