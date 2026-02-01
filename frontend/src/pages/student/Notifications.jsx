import { useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export default function Notifications() {
  const { user } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Request Approved',
      message: 'Your hostel change request has been approved',
      type: 'success',
      read: false,
      time: '5 mins ago'
    },
    {
      id: 2,
      title: 'New Assignment',
      message: 'Database Systems assignment uploaded',
      type: 'info',
      read: false,
      time: '2 hours ago'
    },
    {
      id: 3,
      title: 'Payment Due',
      message: 'Semester fees payment due on 28th Feb',
      type: 'warning',
      read: true,
      time: '1 day ago'
    },
    {
      id: 4,
      title: 'Grade Posted',
      message: 'Web Development mid-term grades are available',
      type: 'success',
      read: true,
      time: '2 days ago'
    }
  ])
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications

  const getIcon = (type) => {
    const icons = {
      success: '✓',
      info: 'ℹ',
      warning: '⚠',
      error: '✕'
    }
    return icons[type] || 'ℹ'
  }

  const getColor = (type) => {
    const colors = {
      success: '#10b981',
      info: '#3b82f6',
      warning: '#f59e0b',
      error: '#ef4444'
    }
    return colors[type] || '#3b82f6'
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="main-wrapper">
      <main className="main-content">
        <div style={{ padding: '2rem' }}>
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Notifications</h1>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: '8px',
            alignItems: 'center'
          }}>
            <span style={{ color: 'var(--text-secondary)' }}>Filter:</span>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: filter === 'all' ? 'var(--primary)' : 'var(--bg-tertiary)',
                color: filter === 'all' ? 'white' : 'var(--text-primary)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: filter === 'unread' ? 'var(--primary)' : 'var(--bg-tertiary)',
                color: filter === 'unread' ? 'white' : 'var(--text-primary)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Unread
            </button>
          </div>

          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filtered.map(notif => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid var(--border-color)',
                  background: !notif.read ? 'var(--primary-light)' : 'transparent',
                  transition: 'var(--transition)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: getColor(notif.type),
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0,
                    }}
                  >
                    {getIcon(notif.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h3 style={{ color: 'var(--text-primary)', fontWeight: '600', margin: 0 }}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: 'var(--primary)',
                        }} />
                      )}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>
                      {notif.message}
                    </p>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                      {notif.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
