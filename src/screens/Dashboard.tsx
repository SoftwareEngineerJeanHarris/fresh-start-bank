import { useState } from 'react'
import accountsIcon from '../assets/images/icons/accounts.png'
import cardsIcon from '../assets/images/icons/credit-card.png'
import dashboardIcon from '../assets/images/icons/dashboard.png'
import piggyBankWhite from '../assets/images/icons/piggy-bank-white.png'
import reportsIcon from '../assets/images/icons/reports.png'
import settingsIcon from '../assets/images/icons/settings.png'
import transactionsIcon from '../assets/images/icons/transactions.png'

type NavItem = {
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: dashboardIcon },
  { label: 'Transactions', icon: transactionsIcon },
  { label: 'Accounts', icon: accountsIcon },
  { label: 'Cards', icon: cardsIcon },
  { label: 'Reports', icon: reportsIcon },
]

const cardsSubpages = ['All Cards', 'Debit Cards', 'Credit Cards']

export default function DashboardScreen() {
  const [active, setActive] = useState<NavItem['label']>('Dashboard')
  const [activeCardsSubpage, setActiveCardsSubpage] = useState(cardsSubpages[0])

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <img className="logo__mark" src={piggyBankWhite} alt="" />
          <div>
            <p className="sidebar__eyebrow">Fresh Start</p>
            <h2>Bank</h2>
          </div>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item${active === item.label ? ' nav-item--active' : ''}`}
              type="button"
              onClick={() => setActive(item.label)}
            >
              <img className="nav-icon" src={item.icon} alt="" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="nav-item" type="button">
            <img className="nav-icon" src={settingsIcon} alt="" />
            Settings
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <h1>{active}</h1>
          <div className="dashboard-actions">
            {active === 'Cards' && (
              <button className="btn btn--primary" type="button">
                + Add New Card
              </button>
            )}
            <div className="search">
              <span className="search__icon" aria-hidden="true" />
              <input type="search" placeholder="Search" />
            </div>
          </div>
        </header>

        <div className="dashboard-subnav">
          {active === 'Cards' ? (
            <div className="subnav-tabs">
              {cardsSubpages.map((label) => (
                <button
                  key={label}
                  className={`subnav-tab${activeCardsSubpage === label ? ' is-active' : ''}`}
                  type="button"
                  onClick={() => setActiveCardsSubpage(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : (
            <div className="subnav-placeholder" />
          )}
        </div>

        <div className="dashboard-body" />
      </section>
    </div>
  )
}
