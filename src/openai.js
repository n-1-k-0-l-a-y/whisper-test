// import { Configuration, OpenAIApi } from "openai";
// import config from "config";
// import { createReadStream } from "fs";

// class OpenAI {
//   roles = {
//     ASSISTANT: 'assistant',
//     USER: 'user',
//     SYSTEM: 'system',
//   }

//   constructor(apiKey) {
//     const configuration = new Configuration({
//       apiKey,
//     });
//     this.openai = new OpenAIApi(configuration);
//   }

//   async chat(messages) {
//     const response = await this.openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages,
//     })
//     return response.data.choices[0].message
//   }

//   async transcription(filepath) {
//     const response = await this.openai.createTranscription(
//       createReadStream(filepath),
//       'whisper-1'
//     )
//     return response.data.text
//   }
// }

// export const openai = new OpenAI(config.get('OPENAI_KEY'));

import { Configuration, OpenAIApi } from 'openai'
import { createReadStream } from 'fs'
import config from 'config'

class OpenAI {
  roles = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user',
  }

  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    })
    this.openai = new OpenAIApi(configuration)
  }

  async chat(messages = []) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      })

      return completion.data.choices[0].message
    } catch (e) {
      console.error(`Error while chat completion: ${e.message}`)
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.createTranscription(
        createReadStream(filepath),
        'whisper-1'
      )
      return response.data.text
    } catch (e) {
      console.error(`Error while transcription: ${e.message}`)
    }
  }
}

export const openai = new OpenAI(config.get('OPENAI_KEY'))
