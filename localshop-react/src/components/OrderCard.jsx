export default function OrderCard({ order, onUpdate }) {
const statusClass = order.status?.toLowerCase()
  return (
    <div className="order-card">
      <p><b>Name:</b> {order.customerName}</p>
      <p><b>Phone:</b> {order.customerPhone}</p>
      <p><b>Address:</b> {order.customerAddress}</p>
      <p><b>Items:</b> {order.items}</p>
      <p className={`status ${statusClass}`}>Status: {order.status}</p>
     <button onClick={() => onUpdate(order.id, "Delivered")}>
  Deliver ✅
</button>

<button onClick={() => onUpdate(order.id, "Cancelled")}>
  Cancel ❌
</button>

<button onClick={() => onUpdate(order.id, "Rejected")}>
  Reject 🚫
</button>
     
    </div>
  )
}
