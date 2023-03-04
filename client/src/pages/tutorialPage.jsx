import React, { useState } from 'react';

function TutorialPage() {
  const [showPieces, setShowPieces] = useState(false);
  const [showCastling, setShowCastling] = useState(false);
  const [showCheckmate, setShowCheckmate] = useState(false);
  const [showStalemate, setShowStalemate] = useState(false);
  const [showResults, setShowResults] = useState(false);

  return (
    <div className='tutorial'>
    <div>
      <h1>Chess Game Tutorial</h1>

      <h2 onClick={() => setShowPieces(!showPieces)}>Chess Pieces</h2>
      {showPieces && (
        <div>
          <div className="piece">
            <img src="https://example.com/pawn.png" alt="Pawn" />
            <p>The pawn moves forward one or two squares on its first move, then one square forward on subsequent moves. It captures diagonally.</p>
          </div>
          <div className="piece">
            <img src="https://example.com/rook.png" alt="Rook" />
            <p>The rook moves horizontally or vertically any number of squares. It can't jump over other pieces.</p>
          </div>
          <div className="piece">
            <img src="https://example.com/knight.png" alt="Knight" />
            <p>The knight moves to any of the squares immediately adjacent to it, then moves two squares perpendicular to the first move. It's the only piece that can jump over other pieces.</p>
          </div>
          <div className="piece">
            <img src="https://example.com/bishop.png" alt="Bishop" />
            <p>The bishop moves diagonally any number of squares. It can't jump over other pieces.</p>
          </div>
          <div className="piece">
            <img src="https://example.com/queen.png" alt="Queen" />
            <p>The queen can move any number of squares along a rank, file, or diagonal. It can't jump over other pieces.</p>
          </div>
          <div className="piece">
            <img src="https://example.com/king.png" alt="King" />
            <p>The king moves one square in any direction. It can't move into check, or stay in check.</p>
          </div>
        </div>
      )}

      <h2 onClick={() => setShowCastling(!showCastling)}>Castling</h2>
      {showCastling && (
        <div>
          <img src="https://example.com/castling.png" alt="Castling" />
          <p>Castling is a move involving a player's king and either of the player's original rooks. Castling consists of moving the king two squares towards a rook on the player's first rank, then moving the rook to the square over which the king crossed. The king and the rook must be on the player's first rank, and no squares between them may be occupied by any pieces.</p>
        </div>
      )}

      <h2 onClick={() => setShowCheckmate(!showCheckmate)}>Checkmate</h2>
      {showCheckmate && (
                <div>
                     <img src="https://example.com/checkmate.png" alt="Checkmate" />
                  <p>Checkmate is a situation in chess where the king is in check (threatened with capture) and there is no way to remove the threat or block the attack. The game is then over, and the player whose king is checkmated loses.</p>
                </div>)
        }

            <h2 onClick={() => setShowStalemate(!showStalemate)}>
                  Stalemate
            </h2>
            {showStalemate && (
                    <div>
                        <p>Stalemate is a situation in chess where the player whose turn it is to move is not in check, but has no legal move. The game ends in a draw.</p>
                    </div>
           )}

            <h2 onClick={() => setShowResults(!showResults)}>Results</h2>
            {showResults && (
                <div>
                <ul>
                    <li>Checkmate: the player whose king is checkmated loses</li>
                    <li>Stalemate: the game ends in a draw</li>
                    <li>Draw by agreement: both players agree to a draw</li>
                    <li>Draw by repetition: the same position occurs three times with the same player to move</li>
                    <li>Draw by the fifty-move rule: no pawn has moved and no capture has been made in the last fifty moves by both players</li>
                </ul>
                </div>
            )}
        </div>
    </div>
  )
}

export default TutorialPage