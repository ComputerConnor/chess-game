import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import positionsSliceReducer from './states/positionsState';
import fenReducer from './states/fenState';
import gameReducer from './states/gameState';

// configure the store
const store = configureStore({
  reducer: {
    positionsState: positionsSliceReducer,
    fenState: fenReducer,
    gameState: gameReducer,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
// make the store available to my React components
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

