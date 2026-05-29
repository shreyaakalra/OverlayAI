export function HowItWorksPage() {
  return (
    <main className="page">

      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="s-label">Deep Dive</div>
          <h1 className="page-title">
            HOW IT<br /><span className="hl-green">WORKS.</span>
          </h1>
          <p className="page-subtitle">
            OverlayAI is a two-model AI pipeline living inside an Electron shell.
            From keypress to streamed response in under 2 seconds — here's exactly what happens.
          </p>
        </div>
      </section>

      {/* ── PIPELINE OVERVIEW ── */}
      <section className="hiw-section">
        <div className="s-label">The pipeline</div>
        <h2 className="sh">ONE HOTKEY.<br /><span>FOUR STAGES.</span></h2>

        <div className="pipeline">
          {pipeline.map((stage, i) => (
            <div key={i} className="pipeline-stage reveal">
              <div className="pipeline-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="pipeline-icon">{stage.icon}</div>
              <div className="pipeline-body">
                <div className="pipeline-tag">{stage.tag}</div>
                <div className="pipeline-title">{stage.title}</div>
                <div className="pipeline-desc">{stage.desc}</div>
              </div>
              {i < pipeline.length - 1 && <div className="pipeline-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── STAGE DEEP DIVES ── */}
      <section className="hiw-section alt-bg">
        <div className="s-label">Stage 1</div>
        <h2 className="sh">THE <span>HOTKEY.</span></h2>
        <div className="detail-grid">
          <div className="detail-text reveal">
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
          </div>
          <div className="detail-visual reveal">
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
            <div className="mock-overlay">
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">⌘⇧Space</span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim">00:00:000</span><span className="mo-green"> ✓</span> globalShortcut registered</div>
                <div className="mo-log-line"><span className="mo-dim">00:00:001</span><span className="mo-green"> ✓</span> Overlay window hidden, waiting</div>
                <div className="mo-log-line"><span className="mo-dim">00:01:432</span><span className="mo-green"> ✓</span> Hotkey fired — waking overlay</div>
                <div className="mo-log-line"><span className="mo-dim">00:01:436</span><span className="mo-green"> ✓</span> Window shown, capture triggered</div>
                <div className="mo-log-line mo-blink"><span className="mo-dim">00:01:437</span><span className="mo-yellow"> ●</span> Awaiting screen data...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hiw-section">
        <div className="s-label">Stage 2</div>
        <h2 className="sh">SCREEN <span>CAPTURE.</span></h2>
        <div className="detail-grid">
          <div className="detail-text reveal">
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
          </div>
          <div className="detail-visual reveal">
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
            <div className="mock-overlay">
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">desktopCapturer</span>
                <span className="mo-key">in memory</span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim">capture</span><span className="mo-green"> ✓</span> getSources(['screen'])</div>
                <div className="mo-log-line"><span className="mo-dim">capture</span><span className="mo-green"> ✓</span> thumbnailSize 1920×1080</div>
                <div className="mo-log-line"><span className="mo-dim">encode </span><span className="mo-green"> ✓</span> toDataURL() → base64</div>
                <div className="mo-log-line"><span className="mo-dim">memory </span><span className="mo-green"> ✓</span> buffer size: 284kb</div>
                <div className="mo-log-line mo-blink"><span className="mo-dim">send   </span><span className="mo-yellow"> ●</span> posting to vision API...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hiw-section alt-bg">
        <div className="s-label">Stage 3</div>
        <h2 className="sh">VISION <span>MODEL.</span></h2>
        <div className="detail-grid">
          <div className="detail-text reveal">
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
          </div>
          <div className="detail-visual reveal">
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
            <div className="mock-overlay">
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">Vision Output</span>
                <span className="mo-key">structured</span>
              </div>
              <div className="mo-json">
                <span className="mo-brace">{'{'}</span>{'\n'}
                <span className="mo-key-j">  app</span>: <span className="mo-str">"VS Code"</span>,{'\n'}
                <span className="mo-key-j">  type</span>: <span className="mo-str">"code_error"</span>,{'\n'}
                <span className="mo-key-j">  lang</span>: <span className="mo-str">"TypeScript"</span>,{'\n'}
                <span className="mo-key-j">  error</span>: <span className="mo-str">"TS2345 line 42"</span>,{'\n'}
                <span className="mo-key-j">  intent</span>: <span className="mo-str">"fix_requested"</span>{'\n'}
                <span className="mo-brace">{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hiw-section">
        <div className="s-label">Stage 4</div>
        <h2 className="sh">STREAMED <span>RESPONSE.</span></h2>
        <div className="detail-grid">
          <div className="detail-text reveal">
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
          </div>
          <div className="detail-visual reveal">
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
            <div className="mock-overlay">
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">streaming</span>
              </div>
              <div className="mo-response">
                <div className="mo-ctx-line">▸ Context: <span className="mo-green">TypeScript error · line 42</span></div>
                <div className="mo-answer">
                  You're passing a <code className="mo-code">string</code> where{' '}
                  <code className="mo-code">Promise&lt;string&gt;</code> is expected.
                  Add <code className="mo-code">await</code> before the call.
                </div>
                <div className="mo-snippet">
                  <span className="mo-dim">// fix</span>{'\n'}
                  <span>const result = </span><span className="mo-green">await</span> fetchData();
                </div>
                <div className="mo-cursor-line"><span className="mo-cursor-blink">▌</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMING BREAKDOWN ── */}
      <section className="hiw-section alt-bg">
        <div className="s-label">Performance</div>
        <h2 className="sh">THE <span>2 SECONDS.</span></h2>
        <p className="section-intro reveal">Every millisecond accounted for — here's the full end-to-end timing breakdown.</p>
        <div className="timing-table reveal">
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
        </div>
      </section>

      {/* ── PRIVACY ── */}
      <section className="hiw-section">
        <div className="s-label">Privacy</div>
        <h2 className="sh">YOUR SCREEN.<br /><span>YOUR DATA.</span></h2>
        <div className="privacy-grid">
          {privacy.map((item, i) => (
            <div key={i} className="privacy-card reveal">
              <div className="privacy-icon">{item.icon}</div>
              <div className="privacy-title">{item.title}</div>
              <div className="privacy-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

/* ── DATA ── */

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
    desc: 'The only data that leaves your machine is the base64 screenshot sent to Groq\'s API over HTTPS.',
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