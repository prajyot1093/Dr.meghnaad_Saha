import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Payments() {
  const { user } = useAuth()
  const [payments] = useState([
    { id: 1, semester: 'Spring 2026', amount: 5000, status: 'pending', dueDate: '2026-02-15' },
    { id: 2, semester: 'Fall 2025', amount: 5000, status: 'paid', dueDate: '2025-08-15' },
    { id: 3, semester: 'Spring 2025', amount: 5000, status: 'paid', dueDate: '2025-02-15' },
  ])

  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

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
          <h1 className="greeting">Fee Payments</h1>
          <p className="greeting-sub">Track your semester fee payments</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Paid</div>
            <div className="stat-value">$10,000</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value">${totalPending}</div>
            <div className="stat-change">Due soon</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Payment History</h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.semester}</td>
                    <td>${payment.amount}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        background: payment.status === 'paid' ? 'var(--success)' : 'var(--danger)',
                        color: 'white',
                        fontSize: '0.875rem',
                      }}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td>{payment.dueDate}</td>
                  </tr>
                ))}
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
