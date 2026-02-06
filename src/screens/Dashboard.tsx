import { useEffect, useState } from 'react'
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

const cardsSubpages = ['All Cards', 'Savings Cards', 'Debit Cards', 'Credit Cards']
const cardData = [
  {
    id: 'sav-4238',
    type: 'Savings',
    category: 'Savings',
    last4: '4238',
    transactions: {
      today: [
        { id: 'sav-1', label: 'Interest Payout', amount: '+$4.12' },
        { id: 'sav-2', label: 'Transfer In', amount: '+$120.00' },
      ],
      week: [
        { id: 'sav-3', label: 'Savings Deposit', amount: '+$250.00' },
        { id: 'sav-4', label: 'Auto Transfer', amount: '-$75.00' },
        { id: 'sav-5', label: 'Mobile Check', amount: '+$480.00' },
      ],
    },
  },
  {
    id: 'sav-9912',
    type: 'Savings',
    category: 'Savings',
    last4: '9912',
    transactions: {
      today: [
        { id: 'sav-6', label: 'Cash Deposit', amount: '+$60.00' },
        { id: 'sav-7', label: 'Transfer Out', amount: '-$35.00' },
      ],
      week: [
        { id: 'sav-8', label: 'Round-up Transfer', amount: '+$18.55' },
        { id: 'sav-9', label: 'Savings Boost', amount: '+$100.00' },
        { id: 'sav-10', label: 'Auto Transfer', amount: '-$50.00' },
      ],
    },
  },
  {
    id: 'deb-6104',
    type: 'Debit',
    category: 'Debit',
    last4: '6104',
    transactions: {
      today: [
        { id: 'deb-1', label: 'Fresh Start Coffee', amount: '-$8.40' },
        { id: 'deb-2', label: 'Metro Transit', amount: '-$2.75' },
      ],
      week: [
        { id: 'deb-3', label: 'Grocery Market', amount: '-$62.15' },
        { id: 'deb-4', label: 'Streaming Service', amount: '-$12.99' },
        { id: 'deb-5', label: 'Fuel Station', amount: '-$41.30' },
      ],
    },
  },
  {
    id: 'cred-2049',
    type: 'Credit',
    category: 'Credit',
    last4: '2049',
    transactions: {
      today: [
        { id: 'cred-1', label: 'Design Market', amount: '-$24.00' },
        { id: 'cred-2', label: 'Lunch Spot', amount: '-$13.80' },
      ],
      week: [
        { id: 'cred-3', label: 'Online Order', amount: '-$89.20' },
        { id: 'cred-4', label: 'Monthly Membership', amount: '-$29.00' },
        { id: 'cred-5', label: 'Ride Share', amount: '-$17.60' },
      ],
    },
  },
]

export default function DashboardScreen() {
  const [active, setActive] = useState<NavItem['label']>('Dashboard')
  const [activeCardsSubpage, setActiveCardsSubpage] = useState(cardsSubpages[0])
  const [selectedCardId, setSelectedCardId] = useState(cardData[0].id)
  const visibleCards =
    activeCardsSubpage === 'All Cards'
      ? cardData
      : cardData.filter((card) => card.category === activeCardsSubpage.replace(' Cards', ''))
  const selectedCard = cardData.find((card) => card.id === selectedCardId) ?? cardData[0]

  useEffect(() => {
    if (!visibleCards.find((card) => card.id === selectedCardId)) {
      setSelectedCardId(visibleCards[0]?.id ?? cardData[0].id)
    }
  }, [activeCardsSubpage, visibleCards, selectedCardId])

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

        <div className="dashboard-body">
          {active === 'Cards' && (
            <div className="cards-section">
              <div className="cards-row">
                {visibleCards.map((card) => (
                  <button
                    key={card.id}
                    className={`bank-card${
                      selectedCardId === card.id ? ' bank-card--active' : ''
                    }`}
                    type="button"
                    onClick={() => setSelectedCardId(card.id)}
                  >
                    <div className="bank-card__digits">. . . {card.last4}</div>
                    <div className="bank-card__type">{card.type} Card</div>
                  </button>
                ))}
              </div>

              <div className="cards-detail">
                <div className="detail-panel">
                  <h3>Card Management</h3>
                  <ul className="detail-list">
                    <li>
                      <button type="button">Card Details</button>
                    </li>
                    <li>
                      <button type="button">Download Statement</button>
                    </li>
                    <li>
                      <button type="button">Change Pin</button>
                    </li>
                    <li>
                      <button type="button">Block Card</button>
                    </li>
                  </ul>
                  <button className="detail-link" type="button">
                    View More
                  </button>
                </div>
                <div className="detail-panel">
                  <h3>Latest Transactions</h3>
                  <div className="detail-group">
                    <p>Today</p>
                    <ul className="detail-list">
                      {selectedCard.transactions.today.map((tx) => (
                        <li key={tx.id}>
                          <span>{tx.label}</span>
                          <span>{tx.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="detail-group">
                    <p>Last 7 Days</p>
                    <ul className="detail-list">
                      {selectedCard.transactions.week.map((tx) => (
                        <li key={tx.id}>
                          <span>{tx.label}</span>
                          <span>{tx.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="detail-link" type="button">
                    View More
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
