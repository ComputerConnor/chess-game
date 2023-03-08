import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socketContext } from '../App';
import SomethingWentWrong from '../components/somethingWentWrong';
import { updatePiecesColor } from '../states/positionsState';

function FriendGamePage() {
  const { socket, isConnected, userId } = useContext(socketContext);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState(false);
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);

  function enterGameCode(e) {
    setPopUp(true);
  }
  function createNewGame(e) {
    // create room , give it the white player
    if (isConnected && userId) {
      socket.emit('createRoom', userId);
      socket.on('recieveCode', (code) => {
        setCode(code);
        document.cookie = `code=${code}; max-age=${60 * 10 + 15}`;
      });
      navigateTo('/friendChessBoards');
    } else {
      setError('Something Went Wrong!');
      setTimeout(() => {
        setError(null);
      }, 3000);
    };
  }
  function checkCode(e) {
    e.preventDefault();
    const formData = new FormData();
    if (!code || code.length < 8) return;
    formData.append('code', code);
    try {
      const { isCodeValid } = axios.post("./http://localhost:5001/code", {
        withCredentials: true,
        body: formData
      });
      if (!isCodeValid || !userId) {
        setError('Your Code is Invalid');
        setTimeout(() => {
          setError(null);
        }, 3000);
      } else {
        socket.emit('joinGame', code, userId);
        // set the pieces color of user to black if he joined it and not created it
        dispatch(updatePiecesColor('black'));
        navigateTo('/friendChessBoard');
      }
    } catch (err) {
      setError('Something Went Wrong!');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }
  return (
    <div className='friendGame'>
      <div className='friendGameButtons'>
        <div className='friend' onClick={enterGameCode}>
          <button>Join A Friend's Game</button>
        </div>
        <div className='computer' onClick={createNewGame}>
          <button>Create A New Game</button>
        </div>
      </div>
      {
        popUp && (
          <form onSubmit={checkCode}>
            <input type="text" name='code' onChange={(e) => setCode(e.target.value)} required placeholder="Enter Game Code..." />
            <button type="submit">Join Game</button>
            <button onClick={() => setPopUp(false)}>Close</button>
          </form>
        )
      }
      {
        error && <SomethingWentWrong text={error} />
      }
    </div>
  )
}

export default FriendGamePage;