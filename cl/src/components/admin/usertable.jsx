// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserTable = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5200/api/users');
//                 setUsers(res.data);
//             } catch (err) {
//                 console.error('Error fetching users:', err);
//                 alert('Error fetching users');
//             }
//         };

//         fetchUsers();
//     }, []);

//     return (
//         <div>
//             <h2>User List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Email</th>
//                         <th>Role</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default UserTable;
