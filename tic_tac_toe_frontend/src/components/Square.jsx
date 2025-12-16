import React from 'react';

/**
 * Square component represents a single cell in the board.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - disabled: boolean
 * - index: number (0..8)
 * - nextPlayer: 'X' | 'O' (used to inform the aria-label for next action)
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, index, nextPlayer }) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  const label = value
    ? `Square ${row}, ${col}, ${value}`
    : `Square ${row}, ${col}, empty. Place ${nextPlayer}`;

  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      role="gridcell"
    >
      {value}
    </button>
  );
}
