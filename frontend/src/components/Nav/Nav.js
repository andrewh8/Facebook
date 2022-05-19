import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaUserFriends,
  FaSignOutAlt,
  FaBell,
  FaHome,
} from 'react-icons/fa';
import { Context } from '../../Context';
import { useNavigate } from 'react-router-dom'
import './Nav.css';

function Nav() {

  const {user, setUser} = useContext(Context);
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser('');
    localStorage.removeItem('jwt');
    navigate('/login');
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-light fixed-top'>
      <div className='container-fluid'>
        <Link to='/'>
          <FaFacebook className='FacebookLogo' color="#17A9FD" fontSize="2.5em"/>
        </Link>

        <form className="d-flex" role="search">
          <input className="searchBar form-control me-2 mx-3" type="search" placeholder="Search Facebook" aria-label="Search"/>
        </form>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto'>
            <li className='profileLink nav-item pt-1 rounded-pill'>
              <Link to='/profile' className='nav-link fs-5 fw-semibold text-dark'>
                <div className='pb-2'>
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
              <Link to='/' className='nav-link'>
                <FaUserFriends color="black" fontSize="1.25em"/>
              </Link>
            </li>
            <li className='nav-item pb-1 linkIcon mx-2 d-flex align-items-center justify-content-center mt-2'>
              <Link to='/' className='nav-link'>
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
