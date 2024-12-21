
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosconfig';
import '../CSS/register.css';

function Register() {

  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstNameValue = firstnameDom.current.value;
    const lastNameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('/user/register', {
        username: usernameValue,
        firstname: firstNameValue,
        lastname: lastNameValue,
        email: emailValue,
        password: passwordValue
      });
      alert('Registration is successful.');
      navigate('/login');
    } catch (error) {
      alert('Something went wrong.');
      console.log(error.response);
    }
  }

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          ref={usernameDom}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;