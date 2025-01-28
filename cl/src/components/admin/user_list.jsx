// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
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

//     const handleDelete = async (id) => {
//         try {
//             const res = await axios.delete(`http://localhost:5200/api/users/${id}`);
//             alert(res.data.msg);
//             setUsers(users.filter(user => user.id !== id));
//         } catch (err) {
//             console.error('Error deleting user:', err);
//             alert('Error deleting user');
//         }
//     };

//     return (
//         <div>
//             <h1>User List</h1>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         {user.email} - {user.role}
//                         <Link to={`/edit-user/${user.id}`}>Edit</Link>
//                         <button onClick={() => handleDelete(user.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>

//         </div>
//     );
// };

// export default UserList;

import React from 'react';

const UserList = ({ users, deleteUser }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email} - {user.role}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
