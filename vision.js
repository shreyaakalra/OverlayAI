// vision.js
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

export async function analyzeScreen(base64Image) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error("🚨 FATAL: GROQ_API_KEY is missing.");
  }

  const groq = new Groq({ apiKey });

  // Groq requires the base64 string to be formatted as a data URL
  const imageUrl = `data:image/png;base64,${base64Image}`;

  const response = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `You are a screen reader. Look at this screenshot and return a JSON object with exactly two fields:
            - "mode": one of "code", "email", "document", "browser", "terminal", "other"
            - "context": a clean plain-text extraction of ALL visible text on screen.
            Return ONLY raw JSON. No markdown formatting.`
          },
          {
            type: "image_url",
            image_url: { url: imageUrl }
          }
        ]
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.1,
  });

  const raw = response.choices[0]?.message?.content;
  return JSON.parse(raw);
}