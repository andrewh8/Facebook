import React, { useContext, useEffect, useState }  from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Notification from '../Notification/Notification';
import './Notifications.css';

function Notifications() {
  const {user, setUser} = useContext(UserContext);
  const [friendRequests, setFriendRequests] = useState([]);
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

  const getFriendRequests = () => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:5000/api/users/loggedInUser/friends', {
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
      setFriendRequests(data.friendRequests)
    })
  }


  // Render if User in state, otherwise obtain User with JWT or navigate to Login
  useEffect(() => {
    checkUser(user);
    getFriendRequests();
  }, [friendRequests]);

  return (
    <div className='notificationsBackground'>
      <Nav />
      <section className='card bg-white shadow-sm mt-5 pt-3 pb-1 mb-3'>
        <div className='container w-75 text-center'>
          <h2>Notifications</h2>
          <div className='fs-6'>This is only implemented for friend requests</div>
        </div>
      </section>
      <section className='container w-50'>
        {friendRequests.map((request) => {
          return <Notification key={request} request={request}/>
        })}
      </section>
    </div>
  )
}

export default Notifications
