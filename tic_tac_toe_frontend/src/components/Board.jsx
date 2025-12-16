import React from 'react';
import Square from './Square';

/**
 * Board component renders a 3x3 grid of squares.
 * Props:
 * - squares: array(9) of 'X' | 'O' | null
 * - onSquareClick: function(index) -> void
 * - disabled: boolean to prevent further moves when game ends
 * - nextPlayer: 'X' | 'O' (used for aria labeling)
 */
// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, disabled = false, nextPlayer }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe Board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onSquareClick(idx)}
          disabled={disabled || Boolean(value)}
          index={idx}
          nextPlayer={nextPlayer}
        />
      ))}
    </div>
  );
}
