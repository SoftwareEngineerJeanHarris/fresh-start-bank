import loginImage from '../assets/images/login-stock-img.jpg'

type AuthMode = 'login' | 'signup'

type AuthScreenProps = {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
  onEnterDashboard: () => void
}

export default function AuthScreen({ mode, onModeChange, onEnterDashboard }: AuthScreenProps) {
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
            <h1>{mode === 'login' ? 'Sign into Fresh Start Bank' : 'Create your account'}</h1>

            {mode === 'login' ? (
              <form className="auth-form">
                <label className="field">
                  <span>Email</span>
                  <input type="email" name="email" placeholder="you@freshstart.com" />
                </label>
                <label className="field">
                  <span>Password</span>
                  <input type="password" name="password" placeholder="••••••••" />
                </label>
                <button className="btn btn--primary" type="button" onClick={onEnterDashboard}>
                  Login
                </button>
              </form>
            ) : (
              <form className="auth-form">
                <div className="field-grid">
                  <label className="field">
                    <span>First name</span>
                    <input type="text" name="firstName" placeholder="Jordan" />
                  </label>
                  <label className="field">
                    <span>Last name</span>
                    <input type="text" name="lastName" placeholder="Lee" />
                  </label>
                </div>
                <label className="field">
                  <span>Email</span>
                  <input type="email" name="email" placeholder="you@freshstart.com" />
                </label>
                <label className="field">
                  <span>Password</span>
                  <input type="password" name="password" placeholder="Create a password" />
                </label>
                <button className="btn btn--primary" type="button" onClick={onEnterDashboard}>
                  Create account
                </button>
              </form>
            )}
          </div>

          <div className="auth-left__bottom">
            {mode === 'login' ? (
              <p>
                Want to{' '}
                <button className="link" type="button" onClick={() => onModeChange('signup')}>
                  Create an account
                </button>
                ?
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button className="link" type="button" onClick={() => onModeChange('login')}>
                  Sign in
                </button>
              </p>
            )}
          </div>
        </section>

        <aside className="auth-right" aria-hidden="true">
          <div className="auth-image">
            <img src={loginImage} alt="" />
          </div>
        </aside>
      </main>
    </div>
  )
}
