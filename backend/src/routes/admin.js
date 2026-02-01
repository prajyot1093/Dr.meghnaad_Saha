// Admin routes for managing requests and users
import express from 'express'
import { verifyToken, verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all requests (admin only)
router.get('/requests', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // In production, fetch from Firestore with filtering
    res.json({
      success: true,
      requests: [],
      total: 0
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update request status (admin only)
router.put('/requests/:id/status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { status, notes } = req.body

    if (!['pending', 'in-progress', 'completed', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    // In production, update in Firestore
    
    res.json({
      success: true,
      message: 'Request status updated successfully'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get admin dashboard stats
router.get('/stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    res.json({
      success: true,
      stats: {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
