import { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { Route, Router, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import FriendGamePage from "./pages/friendGamePage";
import TutorialPage from "./pages/tutorialPage";
import PlayingPage from "./pages/playingPage";
import FriendChessBoard from "./pages/friendChessBoard";
import ComputerChessBoard from "./pages/computerChessBoard";
import NotFoundPage from "./pages/notFoundPage";
import { verifyCookie } from './components/generalOperations/cookiesOperations';

export const socketContext = createContext();

// const socket = io("https://localhost:5001", {
//   withCredentials: true
// });
let socket = { connected: true };
function App() {
  // connection state
  const [isConnected, setIsConnected] = useState(socket.connected);
  // user pieces color
  const [piecesColor, setPiecesColor] = useState('white');
  // generate userId from the player
  const [userId, setUserId] = useState(() => {
    if (!verifyCookie('userId')) {
      let uuid = '';
      const possible = '0123456789';
      for (let i = 0; i < 8; i++) {
        uuid += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      const user_id = 'guest' + uuid;
      document.cookie = `userId=${user_id}; path=/`
      return user_id;
    } else {
      return verifyCookie('userId');
    }
  });

  useEffect(() => {
    // socket.on('connect', () => {
    //   setIsConnected(true);
    // });
    // socket.on('disconnect', () => {
    //   setIsConnected(false);
    // });
    // return () => {
    //   socket.off('connect');
    //   socket.off('disconnect');
    // }
  }, [])

  return (
    <socketContext.Provider value={{ isConnected, socket, piecesColor, setPiecesColor, userId, setUserId, }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/friendGame' element={<FriendGamePage />} />
          <Route path='/computerGame' element={<ComputerGamePage />} />
          <Route path='/tutorial' element={<TutorialPage />} />
          <Route element={<PlayingPage />}>
            // if no code in cookies don't allow visiting friend chess board page
            <Route path="/friendChessBoard" element={<FriendChessBoard />} />
            <Route path="/computerChessBoard" element={<ComputerChessBoard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </socketContext.Provider>
  );
}

export default App;
