// import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes,useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "./axiosconfig";

// import { AuthProvder } from './routeprotect/AuthContext'; 
// import ProtectedRoute from './routeprotect/ProtectedRoute';

import Login from "./image/login";
// import Admin from "./page/admin";
// import Register from "./page/register";
// import Add from "./page/add";
// import Manager from "./page/manager";

// import axios from "./axiosconfig"; // Ensure this is the correct import path

function App() {
  // const Navigate = useNavigate();

  // async function checkuser() {
  //   try {
  //     await axios.get ('/user/check');
  //   } catch (error) {
  //     console.log(error.response);
  //     Navigate('/');
  //   }
  // }

  // useEffect(() => {
  //   checkuser() ;
  // },[]);

  return (
    <Router>
      <div>
        <Routes>
        {/* <Route path="/add" element={<Add />} />
          <Route path="/admin" element={<Admin />} /> */}
           { <Route path="/login" element={<Login />} />
          /* <Route path="/register" element={<Register />} />
          <Route path="/manager" element={<Manager />} /> */} */
        </Routes>
      </div>
    </Router>
  );
}

export default App;