import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Nav from '../Nav/Nav';
import Thread from '../Thread/Thread';
import CreatePost from '../CreatePost/CreatePost';

function Profile() {
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
    <div className='profileBackground'>
      <Nav />
      <section className='bg-white shadow-sm mt-5 p-5 mb-3'>
        <div className='container w-75 d-flex justify-content-between align-items-end mt-5 pt-5'>
          <h1>{user.name}</h1>
          <button className='btn editButton text-dark fw-semibold'>Edit Profile</button>
        </div>
      </section>
      <section>
        <div className='container w-75 justify-content-between text-center'>
          <div className="row">
            <div className="col-md-5">
              <div className='sticky-top'>
                <div className="card text-start p-3 mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Info</h5>
                    <p className="card-text">My name is {user.name}. Please see the below information for more about me.</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Location</li>
                    <li className="list-group-item">School</li>
                    <li className="list-group-item">Hobbies</li>
                  </ul>
                </div>
                <div className="card text-start p-3 mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Pictures</h5>
                    {/* Pictures.map */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <CreatePost />
              <Thread />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
