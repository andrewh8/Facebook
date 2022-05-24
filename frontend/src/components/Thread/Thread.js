import React, { useState, useEffect } from 'react';
import Post from '../Post/Post';

function Thread({user}) {
  const [posts, setPosts] = useState([]);

  // Fetch user posts
  const getPosts = () => {
    fetch('http://localhost:5000/api/posts', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
    })
    .then(res => {
      if (!res.ok) {
        throw Error('Failed to Load Posts');
      }
      return res.json()
    })
    .then(data => {
      setPosts(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      I'm Thread
      {posts.map((post) => {
          return <Post key={post._id} post={post} />
        })}
    </div>
  );
}

export default Thread;
