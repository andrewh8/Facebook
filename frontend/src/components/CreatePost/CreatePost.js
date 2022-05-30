import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import './CreatePost.css';

function CreatePost() {
  const {user} = useContext(UserContext);
  const [postContent, setPostContent] = useState('');
  const postContentChange = (e) => {
    setPostContent(e.target.value);
  }

  const createPost = () => {
    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        content: postContent,
      })
    })
  }

  return (
    <div>
      <div className='card shadow-sm border border-1 py-3 mb-3'>
        <button type="button" className="text-start fs-5 createPost border-0 rounded-pill mx-4 my-2 p-2 text-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            What's on your mind, {user.name}?
        </button>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Post</h5>
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
                    placeholder={`What's on your mind, ${user.name}?`}
                    type="text" 
                    name="email" 
                    id="email"
                    required>
                  </textarea>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit" onClick={createPost}>Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
