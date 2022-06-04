import React, { useState, useEffect } from 'react';
import Post from '../Post/Post';

function ProfileThread({id, profile}) {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState([]);

  // Fetch Profile posts
  const getPosts = () => {
    fetch(`/api/posts/profile/${id}`, {
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
  }, [id, refresh]);

  return (
    <div>
      {posts.slice(0).reverse().map((post) => {
          return <Post key={post._id} post={post} posts={posts} setPosts={setPosts} id={id} profile={profile} getPosts={getPosts} setRefresh={setRefresh}/>
        })}
    </div>
  );
}

export default ProfileThread;
