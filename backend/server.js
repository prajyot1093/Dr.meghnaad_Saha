import app from './src/app.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000
const httpServer = createServer(app)

// Socket.io setup for real-time updates
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

// Real-time connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Export io for use in routes
app.locals.io = io

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})
