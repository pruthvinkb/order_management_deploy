import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function ProtectedRoute({ children }) {
  return localStorage.getItem('token')
    ? children
    : <Navigate to="/admin" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
