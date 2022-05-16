import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom'
import Nav from './Nav';

function Home() {
  const {user, setUser} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Render Home if User is in state, otherwise check for and validate JWT in localStorage
    if (!user) {
      if (localStorage.getItem('jwt')){
        fetch('http://localhost:5000/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        })
        .then(res => {
          // Confirm JWT in localStorage is valid
          if (!res.ok) {
            console.log(res);
            throw Error('Not Authorized');
          }
          return res.json()
        })
        .then(data => {
          // If JWT is valid, set User to the api response from /api/users/me
          setUser(data);
        })
        .catch(() => {
          // If JWT is not valid, remove it from localStorage and redirect to login page
          localStorage.removeItem('jwt');
          navigate('/login');
        })
      } else {
        // If JWT is not in localStorage, redirect to login page
        navigate('/login');
      }
    }
  }, []);

  return (
    <div className='bg-light'>
      <Nav />
      <div className='mt-5 pt-5'>
        Home
        User = {user.name}      
      </div>
    </div>
  );
}

export default Home;
