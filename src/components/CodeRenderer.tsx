import { CodeBlock } from './CodeBlock'

export function CodeRenderer({
  inline,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <CodeBlock language={match[1]}>{children}</CodeBlock>
  ) : (
    <code className="bg-black/30 border border-white/10 px-1.5 py-0.5 rounded text-white/90 font-mono text-xs" {...props}>
      {children}
    </code>
  )
}