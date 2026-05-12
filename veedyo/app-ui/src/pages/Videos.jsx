import { useEffect, useState } from 'react'
import axios from 'axios'

const CATEGORIES = ['Coding', 'Music', 'Gaming', 'Travel', 'Food', 'Fitness', 'Tech', 'Chill']

export default function Videos() {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const [videos, setVideos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', category: '', duration: '', url: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchVideos() }, [])

  async function fetchVideos() {
    try {
      const res = await axios.get('http://localhost:3001/videos')
      setVideos(res.data)
    } catch {
      setError('Failed to load videos')
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function openAddForm() {
    setEditingVideo(null)
    setFormData({ title: '', description: '', category: '', duration: '', url: '' })
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  function openEditForm(video) {
    setEditingVideo(video)
    setFormData({ title: video.title, description: video.description, category: video.category, duration: video.duration, url: video.url })
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!formData.title || !formData.description || !formData.category || !formData.duration || !formData.url) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (formData.duration <= 0) {
      setError('Duration must be a positive number')
      setLoading(false)
      return
    }

    try {
      if (editingVideo) {
        const res = await axios.put(`http://localhost:3001/videos/${editingVideo.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setVideos(videos.map(v => v.id === editingVideo.id ? res.data : v))
        setSuccess('Video updated successfully!')
      } else {
        const res = await axios.post('http://localhost:3001/videos', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setVideos([...videos, res.data])
        setSuccess('Video added successfully!')
      }
      setShowForm(false)
      setEditingVideo(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setVideos(videos.filter(v => v.id !== id))
      setDeleteConfirm(null)
      setSuccess('Video deleted successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="videos-page">
      <div className="videos-header">
        <h1 style={{ fontSize: '28px' }}>Videos</h1>
        {token && (
          <button onClick={openAddForm} className="btn-primary">+ Add Video</button>
        )}
      </div>

      {error && <div className="alert-error">{error}</div>}
      {success && <div className="alert-success">{success}</div>}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ marginBottom: '24px' }}>{editingVideo ? 'Edit Video' : 'Add Video'}</h2>
            {error && <div className="alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input className="form-input" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-input" name="description" value={formData.description} onChange={handleChange} rows={3} style={{ resize: 'vertical' }} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="form-input" name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input className="form-input" name="duration" type="number" value={formData.duration} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>URL</label>
                <input className="form-input" name="url" value={formData.url} onChange={handleChange} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Saving...' : editingVideo ? 'Save Changes' : 'Add Video'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '16px' }}>Delete Video</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Are you sure you want to delete "{deleteConfirm.title}"? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="btn-danger">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '18px' }}>No videos yet.</p>
          {token && <p>Be the first to add one!</p>}
        </div>
      ) : (
        <div className="videos-grid">
          {videos.map(video => (
            <div key={video.id} className="video-card">
              <div className="video-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '12px' }}>
                    {video.category}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{video.duration} min</span>
                </div>
                <h3 style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.4' }}>{video.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px', lineHeight: '1.5' }}>
                  {video.description}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '12px' }}>
                  By {video.authorName}
                </p>
                <a href={video.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontSize: '13px' }}>
                  Watch Video →
                </a>
              </div>

              {token && user && video.authorId === user.id && (
                <div className="video-card-actions">
                  <button onClick={() => openEditForm(video)} className="btn-secondary">Edit</button>
                  <button onClick={() => setDeleteConfirm(video)} className="btn-danger">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
