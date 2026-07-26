import { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import { signIn } from '../../api/auth.js'
import './SignIn.css'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (Cookies.get('jwt_token')) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await signIn(email, password)
      Cookies.set('jwt_token', token, { expires: 7 })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signin">
      <div className="signin-brand">
        <div className="signin-brand-content">
          <p className="signin-logo">
            NXT<span>FLIX</span>
          </p>
          <h1>Unlimited movies, shows and more.</h1>
          <p className="signin-tagline">Watch anywhere. Cancel anytime.</p>
        </div>
      </div>

      <div className="signin-form-panel">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>

          {error && <div className="signin-error">{error}</div>}

          <label className="signin-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="signin-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@example.com"
            autoComplete="email"
          />

          <label className="signin-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="signin-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <button type="submit" className="btn btn-primary signin-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
