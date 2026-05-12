import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Veed<span>Yo</span>
      </Link>

      <div className="navbar-links">
        {token && <Link to="/videos" className="navbar-link">Videos</Link>}
        {token ? (
          <>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <Link to="/settings" className="navbar-link">Settings</Link>
            <button onClick={handleLogout} className="btn-primary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
