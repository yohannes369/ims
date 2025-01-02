import React from 'react';
import Logout from './logout'; // Ensure the correct import path

const Managerpage = () => {
    return (
        <div>
            <h1>Managerpage Dashboard</h1>
            <Logout /> {/* Add the Logout component */}
        </div>
    );
};

export default Managerpage;
