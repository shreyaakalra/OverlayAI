import { useCallback, useEffect, useRef, useState } from 'react'

export type Message = { role: 'user' | 'assistant'; content: string; image?: string }

export interface AskOptions {
  annotated?: boolean // user drew marks on the screenshot
  cropped?: boolean // user selected a region
}

const MAX_MESSAGES = 20 // only the most recent messages are sent to the model
const MAX_IMAGES = 2 // Groq limits images per request; keep only the newest ones

const BASE_PROMPT = `You are an assistant built into a screen overlay. You receive a screenshot of what the user is looking at and help with it.
Rules:
- If the user asks a specific question, answer it directly first.
- If they only ask for a scan, say in one sentence what is on screen, then give the single most useful insight.
- Code: find bugs, explain, suggest a fix. Email or chat: summarize and offer a reply. Documents: pull out the key points.
- If a newer screenshot arrives in the conversation, it replaces the older one as the current view.
- Be concise; the panel is small.
- Use markdown. Headers, bullets and code blocks render correctly.`

const ANNOTATION_PROMPT = `The user drew colored marks (circles, boxes, arrows, freehand strokes) on the screenshot to point at what they care about. Treat the marked areas as the main subject. Address what is inside or under the marks first and use the rest of the screen only as context. Do not describe the marks themselves.`

const CROP_PROMPT = `The image was cropped to a region the user selected, so it may show only part of the screen.`

function toApi(m: Message) {
  if (!m.image) return { role: m.role, content: m.content }
  return {
    role: m.role,
    content: [
      { type: 'image_url', image_url: { url: m.image } },
      { type: 'text', text: m.content },
    ],
  }
}

export function useGroq() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<Message[]>([])

  const historyRef = useRef<Message[]>([])
  const requestId = useRef('')
  const acc = useRef('')
  const systemExtra = useRef('')

  useEffect(() => {
    return window.overlayAPI.onToken(({ requestId: id, delta }) => {
      if (id !== requestId.current) return
      acc.current += delta
      setResponse((prev) => prev + delta)
    })
  }, [])

  const ask = useCallback(async (prompt: string, image?: string, opts: AskOptions = {}) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    requestId.current = id
    acc.current = ''
    setResponse('')
    setLoading(true)

    if (image) {
      systemExtra.current =
        (opts.annotated ? `\n\n${ANNOTATION_PROMPT}` : '') + (opts.cropped ? `\n\n${CROP_PROMPT}` : '')
    }

    const convo: Message[] = [...historyRef.current, { role: 'user', content: prompt, image }]
    historyRef.current = convo
    setHistory(convo)

    // Send only recent messages, and only the newest few images
    const recent = convo.slice(-MAX_MESSAGES)
    const keep = new Set<number>()
    for (let i = recent.length - 1; i >= 0 && keep.size < MAX_IMAGES; i--) {
      if (recent[i].image) keep.add(i)
    }
    const apiMessages = recent.map((m, i) => toApi(keep.has(i) ? m : { ...m, image: undefined }))

    const result = await window.overlayAPI.ask({
      requestId: id,
      messages: [{ role: 'system', content: BASE_PROMPT + systemExtra.current }, ...apiMessages],
      hasImage: keep.size > 0,
    })

    // A newer request or a reset took over; drop this one silently
    if (requestId.current !== id) return

    let text = acc.current
    if (!result.ok && result.error !== 'cancelled') {
      text += `${text ? '\n\n' : ''}**Request failed.** ${result.error ?? 'Unknown error'}`
    }
    if (text) {
      const next: Message[] = [...historyRef.current, { role: 'assistant', content: text }]
      historyRef.current = next
      setHistory(next)
    }
    setResponse('')
    setLoading(false)
  }, [])

  const reset = useCallback(() => {
    window.overlayAPI.cancel()
    requestId.current = ''
    acc.current = ''
    systemExtra.current = ''
    historyRef.current = []
    setHistory([])
    setResponse('')
    setLoading(false)
  }, [])

  return { ask, response, loading, history, reset }
}