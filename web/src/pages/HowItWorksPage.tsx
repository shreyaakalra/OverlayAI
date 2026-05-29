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

export function HowItWorksPage() {
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
            Deep Dive
          </motion.div>

          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            HOW IT<br /><span className="hl-green">WORKS.</span>
          </motion.h1>

          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            OverlayAI is a two-model AI pipeline living inside an Electron shell.
            From keypress to streamed response in under 2 seconds — here's exactly what happens.
          </motion.p>
        </div>
      </section>

      {/* ── PIPELINE OVERVIEW ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          The pipeline
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          ONE HOTKEY.<br /><span>FOUR STAGES.</span>
        </motion.h2>

        <motion.div className="pipeline" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {pipeline.map((stage, i) => (
            <motion.div key={i} className="pipeline-stage" custom={i} variants={fadeUpItem}>
              <div className="pipeline-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="pipeline-icon">{stage.icon}</div>
              <div className="pipeline-body">
                <div className="pipeline-tag">{stage.tag}</div>
                <div className="pipeline-title">{stage.title}</div>
                <div className="pipeline-desc">{stage.desc}</div>
              </div>
              {i < pipeline.length - 1 && <div className="pipeline-arrow">→</div>}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── STAGE 1: HOTKEY ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Stage 1
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          THE <span>HOTKEY.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              OverlayAI registers a <strong>global system hotkey</strong> — <kbd>⌘ ⇧ Space</kbd> — using
              Electron's <code>globalShortcut</code> API. This means it intercepts the keypress
              at the OS level, before any app can consume it.
            </p>
            <p className="detail-p">
              The moment you press it, a borderless, always-on-top transparent window appears
              over your entire screen. It's not a new window — it's been sitting at z-index
              infinity the whole time, invisible, waiting.
            </p>
            <p className="detail-p">
              This is why it works from anywhere — VS Code, Gmail, Figma, Terminal, a browser tab,
              a PDF viewer. The OS intercepts the key, Electron wakes the overlay. No app needs
              to be in focus.
            </p>
            <div className="detail-code">
              <div className="dc-label">main.js</div>
              <pre>{`globalShortcut.register('CommandOrControl+Shift+Space', () => {
  overlayWindow.show()
  overlayWindow.webContents.send('trigger-capture')
})`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header">
                <div className="vc-dot" /><span>System Event</span>
              </div>
              <div className="vc-row"><span className="vc-label">Trigger</span><span className="vc-val green">⌘ ⇧ Space</span></div>
              <div className="vc-row"><span className="vc-label">API</span><span className="vc-val">globalShortcut</span></div>
              <div className="vc-row"><span className="vc-label">Scope</span><span className="vc-val">OS-level</span></div>
              <div className="vc-row"><span className="vc-label">Latency</span><span className="vc-val green">&lt; 5ms</span></div>
              <div className="vc-row"><span className="vc-label">Works in</span><span className="vc-val">Any app</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">⌘ ⇧ Space</span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim">t=0ms   </span> keydown intercepted at OS level</div>
                <div className="mo-log-line"><span className="mo-dim">t=2ms   </span> <span className="mo-green">overlayWindow.show()</span></div>
                <div className="mo-log-line"><span className="mo-dim">t=3ms   </span> trigger-capture sent via IPC</div>
                <div className="mo-log-line"><span className="mo-dim">t=4ms   </span> <span className="mo-green">✓ overlay visible</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STAGE 2: SCREEN CAPTURE ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Stage 2
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          SCREEN <span>CAPTURE.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              Electron's <code>desktopCapturer</code> API grabs a screenshot of your entire
              screen the instant the hotkey fires. This is a native OS screenshot — it captures
              exactly what you see, including any app, any window.
            </p>
            <p className="detail-p">
              The screenshot is taken as a raw image buffer, then immediately
              base64-encoded and sent to the vision model. <strong>It never touches disk.</strong> It
              exists only in memory for the duration of the request.
            </p>
            <p className="detail-p">
              This stage takes roughly <strong>80–120ms</strong> depending on your display
              resolution. Retina/4K displays take slightly longer but the image is downsampled
              before sending to keep the payload small.
            </p>
            <div className="detail-code">
              <div className="dc-label">vision.js</div>
              <pre>{`const sources = await desktopCapturer.getSources({
  types: ['screen'],
  thumbnailSize: { width: 1920, height: 1080 }
})
const base64 = sources[0].thumbnail.toDataURL()`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header">
                <div className="vc-dot" /><span>Screen Capture</span>
              </div>
              <div className="vc-row"><span className="vc-label">API</span><span className="vc-val">desktopCapturer</span></div>
              <div className="vc-row"><span className="vc-label">Format</span><span className="vc-val">base64 PNG</span></div>
              <div className="vc-row"><span className="vc-label">Storage</span><span className="vc-val green">Memory only</span></div>
              <div className="vc-row"><span className="vc-label">Disk write</span><span className="vc-val green">Never</span></div>
              <div className="vc-row"><span className="vc-label">Latency</span><span className="vc-val green">~100ms</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">Capture</span>
                <span className="mo-key">in memory</span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim">t=5ms   </span> desktopCapturer.getSources()</div>
                <div className="mo-log-line"><span className="mo-dim">t=88ms  </span> <span className="mo-green">raw buffer received</span></div>
                <div className="mo-log-line"><span className="mo-dim">t=102ms </span> base64 encoded · 1.4MB</div>
                <div className="mo-log-line"><span className="mo-dim">t=103ms </span> <span className="mo-green">✓ ready to send</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STAGE 3: VISION MODEL ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Stage 3
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          VISION <span>MODEL.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              The base64 screenshot is sent to <strong>Llama 3.2 Vision</strong> running on
              Groq's inference infrastructure. Groq uses custom LPU (Language Processing Unit)
              chips that deliver dramatically lower latency than GPU-based inference.
            </p>
            <p className="detail-p">
              The vision model's job is simple but critical: <strong>read the screen and describe
              what it sees</strong> in a structured way. It identifies the active application,
              the type of content (code, email, terminal, document), and extracts the most
              relevant text.
            </p>
            <p className="detail-p">
              It also detects the <strong>intent context</strong> — is there an error? A question?
              A scheduling request? This structured output becomes the prompt for the language model
              in the next stage.
            </p>
            <div className="detail-code">
              <div className="dc-label">vision.js</div>
              <pre>{`const response = await groq.chat.completions.create({
  model: 'llama-3.2-11b-vision-preview',
  messages: [{
    role: 'user',
    content: [
      { type: 'image_url', image_url: { url: base64 } },
      { type: 'text', text: VISION_SYSTEM_PROMPT }
    ]
  }]
})`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header">
                <div className="vc-dot" /><span>Vision Model</span>
              </div>
              <div className="vc-row"><span className="vc-label">Model</span><span className="vc-val">Llama 3.2 Vision</span></div>
              <div className="vc-row"><span className="vc-label">Provider</span><span className="vc-val">Groq LPU</span></div>
              <div className="vc-row"><span className="vc-label">Input</span><span className="vc-val">base64 image</span></div>
              <div className="vc-row"><span className="vc-label">Output</span><span className="vc-val">structured context</span></div>
              <div className="vc-row"><span className="vc-label">Latency</span><span className="vc-val green">~400ms</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">Vision output</span>
                <span className="mo-key">structured</span>
              </div>
              <div className="mo-json">
                <span className="mo-brace">{'{'}</span>{'\n'}
                {'  '}<span className="mo-key-j">"app"</span>:{' '}
                <span className="mo-str">"VS Code"</span>,{'\n'}
                {'  '}<span className="mo-key-j">"context"</span>:{' '}
                <span className="mo-str">"TypeScript error"</span>,{'\n'}
                {'  '}<span className="mo-key-j">"intent"</span>:{' '}
                <span className="mo-str">"debug"</span>,{'\n'}
                {'  '}<span className="mo-key-j">"extract"</span>:{' '}
                <span className="mo-str">"Cannot read property..."</span>{'\n'}
                <span className="mo-brace">{'}'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STAGE 4: STREAMED RESPONSE ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Stage 4
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          STREAMED <span>RESPONSE.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              The vision model's structured context is fed as a system prompt into
              <strong> Llama 3.3 70B Versatile</strong>, also on Groq. This is the model
              that actually composes the response you see — the fix, the draft, the summary,
              the command.
            </p>
            <p className="detail-p">
              Crucially, the response is <strong>streamed token by token</strong> via
              server-sent events. The first token appears in the overlay in under 100ms of
              the language model starting — you see the answer being written in real time,
              which makes the whole experience feel instant even before it's complete.
            </p>
            <p className="detail-p">
              The overlay renders markdown — code blocks get syntax highlighting via a custom
              <code> CodeBlock</code> component, and there's a one-click copy button on every
              code snippet.
            </p>
            <div className="detail-code">
              <div className="dc-label">groq.js</div>
              <pre>{`const stream = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [{ role: 'user', content: contextPrompt }],
  stream: true
})
for await (const chunk of stream) {
  const token = chunk.choices[0]?.delta?.content
  mainWindow.webContents.send('stream-token', token)
}`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header">
                <div className="vc-dot" /><span>Language Model</span>
              </div>
              <div className="vc-row"><span className="vc-label">Model</span><span className="vc-val">Llama 3.3 70B</span></div>
              <div className="vc-row"><span className="vc-label">Provider</span><span className="vc-val">Groq LPU</span></div>
              <div className="vc-row"><span className="vc-label">Mode</span><span className="vc-val green">Streaming SSE</span></div>
              <div className="vc-row"><span className="vc-label">Render</span><span className="vc-val">Markdown + code</span></div>
              <div className="vc-row"><span className="vc-label">Total E2E</span><span className="vc-val green">&lt; 2 seconds</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">Token stream</span>
                <span className="mo-key">live</span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim">t=503ms </span> LLM request sent</div>
                <div className="mo-log-line"><span className="mo-dim">t=812ms </span> <span className="mo-green">first token → "You"</span></div>
                <div className="mo-log-line"><span className="mo-dim">t=819ms </span> <span className="mo-green">token → "'re calling"</span></div>
                <div className="mo-log-line"><span className="mo-dim">t=...</span>{'  '}<span className="mo-blink">▌</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TIMING BREAKDOWN ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Performance
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          THE <span>2 SECONDS.</span>
        </motion.h2>
        <motion.p className="section-intro" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Every millisecond accounted for — here's the full end-to-end timing breakdown.
        </motion.p>
        <motion.div className="timing-table" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          {timing.map((row, i) => (
            <div key={i} className="timing-row">
              <div className="timing-stage">{row.stage}</div>
              <div className="timing-bar-wrap">
                <div className="timing-bar" style={{ width: row.pct }} />
              </div>
              <div className="timing-ms">{row.ms}</div>
            </div>
          ))}
          <div className="timing-total">
            <span>Total end-to-end</span>
            <span className="green">~1,700ms</span>
          </div>
        </motion.div>
      </section>

      {/* ── PRIVACY ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Privacy
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          YOUR SCREEN.<br /><span>YOUR DATA.</span>
        </motion.h2>
        <motion.div className="privacy-grid" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {privacy.map((item, i) => (
            <motion.div key={i} className="privacy-card" custom={i} variants={fadeUpItem}>
              <div className="privacy-icon">{item.icon}</div>
              <div className="privacy-title">{item.title}</div>
              <div className="privacy-desc">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </main>
  )
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const pipeline = [
  {
    icon: '⌨️',
    tag: 'Input',
    title: 'Global Hotkey',
    desc: 'OS-level keypress intercepted by Electron globalShortcut',
  },
  {
    icon: '📸',
    tag: 'Capture',
    title: 'Screen Grab',
    desc: 'desktopCapturer takes a native screenshot in memory',
  },
  {
    icon: '👁',
    tag: 'Vision',
    title: 'Llama Vision',
    desc: 'Vision model reads the screen and extracts structured context',
  },
  {
    icon: '⚡',
    tag: 'Response',
    title: 'Streamed Answer',
    desc: 'Language model streams the fix, draft, or action token by token',
  },
]

const timing = [
  { stage: 'Global hotkey → overlay show', ms: '~5ms',   pct: '2%'  },
  { stage: 'Screen capture',               ms: '~100ms', pct: '8%'  },
  { stage: 'Base64 encode + API send',     ms: '~50ms',  pct: '4%'  },
  { stage: 'Vision model (Groq LPU)',      ms: '~400ms', pct: '28%' },
  { stage: 'Context → language model',     ms: '~20ms',  pct: '2%'  },
  { stage: 'First token from LLM',         ms: '~300ms', pct: '22%' },
  { stage: 'Full response stream',         ms: '~800ms', pct: '34%' },
]

const privacy = [
  {
    icon: '🔒',
    title: 'No disk writes',
    desc: 'Screenshots are captured into memory as a buffer and never written to your filesystem at any point.',
  },
  {
    icon: '🌐',
    title: 'API calls only',
    desc: "The only data that leaves your machine is the base64 screenshot sent to Groq's API over HTTPS.",
  },
  {
    icon: '🗑️',
    title: 'No logging',
    desc: 'OverlayAI does not store, log, or transmit your screen content anywhere other than the inference API.',
  },
  {
    icon: '📴',
    title: 'Offline mode coming',
    desc: 'Ollama integration is in progress — once shipped, everything runs 100% locally with zero network calls.',
  },
]