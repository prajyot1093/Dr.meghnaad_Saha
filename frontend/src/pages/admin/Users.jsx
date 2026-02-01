import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Users() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([
    { id: 1, name: 'Raj Kumar', email: 'raj@college.edu', role: 'student', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Priya Singh', email: 'priya@college.edu', role: 'student', status: 'active', joinDate: '2024-01-18' },
    { id: 3, name: 'Admin User', email: 'admin@college.edu', role: 'admin', status: 'active', joinDate: '2023-12-01' },
    { id: 4, name: 'Amit Patel', email: 'amit@college.edu', role: 'student', status: 'inactive', joinDate: '2024-02-01' }
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u))
  }

  return (
    <div className="main-wrapper">
      <main className="main-content">
        <div style={{ padding: '2rem' }}>
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>User Management</h1>

          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{
            overflowX: 'auto',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Role</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Join Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{u.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        background: u.role === 'admin' ? '#fee2e2' : '#dbeafe',
                        color: u.role === 'admin' ? '#991b1b' : '#1e40af'
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        background: u.status === 'active' ? '#dcfce7' : '#f3f4f6',
                        color: u.status === 'active' ? '#166534' : '#6b7280'
                      }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{u.joinDate}</td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: u.status === 'active' ? '#fecaca' : '#86efac',
                          color: u.status === 'active' ? '#7f1d1d' : '#166534',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            Showing {filtered.length} of {users.length} users
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
