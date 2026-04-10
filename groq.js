// groq.js
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const SYSTEM_PROMPT = `You are an expert AI assistant embedded in a screen overlay. 
You receive the user's current screen context and help them.
Rules:
- If context is CODE: find bugs, explain what it does, suggest improvements. Use code blocks.
- If context is EMAIL/SLACK: offer to rewrite, summarize, or draft a reply.
- If context is DOCUMENT: summarize key points, answer questions about it.
- Be concise. The UI is small. Lead with the most useful thing first.
- Use markdown. Headers, bullets, and code blocks render correctly.`;

export async function streamResponse(messages, onChunk, onDone) {
  try {
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages,
      stream: true,
      max_tokens: 1024,
      temperature: 0.5,
    });

    let fullText = '';
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        fullText += text;
        onChunk(text);
      }
    }
    onDone(fullText);
  } catch (error) {
    console.error("Streaming Error:", error);
    throw error;
  }
}