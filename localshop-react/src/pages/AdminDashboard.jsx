import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import OrderCard from '../components/OrderCard'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [pname, setPname] = useState('')
  const [pimage, setPimage] = useState('')
  const [pprice, setPprice] = useState('')
  const [products, setProducts] = useState([])
  const[view,setView]=useState('')// this state for view products and hide orders when click on view products button
  const [selectedProduct, setSelectedProduct] =useState(null) // this state for edit product and show product details in form when click on edit button of product card 
 const [isEditing, setIsEditing] = useState(false) // this state for edit product and show update button instead of submit button when click on edit button of product card
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/admin')
    }
  }, [])

  const API = import.meta.env.VITE_API_URL

  function safeId(id) {
    const n = parseInt(id)
    if (isNaN(n) || n <= 0) throw new Error('Invalid ID')
    return n
  }

  function loadOrders() {
    setLoading(true)
    fetch(`${API}/orders`)
      .then(res => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then(data => { setOrders(data); setView('orders') })
      .catch(() => { toast.error('Failed to load orders'); navigate('/admin') })
      .finally(() => setLoading(false))
  }

  function loadProducts() {
    setLoading(true)
    fetch(`${API}/products`)
      .then(res => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then(data => { setProducts(data); setView('products') })
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false))
  }

  function handleEdit(product) {
    setSelectedProduct(product)
    setIsEditing(true)
    setPname(product.name)
    setPimage(product.imageUrl)
    setPprice(product.price)
    setShowProductForm(true)
  }

  function markDelivered(id) {
    try {
      const safeOrderId = safeId(id)
      fetch(`${API}/orders/${safeOrderId}/status`, { method: 'PUT' })
        .then(res => res.json())
        .then(() => { toast.success('Order marked as Delivered!'); loadOrders() })
        .catch(() => toast.error('Failed to update order'))
    } catch { toast.error('Invalid order ID') }
  }

  function addProduct() {
    if (!pname || !pimage || !pprice) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    const productData = { name: pname, imageUrl: pimage, price: pprice }

    if (isEditing) {
      try {
        const safeProductId = safeId(selectedProduct.id)
        fetch(`${API}/products/${safeProductId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
          .then(res => res.json())
          .then(() => { toast.success('Product updated successfully!'); resetForm(); loadProducts() })
          .catch(() => toast.error('Failed to update product'))
          .finally(() => setLoading(false))
      } catch { toast.error('Invalid product ID'); setLoading(false) }
    } else {
      fetch(`${API}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
        .then(res => res.json())
        .then(() => { toast.success('Product added successfully!'); resetForm(); loadProducts() })
        .catch(() => toast.error('Failed to add product'))
        .finally(() => setLoading(false))
    }
  }

  function resetForm() {
    setPname('')
    setPimage('')
    setPprice('')
    setSelectedProduct(null)
    setIsEditing(false)
    setShowProductForm(false)
  }

  function deleteProduct(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      const safeProductId = safeId(id)
      setLoading(true)
      fetch(`${API}/products/${safeProductId}`, { method: 'DELETE' })
        .then(() => { toast.success('Product deleted successfully!'); loadProducts() })
        .catch(() => toast.error('Failed to delete product'))
        .finally(() => setLoading(false))
    } catch { toast.error('Invalid product ID') }
  }

  function logout() {
    localStorage.removeItem('isAdmin')
    navigate('/admin')
  }

  function updateOrderStatus(id, status) {
    try {
      const safeOrderId = safeId(id)
      setLoading(true)
      fetch(`${API}/orders/${safeOrderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
        .then(res => res.json())
        .then(() => { toast.success(`Order marked as ${status}`); loadOrders() })
        .catch(() => toast.error('Failed to update status'))
        .finally(() => setLoading(false))
    } catch { toast.error('Invalid order ID') }
  }
  return (
    <div className="dashboard">
      <Sidebar
        onAddProduct={() => {
          setShowProductForm(true)
          setView('')
        }}
        onViewOrders={() => {
          setShowProductForm(false)
          loadOrders()
        }}
        onViewProducts={() => {
          setShowProductForm(false)
          loadProducts()
        }}
        onLogout={logout}
      />

      <div className="main-content">
        <h1>🛒 Admin Dashboard</h1>
        {loading && <div className="loader"></div>}

        {showProductForm && (
          <div className="card">
            <h3>Add Product</h3>
            <input type="text" placeholder="Product Name" value={pname} onChange={e => setPname(e.target.value)} /><br /><br />
            <input type="text" placeholder="Image URL" value={pimage} onChange={e => setPimage(e.target.value)} /><br /><br />
            <input type="number" placeholder="Price" value={pprice} onChange={e => setPprice(e.target.value)} /><br /><br />
            <button onClick={addProduct}>
              {isEditing ? "Update Product ✏️" : "Add Product ➕"}
            </button>
          </div>
        )}
{/* Conditional rendering based on the current view state */}
       {view === 'orders' && (
  <div id="order-list">
    {orders.length === 0 && !loading && (
      <div className="empty-box">📭 No orders yet</div>
    )}
    {orders.map(order => (
      <OrderCard
        key={order.id}
        order={order}
        onUpdate={updateOrderStatus}
      />
    ))}
  </div>
)}

{view === 'products' && (
  <div id="product-list">
    {products.length === 0 && !loading && (
      <div className="empty-box">📦 No products available</div>
    )}
    {products.map(product => (
      <div key={product.id} className="product-card">
        <img src={product.imageUrl} width="120" />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <button onClick={() => handleEdit(product)}>Edit ✏️</button>
        <button onClick={() => deleteProduct(product.id)}>Delete ❌</button>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  )
}
