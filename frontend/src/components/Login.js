import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom'

function Login() {

  // Initialize methods and properties
  const {setUser} = useContext(Context);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  const loginUser = () => {
    // Request - post email and password from Form to server
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
          // Handle custom Error response sent from API
          setError(data.errorMessage);
        } else {
          // Store JWT from server response into localStorage
          localStorage.setItem('jwt', data.token);
      
          // Store User in State
          setUser(data);
      
          // Navigate to Home screen if token provided by api/users/login
          if (data.token) {
            navigate('/');
          }
        }
      })
      .catch((err) => console.log(err))    
  }

  // If user has JWT when accessing /login, re-direct user to Home component
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      {error && <div> {error} </div>}
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
