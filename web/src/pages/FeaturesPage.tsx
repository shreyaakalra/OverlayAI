export function FeaturesPage() {
  return (
    <main className="page">

      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="s-label">What you get</div>
          <h1 className="page-title">
            EVERY<br /><span className="hl-green">FEATURE.</span>
          </h1>
          <p className="page-subtitle">
            OverlayAI isn't a chatbot you open in a tab. It's an always-on layer
            that lives on top of your entire desktop — reading, understanding, and
            acting on whatever is in front of you.
          </p>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHTS ── */}
      <section className="hiw-section">
        <div className="s-label">Core features</div>
        <h2 className="sh">BUILT FOR<br /><span>FLOW STATE.</span></h2>
        <div className="feat-highlights">
          {highlights.map((h, i) => (
            <div key={i} className="feat-highlight reveal">
              <div className="fh-icon">{h.icon}</div>
              <div className="fh-body">
                <div className="fh-tag">{h.tag}</div>
                <div className="fh-title">{h.title}</div>
                <div className="fh-desc">{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CODE DEBUG FEATURE ── */}
      <section className="hiw-section alt-bg">
        <div className="s-label">Feature 01</div>
        <h2 className="sh">CODE <span>DEBUG.</span></h2>
        <div className="detail-grid">
          <div className="detail-text reveal">
            <p className="detail-p">
              The most common use case. You're staring at a red squiggle or a wall
              of stack trace and your brain has gone completely blank. Press{' '}
              <kbd>⌘ ⇧ Space</kbd> and OverlayAI reads the error, identifies the
              file and line number, and tells you exactly what's wrong and how to fix it.
            </p>
            <p className="detail-p">
              It works across every language — <strong>TypeScript, Python, Rust, Go,
              JavaScript, Java, C++</strong>. It doesn't just quote the error back at
              you. It explains the root cause, shows the corrected snippet, and tells
              you why the original code was wrong.
            </p>
            <p className="detail-p">
              Follow-up questions are supported. Ask "why does this cause a memory leak"
              or "show me a test for this function" — the overlay keeps the context from
              the screen and continues the conversation inline.
            </p>
            <div className="feat-tags">
              {['TypeScript', 'Python', 'Rust', 'Go', 'Java', 'C++', 'All languages'].map(t => (
                <span key={t} className="feat-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="detail-visual reveal">
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Code Debug</span></div>
              <div className="vc-row"><span className="vc-label">Trigger</span><span className="vc-val green">Error on screen</span></div>
              <div className="vc-row"><span className="vc-label">Input</span><span className="vc-val">Stack trace / squiggle</span></div>
              <div className="vc-row"><span className="vc-label">Output</span><span className="vc-val">Fix + explanation</span></div>
              <div className="vc-row"><span className="vc-label">Follow-up</span><span className="vc-val green">Supported</span></div>
              <div className="vc-row"><span className="vc-label">Copy fix</span><span className="vc-val green">One click</span></div>
            </div>
            <div className="mock-overlay">
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">🐛 debug</span>
              </div>
              <div className="mo-response">
                <div className="mo-ctx-line">▸ Context: <span className="mo-green">Python · TypeError · line 18</span></div>
                <div className="mo-answer">
                  You're calling <code className="mo-code">.split()</code> on{' '}
                  <code className="mo-code">None</code>. The function returns{' '}
                  <code className="mo-code">None</code> when the file is empty —
                  add a null check before calling split.
                </div>
                <div className="mo-snippet">
                  <span className="mo-dim"># fix</span>{'\n'}
                  <span className="mo-green">if</span> result <span className="mo-green">is not</span> None:{'\n'}
                  {'    '}words = result.<span className="mo-green">split</span>()
                </div>
                <div className="mo-cursor-line"><span className="mo-cursor-blink">▌</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMAIL DRAFT FEATURE ── */}
      <section className="hiw-section">
        <div className="s-label">Feature 02</div>
        <h2 className="sh">EMAIL <span>DRAFTING.</span></h2>
        <div className="detail-grid">
          <div className="detail-text reveal">
            <p className="detail-p">
              You open an email that needs a reply. Maybe it's a client asking for
              a status update. Maybe it's a recruiter. Maybe it's a passive-aggressive
              Slack message forwarded to your inbox. You stare at it. You close the tab.
              You come back. You still have nothing.
            </p>
            <p className="detail-p">
              Press <kbd>⌘ ⇧ Space</kbd>. OverlayAI reads the entire thread, understands
              the tone, identifies what's being asked, and drafts a reply in{' '}
              <strong>your writing style</strong>. It doesn't write like a robot. It
              matches the formality level of the original email automatically.
            </p>
            <p className="detail-p">
              You can then ask it to make the reply shorter, more formal, more casual,
              or to add specific points. The draft stays in the overlay — copy it to
              your clipboard with one click when you're happy with it.
            </p>
            <div className="feat-tags">
              {['Gmail', 'Outlook', 'Apple Mail', 'Superhuman', 'Any email client'].map(t => (
                <span key={t} className="feat-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="detail-visual reveal">
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Email Draft</span></div>
              <div className="vc-row"><span className="vc-label">Trigger</span><span className="vc-val green">Email thread open</span></div>
              <div className="vc-row"><span className="vc-label">Reads</span><span className="vc-val">Full thread context</span></div>
              <div className="vc-row"><span className="vc-label">Tone match</span><span className="vc-val green">Automatic</span></div>
              <div className="vc-row"><span className="vc-label">Editable</span><span className="vc-val green">Yes, inline</span></div>
              <div className="vc-row"><span className="vc-label">Copy</span><span className="vc-val green">One click</span></div>
            </div>
            <div className="mock-overlay">
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">✉️ draft</span>
              </div>
              <div className="mo-response">
                <div className="mo-ctx-line">▸ Context: <span className="mo-green">Gmail · reply requested</span></div>
                <div className="mo-answer" style={{fontStyle: 'italic', fontSize: '0.72rem'}}>
                  Hi Marcus,<br /><br />
                  Thanks for the update — the timeline works on our end.
                  I'll loop in the design team by Thursday and we can
                  sync on Friday morning if that still works for you.<br /><br />
                  Best,
                </div>
                <div className="mo-cursor-line"><span className="mo-cursor-blink">▌</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERMINAL FEATURE ── */}
      <section className="hiw-section alt-bg">
        <div className="s-label">Feature 03</div>
        <h2 className="sh">TERMINAL <span>FIXES.</span></h2>
        <div className="detail-grid">
          <div className="detail-text reveal">
            <p className="detail-p">
              Terminal errors are the worst kind of error. The message is cryptic,
              the Stack Overflow answer is from 2014, and the accepted solution has
              three comments saying it doesn't work anymore. You've been here before.
            </p>
            <p className="detail-p">
              OverlayAI sees the exact error in your terminal — whether it's a broken
              <code> npm install</code>, a <strong>Python dependency conflict</strong>,
              a Docker build failure, a Git merge conflict, or a missing environment
              variable — and gives you the exact command to run to fix it. Not a
              three-paragraph explanation. The command.
            </p>
            <p className="detail-p">
              It understands the full context of your terminal — your OS, your shell,
              your Node/Python version if visible — and tailors the fix accordingly.
              No more copy-pasting from Stack Overflow into a 5-year-old answer.
            </p>
            <div className="feat-tags">
              {['npm / yarn', 'pip / poetry', 'Docker', 'Git', 'Bash', 'zsh', 'Make'].map(t => (
                <span key={t} className="feat-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="detail-visual reveal">
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Terminal Fix</span></div>
              <div className="vc-row"><span className="vc-label">Trigger</span><span className="vc-val green">Error in terminal</span></div>
              <div className="vc-row"><span className="vc-label">Reads</span><span className="vc-val">Full error output</span></div>
              <div className="vc-row"><span className="vc-label">Output</span><span className="vc-val">Exact command</span></div>
              <div className="vc-row"><span className="vc-label">Copy</span><span className="vc-val green">One click</span></div>
              <div className="vc-row"><span className="vc-label">Explains why</span><span className="vc-val green">On request</span></div>
            </div>
            <div className="mock-overlay">
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">⚡ terminal</span>
              </div>
              <div className="mo-response">
                <div className="mo-ctx-line">▸ Context: <span className="mo-green">npm ERR! peer dependency conflict</span></div>
                <div className="mo-answer">
                  React 18 conflicts with your current version of{' '}
                  <code className="mo-code">react-beautiful-dnd</code>.
                  Use the legacy peer deps flag to bypass:
                </div>
                <div className="mo-snippet">npm install --legacy-peer-deps</div>
                <div className="mo-cursor-line"><span className="mo-cursor-blink">▌</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALENDAR FEATURE ── */}
      <section className="hiw-section">
        <div className="s-label">Feature 04</div>
        <h2 className="sh">AGENTIC <span>ACTIONS.</span></h2>
        <div className="detail-grid">
          <div className="detail-text reveal">
            <p className="detail-p">
              This is where OverlayAI goes beyond reading and responding.
              It can <strong>act on your behalf</strong> — taking what it sees on
              screen and turning it into a real system action without you lifting
              another finger.
            </p>
            <p className="detail-p">
              See an email with a meeting time? Say <em>"schedule it"</em> and a
              Calendar event is created instantly with the correct title, time, and
              attendees pulled from the email. See a deadline in a doc? Say{' '}
              <em>"remind me the day before"</em> and a Reminders entry appears.
            </p>
            <p className="detail-p">
              Current agentic actions include: <strong>create Calendar events</strong>,
              create Reminders, open URLs from screen content, send system
              notifications, and launch applications. More actions are being added
              every week as the project grows.
            </p>
            <div className="feat-tags">
              {['Calendar', 'Reminders', 'Open URL', 'Notifications', 'Launch app', 'More soon'].map(t => (
                <span key={t} className="feat-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="detail-visual reveal">
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Agentic Actions</span></div>
              <div className="vc-row"><span className="vc-label">Calendar event</span><span className="vc-val green">✓ Live</span></div>
              <div className="vc-row"><span className="vc-label">Reminders</span><span className="vc-val green">✓ Live</span></div>
              <div className="vc-row"><span className="vc-label">Open URL</span><span className="vc-val green">✓ Live</span></div>
              <div className="vc-row"><span className="vc-label">Notifications</span><span className="vc-val green">✓ Live</span></div>
              <div className="vc-row"><span className="vc-label">More actions</span><span className="vc-val">In progress</span></div>
            </div>
            <div className="mock-overlay">
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">📅 action</span>
              </div>
              <div className="mo-response">
                <div className="mo-ctx-line">▸ Context: <span className="mo-green">scheduling email detected</span></div>
                <div className="mo-answer">
                  Found a meeting request from Sarah for Thursday at 3pm.
                  Say <code className="mo-code">"schedule it"</code> to create the event.
                </div>
                <div className="mo-snippet">
                  <span className="mo-green">✓</span> Event created{'\n'}
                  <span className="mo-dim">  Title  </span> Sync w/ Sarah{'\n'}
                  <span className="mo-dim">  When   </span> Thu · 3:00 PM{'\n'}
                  <span className="mo-dim">  Status </span> <span className="mo-green">Added to Calendar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL FEATURE GRID ── */}
      <section className="hiw-section alt-bg">
        <div className="s-label">Everything else</div>
        <h2 className="sh">THE FULL<br /><span>LIST.</span></h2>
        <div className="full-feat-grid">
          {allFeatures.map((f, i) => (
            <div key={i} className="full-feat-item reveal">
              <div className="ff-icon">{f.icon}</div>
              <div className="ff-body">
                <div className="ff-title">{f.title}</div>
                <div className="ff-desc">{f.desc}</div>
              </div>
              <div className={`ff-badge ${f.live ? 'ff-live' : 'ff-soon'}`}>
                {f.live ? 'Live' : 'Soon'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hiw-section">
        <div className="feat-cta reveal">
          <div className="s-label">Ready?</div>
          <h2 className="sh" style={{marginBottom: '1rem'}}>TRY IT<br /><span>YOURSELF.</span></h2>
          <p className="detail-p" style={{maxWidth: '420px', marginBottom: '2rem'}}>
            Free during beta. macOS 13+. No account required.
            Download, run the app, and press <kbd>⌘ ⇧ Space</kbd> from anywhere.
          </p>
          <a href="#" className="dl-btn">⬇ Download for Mac</a>
        </div>
      </section>

    </main>
  )
}

/* ── DATA ── */

const highlights = [
  {
    icon: '⚡',
    tag: 'Speed',
    title: 'Under 2 seconds end-to-end',
    desc: 'From keypress to streamed response. Groq\'s LPU inference makes it feel instant — faster than switching tabs.',
  },
  {
    icon: '👁',
    tag: 'Context',
    title: 'Reads whatever is on screen',
    desc: 'No copy-pasting. No explaining. OverlayAI sees what you see and responds accordingly — code, email, docs, terminals.',
  },
  {
    icon: '🤖',
    tag: 'Agentic',
    title: 'Acts, not just answers',
    desc: 'Creates Calendar events, sets Reminders, opens URLs, sends notifications. One sentence, real system action.',
  },
  {
    icon: '🔒',
    tag: 'Privacy',
    title: 'Screen never touches disk',
    desc: 'Screenshots live in memory for the duration of the API call. Nothing is stored, logged, or persisted anywhere.',
  },
]

const allFeatures = [
  { icon: '🐛', title: 'Code debugging',         desc: 'Fix any error in any language with one keypress.',           live: true  },
  { icon: '✉️', title: 'Email drafting',          desc: 'Replies that match your tone, from full thread context.',    live: true  },
  { icon: '⚡', title: 'Terminal fixes',          desc: 'Exact commands for npm, pip, Docker, Git errors.',           live: true  },
  { icon: '📅', title: 'Calendar scheduling',     desc: 'Create events from scheduling emails instantly.',            live: true  },
  { icon: '🔔', title: 'Reminders',               desc: 'Set reminders from any deadline you see on screen.',         live: true  },
  { icon: '📋', title: 'Text summarisation',      desc: 'Summarise docs, articles, Slack threads, meeting notes.',    live: true  },
  { icon: '🌐', title: 'Open URLs from screen',   desc: 'Detect and open any URL visible on your screen.',            live: true  },
  { icon: '💬', title: 'Follow-up questions',     desc: 'Keep the conversation going inside the overlay.',            live: true  },
  { icon: '📝', title: 'Doc rewriting',           desc: 'Rewrite, shorten, or improve any text you\'re looking at.',  live: true  },
  { icon: '🖥',  title: 'Offline mode (Ollama)',   desc: 'Full local inference — zero network calls, 100% private.',   live: false },
  { icon: '🔌', title: 'Plugin API',              desc: 'Let third-party apps trigger OverlayAI actions.',            live: false },
  { icon: '⌨️', title: 'Custom hotkeys',          desc: 'Set per-app hotkeys for specific actions.',                  live: false },
]