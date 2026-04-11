import ReactMarkdown from 'react-markdown'
import { CodeRenderer } from './CodeRenderer'
import type { Message } from '../types'

interface Props extends Pick<Message, 'role' | 'content'> {
  isStreaming?: boolean
}

export function MessageBubble({ content, role, isStreaming = false }: Props) {
  const isUser = role === 'user'

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-[88%] px-[16px] py-[12px] text-[13px] leading-[1.6] ${
        isUser
          ? 'bg-white/[0.08] border border-white/[0.1] text-white/90 rounded-[16px] rounded-br-[4px] shadow-sm'
          : 'bg-white/[0.03] border border-white/[0.05] text-white/80 rounded-[16px] rounded-bl-[4px] shadow-sm backdrop-blur-md'
      }`}>
        {isUser ? (
          <p className="whitespace-pre-wrap font-medium">{content}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none ai-prose">
            <ReactMarkdown components={{ code: CodeRenderer }}>{content}</ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-[4px] h-[14px] bg-white/50 ml-1 animate-pulse rounded-sm align-middle" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}