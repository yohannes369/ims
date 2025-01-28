import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../CSS/DeleteUser.css';

const DeleteUser = ({ userId, deleteUser }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5200/users/${userId}`);
      deleteUser(userId);
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again later.');
    }
  };

  return (
    <button onClick={handleDelete} className="delete-user-button">
      Delete User
    </button>
  );
};

export default DeleteUser;
