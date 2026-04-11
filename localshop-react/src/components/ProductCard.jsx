import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  function increase() {
    setQuantity(prev => prev + 1);
  }

  function decrease() {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }

  function handleAdd() {
    onAddToCart(product, quantity);
    setQuantity(1); // reset after adding
  }

  return (
    <div className="product-card">
      
      <img src={product.imageUrl} alt={product.name} />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      {/* Quantity Controls */}
      <div className="qty-box">
        <button onClick={decrease}>-</button>
        <span>{quantity}</span>
        <button onClick={increase}>+</button>
      </div>

      <button className="add-btn" onClick={handleAdd}>
        🛒 Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;