import React, { useState } from 'react';
import './pagesCss/friendChessBoard.css';
import { useSelector } from 'react-redux';
import ChessBoard from '../components/chessboard/chessBoard';
import GameDetails from '../components/gameDetails';

const FriendChessBoard = () => {
  // positionsState
  const positionsState = useSelector(state => state.positionsState);
  // checkmate is done
  const [checkmate, setCheckmate] = useState(false);
  // detect who's the winner
  const [gameWinner, setGameWinner] = useState(null);
  // end game between players
  const [end, setEnd] = useState(false);
  // an error has occured
  const [error, setError] = useState(null);
  // state that detects wether a player can do operations such as sending messages, send rematch and click on the board
  const [operationsAllowed, setOperationsAllowed] = useState(false);

  useEffect(() => {
    if (gameWinner === positionsState.piecesColor) {
      setEnd('You Won This Game');
      setOperationsAllowed(false);
    } else {
      setEnd('You lose In this Game');
      setOperationsAllowed(false);
    }
  }, [checkmate, gameWinner]);

  return (
    <div className='friendBoard'>
      <div className='logo'>
        <span>Chess Game</span>
      </div>
      <ChessBoard checkmate={checkmate} setCheckmate={setCheckmate} gameWinner={gameWinner} setGameWinner={setGameWinner} setError={setError} setEnd={setEnd} />
      <GameDetails operationsAllowed={operationsAllowed} />
      {end ? <EndGame setError={setError} end={end} /> : ''}
      {error ? <SomethingWentWrong text={error} /> : ''}
    </div>
  )
}

export default FriendChessBoard;