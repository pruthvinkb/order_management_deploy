import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function login() {
    fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})
  .then(res => res.json())
  .then(data => {
   if (data.token) {
    localStorage.setItem("token", data.token)
    toast.success("Login successful ✅")
    setTimeout(() => navigate('/admin/dashboard'), 1000)
  } else {
    toast.error("Login failed")
  }
  })
  .catch(() => toast.error('Login failed'))
  }
 

  return (
    <div className="login-page">
      <div className="login-card">
        <p className="portal-text">✨ ADMIN PORTAL</p>

        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Enter your username"
          className="login-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? '🙈' : '👁'}
          </span>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button className="login-btn" onClick={login}>Login</button>
      </div>
    </div>
  )
}
