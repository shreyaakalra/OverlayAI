export type AppStatus = 'idle' | 'scanning' | 'thinking' | 'streaming' | 'done' | 'error'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}


export interface ResultAreaProps {
  status: AppStatus
  messages: Message[]
  streamingContent?: string
}