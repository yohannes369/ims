import React, { useState } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
                <h2 className="text-2xl font-bold mb-4">Toggle Dark/Light Mode</h2>
                <p className="mb-4">Click the button to toggle between dark and light mode for this page.</p>
                <button 
                    onClick={toggleDarkMode} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Toggle dark mode
                </button>
            </div>
        </div>
    );
};

export default DarkModeToggle;
