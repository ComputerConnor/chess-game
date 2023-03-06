import React from 'react'
import { useNavigate } from 'react-router-dom';
import { verifyCookie } from './generalOperations/cookiesOperations';

const EndGame = ({ end, setError }) => {
    // realtime operations and status
    const { socket } = useContext(socketContext);
    // navigation function
    const navigateTo = useNavigate();

    function goHome() {
        // delete cookie (let it expire right now)
        document.cookie = "code=; max-age=0";
        navigateTo('/');
    }

    function rematch() {
        if (verifyCookie('code')) {
            let code = verifyCookie('code');
            socket.on('rematch', code);
        } else {
            setError('something went wrong!');
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    }

    return (
        <div className='endGame'>
            <div className="endMessage">
                {end}
            </div>
            <button id="goHome" onClick={goHome}>go home</button>
            <button id="rematch" onClick={rematch}>rematch</button>
        </div>
    )
}

export default EndGame