import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.css';
import Nav from '../Nav/Nav';
import ProfileThread from '../ProfileThread/ProfileThread';
import CreatePost from '../CreatePost/CreatePost';

function Profile() {
  const {user, setUser} = useContext(UserContext);
  const [profile, setProfile] = useState('')
  let { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

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

  // Fetch Profile info based on user ID from url params
  const getProfile = () => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
    })
    .then(res => res.json())
    .then(data => {
      setProfile(data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // Add Friend
  const addFriend = () => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      }})
    .then((res) => res.json())
    .then((data) => {
      if (data.errorMessage) {
        // Handle custom Error response sent from API
        setError(data.errorMessage);
      }
    })
  }

  // Remove error message box
  const removeError = () => {
    setError('');
  }

  // Update Profile State Inputs and Functions
  const [name, setName] = useState(user.name);
  const nameChange = (e) => {
    setName(e.target.value);
  }
  const [email, setEmail] = useState(user.email);
  const emailChange = (e) => {
    setEmail(e.target.value);
  }
  const [location, setLocation] = useState(user.location);
  const locationChange = (e) => {
    setLocation(e.target.value);
  }
  const [school, setSchool] = useState(user.school);
  const schoolChange = (e) => {
    setSchool(e.target.value);
  }
  
  // Update Profile fetch request
  const updateProfile = () => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:5000/api/users/loggedInUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: name,
        email: email,
        location: location,
        school: school,
      })
    })
    .then((res) => res.json())
    .then((data) => {
      setUser(data);
    })
  }

  // Render if User in state, otherwise obtain User with JWT or navigate to Login
  useEffect(() => {
    checkUser(user);
    getProfile();
  }, [profile]);

  return (
    <div className='profileBackground'>
      <Nav />
      <section className='bg-white shadow-sm mt-5 p-5 mb-3'>
        <div className='container w-75 d-flex justify-content-between align-items-end mt-5 pt-5'>
          <h1>{profile.name}</h1>
          {(user._id === profile._id) &&
          <button className='btn btn-secondary fw-semibold' data-bs-toggle="modal" data-bs-target='#editProfileModal'>Edit Profile</button>
          }
          {(user._id !== profile._id) &&
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary' onClick={addFriend}>Add Friend</button>
            {error &&
              <div className="alert alert-danger py-1 mt-5" role="alert">
                {error}
                <button type="button" className="btn-close ps-5" onClick={removeError}></button>
              </div>
            }
          </div>
          }
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
                    <p className="card-text">My name is {profile.name}. Please see the below information for more about me.</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Location: {profile.location}</li>
                    <li className="list-group-item">School: {profile.school}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              {(user._id === profile._id) &&
              <CreatePost />
              }
              <ProfileThread id={id} profile={profile}/>
            </div>
          </div>
        </div>
      </section>

      {/* /// EDIT MODAL /// */}
      <div className="modal fade" id={'editProfileModal'} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className='mb-3'>
                  <div className='mb-3'>
                    <input
                      className='form-control'
                      type='text'
                      name='username'
                      id='username'
                      onChange={nameChange}
                      defaultValue={user.name}
                      placeholder='Name'
                      required>
                    </input>
                  </div>
                  <div className='mb-3'>
                    <input
                      className='form-control'
                      type='text'
                      name='email'
                      id='email'
                      onChange={emailChange}
                      defaultValue={user.email}
                      placeholder='Email'
                      required>
                    </input>
                  </div>
                  <div className='mb-3'>
                    <input
                      className='form-control'
                      type='text'
                      name='location'
                      id='location'
                      onChange={locationChange}
                      defaultValue={user.location}
                      placeholder='Location'>
                    </input>
                  </div>
                  <div className='mb-3'>
                    <input
                      className='form-control'
                      type='text'
                      name='school'
                      id='school'
                      onChange={schoolChange}
                      defaultValue={user.school}
                      placeholder='School'>
                    </input>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit" onClick={updateProfile}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
