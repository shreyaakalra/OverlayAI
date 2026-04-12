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
export function InstallationPage() {
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
            Get started
          </motion.div>

          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            INSTALL IN<br /><span className="hl-green">60 SECONDS.</span>
          </motion.h1>

          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            No account. No sign-up. Download, unzip, run. OverlayAI is a free beta —
            press <kbd>⌘ ⇧ Space</kbd> from anywhere and it's live.
          </motion.p>
        </div>
      </section>

      {/* ── REQUIREMENTS ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Before you start
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          REQUIREMENTS.
        </motion.h2>

        <motion.div className="pipeline" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {requirements.map((req, i) => (
            <motion.div key={i} className="pipeline-stage" custom={i} variants={fadeUpItem}>
              <div className="pipeline-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="pipeline-icon">{req.icon}</div>
              <div className="pipeline-body">
                <div className="pipeline-tag">{req.tag}</div>
                <div className="pipeline-title">{req.title}</div>
                <div className="pipeline-desc">{req.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── STEP 1: DOWNLOAD ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Step 1
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          DOWNLOAD &amp;<br /><span>UNZIP.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              Click the download button below to grab the latest release. OverlayAI ships as a
              standard <strong>macOS .zip</strong> — unzip it and drag{' '}
              <code>OverlayAI.app</code> to your Applications folder. That's it.
            </p>
            <p className="detail-p">
              The app is <strong>not yet notarized</strong> (we're in beta), so macOS will show a
              security warning on first open. Right-click the app icon and choose{' '}
              <strong>Open</strong> — you only need to do this once. After that it opens normally.
            </p>
            <p className="detail-p">
              On Windows, extract the <code>.zip</code> and run <code>OverlayAI.exe</code> directly.
              No installer needed.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' as const, marginTop: '2rem' }}>
              <a href="#" className="dl-btn">⬇ Download for Mac</a>
              <a href="#" className="dl-btn" style={{ background: 'var(--green-2)', color: 'var(--green)', border: '1px solid var(--border-hi)', boxShadow: 'none' }}>
                ⬇ Download for Windows
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Latest Release</span></div>
              <div className="vc-row"><span className="vc-label">Version</span><span className="vc-val green">v0.9.1-beta</span></div>
              <div className="vc-row"><span className="vc-label">macOS</span><span className="vc-val">13+ (Ventura)</span></div>
              <div className="vc-row"><span className="vc-label">Windows</span><span className="vc-val">10 / 11</span></div>
              <div className="vc-row"><span className="vc-label">Size</span><span className="vc-val">~120 MB</span></div>
              <div className="vc-row"><span className="vc-label">License</span><span className="vc-val green">Free Beta</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">Terminal</span>
                <span className="mo-key">bash</span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim">$</span> unzip OverlayAI-v0.9.1.zip</div>
                <div className="mo-log-line"><span className="mo-green">✓</span> Archive extracted</div>
                <div className="mo-log-line"><span className="mo-dim">$</span> mv OverlayAI.app /Applications/</div>
                <div className="mo-log-line"><span className="mo-green">✓</span> App ready in Applications</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STEP 2: API KEY ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Step 2
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          ADD YOUR<br /><span>GROQ KEY.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              OverlayAI uses <strong>Groq's free API</strong> to power both the vision model and
              language model. You need a Groq API key — it takes about 30 seconds to get one and
              the free tier is more than enough for daily use.
            </p>
            <p className="detail-p">
              Head to <code>console.groq.com</code>, sign up (or log in), and generate a new
              API key from the dashboard. Copy it — you'll only see it once.
            </p>
            <p className="detail-p">
              Create a file called <code>.env</code> in the same folder as the app's source, paste
              the key in, and save. OverlayAI picks it up automatically on next launch. The{' '}
              <code>.env</code> file is listed in <code>.gitignore</code> so it never gets committed.
            </p>
            <div className="detail-code">
              <div className="dc-label">.env</div>
              <pre>{`GROQ_API_KEY=gsk_your_key_here`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>Groq Free Tier</span></div>
              <div className="vc-row"><span className="vc-label">Cost</span><span className="vc-val green">Free</span></div>
              <div className="vc-row"><span className="vc-label">Rate limit</span><span className="vc-val">30 req / min</span></div>
              <div className="vc-row"><span className="vc-label">Models included</span><span className="vc-val">Llama Vision + 3.3</span></div>
              <div className="vc-row"><span className="vc-label">Sign-up</span><span className="vc-val">console.groq.com</span></div>
              <div className="vc-row"><span className="vc-label">Key format</span><span className="vc-val">gsk_...</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">.env setup</span>
                <span className="mo-key">config</span>
              </div>
              <div className="mo-log">
                <div className="mo-log-line"><span className="mo-dim"># 1.</span> Go to console.groq.com</div>
                <div className="mo-log-line"><span className="mo-dim"># 2.</span> API Keys → Create new key</div>
                <div className="mo-log-line"><span className="mo-dim"># 3.</span> Copy the key (shown once)</div>
                <div className="mo-log-line"><span className="mo-dim"># 4.</span> Paste into .env file</div>
                <div className="mo-log-line"><span className="mo-green">✓</span> Done — takes 30 seconds</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STEP 3: RUN ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Step 3
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          RUN &amp;<br /><span>GO.</span>
        </motion.h2>

        <div className="detail-grid">
          <motion.div className="detail-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <p className="detail-p">
              Double-click <code>OverlayAI.app</code> (or <code>OverlayAI.exe</code> on Windows).
              The app starts silently — you'll see the <strong>OA icon in your system tray / menu bar</strong>.
              There's no main window. That's intentional.
            </p>
            <p className="detail-p">
              macOS will ask for <strong>Screen Recording permission</strong> on first launch. This
              is required for OverlayAI to capture your screen when you trigger it. Grant it in{' '}
              <strong>System Settings → Privacy &amp; Security → Screen Recording</strong>.
            </p>
            <p className="detail-p">
              Once permissions are granted, press <kbd>⌘ ⇧ Space</kbd> from anywhere. The overlay
              appears, reads your screen, and responds. You're live.
            </p>
            <div className="detail-code">
              <div className="dc-label">From source (dev mode)</div>
              <pre>{`npm install\nnpm run dev`}</pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
            <div className="visual-card">
              <div className="vc-header"><div className="vc-dot" /><span>First Launch Checklist</span></div>
              <div className="vc-row"><span className="vc-label">App opens</span><span className="vc-val green">✓ Menu bar icon</span></div>
              <div className="vc-row"><span className="vc-label">Screen Recording</span><span className="vc-val green">✓ Grant in Settings</span></div>
              <div className="vc-row"><span className="vc-label">Hotkey</span><span className="vc-val">⌘ ⇧ Space</span></div>
              <div className="vc-row"><span className="vc-label">Overlay appears</span><span className="vc-val green">✓ You're live</span></div>
              <div className="vc-row"><span className="vc-label">First response</span><span className="vc-val green">&lt; 2 seconds</span></div>
            </div>
            <div className="mock-overlay" style={{ marginTop: '1rem' }}>
              <div className="mo-bar">
                <div className="mo-dot" /><span className="mo-title">OverlayAI</span>
                <span className="mo-key">live</span>
              </div>
              <div className="mo-response">
                <div className="mo-ctx-line">▸ Status: <span className="mo-green">Running · Menu bar active</span></div>
                <div className="mo-answer">
                  OverlayAI is ready. Press <code className="mo-code">⌘ ⇧ Space</code> from any app to activate.
                </div>
                <div className="mo-snippet">{`✓ Hotkey registered\n✓ Groq API connected\n✓ Screen capture ready`}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PERMISSIONS ── */}
      <section className="hiw-section">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Permissions
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          WHAT IT<br /><span>NEEDS.</span>
        </motion.h2>
        <motion.p className="section-intro" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          OverlayAI asks for exactly what it needs to work — nothing more.
        </motion.p>

        <motion.div className="privacy-grid" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {permissions.map((item, i) => (
            <motion.div key={i} className="privacy-card" custom={i} variants={fadeUpItem}>
              <div className="privacy-icon">{item.icon}</div>
              <div className="privacy-title">{item.title}</div>
              <div className="privacy-desc">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── TROUBLESHOOTING ── */}
      <section className="hiw-section alt-bg">
        <motion.div className="s-label" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          Troubleshooting
        </motion.div>
        <motion.h2 className="sh" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          SOMETHING<br /><span>BROKEN?</span>
        </motion.h2>

        <motion.div className="full-feat-grid" variants={stagger} initial="hidden" whileInView="show" viewport={vp}>
          {troubleshoot.map((item, i) => (
            <motion.div key={i} className="full-feat-item" custom={i} variants={fadeUpItem}>
              <div className="ff-icon">{item.icon}</div>
              <div className="ff-body">
                <div className="ff-title">{item.problem}</div>
                <div className="ff-desc">{item.fix}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="hiw-section">
        <motion.div className="feat-cta" variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}>
          <div className="s-label">Ready</div>
          <h2 className="sh" style={{ marginBottom: '1rem' }}>
            YOU'RE<br /><span>SET.</span>
          </h2>
          <p className="detail-p" style={{ maxWidth: '400px', marginBottom: '2rem' }}>
            Free during beta. No account. No subscription. Press <kbd>⌘ ⇧ Space</kbd> and go.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' as const }}>
            <a href="#" className="dl-btn">⬇ Download for Mac</a>
            <a href="#" className="dl-btn" style={{ background: 'var(--green-2)', color: 'var(--green)', border: '1px solid var(--border-hi)', boxShadow: 'none' }}>
              ⬇ Download for Windows
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  )
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const requirements = [
  {
    icon: '🍎',
    tag: 'macOS',
    title: 'macOS 13 Ventura or later',
    desc: 'Required for the desktopCapturer API and globalShortcut registration to work reliably.',
  },
  {
    icon: '🪟',
    tag: 'Windows',
    title: 'Windows 10 or 11',
    desc: 'Full support via Electron. Same experience as macOS — hotkey, screen read, streamed response.',
  },
  {
    icon: '🔑',
    tag: 'API Key',
    title: 'Free Groq API key',
    desc: 'Powers the vision model and language model. Free tier is plenty for daily use — 30 req/min.',
  },
  {
    icon: '📡',
    tag: 'Network',
    title: 'Internet connection',
    desc: 'API calls go to Groq over HTTPS. Offline Ollama mode is coming soon for 100% local operation.',
  },
]

const permissions = [
  {
    icon: '📸',
    title: 'Screen Recording',
    desc: 'Used to capture your screen when you press the hotkey. Required. macOS prompts you on first launch — grant it in System Settings → Privacy → Screen Recording.',
  },
  {
    icon: '⌨️',
    title: 'Accessibility (optional)',
    desc: 'Needed for some agentic actions like reading clipboard or sending keystrokes to other apps. Only asked if you use those features.',
  },
  {
    icon: '🌐',
    title: 'Network Access',
    desc: 'OverlayAI makes outbound HTTPS calls to the Groq API only. It does not open any local ports or accept inbound connections.',
  },
  {
    icon: '📴',
    title: 'Nothing else',
    desc: 'No contacts, no location, no microphone, no camera. OverlayAI only uses what it needs to see your screen and call the API.',
  },
]

const troubleshoot = [
  {
    icon: '🚫',
    problem: "App won't open on macOS",
    fix: 'Right-click the .app and choose Open. macOS Gatekeeper blocks unsigned apps by default — this bypasses it on first launch only.',
  },
  {
    icon: '⌨️',
    problem: 'Hotkey does nothing',
    fix: 'Check System Settings → Privacy → Accessibility. OverlayAI needs accessibility access for globalShortcut to register system-wide.',
  },
  {
    icon: '📸',
    problem: 'Black screen in overlay',
    fix: "Screen Recording permission wasn't granted. Go to System Settings → Privacy → Screen Recording, enable OverlayAI, then relaunch.",
  },
  {
    icon: '🔑',
    problem: 'API error or no response',
    fix: 'Double-check your GROQ_API_KEY in the .env file. Make sure there are no spaces or extra quotes around the key value.',
  },
  {
    icon: '🐢',
    problem: 'Slow response times',
    fix: "You may be hitting Groq's free tier rate limit. Wait 30 seconds and try again, or upgrade to a paid Groq plan for higher throughput.",
  },
  {
    icon: '🪟',
    problem: 'Overlay flickers on Windows',
    fix: 'Disable hardware acceleration: in the system tray menu, go to Settings → Disable GPU Acceleration. Known issue, fix incoming.',
  },
]