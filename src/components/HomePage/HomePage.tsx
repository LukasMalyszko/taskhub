import Link from 'next/link'
import { Navbar } from '@/components'
import './HomePage.scss'

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="home-page">
        {/* Hero Section */}
        <section className="home-page__hero">
        <h1 className="home-page__hero-title">
          Organize Your Tasks,
          <span className="home-page__hero-title--accent">Achieve More</span>
        </h1>
        <p className="home-page__hero-description">
          TaskHub helps you stay organized and productive with a simple, intuitive task management system. 
          Create, organize, and track your tasks with ease.
        </p>
        <div className="home-page__hero-actions">
          <Link href="/tasks" className="home-page__button home-page__button--primary">
            Get Started
          </Link>
          <Link href="/about" className="home-page__button home-page__button--secondary">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-page__features">
        <h2 className="home-page__features-title">Why Choose TaskHub?</h2>
        <div className="home-page__features-grid">
          <div className="home-page__feature-card">
            <div className="home-page__feature-icon home-page__feature-icon--green">
              <svg className="home-page__feature-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="home-page__feature-title">Easy Task Creation</h3>
            <p className="home-page__feature-description">
              Quickly create and organize your tasks with our intuitive interface. Add descriptions, set priorities, and track progress.
            </p>
          </div>

          <div className="home-page__feature-card">
            <div className="home-page__feature-icon home-page__feature-icon--blue">
              <svg className="home-page__feature-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="home-page__feature-title">Lightning Fast</h3>
            <p className="home-page__feature-description">
              Built with modern technology for blazing fast performance. Your tasks load instantly and sync across devices.
            </p>
          </div>

          <div className="home-page__feature-card">
            <div className="home-page__feature-icon home-page__feature-icon--purple">
              <svg className="home-page__feature-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="home-page__feature-title">Smart Organization</h3>
            <p className="home-page__feature-description">
              Organize tasks by priority, category, or status. Filter and search to find exactly what you need when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-page__cta">
        <h2 className="home-page__cta-title">Ready to Get Organized?</h2>
        <p className="home-page__cta-description">
          Join thousands of users who have transformed their productivity with TaskHub.
        </p>
        <Link href="/tasks" className="home-page__button home-page__button--cta">
          Start Managing Tasks Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="home-page__footer">
        <div className="home-page__footer-content">
          <div className="home-page__footer-logo">
            <div className="home-page__footer-logo-icon">T</div>
            <span className="home-page__footer-logo-text">TaskHub</span>
          </div>
          <div className="home-page__footer-copyright">
            © {new Date().getFullYear()} TaskHub. Built with Next.js and Redux.
          </div>
        </div>
      </footer>
      </main>
    </>
  )
}