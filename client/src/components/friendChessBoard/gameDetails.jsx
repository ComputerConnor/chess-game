import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { socketContext } from '../../App';
import { verifyCookie } from '../generalOperations/cookiesOperations';

const gameSecondPart = ({ operationsAllowed, setOperationsAllowed, runInterval, setRunInterval, timing, setTiming, setEnd, setError }) => {
  const { socket } = useContext(socketContext);
  const [message, setMessage] = useState('');
  const timer = useRef();

  function sendMessage() {
    if (operationsAllowed && message.length !== 0) {
      if (verifyCookie('code') && verifyCookie('userId') && isConnected) {
        socket.emit('message', message, code, userId);
      } else {
        setError('Something Went Wrong!');
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  }

  function endGame() {
    if (verifyCookie('code') && verifyCookie('userId') && isConnected) {
      setRunInterval(false);
      setEnd('The Game Have Been Ended!');
      socket.emit('endGame', code, userId);
      setOperationsAllowed(false);
    } else {
      setError('Something Went Wrong!');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }

  function rematch() {
    if (verifyCookie('code') && verifyCookie('userId') && isConnected) {
      socket.emit('rematch', code, userId);
    } else {
      setError('Something Went Wrong!');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (runInterval) {
        let sec = interval.sec === 0 ? 59 : interval.sec - 1;
        let min = interval.sec === 0 && interval.min !== 10 ? interval.min - 1 : interval.min;
        setTiming({ min: min, sec: sec });
        document.cookie = `timer=${min}-${sec}; max-age=${min * 60 + sec}`;
        // if min is 0 and sec is 0 the cookie will be deleted because its max age is set to 0
      }
    }, 1000);
    if (interval.sec === 0 && interval.min === 0) {
      clearInterval(interval);
      setEnd(true)
    };
    return () => {
      clearInterval(interval);
    }
  }, [runInterval]);

  return (
    <div className='secondPart'>
      <div className={`messages ${operationsAllowed ? 'notAllowed' : ''}`}>
        <div className="messagesContainer"></div>
        <div className="messagesSender">
          <input
            type="text" name="message" id="message"
            readOnly={operationsAllowed ? false : true}
            onChange={(e) => setMessage(e.target.value)}
          />
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