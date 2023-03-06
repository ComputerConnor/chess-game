import React, { useContext, useState } from 'react';
import './chessBoard.css';
import { socketContext } from '../../App';
import { movePiece, removePiece, updateMoveInfo, updatePiecesColor } from '../../states/positionsState';
import { updatePart } from '../../states/fenState';
import getRows from './chessBoardOperations/generateBoardJSX';
import { useDispatch, useSelector } from 'react-redux';
import SomethingWentWrong from '../somethingWentWrong';

const ChessBoard = ({ gameWinner, setGameWinner, checkmate, setCheckmate, setError }) => {
    // realtime operations and status
    const { socket, isConnected } = useContext(socketContext);

    // take the function that dispatch actions to the redux store
    const dispatch = useDispatch();
    // fen state
    const fenState = useSelector(state => state.fenState);
    // positionsState
    const positionsState = useSelector(state => state.positionsState);
    // selected square position
    const [selectSquarePosition, setSelectSquarePosition] = useState(null);
    // highlighted squares
    const [highlightedSquares, setHighlightedSquares] = useState([]);
    // a pawn must be prompted
    const [prompted, setPrompted] = useState(false);

    // update positions in state 
    function updatePositions(oldRowIx, oldSquareIx, newRowIx, newSquareIx, piece) {
        dispatch(movePiece({ oldRowIx, oldSquareIx, newRowIx, newSquareIx, piece }))
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
    // remove piece from a given position
    function removePieceFn(rowIx, squareIx) {
        removePiece({ rowIx, squareIx });
    }

    return (
        <div id="board">
            {
                getRows(
                    positionsState, fenState,
                    isConnected, positionsState, fenState,
                    selectSquarePosition,
                    highlightedSquares, setHighlightedSquares, prompted, setPrompted,
                    checkmate, setCheckmate, setError, setGameWinner, setSelectSquarePosition,
                    updatePositions, removePieceFn, updatePartFn, updateMoveInfoFn,
                    socket,
                )
            }
        </div>
    );
};
export default ChessBoard;
