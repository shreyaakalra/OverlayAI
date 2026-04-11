import { useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
// import { HowItWorks } from './components/HowItWorks'
import { Modes } from './components/Modes'
import { TechStack } from './components/TechStack'
import { Team } from './components/Team'
import { Footer } from './components/Footer'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { useTheme } from './hooks/useTheme'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [currentPage, setCurrentPage] = useState('home')
  useScrollReveal()

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
          {/* <HowItWorks />
          <hr className="divider" /> */}
          <Modes />
          <hr className="divider" />
          <TechStack />
          <hr className="divider" />
          <Team />
        </>
      )}

      {currentPage === 'how-it-works' && <HowItWorksPage />}
      {currentPage === 'features'     && <FeaturesPage />}

      {currentPage === 'installation' && (
        <main className="page">
          <section className="page-hero">
            <div className="page-hero-inner">
              <div className="s-label">Coming next</div>
              <h1 className="page-title">INSTALLATION.<br /><span className="hl-green">SOON.</span></h1>
            </div>
          </section>
        </main>
      )}

      {currentPage === 'tech-stack' && (
        <main className="page">
          <section className="page-hero">
            <div className="page-hero-inner">
              <div className="s-label">Coming next</div>
              <h1 className="page-title">TECH STACK.<br /><span className="hl-green">SOON.</span></h1>
            </div>
          </section>
        </main>
      )}

      <Footer />
    </div>
  )
}