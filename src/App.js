import React, { useState } from 'react';
import './App.css';


function calculateWinner(board) {
  const rows = board.length;
  const cols = board[0].length;


  // 检查水平方向
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= cols - 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (board[i][j + k] && board[i][j + k] === board[i][j + k + 1] && board[i][j + k] === board[i][j + k + 2] && board[i][j + k] === board[i][j + k + 3] && board[i][j + k] === board[i][j + k + 4]) {
          return board[i][j + k];
        }
      }
    }
  }


  // 检查垂直方向
  for (let i = 0; i <= rows - 5; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < 5; k++) {
        if (board[i + k][j] && board[i + k][j] === board[i + k + 1][j] && board[i + k][j] === board[i + k + 2][j] && board[i + k][j] === board[i + k + 3][j] && board[i + k][j] === board[i + k + 4][j]) {
          return board[i + k][j];
        }
      }
    }
  }


  // 检查正斜方向
  for (let i = 0; i <= rows - 5; i++) {
    for (let j = 0; j <= cols - 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (board[i + k][j + k] && board[i + k][j + k] === board[i + k + 1][j + k + 1] && board[i + k][j + k] === board[i + k + 2][j + k + 2] && board[i + k][j + k] === board[i + k + 3][j + k + 3] && board[i + k][j + k] === board[i + k + 4][j + k + 4]) {
          return board[i + k][j + k];
        }
      }
    }
  }


  // 检查反斜方向
  for (let i = 4; i < rows; i++) {
    for (let j = 0; j <= cols - 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (board[i - k][j + k] && board[i - k][j + k] === board[i - k - 1][j + k + 1] && board[i - k][j + k] === board[i - k - 2][j + k + 2] && board[i - k][j + k] === board[i - k - 3][j + k + 3] && board[i - k][j + k] === board[i - k - 4][j + k + 4]) {
          return board[i - k][j + k];
        }
      }
    }
  }


  return null;
}


function calculateStatus(board, xIsNext) {
  const winner = calculateWinner(board);
  if (winner) {
    return `Winner: ${winner}`;
  } else {
    return `Next player: ${xIsNext? 'X' : 'O'}`;
  }
}


function Board({ board, onSquareClick, xIsNext, status }) {
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((square, j) => (
              <button
                key={j}
                className="square"
                onClick={() => onSquareClick(i, j)}
                style={{
                  width: '30px',
                  height: '30px',
                  fontSize: '20px'
                }}
              >
                {square}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


function Game() {
  const [history, setHistory] = useState([Array.from({ length: 15 }, () => Array(15).fill(null))]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const currentBoard = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const status = calculateStatus(currentBoard, xIsNext);


  const handleSquareClick = (row, col) => {
    if (gameOver || currentBoard[row][col] || calculateWinner(currentBoard)) {
      return;
    }
    const newBoard = currentBoard.map(rowArr => [...rowArr]);
    newBoard[row][col] = xIsNext? 'X' : 'O';
    const newHistory = history.slice(0, currentMove + 1);
    newHistory.push(newBoard);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameOver(true);
    }
  };


  const jumpTo = (move) => {
    setCurrentMove(move);
    setGameOver(false);
  };


  const moves = history.map((step, move) => {
    const description = move === 0? 'Go to game start' : `Go to move #${move}`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return (
    <div className="game">
      <Board
        board={currentBoard}
        onSquareClick={handleSquareClick}
        xIsNext={xIsNext}
        status={status}
      />
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="app">
      <Game />
    </div>
  );
}


export default App({
  plugins:[react()],
  base:"/kemaomaoaaaa",
});
