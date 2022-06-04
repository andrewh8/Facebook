import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {

  // Initialize methods and properties
  const {setUser} = useContext(UserContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Collect email and password from Form imputs with state and onChange functions
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordChange = (e) => {
    setPassword(e.target.value);
  }
  const emailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  }

  /// POST Login - /api/users/login  ///
  /// Provide login email and password credentials in api request upon form submittal ///
  const loginUser = () => {
    // Request - post email and password from Form to server
    fetch('/api/users/login', {
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

  // Remove error message box
  const removeError = () => {
    setError('');
  }

  // If user has JWT when accessing /login, re-direct user to Home component
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/');
    }
  }, []);

  return (
    <div className='p-5 text-center text-sm-start loginBackground d-sm-flex align-items-center justify-content-evenly'>
      <div>
        <h1 className='text-primary fs-1 logo'>Facebook Clone</h1>
        <p className='text-dark fs-4'>Join your friends online</p>
      </div>
      <div className='text-center'>
        <form className='shadow p-5 pb-2 rounded mb-3'>
          <div className='mb-3'>
            <input 
              className='form-control'
              onChange={emailChange}
              placeholder='Email'
              type="email" 
              name="email" 
              id="email"
              required
            />
          </div>
          <div className='mb-3'>
            <input 
              className='form-control'
              onChange={passwordChange}
              placeholder='Password'
              type="text" 
              name="password" 
              id="password"
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="button" onClick={loginUser}>Log In</button>
            <Link to='/register' className="btn btn-success">
              Create New Account
            </Link>
          </div>
          <p className='mt-3 mb-0 test-text text-secondary'>Personal Project - Test Purposes Only</p>
          <p className='m-0 test-text text-secondary'>Test Email: john@gmail.com</p>
          <p className='m-0 test-text text-secondary'>Test Password: 123</p>
        </form>
        <div className='d-flex justify-content-center'>
          {error &&
            <div className="alert alert-danger py-1" role="alert">
              {error}
              <button type="button" className="btn-close ps-5" onClick={removeError}></button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
