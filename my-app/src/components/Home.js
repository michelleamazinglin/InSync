import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {posts.map(post => (
        <div key={post._id}>
          <Link to={`/story/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.date}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;