import React from 'react';

function Post({post}) {

  return (
    <div>
      {post.content}
      {post.comments}
    </div>
  );
}

export default Post;
