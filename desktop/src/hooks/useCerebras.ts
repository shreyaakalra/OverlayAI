import { useState } from 'react'

const SYSTEM_PROMPT = `You are an expert AI assistant embedded in a screen overlay.
You receive the user's current screen screenshot and help them.
Rules:
- Always start by briefly describing what you see on screen (1 sentence).
- Then provide the most useful insight or summary.
- If it's CODE: find bugs, explain it, suggest improvements.
- If it's EMAIL/BROWSER: summarize, offer to draft replies.
- If it's DOCUMENT: summarize key points.
- Be concise. The UI is small.
- Use markdown. Headers, bullets, and code blocks render correctly.`

export type Message = { role: 'user' | 'assistant'; content: string }

export function useCerebras() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<Message[]>([])

  async function ask(prompt: string, screenshotBase64?: string) {
    setLoading(true)
    setResponse('')

    const userMessage: any = screenshotBase64
      ? {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: screenshotBase64 } },
            { type: 'text', text: prompt },
          ],
        }
      : { role: 'user', content: prompt }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      userMessage,
    ]

    let fullResponse = ''

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
            if (delta) {
              fullResponse += delta
              setResponse((prev) => prev + delta)
            }
          } catch {}
        }
      }

      // Save to history (store as text only for follow-ups)
      setHistory((prev) => [
        ...prev,
        { role: 'user', content: prompt },
        { role: 'assistant', content: fullResponse },
      ])
    } catch (err) {
      setResponse('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  function reset() {
    setHistory([])
    setResponse('')
  }

  return { ask, response, loading, history, reset }
}