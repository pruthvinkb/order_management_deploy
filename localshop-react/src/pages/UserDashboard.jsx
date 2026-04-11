import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import ProductCard from '../components/ProductCard'
import CartBox from '../components/CartBox'
import Navbar from '../components/Navbar'
import AboutPage from '../components/AboutPage'

export default function UserDashboard() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [view, setView] = useState('home')

   function removeFromCart(productName) {
    setCart(prev => prev.filter(item => item.name !== productName))
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then(data => setProducts(data))
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

function addToCart(product, quantity) {
  setCart(prev => {
    const existing = prev.find(item => item.name === product.name)

    if (existing) {
      return prev.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      return [
        ...prev,
        {
          name: product.name,
          quantity: quantity,
          price: product.price
        }
      ]
    }
  })
}

  function handlePhoneBlur() {
    if (!phone) return
    fetch(`${import.meta.env.VITE_API_URL}/customer/phone/${phone}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          setName(data.name)
          setAddress(data.address)
        }
      })
      .catch(() => {})
  }

  function submitOrder() {
    const items = cart.map(item => `${item.name} x ${item.quantity}`).join(', ')
    const order = { customerName: name, customerPhone: phone, customerAddress: address, items }

    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
      .then(res => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then(() => {
        // save customer for future auto-fill
        fetch(`${import.meta.env.VITE_API_URL}/customer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, address })
        }).catch(() => {})

        toast.success('Order placed successfully!')
        setCart([])
        setShowOrderForm(false)
      })
  }

  if (view === 'about') {
    return <AboutPage onBack={() => setView('home')} />
  }

  return (
   <div>
    <Navbar
      onShowHome={() => setView('home')}
      onShowAbout={() => setView('about')}
    />
    <div className="container">
      <div className="layout">

        {/* LEFT SIDE */}
        <div className="left">
          <div className="hero">
            <h1>🛒 Welcome to Local Shop</h1>
            <p>Buy daily essentials at best price</p>
          </div>

          {loading && <div className="loader"></div>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          {/* HOME VIEW */}
          {view === 'home' && (
            <>
              <h2>🛍️ Products</h2>
              {products.length === 0 && !loading && (
                <div className="empty-box">🛒 No products available right now</div>
              )}
              <div id="product-list">
                {!loading && products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
              <p className="info-text">Select quantity and add to cart</p>
            </>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <h2>Your Cart</h2>

          <CartBox cart={cart} onRemove={removeFromCart} />

          {cart.length > 0 && (
            <button
              className="order-btn"
              onClick={() => setShowOrderForm(prev => !prev)}
            >
              📝 Place Order
            </button>
          )}

          {showOrderForm && (
            <div id="order-form" className="order-box">
              <h2>Enter Details</h2>
              <input type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} /><br />
              <input type="text" placeholder="Enter Phone" value={phone} onChange={e => setPhone(e.target.value)} onBlur={handlePhoneBlur} /><br />
              <input type="text" placeholder="Enter Address" value={address} onChange={e => setAddress(e.target.value)} /><br />
              <button onClick={submitOrder}>Submit Order</button>
            </div>
          )}
        </div>

      </div>

      <footer>
        <p>© 2026 Local Shop | Built by You 🚀</p>
      </footer>
    </div>
  </div>
  )
}

