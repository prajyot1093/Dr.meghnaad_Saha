import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Feedback() {
  const { user } = useContext(AuthContext)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    requestId: '',
    rating: 5,
    serviceQuality: 5,
    responseTime: 5,
    overallSatisfaction: 5,
    comments: '',
    wouldRecommend: true
  })

  const recentRequests = [
    { id: 1, ticketId: '#TKT-1000001', title: 'Hostel Change Request', status: 'completed' },
    { id: 2, ticketId: '#TKT-1000002', title: 'Document Issuance', status: 'completed' },
    { id: 3, ticketId: '#TKT-1000003', title: 'Fee Waiver Application', status: 'completed' }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Feedback submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        requestId: '',
        rating: 5,
        serviceQuality: 5,
        responseTime: 5,
        overallSatisfaction: 5,
        comments: '',
        wouldRecommend: true
      })
    }, 2000)
  }

  const renderStars = (value, onChange) => {
    return (
      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.5rem' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: star <= value ? '#fbbf24' : '#d1d5db',
              fontSize: '1.5rem',
              padding: 0
            }}
          >
            ★
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="main-wrapper">
      <main className="main-content">
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Service Feedback</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Help us improve by sharing your feedback about our services
          </p>

          {submitted ? (
            <div style={{
              background: '#dcfce7',
              border: '2px solid #10b981',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              <h2 style={{ color: '#166534', marginBottom: '0.5rem' }}>Thank You!</h2>
              <p style={{ color: '#047857' }}>Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }}>
              {/* Request Selection */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  Which service did you use? *
                </label>
                <select
                  name="requestId"
                  value={formData.requestId}
                  onChange={handleChange}
                  required
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
                  <option value="">Select a completed service...</option>
                  {recentRequests.map(req => (
                    <option key={req.id} value={req.id}>
                      {req.ticketId} - {req.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Sections */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  Overall Rating
                </label>
                <div style={{ marginBottom: '1.5rem' }}>
                  {renderStars(formData.rating, (value) => 
                    setFormData(prev => ({ ...prev, rating: value }))
                  )}
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formData.rating - 1]}
                  </p>
                </div>
              </div>

              {/* Service Quality */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  Service Quality
                </label>
                <div style={{ marginBottom: '1.5rem' }}>
                  {renderStars(formData.serviceQuality, (value) => 
                    setFormData(prev => ({ ...prev, serviceQuality: value }))
                  )}
                </div>
              </div>

              {/* Response Time */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  Response Time
                </label>
                <div style={{ marginBottom: '1.5rem' }}>
                  {renderStars(formData.responseTime, (value) => 
                    setFormData(prev => ({ ...prev, responseTime: value }))
                  )}
                </div>
              </div>

              {/* Comments */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  Additional Comments
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Tell us what you think..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Would Recommend */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="wouldRecommend"
                    checked={formData.wouldRecommend}
                    onChange={handleChange}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  I would recommend this service to other students
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                Submit Feedback
              </button>
            </form>
          )}

          {/* Previous Feedback */}
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Your Recent Feedback</h2>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}>
              {[
                { date: '2026-02-15', service: 'Hostel Change', rating: 5 },
                { date: '2026-02-10', service: 'Document Issuance', rating: 4 },
                { date: '2026-02-05', service: 'Fee Waiver', rating: 5 }
              ].map((feedback, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    borderBottom: idx < 2 ? '1px solid var(--border-color)' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '600', margin: 0 }}>
                      {feedback.service}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
                      {feedback.date}
                    </p>
                  </div>
                  <div style={{ fontSize: '1.2rem' }}>
                    {'★'.repeat(feedback.rating)}
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
