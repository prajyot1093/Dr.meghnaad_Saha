import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)

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
        </div>
      </nav>

      <main className="main-content">
        <div className="page-header">
          <h1 className="greeting">My Profile</h1>
          <p className="greeting-sub">View and manage your account information</p>
        </div>

        <div className="card" style={{ maxWidth: '600px' }}>
          <div className="card-header">
            <h2 className="card-title">Profile Information</h2>
            <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div style={{ padding: '1.5rem 0' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" defaultValue={user?.displayName || ''} disabled={!editing} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Email</label>
              <input type="email" className="form-input" defaultValue={user?.email || ''} disabled />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Student ID</label>
              <input type="text" className="form-input" defaultValue="STU-2026-001" disabled />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Program</label>
              <input type="text" className="form-input" defaultValue="B.Tech Computer Science" disabled={!editing} />
            </div>
            {editing && (
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Save Changes
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
