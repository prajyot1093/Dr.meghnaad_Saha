import express from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Send email notification
router.post('/send-email', verifyToken, async (req, res) => {
  try {
    const { recipientEmail, subject, message, type } = req.body

    if (!recipientEmail || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // In production, use SendGrid, Nodemailer, or AWS SES
    // For now, log to console and emit socket event
    const io = req.app.locals.io
    if (io) {
      io.emit('email-sent', {
        to: recipientEmail,
        subject,
        message,
        type,
        sentAt: new Date(),
        status: 'sent'
      })
    }

    console.log(`[EMAIL] To: ${recipientEmail}, Subject: ${subject}`)

    res.json({
      success: true,
      message: 'Email sent successfully',
      emailId: `EMAIL-${Date.now()}`
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Send notification on status change
router.post('/notify-status-change', verifyToken, async (req, res) => {
  try {
    const { studentEmail, studentName, ticketId, newStatus, adminNotes } = req.body

    const emailTemplate = `
Hello ${studentName},

Your service request has been updated!

Ticket ID: ${ticketId}
New Status: ${newStatus}
Admin Notes: ${adminNotes || 'No additional notes'}

You can view your request status here: https://unified-service.example.com/student/request-details/${ticketId}

Best regards,
Service Management Team
    `

    const io = req.app.locals.io
    if (io) {
      io.emit('status-notification', {
        studentEmail,
        ticketId,
        newStatus,
        timestamp: new Date()
      })
    }

    console.log(`[NOTIFICATION] ${studentName} - Request ${ticketId} status changed to ${newStatus}`)

    res.json({
      success: true,
      message: 'Notification sent successfully'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Send batch notifications
router.post('/send-batch', verifyToken, async (req, res) => {
  try {
    const { recipients, subject, message } = req.body

    if (!recipients || recipients.length === 0 || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const io = req.app.locals.io
    recipients.forEach(recipient => {
      if (io) {
        io.emit('batch-notification', {
          to: recipient.email,
          name: recipient.name,
          subject,
          message,
          sentAt: new Date()
        })
      }
      console.log(`[BATCH EMAIL] To: ${recipient.email}`)
    })

    res.json({
      success: true,
      message: `${recipients.length} notifications sent successfully`,
      notificationId: `BATCH-${Date.now()}`
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
