import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Analytics() {
  const { user } = useContext(AuthContext)
  const [metrics] = useState({
    totalRequests: 1247,
    completedRequests: 892,
    averageResolutionTime: '2.3 days',
    totalUsers: 3421,
    activeUsers: 2156,
    satisfactionScore: '4.6/5'
  })

  const [serviceMetrics] = useState([
    { service: 'Hostel Change', requests: 156, completed: 142, avgTime: '1.8 days' },
    { service: 'Fee Waiver', requests: 89, completed: 67, avgTime: '4.2 days' },
    { service: 'Document Issue', requests: 234, completed: 234, avgTime: '0.5 days' },
    { service: 'Leave Request', requests: 421, completed: 398, avgTime: '1.2 days' },
    { service: 'Course Change', requests: 212, completed: 178, avgTime: '3.1 days' },
    { service: 'Other', requests: 135, completed: 98, avgTime: '2.5 days' }
  ])

  const [trends] = useState([
    { month: 'Jan', requests: 89, completed: 72 },
    { month: 'Feb', requests: 156, completed: 134 },
    { month: 'Mar', requests: 198, completed: 178 },
    { month: 'Apr', requests: 234, completed: 212 },
    { month: 'May', requests: 287, completed: 268 },
    { month: 'Jun', requests: 283, completed: 228 }
  ])

  return (
    <div className="main-wrapper">
      <main className="main-content">
        <div style={{ padding: '2rem' }}>
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Analytics & Reports</h1>

          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { label: 'Total Requests', value: metrics.totalRequests, color: '#3b82f6' },
              { label: 'Completed', value: metrics.completedRequests, color: '#10b981' },
              { label: 'Avg Resolution', value: metrics.averageResolutionTime, color: '#f59e0b' },
              { label: 'Active Users', value: metrics.activeUsers, color: '#8b5cf6' },
              { label: 'Satisfaction', value: metrics.satisfactionScore, color: '#ec4899' }
            ].map((metric, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: `3px solid ${metric.color}`,
                  textAlign: 'center'
                }}
              >
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                  {metric.label}
                </p>
                <h2 style={{ color: metric.color, margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>
                  {metric.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Service-wise Breakdown */}
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '2rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: '1px solid var(--border-color)'
          }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Service-wise Breakdown</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Service</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-primary)' }}>Requests</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-primary)' }}>Completed</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-primary)' }}>Completion %</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-primary)' }}>Avg Time</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceMetrics.map((metric, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{metric.service}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        {metric.requests}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        {metric.completed}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          background: '#dcfce7',
                          color: '#166534',
                          fontSize: '0.9rem'
                        }}>
                          {Math.round((metric.completed / metric.requests) * 100)}%
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        {metric.avgTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Trends */}
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Monthly Trends</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {trends.map((trend, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1.5rem',
                  borderRadius: '6px',
                  textAlign: 'center',
                  border: '1px solid var(--border-color)'
                }}>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                    {trend.month}
                  </p>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '1.4rem', color: '#3b82f6', fontWeight: 'bold' }}>
                      {trend.requests}
                    </div>
                    <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                      Requests
                    </p>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', color: '#10b981', fontWeight: 'bold' }}>
                      {trend.completed}
                    </div>
                    <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                      Completed
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
