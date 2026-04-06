const productList=document.querySelector("#product-list");
const cartDiv = document.getElementById("cart");
let cart = [];
fetch("http://localhost:8080/products")
.then(response => response.json())
.then(data=>{
    data.forEach(product=>{
        const card=document.createElement("div");
        card.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>

          <div class="qty-box">
            <button onclick="changeQty(this, -1)">-</button>
            <span class="qty">1</span>
            <button onclick="changeQty(this, 1)">+</button>
          </div>

          <button onclick="addToCart(this, '${product.name}')">🛒 Add to Cart</button>
        `;
        productList.appendChild(card);
    });
});

function submitOrder() {
    const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const address = document.getElementById("address").value;

 const items = cart.map(item => item.name + " x " + item.quantity).join(", ");

const order = {
    customerName: name,
    customerPhone: phone,
    customerAddress: address,
    items: items
  };

  fetch("http://localhost:8080/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
  .then(res => res.json())
  .then(data => {
    alert("Order placed successfully!");
    console.log(data);
  });
}


// ================= TOGGLE ORDER FORM =================
function toggleOrderForm() {
  const form = document.getElementById("order-form");

  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}
function updateCartUI() {
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p style='color:gray;'>🛒 Cart is empty</p>";
    return;
  }

  cart.forEach(item => {
    const p = document.createElement("p");
    p.textContent = item.name + " x " + item.quantity;
    cartDiv.appendChild(p);
  });
}

// ================= CHANGE QUANTITY =================
function changeQty(btn, value) {
  const qtySpan = btn.parentElement.querySelector(".qty");
  let qty = parseInt(qtySpan.innerText);

  qty += value;
  if (qty < 1) qty = 1;

  qtySpan.innerText = qty;
}

// ================= ADD TO CART =================
function addToCart(btn, productName) {
  const card = btn.parentElement;
  const qty = parseInt(card.querySelector(".qty").innerText);

  cart.push({
    name: productName,
    quantity: qty
  });

  updateCartUI();

  btn.innerText = "✅ Added";
  setTimeout(() => {
    btn.innerText = "🛒 Add to Cart";
  }, 1000);
}
