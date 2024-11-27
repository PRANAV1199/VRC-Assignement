import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  

  const handleLogout = () => {
    // Clear JWT token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/homepage');
  };

  const handleCancel = () => {
    // Close the popup without logging out
    setShowPopup(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Are you sure you want to log out?</h1>
      <button onClick={() => setShowPopup(true)} style={styles.logoutButton}>
        Logout
      </button>

      {/* Popup Box */}
      {showPopup && (
        <div style={styles.popup}>
          <h2>Confirm Logout</h2>
          <p>Are you sure you want to log out?</p>
          <div>
            <button onClick={handleLogout} style={styles.confirmButton}>
              Yes, Logout
            </button>
            <button onClick={handleCancel} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Background Overlay */}
      {showPopup && <div style={styles.overlay}></div>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '30px',
    marginTop: '50px',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  logoutButton: {
    padding: '12px 25px',
    fontSize: '16px',
    backgroundColor: '#FF4D4D',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    textAlign: 'center',
  },
  confirmButton: {
    marginRight: '10px',
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
};

export default Logout;
