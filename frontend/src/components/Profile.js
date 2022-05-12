import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import {Link} from 'react-router-dom';

function Profile() {

  const {userId, setUserId, token, setToken} = useContext(Context);

  return (
    <div>
      Profile
      {userId}
      <Link to='/login'>
        <li>Login</li>
      </Link>
    </div>
  );
}

export default Profile;
