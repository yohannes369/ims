import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosconfig';
import '../CSS/admin.css';

function Manager() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const firstnameDom = useRef();
  const lastnameDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const firstNameValue = firstnameDom.current.value;
    const lastNameValue = lastnameDom.current.value;

    if (!firstNameValue || !lastNameValue) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('/user/manager', {
        firstname: firstNameValue,
        lastname: lastNameValue,
      });
      alert('User is successfully added');
      navigate('/login'); // Navigate to another page
    } catch (error) {
      alert('Something went wrong.');
      console.log(error.response);
    }
  }

  return (
    <div className="admin-page">
      <h1>Welcome to manager  Page</h1>
      
      
        <div className="registration-form">
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              ref={firstnameDom}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              ref={lastnameDom}
              required
            />
            <button type="submit">Add</button>
          </form>
        </div>
      
    </div>
  );
}

export default Manager;