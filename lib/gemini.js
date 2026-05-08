import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing in .env.local");
}

export const genAI = new GoogleGenerativeAI(apiKey || 'placeholder');
export const matchModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
