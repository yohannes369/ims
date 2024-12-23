import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/admin.css';

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <h1>Welcome to Admin Page</h1>
      <button onClick={() => navigate('/add')}>Add</button>
    </div>
  );
}

export default Admin;