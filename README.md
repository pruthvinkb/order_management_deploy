# 🛒 Local Shop — Full Stack Web Application

A full-stack web application built with **React.js** (frontend) and **Spring Boot** (backend).  
Users can browse products and place orders. Admins can manage products and track orders.

---

## 🧱 Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Frontend   | React.js + Vite   |
| Backend    | Spring Boot       |
| Database   | MySQL             |
| Auth       | JWT               |
| Styling    | CSS + Inline Styles |

---

## 📁 Project Structure

```
LocalShop/
├── localshop-react/     → React frontend
└── orderSystem/         → Spring Boot backend
```

---

## 🚀 How to Run

### 1. Backend (Spring Boot)

```bash
cd orderSystem
.\mvnw.cmd spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 2. Frontend (React)

```bash
cd localshop-react
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## ⚙️ Environment Setup

Create a `.env` file inside `localshop-react/`:

```
VITE_API_URL=http://localhost:8080
```

---

## 📄 Pages

| Page            | URL                          |
|-----------------|------------------------------|
| User Dashboard  | http://localhost:5173/       |
| Admin Login     | http://localhost:5173/admin  |
| Admin Dashboard | http://localhost:5173/admin/dashboard |

---

## ✨ Features

- 🛍️ Browse products
- 🛒 Add to cart with quantity control
- 📦 Place orders
- 🔍 Auto-fill customer details by phone number
- 🔐 Admin login with JWT authentication
- ➕ Add / ✏️ Edit / ❌ Delete products
- 📋 View and manage all orders
- 🚚 Update order status

---

## 👨‍💻 Built By

> Built with passion for learning and real-world problem solving 🚀
