interface NavProps {
  onToggleTheme: () => void
  theme: 'dark' | 'light'
  currentPage: string
  onNavigate: (page: string) => void
}

export function Nav({ onToggleTheme, theme, currentPage, onNavigate }: NavProps) {
  const links = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'features', label: 'Features' },
    { id: 'installation', label: 'Installation' },
    { id: 'tech-stack', label: 'Tech Stack' },
  ]

  return (
    <nav>
      <a
        href="#"
        className="logo"
        onClick={(e) => { e.preventDefault(); onNavigate('home') }}
      >
        <div className="logo-mark">OA</div>
        <span className="logo-name">OverlayAI</span>
      </a>

      <div className="nav-links">
        {links.map((link) => (
          <a
            key={link.id}
            href="#"
            className={`nav-link ${currentPage === link.id ? 'nav-link-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate(link.id) }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="nav-right">
        <button
          className="theme-btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <a
          href="#"
          className="nav-cta"
          onClick={(e) => { e.preventDefault(); onNavigate('installation') }}
        >
          ⬇ Download
        </a>
      </div>
    </nav>
  )
}