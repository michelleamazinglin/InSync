import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function StoryDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      navigate('/');
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div>
      <h1>Story Detail</h1>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{post.body}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default StoryDetail;