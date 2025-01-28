import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddUser.css'
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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                
                <button type="submit">{editing ? 'Update' : 'Register'}</button>
            </form>
            {message && <p>{message}</p>}
            
            <h2>Registered Users:</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Register;
