import React, { useState, useEffect } from "react";
import "../../css/snakegame.css"; // Add the styling you need in SnakeGame.css

const SnakeGame = () => {
  const size = 15; // Grid size (15x15)
  const gridSize = size * size;

  // Game state
  const [snake, setSnake] = useState([112, 111]); // Initial snake position
  const [direction, setDirection] = useState(1); // 1: right, -1: left, size: down, -size: up
  const [food, setFood] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Place food at a random position
  const placeFood = () => {
    let foodPosition;
    do {
      foodPosition = Math.floor(Math.random() * gridSize);
    } while (snake.includes(foodPosition)); // Ensure food doesn't overlap the snake
    setFood(foodPosition);
  };

  // Draw the snake and food
  const draw = () => {
    // We rely on React to re-render the grid when the state changes
  };

  // Move the snake based on the direction
  const moveSnake = () => {
    if (gameOver) return;

    const head = snake[0];
    let next = head + direction;

    // Wall collision
    const x = head % size;
    if (
      (direction === 1 && x === size - 1) ||
      (direction === -1 && x === 0) ||
      (direction === -size && head < size) ||
      (direction === size && head >= size * (size - 1))
    ) {
      endGame();
      return;
    }

    // Self collision
    if (snake.includes(next)) {
      endGame();
      return;
    }

    const newSnake = [next, ...snake];

    if (next === food) {
      placeFood(); // Re-generate food when eaten
    } else {
      newSnake.pop(); // Remove the tail if no food is eaten
    }

    setSnake(newSnake); // Update snake state
  };

  // End the game
  const endGame = () => {
    clearInterval(intervalId);
    setGameOver(true);
    alert("Game Over!");
  };

  // Reset the game
  const resetGame = () => {
    setSnake([112, 111]);
    setDirection(1);
    setGameOver(false);
    placeFood();
    const newIntervalId = setInterval(moveSnake, 200); // Move snake every 200ms
    setIntervalId(newIntervalId);
  };

  // Handle keydown events for snake movement
  useEffect(() => {
    const handleKeydown = (e) => {
      if (gameOver) return; // Disable movement after game over

      switch (e.key) {
        case "ArrowUp":
          if (direction !== size) setDirection(-size); // Up
          break;
        case "ArrowDown":
          if (direction !== -size) setDirection(size); // Down
          break;
        case "ArrowLeft":
          if (direction !== 1) setDirection(-1); // Left
          break;
        case "ArrowRight":
          if (direction !== -1) setDirection(1); // Right
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, [direction, gameOver]);

  // Create the grid based on the snake and food positions
  const createGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      const isSnake = snake.includes(i);
      const isFood = food === i;

      const cellClass = isSnake
        ? "snake-body"
        : isFood
        ? "snake-food"
        : "snake-cell";

      grid.push(
        <div key={i} className={`snake-cell ${cellClass}`} />
      );
    }
    return grid;
  };

  // Start the game when the component mounts
  useEffect(() => {
    resetGame(); // Start game when component mounts

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []);

  return (
    <div id="snake-game-container">
      <h2>Snake Game</h2>
      <div className="snake-grid">
        {createGrid()}
      </div>
      <div className="snake-controls">
        <button className="snake-btn" onClick={resetGame}>
          Reset
        </button>
        <button className="snake-btn danger" onClick={() => window.location.reload()}>
          Close
        </button>
      </div>
      {gameOver && <div className="game-over">Game Over!</div>}
    </div>
  );
};

export default SnakeGame;
