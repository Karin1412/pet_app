// PostList.js
import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div className="posts">
      {posts.length === 0 ? (
        <p className="text-black">Không có bài đăng nào.</p>  
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post m-4 p-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold text-black">{post.title}</h2>
            <p className="text-black">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
