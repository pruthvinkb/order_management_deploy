// ================= LOAD ORDERS =================
function loadOrders() {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = ""; // clear old data

  fetch("http://localhost:8080/orders")
    .then(res => res.json())
    .then(data => {
      data.forEach(order => {
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-card");

        const statusClass = order.status === "Delivered" ? "delivered" : "pending";

        orderItem.innerHTML = `
          <p><b>Name:</b> ${order.customerName}</p>
          <p><b>Phone:</b> ${order.customerPhone}</p>
          <p><b>Address:</b> ${order.customerAddress}</p>
          <p><b>Items:</b> ${order.items}</p>
          <p class="status ${statusClass}">Status: ${order.status}</p>

          <button 
            onclick="markDelivered(${order.id})" 
            ${order.status === "Delivered" ? "disabled" : ""}
          >
            Mark Delivered
          </button>

          <hr>
        `;

        orderList.appendChild(orderItem);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load orders");
    });
}


// ================= MARK DELIVERED =================
function markDelivered(id) {
  fetch(`http://localhost:8080/orders/${id}/status`, {
    method: "PUT"
  })
    .then(res => res.json())
    .then(data => {
      alert("Order marked as Delivered!");
      loadOrders(); // ✅ no full reload
    })
    .catch(err => {
      console.error(err);
      alert("Failed to update order");
    });
}


// ================= TOGGLE PRODUCT FORM =================
function toggleProductForm() {
  const form = document.getElementById("product-form");

  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}


// ================= ADD PRODUCT =================
function addProduct() {
  const name = document.getElementById("pname").value;
  const imageUrl = document.getElementById("pimage").value;
  const price = document.getElementById("pprice").value;

  // ✅ Validation
  if (!name || !imageUrl || !price) {
    alert("Please fill all fields");
    return;
  }

  const product = {
    name: name,
    imageUrl: imageUrl,
    price: price
  };

  fetch("http://localhost:8080/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then(res => res.json())
    .then(data => {
      alert("Product added successfully!");

      // clear form
      document.getElementById("pname").value = "";
      document.getElementById("pimage").value = "";
      document.getElementById("pprice").value = "";

      // hide form
      document.getElementById("product-form").style.display = "none";
    })
    .catch(err => {
      console.error(err);
      alert("Failed to add product");
    });
}


// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "admin.html";
}