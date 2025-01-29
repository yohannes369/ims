import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './AddUser.css'
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager'); // Default role as manager
    const [message, setMessage] = useState(''); // To display success or error messages
    const [users, setUsers] = useState([]); // To store and display users
    const [editing, setEditing] = useState(false); // Flag to check if editing a user
    const [currentUser, setCurrentUser] = useState({}); // Store the user being edited

    // Function to fetch users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5200/api/auth/users');
            if (response && response.data) {
                setUsers(response.data);
            } else {
                console.error('Invalid response:', response);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    // Fetch users initially
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!editing) {
                const response = await axios.post('http://localhost:5200/api/auth/register', { email, password, role });

                // Check if response and response.data are defined
                if (response && response.data) {
                    setMessage("Registration successful! You can now manage users.");
                    setEmail('');
                    setPassword('');
                    setRole('manager'); // Reset role to default
                    // Fetch users again after registration
                    fetchUsers();
                } else {
                    console.error('Invalid response:', response);
                    setMessage('Registration failed. Please try again.');
                }
            } else {
                const response = await axios.put(`http://localhost:5200/api/auth/users/${currentUser.id}`, { email, password, role });

                if (response && response.data) {
                    setMessage("User updated successfully!");
                    setEditing(false);
                    setEmail('');
                    setPassword('');
                    setRole('manager'); // Reset role to default
                    fetchUsers();
                } else {
                    console.error('Invalid response:', response);
                    setMessage('Update failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage('Network Error. Please check your connection and try again.');
            }
        }
    };

    const handleEdit = (user) => {
        setEditing(true);
        setCurrentUser(user);
        setEmail(user.email);
        setPassword(user.password);
        setRole(user.role);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5200/api/auth/users/${id}`);

            if (response && response.data) {
                setMessage("User deleted successfully!");
                fetchUsers();
            } else {
                console.error('Invalid response:', response);
                setMessage('Deletion failed. Please try again.');
            }
        } catch (error) {
            console.error('Deletion failed:', error);
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage('Network Error. Please check your connection and try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center text-blue-500">{editing ? 'Update User' : 'Register User'}</h2>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">{editing ? 'Update' : 'Register'}</button>
                {message && <p className="text-red-500 mt-2">{message}</p>}
            </form>
            
            <h2 className="text-2xl font-bold text-white mt-8">Registered Users:</h2>
            <table className="w-full max-w-4xl bg-white rounded-lg shadow-lg mt-4">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-3">ID</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.role}</td>
                            <td className="p-3 space-x-2">
                                <button onClick={() => handleEdit(user)} className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">Edit</button>
                                <button onClick={() => handleDelete(user.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Register;
