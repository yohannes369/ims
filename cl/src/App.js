import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Register from "./page/register";
import axios from "axios"; // Ensure this is the correct import path

function App() {
  return (
    <Router>
      <div>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

// function CheckAuth() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function check() {
//       try {
//         await axios.get('/user/check');
//       } catch (error) {
//         console.log(error.response);
//         navigate('/login');
//       }
//     }
//     check();
//   }, [navigate]);

//   return null;
// }

export default App;
