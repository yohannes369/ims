import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import UserList from '../components/admin/user_list';
import Register from '../components/admin/add_user';
import '../CSS/admin.css';
import Logout from '../components/admin/logout';

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
    // Fetch users or other necessary data here
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
      <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">Admin User Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <Register addUser={addUser} />
        <Logout />
      </div>
    </div>
  );
};

export default AdminPage;
