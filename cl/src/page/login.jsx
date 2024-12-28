
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosconfig';
import '../CSS/register.css';

function Login() {
const navigatate=  useNavigate();

  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
  
     
      !emailValue ||
      !passwordValue
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
     
      await axios.post('/user/login', {
      
        email: emailValue,
        password: passwordValue
      });
      alert('login is successful.');
    navigatate('/register')
    } catch (error) {
      alert('Something went wrong.');
      console.log(error.response);
    }
  }

  return (
    <div className="registration-form">
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
       
     
      
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={emailDom}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={passwordDom}
          required
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;