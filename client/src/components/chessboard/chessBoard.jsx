import React, { useContext, useState } from 'react';
import './chessBoard.css';
import { socketContext } from '../../App';
import { movePiece, updateMoveInfo, updatePiecesColor } from '../../states/positionsState';
import { updateGame } from '../../states/gameState';
import { updatePart } from '../../states/fenState';
import getRows from './chessBoardOperations/generateBoardJSX';
import { useDispatch, useSelector } from 'react-redux';

const ChessBoard = () => {
    // realtime operations and status
    const { socket, isConnected, piecesColor } = useContext(socketContext);
    // take the function that dispatch actions to the redux store
    const dispatch = useDispatch();
    // fen state
    const fenState = useSelector(state => state.fenState);
    // positionsState
    const positionsState = useSelector(state => state.positionsState);
    // gameState
    const gameState = useSelector(state => state.gameState);
    // selected square position
    const [selectSquarePosition, setSelectSquarePosition] = useState(null);
    // highlighted squares
    const [highlightedSquares, setHighlightedSquares] = useState([]);
    // update positions in state 
    function updatePositions(oldRowIx, oldSquareIx, newRowIx, newSquareIx, piece) {
        dispatch(movePiece({oldRowIx, oldSquareIx, newRowIx, newSquareIx, piece}))
    }
    // update game state of playing
    function updateGameFn(type, newValue,) {
        dispatch(updateGame({type, newValue},))
    }
    // set the pieces color of user based on wether he create a room or joined it
    function setPiecesColorTo(color) {
        dispatch(updatePiecesColor(color));
    }
    // update move info object which describe what was the last act by the user
    // clicked a piece or not, clicked a square to move to or not
    function updateMoveInfoFn(newValue) {
        dispatch(updateMoveInfo(newValue));
    }
    // update part of fen string state
    function updatePartFn(property, newValue) {
        dispatch(updatePart({ property, newValue }));
    }
    return (
        <div id="board">{getRows(positionsState, fenState,
            selectSquarePosition, highlightedSquares, setHighlightedSquares, setSelectSquarePosition,
            socket
        )}</div>
    );
};
export default ChessBoard;
