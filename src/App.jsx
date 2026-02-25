import ContributorCard from './ContributorCard'
import './App.css'

const modules = import.meta.glob('./contributors/*.json', { eager: true })
const contributors = Object.values(modules).map((m) => m.default)

const HOW_STEPS = [
  {
    title: 'Fork the repository',
    desc: 'Hit Fork on GitHub to get your own copy of this repo.',
  },
  {
    title: 'Add your entry',
    desc: <>Create a new file <code>src/contributors/&lt;your-github-username&gt;.json</code> — only <code>"name"</code> is required.</>,
  },
  {
    title: 'Open a Pull Request',
    desc: 'Push your branch and open a PR against main. GitHub Actions will validate your JSON automatically.',
  },
  {
    title: 'Get merged — go live',
    desc: 'Once your PR passes CI and the maintainer merges it, your card appears here instantly.',
  },
]

export default function App() {
  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="header">
        <div className="header-wordmark">
          <span className="bracket">[</span>
          <span className="text">DevOps Wall</span>
          <span className="bracket">]</span>
        </div>
        <nav className="header-nav">
          <a href="https://github.com/cse-himanshu/devops-wall" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://github.com/cse-himanshu/devops-wall/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
            Contribute
          </a>
        </nav>
        <div className="live-pill" style={{ marginLeft: 'auto' }}>
          <span className="live-dot" />
          LIVE
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            CI / CD in action
          </div>
          <h1>
            <span className="line-muted">open-source</span>
            The <span className="highlight">Contributor</span> Wall
          </h1>
          <p className="hero-desc">
            Every card on this page was merged via a Pull Request.
            Fork the repo, add your name to a JSON file, and watch the pipeline put you on the wall.
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
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="main">

        {/* How it works */}
        <div className="how-it-works">
          <div className="how-header">
            <span>$</span> how_to_contribute.sh
          </div>
          <div className="how-body">
            <div className="how-steps">
              {HOW_STEPS.map((s, i) => (
                <div className="how-step" key={i}>
                  <div className="step-badge">{i + 1}</div>
                  <div className="step-info">
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="section-header">
          <span className="section-title">
            contributors &nbsp;<em>— {contributors.length}</em>
          </span>
          <div className="section-line" />
        </div>

        <div className="contributors-grid">
          {contributors.length === 0 ? (
            <div className="empty-state">
              <p>// no contributors yet — be the first, open a PR</p>
            </div>
          ) : (
            contributors.map((c, i) => (
              <ContributorCard key={c.github ?? c.name ?? i} contributor={c} index={i} />
            ))
          )}
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-brand">
              DevOps<span>Wall</span>
            </span>
            <span className="footer-sub">
              data lives in <code>src/contributors/</code>
            </span>
          </div>
          <div className="footer-right">
            built with{' '}
            <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
            {' '}+ React
          </div>
        </div>
      </footer>

    </div>
  )
}
