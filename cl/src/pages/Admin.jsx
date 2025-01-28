import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import UserList from '../components/admin/user_list';
import Register from '../components/admin/add_user';
import '../CSS/admin.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);


  const addUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:5200/register', user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
   
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin User Management</h1>
      <Register addUser={addUser} />
    
    </div>
  );
};

export default AdminPage;
