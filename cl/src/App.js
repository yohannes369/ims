// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login'; 
// import Admin from './pages/Admin'; 
// import Manager from './pages/Manager'; 
// import Home from './pages/Home'; 
// // import Register from './pages/Register';
// import ProtectedRoute from './routes/ProtectedRoute'; 
// import { AuthProvider } from './context/AuthContext'; 

// // import RegistrationForm from './admin/create_user'

// const App = () => {
//     return (
//         <div>
//         <AuthProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                                   <Route path="/login" element={<Login />} />
//                     <Route 
//                         path="/admin" 
//                         element={
//                             <ProtectedRoute allowedRoles={['admin']}>
//                                 <Admin />
//                             </ProtectedRoute>
//                         } 
//                     />
//                     <Route 
//                         path="/manager" 
//                         element={
//                             <ProtectedRoute allowedRoles={['manager']}>
//                                 <Manager />
//                             </ProtectedRoute>
//                         } 
//                     />
              
//                 {/* <Route 
//                         path="/create_user" 
//                         element={
//                             <ProtectedRoute allowedRoles={['create_user']}>
//                                 <RegistrationForm />
//                             </ProtectedRoute>
//                         }  */}
                       
                    
//                 </Routes>

//             </Router>
//         </AuthProvider>
      
     
//         </div>
//     );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
const App = () => {
  return(
 <>
 <Router>
  <Routes>
    <Route path="/Register" element ={<Register />}  />
  </Routes>
  </Router> 
 </>
  )
}

export default App













// App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import CreateUser from "./components/CreateUser";
// import VerifyAccount from "./components/VerifyAccount";
// import Login from "./components/Login";
// import ChangePassword from "./components/ChangePassword";

// const App = () => {
//   return (
//     <Router>
//       <div style={styles.navbar}>
//         <nav>
//           <ul style={styles.navList}>
//             <li style={styles.navItem}>
//               <Link to="/create-user" style={styles.link}>Create User</Link>
//             </li>
//             <li style={styles.navItem}>
//               <Link to="/login" style={styles.link}>Login</Link>
//             </li>
//             <li style={styles.navItem}>
//               <Link to="/change-password" style={styles.link}>Change Password</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <Routes>
//         <Route path="/create-user" element={<CreateUser />} />
//         <Route path="/verify/:token" element={<VerifyAccount />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/change-password" element={<ChangePassword />} />
//       </Routes>
//     </Router>
//   );
// };

// // Styles
// const styles = {
//   navbar: {
//     backgroundColor: "#333",
//     padding: "10px",
//   },
//   navList: {
//     listStyle: "none",
//     display: "flex",
//     justifyContent: "center",
//     margin: 0,
//     padding: 0,
//   },
//   navItem: {
//     margin: "0 15px",
//   },
//   link: {
//     color: "#fff",
//     textDecoration: "none",
//     fontSize: "18px",
//   },
// };

// export default App;


