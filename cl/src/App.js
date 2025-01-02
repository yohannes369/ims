// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import axios from './axiosconfig';

// import Login from './page/login';
// import Admin from './page/admin';
// import Register from './page/register';
// import Add from './page/add';


// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// function AppContent() {
//   const navigate = useNavigate();

//   async function checkuser() {
//     try {
//       await axios.get('/user/check');
//     } catch (error) {
//       console.log(error.response);
//       navigate('/admin');
//     }
//   }

//   useEffect(() => {
//     checkuser();
//   }, []);

//   return (
//     <div>
//       <Routes>
//         <Route path="/add" element={<Add />} />
//         <Route path="/admin" element={<Admin />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
       
//       </Routes>
//     </div>
//   );
// }

// export default App;




// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import AdminPage from './pages/Admin';
import ManagerPage from './pages/Manager';
import Register from './pages/Register'; // Import Register component
import Home from './pages/Home';
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    
                <Route path="/" element={<Home  />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> {/* Add Register route */}
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/manager" element={<ManagerPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;