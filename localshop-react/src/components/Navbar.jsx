import { useNavigate } from 'react-router-dom'

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
    height: '60px',
    background: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#333',
    userSelect: 'none',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  button: {
    background: '#ff7a00',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
  },
}

export default function Navbar({ onShowHome, onShowAbout }) {
  const navigate = useNavigate()

  return (
    <div style={styles.navbar}>

      <div style={styles.logo} onClick={onShowHome}>
        🛒 Local Shop
      </div>

      <div style={styles.navButtons}>
        <button style={styles.button} onClick={onShowHome}>Home</button>
        <button style={styles.button} onClick={onShowAbout}>About</button>
        <button style={styles.button} onClick={() => navigate('/admin')}>Admin</button>
      </div>

    </div>
  )
}
