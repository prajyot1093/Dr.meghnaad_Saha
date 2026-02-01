import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login'
import Register from '../pages/Register'
import StudentDashboard from '../pages/student/Dashboard'
import AdminDashboard from '../pages/admin/Dashboard'
import CreateRequest from '../pages/student/CreateRequest'
import MyRequests from '../pages/student/MyRequests'
import RequestDetails from '../pages/student/RequestDetails'

// Protected Route Component
function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/student/dashboard',
    element: (
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/requests',
    element: (
      <ProtectedRoute>
        <MyRequests />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/create-request',
    element: (
      <ProtectedRoute>
        <CreateRequest />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/request-details/:id',
    element: (
      <ProtectedRoute>
        <RequestDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
])
