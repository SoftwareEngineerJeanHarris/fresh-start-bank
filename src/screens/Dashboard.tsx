type DashboardScreenProps = {
  onBackToAuth: () => void
}

const navItems = ['Dashboard', 'Transactions', 'Accounts', 'Cards', 'Reports']

export default function DashboardScreen({ onBackToAuth }: DashboardScreenProps) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="logo__mark" aria-hidden="true" />
          <div>
            <p className="sidebar__eyebrow">Fresh Start</p>
            <h2>Bank</h2>
          </div>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <button key={item} className="nav-item" type="button">
              <span className="nav-icon" aria-hidden="true" />
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="nav-item" type="button">
            <span className="nav-icon" aria-hidden="true" />
            Settings
          </button>
          <button className="nav-item nav-item--ghost" type="button" onClick={onBackToAuth}>
            <span className="nav-icon" aria-hidden="true" />
            Back to login
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="search">
            <span className="search__icon" aria-hidden="true" />
            <input type="search" placeholder="Search" />
          </div>
        </header>
        <div className="dashboard-body" />
      </section>
    </div>
  )
}
