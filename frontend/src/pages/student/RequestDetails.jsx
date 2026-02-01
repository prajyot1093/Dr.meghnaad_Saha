import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockRequests } from '../../services/mockData'

export default function RequestDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()

  const allRequests = JSON.parse(localStorage.getItem('service-requests') || JSON.stringify(mockRequests))
  const request = allRequests.find(r => r.id === id)

  if (!request) {
    return (
      <div className="app-container">
        <main className="main-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>Request not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/student/requests')}>
            Back to Requests
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <a href="/student/dashboard" className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              Unified Service
            </a>
          </div>
          <div className="nav-right">
            <div className="user-menu">
              <div className="user-avatar">{user?.displayName?.charAt(0) || 'U'}</div>
              <span className="user-name">{user?.displayName || 'User'}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <button
          className="btn btn-outline"
          onClick={() => navigate('/student/requests')}
          style={{ marginBottom: '1.5rem' }}
        >
          ← Back to Requests
        </button>

        <div className="card" style={{ maxWidth: '800px' }}>
          <div className="card-header">
            <div>
              <h2 className="card-title">{request.ticketId}</h2>
              <p className="card-subtitle">{request.title}</p>
            </div>
            <span style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: request.status === 'completed' ? 'var(--success)' : request.status === 'in-progress' ? 'var(--warning)' : 'var(--primary)',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.9rem',
            }}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
            </span>
          </div>

          <div style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Description</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{request.description}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', padding: '1.5rem 0' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Service Type</h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{request.serviceType}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Priority</h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '1rem', textTransform: 'capitalize' }}>{request.priority}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Created</h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{request.createdAt.toLocaleDateString()}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Due Date</h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{request.dueDate?.toLocaleDateString() || 'Not set'}</p>
            </div>
          </div>

          {request.status === 'pending' && (
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary">Edit Request</button>
              <button className="btn btn-danger">Cancel Request</button>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
