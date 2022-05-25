import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav';
import Thread from '../Thread/Thread';
import CreatePost from '../CreatePost/CreatePost';

function Home() {
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  // If there is no User in state, check for a JWT to get User via fetch. If no JWT, navigate to login
  const checkUser = (user) => {
    if (!user) {
      const token = localStorage.getItem('jwt');
      if (token){
        getUser(token);
      } else {
        navigate('/login');
      }
    }
  }

  // Fetch user w/ JWT; Success - set User to response data; Failure - remove invalid JWT and navigate to login
  const getUser = (token) => {
    fetch('http://localhost:5000/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
    })
    .then(res => {
      if (!res.ok) {
        throw Error('Not Authorized');
      }
      return res.json()
    })
    .then(data => {
      setUser(data);
    })
    .catch(() => {
      localStorage.removeItem('jwt');
      navigate('/login');
    })
  }

  // Render Home if User in state, otherwise obtain User with JWT or navigate to Login
  useEffect(() => {
    checkUser(user);
  }, []);

  return (
    <div data-testid='Home' className='bg-light'>
      <div className='container'>
        <Nav />
        <div className='mt-5 pt-5' title='divTest'>
          Home
          User = {user.name}
          <CreatePost />
          <Thread />
        </div>
      </div>
    </div>
  );
}

export default Home;
