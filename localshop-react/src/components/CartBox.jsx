function CartBox({ cart, onRemove }) {

  // total calculation
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <p style={{ textAlign: "center" }}>🛒 Cart is empty</p>;
  }

  return (
    <div className="cart-container">

      <h3>🛒 Your Cart</h3>

      {cart.map((item, index) => (
        <div className="cart-item" key={index}>

          <div>
            <b>{item.name}</b><br />
            ₹{item.price} × {item.quantity}
          </div>

          <div>
            ₹{item.price * item.quantity}
          </div>

          <button className="remove-btn" onClick={() => onRemove(item.name)}>
            ❌
          </button>

        </div>
      ))}

      <hr />

      <h3>Total: ₹{total}</h3>

    </div>
  );
}

export default CartBox;