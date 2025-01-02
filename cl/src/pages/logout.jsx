// src/components/Navbar.jsx (or wherever you handle logout)
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth(); // Use the custom hook to access auth context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call logout function from context
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav>
            <h1>My App</h1>
            {user ? (
                <div>
                    
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={() => navigate('/login')}>Login</button>
            )}
        </nav>
    );
};

export default Navbar;
