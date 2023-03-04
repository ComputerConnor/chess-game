import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChessBoard from '../components/chessboard/chessBoard';

function MainPage() {
    const navigateTo = useNavigate();
  return (
      <div className='main'>
        <ChessBoard />
        <header>
            <div className='logo'>Chess Game</div>
        </header>
        <div className='buttons'>
              <div className='friend' onClick={() =>navigateTo('./friendGame')}>
                  <button>play with freind</button>
              </div>
              <div className='computer' onClick={() => navigateTo('./computerGame')}>
                  <button>play with computer</button>
              </div>
              <div className='tutorial' onClick={() => navigateTo('./tutorial')}>
                  <button>quick tutorial</button>
              </div>
        </div>
      </div>
  )
}

export default MainPage;