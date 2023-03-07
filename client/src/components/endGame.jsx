import React from 'react'
import { useNavigate } from 'react-router-dom';
import { verifyCookie } from './generalOperations/cookiesOperations';

const EndGame = ({ end, setError, computer }) => {
    // realtime operations and status
    const { socket } = useContext(socketContext);
    // 
    // navigation function
    const navigateTo = useNavigate();

    function goHome() {
        // delete cookie (let it expire right now)
        document.cookie = "code=; max-age=0";
        navigateTo('/');
    }

    function rematch() {
        if (!computer) {
            if (verifyCookie('code')) {
                let code = verifyCookie('code');
                socket.on('rematch', code);
                // based on acceptance or rejection of other user act
                // also don't forget to set in cookies something indicate the popup
                // is present and if rematch accepting is being awaited cookie
            } else {
                setError('something went wrong!');
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } else {
            // reset states
            // reset redux states
            // reset cookies
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