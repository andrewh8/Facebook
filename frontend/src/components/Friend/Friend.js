import React from 'react';
import { Link } from 'react-router-dom';
function Friend({friend}) {

  return (
    <div className="card">
      <div className="card-body text-center">
        <Link className='text-decoration-none' to={`/profile/${friend._id}`}>
          <h1 className="card-title text-dark">{friend.name}</h1>
        </Link>
      </div>
    </div>
  )
}

export default Friend
