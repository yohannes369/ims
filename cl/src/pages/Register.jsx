import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager'); // Default role as manager
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5200/api/auth/register', { email, password, role });
            
            // Check if response and response.data are defined
            if (response && response.data) {
                alert("Registration successful! You can now log in.");
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                console.error('Invalid response:', response);
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('Network Error. Please check your connection and try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
            </select>
            
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;