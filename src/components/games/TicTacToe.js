import React, { useState } from "react";
import "../../css/tictactoe.css";  // Ensure you have a CSS file for styles

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("Player X's turn");

  const handleClick = (index) => {
    if (board[index] || gameOver) return;  // Ignore if cell is already filled or game is over

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (checkWin(newBoard)) {
      setMessage(`Player ${isXNext ? "X" : "O"} wins!`);
      setGameOver(true);
    } else if (newBoard.every((cell) => cell)) {
      setMessage("It's a draw!");
      setGameOver(true);
    } else {
      setMessage(`Player ${isXNext ? "O" : "X"}'s turn`);
    }
  };

  const checkWin = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    return winPatterns.some(([a, b, c]) => {
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setMessage("Player X's turn");
  };

  return (
    <div className="tic-tac-toe-container">
      <h2>Tic Tac Toe</h2>
      <div className="message">{message}</div>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-btn">Reset Game</button>
    </div>
  );
};

export default TicTacToe;
