import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_1,
  baseURL: process.env.OPENAI_BASE_URL || "https://models.github.ai/inference"
});

export default openai;
