import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import {
  FaEllipsisH,
} from 'react-icons/fa';
import './Post.css';

function Post({post, posts, setPosts, id, profile}) {
  const {user} = useContext(UserContext);
  const [postContent, setPostContent] = useState('');
  const postContentChange = (e) => {
    setPostContent(e.target.value);
  }

  const updatePost = () => {
    fetch(`http://localhost:5000/api/posts/${post._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        content: postContent,
      })
    })
  }

  const deletePost = () => {
    fetch(`http://localhost:5000/api/posts/${post._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }})
      .then((res) => {
        if(res.ok) {
          const id = posts.indexOf(post);
          posts.splice(id, 1);
          setPosts(posts)
        }
      })
  }

  return (
    <div className="card mb-3 shadow-sm border border-1">
      <div className="card-body pb-1">
        <div className='d-flex align-items-center justify-content-between'>
          <div className='text-start'>
            <div className="my-0 fw-semibold">{profile.name}</div>
            <div className="date-text my-0 text-secondary">Date / Time</div>
          </div>

          {/* Edit and Delete Buttons */}
          {(user._id === id) &&
          <div className="dropdown">
            <button className="btn border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <FaEllipsisH className='text-secondary'/>
            </button>
            <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target={`#editModal${post._id}`}>Edit</a></li>
              <li><a className="dropdown-item" onClick={deletePost}>Delete</a></li>
            </ul>
          </div>
          }
        </div>

        {/* Post Content */}
        <p className="card-text text-start">{post.content}</p>
        <hr className='mb-1'/>

        {/* Like and Comment Buttons */}
        <div className='d-flex align-items-center justify-content-evenly m-0'>
          <button className='border-0 bg-white text-secondary fw-semibold'>Like</button>
          <button className='border-0 bg-white text-secondary fw-semibold'>Comment</button>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id={`editModal${post._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className='mb-3'>
                  <textarea
                    rows="8" 
                    cols="60"
                    className='form-control'
                    onChange={postContentChange}
                    defaultValue={post.content}
                    type="text" 
                    name="email" 
                    id="email"
                    required>
                  </textarea>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit" onClick={updatePost}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
