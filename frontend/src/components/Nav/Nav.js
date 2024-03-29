import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaUserFriends,
  FaSignOutAlt,
  FaBell,
  FaHome,
} from 'react-icons/fa';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom'
import './Nav.css';

function Nav() {
  const {user, setUser} = useContext(UserContext);
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  // Fetch Profile info based on user ID from url params
  const searchUsers = () => {
    const token = localStorage.getItem('jwt');
    fetch('/api/users', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
    })
    .then(res => res.json())
    .then(data => {
      setUserList(data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const searchHandler = (e) => {
    setSearchInput(e.target.value);
  }

  const logoutUser = () => {
    setUser('');
    localStorage.removeItem('jwt');
    navigate('/login');
  }

  useEffect(() => {
    searchUsers();
  }, [])

  return (
    <nav className='navbar navbar-expand-sm navbar-light fixed-top shadow-sm p-sm-0'>
      <div className='container-fluid'>
        <Link to='/'>
          <FaFacebook className='FacebookLogo' color="#17A9FD" fontSize="2.5em"/>
        </Link>

        {/* SEARCH BAR */}
        <div className="dropdown">
          <div className="btn border-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <form className="d-flex" role="search">
              <input className="searchBar form-control me-2 mx-3" type="search" onChange={searchHandler} placeholder="Search Facebook" aria-label="Search"/>
            </form>
          </div>
          <ul className="dropdown-menu px-5 ms-4" aria-labelledby="dropdownMenuButton1">
            {userList.filter((val) => {
              if(searchInput === '') {
                return val;
              } else if(val.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return val;
              }
            }).map((individual) => {
                return <Link to={`/profile/${individual._id}`} className="dropdown-item" key={individual._id}>{individual.name}</Link>
              })}
          </ul>
        </div>

        {/* COLLAPSED BUTTON */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV BAR */}
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto'>
            <li className='profileLink nav-item pt-1 rounded-pill my-1'>
              <Link to={`/profile/${user._id}`} className='nav-link fs-6 fw-semibold text-dark'>
                <div className='pb-1'>
                {user.name} 
                </div>
              </Link>
            </li>
            <li className='nav-item pb-1 linkIcon mx-2 d-flex align-items-center justify-content-center mt-2'>
              <Link to='/' className='nav-link'>
                <FaHome color="black" fontSize="1.25em"/>
              </Link>
            </li>
           <li className='nav-item pb-1 linkIcon mx-2 d-flex align-items-center justify-content-center mt-2'>
              <Link to='/friends' className='nav-link'>
                <FaUserFriends color="black" fontSize="1.25em"/>
              </Link>
            </li>
            <li className='nav-item pb-1 linkIcon mx-2 d-flex align-items-center justify-content-center mt-2'>
              <Link to='/notifications' className='nav-link'>
                <FaBell color="black" fontSize="1.25em"/>
              </Link>
            </li>
            <li 
              className='nav-item pb-1 linkIcon mx-2 d-flex align-items-center justify-content-center mt-2'
              onClick={logoutUser}>
              <Link to='#' className='nav-link'>
                <FaSignOutAlt color="black" fontSize="1.25em"/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
