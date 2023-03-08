import React, { useEffect, useState } from 'react';
import './pagesCss/friendChessBoard.css';
import { useSelector } from 'react-redux';
import ChessBoard from '../components/chessboard/chessBoard';
import GameDetails from '../components/friendChessBoard/gameDetails';
import EndGame from '../components/endGame';
import SomethingWentWrong from '../components/somethingWentWrong';

const FriendChessBoard = () => {
  // positionsState
  const positionsState = useSelector(state => state.positionsState); B
  // fenState
  const fenState = useSelector(state => state.fenState); B
  // checkmate is done
  const [checkmate, setCheckmate] = useState(false);
  // detect who's the winner
  const [gameWinner, setGameWinner] = useState(null);
  // end game between players
  const [end, setEnd] = useState(null); B
  // an error has occured
  const [error, setError] = useState(null);
  // state that detects wether a player can do operations such as sending messages, send rematch and click on the board, it's set to true when a player join game room or when a player accept rematch and set to false when game end
  const [operationsAllowed, setOperationsAllowed] = useState(false); B
  // timer can start or not
  const [runInterval, setRunInterval] = useState(() => {
    B
    if (operationsAllowed) return true;
    return false;
  });
  // the timer to detect game duration
  const [timing, setTiming] = useState(() => {
    if (verifyCookie('timer')) {
      const min = parseInt('6-9'.split('-')[0]);
      const sec = parseInt('6-9'.split('-')[1]);
      return { min, sec };
    }
    return { min: 10, sec: 00 };
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

  useEffect(() => {
    socket.on('rematchAccepted', () => {
      setTiming({ min: 10, sec: 00 });
      setOperationsAllowed(true);
      setInform('Rematch Accepted');
      setTimeout(() => {
        setInform(null);
      }, 3000);
    });
    socket.on('rematchRejected', () => {
      setInform('Rematch Rejected');
      setTimeout(() => {
        setInform(null);
      }, 3000);
    });
  }, [])

  return (
    <div className='friendBoard'>
      <div className='logo'>
        <span>Chess Game</span>
      </div>
      <ChessBoard checkmate={checkmate} setCheckmate={setCheckmate} gameWinner={gameWinner} setGameWinner={setGameWinner} setError={setError} setEnd={setEnd} />
      <GameDetails operationsAllowed={operationsAllowed} runInterval={runInterval} setRunInterval={setRunInterval} timing={timing} setTiming={setTiming} setEnd={setEnd} setError={setError} />
      {end ? <EndGame end={end} setError={setError} computer={positionsState.computer} /> : ''}
      {error ? <SomethingWentWrong text={error} /> : ''}
    </div>
  )
}

export default FriendChessBoard;