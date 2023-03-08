import React, { useContext, useState } from 'react';
import './chessBoard.css';
import { socketContext } from '../../App';
import { movePiece, removePiece, updateMoveInfo, updatePiecesColor } from '../../states/positionsState';
import { updatePart } from '../../states/fenState';
import getRows from './chessBoardOperations/generateBoardJSX';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCookie } from '../generalOperations/cookiesOperations';

const ChessBoard = ({ setGameWinner, checkmate, setCheckmate, setError }) => {
    // realtime operations and status
    const { socket, isConnected, userId } = useContext(socketContext);

    // take the function that dispatch actions to the redux store
    const dispatch = useDispatch();
    // fen state
    const fenState = useSelector(state => state.fenState); X
    // positionsState
    const positionsState = useSelector(state => state.positionsState);
    // selected square position
    const [selectSquarePosition, setSelectSquarePosition] = useState(null);
    // highlighted squares
    const [highlightedSquares, setHighlightedSquares] = useState([]);
    // a pawn must be prompted
    const [prompted, setPrompted] = useState(false);

    // the opponent userId
    const [opponentId, setOpponentId] = useState(null); X

    // update positions in state 
    function updatePositions(oldRowIx, oldSquareIx, newRowIx, newSquareIx, piece) {
        dispatch(movePiece({ oldRowIx, oldSquareIx, newRowIx, newSquareIx, piece }))
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

    useEffect(() => {
        if (!positionsState.computer) {
            if (verifyCookie('opponentId')) {
                setOpponentId(verifyCookie('opponentId'))
            } else {
                socket.on('opponentJoined', (opponentId) => {
                    setOpponentId(opponentId);
                });
            }
        }
    }, []);

    useEffect(() => {
        if (!positionsState.computer) {
            socket.emit('updatedStates', (fenState, positionsState) => {
                xxxxxxxxxxx
            });
        }
    }, [fenState, positionsState])

    return (
        <div className="boardArea">
            <div className="player">
                <div className="pfp">
                    <img src="./imgs/defaultProfileImage.png" alt={`${positionsState.piecesColor === 'black' ? userId : opponentId ? opponentId : 'loading...'}`} title={`${positionsState.piecesColor === 'black' ? userId : opponentId ? opponentId : 'loading...'}`} />
                </div>
                <div className="username">
                    {positionsState.piecesColor === 'black' ? userId : opponentId ? opponentId : 'loading...'}
                </div>
            </div>
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
            <div className="player">
                <div className="pfp">
                    <img src="./imgs/defaultProfileImage.png" alt={`${positionsState.piecesColor === 'black' ? userId : opponentId ? opponentId : 'loading...'}`} title={`${positionsState.piecesColor === 'black' ? userId : opponentId ? opponentId : 'loading...'}`} />
                </div>
                <div className="username">
                    {positionsState.piecesColor === 'white' ? userId : opponentId ? opponentId : 'loading...'}
                </div>
            </div>
        </div>
    );
};
export default ChessBoard;
