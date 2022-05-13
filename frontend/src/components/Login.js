import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom'

function Login() {

  // Initialize methods and properties
  const {setUser} = useContext(Context);
  const navigate = useNavigate();
  let error = '';

  // Collect email and password from Form imputs with state and onChange functions
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordChange = (e) => {
    setPassword(e.target.value);
  }
  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  /// POST Login - /api/users/login  ///
  /// Provide login email and password credentials in api request upon form submittal ///
  const loginUser = async () => {
    // Request - post email and password from Form to server
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    // Response - collect user info / error message from server
    const user = await res.json();
    
    // Handle Response
    if (user.errorMessage) {
      error = user.errorMessage;
    } else {
      // Store JWT from server response into localStorage
      localStorage.setItem('jwt', user.token);
      console.log(localStorage.getItem('jwt'));   //////////// REMOVE /////////////////
  
      // Store User in State
      setUser(user);
  
      // Navigate to Home screen if token provided by api/users/login
      if (user.token) {
        navigate('/');
      }
    }
  }

  // useEffect(() => {
  //   if (localStorage.getItem('jwt')) {
  //     navigate('/');
  //   }
  // }, []);

  return (
    <div>
      {error &&
        <div> {error} </div>
      }
      Login
      <form>
        <label htmlFor="email">Email</label>
        <input 
          onChange={emailChange}
          type="text" 
          name="email" 
          id="email"
        />

        <label htmlFor="password">Password</label>
        <input 
          onChange={passwordChange}
          type="text" 
          name="password" 
          id="password"
        />

        <div onClick={loginUser}>Log In</div>
      </form>
    </div>
  );
}

export default Login;
