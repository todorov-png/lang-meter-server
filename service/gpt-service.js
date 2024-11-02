import OpenAI from 'openai';

class GPTService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }

  async sendMessage(text) {
    try {
      const response = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: text }],
        model: 'gpt-3.5-turbo',
      });
      return response.choices[0]?.message?.content;
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      return null;
    }
  }
}

export default new GPTService();
