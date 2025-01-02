import React from 'react';
import Logout from './logout'; // Ensure the correct import path

const AdminPage = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Logout /> {/* Add the Logout component */}
        </div>
    );
};

export default AdminPage;
