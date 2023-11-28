import React, { useState } from 'react';
import axios from 'axios';

function NewStory() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('body', body);
    if (image) formData.append('image', image);
  
    try {
      await axios.post('http://localhost:8000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Clear the form fields
      setTitle('');
      setDate('');
      setBody('');
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Create New Story</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <textarea placeholder="Story" value={body} onChange={e => setBody(e.target.value)} required />
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewStory;