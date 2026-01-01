import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ gameName, gamePath }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    window.open(gamePath, '_blank', 'fullscreen=yes');  // Opens the game in a new fullscreen window
  };

  return (
    <div className="game-card" onClick={handleCardClick}>
      <h3>{gameName}</h3>
    </div>
  );
};

export default GameCard;
