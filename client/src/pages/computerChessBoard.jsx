import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChessBoard from '../components/chessboard/chessBoard';

const ComputerChessBoard = () => {
  /*
    
    check for fen and positions states in cookies if they does exist in case of refreshing the page
    if yes set them to the states
    if no 
    but what if the player during the play delete the fen and positions states and refreshe the page how to know that so you can start new game with same level, or you can store all data in one cookie and if he delete it you would know
  
  or store just the userId and code game in cookies and all states of the game between two player in the server side until the game end, since it's a multiplayer online game it's not accurate to store the progress of a player in its broswer and he will be able to access and tamper it, there are two situation 
  he has userId and game code so he can keep playing with other player if he don't have the code and userId then the game ended it's better than enabling him to tamper and change his progress with other player game, so as long as he have the code and userId he will still get the progress of his game even he refresh the page but if there's no code or userId he will be redirected out of the game page and send to server that there's no code for a user and other player must stay waiting for him until the timer is done and if he send rematch (but other player has deleted the cookies, and also what happens to the room if one of the users refresh the page and got new socket so each time a socket connect i should send with connect event the code and assign it to a room with the same value of code is it possible to send data with connect event)
 
in terms of computer game just store the data in cookies if he tamper one of them reset the game except few states that doesn't change anything if they are tampered

  */

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