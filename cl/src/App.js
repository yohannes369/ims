// import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from './routeprotect/AuthContext'; 
// import ProtectedRoute from './routeprotect/ProtectedRoute';
import Login from "./page/login";
import Admin from "./page/admin";
import Register from "./page/register";
import Add from "./page/add";
// import axios from "./axiosconfig"; // Ensure this is the correct import path

function App() {
  // const Navigate = useNavigate();

  // async function check() {
  //   try {
  //     await axios.get('/user/check');
  //   } catch (error) {
  //     console.log(error.response);
  //     Navigate('/login');
  //   }
  // }

  // useEffect(() => {
  //   check();
  // }, []);

  return (
    <Router>
      <div>
        <Routes>
        <Route path="/add" element={<Add />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;