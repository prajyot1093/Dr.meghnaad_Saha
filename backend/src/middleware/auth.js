// Authentication middleware
import { auth } from '../services/firebase/admin.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token', message: error.message })
  }
}

export const verifyAdmin = async (req, res, next) => {
  try {
    // In production, check Firestore user document for admin role
    const isAdmin = req.user?.email?.includes('admin')
    
    if (!isAdmin) {
      return res.status(403).json({ error: 'Admin access required' })
    }
    next()
  } catch (error) {
    res.status(403).json({ error: 'Authorization failed' })
  }
}
