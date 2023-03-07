import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ComputerGamePage = () => {
    const [level, setLevel] = useState(0);
    const navigateTo = useNavigate();
    function chooseLevel(levelValue) {
        setLevel(levelValue);
        navigateTo('/computerChessBoard');
    }
    return (
        <div className='computerGame'>
            <div className='logo'>
                <span>Chess Game</span>
            </div>
            <div className="sidePart">
                <img src="./imgs/chessboard.png" alt="chess board" title="chess game" />
            </div>
            <div className="btns">
                <h2>choose computer level</h2>
                <button className="btn" onClick={() => chooseLevel(0)}>beginner</button>
                <button className="btn" onClick={() => chooseLevel(1)}>intermediate</button>
                <button className="btn" onClick={() => chooseLevel(2)}>advanced</button>
                <button className="btn" onClick={() => chooseLevel(3)}>master</button>
            </div>
        </div>
    )
}

export default ComputerGamePage