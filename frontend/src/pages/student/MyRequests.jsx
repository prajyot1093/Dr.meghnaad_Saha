import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockRequests } from '../../services/mockData'

export default function MyRequests() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [statusFilter, setStatusFilter] = useState('all')

  // Get requests from localStorage or use mock data
  const allRequests = JSON.parse(localStorage.getItem('service-requests') || JSON.stringify(mockRequests))
  const filteredRequests = statusFilter === 'all' 
    ? allRequests 
    : allRequests.filter(r => r.status === statusFilter)

  const getStatusColor = (status) => {
    const colors = {
      pending: 'var(--primary)',
      'in-progress': 'var(--warning)',
      completed: 'var(--success)',
      rejected: 'var(--danger)',
    }
    return colors[status] || 'var(--text-secondary)'
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
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="greeting">My Service Requests</h1>
            <p className="greeting-sub">Track and manage your submitted requests</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/student/create-request')}
          >
            + New Request
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Service Tickets</h2>
            <div className="filter-options" style={{ display: 'flex', gap: '0.5rem' }}>
              {['all', 'pending', 'in-progress', 'completed'].map(status => (
                <button
                  key={status}
                  className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    background: statusFilter === status ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                    color: statusFilter === status ? 'var(--primary)' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Title</th>
                  <th>Service Type</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map(request => (
                    <tr key={request.id}>
                      <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{request.ticketId}</td>
                      <td>{request.title}</td>
                      <td>{request.serviceType}</td>
                      <td>
                        <span style={{ color: getStatusColor(request.status), fontWeight: '500' }}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '4px',
                          background: request.priority === 'high' ? 'var(--danger)' : request.priority === 'medium' ? 'var(--warning)' : 'var(--success)',
                          color: 'white',
                          fontSize: '0.875rem',
                        }}>
                          {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                        </span>
                      </td>
                      <td>{request.createdAt.toLocaleDateString()}</td>
                      <td>
                        <button
                          style={{
                            color: 'var(--primary)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                          }}
                          onClick={() => navigate(`/student/request-details/${request.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                      No requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
