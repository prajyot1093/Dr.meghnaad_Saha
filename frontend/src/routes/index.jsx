import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login'
import Register from '../pages/Register'
import StudentDashboard from '../pages/student/Dashboard'
import AdminDashboard from '../pages/admin/Dashboard'
import CreateRequest from '../pages/student/CreateRequest'
import MyRequests from '../pages/student/MyRequests'
import RequestDetails from '../pages/student/RequestDetails'
import Profile from '../pages/student/Profile'
import Courses from '../pages/student/Courses'
import Payments from '../pages/student/Payments'
import Electives from '../pages/student/Electives'
import Notifications from '../pages/student/Notifications'
import AdminRequests from '../pages/admin/AllRequests'
import AdminRequestDetails from '../pages/admin/RequestDetails'
import AdminUsers from '../pages/admin/Users'
import AdminAnalytics from '../pages/admin/Analytics'
import AdminReports from '../pages/admin/Reports'

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
    path: '/student/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/courses',
    element: (
      <ProtectedRoute>
        <Courses />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/payments',
    element: (
      <ProtectedRoute>
        <Payments />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/electives',
    element: (
      <ProtectedRoute>
        <Electives />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/notifications',
    element: (
      <ProtectedRoute>
        <Notifications />
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
    path: '/admin/requests',
    element: (
      <ProtectedRoute>
        <AdminRequests />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/request-details/:id',
    element: (
      <ProtectedRoute>
        <AdminRequestDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute>
        <AdminUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <ProtectedRoute>
        <AdminAnalytics />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <ProtectedRoute>
        <AdminReports />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
])
