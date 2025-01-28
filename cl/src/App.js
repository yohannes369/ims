// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; 
import Admin from './pages/Admin'; 
import Manager from './pages/Manager'; 
import Home from './pages/Home'; 

import ProtectedRoute from './routes/ProtectedRoute'; 
import { AuthProvider } from './context/AuthContext'; 
// import RegistrationForm from './admin/create_user'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                                  <Route path="/login" element={<Login />} />
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <Admin />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/manager" 
                        element={
                            <ProtectedRoute allowedRoles={['manager']}>
                                <Manager />
                            </ProtectedRoute>
                        } 
                    />
              
                {/* <Route 
                        path="/create_user" 
                        element={
                            <ProtectedRoute allowedRoles={['create_user']}>
                                <RegistrationForm />
                            </ProtectedRoute>
                        }  */}
                    
                </Routes>

            </Router>
        </AuthProvider>
    );
};

export default App;
