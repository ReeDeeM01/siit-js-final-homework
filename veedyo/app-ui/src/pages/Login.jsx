import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:3001/login', formData)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 60px)',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px'
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Welcome back</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Log in to your VeedYo account
        </p>

        {error && (
          <div style={{
            backgroundColor: 'rgba(255, 77, 77, 0.1)',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  backgroundColor: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '12px 16px',
  color: 'var(--text)',
  fontSize: '15px',
  outline: 'none',
  width: '100%'
}

const buttonStyle = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '12px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%'
}
