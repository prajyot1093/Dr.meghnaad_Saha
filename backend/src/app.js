import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import requestRoutes from './routes/requests.js'
import adminRoutes from './routes/admin.js'
import notificationRoutes from './routes/notifications.js'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize Express app
const app = express()

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/requests', requestRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/notifications', notificationRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

export default app
