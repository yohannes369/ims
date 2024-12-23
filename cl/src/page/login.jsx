import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosconfig';
import '../CSS/login.css';

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!emailValue || !passwordValue) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      // const response = 
      await axios.post('/user/login', {
        email: emailValue,
        password: passwordValue
      });

      // Assuming the response contains a token or user data
      // localStorage.setItem('token', response.data.token); // Uncomment if using token

      alert('Login is successful.');
      navigate('/admin'); // Redirect to home page after successful login
    } catch (error) {
      // Handle specific error responses
      if (error.response) {
        const message = error.response.data.msg || 'An error occurred. Please try again later.';
        alert(message);
      } else {
        alert('Network error. Please try again later.');
      }
      console.error(error);
    }
  }

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to registration page
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? 
        <button onClick={handleRegisterRedirect} style={{ marginLeft: '5px' }}>
          Register here
        </button>
      </p>
    </div>
  );
}

export default Login;
