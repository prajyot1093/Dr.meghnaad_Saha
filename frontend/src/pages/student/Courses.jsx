import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Courses() {
  const { user } = useAuth()
  const [courses] = useState([
    { id: 1, code: 'CS101', name: 'Data Structures', credits: 4, grade: 'A', status: 'completed' },
    { id: 2, code: 'CS201', name: 'Algorithms', credits: 4, grade: 'A+', status: 'completed' },
    { id: 3, code: 'CS301', name: 'Database Systems', credits: 3, grade: 'In Progress', status: 'ongoing' },
    { id: 4, code: 'CS302', name: 'Web Development', credits: 3, grade: '-', status: 'registered' },
  ])

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
          <h1 className="greeting">My Courses</h1>
          <p className="greeting-sub">View your enrolled courses and grades</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Course List</h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Status</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.credits}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        background: course.status === 'completed' ? 'var(--success)' : course.status === 'ongoing' ? 'var(--warning)' : 'var(--primary)',
                        color: 'white',
                        fontSize: '0.875rem',
                      }}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                    <td>{course.grade}</td>
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
