import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Electives() {
  const { user } = useAuth()
  const [available] = useState([
    { id: 1, code: 'CS401', name: 'Machine Learning', credits: 3, instructor: 'Dr. Smith', seats: 5 },
    { id: 2, code: 'CS402', name: 'Cloud Computing', credits: 3, instructor: 'Dr. Johnson', seats: 3 },
    { id: 3, code: 'CS403', name: 'Cybersecurity', credits: 3, instructor: 'Dr. Williams', seats: 8 },
  ])
  const [selected, setSelected] = useState([])

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
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
        </div>
      </nav>

      <main className="main-content">
        <div className="page-header">
          <h1 className="greeting">Select Electives</h1>
          <p className="greeting-sub">Choose optional courses for next semester</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Available Electives ({selected.length}/3 selected)</h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Instructor</th>
                  <th>Available Seats</th>
                </tr>
              </thead>
              <tbody>
                {available.map(course => (
                  <tr key={course.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(course.id)}
                        onChange={() => toggleSelect(course.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.credits}</td>
                    <td>{course.instructor}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        background: course.seats > 5 ? 'var(--success)' : 'var(--warning)',
                        color: 'white',
                        fontSize: '0.875rem',
                      }}>
                        {course.seats}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selected.length > 0 && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button className="btn btn-primary">
                Submit Selection ({selected.length}/3)
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
