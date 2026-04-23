export default function Navbar({ onShowHome, onShowAbout }) {
  return (
    <div className="navbar">
      <h2>🛒 Local Shop</h2>
      <div className="nav-buttons">
        <button onClick={onShowHome}>🏠 Home</button>
        <button onClick={onShowAbout}>ℹ️ About</button>
        <a href="/admin" className="nav-admin-btn">🔐 Admin</a>
      </div>
    </div>
  )
}
