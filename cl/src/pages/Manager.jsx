import React from 'react';
import Logout from '../components/admin/logout'; // Ensure the correct import path

const Managerpage = () => {
    return (
        <div>
            
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
            <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">Managerpage Dashboard</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <Logout /> {/* Add the Logout component */}
                
            </div>
        
        </div>
        </div>
    );
};

export default Managerpage;
