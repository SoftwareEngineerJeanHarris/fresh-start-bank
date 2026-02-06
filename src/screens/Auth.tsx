import { useEffect, useMemo, useState } from 'react'
import loginImage from '../assets/images/login-stock-img.jpg'
import piggyBankBlack from '../assets/images/icons/piggy-bank-black.png'

type AuthMode = 'login' | 'signup'

type AuthScreenProps = {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
  onEnterDashboard: () => void
}

export default function AuthScreen({ mode, onModeChange, onEnterDashboard }: AuthScreenProps) {
  const [loginValues, setLoginValues] = useState({ email: '', password: '' })
  const [signupValues, setSignupValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [toast, setToast] = useState<string | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  const nameIsValid = (value: string) => value.trim().length > 0 && !/\d/.test(value)
  const emailIsValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  const passwordIsValid = (value: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value)

  const canLogin = useMemo(
    () => emailIsValid(loginValues.email) && passwordIsValid(loginValues.password),
    [loginValues],
  )

  const canSignup = useMemo(
    () =>
      nameIsValid(signupValues.firstName) &&
      nameIsValid(signupValues.lastName) &&
      emailIsValid(signupValues.email) &&
      passwordIsValid(signupValues.password),
    [signupValues],
  )

  const handleCreateAccount = () => {
    if (!canSignup) return
    setToast('Account created. Please sign in to continue.')
    setToastVisible(true)
    setSignupValues({ firstName: '', lastName: '', email: '', password: '' })
    onModeChange('login')
  }

  useEffect(() => {
    if (!toast) return
    const hideTimer = window.setTimeout(() => setToastVisible(false), 8000)
    const clearTimer = window.setTimeout(() => setToast(null), 8400)
    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(clearTimer)
    }
  }, [toast])

  return (
    <div className="auth-page">
      {toast && (
        <div className={`toast${toastVisible ? ' is-visible' : ' is-hidden'}`} role="status">
          {toast}
        </div>
      )}
      <main className="auth-layout">
        <section className="auth-left">
          <div className="auth-left__top">
            <div className="logo">
              <img className="logo__mark" src={piggyBankBlack} alt="" />
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
                  <div className="field-row">
                    <input
                      type="email"
                      name="email"
                      placeholder="you@freshstart.com"
                      maxLength={25}
                      value={loginValues.email}
                      onChange={(event) =>
                        setLoginValues((prev) => ({ ...prev, email: event.target.value }))
                      }
                    />
                  </div>
                </label>
                <label className="field">
                  <span>Password</span>
                  <div className="field-row">
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      maxLength={25}
                      value={loginValues.password}
                      onChange={(event) =>
                        setLoginValues((prev) => ({ ...prev, password: event.target.value }))
                      }
                    />
                    <span
                      className="hint"
                      data-tooltip="8+ chars, with letters, numbers, and one special symbol."
                    >
                      ?
                    </span>
                  </div>
                </label>
                <button
                  className="btn btn--primary"
                  type="button"
                  onClick={onEnterDashboard}
                  disabled={!canLogin}
                >
                  Login
                </button>
              </form>
            ) : (
              <form className="auth-form">
                <div className="field-grid">
                  <label className="field">
                    <span>First name</span>
                    <input
                      className="input-pad-right"
                      type="text"
                      name="firstName"
                      placeholder="Jordan"
                      maxLength={25}
                      value={signupValues.firstName}
                      onChange={(event) =>
                        setSignupValues((prev) => ({ ...prev, firstName: event.target.value }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Last name</span>
                    <input
                      className="input-pad-right"
                      type="text"
                      name="lastName"
                      placeholder="Lee"
                      maxLength={25}
                      value={signupValues.lastName}
                      onChange={(event) =>
                        setSignupValues((prev) => ({ ...prev, lastName: event.target.value }))
                      }
                    />
                  </label>
                </div>
                <label className="field">
                  <span>Email</span>
                  <div className="field-row">
                    <input
                      type="email"
                      name="email"
                      placeholder="you@freshstart.com"
                      maxLength={25}
                      value={signupValues.email}
                      onChange={(event) =>
                        setSignupValues((prev) => ({ ...prev, email: event.target.value }))
                      }
                    />
                  </div>
                </label>
                <label className="field">
                  <span>Password</span>
                  <div className="field-row">
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      maxLength={25}
                      value={signupValues.password}
                      onChange={(event) =>
                        setSignupValues((prev) => ({ ...prev, password: event.target.value }))
                      }
                    />
                    <span
                      className="hint"
                      data-tooltip="8+ chars, with letters, numbers, and one special symbol."
                    >
                      ?
                    </span>
                  </div>
                </label>
                <button
                  className="btn btn--primary"
                  type="button"
                  onClick={handleCreateAccount}
                  disabled={!canSignup}
                >
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
