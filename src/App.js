import { useEffect } from 'react';
import './Files/style.css';

function App() {
  useEffect(() => {
    const gameContainer = document.querySelector(".game-container");
    const scoreContainer = document.querySelector(".score-container");

    let foodX, foodY;
    let headX = 12, headY = 12;
    let velocityX = 0, velocityY = 0;
    let snakeBody = [];
    let score = 0;

    const GRID_SIZE = 25;

    scoreContainer.innerHTML = "Score : " + score;

    function generateFood() {
      foodX = Math.floor(Math.random() * GRID_SIZE) + 1;
      foodY = Math.floor(Math.random() * GRID_SIZE) + 1;

      // Prevent food spawning on snake
      for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] === foodX && snakeBody[i][1] === foodY) {
          generateFood();
        }
      }
    }

    function gameOver() {
      alert("Game Over!");
      headX = 12;
      headY = 12;
      velocityX = 0;
      velocityY = 0;
      snakeBody = [];
      score = 0;
      scoreContainer.innerHTML = "Score : " + score;
      generateFood();
    }

    function renderGame() {
      let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;

      if (foodX === headX && headY === foodY) {
        snakeBody.push([foodX, foodY]);
        generateFood();
        score += 10;
        scoreContainer.innerHTML = "Score : " + score;
      }

      snakeBody.pop();
      headX += velocityX;
      headY += velocityY;

      snakeBody.unshift([headX, headY]);

      // Wall collision
      if (headX <= 0 || headY <= 0 || headX > GRID_SIZE || headY > GRID_SIZE) {
        gameOver();
      }

      // Self collision
      for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
          gameOver();
        }
      }

      for (let i = 0; i < snakeBody.length; i++) {
        updatedGame += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
      }

      gameContainer.innerHTML = updatedGame;
    }

    generateFood();
    const intervalId = setInterval(renderGame, 150);

    document.addEventListener("keydown", (e) => {
      const key = e.key;
      if (key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      } else if (key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      } else if (key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      } else if (key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container">
      <div className="score-container">Press any (left right up down) key to start</div>
      <div className="game-container"></div>
    </div>
  );
}

export default App;
