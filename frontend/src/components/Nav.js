import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {

  return (
    <nav className="Nav">
      <div>
        Facebook
      </div>
      <ul className='navLinks'>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/profile'>
          <li>Profile</li>
        </Link>
        <Link to='/login'>
          <li>Login</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
