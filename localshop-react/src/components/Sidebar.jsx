export default function Sidebar({ onAddProduct, onViewOrders, onLogout,onViewProducts }) {
  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <button onClick={onAddProduct}>➕ Add Product</button>
      <button onClick={onViewOrders}>📦 View Orders</button>
      <button onClick={onViewProducts}> 📦 View Products</button>
      <button onClick={onLogout}>🚪 Logout</button>
    </div>
  )
}
