// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [accType, setAccType] = useState('');
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/login', {
                acc_type: accType,
                txt_userid: userid,
                txt_password: password,
            });

            alert(response.data.message);
            // Redirect based on account type or handle successful login here

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <select value={accType} onChange={(e) => setAccType(e.target.value)}>
                    <option value="">Select Account Type</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Clerk">Clerk</option>
                </select>
                <input 
                    type="text" 
                    placeholder="User ID" 
                    value={userid} 
                    onChange={(e) => setUserid(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
