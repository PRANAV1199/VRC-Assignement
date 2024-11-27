// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Welcome to the Authentication App designed by Pranv Sonare</h2>
      <div style={styles.buttonContainer}>
        <button onClick={goToRegister} style={styles.button}>
          Register
        </button>
        <button onClick={goToLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#f4f7fc',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default HomePage;
