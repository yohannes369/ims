import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
// import '../CSS/login.css';
import Fotter from '../components/header$footer/foter';
import Nav from '../components/nav/nav';
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
 <Nav />
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        placeholder="Email" 
                                        required 
                                        autoComplete="off" 
                                        id="email" 
                                        name="email" 
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" 
                                    />
                                    <label 
                                        htmlFor="email" 
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Email Address
                                    </label>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="Password" 
                                        required 
                                        autoComplete="off" 
                                        id="password" 
                                        name="password" 
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" 
                                    />
                                    <label 
                                        htmlFor="password" 
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
                                </div>
                                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
           
        
        </div>
      
        <Fotter />
     
        </div>
        
    );
};

export default Login;
