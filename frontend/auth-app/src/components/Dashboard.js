import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axiosInstance';
import '../components/Dashboard';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);  // Store user data
  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    // Check if the JWT token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    } else {
      // Fetch data if token exists
      const fetchData = async () => {
        try {
          const response = await API.get('http://localhost:3000/users/all');
          console.log(response.data);
          setUsers(response.data.users);  // Set the users data to state
        } catch (error) {
          // setMessage('Failed to access resource.');
        }
      };
      fetchData();
    }
  }, [navigate]);  // Dependency array includes navigate

  const handleLogout = async () => {
    try {
      await API.post('http://localhost:3000/auth/logout');
      localStorage.removeItem('token');
      console.log("Logout Successfully");
      setMessage('Logged out successfully!');
      navigate('/logout'); // Redirect to the Logout component
    } catch (error) {
      setMessage('Logout failed.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dashboard</h2>
      <p>Welcome to the Dashboard</p>

      {/* Display logout button */}
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>

      {/* Display users table */}
      {users.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have no authorization to see database data</p>
      )}

      {/* Display message */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '900px',
    margin: '20px auto',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#333',
    fontSize: '30px',
    marginBottom: '20px',
  },
  logoutButton: {
    padding: '12px 20px',
    backgroundColor: '#FF5733',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  table: {
    marginTop: '20px',
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    padding: '10px',
  },
  message: {
    marginTop: '20px',
    color: '#d9534f',
  },
};

export default Dashboard;
