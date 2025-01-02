// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Correctly initialize user state

    // Login function to authenticate user
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5200/api/auth/login', { email, password });
            const { token, role } = response.data; // Assuming this is the structure of your response

            // Store token in local storage
            localStorage.setItem('token', token);
            
            // Set user state with role information
            setUser({ email, role }); // Correctly call setUser
            
            return response;
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // Re-throw error to handle it in the component
        }
    };

    // Logout function to clear user data
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null); // Clear user info on logout
    };

    // Value object to be provided to context consumers
    const value = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
