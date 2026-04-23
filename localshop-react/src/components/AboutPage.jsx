import { useNavigate } from 'react-router-dom'

export default function AboutPage({ onBack }) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="navbar">
        <h2>🛒 Local Shop</h2>
        <div className="nav-buttons">
          <button onClick={onBack}>🏠 Home</button>
          <button onClick={() => navigate('/admin')}>🔐 Admin</button>
        </div>
      </div>

      <div className="about-page">
        <div className="about-card">
          <h1>🛒 About Local Shop</h1>
          <p>Local Shop is a full-stack web application that lets customers browse products and place orders easily — no login required.</p>

          <div className="about-details">
            <div className="about-item">
              <span>📦</span>
              <div>
                <h3>Browse Products</h3>
                <p>View all available daily essentials with prices and images.</p>
              </div>
            </div>
            <div className="about-item">
              <span>🛒</span>
              <div>
                <h3>Add to Cart</h3>
                <p>Select quantity and add products to your cart instantly.</p>
              </div>
            </div>
            <div className="about-item">
              <span>📞</span>
              <div>
                <h3>Auto-fill by Phone</h3>
                <p>Enter your phone number and your details auto-fill from previous orders.</p>
              </div>
            </div>
            <div className="about-item">
              <span>🔐</span>
              <div>
                <h3>Admin Panel</h3>
                <p>Admins can manage products and track orders with JWT-secured login.</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <p>🛠️ Built with <strong>React.js + Spring Boot + MySQL</strong></p>
            <p>🚀 Made with passion for learning and real-world problem solving</p>
          </div>

          <button className="order-btn" style={{ marginTop: '20px', width: 'auto', padding: '10px 30px' }} onClick={onBack}>
            ← Back to Shop
          </button>
        </div>
      </div>
    </div>
  )
}
