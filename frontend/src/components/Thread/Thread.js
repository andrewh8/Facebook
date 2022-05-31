import React, { useState, useEffect } from 'react';
import Post from '../Post/Post';

function Thread() {
  const [posts, setPosts] = useState([]);
  const [userList, setUserList] = useState([]);

  // Fetch user posts
  const getPosts = () => {
    fetch('http://localhost:5000/api/posts/others', {
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

  // Fetch list of all users
  const searchUsers = () => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
    })
    .then(res => res.json())
    .then(data => {
      setUserList(data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getPosts();
    searchUsers();
  },[]);

  return (
    <div>
      {posts.slice(0).reverse().map((post) => {
          return <Post key={post._id} post={post} posts={posts} setPosts={setPosts} userList={userList}/>
        })}
    </div>
  );
}

export default Thread;
