import { Link } from 'react-router-dom'

const videos = [
  { id: 1, title: 'How to build a React app from scratch', channel: 'CodeWithMe', views: '1.2M', date: '2 days ago', duration: '12:34', color: '#ff4d4d' },
  { id: 2, title: 'The most beautiful places on Earth', channel: 'TravelWorld', views: '890K', date: '1 week ago', duration: '24:10', color: '#4d94ff' },
  { id: 3, title: 'Lo-fi hip hop beats to study and relax', channel: 'ChillVibes', views: '5.4M', date: '3 months ago', duration: '1:02:45', color: '#a64dff' },
  { id: 4, title: 'Gordon Ramsay teaches you how to cook pasta', channel: 'FoodMasters', views: '3.1M', date: '5 days ago', duration: '18:22', color: '#ff9f4d' },
  { id: 5, title: 'Top 10 JavaScript tips you need to know', channel: 'DevTips', views: '450K', date: '2 weeks ago', duration: '9:15', color: '#4dff91' },
  { id: 6, title: 'Ultimate gaming setup tour 2026', channel: 'GamerZone', views: '2.2M', date: '1 month ago', duration: '15:48', color: '#ff4ddb' },
  { id: 7, title: 'Morning workout routine — no equipment', channel: 'FitLife', views: '780K', date: '4 days ago', duration: '22:05', color: '#ffd24d' },
  { id: 8, title: 'How AI is changing the world in 2026', channel: 'TechFuture', views: '1.8M', date: '3 days ago', duration: '31:17', color: '#4dd9ff' },
]

export default function Landing() {
  const token = localStorage.getItem('token')

  return (
    <div style={{ padding: '24px 32px' }}>
{token && (
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {['All', 'Music', 'Gaming', 'Coding', 'Travel', 'Food', 'Fitness', 'Tech', 'Chill'].map(cat => (
          <button key={cat} style={{
            padding: '6px 16px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: cat === 'All' ? 'var(--text)' : 'var(--surface)',
            color: cat === 'All' ? 'var(--bg)' : 'var(--text)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontSize: '14px'
          }}>
            {cat}
          </button>
        ))}
      </div>
)}
     {token && ( 
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {videos.map(video => (
          <div key={video.id} style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '10px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: video.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <span style={{ fontSize: '48px' }}>▶</span>
              <span style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {video.duration}
              </span>
            </div>

            <div style={{ padding: '12px', display: 'flex', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: video.color,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {video.channel.charAt(0)}
              </div>

              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {video.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '2px' }}>
                  {video.channel}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  {video.views} views • {video.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
{!token && (
      <div style={{
        marginTop: '60px',
        padding: '60px 20px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          The world is watching <span style={{ color: 'var(--primary)' }}>VeedYo</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '32px' }}>
          Share your videos. Build your audience. Join millions of creators.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/register" style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Get Started
          </Link>
          <Link to="/login" style={{
            backgroundColor: 'transparent',
            color: 'var(--text)',
            padding: '14px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            border: '1px solid var(--border)'
          }}>
            Log In
          </Link>
        </div>
      </div>
        )}
    </div>
  )
}
