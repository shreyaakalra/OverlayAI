import { motion } from 'framer-motion'

/* ── Variants ─────────────────────────────────────────────────────────────── */

// Static — for headings, labels, paragraphs, grid wrappers
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// Dynamic — for grid items that need a per-index delay via `custom`
const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show:   (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.07 },
  }),
}

// Stagger container
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}

const vp = { once: true }

/* ── Component ────────────────────────────────────────────────────────────── */
export function TechStackPage() {
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
            Under the hood
          </motion.div>

          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            THE<br /><span className="hl-green">STACK.</span>
          </motion.h1>

          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            A two-model AI pipeline inside an Electron shell, built for near-zero latency.
            Every layer chosen deliberately — here's the full reasoning.
          </motion.p>
        </div>
      </section>

      {/* ── ARCHITECTURE OVERVIEW ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Architecture
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          TWO MODELS.<br /><span>ONE PIPELINE.</span>
        </motion.h2>
        <motion.p className="section-intro" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          OverlayAI is built around a tight two-model chain: a vision model that reads the screen,
          and a language model that composes the response. Both run on Groq's LPU infrastructure for
          near-zero inference latency.
        </motion.p>

        <motion.div className="pipeline" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {architecture.map((layer, i) => (
            <motion.div key={i} className="pipeline-stage" custom={i} variants={fadeUpItem}>
              <div className="pipeline-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="pipeline-icon">{layer.icon}</div>
              <div className="pipeline-body">
                <div className="pipeline-tag">{layer.tag}</div>
                <div className="pipeline-title">{layer.title}</div>
                <div className="pipeline-desc">{layer.desc}</div>
              </div>
              {i < architecture.length - 1 && <div className="pipeline-arrow">→</div>}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── ELECTRON + REACT ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Layer 1
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          ELECTRON +<br /><span>REACT.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              <strong>Electron</strong> gives OverlayAI two things that no web app can match: a{' '}
              <code>globalShortcut</code> API that intercepts keypresses at the OS level regardless
              of which app is in focus, and a <code>desktopCapturer</code> API that takes native
              screenshots without writing to disk.
            </p>
            <p className="detail-p">
              The UI layer is <strong>React + TypeScript + TailwindCSS</strong>, running inside
              Electron's renderer process. The floating overlay is a borderless, always-on-top,
              transparent Electron window that sits at z-index infinity, invisible until the hotkey
              fires.
            </p>
            <p className="detail-p">
              The main process and renderer communicate via <strong>IPC bridges</strong> defined in{' '}
              <code>preload.cjs</code>. This keeps the Node.js APIs (screen capture, shortcuts)
              cleanly separated from the React UI, which only receives data — it never touches the
              OS APIs directly.
            </p>
            <div className="detail-code">
              <div className="dc-label">preload.cjs — IPC bridge</div>
              <pre>{`contextBridge.exposeInMainWorld('api', {
  onTrigger:   (cb) => ipcRenderer.on('trigger-capture', cb),
  onToken:     (cb) => ipcRenderer.on('stream-token', cb),
  sendAction:  (action) => ipcRenderer.send('agent-action', action),
})`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Desktop Shell</span></div>
              <div className="vc-row"><span className="vc-label">Framework</span><span className="vc-val">Electron 29</span></div>
              <div className="vc-row"><span className="vc-label">UI</span><span className="vc-val">React 18 + TS</span></div>
              <div className="vc-row"><span className="vc-label">Styling</span><span className="vc-val">TailwindCSS</span></div>
              <div className="vc-row"><span className="vc-label">Build</span><span className="vc-val">Vite</span></div>
              <div className="vc-row"><span className="vc-label">IPC</span><span className="vc-val green">preload bridge</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">Process model</span>
                <span className="mo-key">electron</span>
              </div>
              <div className="mo-json">
                <span className="mo-brace">{'{'}</span>{'\n'}
                {'  '}<span className="mo-key-j">"main"</span>:{' '}
                <span className="mo-str">"Node.js + OS APIs"</span>,{'\n'}
                {'  '}<span className="mo-key-j">"renderer"</span>:{' '}
                <span className="mo-str">"React UI (sandboxed)"</span>,{'\n'}
                {'  '}<span className="mo-key-j">"bridge"</span>:{' '}
                <span className="mo-str">"preload.cjs IPC"</span>,{'\n'}
                {'  '}<span className="mo-key-j">"window"</span>:{' '}
                <span className="mo-str">"borderless, always-on-top"</span>{'\n'}
                <span className="mo-brace">{'}'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GROQ + LLAMA VISION ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Layer 2
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          GROQ LPU +<br /><span>LLAMA VISION.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              <strong>Groq</strong> is the reason OverlayAI feels fast. Groq builds custom
              LPU (Language Processing Unit) chips designed from the ground up for transformer
              inference. Where a GPU serializes KV-cache reads across thousands of cores, Groq's
              LPU streams the weights in a single pass — delivering inference speeds that are
              10–20× faster than comparable GPU setups.
            </p>
            <p className="detail-p">
              The first model in the pipeline is <strong>Llama 3.2 11B Vision</strong>. It
              receives the base64-encoded screenshot and a structured system prompt asking it
              to identify the active app, content type, and any actionable intent (error, email,
              scheduling request, etc.). Its output is a concise, structured description — not
              a conversational reply.
            </p>
            <p className="detail-p">
              This structured context becomes the system prompt for the second model. Keeping the
              two stages separate means each model is optimised for its specific job — the vision
              model doesn't need to compose prose, and the language model doesn't need to see pixels.
            </p>
            <div className="detail-code">
              <div className="dc-label">vision.js</div>
              <pre>{`const completion = await groq.chat.completions.create({
  model: 'llama-3.2-11b-vision-preview',
  messages: [{
    role: 'user',
    content: [
      { type: 'image_url',
        image_url: { url: \`data:image/png;base64,\${b64}\` }},
      { type: 'text', text: VISION_SYSTEM_PROMPT },
    ],
  }],
  max_tokens: 512,
})`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Vision Stage</span></div>
              <div className="vc-row"><span className="vc-label">Model</span><span className="vc-val">Llama 3.2 11B Vision</span></div>
              <div className="vc-row"><span className="vc-label">Provider</span><span className="vc-val green">Groq LPU</span></div>
              <div className="vc-row"><span className="vc-label">Input</span><span className="vc-val">base64 PNG screenshot</span></div>
              <div className="vc-row"><span className="vc-label">Output</span><span className="vc-val">Structured context</span></div>
              <div className="vc-row"><span className="vc-label">Latency</span><span className="vc-val green">~400ms on LPU</span></div>
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
                {'  '}<span className="mo-key-j">"line"</span>:{' '}
                <span className="mo-str">"42"</span>,{'\n'}
                {'  '}<span className="mo-key-j">"intent"</span>:{' '}
                <span className="mo-str">"debug"</span>,{'\n'}
                {'  '}<span className="mo-key-j">"extract"</span>:{' '}
                <span className="mo-str">"Property does not exist..."</span>{'\n'}
                <span className="mo-brace">{'}'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LLAMA 3.3 STREAMING ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Layer 3
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          LLAMA 3.3 +<br /><span>STREAMING.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              <strong>Llama 3.3 70B Versatile</strong> is the response composer. It receives the
              vision model's structured context as a system prompt and the user's natural language
              instruction as the user message. It knows the app, the content type, the error — it
              just needs to write the best response.
            </p>
            <p className="detail-p">
              The response is <strong>streamed token by token</strong> via server-sent events.
              Every token that comes back from the API is immediately forwarded via IPC to the
              React renderer, which appends it to the displayed text in real time. The first
              token appears in under 100ms — you see the answer being written before it's complete.
            </p>
            <p className="detail-p">
              The renderer uses a custom <strong>markdown parser</strong> that handles code blocks
              with syntax highlighting via <code>CodeBlock.tsx</code>. Every code block gets a
              one-click copy button. The markdown rendering is incremental — it re-parses as each
              token arrives without causing layout thrash.
            </p>
            <div className="detail-code">
              <div className="dc-label">groq.js — streaming loop</div>
              <pre>{`const stream = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [
    { role: 'system', content: visionContext },
    { role: 'user',   content: userPrompt   },
  ],
  stream: true,
})
for await (const chunk of stream) {
  const tok = chunk.choices[0]?.delta?.content ?? ''
  mainWindow.webContents.send('stream-token', tok)
}`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Language Model</span></div>
              <div className="vc-row"><span className="vc-label">Model</span><span className="vc-val">Llama 3.3 70B</span></div>
              <div className="vc-row"><span className="vc-label">Variant</span><span className="vc-val">Versatile</span></div>
              <div className="vc-row"><span className="vc-label">Streaming</span><span className="vc-val green">SSE token-by-token</span></div>
              <div className="vc-row"><span className="vc-label">First token</span><span className="vc-val green">~300ms</span></div>
              <div className="vc-row"><span className="vc-label">Render</span><span className="vc-val">Incremental markdown</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">Token stream</span>
                <span className="mo-key">live</span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim">t=0ms  </span> stream opened</div>
                <div className="mo-log-line"><span className="mo-dim">t=312ms</span> <span className="mo-green">first token →</span> "You"</div>
                <div className="mo-log-line"><span className="mo-dim">t=318ms</span> <span className="mo-green">token →</span> "'re"</div>
                <div className="mo-log-line"><span className="mo-dim">t=324ms</span> <span className="mo-green">token →</span> " passing"</div>
                <div className="mo-log-line"><span className="mo-dim">t=...</span>{'  '}<span className="mo-blink">▌</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OLLAMA OFFLINE ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Coming soon
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          OFFLINE MODE:<br /><span>OLLAMA.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              The current architecture sends screen content to Groq's API over HTTPS. For most
              users that's fine — Groq doesn't train on API data and nothing is stored. But for
              users who need <strong>100% local, zero-network operation</strong>, we're building
              Ollama integration.
            </p>
            <p className="detail-p">
              <strong>Ollama</strong> is a local model runner that exposes an OpenAI-compatible
              API on <code>localhost:11434</code>. The architecture change is minimal — swap the
              Groq client for a local fetch call. The models run on your GPU (Apple Silicon MPS
              or CUDA) with no data leaving your machine.
            </p>
            <p className="detail-p">
              The planned local stack is <strong>LLaVA 1.6</strong> for vision (runs well on
              Apple Silicon) and <strong>Llama 3.1 8B</strong> for the response model. Latency
              will be higher than Groq (~3–5s vs ~1.7s) but completely private and fully offline.
            </p>
            <div className="detail-code">
              <div className="dc-label">ollama.js (in progress)</div>
              <pre>{`// Same interface, local endpoint
const response = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llava:13b',
    messages: [{ role: 'user', content: [
      { type: 'image', data: base64 },
      { type: 'text',  text: prompt  },
    ]}],
    stream: true,
  }),
})`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header">
                <div className="vc-dot" style={{ background: '#ffcc00', boxShadow: '0 0 6px #ffcc00' }} />
                <span>Ollama Mode</span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '0.6rem',
                  color: '#ffcc00',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                }}>
                  IN PROGRESS
                </span>
              </div>
              <div className="vc-row"><span className="vc-label">Vision</span><span className="vc-val">LLaVA 1.6</span></div>
              <div className="vc-row"><span className="vc-label">Language</span><span className="vc-val">Llama 3.1 8B</span></div>
              <div className="vc-row"><span className="vc-label">Network calls</span><span className="vc-val green">Zero</span></div>
              <div className="vc-row"><span className="vc-label">Hardware</span><span className="vc-val">Apple Silicon / CUDA</span></div>
              <div className="vc-row"><span className="vc-label">Latency</span><span className="vc-val">~3–5s (local GPU)</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" style={{ background: '#ffcc00', boxShadow: '0 0 6px #ffcc00' }} />
                <span className="mo-title">Ollama status</span>
                <span className="mo-key" style={{ color: '#ffcc00', borderColor: 'rgba(255,204,0,0.3)', background: 'rgba(255,204,0,0.08)' }}>
                  soon
                </span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim">endpoint </span> localhost:11434</div>
                <div className="mo-log-line"><span className="mo-dim">vision   </span> <span className="mo-yellow">llava:13b</span></div>
                <div className="mo-log-line"><span className="mo-dim">language </span> <span className="mo-yellow">llama3.1:8b</span></div>
                <div className="mo-log-line"><span className="mo-dim">status   </span> <span className="mo-yellow">in development</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FULL DEPENDENCY LIST ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Full list
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          EVERY<br /><span>DEPENDENCY.</span>
        </motion.h2>

        <motion.div className="full-feat-grid" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {allTech.map((t, i) => (
            <motion.div key={i} className="full-feat-item" custom={i} variants={fadeUpItem}>
              <div className="ff-icon">{t.icon}</div>
              <div className="ff-body">
                <div className="ff-title">{t.name}</div>
                <div className="ff-desc">{t.desc}</div>
              </div>
              <div className={`ff-badge ${t.live ? 'ff-live' : 'ff-soon'}`}>
                {t.live ? 'Live' : 'Soon'}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── WHY THIS STACK ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Design decisions
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          WHY THIS<br /><span>STACK.</span>
        </motion.h2>

        <motion.div className="privacy-grid" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {decisions.map((d, i) => (
            <motion.div key={i} className="privacy-card" custom={i} variants={fadeUpItem}>
              <div className="privacy-icon">{d.icon}</div>
              <div className="privacy-title">{d.title}</div>
              <div className="privacy-desc">{d.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </main>
  )
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const architecture = [
  {
    icon: '⌨️',
    tag: 'Shell',
    title: 'Electron',
    desc: 'OS-level hotkey + native screen capture. The glue that makes it a desktop app.',
  },
  {
    icon: '⚛',
    tag: 'UI',
    title: 'React + TypeScript',
    desc: 'The floating overlay panel. Incremental markdown rendering, streaming token updates.',
  },
  {
    icon: '👁',
    tag: 'Vision',
    title: 'Llama 3.2 Vision',
    desc: 'Reads the screenshot, extracts structured context about the screen content.',
  },
  {
    icon: '⚡',
    tag: 'Language',
    title: 'Llama 3.3 70B',
    desc: 'Composes the response — fix, draft, summary, or action — streamed token by token.',
  },
]

const allTech = [
  { icon: '⚛',    name: 'Electron 29',           desc: 'Desktop shell. globalShortcut + desktopCapturer + BrowserWindow.',             live: true  },
  { icon: '◈',    name: 'React 18',               desc: 'Renderer process UI. Hooks, streaming state, incremental markdown.',            live: true  },
  { icon: '{TS}', name: 'TypeScript 5',            desc: 'Type-safe throughout. window.api typed in global.d.ts.',                        live: true  },
  { icon: '▲',    name: 'Vite',                   desc: 'Build tool for the renderer. Fast HMR in dev mode.',                            live: true  },
  { icon: '💨',   name: 'TailwindCSS',             desc: 'Utility-first styling for the overlay UI and all components.',                  live: true  },
  { icon: '🟩',   name: 'Groq SDK',                desc: 'Official JS client for the Groq API. Handles auth, streaming, retries.',        live: true  },
  { icon: '👁',   name: 'Llama 3.2 11B Vision',   desc: 'Vision model. Reads the screen and returns structured context JSON.',           live: true  },
  { icon: '⚡',   name: 'Llama 3.3 70B',           desc: 'Language model. Composes the final response from vision context + prompt.',     live: true  },
  { icon: '📝',   name: 'react-markdown',          desc: 'Incremental markdown rendering inside the overlay. Handles streaming cleanly.', live: true  },
  { icon: '🎨',   name: 'react-syntax-highlight',  desc: 'Syntax highlighting inside code blocks. One-click copy per snippet.',           live: true  },
  { icon: '⬡',   name: 'Ollama',                  desc: 'Local model runner. Will replace Groq for fully offline / private operation.',  live: false },
  { icon: '🦙',   name: 'LLaVA 1.6',              desc: 'Local vision model for the Ollama offline mode.',                               live: false },
]

const decisions = [
  {
    icon: '⚡',
    title: 'Groq over OpenAI',
    desc: "Groq's LPU inference is 10–20× faster than OpenAI API for Llama models. At 400ms for vision + 300ms TTFT, the full round-trip stays under 2 seconds. OpenAI would be 4–6s.",
  },
  {
    icon: '🖥',
    title: 'Electron over Tauri',
    desc: "desktopCapturer and globalShortcut are first-class Electron APIs with years of battle-testing. Tauri's equivalents are newer and less reliable for screen-capture workloads.",
  },
  {
    icon: '🔀',
    title: 'Two models over one',
    desc: "Separating vision and language lets each model be optimised for its role. The vision model outputs structured JSON — a much easier task than composing a full reply from pixels.",
  },
  {
    icon: '📡',
    title: 'Streaming over blocking',
    desc: 'Users perceive streaming responses as faster even when total time is identical. The first visible token at 300ms makes the 1.7s full response feel instant.',
  },
]