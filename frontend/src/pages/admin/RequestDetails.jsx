import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockRequests } from '../../services/mockData'

export default function AdminRequestDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const [status, setStatus] = useState('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const allRequests = JSON.parse(localStorage.getItem('service-requests') || JSON.stringify(mockRequests))
  const request = allRequests.find(r => r.id === id)

  if (!request) {
    return (
      <div className="app-container">
        <main className="main-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>Request not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/admin/requests')}>
            Back to Requests
          </button>
        </main>
      </div>
    )
  }

  const handleStatusUpdate = async (newStatus) => {
    setSubmitting(true)
    try {
      // Simulate API call
      const requests = JSON.parse(localStorage.getItem('service-requests') || JSON.stringify(mockRequests))
      const reqIndex = requests.findIndex(r => r.id === id)
      if (reqIndex >= 0) {
        requests[reqIndex].status = newStatus
        requests[reqIndex].updatedAt = new Date()
        localStorage.setItem('service-requests', JSON.stringify(requests))
      }
      navigate('/admin/requests')
    } catch (err) {
      console.error('Update failed:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <a href="/admin/dashboard" className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              Admin Panel
            </a>
          </div>
          <div className="nav-right">
            <div className="user-menu">
              <div className="user-avatar">{user?.displayName?.charAt(0) || 'A'}</div>
              <span className="user-name">{user?.displayName || 'Admin'}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <button
          className="btn btn-outline"
          onClick={() => navigate('/admin/requests')}
          style={{ marginBottom: '1.5rem' }}
        >
          ← Back to Requests
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          {/* Main Content */}
          <div>
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">{request.ticketId}</h2>
                  <p className="card-subtitle">{request.title}</p>
                </div>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: request.status === 'completed' ? 'var(--success)' : request.status === 'in-progress' ? 'var(--warning)' : request.status === 'rejected' ? 'var(--danger)' : 'var(--primary)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                </span>
              </div>

              <div style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Request Description</h3>
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
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Submitted By</h4>
                  <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Student ID: {request.createdBy}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Submitted Date</h4>
                  <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="card" style={{ marginTop: '2rem' }}>
              <div className="card-header">
                <h2 className="card-title">Admin Notes</h2>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add internal notes for this request..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  minHeight: '120px',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>

          {/* Sidebar Actions */}
          <div>
            <div className="card">
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Update Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => handleStatusUpdate('in-progress')}
                  disabled={submitting || request.status === 'in-progress'}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--warning)',
                    background: request.status === 'in-progress' ? 'var(--warning)' : 'transparent',
                    color: request.status === 'in-progress' ? 'white' : 'var(--warning)',
                    fontWeight: '600',
                    cursor: submitting || request.status === 'in-progress' ? 'not-allowed' : 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleStatusUpdate('completed')}
                  disabled={submitting || request.status === 'completed'}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--success)',
                    background: request.status === 'completed' ? 'var(--success)' : 'transparent',
                    color: request.status === 'completed' ? 'white' : 'var(--success)',
                    fontWeight: '600',
                    cursor: submitting || request.status === 'completed' ? 'not-allowed' : 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  Mark Completed
                </button>
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  disabled={submitting || request.status === 'rejected'}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--danger)',
                    background: request.status === 'rejected' ? 'var(--danger)' : 'transparent',
                    color: request.status === 'rejected' ? 'white' : 'var(--danger)',
                    fontWeight: '600',
                    cursor: submitting || request.status === 'rejected' ? 'not-allowed' : 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  Mark Rejected
                </button>
              </div>
            </div>

            <div className="card" style={{ marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>Timeline</h3>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>Created:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> {new Date(request.updatedAt).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> {new Date(request.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. Admin Panel.</p>
      </footer>
    </div>
  )
}
