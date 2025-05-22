import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isDraw = !winner && board.every(square => square !== null);

  const getStatus = () => {
    if (winner) {
      return `Vencedor: ${winner}`;
    } else if (isDraw) {
      return 'Empate!';
    } else {
      return `Próximo jogador: ${isXNext ? 'X' : 'O'}`;
    }
  };

  const Square = ({ value, onClick }) => (
    <button
      className="w-20 h-20 border-2 border-gray-400 bg-white hover:bg-gray-100 text-4xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Jogo da Velha
        </h1>
        
        <div className="mb-6 text-center">
          <div className="text-xl font-semibold text-gray-700 mb-4">
            {getStatus()}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 mb-6 bg-gray-400 p-1 rounded-lg">
          {board.map((square, index) => (
            <Square
              key={index}
              value={square}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Novo Jogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;