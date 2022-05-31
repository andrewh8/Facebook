import React, { useContext, useEffect, useState }  from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Friend from '../Friend/Friend';
import './Friends.css';

function Friends() {
  const {user, setUser} = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  // Confirm Login/Access Status
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

  const getFriends = () => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:5000/api/users/friends', {
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
      setFriends(data.friends)
    })
  }


  // Render if User in state, otherwise obtain User with JWT or navigate to Login
  useEffect(() => {
    checkUser(user);
    getFriends();
  }, []);

  return (
    <div className='friendsBackground'>
      <Nav />
      <section className='card bg-white shadow-sm py-4 mb-3 mt-5'>
        <div className='container w-75 text-center'>
          <h2>Friends</h2>
        </div>
      </section>
      <section className='container w-50'>
        {friends.map((friend) => {
          return <Friend key={friend} friend={friend}/>
        })}
      </section>
    </div>
  )
}

export default Friends
