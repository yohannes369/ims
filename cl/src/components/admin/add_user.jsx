import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manager');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => {
      fetchUsers();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5200/api/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5200/api/auth/users/${currentUser.id}`, { email, password, role });
        setMessage('User updated successfully!');
      } else {
        await axios.post('http://localhost:5200/api/auth/register', { email, password, role });
        setMessage('Registration successful!');
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data || 'Operation failed. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUser(user);
    setEmail(user.email);
    setPassword('');
    setRole(user.role);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5200/api/auth/users/${id}`);
      setMessage('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data || 'Deletion failed. Please try again.');
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setRole('manager');
    setEditing(false);
    setCurrentUser(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex justify-between w-full max-w-4xl mb-4">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition shadow-lg"
        >
          {showForm ? 'Close Form' : 'Add User'}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl space-y-4">
          <h2 className="text-3xl font-bold text-center text-cyan-500">{editing ? 'Update User' : 'Register User'}</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition shadow-lg">
            {editing ? 'Update' : 'Register'}
          </button>
          {message && <p className="text-red-600 mt-2 text-center">{message}</p>}
        </form>
      ) : (
        <table className="w-full max-w-4xl bg-white rounded-lg shadow-lg mt-4">
          <thead className="bg-cyan-500 text-white">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(user)} className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Register;
