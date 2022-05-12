import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import {Link} from 'react-router-dom';

function Login() {
  const {userId, setUserId, token, setToken} = useContext(Context);

  // Collect email and password from Form imputs with state and onChange functions
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordChange = (e) => {
    setPassword(e.target.value);
  }
  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  // POST Login - /api/users/login
  // Provide login credentials in api request upon form submittal
  const loginUser = async () => {
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

    const user = await res.json();
    setUserId(user._id);
    setToken(user.token);
  }

  return (
    <div>
      Login
      ______{userId}_____{token}
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
      
      <Link to='/profile'>
          <li>Profile</li>
      </Link>
    </div>
  );
}

export default Login;
