import React, { useState } from 'react';
import './pagesCss/friendChessBoard.css';
import { useSelector } from 'react-redux';
import ChessBoard from '../components/chessboard/chessBoard';
import GameDetails from '../components/friendChessBoard/gameDetails';

const FriendChessBoard = () => {
  // positionsState
  const positionsState = useSelector(state => state.positionsState);
  // checkmate is done
  const [checkmate, setCheckmate] = useState(false);
  // detect who's the winner
  const [gameWinner, setGameWinner] = useState(null);
  // end game between players
  const [end, setEnd] = useState(null);
  // an error has occured
  const [error, setError] = useState(null);
  // state that detects wether a player can do operations such as sending messages, send rematch and click on the board, it's set to true when a player join game room or when a player accept rematch and set to false when game end
  const [operationsAllowed, setOperationsAllowed] = useState(false);
  // timer can start or not
  const [runInterval, setRunInterval] = useState(() => {
    if (operationsAllowed) return true;
    return false;
  });

  useEffect(() => {
    if (gameWinner === positionsState.piecesColor) {
      setEnd('You Won in This Game');
      setOperationsAllowed(false);
    } else {
      setEnd('You lost In this Game');
      setOperationsAllowed(false);
    }
  }, [checkmate, gameWinner]);

  return (
    <div className='friendBoard'>
      <div className='logo'>
        <span>Chess Game</span>
      </div>
      <ChessBoard checkmate={checkmate} setCheckmate={setCheckmate} gameWinner={gameWinner} setGameWinner={setGameWinner} setError={setError} setEnd={setEnd} />
      <GameDetails operationsAllowed={operationsAllowed} runInterval={runInterval} setRunInterval={setRunInterval} />
      {end ? <EndGame end={end} setError={setError} computer={computer} /> : ''}
      {error ? <SomethingWentWrong text={error} /> : ''}
    </div>
  )
}

export default FriendChessBoard;