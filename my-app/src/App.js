import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbar';
import Home from './components/Home';
import NewStory from './components/NewStory';
import StoryDetail from './components/StoryDetail';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-story" element={<NewStory />} />
        <Route path="/story/:id" element={<StoryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;