import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    axios.get('http://localhost:3001/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
      })
  }, [])

  if (loading) {
    return (
      <div className="profile-page">
        <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: '22px', marginBottom: '4px' }}>{user.fullName}</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>@{user.username}</p>
          </div>
        </div>

        <div className="profile-fields">
          <div className="profile-field">
            <span>Full Name</span>
            <span>{user.fullName}</span>
          </div>
          <div className="profile-field">
            <span>Username</span>
            <span>@{user.username}</span>
          </div>
          <div className="profile-field">
            <span>Email</span>
            <span>{user.email}</span>
          </div>
          <div className="profile-field">
            <span>Bio</span>
            <span>{user.bio || 'No bio yet'}</span>
          </div>
          <div className="profile-field">
            <span>Location</span>
            <span>{user.location || 'No location set'}</span>
          </div>
        </div>

        <button onClick={() => navigate('/settings')} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '32px' }}>
          Edit Profile
        </button>
        <button onClick={() => navigate('/')} className="btn-secondary" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '12px' }}>
          Back to Home
        </button>
      </div>
    </div>
  )
}
