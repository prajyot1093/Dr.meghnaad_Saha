import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { serviceTypes } from '../../services/mockData'
import '../../styles/forms.css'

export default function CreateRequest() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    serviceType: '',
    description: '',
    priority: 'medium',
    attachments: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulate API call
      const newRequest = {
        id: `REQ-${Date.now()}`,
        ticketId: `#TKT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000)}`,
        ...formData,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: user.uid,
      }

      // Save to localStorage for now
      const requests = JSON.parse(localStorage.getItem('service-requests') || '[]')
      requests.push(newRequest)
      localStorage.setItem('service-requests', JSON.stringify(requests))

      navigate('/student/requests')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
          <div className="nav-right">
            <div className="user-menu">
              <div className="user-avatar">{user?.displayName?.charAt(0) || 'U'}</div>
              <span className="user-name">{user?.displayName || 'User'}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="page-header">
          <h1 className="greeting">Create Service Request</h1>
          <p className="greeting-sub">Submit a new service ticket</p>
        </div>

        <div className="card form-card" style={{ maxWidth: '600px' }}>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Request Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="Brief title for your request"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Service Type *</label>
              <select
                name="serviceType"
                className="form-input"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select a service type</option>
                {serviceTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              {formData.serviceType && (
                <p className="form-hint">
                  {serviceTypes.find(t => t.id === formData.serviceType)?.description}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                className="form-input"
                placeholder="Provide detailed information about your request..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <div className="priority-options">
                {['low', 'medium', 'high'].map(level => (
                  <label key={level} className="priority-label">
                    <input
                      type="radio"
                      name="priority"
                      value={level}
                      checked={formData.priority === level}
                      onChange={handleChange}
                    />
                    <span className={`priority-badge priority-${level}`}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Attachments (Optional)</label>
              <input
                type="file"
                multiple
                className="form-input"
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files) }))
                }}
              />
              <p className="form-hint">You can attach up to 5 files (PDF, images, documents)</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/student/requests')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Unified Service Management Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
