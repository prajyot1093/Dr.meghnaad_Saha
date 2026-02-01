import io from 'socket.io-client'

const SOCKET_URL = process.env.VITE_API_URL || 'http://localhost:5000'

let socket = null

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      autoConnect: true
    })

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('error', (error) => {
      console.error('Socket error:', error)
    })
  }

  return socket
}

export const getSocket = () => socket || initSocket()

export const joinRoom = (userId) => {
  const socket = getSocket()
  socket.emit('join', { userId })
}

export const subscribeToRequestUpdates = (callback) => {
  const socket = getSocket()
  socket.on('request-updated', callback)
  return () => socket.off('request-updated', callback)
}

export const subscribeToNewNotification = (callback) => {
  const socket = getSocket()
  socket.on('new-notification', callback)
  return () => socket.off('new-notification', callback)
}

export const subscribeToStatusChange = (callback) => {
  const socket = getSocket()
  socket.on('status-changed', callback)
  return () => socket.off('status-changed', callback)
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
