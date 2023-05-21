import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  private CONTEXT_INSTRUCTION = 'Based on this context:';
  private INSTRUCTION = `Answer the question below in a sarcastic way.Answer in the language of the text that follows.`;
  private openai;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async createCompletion(prompt, context) {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${this.CONTEXT_INSTRUCTION}\n\n\nContext: "${context}" \n\n\n${this.INSTRUCTION} \n\n\n ${prompt}`,
      max_tokens: 250,
      temperature: 0.2,
    });

    return completion?.data.choices?.[0]?.text;
  }
  async createEmbedding(prompt) {
    const { data: embed } = await this.openai.createEmbedding({
      input: prompt,
      model: 'text-embedding-ada-002',
    });

    return embed;
}
}