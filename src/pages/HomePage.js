import React from 'react';
import GameCard from '../components/GameCard';
import Navbar from '../components/Navbar';
import '../css/homepage.css';  // You can create a file to style the cards

const HomePage = () => {
  return (
    <>
    <div className="home">
      <h2>Welcome to the Game Hub</h2>
      <div className="game-cards">
        <GameCard gameName="Tic Tac Toe" gamePath="/tictactoe" />
        <GameCard gameName="Snake Game" gamePath="/snakegame" />
        {/* Add more GameCards here */}
      </div>
    </div>
    </>
  );
};

export default HomePage;
