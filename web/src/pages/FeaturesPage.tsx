import { motion } from 'framer-motion'

/* ── Variants ─────────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show:   (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.07 },
  }),
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}

const vp = { once: true }

/* ── Component ────────────────────────────────────────────────────────────── */

export function FeaturesPage() {
  return (
    <main className="page">

      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <motion.div
            className="s-label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            What you get
          </motion.div>

          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            EVERY<br /><span className="hl-green">FEATURE.</span>
          </motion.h1>

          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            OverlayAI isn't a chatbot you open in a tab. It's an always-on layer
            that lives on top of your entire desktop — reading, understanding, and
            acting on whatever is in front of you.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHTS ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Core features
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          BUILT FOR<br /><span>FLOW STATE.</span>
        </motion.h2>
        <motion.div className="feat-highlights" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {highlights.map((h, i) => (
            <motion.div key={i} className="feat-highlight" custom={i} variants={fadeUpItem}>
              <div className="fh-icon">{h.icon}</div>
              <div className="fh-body">
                <div className="fh-tag">{h.tag}</div>
                <div className="fh-title">{h.title}</div>
                <div className="fh-desc">{h.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CODE DEBUG FEATURE ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Feature 01
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          CODE <span>DEBUG.</span>
        </motion.h2>
        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
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
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Code Debug</span></div>
              <div className="vc-row"><span className="vc-label">Trigger</span><span className="vc-val green">Error on screen</span></div>
              <div className="vc-row"><span className="vc-label">Input</span><span className="vc-val">Stack trace / squiggle</span></div>
              <div className="vc-row"><span className="vc-label">Output</span><span className="vc-val">Fix + explanation</span></div>
              <div className="vc-row"><span className="vc-label">Follow-up</span><span className="vc-val green">Supported</span></div>
              <div className="vc-row"><span className="vc-label">Copy fix</span><span className="vc-val green">One click</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
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
          </motion.div>
        </div>
      </section>

      {/* ── EMAIL DRAFT FEATURE ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Feature 02
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          EMAIL <span>DRAFTING.</span>
        </motion.h2>
        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
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
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Email Draft</span></div>
              <div className="vc-row"><span className="vc-label">Trigger</span><span className="vc-val green">Email thread open</span></div>
              <div className="vc-row"><span className="vc-label">Reads</span><span className="vc-val">Full thread context</span></div>
              <div className="vc-row"><span className="vc-label">Tone match</span><span className="vc-val green">Automatic</span></div>
              <div className="vc-row"><span className="vc-label">Editable</span><span className="vc-val green">Yes, inline</span></div>
              <div className="vc-row"><span className="vc-label">Copy</span><span className="vc-val green">One click</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">✉️ draft</span>
              </div>
              <div className="mo-response">
                <div className="mo-ctx-line">▸ Context: <span className="mo-green">Gmail · reply requested</span></div>
                <div className="mo-answer" style={{ fontStyle: 'italic', fontSize: '0.72rem' }}>
                  Hi Marcus,<br /><br />
                  Thanks for the update — happy to jump on a call Thursday at 3pm.
                  I'll send a calendar invite shortly.
                </div>
                <div className="mo-snippet">
                  <span className="mo-dim">tone   </span> <span className="mo-green">matched · professional</span>{'\n'}
                  <span className="mo-dim">length </span> 2 sentences{'\n'}
                  <span className="mo-dim">action </span> <span className="mo-green">copy to clipboard</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TERMINAL FIX FEATURE ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Feature 03
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          TERMINAL <span>FIXES.</span>
        </motion.h2>
        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              You ran a command. Something exploded. The error is 40 lines of red text and
              you have absolutely no idea which part of it actually matters.
            </p>
            <p className="detail-p">
              Press <kbd>⌘ ⇧ Space</kbd>. OverlayAI reads the full terminal output, cuts
              through the noise, identifies the root cause, and gives you the{' '}
              <strong>exact command to fix it</strong>. Not a vague suggestion — a copyable,
              ready-to-run command.
            </p>
            <p className="detail-p">
              Works across every package manager and CLI tool:{' '}
              <strong>npm, pip, Docker, Git, Homebrew, cargo, go mod</strong> — if it outputs
              to a terminal, OverlayAI can read and fix it.
            </p>
            <div className="feat-tags">
              {['npm / yarn', 'pip', 'Docker', 'Git', 'Homebrew', 'cargo', 'go mod'].map(t => (
                <span key={t} className="feat-tag">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Terminal Fix</span></div>
              <div className="vc-row"><span className="vc-label">Trigger</span><span className="vc-val green">Error in terminal</span></div>
              <div className="vc-row"><span className="vc-label">Reads</span><span className="vc-val">Full output + context</span></div>
              <div className="vc-row"><span className="vc-label">Output</span><span className="vc-val">Exact fix command</span></div>
              <div className="vc-row"><span className="vc-label">Copy</span><span className="vc-val green">One click</span></div>
              <div className="vc-row"><span className="vc-label">Follow-up</span><span className="vc-val green">Supported</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">⚡ terminal</span>
              </div>
              <div className="mo-response">
                <div className="mo-ctx-line">▸ Context: <span className="mo-green">npm · EACCES permission error</span></div>
                <div className="mo-answer">
                  npm is trying to write to a directory owned by root.
                  Fix the permissions with:
                </div>
                <div className="mo-snippet">
                  <span className="mo-green">sudo chown</span> -R $(whoami) ~/.npm{'\n'}
                  <span className="mo-green">npm install</span>
                </div>
                <div className="mo-cursor-line"><span className="mo-cursor-blink">▌</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AGENTIC ACTIONS FEATURE ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Feature 04
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          AGENTIC <span>ACTIONS.</span>
        </motion.h2>
        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
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
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Agentic Actions</span></div>
              <div className="vc-row"><span className="vc-label">Calendar event</span><span className="vc-val green">✓ Live</span></div>
              <div className="vc-row"><span className="vc-label">Reminders</span><span className="vc-val green">✓ Live</span></div>
              <div className="vc-row"><span className="vc-label">Open URL</span><span className="vc-val green">✓ Live</span></div>
              <div className="vc-row"><span className="vc-label">Notifications</span><span className="vc-val green">✓ Live</span></div>
              <div className="vc-row"><span className="vc-label">More actions</span><span className="vc-val">In progress</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
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
          </motion.div>
        </div>
      </section>

      {/* ── FULL FEATURE GRID ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Everything else
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          THE FULL<br /><span>LIST.</span>
        </motion.h2>
        <motion.div className="full-feat-grid" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {allFeatures.map((f, i) => (
            <motion.div key={i} className="full-feat-item" custom={i} variants={fadeUpItem}>
              <div className="ff-icon">{f.icon}</div>
              <div className="ff-body">
                <div className="ff-title">{f.title}</div>
                <div className="ff-desc">{f.desc}</div>
              </div>
              <div className={`ff-badge ${f.live ? 'ff-live' : 'ff-soon'}`}>
                {f.live ? 'Live' : 'Soon'}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="hiw-section">
        <motion.div className="feat-cta" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          <div className="s-label">Ready?</div>
          <h2 className="sh" style={{ marginBottom: '1rem' }}>TRY IT<br /><span>YOURSELF.</span></h2>
          <p className="detail-p" style={{ maxWidth: '420px', marginBottom: '2rem' }}>
            Free during beta. macOS 13+. No account required.
            Download, run the app, and press <kbd>⌘ ⇧ Space</kbd> from anywhere.
          </p>
          <a href="#" className="dl-btn">⬇ Download for Mac</a>
        </motion.div>
      </section>

    </main>
  )
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const highlights = [
  {
    icon: '⚡',
    tag: 'Speed',
    title: 'Under 2 seconds end-to-end',
    desc: "From keypress to streamed response. Groq's LPU inference makes it feel instant — faster than switching tabs.",
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
  { icon: '🐛', title: 'Code debugging',        desc: 'Fix any error in any language with one keypress.',           live: true  },
  { icon: '✉️', title: 'Email drafting',         desc: 'Replies that match your tone, from full thread context.',    live: true  },
  { icon: '⚡', title: 'Terminal fixes',         desc: 'Exact commands for npm, pip, Docker, Git errors.',           live: true  },
  { icon: '📅', title: 'Calendar scheduling',    desc: 'Create events from scheduling emails instantly.',            live: true  },
  { icon: '🔔', title: 'Reminders',              desc: 'Set reminders from any deadline you see on screen.',         live: true  },
  { icon: '📋', title: 'Text summarisation',     desc: 'Summarise docs, articles, Slack threads, meeting notes.',    live: true  },
  { icon: '🌐', title: 'Open URLs from screen',  desc: 'Detect and open any URL visible on your screen.',            live: true  },
  { icon: '💬', title: 'Follow-up questions',    desc: 'Keep the conversation going inside the overlay.',            live: true  },
  { icon: '📝', title: 'Doc rewriting',          desc: "Rewrite, shorten, or improve any text you're looking at.",  live: true  },
  { icon: '🖥',  title: 'Offline mode (Ollama)',  desc: 'Full local inference — zero network calls, 100% private.',   live: false },
  { icon: '🔌', title: 'Plugin API',             desc: 'Let third-party apps trigger OverlayAI actions.',            live: false },
  { icon: '⌨️', title: 'Custom hotkeys',         desc: 'Set per-app hotkeys for specific actions.',                  live: false },
]