import React from 'react';
import './App.css';
import NameCard from './NameCard.js';
import PostCard from './PostCard.js';

function App() {
  return (
    <div className="center">
      <div className="row">
          <NameCard />
          <PostCard />
      </div>
    </div>
  );
}

export default App;
