import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    location: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (formData.username.includes(' ')) {
      setError('Username cannot contain spaces')
      setLoading(false)
      return
    }

    try {
      await axios.post('http://localhost:3001/register', formData)
      const loginRes = await axios.post('http://localhost:3001/login', {
        email: formData.email,
        password: formData.password
      })
      localStorage.setItem('token', loginRes.data.token)
      localStorage.setItem('user', JSON.stringify(loginRes.data.user))
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Create an account</h1>
        <p>Join VeedYo today</p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input className="form-input" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input className="form-input" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-input" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-input" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Bio (optional)</label>
            <input className="form-input" name="bio" value={formData.bio} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location (optional)</label>
            <input className="form-input" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '8px' }}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}
