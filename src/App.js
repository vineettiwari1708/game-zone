import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TicTacToe from './components/games/TicTacToe';
import SnakeGame from './components/games/SnakeGame';  // Add Snake Game here
import './App.css';

const App = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <Router>
      <Navbar />
      <div className={`container ${isFullscreen ? 'fullscreen' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/snakegame" element={<SnakeGame />} />
          {/* Add more game routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
