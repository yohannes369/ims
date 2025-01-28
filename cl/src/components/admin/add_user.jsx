import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager'); // Default role as manager
    const [message, setMessage] = useState(''); // To display success or error messages
    const [users, setUsers] = useState([]); // To store and display users

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
        } catch (error) {
            console.error('Registration failed:', error);
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
                
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            
            <h2>Registered Users:</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.email} ({user.role})</li>
                ))}
            </ul>
        </div>
    );
};

export default Register;
