import contributors from './contributors.json'
import ContributorCard from './ContributorCard'
import './App.css'

const PIPELINE_STEPS = [
  'Fork Repo',
  'Add Name to JSON',
  'Open PR',
  'CI Validates JSON',
  'Maintainer Merges',
  'Live on Wall',
]

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <span className="header-logo">🧱</span>
        <span className="header-title">DevOps Wall</span>
        <span className="header-badge">LIVE</span>
      </header>

      <section className="hero">
        <h1>The Contributor Wall</h1>
        <p>
          Every card below was added via a Pull Request. Fork the repo, add your
          name, and watch CI/CD do the rest.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">{contributors.length}</span>
            <span className="stat-label">Contributors</span>
          </div>
          <div className="stat">
            <span className="stat-value">PR</span>
            <span className="stat-label">Driven</span>
          </div>
          <div className="stat">
            <span className="stat-value">CI</span>
            <span className="stat-label">Validated</span>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="contribute-banner">
          <span className="icon">💡</span>
          <div>
            <h3>Want to appear here?</h3>
            <p>
              Fork this repo → open <code>src/contributors.json</code> → add
              your entry → open a Pull Request. GitHub Actions will validate your
              JSON automatically, and once merged your card goes live instantly.
            </p>
          </div>
        </div>

        <div className="pipeline-strip">
          {PIPELINE_STEPS.map((step, i) => (
            <div className="pipeline-step" key={step}>
              <span className="dot" />
              <span>
                {i + 1}. {step}
              </span>
            </div>
          ))}
        </div>

        <div className="grid-header">
          <h2>All contributors ({contributors.length})</h2>
        </div>

        <div className="contributors-grid">
          {contributors.length === 0 ? (
            <div className="empty-state">
              <p>No contributors yet. Be the first — open a PR!</p>
            </div>
          ) : (
            contributors.map((c, i) => (
              <ContributorCard key={c.github ?? c.name ?? i} contributor={c} />
            ))
          )}
        </div>
      </main>

      <footer className="footer">
        <p>
          Powered by{' '}
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite
          </a>{' '}
          + React &nbsp;·&nbsp; Data lives in{' '}
          <code>src/contributors.json</code>
        </p>
      </footer>
    </div>
  )
}
