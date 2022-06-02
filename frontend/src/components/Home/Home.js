import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav';
import Friends from '../Friends/Friends';
import Notifications from '../Notifications/Notifications';
import Thread from '../Thread/Thread';
import CreatePost from '../CreatePost/CreatePost';
import './Home.css';

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
    fetch('http://localhost:5000/api/users/loggedInUser', {
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
    <div data-testid='Home' className='homeBackground'>
      <Nav />
      <div className="row pt-5 text-center">
        <div className="col d-none d-lg-block mx-3">
          <Friends />
        </div>
        <div className="col-lg-6 px-5 mt-5">
            <CreatePost />
            <Thread />
        </div>
        <div className="col d-none d-lg-block mx-3">
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default Home;
