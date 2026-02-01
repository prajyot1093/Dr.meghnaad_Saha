import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login'
import Register from '../pages/Register'
import StudentDashboard from '../pages/student/Dashboard'
import AdminDashboard from '../pages/admin/Dashboard'

// Lazy load student pages
const CreateRequest = lazy(() => import('../pages/student/CreateRequest'))
const MyRequests = lazy(() => import('../pages/student/MyRequests'))
const RequestDetails = lazy(() => import('../pages/student/RequestDetails'))
const Profile = lazy(() => import('../pages/student/Profile'))
const Courses = lazy(() => import('../pages/student/Courses'))
const Payments = lazy(() => import('../pages/student/Payments'))
const Electives = lazy(() => import('../pages/student/Electives'))
const Notifications = lazy(() => import('../pages/student/Notifications'))
const Feedback = lazy(() => import('../pages/student/Feedback'))

// Lazy load admin pages
const AdminRequests = lazy(() => import('../pages/admin/AllRequests'))
const AdminRequestDetails = lazy(() => import('../pages/admin/RequestDetails'))
const AdminUsers = lazy(() => import('../pages/admin/Users'))
const AdminAnalytics = lazy(() => import('../pages/admin/Analytics'))
const AdminReports = lazy(() => import('../pages/admin/Reports'))

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: 'var(--text-secondary)'
  }}>
    <p>Loading...</p>
  </div>
)

// Protected Route Component
function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingFallback />

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
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
    path: '/student/feedback',
    element: (
      <ProtectedRoute>
        <Feedback />
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
