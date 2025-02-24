import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Register from '../components/admin/add_user';
import Logout from '../components/admin/logout';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const addUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:5000/register', user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    // Fetch users or other necessary data here
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="flex justify-between items-center bg-white p-4 sticky top-0 shadow-md z-10">
        <Logout />
        <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Welcome to Admin</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Register addUser={addUser} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;