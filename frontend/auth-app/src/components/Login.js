// src/components/Login.js
import React, { useState } from 'react';
import API from '../utils/axiosInstance';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful!');
      setShowPopup(true); // Show the popup on successful login
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
      setShowPopup(false); // Ensure popup is not shown
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    // Redirect or perform other actions after closing the popup
    window.location.href = '/dashboard'; // Redirect to a dashboard or another page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}

      {/* Success Popup */}
      {showPopup && (
        <div style={styles.popup}>
          <h3>Success</h3>
          <p>You have logged in successfully!</p>
          <button onClick={closePopup} style={styles.popupButton}>
            OK
          </button>
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
    marginTop: '50px',
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '20px',
    color: '#d9534f',
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
  popupButton: {
    marginTop: '10px',
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

export default Login;
