import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            
            // Check if response and response.data are defined
            if (response && response.data) {
                const userRole = response.data.role;

                // Navigate based on user role after login
                switch (userRole) {
                    case 'admin':
                        navigate('/admin'); // Redirect to admin page for admin
                        break;
                    case 'manager':
                        navigate('/manager'); // Redirect to manager page for manager
                        break;
                    default:
                        navigate('/'); // Redirect to home page for other roles
                        break;
                }
            } else {
                console.error('Invalid response:', response);
                alert('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
