import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useWatchLater } from '../../context/WatchLaterContext.jsx'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()
  const { watchLater } = useWatchLater()

  function handleLogout() {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="header-logo">
          NXT<span>FLIX</span>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="header-link">
            Home
          </Link>
          <Link to="/watch-later" className="header-link">
            Watch Later
            {watchLater.length > 0 && (
              <span className="header-badge">{watchLater.length}</span>
            )}
          </Link>
          <button className="btn btn-ghost header-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}
