import { useState } from 'react'

const SYSTEM_PROMPT = `You are an expert AI assistant embedded in a screen overlay.
You receive the user's current screen context and help them.
Rules:
- If context is CODE: find bugs, explain what it does, suggest improvements. Use code blocks.
- If context is EMAIL/SLACK: offer to rewrite, summarize, or draft a reply.
- If context is DOCUMENT: summarize key points, answer questions about it.
- Be concise. The UI is small. Lead with the most useful thing first.
- Use markdown. Headers, bullets, and code blocks render correctly.
- You CAN see the user's screen via the screenshot provided. Always acknowledge what you see.`

export function useCerebras() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function ask(prompt: string, screenshotBase64?: string) {
    setLoading(true)
    setResponse('')

    const messages: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: screenshotBase64
          ? [
              {
                type: 'image_url',
                image_url: { url: screenshotBase64 },
              },
              {
                type: 'text',
                text: prompt,
              },
            ]
          : prompt,
      },
    ]

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: screenshotBase64
            ? 'meta-llama/llama-4-scout-17b-16e-instruct'
            : 'llama-3.3-70b-versatile',
          messages,
          stream: true,
          max_tokens: 1024,
          temperature: 0.5,
        }),
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))
        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const delta = JSON.parse(data).choices[0].delta.content
            if (delta) setResponse((prev) => prev + delta)
          } catch {}
        }
      }
    } catch (err) {
      setResponse('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return { ask, response, loading }
}