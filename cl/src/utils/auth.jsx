// // src/context/AuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => {
//         return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
//     });

//     const login = (userData) => {
//         localStorage.setItem('user', JSON.stringify(userData));
//         setUser(userData);
//     };

//     const logout = () => {
//         localStorage.removeItem('user');
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };
