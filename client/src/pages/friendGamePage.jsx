import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socketContext } from '../App';
import SomethingWentWrong from '../components/somethingWentWrong';

function FriendGamePage() {
  const navigateTo = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [code, setCode] = useState(() => {
    // check if does exist in cookies if yes return it;
    return null;
  });
  const { socket } = useContext(socketContext);
  const friendGame = useRef();
  function enterGameCode(e) {
    setPopUp(true);
  }
  function createNewGame(e) {
    // create room , give it the white player
    // check the userId does exist in cookies if yes
    // socket.emit('createGame', userId);
    // generate code for the room then send it back
    // socket.on('recieveCode',(code)=>{
      // setCode(code);
    // });
    // navigateTo('/friendChessBoards');
    // else generate new one then do all this
  }
  function checkCode(e) {
    const formData = new FormData();
    if (!code || code.length < 8) return;
    formData.append('code', code);
    try {
      const { isCodeValid } = axios.post("./http://localhost:5001/code", {
        withCredentials: true,
        body: formData
      });
      if (!isCodeValid) {
        friendGame.current.append(<SomethingWentWrong text='Your Code is Invalid' />);
      } else {
        navigateTo('/chessboard');
        // socket.emit('joinGame', code, userId);
        // give him the black player
      }
    } catch (err) {
      friendGame.current.append(<SomethingWentWrong text='Something Went Wrong!' />);
    }
  }
  return (
    <div ref={friendGame} className='friendGame'>
      <div className='friendGameButtons'>
        <div className='friend' onClick={enterGameCode}>
          <button>Join Your Friend's Game</button>
        </div>
        <div className='computer' onClick={createNewGame}>
          <button>Create A New Game</button>
        </div>
      </div>
      {
        popUp && (
          <form onSubmit={checkCode}>
            <input type="text" name='code' required />
            <button type="submit">Join Game</button>
          </form>
        )
      }
    </div>
  )
}

export default FriendGamePage;