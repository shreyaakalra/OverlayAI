interface Member {
  initials: string
  name: string
  role: string
  bio: string
}

const members: Member[] = [
  {
    initials: 'SK',
    name: 'Shreya Kalra',
    role: 'Full-Stack',
    bio: 'Built the Electron shell, vision pipeline, and agentic action layer end-to-end.',
  },
  {
    initials: 'YL',
    name: 'Yamini Lotla',
    role: 'AI Integration',
    bio: 'Owns Groq integration, Llama Vision prompt engineering, and latency optimization.',
  },
  {
    initials: 'SS',
    name: 'Siddhi Sharma',
    role: 'UI/UX Design',
    bio: 'Designed the frosted glass overlay UI, markdown rendering, and overall aesthetic.',
  },
  {
    initials: 'DK',
    name: 'Dishti Kaushik',
    role: 'Frontend Development',
    bio: 'Built offline Ollama mode, system tray integration, and the deployment pipeline.',
  },
]

export function Team() {
  return (
    <section>
      <div className="s-label">The team</div>
      <h2 className="sh">WHO BUILT IT.</h2>
      <div className="team-grid">
        {members.map((member) => (
          <div key={member.initials} className="member reveal">
            <div className="avatar">{member.initials}</div>
            <div>
              <div className="member-name">{member.name}</div>
              <div className="member-role">{member.role}</div>
            </div>
            <div className="member-bio">{member.bio}</div>
          </div>
        ))}
      </div>
    </section>
  )
}