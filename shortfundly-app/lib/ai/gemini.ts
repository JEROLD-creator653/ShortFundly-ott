import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export function getGeminiModel() {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is required");
  }

  const client = new GoogleGenerativeAI(GEMINI_API_KEY);
  return client.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.0-flash" });
}
