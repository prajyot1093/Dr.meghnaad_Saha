// Request routes for managing service requests
import express from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Get all requests for a student
router.get('/my-requests', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    // In production, fetch from Firestore
    // const requests = await db.collection('requests').where('userId', '==', userId).get()
    
    res.json({
      success: true,
      requests: [],
      message: 'Requests retrieved successfully'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new service request
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { title, serviceType, description, priority, attachments } = req.body
    const userId = req.user.uid

    // Validate required fields
    if (!title || !serviceType || !description) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // In production, save to Firestore
    // const newRequest = await db.collection('requests').add({
    //   title,
    //   serviceType,
    //   description,
    //   priority,
    //   userId,
    //   status: 'pending',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })

    const ticketId = `#TKT-${Date.now()}`
    
    // Emit real-time event to all connected clients
    const io = req.app.locals.io
    if (io) {
      io.emit('new-request', {
        ticketId,
        title,
        serviceType,
        userId,
        createdAt: new Date()
      })
    }

    res.json({
      success: true,
      message: 'Request created successfully',
      ticketId
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get request details
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    // In production, fetch from Firestore
    
    res.json({
      success: true,
      request: {}
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update request
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    // In production, update in Firestore
    
    // Emit real-time event
    const io = req.app.locals.io
    if (io) {
      io.emit('request-updated', {
        id,
        ...updates,
        updatedAt: new Date()
      })
    }
    
    res.json({
      success: true,
      message: 'Request updated successfully'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default router
