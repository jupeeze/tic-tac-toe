import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const [moveHistory, setMoveHistory] = useState([]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';

    const newMoveHistory = [...moveHistory, index];

    if (newMoveHistory.length > 6) {
      const firstMove = newMoveHistory.shift();
      newBoard[firstMove] = null;
    }

    setMoveHistory(newMoveHistory);
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setMoveHistory([]);  // 移動履歴もリセット
  };
  
  const renderSquare = (index) => {
    const isOldestMark = !winner && moveHistory.length === 6 && moveHistory[0] === index;
    return (
      <button 
        className={`square ${isOldestMark ? 'fading' : ''}`} 
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `勝者: ${winner}`;
    } else if (board.every(square => square !== null)) {
      return '引き分け';
    } else {
      return `次のプレイヤー: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="game">
      <div className="status">{getStatus()}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>リセット</button>
    </div>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default TicTacToe;
