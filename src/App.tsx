export default function App() {
  return (
    <div className="auth-page">
      <main className="auth-layout">
        <section className="auth-left">
          <div className="auth-left__top">
            <div className="logo">
              <span className="logo__mark" aria-hidden="true" />
              <span className="logo__text">Fresh Start Bank</span>
            </div>
          </div>

          <div className="auth-left__center">
            <p className="auth-kicker">Start banking today</p>
            <h1>Sign into Fresh Start Bank</h1>
            <form className="auth-form">
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" placeholder="you@freshstart.com" />
              </label>
              <label className="field">
                <span>Password</span>
                <input type="password" name="password" placeholder="••••••••" />
              </label>
              <button className="btn btn--primary" type="button">
                Login
              </button>
            </form>
          </div>

          <div className="auth-left__bottom">
            <p>
              Want to <button className="link" type="button">Create an account</button>?
            </p>
          </div>
        </section>

        <aside className="auth-right" aria-hidden="true">
          <div className="auth-image">
            <div className="auth-image__badge">Image placeholder</div>
          </div>
        </aside>
      </main>
    </div>
  )
}
