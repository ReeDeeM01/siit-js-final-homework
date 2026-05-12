import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Settings() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ fullName: '', username: '', email: '', bio: '', location: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }

    axios.get('http://localhost:3001/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setFormData({
          fullName: res.data.fullName,
          username: res.data.username,
          email: res.data.email,
          bio: res.data.bio || '',
          location: res.data.location || ''
        })
      })
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (formData.username.includes(' ')) {
      setError('Username cannot contain spaces')
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const res = await axios.put('http://localhost:3001/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      localStorage.setItem('user', JSON.stringify(res.data))
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    const token = localStorage.getItem('token')
    await axios.delete('http://localhost:3001/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Settings</h1>
        <p>Update your account information</p>

        {error && <div className="alert-error">{error}</div>}
        {success && <div className="alert-success">{success}</div>}

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
            <label>Bio</label>
            <input className="form-input" name="bio" value={formData.bio} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input className="form-input" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '8px' }}>
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </form>

        <button onClick={() => navigate('/profile')} className="btn-secondary" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '12px' }}>
          Back to Profile
        </button>

        <button onClick={handleDelete} className="btn-danger" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '12px' }}>
          Delete Account
        </button>
      </div>
    </div>
  )
}
