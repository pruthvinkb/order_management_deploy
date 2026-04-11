export default function AboutPage({ onBack }) {

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f0ff, #f0f8ff)',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      maxWidth: '860px',
      margin: '0 auto',
      background: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    header: {
      background: 'linear-gradient(135deg, #1e90ff, #00bfff)',
      padding: '40px',
      color: 'white',
      textAlign: 'center',
    },
    headerTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      margin: '0 0 10px 0',
    },
    headerSub: {
      fontSize: '16px',
      opacity: 0.9,
      margin: 0,
    },
    body: {
      padding: '36px 40px',
    },
    desc: {
      fontSize: '16px',
      color: '#444',
      lineHeight: '1.8',
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e90ff',
      borderLeft: '4px solid #1e90ff',
      paddingLeft: '12px',
      marginBottom: '16px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 30px 0',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    listItem: {
      background: '#f0f8ff',
      border: '1px solid #d0e8ff',
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '15px',
      color: '#333',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      borderTop: '1px solid #eee',
      color: '#888',
      fontSize: '14px',
    },
    backBtn: {
      display: 'block',
      margin: '0 auto 30px auto',
      padding: '10px 24px',
      background: '#1e90ff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  }

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={onBack}>← Back to Shop</button>

      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>📘 About Local Shop</h1>
          <p style={styles.headerSub}>A full-stack web application built with React & Spring Boot</p>
        </div>

        {/* BODY */}
        <div style={styles.body}>

          <p style={styles.desc}>
            Local Shop is a full-stack web application built using <b>React.js</b> and <b>Spring Boot</b>.
            It allows users to browse products and place orders easily, while the admin
            can manage products and track orders efficiently.
          </p>

          <div style={styles.sectionTitle}>✨ Features</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>🛍️ View products</li>
            <li style={styles.listItem}>🛒 Add items to cart</li>
            <li style={styles.listItem}>📦 Place orders</li>
            <li style={styles.listItem}>🔍 Auto-fill customer details using phone number</li>
            <li style={styles.listItem}>➕ Add new products (Admin)</li>
            <li style={styles.listItem}>✏️ Edit product details</li>
            <li style={styles.listItem}>❌ Delete products</li>
            <li style={styles.listItem}>📋 View all orders</li>
            <li style={styles.listItem}>🚚 Update order status (Delivered / Cancelled / Rejected)</li>
          </ul>

          <div style={styles.sectionTitle}>🛠️ Tech Stack</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>⚛️ React.js — Frontend</li>
            <li style={styles.listItem}>🍃 Spring Boot — Backend</li>
            <li style={styles.listItem}>🗄️ MySQL — Database</li>
            <li style={styles.listItem}>🔐 JWT — Authentication</li>
          </ul>

        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          🚀 Built with passion for learning and real-world problem solving
        </div>

      </div>
    </div>
  )
}
