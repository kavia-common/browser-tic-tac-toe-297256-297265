import React from 'react';

/**
 * GameStatus displays current game status text.
 * Props:
 * - status: string ("Turn: X", "Turn: O", "X wins!", "O wins!", "It's a draw!")
 */
// PUBLIC_INTERFACE
export default function GameStatus({ status }) {
  return (
    <div className="status" aria-live="polite" aria-atomic="true">
      {status}
    </div>
  );
}
