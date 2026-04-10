// gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

export async function analyzeScreen(base64Image) {
  const rawKey = process.env.GEMINI_API_KEY || '';
  const cleanKey = rawKey.replace(/['"\s]/g, ''); 
  
  if (!cleanKey) {
    throw new Error("🚨 FATAL: GEMINI_API_KEY is missing or empty.");
  }

  // Use the cleanKey here
  const genAI = new GoogleGenerativeAI(cleanKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const result = await model.generateContent([
    {
      inlineData: { mimeType: 'image/png', data: base64Image }
    },
    {
      text: `You are a screen reader. Look at this screenshot and return a JSON object with exactly two fields:
      - "mode": one of "code", "email", "document", "browser", "terminal", "other"
      - "context": a clean plain-text extraction of ALL visible text on screen, preserving code structure with newlines
      Return only raw JSON. No markdown, no explanation.`
    }
    
  ]);

  const raw = result.response.text();
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
}