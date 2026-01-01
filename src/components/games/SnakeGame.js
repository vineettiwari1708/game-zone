// src/SnakeGame.js
import React, { useState, useEffect, useRef } from 'react';
import "../../css/snakegame.css"

// Constants for the game
const CANVAS_SIZE = 400;
const BLOCK_SIZE = 20;
const SNAKE_SPEED = 100; // Higher number = slower game

// Directions
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([
    { x: 80, y: 100 },
    { x: 60, y: 100 },
    { x: 40, y: 100 },
  ]);
  const [direction, setDirection] = useState(RIGHT);
  const [food, setFood] = useState({ x: 200, y: 200 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Handle key presses for movement
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' && direction !== DOWN) {
      setDirection(UP);
    } else if (e.key === 'ArrowDown' && direction !== UP) {
      setDirection(DOWN);
    } else if (e.key === 'ArrowLeft' && direction !== RIGHT) {
      setDirection(LEFT);
    } else if (e.key === 'ArrowRight' && direction !== LEFT) {
      setDirection(RIGHT);
    }
  };

  // Collision detection
  const checkCollision = (head) => {
    // Collision with walls
    if (head.x < 0 || head.x >= CANVAS_SIZE || head.y < 0 || head.y >= CANVAS_SIZE) {
      return true;
    }
    // Collision with self
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  // Generate new food
  const generateFood = () => {
    const x = Math.floor((Math.random() * (CANVAS_SIZE / BLOCK_SIZE))) * BLOCK_SIZE;
    const y = Math.floor((Math.random() * (CANVAS_SIZE / BLOCK_SIZE))) * BLOCK_SIZE;
    return { x, y };
  };

  // Game loop
  const gameLoop = () => {
    if (gameOver) return;

    // Get new head position based on the direction
    const head = { ...snake[0] };
    if (direction === UP) head.y -= BLOCK_SIZE;
    if (direction === DOWN) head.y += BLOCK_SIZE;
    if (direction === LEFT) head.x -= BLOCK_SIZE;
    if (direction === RIGHT) head.x += BLOCK_SIZE;

    // Check for collisions
    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    // Add new head to the snake
    const newSnake = [head, ...snake];

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  // Render snake and food on the canvas
  const drawGame = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // Clear canvas

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, BLOCK_SIZE, BLOCK_SIZE);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, BLOCK_SIZE, BLOCK_SIZE);

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
  };

  // Game update
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      gameLoop();
      drawGame();
    }, SNAKE_SPEED);

    return () => clearInterval(interval);
  }, [snake, food, direction, gameOver]);

  // Listen to key events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  return (
    <div>
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      {gameOver && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
