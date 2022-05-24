import React, { useState } from 'react';

function CreatePost({user}) {
  const [postContent, setPostContent] = useState('');
  const postContentChange = (e) => {
    setPostContent(e.target.value);
  }

  const [error, setError] = useState('');
  const removeError = () => {
    setError('');
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
    .then((res) => res.json())
    .then((data) => {
      if (data.errorMessage) {
        // Handle custom Error response sent from API
        setError(data.errorMessage);
      }
    })
  }

  return (
    <div>
      <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
        What's on your mind, {user.name}?
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className=''>
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
                  <button className="btn btn-primary" type="button" onClick={createPost}>Post</button>
                </div>
              </form>
              <div className='d-flex justify-content-center'>
                {error &&
                  <div className="alert alert-danger py-1 my-5" role="alert">
                    {error}
                    <button type="button" className="btn-close ps-5" onClick={removeError}></button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
