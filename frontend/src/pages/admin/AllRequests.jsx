import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockRequests } from '../../services/mockData'

export default function AdminRequests() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Get all requests (would come from backend in real app)
  const allRequests = JSON.parse(localStorage.getItem('service-requests') || JSON.stringify(mockRequests))

  // Apply filters and sorting
  let filteredRequests = statusFilter === 'all'
    ? allRequests
    : allRequests.filter(r => r.status === statusFilter)

  if (sortBy === 'newest') {
    filteredRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (sortBy === 'oldest') {
    filteredRequests.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  } else if (sortBy === 'priority-high') {
    const priorityMap = { high: 0, medium: 1, low: 2 }
    filteredRequests.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority])
  }

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
        <div className="page-header">
          <h1 className="greeting">All Service Requests</h1>
          <p className="greeting-sub">Manage and process student service requests</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Request Queue ({filteredRequests.length})</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority-high">Priority (High First)</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Student</th>
                  <th>Service Type</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created</th>
                  <th>Due</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map(request => (
                    <tr key={request.id}>
                      <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                        {request.ticketId}
                      </td>
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
                      <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                      <td>{new Date(request.dueDate).toLocaleDateString()}</td>
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
                          onClick={() => navigate(`/admin/request-details/${request.id}`)}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
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
        <p>&copy; 2026 Unified Service Management Portal. Admin Panel.</p>
      </footer>
    </div>
  )
}
