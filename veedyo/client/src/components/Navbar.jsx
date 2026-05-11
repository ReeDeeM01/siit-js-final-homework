import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: '60px',
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '22px' }}>
          Veed<span style={{ color: 'var(--text)' }}>Yo</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {token ? (
          <>
            <Link to="/profile" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Profile</Link>
            <Link to="/settings" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Settings</Link>
            <button onClick={handleLogout} style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
