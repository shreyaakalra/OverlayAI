import { useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Modes } from './components/Modes'
import { TechStack } from './components/TechStack'
import { Team } from './components/Team'
import { Footer } from './components/Footer'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { InstallationPage } from './pages/Installationpage'
import { TechStackPage } from './pages/Techstackpage'
import { useTheme } from './hooks/useTheme'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [currentPage, setCurrentPage] = useState('home')

  // Pass currentPage so the observer re-attaches after every navigation
  useScrollReveal(currentPage)

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div data-theme={theme}>
      <Nav
        onToggleTheme={toggleTheme}
        theme={theme}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === 'home' && (
        <>
          <Hero />
          <hr className="divider" />
          <Modes />
          <hr className="divider" />
          <TechStack />
          <hr className="divider" />
          <Team />
        </>
      )}

      {currentPage === 'how-it-works' && (
        <PageWithBack onNavigate={handleNavigate}>
          <HowItWorksPage />
        </PageWithBack>
      )}

      {currentPage === 'features' && (
        <PageWithBack onNavigate={handleNavigate}>
          <FeaturesPage />
        </PageWithBack>
      )}

      {currentPage === 'installation' && (
        <PageWithBack onNavigate={handleNavigate}>
          <InstallationPage />
        </PageWithBack>
      )}

      {currentPage === 'tech-stack' && (
        <PageWithBack onNavigate={handleNavigate}>
          <TechStackPage />
        </PageWithBack>
      )}

      <Footer />
    </div>
  )
}

/* ── Back-to-home wrapper ── */
function PageWithBack({
  children,
  onNavigate,
}: {
  children: React.ReactNode
  onNavigate: (page: string) => void
}) {
  return (
    <>
      <div className="back-bar">
        <button
          className="back-btn"
          onClick={() => onNavigate('home')}
          aria-label="Back to home"
        >
          <span className="back-arrow">←</span>
          <span>Back to home</span>
        </button>
      </div>
      {children}
    </>
  )
}