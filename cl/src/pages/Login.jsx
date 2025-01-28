// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 

        try {
            const response = await login(email, password); 
            
            if (response && response.data) {
                const { role } = response.data;

                switch (role) {
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'manager':
                        navigate('/manager');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Invalid credentials. Please try again.'); 
        }
    };

    return (
        <div>
            <div className='b'>
        {/* <img src="./bonga.png" alt="Login Image" className="login-image" /> */}
        </div>
        <div className='a'>


            <h1>LOGIN FORM</h1>
        
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Login</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
            </form>
          
        </div>
        </div>
        
    );
};

export default Login;
