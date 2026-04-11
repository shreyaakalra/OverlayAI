export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />

      <div className="hero-left">
        <div className="status-pill">
          <div className="pulse" />
          Beta · macOS · Free
        </div>

        <div className="hero-headline">
          <div className="line"><span>YOUR AI</span></div>
          <div className="line"><span>CO-PILOT</span></div>
          <div className="line"><span className="hl-green">ON SCREEN.</span></div>
        </div>

        <p className="hero-sub">
          Press <kbd>⌘ ⇧ Space</kbd> from anywhere. OverlayAI reads your screen,
          understands the context, and streams back a fix, draft, or action — in
          under 2 seconds. No tab-switching. No copy-pasting.
        </p>

        <div className="hero-actions">
          <a href="#" className="dl-btn" id="download">
            ⬇ Download for Mac
          </a>
        <a href="#" className="dl-btn mt-3 block">
        ⬇ Download for Windows
        </a>  
        <span className="hero-meta">macOS 13+ &nbsp;·&nbsp; Free Beta</span>
        </div>
      </div>

      <div className="hero-right">
        <div className="mockup">
          <div className="m-topbar">
            <div className="m-status">
              <div className="m-dot" />
              <span className="m-label">OverlayAI</span>
            </div>
            <span className="m-key">⌘⇧Space</span>
          </div>

          <div className="m-ctx">
            <span>▸</span>
            <span>
              Context detected:{' '}
              <span>TypeScript error · line 42</span>
            </span>
          </div>

          <p className="m-response">
            You're passing a <code>string</code> where{' '}
            <code>Promise&lt;string&gt;</code> is expected. The function is
            async — you need to <code>await</code> it.
          </p>

          <div className="m-code">
            <span className="c">// before</span>
            <br />
            <span className="v">const result</span> = fetchData();
            <br />
            <br />
            <span className="c">// fix</span>
            <br />
            <span className="v">const result</span> ={' '}
            <span className="k">await</span> fetchData();
          </div>

          <div className="m-input">
            <span className="m-input-text">Ask a follow-up...</span>
            <div className="m-cursor" />
          </div>
        </div>
      </div>

      <div className="hero-fade" />
    </section>
  )
}