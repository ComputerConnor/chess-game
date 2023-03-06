import React, { useContext, useState } from 'react';
import { socketContext } from '../../App';
import { verifyCookie } from '../generalOperations/cookiesOperations';

const gameSecondPart = ({ operationsAllowed, setOperationsAllowed }) => {
  const { socket } = useContext(socketContext);
  const [message, setMessage] = useState('');
  const [timing, setTiming] = useState({ min: 10, sec: 00 });
  const [runInterval, setRunInterval] = useState(() => {
    if (operationsAllowed) return true;
    return false;
  })
  const timer = useRef();

  function sendMessage() {
    if (operationsAllowed && message.length !== 0) {
      socket.emit('message', message, code, userId);
    }
  }
  function endGame() {
    setEnd('The Game Have Been Ended!');
    if (verifyCookie('code') || verifyCookie('userId')) {
      socket.emit('endGame', code, userId);
      setOperationsAllowed(false);
    } else {
      setError('Something Went Wrong!')
    }
  }
  function rematch() {
    if (verifyCookie('code') || verifyCookie('userId')) {
      socket.emit('rematch', code, userId);
    } else {
      setError('Something Went Wrong!')
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let sec = interval.sec === 0 ? 59 : interval.sec - 1;
      setInterval({ min: interval.min - 1, sec: 59 });
    }, 1000);
    if (interval.sec === 0 && interval.min === 0) clearInterval(interval);
    return () => {
      clearInterval(interval);
    }
  }, [runInterval]);

  return (
    <div className='secondPart'>
      <div className={`messages ${operationsAllowed ? 'notAllowed' : ''}`}>
        <div className="messagesContainer"></div>
        <div className="messagesSender">
          <input type="text" name="message" id="message" onChange={(e) => setMessage(e.target.value)} />
          <button id="messageButton" onClick={sendMessage}>send</button>
        </div>
      </div>
      <div className="actions">
        <button className={`endGame ${operationsAllowed ? 'notAllowed' : ''}`} onClick={endGame}>End Game</button>
        <button className={`rematch ${operationsAllowed ? 'notAllowed' : ''}`} onClick={rematch}>Rematch</button>
        <div className="timer" ref={timer}>
          <img src='./imgs/timer.png' title="timer" alt="timer" />
          {
            timing.min < 10 ? `0${timing.min}` : timing.min +
              ':' +
              timing.sec < 10 ? `0${timing.sec}` : timing.sec
          }
        </div>
      </div>
    </div >
  )
}

export default gameSecondPart;