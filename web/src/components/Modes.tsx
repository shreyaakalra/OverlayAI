interface Mode {
  emoji: string
  tag: string
  title: string
  desc: string
  ctxLabel: string
  previewText: string
}

const modes: Mode[] = [
  {
    emoji: '🐛',
    tag: 'Code Debug',
    title: 'Staring at a stack trace?',
    desc: 'OverlayAI detects the error, pinpoints the line, and gives you the exact fix — with a clear explanation.',
    ctxLabel: 'TypeScript error detected',
    previewText: 'Add await before fetchData() on line 42.',
  },
  {
    emoji: '✉️',
    tag: 'Email Draft',
    title: 'Blank reply? Not anymore.',
    desc: 'Reads the thread, writes a reply that matches your tone. Edit it or send it — your call.',
    ctxLabel: 'Email thread detected',
    previewText: 'Hi Sarah — I\'ll review and share feedback by EOD tomorrow.',
  },
  {
    emoji: '⚡',
    tag: 'Terminal',
    title: 'npm broken again?',
    desc: 'Sees the error in your terminal and gives you the exact command to fix it. No Googling, no Stack Overflow.',
    ctxLabel: 'Terminal error detected',
    previewText: 'npm install --legacy-peer-deps',
  },
  {
    emoji: '📅',
    tag: 'Calendar',
    title: '"Let\'s meet Thursday 3pm"',
    desc: 'See a scheduling email? Say "schedule it" and the Calendar event is created instantly. Done.',
    ctxLabel: 'Scheduling request detected',
    previewText: '✓ Event: "Sync w/ Sarah" · Thu · 3:00 PM',
  },
]

export function Modes() {
  return (
    <section>
      <div className="s-label">What it can do</div>
      <h2 className="sh">
        ONE HOTKEY.<br />
        <span>EVERY CONTEXT.</span>
      </h2>
      <div className="modes">
        {modes.map((mode) => (
          <div key={mode.tag} className="mode reveal">
            <div className="mode-top">
              <span className="mode-emoji">{mode.emoji}</span>
              <span className="mode-tag">{mode.tag}</span>
            </div>
            <div className="mode-title">{mode.title}</div>
            <div className="mode-desc">{mode.desc}</div>
            <div className="mode-preview">
              <div className="preview-top">
                <div className="p-dot" />
                <span className="p-ctx">{mode.ctxLabel}</span>
              </div>
              <div className="p-text">{mode.previewText}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}