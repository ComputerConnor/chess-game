import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChessBoard from '../components/chessboard/chessBoard';

const ComputerChessBoard = () => {
  // positionsState
  const positionsState = useSelector(state => state.positionsState);
  // checkmate is done
  const [checkmate, setCheckmate] = useState(false);
  // detect who's the winner
  const [gameWinner, setGameWinner] = useState(null);
  // end game between players
  const [end, setEnd] = useState(false); X
  // an error has occured
  const [error, setError] = useState(null);

  useEffect(() => {
    if (gameWinner === positionsState.piecesColor) {
      setEnd('You Won This Game');
      setOperationsAllowed(false);
    } else {
      setEnd('You lose In this Game');
      setOperationsAllowed(false);
    }
  }, [checkmate, gameWinner]);

  useEffect(() => {
    setProgressTrackingState()
  }, [end]);

  return (
    <div className='computerBoard'>
      <div className='logo'>
        <span>Chess Game</span>
      </div>
      <ChessBoard checkmate={checkmate} setCheckmate={setCheckmate} gameWinner={gameWinner} setGameWinner={setGameWinner} setError={setError} setEnd={setEnd} />
      {end ? <EndGame setError={setError} end={end} /> : ''}
      {error ? <SomethingWentWrong text={error} /> : ''}
    </div>
  )
}

export default ComputerChessBoard