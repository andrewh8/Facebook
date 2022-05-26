import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import {
  FaEllipsisH
} from 'react-icons/fa';
import './Post.css';

function Post({post}) {
  const {user, setUser} = useContext(UserContext);

  return (
    <div className="card my-3 shadow-sm border border-1">
      <div className="card-body">
        <div className='d-flex align-items-center justify-content-between'>
          <div className='text-start'>
            <div className="my-0 fw-semibold">{user.name}</div>
            <div className="date-text my-0 text-secondary">Date / Time</div>
          </div>
          <div className='mx-2 text-secondary'>
            <FaEllipsisH />
          </div>
        </div>
        <p className="card-text">{post.content}</p>
        {/* <a href="#" className="card-link">Card link</a>
        <a href="#" className="card-link">Another link</a> */}
      </div>
    </div>
  );
}

export default Post;
