interface TechItem {
  icon: string
  name: string
  role: string
  isText?: boolean
}

const techs: TechItem[] = [
  { icon: '⚛', name: 'Electron', role: 'Desktop' },
  { icon: '◈', name: 'React', role: 'UI layer' },
  { icon: '{TS}', name: 'TypeScript', role: 'Type-safe', isText: true },
  { icon: '▲', name: 'Groq', role: 'Inference' },
  { icon: '👁', name: 'Llama Vision', role: 'Screen read' },
  { icon: '⬡', name: 'Llama 3', role: 'Language' },
  { icon: '◎', name: 'Ollama', role: 'Offline soon' },
]

export function TechStack() {
  return (
    <section>
      <div className="tech-top">
        <div>
          <div className="s-label">Built with</div>
          <h2 className="sh" style={{ marginBottom: 0 }}>THE STACK.</h2>
        </div>
        <p className="tech-blurb">
          A two-model pipeline — vision reads your screen, language streams the
          response. Your screen never leaves your device.
        </p>
      </div>
      <div className="tech-row">
        {techs.map((tech) => (
          <div key={tech.name} className="tech-item reveal">
            <div
              className="tech-icon"
              style={
                tech.isText
                  ? { fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }
                  : undefined
              }
            >
              {tech.icon}
            </div>
            <div className="tech-name">{tech.name}</div>
            <div className="tech-role">{tech.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}