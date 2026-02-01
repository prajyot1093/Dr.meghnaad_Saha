import { useAuth } from '../../context/AuthContext'

export default function AdminDashboard() {
  const { user, logout } = useAuth()

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
          <p className="greeting-sub">Manage all service requests and users</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Requests</div>
            <div className="stat-value">1,234</div>
            <div className="stat-change positive">↑ 12% this week</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value">87</div>
            <div className="stat-change">Requires action</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">In Progress</div>
            <div className="stat-value">45</div>
            <div className="stat-change positive">On schedule</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Completion Rate</div>
            <div className="stat-value">98.5%</div>
            <div className="stat-change positive">↑ Excellent</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Pending Requests</h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Student</th>
                  <th>Service Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#REQ-1001</td>
                  <td>John Doe</td>
                  <td>Course Registration</td>
                  <td><span style={{ color: 'var(--danger)' }}>High</span></td>
                  <td><span style={{ color: 'var(--primary)' }}>Pending</span></td>
                  <td><a href="#">Review</a></td>
                </tr>
                <tr>
                  <td>#REQ-1002</td>
                  <td>Jane Smith</td>
                  <td>Transcript Request</td>
                  <td><span style={{ color: 'var(--warning)' }}>Medium</span></td>
                  <td><span style={{ color: 'var(--primary)' }}>Pending</span></td>
                  <td><a href="#">Review</a></td>
                </tr>
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
