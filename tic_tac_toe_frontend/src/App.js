import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Board from './components/Board';
import GameStatus from './components/GameStatus';

// PUBLIC_INTERFACE
function App() {
  /**
   * This component hosts the Tic Tac Toe game.
   * - Manages game state (squares, next player, winner, draw)
   * - Provides handlers to Board and renders GameStatus
   * - Maintains existing light/dark theme toggle if present in template
   */
  const [theme, setTheme] = useState('light');

  // Game state
  const [squares, setSquares] = useState(Array(9).fill(null)); // 9 squares
  const [xIsNext, setXIsNext] = useState(true); // true => X's turn
  const [winner, setWinner] = useState(null); // 'X' | 'O' | null
  const [isDraw, setIsDraw] = useState(false);

  // Apply theme to document root to leverage existing CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Calculate winner whenever squares change
  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
      setIsDraw(false);
    } else if (squares.every((s) => s !== null)) {
      setIsDraw(true);
    } else {
      setIsDraw(false);
    }
  }, [squares]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    // No move allowed if there is a winner or draw, or square is filled
    if (winner || isDraw || squares[index]) return;

    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  const statusText = useMemo(() => {
    if (winner === 'X') return 'X wins!';
    if (winner === 'O') return 'O wins!';
    if (isDraw) return "It's a draw!";
    return `Turn: ${xIsNext ? 'X' : 'O'}`;
  }, [winner, isDraw, xIsNext]);

  return (
    <div className="App">
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="game-container" role="application" aria-label="Tic Tac Toe Game">
          <h1 className="game-title">Tic Tac Toe</h1>

          <GameStatus status={statusText} />

          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            disabled={Boolean(winner) || isDraw}
            nextPlayer={xIsNext ? 'X' : 'O'}
          />

          <div className="controls">
            <button
              type="button"
              className="btn btn-reset"
              onClick={handleReset}
              aria-label="Start a new game"
            >
              New Game
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

// Helper: determine winner from current squares
function calculateWinner(sq) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diags
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return sq[a];
    }
  }
  return null;
}

export default App;
