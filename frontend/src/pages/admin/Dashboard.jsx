import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockRequests } from '../../services/mockData'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Get requests from localStorage
  const allRequests = JSON.parse(localStorage.getItem('service-requests') || JSON.stringify(mockRequests))
  const pendingCount = allRequests.filter(r => r.status === 'pending').length
  const inProgressCount = allRequests.filter(r => r.status === 'in-progress').length
  const completedCount = allRequests.filter(r => r.status === 'completed').length
  const totalCount = allRequests.length
  const overallSatisfaction = 4.6

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <a href="#" className="logo">
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
            <button className="btn btn-logout" onClick={logout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="page-header">
          <h1 className="greeting">Admin Dashboard</h1>
          <p className="greeting-sub">System metrics and request management</p>
        </div>

        {/* Key Metrics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Requests</div>
            <div className="stat-value">{totalCount}</div>
            <div className="stat-change positive">Lifetime</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value" style={{ color: '#ef4444' }}>{pendingCount}</div>
            <div className="stat-change">{pendingCount > 0 ? '⚠ Action needed' : 'All clear'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">In Progress</div>
            <div className="stat-value" style={{ color: '#f59e0b' }}>{inProgressCount}</div>
            <div className="stat-change positive">Currently processing</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Completed</div>
            <div className="stat-value" style={{ color: '#10b981' }}>{completedCount}</div>
            <div className="stat-change positive">Success rate: {completedCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>View Requests</h3>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/admin/requests')}
              style={{ width: '100%' }}
            >
              Go to Queue
            </button>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>Manage Users</h3>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/admin/users')}
              style={{ width: '100%' }}
            >
              User List
            </button>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>Analytics</h3>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/admin/analytics')}
              style={{ width: '100%' }}
            >
              View Trends
            </button>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>Export Reports</h3>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/admin/reports')}
              style={{ width: '100%' }}
            >
              Generate
            </button>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Requests</h2>
            <button
              className="btn btn-outline"
              onClick={() => navigate('/admin/requests')}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              View All
            </button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Title</th>
                  <th>Service Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allRequests.slice(0, 5).map(request => (
                  <tr key={request.id}>
                    <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{request.ticketId}</td>
                    <td>{request.title}</td>
                    <td>{request.serviceType}</td>
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
                    <td>
                      <span style={{ color: request.status === 'completed' ? 'var(--success)' : request.status === 'in-progress' ? 'var(--warning)' : 'var(--primary)', fontWeight: '500' }}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
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
                ))}
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
