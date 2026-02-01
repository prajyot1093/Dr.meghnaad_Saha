import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Reports() {
  const { user } = useContext(AuthContext)
  const [reportType, setReportType] = useState('requests')
  const [dateRange, setDateRange] = useState('month')
  const [generating, setGenerating] = useState(false)

  const reportOptions = [
    { id: 'requests', label: 'Service Requests Report', icon: '📋' },
    { id: 'users', label: 'User Activity Report', icon: '👥' },
    { id: 'performance', label: 'Performance Metrics', icon: '📊' },
    { id: 'satisfaction', label: 'Satisfaction Survey', icon: '⭐' }
  ]

  const dateRanges = [
    { id: 'week', label: 'Last 7 days' },
    { id: 'month', label: 'Last 30 days' },
    { id: 'quarter', label: 'Last Quarter' },
    { id: 'year', label: 'Last Year' },
    { id: 'custom', label: 'Custom Range' }
  ]

  const handleGenerateReport = async (format) => {
    setGenerating(true)
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Generated ${reportType} report in ${format} format for ${dateRange}`)
      alert(`Report generated successfully!\n\nReport: ${reportOptions.find(r => r.id === reportType)?.label}\nFormat: ${format.toUpperCase()}\nPeriod: ${dateRanges.find(d => d.id === dateRange)?.label}`)
    } catch (error) {
      alert('Error generating report')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="main-wrapper">
      <main className="main-content">
        <div style={{ padding: '2rem' }}>
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Generate Reports</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Report Selection */}
            <div>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Select Report Type</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {reportOptions.map(option => (
                  <div
                    key={option.id}
                    onClick={() => setReportType(option.id)}
                    style={{
                      padding: '1.5rem',
                      borderRadius: '8px',
                      background: reportType === option.id ? 'var(--primary-light)' : 'var(--bg-secondary)',
                      border: `2px solid ${reportType === option.id ? 'var(--primary)' : 'var(--border-color)'}`,
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{option.icon}</span>
                    <div>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '600', margin: 0 }}>
                        {option.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range & Export */}
            <div>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Report Settings</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                >
                  {dateRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.label}</option>
                  ))}
                </select>
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
                  Export as
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button
                    onClick={() => handleGenerateReport('pdf')}
                    disabled={generating}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: generating ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'var(--transition)',
                      opacity: generating ? 0.6 : 1
                    }}
                  >
                    📄 PDF
                  </button>
                  <button
                    onClick={() => handleGenerateReport('csv')}
                    disabled={generating}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#16a34a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: generating ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'var(--transition)',
                      opacity: generating ? 0.6 : 1
                    }}
                  >
                    📊 CSV
                  </button>
                </div>
                {generating && (
                  <p style={{ color: 'var(--primary)', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                    Generating report...
                  </p>
                )}
              </div>

              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: '#eff6ff',
                borderRadius: '6px',
                border: '1px solid #bfdbfe',
                color: '#1e40af',
                fontSize: '0.85rem'
              }}>
                <strong>Info:</strong> Reports are generated on-demand and include all data from the selected period.
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div style={{
            marginTop: '3rem',
            background: 'var(--bg-secondary)',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Recently Generated Reports</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Report</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Generated By</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Format</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { report: 'Service Requests', by: 'Admin User', date: '2026-02-20', format: 'PDF' },
                    { report: 'User Activity', by: 'Admin User', date: '2026-02-18', format: 'CSV' },
                    { report: 'Performance Metrics', by: 'Admin User', date: '2026-02-15', format: 'PDF' }
                  ].map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{item.report}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.by}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.date}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          background: item.format === 'PDF' ? '#fee2e2' : '#dcfce7',
                          color: item.format === 'PDF' ? '#991b1b' : '#166534'
                        }}>
                          {item.format}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button style={{
                          padding: '0.5rem 1rem',
                          background: 'var(--primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}>
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
